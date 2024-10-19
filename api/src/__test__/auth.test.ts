import fs from "fs";
import path from "path";
import request from "supertest";
import express from "express";
import { faker } from "@faker-js/faker";
import { client, connectionPromise } from "../db/db";
import { app, server } from "../server";
import { tokens, users } from "../db/collections";

const data = {
  email: faker.internet.email(),
  firstName: faker.person.firstName().slice(0, 30),
  lastName: faker.person.lastName().slice(0, 30),
  password: faker.internet.password({ length: 10 }),
  location: faker.location.country().slice(0, 30),
  occupation: faker.person.jobTitle().slice(0, 50),
};
const testImage = path.join(
  __dirname,
  "..",
  "..",
  "public",
  "assets",
  "p1.jpeg"
);
const imgStream = fs.createReadStream(testImage);

let accessToken;
let refreshToken;

describe("Auth", () => {
  beforeAll(async () => {
    await connectionPromise;
    app.use(express.urlencoded({ extended: false }));
  });

  afterAll(async () => {
    await Promise.all([users.drop(), tokens.drop(), client.close()]);
    server.close();
  });

  it("/register => should return status 201", async () => {
    console.log(data);
    let req = request(app).post("/api/auth/register");
    for (const [key, value] of Object.entries(data)) {
      req = req.field(key, value);
    }
    req.attach("picture", imgStream, { filename: "p1.jpeg" });
    const res = await req;
    expect(res.status).toBe(201);
    expect(res.body.message).toMatch(/you registered successfully/i);
  });

  it("/login => should return JWT tokens and user without password and friends", async () => {
    console.log(data.email);
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: data.email, password: data.password })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
    expect(res.body.tokens.accessToken).toBeTruthy();
    expect(res.body.tokens.refreshToken).toBeTruthy();
    expect(res.body.user.email).toBe(data.email);
    expect(res.body.user.password).toBeUndefined();
    expect(res.body.user.friends).toBeUndefined();

    accessToken = res.body.tokens.accessToken;
    refreshToken = res.body.tokens.refreshToken;
  });

  it("/refresh => should return new access token", async () => {
    console.log("(old access token)", accessToken);

    await new Promise((f) => setTimeout(f, 1100));

    const res = await request(app)
      .post("/api/auth/refresh")
      .send({ refreshToken })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    console.log("(in test new access token)", res.body.accessToken);
    expect(res.status).toBe(200);
    expect(res.body.accessToken).not.toBe(accessToken);
    accessToken = res.body.accessToken;
  });

  it("/logout => should return new access token", async () => {
    const res = await request(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${accessToken}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/logged out/i);
  });
});

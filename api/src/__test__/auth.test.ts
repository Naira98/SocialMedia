import request from "supertest";
import { client, connectionPromise } from "../db/db";
import { app, server } from "../server";
import { tokens, users } from "../db/collections";
import { loginFakeUser, registerFakeUser, UserData } from "./generateUser";

let accessToken: string;
let refreshToken: string;
const userData = new UserData()

describe("Auth", () => {
  it('must pass', ()=>{
    expect(1).toBeTruthy()
  })

  beforeAll(async () => {
    console.log('before all in auth')
    await connectionPromise;
  });

  afterAll(async () => {
    console.log('after all in auth')
    await Promise.all([users.drop(), tokens.drop()
      ,client.close()
    ]);
    server.close();
  });

  it("/register => should return status 201", async () => {
    const res = await registerFakeUser(userData);
    expect(res.status).toBe(201);
    expect(res.body.message).toMatch(/you registered successfully/i);
  });

  it("/login => should return JWT tokens and user without password and friends", async () => {
    const res = await loginFakeUser(userData);

    expect(res.status).toBe(200);
    expect(res.body.tokens.accessToken).toBeTruthy();
    expect(res.body.tokens.refreshToken).toBeTruthy();
    expect(res.body.user.email).toBe(userData.email);
    expect(res.body.user.password).toBeUndefined();
    expect(res.body.user.friends).toBeUndefined();

    accessToken = res.body.tokens.accessToken;
    refreshToken = res.body.tokens.refreshToken;
  });

  it("/refresh => should return new access token", async () => {

    await new Promise((f) => setTimeout(f, 1100));

    const res = await request(app)
      .post("/api/auth/refresh")
      .send({ refreshToken })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

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

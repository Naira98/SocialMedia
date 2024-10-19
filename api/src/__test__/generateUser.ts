import path from "path";
import fs from "fs";
import { faker } from "@faker-js/faker/.";
import request from "supertest";
import { app } from "../server";

export const data = {
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

/* REGISTER */
export const registerFakeUser = async () => {
  let req = request(app).post("/api/auth/register");
  for (const [key, value] of Object.entries(data)) {
    req = req.field(key, value);
  }
  req.attach("picture", imgStream, { filename: "p1.jpeg" });
  return await req;
};

/* LOGIN */
export const loginFakeUser = async () => {
  return await request(app)
    .post("/api/auth/login")
    .send({ email: data.email, password: data.password })
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
};

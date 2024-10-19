import path from "path";
import fs from "fs";
import { faker } from "@faker-js/faker/.";
import request from "supertest";
import { app } from "../server";

interface USER_DATA {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  location: string;
  occupation: string;
}

export class UserData {
  email = faker.internet.email();
  firstName = faker.string.alphanumeric({ length: { min: 3, max: 30 } });
  lastName = faker.string.alphanumeric({ length: { min: 3, max: 30 } });
  password = faker.internet.password({ length: 10 });
  location = faker.location.country().slice(0, 30);
  occupation = faker.person.jobTitle().slice(0, 50);
}

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
export const registerFakeUser = async (userData: USER_DATA) => {
  console.log(userData);
  let req = request(app).post("/api/auth/register");
  for (const [key, value] of Object.entries(userData)) {
    req = req.field(key, value);
  }
  req.attach("picture", imgStream, { filename: "p1.jpeg" });
  return await req;
};

/* LOGIN */
export const loginFakeUser = async (userData: USER_DATA) => {
  console.log(userData);
  return await request(app)
    .post("/api/auth/login")
    .send({ email: userData.email, password: userData.password })
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
};

import path from "path";
import fs from "fs";
import { faker } from "@faker-js/faker/.";

const testImage = path.join(
  __dirname,
  "..",
  "..",
  "public",
  "assets",
  "p1.jpeg"
);
export const img = fs.readFileSync(testImage);

export function generateUserData() {
  return {
    email: faker.internet.email(),
    firstName: generateAlphaNumString(),
    lastName: generateAlphaNumString(),
    password: faker.internet.password({ length: 10 }),
    location: faker.location.country().slice(0, 30),
    occupation: faker.person.jobTitle().slice(0, 50),
    picture: img,
  };
}

export function generateAlphaNumString() {
  return faker.string.alphanumeric({ length: { min: 3, max: 30 } });
}

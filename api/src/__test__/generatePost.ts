import path from "path";
import fs from "fs";
import { faker } from "@faker-js/faker/.";

const testImage = path.join(
  __dirname,
  "..",
  "..",
  "public",
  "assets",
  "post1.jpeg"
);
const imgStream = fs.readFileSync(testImage);

export const PostWithoutImage = {
  description: faker.lorem.paragraph(),
};
export const PostWithImage = {
  description: faker.lorem.paragraph(),
  picture: imgStream,
};
export const comment = faker.lorem.paragraph().slice(0, 100);

import path from "path";
import fs from "fs";
import { faker } from "@faker-js/faker/.";
import request from "supertest";
import { app } from "../server";
import { accessToken } from "./posts.test";

const testImage = path.join(
  __dirname,
  "..",
  "..",
  "public",
  "assets",
  "post1.jpeg"
);
const imgStream = fs.createReadStream(testImage);

export const PostWithoutImage = {
  description: faker.lorem.paragraph(),
};
export const PostWithImage = {
  description: faker.lorem.paragraph(),
  picture: imgStream,
};
export const comment = { comment: faker.lorem.paragraph().slice(0, 100) };

// export const testReq =async (method, endPoint, body, attach) => {
// const req =  await request(app)
//   .get("/api/posts/")
//   .set("Authorization", `Bearer ${accessToken}`)
//   .set("Content-Type", "application/json")
//   .set("Accept", "application/json");
// }

export const addPost = async (post: {
  description: string;
  picture?: fs.ReadStream;
}) => {
  let req = request(app)
    .post("/api/posts")
    .set("Authorization", `Bearer ${accessToken}`)
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
  for (const [key, value] of Object.entries(post)) {
    if (key !== "picture") req = req.field(key, value);
  }
  post.picture &&
    req.attach("picture", post.picture, { filename: "post1.jpeg" });
  return await req;
};

export const getFeed = async () => {
  return await request(app)
    .get("/api/posts/")
    .set("Authorization", `Bearer ${accessToken}`)
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
};
export const likePost = async (postId1: string) => {
  return await request(app)
    .patch(`/api/posts/${postId1}`)
    .set("Authorization", `Bearer ${accessToken}`)
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
};

export const addComment = async (postId1: string) => {
  return request(app)
    .post(`/api/posts/${postId1}`)
    .set("Authorization", `Bearer ${accessToken}`)
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .send(comment);
};

export const deletePost = async (postId2: string) => {
  return request(app)
    .delete(`/api/posts/${postId2}`)
    .set("Authorization", `Bearer ${accessToken}`)
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
};

export const getProfileFeed = async (userId: string) => {
  return request(app)
    .get(`/api/posts/${userId}`)
    .set("Authorization", `Bearer ${accessToken}`)
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
};

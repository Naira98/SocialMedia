import request from "supertest";
import { app, server } from "../server";
import { client, connectionPromise } from "../db/db";
import { posts, tokens, users } from "../db/collections";
import {
  addComment,
  addPost,
  comment,
  deletePost,
  getFeed,
  getProfileFeed,
  likePost,
  PostWithImage,
  PostWithoutImage,
} from "./generatePost";
import { loginFakeUser, registerFakeUser } from "./generateUser";
import { faker } from "@faker-js/faker/.";

export let accessToken: string;
let userId: string;
let postId1: string;
let postId2: string;

describe("Posts", () => {
  it("must pass", () => {
    expect(1).toBeTruthy();
  });

  beforeAll(async () => {
    await connectionPromise;
    const res = await registerFakeUser();
    console.log(res.body);
    const { body } = await loginFakeUser();
    console.log(body);
    accessToken = body.tokens.accessToken;
    userId = body.user._id;
  });

  afterAll(async () => {
    await Promise.all([
      posts.drop(),
      users.drop(),
      tokens.drop(),
      client.close(),
    ]);
    server.close();
  });

  it("should return 201 when adding post without image", async () => {
    const res = await addPost(PostWithoutImage);
    expect(res.status).toBe(201);
    expect(res.body.message).toMatch(/post created successfully/i);
  });

  it("should return 201 when adding post with image", async () => {
    const res = await addPost(PostWithImage);
    expect(res.status).toBe(201);
    expect(res.body.message).toMatch(/post created successfully/i);
  });

  it("should return 200 and populated posts with user name and picture when fetching feed", async () => {
    const res = await getFeed();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].userId).toHaveProperty("_id");
    expect(res.body[0].userId).toHaveProperty("firstName");
    expect(res.body[0].userId).toHaveProperty("lastName");
    expect(res.body[0].userId).toHaveProperty("picturePath");
    expect(res.body[0].likes).toEqual([]);
    expect(res.body[0].comments).toEqual([]);

    postId1 = res.body[0]._id;
    postId2 = res.body[1]._id;
  });

  it("should return 200 when like post", async () => {
    const res = await likePost(postId1);
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/like added successfully/i);
  });

  it("should return 200 when comment post", async () => {
    const res = await addComment(postId1);
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/comment added successfully/i);
  });

  it("should return 200 when delete post", async () => {
    const res = await deletePost(postId2);
    expect(res.status).toBe(200);
    expect(res.body.postId).toBe(postId2);
  });

  it("should return 200 and populated posts with user name and picture when get profile feed", async () => {
    const res = await getProfileFeed(userId);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].userId).toHaveProperty("_id");
    expect(res.body[0].userId).toHaveProperty("firstName");
    expect(res.body[0].userId).toHaveProperty("lastName");
    expect(res.body[0].userId).toHaveProperty("picturePath");
    expect(res.body[0].likes).toContain(userId);
    expect(res.body[0].comments).toContain(comment.comment);
  });
});

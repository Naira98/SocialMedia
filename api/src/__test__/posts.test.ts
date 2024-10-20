import path from "path";
import fs from "fs";
import { client, connectionPromise } from "../db/db";
import { posts, tokens, users } from "../db/collections";
import { comment, PostWithImage, PostWithoutImage } from "./generatePost";
import { generateUserData } from "./generateUser";
import {
  deleteReq,
  getReq,
  patchReq,
  postReqFormData,
  postReqJson,
} from "./testReq";
import { createTwoUsers } from "./createTwoUsers";
import { deleteImages } from "../utils/deleteImages";

/* First user =>  
  add post with image, 
  add like and comment to post without image, 
  delete post with image, 
  get friend feed */

/* Second user =>  
  add post without image, 
  fail to delete post with image,
  fetch feed */

let userData1 = generateUserData();
let userData2 = generateUserData();
let firstUserId: string;
let firstUserToken: string;
let secondUserId: string;
let secondUserToken: string;
let postWithImgId: string;
let postWithImgPicturePath: string;
let postWithoutImgId: string;
let picturePaths: string[] = [];

describe("Posts", () => {
  beforeAll(async () => {
    await connectionPromise;

    const { user1Id, user2Id, user1Token, user2Token, pictures } =
      await createTwoUsers(userData1, userData2);
    firstUserId = user1Id;
    firstUserToken = user1Token;
    secondUserId = user2Id;
    secondUserToken = user2Token;
    picturePaths = [...picturePaths, ...pictures];
  });

  afterAll(async () => {
    deleteImages(picturePaths);
    await Promise.all([posts.drop(), users.drop(), tokens.drop()]);
    await client.close();
  });
  describe("Add Post", () => {
    it("should return 201 when adding post without image", async () => {
      /* Second user and Post without image */
      const res = await postReqFormData(
        "/posts",
        PostWithoutImage,
        undefined,
        secondUserToken
      );
      expect(res.status).toBe(201);
      expect(res.body.message).toMatch(/post created successfully/i);
    });

    it("should return 201 when adding post with image", async () => {
      /* First user and Post with image */
      const res = await postReqFormData(
        "/posts",
        PostWithImage,
        "post1.jpeg",
        firstUserToken
      );
      expect(res.status).toBe(201);
      expect(res.body.message).toMatch(/post created successfully/i);
    });
  });
  describe("Fetch Feed", () => {
    it("should return 200 and populated posts with user name and picture when fetching feed", async () => {
      const res = await getReq("/posts", secondUserToken);

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      /* Post With Image for first user */
      expect(res.body[0].userId).toMatchObject({
        firstName: userData1.firstName,
        lastName: userData1.lastName,
      });
      expect(res.body[0].likes).toEqual([]);
      expect(res.body[0].comments).toEqual([]);
      expect(res.body[0].picturePath).toBeTruthy();
      postWithImgId = res.body[0]._id;
      postWithImgPicturePath = res.body[0].picturePath;
      const image = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "assets",
        postWithImgPicturePath
      );
      expect(fs.existsSync(image)).toBe(true);

      /* Post Without Image for second user */
      expect(res.body[1].picturePath).toBeNull();
      postWithoutImgId = res.body[1]._id;
    });
  });

  describe("Like Post", () => {
    /* First user and Post without image */
    it("should return 200 when like post", async () => {
      const res = await patchReq(`/posts/${postWithoutImgId}`, firstUserToken);
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/like added or removed successfully/i);
    });

    it("should return 200 when unlike post", async () => {
      const res = await patchReq(`/posts/${postWithoutImgId}`, firstUserToken);
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/like added or removed successfully/i);
    });

    it("should not find the like in the post", async () => {
      const res = await getReq(`/posts/${secondUserId}`, firstUserToken);
      expect(res.body[0].likes).not.toContain(firstUserId);
    });

    it("should return 200 when like post again", async () => {
      const res = await patchReq(`/posts/${postWithoutImgId}`, firstUserToken);
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/like added or removed successfully/i);
    });
  });

  describe("Add Comment", () => {
    it("should return 200 when adding comment", async () => {
      /* First user and post without image */
      const res = await postReqJson(
        `/posts/${postWithoutImgId}`,
        { comment },
        firstUserToken
      );
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/comment added successfully/i);
    });
  });

  describe("Delete Post", () => {
    it("should return 403 when delete post not for you", async () => {
      const res = await deleteReq(`/posts/${postWithImgId}`, secondUserToken);
      const deletedImage = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "assets",
        postWithImgPicturePath
      );
      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/you can delete your posts only/i);
      expect(fs.existsSync(deletedImage)).toBe(true);
    });

    it("should return 200 when delete post", async () => {
      const res = await deleteReq(`/posts/${postWithImgId}`, firstUserToken);
      const deletedImage = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "assets",
        postWithImgPicturePath
      );
      expect(res.status).toBe(200);
      expect(res.body.postId).toBe(postWithImgId);
      expect(fs.existsSync(deletedImage)).toBe(false);
    });
  });

  describe("Get Profile User", () => {
    it("should return 200 and populated posts with user name and picture when get profile feed", async () => {
      const res = await getReq(`/posts/${secondUserId}`, firstUserToken);
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].userId).toHaveProperty("_id");
      expect(res.body[0].userId).toHaveProperty("firstName");
      expect(res.body[0].userId).toHaveProperty("lastName");
      expect(res.body[0].userId).toHaveProperty("picturePath");
      expect(res.body[0].likes).toContain(firstUserId);
      expect(res.body[0].comments).toContain(comment);
    });
  });
});

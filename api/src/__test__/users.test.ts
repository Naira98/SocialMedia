import { client, connectionPromise } from "../db/db";
import { posts, tokens, users } from "../db/collections";
import { generateAlphaNumString, generateUserData } from "./generateUser";
import { getReq, patchReq } from "./testReq";
import { faker } from "@faker-js/faker/.";
import { createTwoUsers } from "./createTwoUsers";
import { deleteImages } from "../utils/deleteImages";

let loggedUser = generateUserData();
let registeredUser = generateUserData();
let accessToken: string;
let loggedUserId: string;
let registeredUserId: string;
let picturePaths: string[] = [];

describe("Users", () => {
  beforeAll(async () => {
    await connectionPromise;

    const { user1Id, user2Id, user1Token, pictures } = await createTwoUsers(
      loggedUser,
      registeredUser
    );
    loggedUserId = user1Id;
    accessToken = user1Token;
    registeredUserId = user2Id;
    picturePaths = [...picturePaths, ...pictures];
  });

  afterAll(async () => {
    deleteImages(picturePaths);
    await Promise.all([posts.drop(), users.drop(), tokens.drop()]);
    await client.close();
  });

  describe("Get Me", () => {
    it("should return 403 when send wrong token", async () => {
      const res = await getReq("/users/me", faker.string.alpha(50));
      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/token invalid/i);
    });

    it("should return 200 when fetching get me", async () => {
      const res = await getReq("/users/me", accessToken);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        firstName: loggedUser.firstName,
        lastName: loggedUser.lastName,
        location: loggedUser.location,
        occupation: loggedUser.occupation,
      });
      expect(res.body.email).toBeUndefined();
      expect(res.body.password).toBeUndefined();
      expect(res.body.friends).toBeUndefined();
    });
  });

  describe("Get Profile User", () => {
    it("should return 404 when fetching worng profile user", async () => {
      const res = await getReq(
        `/users/${faker.database.mongodbObjectId()}`,
        accessToken
      );
      expect(res.status).toBe(404);
      expect(res.body.message).toMatch(/user not found/i);
    });

    it("should return 200 when fetching profile user", async () => {
      const res = await getReq(`/users/${registeredUserId}`, accessToken);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        location: registeredUser.location,
        occupation: registeredUser.occupation,
      });
      expect(res.body.email).toBeUndefined();
      expect(res.body.password).toBeUndefined();
      expect(res.body.friends).toBeUndefined();
    });
  });

  describe("Add / Remove Friend", () => {
    it("should return 400 when trying add yourself as a friend", async () => {
      const res = await patchReq(`/users/${loggedUserId}`, accessToken);
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/you can't follow yourself/i);
    });

    it("should return 200 when adding friend", async () => {
      const res = await patchReq(`/users/${registeredUserId}`, accessToken);
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/success/i);
    });

    it("should return 200 when removing same friend", async () => {
      const res = await patchReq(`/users/${registeredUserId}`, accessToken);
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/success/i);
    });

    it("should not found friend in my friends", async () => {
      const res = await getReq(
        `/users/friends/${registeredUserId}`,
        accessToken
      );
      expect(res.body).not.toContain(loggedUserId);
    });

    it("should return 200 when adding same friend again", async () => {
      const res = await patchReq(`/users/${registeredUserId}`, accessToken);
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/success/i);
    });
  });

  describe("Get User Friends", () => {
    it("should return 404 when fetching wrong user friends", async () => {
      const res = await getReq(
        `/users/friends/${faker.database.mongodbObjectId()}`,
        accessToken
      );
      expect(res.status).toBe(404);
      expect(res.body.message).toMatch(/user not found/i);
    });

    it("should return 200 when fetching user friends", async () => {
      const res = await getReq(
        `/users/friends/${registeredUserId}`,
        accessToken
      );
      expect(res.status).toBe(200);
      expect(res.body[0]).toMatchObject({
        firstName: loggedUser.firstName,
        lastName: loggedUser.lastName,
        occupation: loggedUser.occupation,
      });
      expect(res.body[0].email).toBeUndefined();
      expect(res.body[0].password).toBeUndefined();
      expect(res.body[0].friends).toBeUndefined();
    });
  });

  describe("Update Account", () => {
    it("should restun 403 when updating account name for another user", async () => {
      const res = await patchReq("/users/user", accessToken, {
        userId: registeredUserId,
        firstName: generateAlphaNumString(),
        lastName: generateAlphaNumString(),
      });
      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(
        /you can't make update to another user/i
      );
    });

    it("should restun 200 when updating your account name", async () => {
      const res = await patchReq("/users/user", accessToken, {
        userId: loggedUserId,
        firstName: generateAlphaNumString(),
        lastName: generateAlphaNumString(),
      });
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/success/i);
    });
  });

  describe("Update Twitter Link", () => {
    it("should restun 403 when adding twitter link for another user", async () => {
      const res = await patchReq("/users/twitter", accessToken, {
        userId: registeredUserId,
        link: faker.string.alphanumeric({ length: { min: 3, max: 100 } }),
      });
      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/you can't add link to another user/i);
    });

    it("should restun 200 when adding Twitter link", async () => {
      const res = await patchReq("/users/twitter", accessToken, {
        userId: loggedUserId,
        link: faker.string.alphanumeric({ length: { min: 3, max: 100 } }),
      });
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/success/i);
    });
  });

  describe("Update Linkedin Link", () => {
    it("should restun 403 when adding linkedin link for another user", async () => {
      const res = await patchReq("/users/linkedin", accessToken, {
        userId: registeredUserId,
        link: faker.string.alphanumeric({ length: { min: 3, max: 100 } }),
      });
      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/you can't add link to another user/i);
    });

    it("should restun 200 when adding Linkedin link", async () => {
      const res = await patchReq("/users/linkedin", accessToken, {
        userId: loggedUserId,
        link: faker.string.alphanumeric({ length: { min: 3, max: 100 } }),
      });
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/success/i);
    });
  });
});

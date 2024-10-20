import { client, connectionPromise } from "../db/db";
import { tokens, users } from "../db/collections";
import { generateUserData } from "./generateUser";
import { postReqFormData, postReqJson } from "./testReq";
import { faker } from "@faker-js/faker/.";
import { deleteImages } from "../utils/deleteImages";

let accessToken: string;
let refreshToken: string;
const userData = generateUserData();
let picturePaths: string[] = [];

jest.useFakeTimers({ advanceTimers: true });

describe("Auth", () => {
  beforeAll(async () => {
    await connectionPromise;
  });

  afterAll(async () => {
    deleteImages(picturePaths);
    await Promise.all([users.drop(), tokens.drop()]);
    await client.close();
  });

  describe("Register", () => {
    it("should return status 201 when register with new data", async () => {
      const res = await postReqFormData("/auth/register", userData, "p1.jpeg");
      expect(res.status).toBe(201);
      expect(res.body.message).toMatch(/you registered successfully/i);
    });

    it("should return status 409 when register with the same email", async () => {
      const res = await postReqFormData("/auth/register", userData, "p1.jpeg");
      expect(res.status).toBe(409);
      expect(res.body.message).toMatch(/email already exists/i);
      picturePaths.push(res.body.picturePath);
    });
  });

  describe("Login", () => {
    it("should return 401 when using wrong email", async () => {
      const res = await postReqJson("/auth/login", {
        email: faker.internet.email(),
        password: userData.password,
      });
      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/wrong credentials/i);
    });

    it("should return 401 when using wrong password", async () => {
      const res = await postReqJson("/auth/login", {
        email: userData.email,
        password: faker.internet.password({ length: 10 }),
      });
      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/wrong credentials/i);
    });

    it("should return JWT tokens and user without password and friends", async () => {
      const res = await postReqJson("/auth/login", {
        email: userData.email,
        password: userData.password,
      });
      expect(res.status).toBe(200);
      expect(res.body.tokens.accessToken).toBeTruthy();
      expect(res.body.tokens.refreshToken).toBeTruthy();
      expect(res.body.user.email).toBe(userData.email);
      expect(res.body.user.password).toBeUndefined();
      expect(res.body.user.friends).toBeUndefined();

      accessToken = res.body.tokens.accessToken;
      refreshToken = res.body.tokens.refreshToken;
      picturePaths.push(res.body.user.picturePath);
    });
  });

  describe("Refresh Token", () => {
    it("should return 401 when sending wrong refresh token", async () => {
      jest.advanceTimersByTime(1000);

      const res = await postReqJson("/auth/refresh", {
        refreshToken: faker.string.alpha(50),
      });
      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/invalid token/i);
    });

    it("should return new access token with correct data", async () => {
      jest.advanceTimersByTime(1000);

      const res = await postReqJson("/auth/refresh", { refreshToken });
      expect(res.status).toBe(200);
      expect(res.body.accessToken).not.toBe(accessToken);
      accessToken = res.body.accessToken;
    });
  });

  describe("Logout", () => {
    it("should return 403 and Access Declined when don't send access token", async () => {
      const res = await postReqJson("/auth/logout", undefined, undefined);
      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/access declined/i);
    });

    it("should return 403 when send wrong access token", async () => {
      const res = await postReqJson(
        "/auth/logout",
        undefined,
        faker.string.alpha(50)
      );
      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/token invalid/i);
    });

    it("should return 200 with correct data", async () => {
      const res = await postReqJson("/auth/logout", undefined, accessToken);
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/logged out/i);
    });
  });
});

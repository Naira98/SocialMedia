import request from "supertest";
import { app } from "../server";

export const getReq = async (endPoint: string, accessToken: string) => {
  return await request(app)
    .get(`/api${endPoint}`)
    .set("Authorization", `Bearer ${accessToken}`)
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
};

export const postReqFormData = async (
  endPoint: string,
  body: {
    [key: string]: string | Buffer;
  },
  filename?: string,
  accessToken?: string
) => {
  let req = request(app)
    .post(`/api${endPoint}`)
    .set("Authorization", `Bearer ${accessToken}`);

  for (const [key, value] of Object.entries(body)) {
    if (key !== "picture") req = req.field(key, value);
  }

  if (body.picture) req.attach("picture", body.picture, { filename });
  if (accessToken) req = req.set("Authorization", `Bearer ${accessToken}`);
  return await req;
};

export const postReqJson = async (
  endPoint: string,
  body?: {
    [key: string]: string;
  },
  accessToken?: string
) => {
  let req = request(app)
    .post(`/api${endPoint}`)
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
  if (body) req = req.send(body);
  if (accessToken) req = req.set("Authorization", `Bearer ${accessToken}`);

  return await req;
};

export const patchReq = async (
  endPoint: string,
  accessToken: string,
  body?: { [key: string]: string }
) => {
  let req = request(app)
    .patch(`/api${endPoint}`)
    .set("Authorization", `Bearer ${accessToken}`)
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
  body && req.send(body);
  return await req;
};

export const deleteReq = async (endPoint: string, accessToken: string) => {
  return request(app)
    .delete(`/api${endPoint}`)
    .set("Authorization", `Bearer ${accessToken}`)
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
};

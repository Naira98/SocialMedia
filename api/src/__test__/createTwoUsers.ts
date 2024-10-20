import { postReqFormData, postReqJson } from "./testReq";

export async function createTwoUsers(userData1, userData2) {
  const [registerRes1, registerRes2] = await Promise.all([
    postReqFormData("/auth/register", userData1, "p1.jpeg"),
    postReqFormData("/auth/register", userData2, "p1.jpeg"),
  ]);

  const [loginRes1, loginRes2] = await Promise.all([
    postReqJson("/auth/login", {
      email: userData1.email,
      password: userData1.password,
    }),
    postReqJson("/auth/login", {
      email: userData2.email,
      password: userData2.password,
    }),
  ]);

  return {
    user1Id: registerRes1.body.userId,
    user1Token: loginRes1.body.tokens.accessToken,
    user2Id: registerRes2.body.userId,
    user2Token: loginRes2.body.tokens.accessToken,
    pictures: [
      loginRes1.body.user.picturePath,
      loginRes2.body.user.picturePath,
    ],
  };
}

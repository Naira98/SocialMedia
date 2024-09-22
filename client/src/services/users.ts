import apiReq from "./apiReq";
import { getTokens } from "../util/helpers";

export async function addRemoveFriend(
  friendId: string,
) {
  try {
    const res: Response = await apiReq(
      "PATCH",
      `/users/${friendId}`,
      {
        "Content-Type": "application/json",
      },
      undefined
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getFetchFriends(userId: string) {
  try {
    const { refreshToken, accessToken } = getTokens();
    if (!refreshToken || !accessToken) return null;
    const res: Response = await apiReq(
      "GET",
      `/users/friends/${userId}`,
      {
        "Content-Type": "application/json",
      },
      undefined
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
export async function getProfileUser(
  userId: string,
) {
  try {
    const res: Response = await apiReq(
      "GET",
      `/users/${userId}`,
      {
        "Content-Type": "application/json",
      },
      undefined
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function updateAccount(
  firstName: string,
  lastName: string,
  userId: string
) {
  try {
    const res: Response = await apiReq(
      "PATCH",
      `/users/user`,
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ firstName, lastName, userId })
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
export async function addTwitter(userId: string, link: string) {
  try {
    const res: Response = await apiReq(
      "PATCH",
      `/users/twitter`,
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ userId, link })
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function addLinkedin(userId: string, link: string) {
  try {
    const res: Response = await apiReq(
      "PATCH",
      `/users/linkedin`,
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ userId, link })
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

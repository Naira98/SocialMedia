import { Token } from "../types/reduxState";
import apiReq from "./apiReq";

export async function addRemoveFriend(friendId: string, tokens: Token | null) {
  try {
    const res: Response = await apiReq(
      "PATCH",
      `/users/${friendId}`,
      tokens,
      {
        "Content-Type": "application/json",
      },
      undefined
    );
    if (!res.ok) throw new Error("Can't add/remove friends");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getFetchFriends(tokens: Token, userId: string) {
  try {
    if (!tokens.refreshToken) return null;
    const res: Response = await apiReq(
      "GET",
      `/users/friends/${userId}`,
      tokens,
      {
        "Content-Type": "application/json",
      },
undefined    );

    if (!res.ok) throw new Error("Can't fetch friends");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
export async function getProfileUser(
  userId: string,
  tokens: Token | null,
) {
  try {
    const res: Response = await apiReq(
      "GET",
      `/users/${userId}`,
      tokens,
      {
        "Content-Type": "application/json",
      },
      undefined
    );

    if (!res.ok) return null;
    const data = await res.json();
    return data
  } catch (err) {
    console.log(err);
  }
}

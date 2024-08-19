import { Dispatch } from "@reduxjs/toolkit";
import { setFriends } from "../../redux/authSlice";
import { Token } from "../../types/reduxState";
import apiReq from "../../services/apiReq";

export async function getAddRemoveFriend(
  friendId: string,
  tokens: Token | null,
  dispatch: Dispatch
) {
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
    dispatch(setFriends({ friends: data }));
  } catch (err) {
    console.log(err);
  }
}

export async function getFetchFriends(
  userId: string,
  tokens: Token | null,
  dispatch: Dispatch
) {
  try {
    const res: Response = await apiReq(
      "GET",
      `/users/friends/${userId}`,
      tokens,
      {
        "Content-Type": "application/json",
      },
      undefined
    );

    if (!res.ok) throw new Error("Can't fetch friends");
    const data = await res.json();
    dispatch(setFriends({ friends: data }));
  } catch (err) {
    console.log(err);
  }
}
export async function getProfileUser(
  userId: string,
  tokens: Token | null,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setUser: Function
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

    if (!res.ok) throw new Error("Can't fetch friends");
    const data = await res.json();
    setUser(data);
  } catch (err) {
    console.log(err);
  }
}

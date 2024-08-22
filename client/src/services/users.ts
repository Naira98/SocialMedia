import { Dispatch } from "@reduxjs/toolkit";
import { Token } from "../types/reduxState";
import apiReq from "./apiReq";
import { NavigateFunction } from "react-router-dom";

export async function addRemoveFriend(
  friendId: string,
  tokens: Token | null,
  dispatch: Dispatch,
  navigate: NavigateFunction
) {
  try {
    const res: Response = await apiReq(
      "PATCH",
      `/users/${friendId}`,
      tokens,
      dispatch,
      navigate,
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

export async function getFetchFriends(
  tokens: Token,
  userId: string,
  dispatch: Dispatch,
  navigate: NavigateFunction
) {
  try {
    if (!tokens.refreshToken) return null;
    const res: Response = await apiReq(
      "GET",
      `/users/friends/${userId}`,
      tokens,
      dispatch,
      navigate,
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
  tokens: Token | null,
  dispatch: Dispatch,
  navigate: NavigateFunction
) {
  try {
    const res: Response = await apiReq(
      "GET",
      `/users/${userId}`,
      tokens,
      dispatch,
      navigate,
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
  userId: string,
  firstName: string,
  lastName: string,
  tokens: Token | null,
  dispatch: Dispatch,
  navigate: NavigateFunction
) {
  try {
    const res: Response = await apiReq(
      "PATCH",
      `/users/user`,
      tokens,
      dispatch,
      navigate,
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ userId, firstName, lastName })
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
export async function addTwitter(
  userId: string,
  link: string,
  tokens: Token | null,
  dispatch: Dispatch,
  navigate: NavigateFunction
) {
  try {
    const res: Response = await apiReq(
      "PATCH",
      `/users/twitter`,
      tokens,
      dispatch,
      navigate,
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

export async function addLinkedin(
  userId: string,
  link: string,
  tokens: Token | null,
  dispatch: Dispatch,
  navigate: NavigateFunction
) {
  try {
    const res: Response = await apiReq(
      "PATCH",
      `/users/linkedin`,
      tokens,
      dispatch,
      navigate,
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

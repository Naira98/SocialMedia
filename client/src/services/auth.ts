import apiReq from "./apiReq";
import { loginFormValues, registerFromValues } from "../types/form";
import { Token } from "../types/reduxState";
import { setLogin } from "../redux/authSlice";
import { Dispatch } from "@reduxjs/toolkit";

export async function login(values: loginFormValues) {
  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) throw new Error("Can't register please try again");
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function register(
  values: registerFromValues,
  setIsLogin: (isLogin: boolean) => void
) {
  try {
    const formData = new FormData();
    formData.append(
      "picturePath",
      values.picture ? values.picture.name.replaceAll(" ", "-") : ""
    );
    for (const value in values) {
      formData.append(value, values[value as keyof registerFromValues]);
    }

    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data) setIsLogin(true);
  } catch (err) {
    console.log(err);
  }
}

export async function getUser(refreshToken: string, dispatch: Dispatch) {
  try {
    if (!refreshToken) return null;

    const refreshRes = await fetch("http://localhost:3000/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshRes.ok) throw new Error("Refresh token not valid");
    const refreshData = await refreshRes.json(); // {userId, accessToken, refreshToken}

    localStorage.setItem("refreshToken", refreshData.refreshToken);

    const userRes = await fetch(
      `http://localhost:3000/users/${refreshData.userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshData.accessToken}`,
        },
      }
    );

    if (!userRes.ok) throw new Error("Can't find user");
    const userData = await userRes.json(); // userData: {_id, firstName, lastName, ...}

    dispatch(setLogin({ user: userData, tokens: refreshData }));
    return { user: userData, tokens: refreshData };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function logout(tokens: Token | null) {
  try {
    const res: Response = await apiReq(
      "POST",
      "/auth/logout",
      tokens,
      { "Content-Type": "application/json" },
      undefined
    );
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.log(err);
  }
}

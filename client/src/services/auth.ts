import apiReq from "./apiReq";
import { loginFormValues, registerFromValues } from "../types/form";
import { Token } from "../types/reduxState";
import { setLogin } from "../redux/authSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";

export async function login(values: loginFormValues) {
  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
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

    // for (const pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    if (data) setIsLogin(true);
  } catch (err) {
    console.log(err);
    values.picture = null;
    throw err;
  }
}

export async function getUser(
  refreshToken: string | null,
  dispatch: Dispatch,
  navigate: NavigateFunction
) {
  try {
    if (!refreshToken) {
      navigate("/");
      return null;
    }

    const refreshRes = await fetch("http://localhost:3000/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    const refreshData = await refreshRes.json(); // {userId, accessToken, refreshToken}
    if (!refreshRes.ok) throw new Error(refreshData.message);

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

    const userData = await userRes.json(); // userData: {_id, firstName, lastName, ...}
    if (!userRes.ok) throw new Error(userData.message);

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
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

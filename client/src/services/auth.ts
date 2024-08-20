import apiReq from "./apiReq";
import { loginFormValues, registerFromValues } from "../types/form";
import { Token } from "../types/reduxState";
import { setIsLoading, setLogin } from "../redux/authSlice";
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
    if (!res.ok) throw new Error(data);
=    return data;
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

    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      body: formData,
    });
    console.log(res);

    const data = await res.json();
    if (!res.ok) throw new Error(data);
    console.log(data);
    if (data) setIsLogin(true);
  } catch (err) {
    console.log(err);
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
      // return {isToken: false};
    }

    dispatch(setIsLoading(true));

    const refreshRes = await fetch("http://localhost:3000/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    const refreshData = await refreshRes.json(); // {userId, accessToken, refreshToken}
    if (!refreshRes.ok) throw new Error(refreshData);
    
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
    if (!userRes.ok) throw new Error(userData);

    dispatch(setLogin({ user: userData, tokens: refreshData }));

    return { user: userData, tokens: refreshData};
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    dispatch(setIsLoading(false));
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
    if (!res.ok) throw new Error(data);

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

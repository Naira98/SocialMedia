import { loginFormValues, registerFromValues } from "../types/Forms";
import { NavigateFunction } from "react-router-dom";
import apiReq from "./apiReq";
import { getTokens } from "../util/helpers";

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

    for (const key in values) {
      const value = values[key as keyof registerFromValues];
      if (value != null) formData.append(key, value);
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

export async function getMe(
  userId: string | null,
  setUserId: React.Dispatch<React.SetStateAction<string | null>>,
  navigate: NavigateFunction
) {
  try {
    const { accessToken, refreshToken } = getTokens();
    if (!refreshToken || !accessToken) {
      navigate("/");
      return null;
    }

    const res = await apiReq(
      "GET",
      "/users/me",
      { "Content-Type": "application/json" },
      undefined
    );
    const data = await res.json(); // userData: {_id, firstName, lastName, ...}
    if (!res.ok) throw new Error(data.message);
    if (userId !== data._id) setUserId(data._id);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function logout() {
  try {
    const res = await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

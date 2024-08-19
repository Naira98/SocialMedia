import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { setLogin, setLogout } from "../../redux/authSlice";
import { loginFormValues, registerFromValues } from "../../types/form";
import { Token } from "../../types/reduxState";
import apiReq from "../../services/apiReq";

export async function login(
  values: loginFormValues,
  dispatch: Dispatch,
  navigate: NavigateFunction
) {
  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) throw new Error("Can't register please try again");
    const data = await res.json();

    localStorage.setItem("refreshToken", data.tokens.refreshToken);

    dispatch(setLogin({ user: data.user, tokens: data.tokens }));
    navigate("/home");
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
      formData.append(value, values[value]);
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

export async function getUser(dispatch: Dispatch, navigate: NavigateFunction) {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken === null) return navigate("/");

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

    /* Set Global variables */
    dispatch(setLogin({ user: userData, tokens: refreshData }));

    navigate("/home", { replace: true });
  } catch (err) {
    console.log(err);
  }
}

export async function logout(tokens: Token, dispatch: Dispatch) {
  try {
    const res: Response = await apiReq(
      "POST",
      "/auth/logout",
      tokens,
      { "Content-Type": "application/json" },
      undefined
    );
    if (res.ok) {
      localStorage.removeItem("refreshToken");
      dispatch(setLogout());
    }
  } catch (err) {
    console.log(err);
  }
}

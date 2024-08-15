import { Dispatch } from "@reduxjs/toolkit";
import { setLogin } from "../../redux/authSlice";
import { loginFormValues, registerFromValues } from "../../types/form";
import { NavigateFunction } from "react-router-dom";

export async function login(
  values: loginFormValues,
  dispatch: Dispatch,
  navigate: NavigateFunction
) {
  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (data) {
      dispatch(setLogin({ user: data.user, token: data.token }));
      navigate("/home");
    }
  } catch (err) {
    console.log(err);
  }
}

export async function register(
  values: registerFromValues,
  setIsLogin: (isLogin: boolean) => void
) {
  try {
    // console.log(values)
    const formData = new FormData();
    for (const value in values) {
      formData.append(value, values[value as keyof typeof values].toString());
    }
    formData.append("profilePicPath", values.profilePicPath.name);

    console.log(formData);

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

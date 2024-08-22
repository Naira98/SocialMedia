import { jwtDecode } from "jwt-decode";
import { Token } from "../types/reduxState";
import { Dispatch } from "@reduxjs/toolkit";
import { setTokens } from "../redux/authSlice";
import { NavigateFunction } from "react-router-dom";

const apiReq = async (
  method: string,
  endpoint: string,
  tokens: Token | null,
  dispatch: Dispatch,
  navigate: NavigateFunction,
  headers?: { [key: string]: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any
) => {
  try {
    let accessToken = tokens?.accessToken;
    const refreshToken = tokens?.refreshToken;

    if (accessToken && refreshToken) {
      const decodedToken = jwtDecode(accessToken);

      if (!decodedToken.exp) throw new Error("Error in decoding token");

      if (decodedToken.exp * 1000 <= Date.now()) {
        const res = await fetch("http://localhost:3000/auth/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });
        // data = {accessToken,refreshToken, userId}
        const data = await res.json();
        if (res.ok) {
          dispatch(setTokens({ tokens: data }));
          accessToken = data.accessToken;
        } else {
          throw new Error(data.message);
        }
      }

      return await fetch(`http://localhost:3000${endpoint}`, {
        method,
        headers: {
          ...(accessToken && {
            Authorization: "Bearer " + accessToken,
          }),
          ...headers,
        },
        body: body,
      });
    } else {
      // navigate("/");
      throw new Error("You are not authenticated");
    }

    // no tokens in redux
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default apiReq;

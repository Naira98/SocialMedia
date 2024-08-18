import { jwtDecode } from "jwt-decode";
import { Token } from "../types/reduxState";

const apiReq = async (
  method: string,
  endpoint: string,
  tokens: Token | null,
  headers?: { [key: string]: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any
) => {
  try {
    let accessToken = null;
    let refreshToken = null;
    if (tokens !== null) {
      accessToken = tokens.accessToken;
      refreshToken = tokens.refreshToken;
      if (accessToken && refreshToken) {
        const decodedToken = jwtDecode(accessToken);
        if (!decodedToken.exp) throw new Error("Error in decoding token");

        if (decodedToken.exp * 1000 < Date.now()) {
          const res = await fetch("http://localhost:3000/auth/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify({ refreshToken, userId: tokens.userId }),
          });
          if (res.ok) {
            const data = await res.json();
            localStorage.setItem("refreshToken", data.refreshToken);
          }
        }
      }
    }
    return await fetch(`http://localhost:3000${endpoint}`, {
      method,
      headers: {
        ...(accessToken && { Authorization: "Bearer " + accessToken }),
        ...headers,
      },
      body: body,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export default apiReq;

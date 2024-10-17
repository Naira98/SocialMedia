import { jwtDecode } from "jwt-decode";
import { getTokens, setAccessToken } from "../util/helpers";

const apiReq = async (
  method: string,
  endpoint: string,
  headers?: { [key: string]: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any
) => {
  try {
    // eslint-disable-next-line prefer-const
    let { accessToken, refreshToken } = getTokens();

    if (accessToken && refreshToken) {
      const decodedToken = jwtDecode(accessToken);

      if (!decodedToken.exp) throw new Error("Error in decoding token");
      if (Date.now() >= decodedToken.exp * 1000) {
        const res = await fetch("http://localhost:3000/auth/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });
        const data = await res.json();
        if (res.ok) {
          setAccessToken(data.accessToken);
          accessToken = data.accessToken;
        } else {
          throw new Error(data.message);
        }
      }

       const res = await fetch(`http://localhost:3000${endpoint}`, {
        method,
        headers: {
          ...(accessToken && {
            Authorization: "Bearer " + accessToken,
          }),
          ...headers,
        },
        body: body,
      });
      return res
    } else {
      throw new Error("You are not authenticated");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default apiReq;

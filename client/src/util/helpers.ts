export const getTokens = () => {
  return {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  };
};

export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const setAccessToken = (accessToken: string) =>
  localStorage.setItem("accessToken", accessToken);

export const setRefreshToken = (refreshToken: string) =>
  localStorage.setItem("refreshToken", refreshToken);

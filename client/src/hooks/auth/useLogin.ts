import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginFormValues } from "../../types/Forms";
import { setAccessToken, setRefreshToken } from "../../util/helpers";

interface Data {
  user: IUser;
  tokens: { accessToken: string; refreshToken: string };
}

import React from "react";
import { IUser } from "../../types/User";

export function useLogin(
  setUserId: React.Dispatch<React.SetStateAction<string | null>>
) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ values }: { values: loginFormValues }) => loginApi(values),
    onSuccess: (data: Data) => {
      queryClient.setQueryData(["user", "me"], data.user);
      setAccessToken(data.tokens.accessToken);
      setRefreshToken(data.tokens.refreshToken);
      setUserId(data.user._id);

      navigate("/home", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { login, isPending, error };
}

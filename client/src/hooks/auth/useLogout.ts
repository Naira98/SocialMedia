import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logout as logoutApi } from "../../services/auth";
import { removeTokens } from "../../util/helpers";

export function useLogut(
  setUserId: React.Dispatch<React.SetStateAction<string | null>>
) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: logout,
    isPending,
    error,
  } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      navigate("/", { replace: true });
      queryClient.setQueryData(["user", "me"], null);
      removeTokens();
      setUserId(null);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { logout, isPending, error };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { removeTokens } from "../../util/helpers";
import React from "react";

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
      queryClient.setQueryData(["user", "me"], null);
      removeTokens();
      navigate("/", { replace: true });
      setUserId(null);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { logout, isPending, error };
}

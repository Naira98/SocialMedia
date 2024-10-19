import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../services/auth";
import { IUser } from "../../types/User";

export function useGetMe(
  userId: string | null,
  setUserId: React.Dispatch<React.SetStateAction<string | null>>
) {
  const navigate = useNavigate();

  const {
    data: me,
    isPending,
    error,
  } = useQuery<IUser>({
    queryKey: ["user", "me"],
    queryFn: () => getMe(userId, setUserId, navigate),
    retry: false,
  });
  return { me, isPending, error };
}

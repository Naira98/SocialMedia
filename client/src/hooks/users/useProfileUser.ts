import { useQuery } from "@tanstack/react-query";
import { getProfileUser } from "../../services/users";
import { IUser } from "../../types/User";

export function useProfileUser(
  userId: string,
) {
  const {
    data: profileUser,
    isPending,
    error,
  } = useQuery<IUser>({
    queryKey: ["user", userId],
    queryFn: () => getProfileUser(userId),
  });
  return { profileUser, isPending, error };
}

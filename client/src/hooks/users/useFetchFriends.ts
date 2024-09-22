import { useQuery } from "@tanstack/react-query";
import { getFetchFriends } from "../../services/users";
import { Friend } from "../../types/User";

// get friends of you or profile friends
export function useFetchFriends(userId: string) {
  const {
    data: friends,
    isPending,
    error,
  } = useQuery<Friend[]>({
    queryKey: ["friends", userId],
    queryFn: () => getFetchFriends(userId),
  });
  return { friends, isPending, error };
}

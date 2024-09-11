import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";

import { Friend, ReduxState } from "../../types/reduxState";
import { getFetchFriends } from "../../services/users";

// open profile page and return profile friends
export function useFetchFriends(refreshToken: string | null, userId: string) {
  const tokens = useSelector((state: ReduxState) => state.tokens)!;
  const dispatch = useDispatch()

  const {
    data: friends,
    isPending,
    error,
  } = useQuery({
    queryKey: ["friends", userId],
    queryFn: (): Promise<Friend[]> => getFetchFriends(tokens, userId, dispatch),
    enabled: !!refreshToken,
  });

  // data=[{_id, firstName, lastName, occupation, picturePath, viewedProfile, impressions}]
  return { friends, isPending, error };
}

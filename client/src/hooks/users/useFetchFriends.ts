import { useQuery } from "@tanstack/react-query";
import { Friend, ReduxState } from "../../types/reduxState";
import { useSelector } from "react-redux";
import { getFetchFriends } from "../../services/users";

// if (!token)
// dispatch outside
// dispatch(setFriends({ friends: data }));

// open profile page and return profile friends
export function useFetchFriends(refreshToken: string | null, userId: string) {
  const tokens = useSelector((state: ReduxState) => state.tokens)!;
  
  const {
    data: friends,
    isPending,
    error,
  } = useQuery({
    queryKey: ["friends", userId],
    queryFn: (): Promise<Friend[]> => getFetchFriends(tokens, userId),
    enabled: !!refreshToken,
  });

  // data=[{_id, firstName, lastName, occupation, picturePath, viewedProfile, impressions}]
  return { friends, isPending, error };
}

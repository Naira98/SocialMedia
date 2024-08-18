import { useQuery } from "@tanstack/react-query";
import { ReduxState } from "../../types/reduxState";
import { useSelector } from "react-redux";
import { getProfileUser } from "../../services/users";

// if (!token)
// dispatch outside
// dispatch(setFriends({ friends: data }));

// open profile page and return profile data
export function useProfileUser(
  userId: string,
) {
  const tokens = useSelector((state: ReduxState) => state.tokens)!;
  const {
    data: profile,
    isPending,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getProfileUser(userId, tokens),
  });
  return { profile, isPending, error };
}

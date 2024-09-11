import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { ReduxState } from "../../types/reduxState";
import { getProfileUser } from "../../services/users";

// if (!token)
// dispatch outside
// dispatch(setFriends({ friends: data }));

export function useProfileUser(
  userId: string,
) {
  const tokens = useSelector((state: ReduxState) => state.tokens)!;
  const dispatch = useDispatch();

  const {
    data,
    isPending,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    // open profile page and return profile data
    queryFn: () => getProfileUser(userId, tokens, dispatch),
  });
  return { data, isPending, error };
}

import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";

import { Friend, ReduxState } from "../../types/reduxState";
import { getFetchFriends } from "../../services/users";
import { useNavigate } from "react-router-dom";

// if (!token)
// dispatch outside
// dispatch(setFriends({ friends: data }));

// open profile page and return profile friends
export function useFetchFriends(refreshToken: string | null, userId: string) {
  const tokens = useSelector((state: ReduxState) => state.tokens)!;
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const {
    data: friends,
    isPending,
    error,
  } = useQuery({
    queryKey: ["friends", userId],
    queryFn: (): Promise<Friend[]> => getFetchFriends(tokens, userId, dispatch, navigate),
    enabled: !!refreshToken,
  });

  // data=[{_id, firstName, lastName, occupation, picturePath, viewedProfile, impressions}]
  return { friends, isPending, error };
}

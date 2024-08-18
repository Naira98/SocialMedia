import { useQuery } from "@tanstack/react-query";
import { getFeed } from "../../services/posts";
import { ReduxState } from "../../types/reduxState";
import { useSelector } from "react-redux";

// if (!token)
// dispatch outside
// dispatch(setPosts({ posts: data }));

export function useGetFeed(refreshToken: string | null, userId: string) {
  const tokens = useSelector((state: ReduxState) => state.tokens)!;

  const {
    data: feed,
    isPending,
    error,
  } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => getFeed(tokens, userId),
    enabled: !!refreshToken,
  });
  return { feed, isPending, error };
}
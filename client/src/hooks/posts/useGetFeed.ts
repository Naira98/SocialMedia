import { useQuery } from "@tanstack/react-query";
import { getFeed } from "../../services/posts";
import { IPost } from "../../types/Post";

export function useGetFeed(isProfile: boolean, userId?:string) {
  const {
    data: feed,
    isPending,
    error,
  } = useQuery<IPost[]>({
    queryKey: ["posts", `${isProfile ? userId : "feed"}`],
    queryFn: () => getFeed(isProfile, userId),
  });
  return { feed, isPending, error };
}

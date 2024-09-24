import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { patchLike as patchLikeApi } from "../../services/posts";

export function usePatchLike({postCreatorId}: {postCreatorId:string}) {
  const queryClient = useQueryClient();

  const { mutate: patchLike } = useMutation({
    mutationFn: (postId: string) => patchLikeApi(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "feed"] });
      queryClient.invalidateQueries({ queryKey: ["posts", postCreatorId] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { patchLike };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { patchLike as patchLikeApi } from "../../services/posts";
import { ReduxState } from "../../types/reduxState";
import { useSelector } from "react-redux";
import { likeCommentPost } from "../../redux/authSlice";

export function usePatchLike() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const tokens = useSelector((state: ReduxState) => state.tokens)!;
  // Mutations
  const { mutate: patchLike } = useMutation({
    mutationFn: (postId: string) => patchLikeApi(postId, tokens),
    onSuccess: (data) => {
      //data= postId
      queryClient.invalidateQueries({ queryKey: ["posts", tokens.userId] });
      dispatch(likeCommentPost({ post: data }));
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { patchLike };
}

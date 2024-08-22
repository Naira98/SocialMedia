import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";

import { likeCommentPost } from "../../redux/authSlice";
import toast from "react-hot-toast";
import { addComment as addCommentApi } from "../../services/posts";
import { ReduxState } from "../../types/reduxState";
import { useNavigate } from "react-router-dom";

export function useAddComment(
  setComment: React.Dispatch<React.SetStateAction<string>>
) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokens = useSelector((state: ReduxState) => state.tokens)!;
  // Mutations
  const {
    mutate: addComment,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ comment, postId }: { comment: string; postId: string }) =>
      addCommentApi(comment, postId, tokens, dispatch, navigate),
    onSuccess: (post) => {
      // posts = Post  updated post only with userId populated
      queryClient.invalidateQueries({ queryKey: ["posts", tokens.userId] });
      queryClient.invalidateQueries({ queryKey: ["posts", 'feed'] });
      dispatch(likeCommentPost({ post }));
      setComment("");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { addComment, isPending, error };
}

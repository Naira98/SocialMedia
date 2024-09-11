import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { deletePost as deletePostApi } from "../../services/posts";
import { ReduxState } from "../../types/reduxState";
import { deletePost as deletePostAction } from "../../redux/authSlice";

export function useDeletePost() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const tokens = useSelector((state: ReduxState) => state.tokens)!;
  // Mutations
  const { mutate: deletePost } = useMutation({
    mutationFn: (postId: string) =>
      deletePostApi(postId, tokens, dispatch),
    onSuccess: (data) => {
      //data= postId
      queryClient.invalidateQueries({ queryKey: ["posts", tokens.userId] });
      queryClient.invalidateQueries({ queryKey: ["posts", "feed"] });
      dispatch(deletePostAction(data));
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deletePost };
}

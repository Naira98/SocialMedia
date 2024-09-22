import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deletePost as deletePostApi } from "../../services/posts";
import { useAuth } from "../../contexts/useAuth";

export function useDeletePost() {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  const { mutate: deletePost } = useMutation({
    mutationFn: (postId: string) => deletePostApi(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", userId] });
      queryClient.invalidateQueries({ queryKey: ["posts", "feed"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deletePost };
}

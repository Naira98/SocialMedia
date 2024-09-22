import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addComment as addCommentApi } from "../../services/posts";

export function useAddComment({
  postCreatorId,
  setComment,
}: {
  postCreatorId: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
}) {
  const queryClient = useQueryClient();

  const {
    mutate: addComment,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ comment, postId }: { comment: string; postId: string }) =>
      addCommentApi(comment, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", postCreatorId] });
      queryClient.invalidateQueries({ queryKey: ["posts", "feed"] });
      setComment("");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { addComment, isPending, error };
}

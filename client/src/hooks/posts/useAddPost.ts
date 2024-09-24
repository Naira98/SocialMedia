import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addPost as addPostApi } from "../../services/posts";
import { useAuth } from "../../contexts/useAuth";

export function useAddPost(
  setImage: React.Dispatch<React.SetStateAction<File | null>>,
  setIsImage: React.Dispatch<React.SetStateAction<boolean>>,
  setPost: React.Dispatch<React.SetStateAction<string>>
) {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  const {
    mutate: addPost,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ post, image }: { post: string; image: File | null }) =>
      addPostApi(post, image),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["posts", "feed"]});
      queryClient.invalidateQueries({queryKey: ["posts", userId]});
      setImage(null);
      setIsImage(false);
      setPost("");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { addPost, isPending, error };
}

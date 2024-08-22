import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setPosts } from "../../redux/authSlice";
import toast from "react-hot-toast";
import { addPost as addPostApi } from "../../services/posts";
import { ReduxState } from "../../types/reduxState";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useAddPost(
  setImage: React.Dispatch<React.SetStateAction<File | null>>,
  setIsImage: React.Dispatch<React.SetStateAction<boolean>>,
  setPost: React.Dispatch<React.SetStateAction<string>>
) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const tokens = useSelector((state: ReduxState) => state.tokens)!;
  // Mutations
  const {
    mutate: addPost,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({
      post,
      image,
      location,
    }: {
      post: string;
      image: File | null;
      location: string;
    }) => addPostApi(post, image, tokens, location, dispatch, navigate),
    onSuccess: (posts) => {
      // posts = Post[] allPosts
      queryClient.setQueryData(["posts", tokens.userId], posts);
      dispatch(setPosts({ posts }));
      setImage(null)
      setIsImage(false);
      setPost("");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { addPost, isPending, error };
}

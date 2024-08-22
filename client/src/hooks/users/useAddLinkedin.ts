import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { ReduxState } from "../../types/reduxState";
import { setUser } from "../../redux/authSlice";
import { addLinkedin as addLinkedinApi } from "../../services/users";
import { useNavigate } from "react-router-dom";

export function useAddLinkedin(
  setIsLinkedin: React.Dispatch<React.SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokens = useSelector((state: ReduxState) => state.tokens)!;

  // Mutations
  const { mutate: addLinkedin } = useMutation({
    mutationFn: ({ userId, link }: { userId: string; link: string }) =>
      addLinkedinApi(userId, link, tokens, dispatch, navigate),
    onSuccess: (user) => {
      // data = updatedUser
      queryClient.setQueryData(["user", tokens.userId], user);
      dispatch(setUser(user));
      setIsLinkedin(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { addLinkedin };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { ReduxState } from "../../types/reduxState";
import { setUser } from "../../redux/authSlice";
import { addTwitter as addTwitterApi } from "../../services/users";

export function useAddTwitter(
  setIsTwitter: React.Dispatch<React.SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const tokens = useSelector((state: ReduxState) => state.tokens)!;

  // Mutations
  const { mutate: addTwitter } = useMutation({
    mutationFn: ({ userId, link }: { userId: string; link: string }) =>
      addTwitterApi(userId, link, tokens),
    onSuccess: (user) => {
      // data = updatedUser
      queryClient.setQueryData(["user", tokens.userId], user);
      dispatch(setUser(user));
      setIsTwitter(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { addTwitter };
}

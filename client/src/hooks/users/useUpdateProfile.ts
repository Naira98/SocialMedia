import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { ReduxState } from "../../types/reduxState";
import { setUser } from "../../redux/authSlice";
import { updateAccount as updateAccountApi } from "../../services/users";

export function useUpdateAccount(setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const tokens = useSelector((state: ReduxState) => state.tokens)!;

  // Mutations
  const { mutate: updateAccount } = useMutation({
    mutationFn: ({
      userId,
      firstName,
      lastName,
    }: {
      userId: string;
      firstName: string;
      lastName: string;
    }) => updateAccountApi(userId, firstName, lastName, tokens),
    onSuccess: (user) => {
      // data = updatedUser
      queryClient.setQueryData(["user", tokens.userId], user);
      dispatch(setUser(user));
      setIsUpdate(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateAccount };
}

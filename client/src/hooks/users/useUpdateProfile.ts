import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateAccount as updateAccountApi } from "../../services/users";

export function useUpdateAccount(
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();

  const { mutate: updateAccount } = useMutation({
    mutationFn: ({
      userId,
      firstName,
      lastName,
    }: {
      userId: string;
      firstName: string;
      lastName: string;
    }) => updateAccountApi(firstName, lastName, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["user", "me"]});
      setIsUpdate(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateAccount };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addTwitter as addTwitterApi } from "../../services/users";
import { IUser } from "../../types/User";

export function useAddTwitter(
  setIsTwitter: React.Dispatch<React.SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();

  const { mutate: addTwitter } = useMutation({
    mutationFn: ({ userId, link }: { userId: string; link: string }) =>
      addTwitterApi(userId, link),
    onSuccess: (user: IUser) => {
      queryClient.setQueryData(["user", "me"], user);
      setIsTwitter(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { addTwitter };
}

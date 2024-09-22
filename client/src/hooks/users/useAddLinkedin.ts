import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addLinkedin as addLinkedinApi } from "../../services/users";
import { IUser } from "../../types/User";

export function useAddLinkedin(
  setIsLinkedin: React.Dispatch<React.SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();

  const { mutate: addLinkedin } = useMutation({
    mutationFn: ({ userId, link }: { userId: string; link: string }) =>
      addLinkedinApi(userId, link),
    onSuccess: (user: IUser) => {
      queryClient.setQueryData(["user", "me"], user);
      setIsLinkedin(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { addLinkedin };
}

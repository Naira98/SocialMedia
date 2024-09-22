import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addRemoveFriend as addRemoveFriendApi } from "../../services/users";
import { Friend } from "../../types/User";

export function useAddRemoveFriend({
  friendId,
  currentUserId,
}: {
  friendId: string;
  currentUserId: string;
}) {
  const queryClient = useQueryClient();

  const { mutate: addRemoveFriend } = useMutation({
    mutationFn: (friendId: string) => addRemoveFriendApi(friendId),
    onSuccess: (data: Friend[]) => {
      queryClient.setQueryData(["friends", currentUserId], data);
      queryClient.invalidateQueries({
        queryKey: ["friends", friendId],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { addRemoveFriend };
}

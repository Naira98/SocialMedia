import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addRemoveFriend as addRemoveFriendApi } from "../../services/users";

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends", currentUserId] });
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

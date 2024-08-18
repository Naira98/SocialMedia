import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { ReduxState } from "../../types/reduxState";
import { useSelector } from "react-redux";
import { setFriends } from "../../redux/authSlice";
import { addRemoveFriend as addRemoveFriendApi } from "../../services/users";

export function useAddDeleteFriend({
  freindId,
}:{freindId:string}) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const tokens = useSelector((state: ReduxState) => state.tokens)!;
  // Mutations
  const { mutate: addRemoveFriend } = useMutation({
    mutationFn: (friendId: string) => addRemoveFriendApi(friendId, tokens),
    onSuccess: (data) => {
      //friends= array of {_id, firstName, lastName, occupation, picturePath, viewedProfile, impressions}[]
      queryClient.invalidateQueries({ queryKey: ["friends", tokens.userId] });
      queryClient.invalidateQueries({
        queryKey: ["friends", freindId],
      });
      dispatch(setFriends({ friends: data }));
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { addRemoveFriend };
}

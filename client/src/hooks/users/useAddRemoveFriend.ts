import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { ReduxState } from "../../types/reduxState";
import { setFriendsData } from "../../redux/authSlice";
import { addRemoveFriend as addRemoveFriendApi } from "../../services/users";
import { useNavigate } from "react-router-dom";

export function useAddDeleteFriend({
  freindId,
}:{freindId:string}) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokens = useSelector((state: ReduxState) => state.tokens)!;
  // Mutations
  const { mutate: addRemoveFriend } = useMutation({
    mutationFn: (friendId: string) => addRemoveFriendApi(friendId, tokens, dispatch, navigate),
    onSuccess: (data) => {
      //friends= array of {_id, firstName, lastName, occupation, picturePath, viewedProfile, impressions}[]
      queryClient.invalidateQueries({ queryKey: ["friends", tokens.userId] });
      queryClient.invalidateQueries({
        queryKey: ["friends", freindId],
      });
      dispatch(setFriendsData({ friends: data }));
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { addRemoveFriend };
}

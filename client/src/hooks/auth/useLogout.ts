import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../redux/authSlice";
import toast from "react-hot-toast";
import { ReduxState } from "../../types/reduxState";
import { useSelector } from "react-redux";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tokens = useSelector((state: ReduxState) => state.tokens);
  // Mutations
  const {
    mutate: logout,
    isPending,
   
  } = useMutation({
    mutationFn: () => logoutApi(tokens),
    onSuccess: () => {
      // data = {user: {}, tokens: {}}
      queryClient.setQueryData(["user"], null);
      dispatch(setLogout());
      localStorage.removeItem("refreshToken");
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { logout, isPending };
}

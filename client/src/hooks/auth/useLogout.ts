import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../redux/authSlice";
import toast from "react-hot-toast";

export function useLogut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Mutations
  const {
    mutate: logout,
    isPending,
    error,
  } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["user"]});
      dispatch(setLogout());
      localStorage.removeItem("refreshToken");
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { logout, isPending, error };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/authSlice";
import toast from "react-hot-toast";
import { loginFormValues } from "../../types/form";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Mutations
  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ values }: { values: loginFormValues }) => loginApi(values),
    onSuccess: (data) => {
      // data = {user: {}, tokens: {}}
      queryClient.setQueryData(["user"], data.user);
      dispatch(setLogin({ user: data.user, tokens: data.tokens }));
      localStorage.setItem("accessToken", data.tokens.accessToken);
      localStorage.setItem("refreshToken", data.tokens.refreshToken);

      navigate("/home", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { login, isPending, error };
}

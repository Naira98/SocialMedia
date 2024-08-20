import { useMutation } from "@tanstack/react-query";
import { register as registerApi } from "../../services/auth";

import toast from "react-hot-toast";
import { registerFromValues } from "../../types/form";

export function useRegister() {
  // Mutations
  const {
    mutate: register,
    isPending,
  } = useMutation({
    mutationFn: ({
      values,
      setIsLogin,
    }: {
      values: registerFromValues;
      setIsLogin: (isLogin: boolean) => void;
    }) => registerApi(values, setIsLogin),
    onSuccess: () => {
      toast.success("Account created successfully");
    },
    onError: (err) => {
      console.log(err)
      toast.error(err.message);
    },
  });
  return { register, isPending };
}

import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/auth";
import { useDispatch } from "react-redux";

// const refreshToken = localStorage.getItem("refreshToken");
// if (refreshToken === null) return navigate("/");

export function useGetUser(refreshToken: string | null) {
  const dispatch = useDispatch()
  // Mutations
  const { data: userDataAndTokens, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(refreshToken!, dispatch),
  });
  // user = {userData: {}, refreshData: {userId, accessToken, refreshToken}}
  return { userDataAndTokens, isPending };
}

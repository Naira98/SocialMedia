import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ReduxState } from "../../types/reduxState";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../services/auth";

// const refreshToken = localStorage.getItem("refreshToken");
// if (refreshToken === null) return navigate("/");

export function useGetUser(refreshToken: string | null) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokens = useSelector((state: ReduxState) => state.tokens);
  const user = useSelector((state: ReduxState) => state.user);

  // Mutations
  const { isPending, error } = useQuery({
    queryKey: ["user", `${refreshToken && tokens ? tokens.userId : null}`],
    queryFn: () => getUser(user, refreshToken, dispatch, navigate),
  });
  // user = {userData: {}, refreshData: {userId, accessToken}}
  return { isPending, error };
}

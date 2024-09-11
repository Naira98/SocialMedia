import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReduxState } from "../types/reduxState";

const ProtectedRoutes = ({ children }: { children: ReactElement }) => {
  const isAuth = useSelector((state: ReduxState) => state.isAuth);

  console.log({ isAuth });

  if (!isAuth) return <Navigate to={'/'} replace />;

  return children;
};

export default ProtectedRoutes;

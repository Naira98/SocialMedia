import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReduxState } from "../types/reduxState";

const ProtectedLogin = ({ children }: { children: ReactElement }) => {
  const isAuth = useSelector((state: ReduxState) => state.isAuth);

  if (isAuth) return <Navigate to="/home" replace />;

  return children;
};

export default ProtectedLogin;

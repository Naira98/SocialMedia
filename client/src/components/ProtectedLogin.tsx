import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const ProtectedLogin = ({ children }: { children: ReactElement }) => {
  const { userId } = useAuth();

  if (userId) return <Navigate to="/home" replace />;

  return children;
};

export default ProtectedLogin;

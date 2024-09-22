import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const ProtectedRoutes = ({ children }: { children: ReactElement }) => {
  const { userId } = useAuth();

  if (!userId) return <Navigate to={"/"} replace />;

  return children;
};

export default ProtectedRoutes;

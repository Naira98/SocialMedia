import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

import { ReduxState } from "../types/reduxState";
import { jwtPayloadWithUser } from "../types/jwtPayload";

const ProtectedRoutes = ({ children }: { children: ReactElement }) => {
  const user = useSelector((state: ReduxState) => state.user);
  const token = useSelector((state: ReduxState) => state.token);

  if (!token) return <Navigate to="/" replace/>;

  const decodedToken: jwtPayloadWithUser = jwtDecode(token);

  if (decodedToken.userId.toString() === user?._id.toString()) {
    return children;
  } else {
    return <Navigate to="/" replace/>;
  }
};

export default ProtectedRoutes;

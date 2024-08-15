import { Outlet } from "react-router-dom";
import Nvabar from "./Nvabar";

const AppLayout = () => {
  return (
    <>
      <Nvabar />
      <Outlet />
    </>
  );
};

export default AppLayout;

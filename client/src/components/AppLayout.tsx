import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Nvabar from "./Navbar";

const AppLayout = () => {
  return (
    <Box>
      <Nvabar />
      <Outlet />
    </Box>
  );
};

export default AppLayout;

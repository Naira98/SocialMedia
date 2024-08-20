import { Outlet } from "react-router-dom";
import Nvabar from "./Navbar";
import { Box } from "@mui/material";

const AppLayout = () => {
  return (
    <Box>
      <Nvabar />
      <Outlet />
    </Box>
  );
};

export default AppLayout;

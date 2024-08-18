import { Outlet } from "react-router-dom";
import Nvabar from "./Nvabar";
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

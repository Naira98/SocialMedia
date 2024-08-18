import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui//material/styles";
import { Toaster } from "react-hot-toast";
import { themeSettings } from "./theme";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AppLayout from "./components/AppLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ReduxState } from "./types/reduxState";
import { useGetUser } from "./hooks/auth/useGetUser";
import { ThemeWithPalette } from "./types/ThemeWithPalette";
import { getRefreshToken } from "./util/helpers";
import Spinner from "./components/Spinner";

const App = () => {
  const mode = useSelector((state: ReduxState) => state.mode);
  const theme: ThemeWithPalette = useMemo(
    () => createTheme(themeSettings(mode)),
    [mode]
  );
  const navigate = useNavigate();

  const refreshToken = getRefreshToken();

  useEffect(() => {
    if (refreshToken === null) return navigate("/");
  }, [navigate, refreshToken]);

  const { isPending } = useGetUser(refreshToken);


  if (isPending && window.location.pathname !== "/") return <Spinner />;

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            element={
              <ProtectedRoutes>
                <AppLayout />
              </ProtectedRoutes>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route
              path="/profile/:userId"
              element={<Profile key={window.location.pathname} />}
            />
          </Route>
        </Routes>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            // Define default options
            style: {
              fontSize: "15px",
              padding: "16px 24px",
              maxWidth: "500px",
              background: theme.palette.background.alt,
              color: theme.palette.primary.main,
            },

            // Default options for specific types
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
          }}
        />
      </ThemeProvider>
    </div>
  );
};

export default App;

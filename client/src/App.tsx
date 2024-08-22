import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui//material/styles";
import toast, { Toaster } from "react-hot-toast";
import { themeSettings } from "./theme";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AppLayout from "./components/AppLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ReduxState } from "./types/reduxState";
import { ThemeWithPalette } from "./types/ThemeWithPalette";
import { getRefreshToken } from "./util/helpers";
import Spinner from "./components/Spinner";
import ProtectedLogin from "./components/ProtectedLogin";
import { useGetUser } from "./hooks/auth/useGetUser";

const App = () => {
  const mode = useSelector((state: ReduxState) => state.mode);
  const theme: ThemeWithPalette = useMemo(
    () => createTheme(themeSettings(mode)),
    [mode]
  );
  const refreshToken = getRefreshToken();
  const navigate = useNavigate();

  const { userData, isPending, error } = useGetUser(refreshToken);
  
  useEffect(() => {
    if (userData == null) navigate("/");
  }, [userData, navigate]);
  if (error) toast.error(error.message);

  if (isPending) return <Spinner />;

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedLogin>
                <Login />
              </ProtectedLogin>
            }
          />
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

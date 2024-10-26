import { useMemo } from "react";
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
import Spinner from "./components/Spinner";
import ProtectedLogin from "./components/ProtectedLogin";
import { ThemeWithPalette } from "./types/ThemeWithPalette";
import { useGetMe } from "./hooks/auth/useGetMe";
import { useMode } from "./contexts/useMode";
import { useAuth } from "./contexts/useAuth";
import { removeTokens } from "./util/helpers";
import NotFound from "./pages/NotFound";

const App = () => {
  const { mode } = useMode();
  const theme: ThemeWithPalette = useMemo(
    () => createTheme(themeSettings(mode)) as ThemeWithPalette,
    [mode]
  );
  const navigate = useNavigate();
  const { userId, setUserId } = useAuth();
  const { isPending, error } = useGetMe(userId, setUserId);

  if (error) {
    removeTokens();
    navigate("/");
  }

  if (isPending)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner />
      </div>
    );

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
            <Route path="*" element={<NotFound />} />
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

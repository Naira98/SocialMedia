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
import { ThemeWithPalette } from "./types/ThemeWithPalette";
import { getRefreshToken } from "./util/helpers";
import Spinner from "./components/Spinner";
import { useDispatch } from "react-redux";
import { getUser } from "./services/auth";
import { setLogin } from "./redux/authSlice";
import ProtectedLogin from "./components/ProtectedLogin";
// import { useGetUser } from "./hooks/auth/useGetUser";

const App = () => {
  const mode = useSelector((state: ReduxState) => state.mode);
  const theme: ThemeWithPalette = useMemo(
    () => createTheme(themeSettings(mode)),
    [mode]
  );
  const refreshToken = getRefreshToken();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: ReduxState) => state.isLoading);
  // const {userDataAndTokens, isPending} = useGetUser(refreshToken);

  // console.log(userDataAndTokens)

  // console.log(userDataAndTokens?.isToken && isPending)

  useEffect(() => {
    if (refreshToken === null) return navigate("/");
    const fetchUesr = async () => {
      const data = await getUser(refreshToken, dispatch, navigate);
      if (data) {
        // console.log(data)
        dispatch(setLogin({ user: data.user, tokens: data.tokens }));
        if (document.location.pathname == "/") navigate("/home");
      }

      // console.log(data);
    };
    fetchUesr();
  }, [dispatch, navigate, refreshToken]);

  if (isLoading) return <Spinner />;

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

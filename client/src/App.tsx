import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReduxState } from "./types/reduxState";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui//material/styles";
import { themeSettings } from "./theme";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AppLayout from "./components/AppLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  const mode = useSelector((state: ReduxState) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  console.log(theme)

  return (
    <div className="app">
      <BrowserRouter>
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
              <Route path="/profile/:userId" element={<Profile />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;

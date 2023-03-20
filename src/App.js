import React from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { Routes, Route } from "react-router-dom";
import Navbar from "./scenes/Navbar/Navbar";
import LoginPage from "./scenes/LoginPage/LoginPage";
import HomePage from "scenes/HomePage/HomePage";
import UserWidget from "scenes/Widgets/UserWidget";
import ProfilePage from "scenes/ProfilePage/ProfilePage";
import Prefetch from "features/auth/Prefetch";

const App = () => {
  // Pass selected mode as an argument to themeSettings so that createTheme can generate a theme with given options
  // After that useMemo is going to memoize and cache results returned from createTheme and only run again when the dependency has altered
  const { mode, user } = useSelector((state) => state.auth);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <Box className="app" width="100vw">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route element={<Prefetch />}>
            <Route path="/home" element={user ? <HomePage /> : <LoginPage />} />
            <Route
              path="/:id"
              element={user ? <UserWidget /> : <LoginPage />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/profile/:id"
              element={user ? <ProfilePage /> : <LoginPage />}
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </Box>
  );
};
export default App;

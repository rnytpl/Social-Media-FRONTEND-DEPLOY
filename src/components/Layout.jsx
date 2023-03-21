import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "scenes/Navbar/Navbar";
import { themeSettings } from "theme";

const Layout = () => {
  const { mode } = useSelector((state) => state.auth);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <Box className="app" width="100vw">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Outlet />
      </ThemeProvider>
    </Box>
  );
};
export default Layout;

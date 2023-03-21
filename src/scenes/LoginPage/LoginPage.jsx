import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isXXLScreen = useMediaQuery("(min-width: 1400px)");
  const isExtraLargeScreen = useMediaQuery("(min-width: 1200px)");
  const isLargeScreen = useMediaQuery("(min-width: 1000px)");
  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
  const isSmallScreen = useMediaQuery("(min-width: 600px)");

  return (
    <Box
      width={
        isXXLScreen
          ? "25%"
          : isExtraLargeScreen
          ? "35%"
          : isLargeScreen
          ? "50%"
          : isNonMobileScreens
          ? "70%"
          : isSmallScreen
          ? "80%"
          : "90%"
      }
      p="2rem"
      m="2rem auto"
      borderRadius="1.5rem"
      backgroundColor={theme.palette.background.alt}
    >
      <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
        Welcome to Socipedia, the Social Media for Sociopaths!
      </Typography>
      <Form />
    </Box>
  );
};

export default LoginPage;

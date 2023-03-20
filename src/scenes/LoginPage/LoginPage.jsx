import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isExtraLargeScreen = useMediaQuery("(min-width: 1500px)");
  const isLargeScreen = useMediaQuery("(min-width: 1300px)");
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isSmallScreen = useMediaQuery("(min-width: 600px)");

  return (
    <Box
      width={
        isExtraLargeScreen
          ? "25%"
          : isLargeScreen
          ? "30%"
          : isNonMobileScreens
          ? "50%"
          : isSmallScreen
          ? "60%"
          : "60%"
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

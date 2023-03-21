import { FlexBetween } from "../../components/FlexBetween";
import {
  Box,
  Typography,
  InputBase,
  FormControl,
  IconButton,
  Select,
  MenuItem,
  useMediaQuery,
  styled,
} from "@mui/material";
import {
  Search,
  Message,
  Notifications,
  Help,
  DarkMode,
  LightMode,
  Menu,
  Close,
  AccountCircle,
} from "@mui/icons-material/";
import { useTheme } from "@mui/material";
import { setMode, logout } from "features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const isXXLScreen = useMediaQuery("(min-width:1400px)");

  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  const neutralLight = theme.palette.neutral.light;
  // const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  // const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.primary.main,
  }));

  return (
    <Box backgroundColor={alt} m="auto" textAlign="center">
      <FlexBetween
        gap="2rem"
        width={isXXLScreen ? "65vw" : "80vw"}
        sx={{ p: "1.15rem 2.75rem", m: "auto" }}
      >
        <FlexBetween gap="2.25rem">
          <Typography fontWeight="bold" fontSize="32px" color="primary">
            <StyledLink to="/home">SocioPedia</StyledLink>
          </Typography>
          {isNonMobileScreen && (
            <FlexBetween
              gap="2.25rem"
              backgroundColor={neutralLight}
              padding="0.1rem 1.5rem"
              borderRadius="0.25rem"
            >
              <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>
        {/* DESKTOP MAV */}
        {isNonMobileScreen && (
          <FlexBetween gap="1.25rem">
            <FlexBetween>
              <IconButton
                sx={{ mr: "0.75rem" }}
                onClick={() => dispatch(setMode())}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ fontSize: "25px" }} />
                )}
              </IconButton>
              <IconButton sx={{ mr: "0.75rem" }}>
                <Message sx={{ fontSize: "25px" }} />
              </IconButton>
              <IconButton sx={{ mr: "0.75rem" }}>
                <Notifications sx={{ fontSize: "25px" }} />
              </IconButton>
              <IconButton sx={{ mr: "0.75rem" }}>
                <Help sx={{ fontSize: "25px" }} />
              </IconButton>
            </FlexBetween>
            <FlexBetween>
              {!user ? (
                <IconButton onClick={() => navigate("login")}>
                  <AccountCircle sx={{ fontSize: "25px" }} />
                </IconButton>
              ) : (
                <FormControl value={user?.firstName}>
                  <Select value={user?.firstName} sx={{ width: "125px" }}>
                    <MenuItem value={user?.firstName}>
                      <Typography>{user?.firstName}</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => dispatch(logout())}>
                      Logout
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            </FlexBetween>
          </FlexBetween>
        )}
        {/* MOBILE NAV */}
        {!isNonMobileScreen && !isMobileMenuToggled && (
          <Menu onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)} />
        )}
        {isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            top="0"
            zIndex="10"
            maxWidth="300px"
            minWidth="200px"
            backgroundColor={background}
          >
            <Box display="flex" height="100%">
              <MenuItem
                onClick={() => dispatch(setMode())}
                sx={{ width: "100%" }}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px", width: "100%" }} />
                ) : (
                  <LightMode sx={{ fontSize: "25px", width: "100%" }} />
                )}
              </MenuItem>
              <MenuItem
                onClick={() => setIsMobileMenuToggled((prev) => !prev)}
                sx={{
                  width: "100%",
                }}
              >
                <Close
                  sx={{
                    fontSize: "25px",
                    height: "30px",
                    width: "100%",
                    padding: "0.25rem 0",
                  }}
                />
              </MenuItem>
            </Box>
            {user ? (
              <>
                <MenuItem
                  sx={{
                    padding: "1rem 2rem",
                    textAlign: "center",
                  }}
                >
                  {user?.firstName}
                </MenuItem>
                <MenuItem
                  sx={{
                    padding: "1rem 2rem",
                    textAlign: "center",
                  }}
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <MenuItem
                sx={{
                  padding: "1rem 2rem",
                  textAlign: "center",
                }}
                onClick={() => navigate("login")}
              >
                Login
              </MenuItem>
            )}
          </Box>
        )}
      </FlexBetween>
    </Box>
  );
};
export default Navbar;

import { useEffect, useState } from "react";
import {
  Grid,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  FormLabel,
} from "@mui/material";
import Dropzone from "react-dropzone";
import { useTheme } from "@emotion/react";
import { Close, Label } from "@mui/icons-material";
import { FlexBetween } from "../../components/FlexBetween";
import { useRegisterMutation } from "../../features/auth/authApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import LoadingButton from "components/LoadingButton";
import Error from "components/Error";
import { setUser } from "features/auth/authSlice";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [pageType, setPageType] = useState("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");
  const [location, setLocation] = useState("");
  const [picture, setPicture] = useState(null);
  const [picturePath, setPicturePath] = useState("");

  console.log(email);

  const [
    register,
    {
      isLoading: isRegisterLoading,
      isError: isRegisterError,
      isSuccess: isRegisterSuccess,
      error: registerError,
    },
  ] = useRegisterMutation();

  const resetStates = () => {
    setFirstName("");
    setLastName("");
    setPassword("");
    setEmail("");
    setOccupation("");
    setLocation("");
    setPicture("");
    setPicturePath("");
    setPageType("login");
  };

  const [
    login,
    { isLoading: isLoginLoading, isSuccess: isLoginSuccess, error: loginError },
  ] = useLoginMutation();

  useEffect(() => {
    if (isRegisterSuccess) {
      resetStates();
      navigate("/login");
    }
  }, [isRegisterSuccess, navigate]);

  useEffect(() => {
    if (isLoginSuccess) {
      resetStates();
      navigate("/home");
    }
  }, [isLoginSuccess, navigate]);

  const onPageTypeClicked = (type) => {
    resetStates();
    setPageType(type);
  };

  const onRegisterClicked = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const values = {
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email,
      occupation: occupation,
      location: location,
      picture: picture,
    };

    Object.entries(values).map(([key, value]) => formData.append(key, value));
    formData.append("picturePath", picture.name);

    await register(formData);
  };

  const onLoginClicked = async (e) => {
    e.preventDefault();
    const response = await login([email, password]).unwrap();
    dispatch(setUser(response));
  };

  const registerCanSave = [
    firstName,
    lastName,
    email,
    password,
    occupation,
    location,
  ].every(Boolean);

  const loginCanSave = [email, password].every(Boolean);

  return (
    <form
      component="form"
      encType="multipart/form-data"
      onSubmit={onRegisterClicked}
    >
      {pageType === "register" ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              label="Fist Name"
              required
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              label="Last Name"
              required
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="email"
              type="email"
              label="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="password"
              type="password"
              label="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="occupation"
              label="Occupation"
              required
              onChange={(e) => setOccupation(e.target.value)}
              value={occupation}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="location"
              label="Location"
              required
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              border={`1px solid ${theme.palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
            >
              <Dropzone
                acceptedFiles=".jpeg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) => {
                  setPicture(acceptedFiles[0]);
                }}
              >
                {({ getRootProps, getInputProps }) => {
                  return (
                    <FlexBetween
                      {...getRootProps()}
                      flexDirection="column"
                      height="50px"
                    >
                      {picture ? (
                        <FlexBetween
                          justifyContent="space-between"
                          gap="2.25rem"
                          margin="auto"
                        >
                          <Typography sx={{ position: "relative" }}>
                            {picture.path}
                            <IconButton
                              onClick={() => setPicture(null)}
                              sx={{
                                position: "absolute",
                                padding: "0",
                                top: "0",
                                color: "red",
                                width: "15px",
                                ml: "0.25rem",
                              }}
                            >
                              <Close sx={{ fontSize: "1rem" }} />
                            </IconButton>
                          </Typography>
                        </FlexBetween>
                      ) : (
                        <Box margin="auto">
                          <TextField
                            type="file"
                            {...getInputProps()}
                            name="picture"
                          />
                          <Typography>
                            Drag 'n' drop some files here, or click to select
                            files
                          </Typography>
                        </Box>
                      )}
                    </FlexBetween>
                  );
                }}
              </Dropzone>
            </Box>
          </Grid>
          {isRegisterError && <Error error={registerError.data.message} />}
          <Grid item xs={12}>
            {isRegisterLoading ? (
              <LoadingButton fullWidth />
            ) : (
              <Button
                type="submit"
                sx={{
                  padding: "0.5rem 0.25rem",
                  backgroundColor: theme.palette.primary.light,
                  fontSize: "15px",
                  letterSpacing: "2px",
                }}
                fullWidth
                disabled={!registerCanSave && true}
              >
                Register
              </Button>
            )}
            <Box p="1rem 0.25rem">
              <Typography sx={{ color: theme.palette.primary.main }}>
                Already haven an account? Sign in{" "}
                <Link onClick={() => onPageTypeClicked("login")}>here.</Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              value={email}
              type="email"
            />
            <FormLabel>*Test Email: test@test.com</FormLabel>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              fullWidth
            />
            <FormLabel>*Test Password: 123456</FormLabel>
          </Grid>
          {loginError && <Error error={loginError.data.message} />}
          <Grid item xs={12}>
            {isLoginLoading ? (
              <LoadingButton />
            ) : (
              <Button
                sx={{
                  padding: "0.5rem 0.25rem",
                  backgroundColor: theme.palette.primary.light,
                  fontSize: "15px",
                  letterSpacing: "2px",
                }}
                onClick={onLoginClicked}
                fullWidth
                disabled={!loginCanSave && true}
              >
                Login
              </Button>
            )}
            <Box p="1rem 0.25rem">
              <Typography sx={{ color: theme.palette.primary.main }}>
                Don't have an account yet? Register{" "}
                <Link
                  className="default-link"
                  onClick={() => onPageTypeClicked("register")}
                  underline="none"
                >
                  here.
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </form>
  );
};
export default Form;

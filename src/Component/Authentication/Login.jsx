import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      TickTick
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const Login = () => {
  const Nav = useNavigate();

  //   login data
  const email = useRef("");
  const password = useRef("");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [emailerror, setEmailerror] = useState(false);
  const [passworderror, setPasswoderror] = useState(false);

  const validate = () => {
    let valid = true;
    if (email.current.value == "") {
      setEmailerror(true);
      valid = false;
    } else {
      setEmailerror(false);
      valid = true;
    }
    if (password.current.value == "") {
      setPasswoderror(true);
      valid = false;
    } else {
      setPasswoderror(false);
      valid = true;
    }
    return valid;
  };

  // loader state
  const [loader, setLoader] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      setLoader(true);
      const obj = {
        email: email.current.value,
        password: password.current.value,
      };
      const res = await axios.post("https://tick-tick-api.vercel.app/login", obj);
      // console.log(res.data);

      if (res.data.msg == "User is Successfully Login") {
        localStorage.setItem("accesstoken", res.data.accesstoken);
        localStorage.setItem("username", res.data.user);
        toast.success("User is Successfully Login");
        setTimeout(() => {
          setLoader(false);
          Nav("/");
        }, 2000);
      } else {
        setLoader(false);
        toast.warn(res.data.msg);
      }
      email.current.value = "";
      password.current.value = "";
    }
  };

  return (
    <div className="bgimg  bg-slate-100 flex items-center">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* email input */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={emailerror}
                  helperText={emailerror ? "Enter Email" : ""}
                  id="email"
                  inputRef={email}
                  label="Email Address"
                  autoComplete="email"
                />
              </Grid>
              {/* password */}
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    {passworderror ? (
                      <span className="text-red-700">Password</span>
                    ) : (
                      "Password"
                    )}
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    error={passworderror}
                    inputRef={password}
                    label="Password"
                    required
                  />
                  <FormHelperText>
                    {passworderror ? (
                      <span className="text-red-700">Enter Password</span>
                    ) : (
                      ""
                    )}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {!loader ? (
                <span className="text-lg">Sign In</span>
              ) : (
                <CircularProgress color="inherit" />
              )}
            </Button>
            <Grid container justifyContent="center">
              <Grid item className=" cursor-pointer">
                <Link onClick={() => Nav("/signup")} variant="body2">
                  Dont have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Login;

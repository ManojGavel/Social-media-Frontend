import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { Fragment } from "react";
import classes from "./login.module.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLoginMutation } from "../Store/API's/baseURL";
import Cookies from "js-cookie";

export default function LogIn() {
const [loginUser] = useLoginMutation();
const navigate = useNavigate();
 
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const onSbumit = (data) => {
    loginUser({
      email: data.logInEmail,
      password: data.logInPassword,
    }).unwrap().then((originalPromiseResult) => {
      console.log(originalPromiseResult);
      Cookies.set("jwt", originalPromiseResult.token);
      navigate("/home");

    }).catch((rejectedValueOrSerializedError) => {
      console.log(rejectedValueOrSerializedError);
    });
  };
  return (
    <Fragment>
      <Grid item xs={4} md={6} lg={7}>
        <div className={classes.loginContainer}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            className={`  ${classes.loginBox}`}
          >
            <Grid
              item
              xs={12}
              sx={{
                height: "10vh",
              }}
              className={classes.loginHeader}
            >
              <h4>Log IN</h4>
              <span className={classes.signLock}>
                {" "}
                {/* <LockOpenIcon />{" "} */}
                Logo
              </span>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                component="form"
                variant="standard"
                onSubmit={handleSubmit(onSbumit)}
              >
                <TextField
                  type="email"
                  label="Email"
                  {...register("logInEmail", {
                    required: "Email is required",
                  })}
                  aria-invalid={errors.logInEmail ? "true" : "false"}
                />
                <div className={classes.warningPara}>
                  {errors.logInEmail?.type === "required" && (
                    <p role="alert">Email is required</p>
                  )}
                </div>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    {...register("logInPassword", {
                      required: "Password is required",
                    })}
                    aria-invalid={errors.logInPassword ? "true" : "false"}
                  />
                </FormControl>
                <div className={classes.warningPara}>
                  {errors.logInPassword?.type === "required" && (
                    <p role="alert">Passwrod is required</p>
                  )}
                </div>

                <Button variant="contained" type="submit">
                  Log In
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <p>
                Don't have an account? <Link to="/">SignUP</Link>
              </p>
            </Grid>
          </Grid>
        </div>
      </Grid>
      {/* </Grid> */}
    </Fragment>
  );
}

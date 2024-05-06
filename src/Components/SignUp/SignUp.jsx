import { Button, FormControl, Grid, TextField } from "@mui/material";
import React, { Fragment } from "react";
import classes from "./signup.module.css";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { signupUser } from "./../Store/Signup-Slice";
import { useSignupUserMutation } from "./../Store/API's/baseURL";

export default function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [signupUser] = useSignupUserMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSbumit = (data) => {
    if (data.signupPassword !== data.signupConfirmPassword) {
      alert("Password and Confirm Password should be same");
      return;
    }
    // return dispatch(
    //   signupUser({
    //     name: data.signupName,
    //     email: data.signupEmail,
    //     password: data.signupPassword,
    //     confirmPassword: data.signupConfirmPassword,
    //   })
    // )
      // .unwrap()
      // .then((originalPromiseResult) => {
      //   // Handle success
      //   navigate("/home")
      // })
      // .catch((rejectedValueOrSerializedError) => {
      //   // Handle error
      //   console.log(rejectedValueOrSerializedError);
      // });
      return signupUser({
        name: data.signupName,
        email: data.signupEmail,
        password: data.signupPassword,
        confirmPassword: data.signupConfirmPassword,
      }).unwrap().then((originalPromiseResult) => {
        navigate("/home")
      }
      ).catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };
  return (
    <Fragment>
      <Grid
        container
        sx={{
          overflow: "hidden",
          height: "100vh",
        }}
      >
        <Grid item xs={4} md={6} lg={7}>
          <div className="">
            <img
              style={{
                height: "100vh",
                width: "100%",
                objectFit: "cover",
              }}
              src="https://source.unsplash.com/random/?social&1"
              alt="Wallpaper"
            />
          </div>
        </Grid>
        <Grid item xs={8} md={6} lg={5} sx={{ width: "100%", height: "100vh" }}>
          <div
            style={{
              height: "100vh",
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            }}
          >
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              className={` ${classes.alignCenter} ${classes.signUpContainer}`}
            >
              <Grid
                item
                xs={12}
                sx={{
                  height: "16vh",
                }}
              >
                <h4>Sign Up</h4>
                <span className={classes.signLock}>
                  {" "}
                  <LockOpenIcon />{" "}
                </span>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  component="form"
                  variant="standard"
                  onSubmit={handleSubmit(onSbumit)}
                >
                  <TextField
                    type="text"
                    autoComplete="username"
                    label="Name"
                    {...register("signupName", {
                      required: "Name is required",
                    })}
                    aria-invalid={errors.signUpName ? "true" : "false"}
                  />
                  <div className={classes.warningPara}>
                    {errors.signUpName?.type === "required" && (
                      <p role="alert"> Name is required</p>
                    )}
                  </div>
                  <TextField
                    autoComplete="off"
                    type="email"
                    label="Email"
                    {...register("signupEmail", {
                      required: "Email is required",
                    })}
                    aria-invalid={errors.signupEmail ? "true" : "false"}
                  />
                  <div className={classes.warningPara}>
                    {errors.signupEmail?.type === "required" && (
                      <p role="alert">Email is required</p>
                    )}
                  </div>
                  <TextField
                    type="password"
                    autoComplete="new-password"
                    label="Password"
                    {...register("signupPassword", {
                      required: "Password is required",
                    })}
                    aria-invalid={errors.signupPassword ? "true" : "false"}
                  />
                  <div className={classes.warningPara}>
                    {errors.signupPassword?.type === "required" && (
                      <p role="alert">password is required</p>
                    )}
                  </div>
                  <TextField
                    autoComplete="new-password"
                    type="password"
                    label="Confirm Password"
                    {...register("signupConfirmPassword", {
                      required: "Confirm Password is required",
                    })}
                    aria-invalid={
                      errors.signupConfirmPassword ? "true" : "false"
                    }
                  />
                  <div className={classes.warningPara}>
                    {errors.signupConfirmPassword?.type === "required" && (
                      <p role="alert">Confirm Password is required</p>
                    )}
                  </div>
                  <Button variant="contained" type="submit">
                    Sign Up
                  </Button>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
}

import React, { useState } from "react";
import Logo from "../images/tennis2.png";
import { formStyle } from "../util/other/authStyles";
import { useHistory, Link } from "react-router-dom";
//Redux stuff
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import { clearErrors } from "../redux/slices/uiSlice";
//MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(formStyle);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { errors, loading } = useSelector((state) => state.UI);
  const dispatch = useDispatch();
  const classes = useStyles();
  let history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    const userData = { email, password };
    dispatch(loginUser({ userData, history }));
  }

  function handleChange(event) {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
      //do nothing;
    }
  }

  function handleClickAway() {
    if(Object.keys(errors).length > 0) {
      dispatch(clearErrors());
    }
  }

  return (
    <Grid container className={classes.form}>
      <Grid item sm></Grid>
      <Grid item xs={12} sm>
        <img src={Logo} alt="logo" className={classes.image}></img>
        <Typography variant="h1" color="primary" className={classes.title}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            type="email"
            name="email"
            label="Email"
            helperText={errors.email}
            error={errors.email ? true : false}
            value={email}
            onChange={handleChange}
            fullWidth
            color="primary"
            className={classes.textField}
          />
          <TextField
            id="password"
            type="password"
            name="password"
            label="Password"
            helperText={errors.password}
            error={errors.password ? true : false}
            value={password}
            onChange={handleChange}
            fullWidth
            color="primary"
            className={classes.textField}
          />
          {errors.general && (
            <Typography variant="body2" className={classes.generalErr}>
              {errors.general}
            </Typography>
          )}
          <Button
            name="login"
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Login
            {loading && (
              <CircularProgress
                className={classes.progress}
                color="secondary"
                size={30}
              ></CircularProgress>
            )}
          </Button>
          <br />
          <small>
            Don't have an account? Sign-up{" "}
            <Link to="/signup" className={classes.link} onClick={handleClickAway}>
              here
            </Link>
          </small>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
};

export default Login;

import React from "react";
//Router
import { Link } from "react-router-dom";
//MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) =>
  createStyles({
    paperUnauth: {
      minHeight: "150px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    buttonGroup: {
      marginTop: 15,
      display: "flex",
      width: "50%",
      justifyContent: "space-between",
    },
  })
);

const LoginSignupBtn = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paperUnauth}>
      <br />
      <Typography variant="body1">
        No profile found, please login again
      </Typography>
      <div className={classes.buttonGroup}>
        <Button
          color="primary"
          variant="contained"
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          color="secondary"
          variant="contained"
          component={Link}
          to="/signup"
        >
          Signup
        </Button>
      </div>
    </Paper>
  );
};

export default LoginSignupBtn;

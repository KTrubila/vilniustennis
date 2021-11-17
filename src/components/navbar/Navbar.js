import React from "react";
import { Fragment } from "react";
//Router
import { Link } from "react-router-dom";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../../redux/slices/uiSlice";
//Components
import MyButton from "../../util/buttons/MyButton";
import AddSmash from "../smashes/AddSmash";
import BurgerMenu from "./BurgerMenu";
import Notifications from "./Notifications";
//MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Home from "@material-ui/icons/Home";
import DateRange from "@material-ui/icons/DateRange";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  mainBtnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
});

const Navbar = () => {
  const authenticated = useSelector((state) => state.user.authenticated);
  const { errors } = useSelector((state) => state.UI);

  const classes = useStyles();
  const dispatch = useDispatch();

  function handleClickAway() {
    if (Object.keys(errors).length > 0) {
      dispatch(clearErrors());
    }
  }

  return (
    <AppBar>
      <Toolbar className="nav-container" disableGutters>
        {authenticated ? (
          <Fragment>
            <BurgerMenu />
            <div className={classes.mainBtnContainer}>
              <AddSmash source="nav" />
              <Link to="/">
                <MyButton name="Home">
                  <Home />
                </MyButton>
              </Link>
              <Link to="/timetable">
                <MyButton name="Courts availability">
                  <DateRange />
                </MyButton>
              </Link>
              <Notifications />
            </div>
          </Fragment>
        ) : (
          <div className={classes.mainBtnContainer}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              onClick={handleClickAway}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/login"
              onClick={handleClickAway}
            >
              Login
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/signup"
              onClick={handleClickAway}
            >
              Signup
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/timetable"
              onClick={handleClickAway}
            >
              Courts
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

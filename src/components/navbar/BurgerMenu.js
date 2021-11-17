import React, { Fragment, useState } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/userSlice";
//components
import MyButton from "../../util/buttons/MyButton";
//router
import { Link } from "react-router-dom";
//MUI
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import List from "@material-ui/core/List";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Menu from "@material-ui/icons/Menu";
import AccountBox from "@material-ui/icons/AccountBox";
import EventAvailable from "@material-ui/icons/EventAvailable";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) =>
  createStyles({
    divider: {
      marginBottom: 20,
      marginTop: 20,
    },
    burgerBtn: {
      position: "absolute",
      marginLeft: 0,
      marginRight: "auto",
    },
    "@media (min-width: 621px)": {
      burgerBtn: {
        display: "none",
      },
    },
  })
);

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const { handle, imageUrl } = useSelector((state) => state.user.credentials);

  const dispatch = useDispatch();
  const classes = useStyles();

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <Fragment>
      <MyButton
        name="Options"
        action={handleOpen}
        btnClassName={classes.burgerBtn}
      >
        <Menu />
      </MyButton>
      <Drawer anchor="left" open={open} onClose={handleClose}>
        <List>
          <ListItem
            button
            component={Link}
            to={`/user/${handle}`}
            onClick={handleClose}
          >
            <ListItemAvatar>
              <Avatar alt={handle} src={imageUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={handle}
              primaryTypographyProps={{ variant: "h6", color: "primary" }}
            />
          </ListItem>
          <Divider className={classes.divider} />
          <ListItem
            button
            component={Link}
            to={`/user/${handle}`}
            onClick={handleClose}
          >
            <ListItemIcon>
              <AccountBox color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Profile"
              primaryTypographyProps={{ color: "primary" }}
            />
          </ListItem>
          <ListItem
            button
            component={Link}
            to={`/timetable`}
            onClick={handleClose}
          >
            <ListItemIcon>
              <EventAvailable color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Courts' availability"
              primaryTypographyProps={{ color: "primary" }}
            />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToApp color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{ color: "primary" }}
            />
          </ListItem>
        </List>
      </Drawer>
    </Fragment>
  );
};

export default BurgerMenu;

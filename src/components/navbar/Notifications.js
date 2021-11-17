import React, { useState, Fragment} from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
import { markNotificationsRead } from "../../redux/slices/userSlice";
//router
import { Link } from "react-router-dom";
//dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//MUI
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Favorite from "@material-ui/icons/Favorite";
import Comment from "@material-ui/icons/Comment";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Typography from "@material-ui/core/Typography";
//Components
import MyButton from "../../util/buttons/MyButton";

const useStyles = makeStyles((theme) =>
  createStyles({
    menuItem: {
      whiteSpace: 'normal'
    },
    linkFlex: {
      display: "flex",
      alignItems: "center",
    },
    menuListItemText: {
      display: "flex",
      flexDirection: "column",
    },
    notificationText: {
      overflowWrap: "anywhere",
    },
    noNotifications: {
      paddingLeft: 20,
      paddingRight: 20
    },
    btn: {
      padding: 8
    }
  })
);

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const notificationsArr = useSelector((state) =>
    Object.values(state.user.notifications)
  );
  const unread = notificationsArr.filter((notif) => !notif.read);

  const classes = useStyles();
  const dispatch = useDispatch();
  dayjs.extend(relativeTime);


  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleExiting() {
    if (unread.length !== 0) {
      const unreadIdArr = unread.map((notif) => notif.notificationId);
      dispatch(markNotificationsRead(unreadIdArr));
    }
  }


  const notificationList = notificationsArr.length > 0 ? notificationsArr.map((notif) => (
    <MenuItem key={notif.notificationId} className={classes.menuItem}>
      <Link
        to={`/user/${notif.recipient}/smash/${notif.smashId}`}
        className={classes.linkFlex}
        onClick={handleClose}
      >
        <ListItemIcon>
          {notif.type === "like" ? (
            <Favorite color={!notif.read ? 'secondary' : 'primary'} />
          ) : (
            <Comment color={!notif.read ? 'secondary' : 'primary'} />
          )}
        </ListItemIcon>
        <ListItemText disableTypography className={classes.menuListItemText}>
          <Typography
            variant="body1"
            color={!notif.read ? 'secondary' : 'primary'}
            className={classes.notificationText}
            component="p"
          >{`${notif.sender} ${
            notif.type === "like" ? "liked" : "commented"
          } your smash`}</Typography>
          <Typography variant="caption" color="textSecondary">
            {dayjs(notif.createdAt).fromNow()}
          </Typography>
        </ListItemText>
      </Link>
    </MenuItem>
  )) : <p className={classes.noNotifications}>You have no notifications yet</p>;

  return (
    <Fragment>
      <MyButton name="Notifications" action={handleClick}>
        <Badge badgeContent={unread.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </MyButton>
      <Menu open={!!anchorEl} onClose={handleClose} anchorEl={anchorEl} onExiting={handleExiting}>
        {notificationList}
      </Menu>
    </Fragment>
  );
};

export default Notifications;

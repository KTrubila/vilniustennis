import React from "react";
//Router
import { Link } from "react-router-dom";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, updateProfilePicture } from "../../redux/slices/userSlice";
//Dayjs
import dayjs from "dayjs";
//components
import EditDetailsModal from "./EditDetails";
import MyButton from "../../util/buttons/MyButton";
import LoginSignupBtn from "../../util/buttons/LoginSignupBtn";
import UserProfileSkeleton from "../../util/skeletons/UserProfileSkeleton";
//MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import SportsTennis from "@material-ui/icons/SportsTennis";
import LocationCity from "@material-ui/icons/LocationCity";
import FitnessCenter from "@material-ui/icons/FitnessCenter";
import Event from "@material-ui/icons/Event";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ExitToApp from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => createStyles({
  paperAuth: {
    display: "flex",
    flexDirection: "column",
  },
  imageWrapper: {
    width: "175px",
    height: "175px",
    margin: "0 auto",
    paddingTop: 15,
    display: "flex",
  },
  image: {
    objectFit: "cover",
    width: "100%",
    borderRadius: "50%",
  },
  handleList: {
    padding: 0,
  },
  listItemWrapper: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "70%",
    margin: "0 auto",
  },
  listIcon: {
    minWidth: 30,
  },
  listText: {
    flex: "none",
  },
  changeImageButton: {
    alignSelf: "flex-end",
    position: "relative",
    top: "13px",
    right: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "90%",
    margin: "0 auto",
  },
}));

const Profile = () => {
  const {
    authenticated,
    status,
    credentials: {
      tennisExperience,
      ntrpLevel,
      bio,
      location,
      imageUrl,
      handle,
      createdAt,
    },
  } = useSelector((state) => state.user);
  const classes = useStyles();
  const dispatch = useDispatch();

  function handleImageChange(event) {
    const image = event.target.files[0];
    const formData = new FormData();

    formData.append("userpicture", image, image.name);
    dispatch(updateProfilePicture(formData));
  }

  function handlePhotoClick() {
    const targetButton = document.getElementById("imageFileHome");
    targetButton.click();
  }

  function handleLogoutButton() {
    dispatch(logoutUser());
  }

  let profileSection =
    status !== "loading" ? (
      authenticated ? (
        <Paper className={classes.paperAuth}>
          <div className={classes.imageWrapper}>
            <img src={imageUrl} alt="user" className={classes.image}></img>
            <input
              type="file"
              id="imageFileHome"
              onChange={handleImageChange}
              hidden
            />
            <MyButton
              place="top"
              name="Edit profile picture"
              action={handlePhotoClick}
              btnClassName={classes.changeImageButton}
            >
              <PhotoCamera color="primary" />
            </MyButton>
          </div>
          <List>
            <ListItem className={classes.handleList}>
              <ListItemText disableTypography>
                <MuiLink
                  variant="h5"
                  component={Link}
                  to={`/user/${handle}`}
                  color="primary"
                  align="center"
                  display="block"
                >
                  @{handle}
                </MuiLink>
              </ListItemText>
            </ListItem>
            {bio && (
              <ListItem
                className={classes.listItemWrapper}
                dense
                alignItems="flex-start"
              >
                <ListItemText
                  primary={bio}
                  primaryTypographyProps={{ align: "center" }}
                />
              </ListItem>
            )}

            {tennisExperience && (
              <ListItem
                className={classes.listItemWrapper}
                dense
                alignItems="flex-start"
              >
                <ListItemIcon className={classes.listIcon}>
                  <SportsTennis color="primary" />
                </ListItemIcon>
                <ListItemText
                  className={classes.listText}
                  primary={tennisExperience}
                  primaryTypographyProps={{ display: "inline" }}
                />
              </ListItem>
            )}

            {location && (
              <ListItem
                className={classes.listItemWrapper}
                dense
                alignItems="flex-start"
              >
                <ListItemIcon className={classes.listIcon}>
                  <LocationCity color="primary" />
                </ListItemIcon>
                <ListItemText
                  className={classes.listText}
                  primary={location}
                  primaryTypographyProps={{ display: "inline" }}
                />
              </ListItem>
            )}

            {ntrpLevel && (
              <ListItem
                className={classes.listItemWrapper}
                dense
                alignItems="flex-start"
              >
                <ListItemIcon className={classes.listIcon}>
                  <FitnessCenter color="primary" />
                </ListItemIcon>
                <ListItemText
                  className={classes.listText}
                  primary={`NTRP ${ntrpLevel}`}
                  primaryTypographyProps={{ display: "inline" }}
                />
              </ListItem>
            )}

            <ListItem
              className={classes.listItemWrapper}
              dense
              disableGutters
              alignItems="flex-start"
            >
              <ListItemIcon className={classes.listIcon}>
                <Event color="primary" />
              </ListItemIcon>
              <ListItemText
                className={classes.listText}
                primary={`Joined ${dayjs(createdAt).format("MMM YYYY")}`}
                primaryTypographyProps={{ display: "inline" }}
              />
            </ListItem>
          </List>
          <div className={classes.buttonContainer}>
            <EditDetailsModal source="home" />
            <MyButton place="top" name="Logout" action={handleLogoutButton}>
              <ExitToApp color="primary" />
            </MyButton>
          </div>
        </Paper>
      ) : (
        <LoginSignupBtn />
      )
    ) : (
      <UserProfileSkeleton />
    );

  return <div>{profileSection}</div>;
};

export default Profile;

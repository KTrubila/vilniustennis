import React, { Fragment } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
import { updateProfilePicture, logoutUser } from "../../redux/slices/userSlice";
//Components
import MyButton from "../../util/buttons/MyButton";
import EditDetailsModal from "./EditDetails";
//dayJs
import dayjs from "dayjs";
//MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Paper from "@material-ui/core/Paper";
import SportsTennis from "@material-ui/icons/SportsTennis";
import LocationCity from "@material-ui/icons/LocationCity";
import FitnessCenter from "@material-ui/icons/FitnessCenter";
import Event from "@material-ui/icons/Event";
import Typography from "@material-ui/core/Typography";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ExitToApp from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: 10,
    },
    imageWrapper: {
      width: 125,
      height: 125,
      marginRight: 20,
    },
    image: {
      objectFit: "cover",
      width: 125,
      height: 125,
      borderRadius: "50%",
    },
    listItem: {
      display: "flex",
    },
    profileTopWrapper: {
      display: "flex",
    },
    profileBottomWrapper: {
      width: "90%",
      margin: 10,
      display: "flex",
      flexWrap: "wrap",
      "& div": {
        flex: "1 1 50%",
        marginTop: 10,
      },
    },
    break: {
      visibility: "hidden",
      marginTop: 5,
      marginBottom: 5,
    },
    icon: {
      marginRight: 10,
    },
    userHandle: {
      marginTop: 10,
      fontSize: 15,
      fontWeight: "bold",
    },
    body: {
      marginTop: 10,
      marginLeft: 5,
      fontSize: 13,
    },
    changeImageButton: {
      position: "relative",
      left: 90,
      bottom: 40,
    },
    mainUserData: {
        width: '100%',
    },
    "@media (min-width: 621px)": {
      paper: {
        paddingTop: 0,
      },
      profileTopWrapper: {
        flexDirection: "column",
        alignItems: "center",
      },
      imageWrapper: {
        width: 175,
        height: 175,
        margin: "0 auto",
        paddingTop: 15,
      },
      image: {
        width: 175,
        height: 175,
      },
      userHandle: {
        fontSize: "1.5rem",
        fontWeight: "normal",
        textAlign: "center",
        paddingBottom: 5,
      },
      body: {
        fontSize: "0.875rem",
        margin: "0 auto",
        textAlign: "center",
        width: "70%",
      },
      changeImageButton: {
        left: 153,
        bottom: 40,
      },
      profileBottomWrapper: {
        width: "90%",
        margin: "0 auto",
        paddingBottom: 15,
        flexWrap: "no-wrap",
        flexDirection: "column-reverse",
        alignItems: "center",
        "& div": {
          flex: "0 0 auto",
          marginTop: 15,
          "& span": {
            fontSize: "0.875rem",
          },
        },
      },
      desktopBtnContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      },
    },
  })
);

const UserProfile = ({ userDetails }) => {
  const {
    handle,
    ntrpLevel,
    imageUrl,
    tennisExperience,
    location,
    createdAt,
    bio,
  } = userDetails;

  const {
    authenticated,
    credentials: { handle: loggedUser },
  } = useSelector((state) => state.user);
  const { screenWidth } = useSelector((state) => state.UI);

  const classes = useStyles();
  const dispatch = useDispatch();

  function handleImageChange(event) {
    const image = event.target.files[0];
    const formData = new FormData();

    formData.append("userpicture", image, image.name);
    dispatch(updateProfilePicture(formData));
  }

  function handlePhotoClick() {
    const targetButton = document.getElementById("imageFileProfile");
    targetButton.click();
  }

  function handleLogoutButton() {
    dispatch(logoutUser());
  }

  return (
    <Paper className={classes.paper}>
      <div className={classes.profileTopWrapper}>
        <div className={classes.imageWrapper}>
          <img src={imageUrl} alt="user" className={classes.image}></img>
          {authenticated && loggedUser === handle && (
            <Fragment>
              <input
                type="file"
                id="imageFileProfile"
                onChange={handleImageChange}
                hidden
              />
              <MyButton
                place="bottom"
                name="Edit profile picture"
                action={handlePhotoClick}
                btnClassName={classes.changeImageButton}
              >
                <PhotoCamera color="primary" />
              </MyButton>
            </Fragment>
          )}
        </div>
        <div className={classes.mainUserData}>
          <Typography className={classes.userHandle}>{`@${handle}`}</Typography>
          {bio && <Typography className={classes.body}>{bio}</Typography>}
          {authenticated && loggedUser === handle && screenWidth < 621 && (
            <EditDetailsModal source="userPage"/>
          )}
        </div>
      </div>
      <hr className={classes.break} />
      <div className={classes.profileBottomWrapper}>
        <div className={classes.listItem}>
          <Event color="primary" className={classes.icon} />
          <Typography variant="caption">{`Joined ${dayjs(createdAt).format(
            "MMM YYYY"
          )}`}</Typography>
        </div>

        {location && (
          <div className={classes.listItem}>
            <LocationCity color="primary" className={classes.icon} />
            <Typography variant="caption">{location}</Typography>
          </div>
        )}

        {ntrpLevel && (
          <div className={classes.listItem}>
            <FitnessCenter color="primary" className={classes.icon} />
            <Typography variant="caption">NTRP {ntrpLevel}</Typography>
          </div>
        )}
        {tennisExperience && (
          <div className={classes.listItem}>
            <SportsTennis color="primary" className={classes.icon} />
            <Typography variant="caption">{tennisExperience}</Typography>
          </div>
        )}
      </div>
      {authenticated && loggedUser === handle && screenWidth >= 621 && (
        <div className={classes.desktopBtnContainer}>
          <EditDetailsModal source="userPage" />
          <MyButton place="top" name="Logout" action={handleLogoutButton}>
            <ExitToApp color="primary" />
          </MyButton>
        </div>
      )}
    </Paper>
  );
};

export default UserProfile;

import React, { Fragment } from "react";
//Router
import { Link } from "react-router-dom";
//Redux
import { useSelector } from "react-redux";
//Components
import AddSmash from "../smashes/AddSmash";
import LoginSignupBtn from "../../util/buttons/LoginSignupBtn";
import ProfileMobileSkeleton from '../../util/skeletons/ProfileMobileSkeleton';
//MUI
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";

const useStyles = makeStyles((theme) =>
  createStyles({
    imageWrapper: {
      width: 50,
      height: 50,
    },
    userImage: {
      width: 50,
      height: 50,
      borderRadius: "50%",
      objectFit: "cover",
    },
    profileMobile: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      minHeight: 90,
    },
  })
);

const ProfileMobile = () => {
  const {
    authenticated,
    status,
    credentials: { handle, imageUrl },
  } = useSelector((state) => state.user);

  const classes = useStyles();

  return (
    <Fragment>
      {status !== "loading" ? (
        authenticated ? (
          <Paper className={classes.profileMobile}>
            <div className={classes.imageWrapper}>
              <Link to={`user/${handle}`}>
                <img
                  src={imageUrl}
                  alt={handle}
                  className={classes.userImage}
                />
              </Link>
            </div>
            <AddSmash source="homeMobile" className={classes.textArea} />
          </Paper>
        ) : (
          <LoginSignupBtn />
        )
      ) : (
        <ProfileMobileSkeleton />
      )}
    </Fragment>
  );
};

export default ProfileMobile;

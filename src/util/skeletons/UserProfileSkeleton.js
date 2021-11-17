import React from "react";
//MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import SportsTennis from "@material-ui/icons/SportsTennis";
import LocationCity from "@material-ui/icons/LocationCity";
import FitnessCenter from "@material-ui/icons/FitnessCenter";
import Event from "@material-ui/icons/Event";
//image
import NoImg from "../../images/no-img.png";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      padding: 10,
    },
    image: {
      objectFit: "cover",
      minWidth: 125,
      height: 125,
      borderRadius: "50%",
      marginRight: 20,
    },
    mainInfoContainer: {
      display: "flex",
    },
    mainInfoText: {
      width: "100%",
    },
    handle: {
      backgroundColor: theme.palette.secondary.main,
      width: "30%",
      height: "1.2em",
      marginBottom: 20,
    },
    body: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      height: "1em",
      marginBottom: "0.5em",
    },
    bodyEnd: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      height: "1em",
      width: "50%",
    },
    additionalInfoContainer: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: 10,
      marginBottom: -24,
    },
    iconContainer: {
      flex: "1 1 50%",
      display: "flex",
      alignItems: "center",
    },
    iconText: {
      width: "50%",
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      height: "1em",
      marginLeft: 15,
    },
    "@media (min-width: 621px)": {
      image: {
        width: 175,
        height: 175,
        marginRight: 0,
      },
      mainInfoContainer: {
        flexDirection: "column",
        alignItems: "center",
      },
      mainInfoText: {
        width: "70%",
        margin: "0 auto",
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      handle: {
        width: "40%",
        height: "1.4em",
      },
      body: {
        width: "100%",
      },
      additionalInfoContainer: {
        flexDirection: "column",
        flexWrap: "nowrap",
        alignItems: "center",
        marginBottom: 10,
      },
      iconContainer: {
        flex: "none",
        width: "100%",
        justifyContent: "center",
        marginTop: 7,
      },
      iconText: {
        width: "25%",
        height: "0.8em",
      },
    },
  })
);

const UserProfileSkeleton = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.mainInfoContainer}>
        <CardMedia
          image={NoImg}
          title="Profile image"
          className={classes.image}
        />
        <div className={classes.mainInfoText}>
          <div className={classes.handle} />
          <div className={classes.body} />
          <div className={classes.body} />
          <div className={classes.bodyEnd} />
        </div>
      </div>
      <CardContent className={classes.additionalInfoContainer}>
        <div className={classes.iconContainer}>
          <SportsTennis color="primary" />
          <div className={classes.iconText} />
        </div>
        <div className={classes.iconContainer}>
          <LocationCity color="primary" />
          <div className={classes.iconText} />
        </div>
        <div className={classes.iconContainer}>
          <FitnessCenter color="primary" />
          <div className={classes.iconText} />
        </div>
        <div className={classes.iconContainer}>
          <Event color="primary" />
          <div className={classes.iconText} />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileSkeleton;

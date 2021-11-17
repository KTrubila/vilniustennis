import React from "react";
//MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
//image
import NoImg from "../../images/no-img.png";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      display: "flex",
      height: 90,
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    image: {
      minWidth: 50,
      height: 50,
      borderRadius: "50%",
      objectFit: "cover",
      marginLeft: 10,
    },
    text: {
      width: "100%",
      height: "100%",
      borderRadius: 5,
      backgroundColor: "rgb(220,220,220)",
      alignSelf: "center",
    },
    cardContent: {
      width: "100%",
      height: "60px",
      paddingTop: 24,
    },
  })
);

const ProfileMobileSkeleton = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        image={NoImg}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.cardContent}>
        <div className={classes.text} />
      </CardContent>
    </Card>
  );
};

export default ProfileMobileSkeleton;

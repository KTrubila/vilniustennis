import React, { Fragment } from "react";
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
      marginBottom: 10,
      height: 168.4,
    },
    image: {
      minWidth: 50,
      width: 50,
      height: 50,
      borderRadius: "50%",
      margin: 10,
    },
    handle: {
      width: "22%",
      height: "1.2em",
      marginBottom: "0.5em",
      backgroundColor: theme.palette.secondary.main,
    },
    createdAt: {
      width: "35%",
      height: "0.8em",
      marginBottom: "1em",
      backgroundColor: "rgba(0, 0, 0, 0.54)",
    },
    body: {
      width: "100%",
      height: "1em",
      marginBottom: "0.5em",
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    bodyEnd: {
      width: "50%",
      height: "1em",
      marginBottom: "0.5em",
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    cardContent: {
      width: "100%",
    },
    "@media (min-width: 760px)": {
      card: {
        marginBottom: 20,
        height: "auto",
      },
      image: {
        minWidth: 225,
        height: 225,
        objectFit: "cover",
        borderRadius: 0,
        margin: 0,
      },
      handle: {
        height: "1.4em",
        maxWidth: 120,
      },
      createdAt: {
        height: "1em",
        marginBottom: "1.2em",
        maxWidth: 190,
      },
      body: {
        height: "1.1em",
        marginBottom: "0.6em",
      },
      bodyEnd: {
        height: "1.1em",
        marginBottom: "0.6em",
      },
    },
  })
);

const SmashesSkeleton = () => {
  const classes = useStyles();

  const skeletonArray = Array.from({ length: 4 }, (x, index) => (
    <Card key={index} className={classes.card}>
      <CardMedia
        image={NoImg}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.createdAt} />
        <div className={classes.body} />
        <div className={classes.body} />
        <div className={classes.bodyEnd} />
      </CardContent>
    </Card>
  ));

  return <Fragment>{skeletonArray}</Fragment>;
};

export default SmashesSkeleton;

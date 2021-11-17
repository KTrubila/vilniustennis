import React, { Fragment } from "react";
//MUI
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";

const useStyles = makeStyles((theme) =>
  createStyles({
    headerSkeleton: {
      width: 250,
      height: 32,
      margin: "0 auto",
      backgroundColor: theme.palette.secondary.main,
    },
    paperSkeleton: {
      marginTop: 30,
      padding: 15,
    },
    desktopSkeleton: {
      width: "100%",
      height: "1.5em",
      backgroundColor: "rgba(0, 0, 0, 0.54)",
      marginBottom: "0.5em",
    },
    mobileSkeleton: {
      width: "100%",
      height: "1.5em",
      backgroundColor: "rgba(0, 0, 0, 0.54)",
      marginBottom: "0.5em",
    },
    "@media (min-width: 950px)": {
      headerSkeleton: {
        height: 40,
        position: "relative",
        top: 20,
      },
      paperSkeleton: {
        marginTop: 50,
      },
      mobileSkeleton: {
        display: "none",
      },
      desktopSkeleton: {
        height: "2.5em",
        marginBottom: "1.2em",
      },
    },
  })
);

const TimetableSkeleton = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.headerSkeleton} />
      <Paper className={classes.paperSkeleton}>
        <div className={classes.desktopSkeleton} />
        <div className={classes.desktopSkeleton} />
        <div className={classes.desktopSkeleton} />
        <div className={classes.desktopSkeleton} />
        <div className={classes.desktopSkeleton} />
        <div className={classes.desktopSkeleton} />
        <div className={classes.desktopSkeleton} />
        <div className={classes.desktopSkeleton} />
        <div className={classes.mobileSkeleton} />
        <div className={classes.mobileSkeleton} />
        <div className={classes.mobileSkeleton} />
        <div className={classes.mobileSkeleton} />
        <div className={classes.mobileSkeleton} />
        <div className={classes.mobileSkeleton} />
        <div className={classes.mobileSkeleton} />
        <div className={classes.mobileSkeleton} />
        <div className={classes.mobileSkeleton} />
      </Paper>
    </Fragment>
  );
};

export default TimetableSkeleton;

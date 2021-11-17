import React from "react";
import { Link } from "react-router-dom";
//dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//Components
import DeleteSmash from "./DeleteSmash";
import SmashDetails from "./SmashDetails";
import LikeBtn from "../../util/buttons/LikeBtn";
//MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import MuiLink from "@material-ui/core/Link";


const useStyles = makeStyles((theme) => createStyles({
  card: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
  },
  cardDiv: {
    display: "flex",
  },
  image: {
    minWidth: 50,
    width: 50,
    height: 50,
    borderRadius: "50%",
    margin: 10,
  },
  contentArea: {
    width: "100%",
    paddingRight: 10,
    paddingTop: 8,
  },
  actions: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  buttonsOnLeft: {
    display: "flex",
    alignItems: "center",
  },
  userHandle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  time: {
    fontSize: 13,
    marginBottom: 10,
  },
  body: {
    fontSize: 13,
    overflowWrap: 'anywhere',
  },
  "@media (min-width: 760px)": {
    card: {
      marginBottom: 20,
    },
    image: {
      minWidth: 225,
      height: 225,
      objectFit: "cover",
      borderRadius: 0,
      margin: 0,
    },
    userHandle: {
      fontSize: 23,
      fontWeight: "normal",
    },
    time: {
      fontSize: 15,
      marginBottom: 15,
    },
   body: {
      fontSize: 15,
      maxWidth: '100%',
      display: 'box',
      lineClamp: 3,
      boxOrient: 'vertical',
      overflow: 'hidden'

    },
    contentArea: {
      paddingLeft: 25,
      paddingTop: 12,
    },
    actions: {
      width: 'calc(100% - 245px)',
      alignSelf: 'flex-end',
      marginTop: -65,
      paddingRight: 0,
    },
    buttonsOnLeft: {
      marginLeft: -7
    }
  },
}));

const Smash = (props) => {
  const classes = useStyles();
  dayjs.extend(relativeTime);

  return (
    <Card className={classes.card}>
      <div className={classes.cardDiv}>
        <CardMedia
          image={props.smash.userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.contentArea}>
          <MuiLink
            variant="h6"
            component={Link}
            to={`/user/${props.smash.userHandle}`}
            color="primary"
            className={classes.userHandle}
          >
            {props.smash.userHandle}
          </MuiLink>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.time}
          >
            {dayjs(props.smash.createdAt).fromNow()}
          </Typography>
          <Typography variant="body1" className={classes.body}>
            {props.smash.body}
          </Typography>
        </CardContent>
        <DeleteSmash id={props.smash.smashId} />
      </div>
      <CardActions className={classes.actions}>
        <div className={classes.buttonsOnLeft}>
          <LikeBtn smashId={props.smash.smashId} />
          <SmashDetails source="comment" id={props.smash.smashId} handle={props.smash.userHandle} commentCount={props.smash.commentCount}/>
        </div>
        <SmashDetails id={props.smash.smashId} handle={props.smash.userHandle} />
      </CardActions>
    </Card>
  );
};

export default Smash;

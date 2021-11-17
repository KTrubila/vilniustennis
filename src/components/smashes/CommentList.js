import React, { Fragment } from "react";
import { Link } from "react-router-dom";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { clearSmash } from "../../redux/slices/dataSlice";
//MUI
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
//dayJs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const useStyles = makeStyles((theme) => createStyles({
  listItem: {
    paddingLeft: 0,
  },
  avatar: {
    alignSelf: "start",
    position: "relative",
    top: 10,
  },
  commentBody: {
    marginBottom: 13,
    overflowWrap: "anywhere",
  },
  "@media (min-width: 621px)": {
    avatar: {
      marginRight: 10,
    },
    listItem: {
      paddingLeft: 16,
    },
  },
}));

const CommentList = () => {
  const comments = useSelector((state) => state.data.smash.comments);

  const dispatch = useDispatch();
  dayjs.extend(relativeTime);
  const classes = useStyles();

  function handleClearSmashData() {
    dispatch(clearSmash());
  }

  return (
    <List>
      {comments.map((comment, index) => (
        <ListItem
          key={index}
          divider={comments.length - 1 !== index}
          className={classes.listItem}
        >
          <ListItemAvatar className={classes.avatar}>
            <Link
              to={`/user/${comment.userHandle}`}
              onClick={handleClearSmashData}
            >
              <Avatar alt={comment.userHandle} src={comment.userImage} />
            </Link>
          </ListItemAvatar>
          <div>
            <ListItemText
              primary={comment.userHandle}
              secondary={
                <Fragment>
                  <Typography variant="caption">
                    {dayjs(comment.createdAt).fromNow()}
                  </Typography>
                  <br />
                </Fragment>
              }
            />
            <Typography variant="body2" className={classes.commentBody}>
              {comment.body}
            </Typography>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default CommentList;

import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { getOneSmash, clearSmash } from "../../redux/slices/dataSlice";
import { clearErrors } from "../../redux/slices/uiSlice";
//Components
import MyButton from "../../util/buttons/MyButton";
import LikeBtn from "../../util/buttons/LikeBtn";
import CommentBtn from "../../util/buttons/CommentBtn";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
//MUI
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Close from "@material-ui/icons/Close";
import MuiLink from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Comment from "@material-ui/icons/Comment";
//dayJS
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => createStyles({
  expandSmash: {
    marginRight: 8,
  },
  expandSmashComment: {
    marginRight: 0,
  },
  imageWrapper: {
    width: 50,
    height: 50,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "50%",
  },
  contentContainer: {
    width: "86%",
    display: "flex",
    justifyContent: "space-around",
  },
  contentTextWrapper: {
    width: "80%",
    position: "relative",
    left: 20,
    display: "flex",
    flexDirection: "column",
  },
  userHandle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  createdAt: {
    fontSize: 13,
  },
  body: {
    fontSize: 13,
    overflowWrap: "anywhere",
  },
  progressContainer: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
  },

  dialogWindow: {
    minHeight: "250px",
  },
  actionsMobile: {
    display: "flex",
    justifyContent: "flex-start",
    position: "relative",
    top: 20,
  },
  actionsDesktop: {
    display: "none",
  },
  hr: {
    visibility: "hidden",
    marginTop: 0,
    marginBottom: 4,
  },
  bodyFlex: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  exitBtnContainer: {
    position: "relative",
    bottom: 20,
    left: 23,
  },
  divider: {
    marginTop: 30,
  },
  "@media (min-width: 621px)": {
    expandSmash: {
      marginRight: 0,
    },
    imageWrapper: {
      width: 175,
      height: 175,
      marginRight: 15,
    },
    contentContainer: {
      justifyContent: "space-between",
    },
    contentTextWrapper: {
      width: "60%",
      left: 20,
      justifyContent: "space-evenly",
    },
    actionsMobile: {
      display: "none",
    },
    actionsDesktop: {
      display: "flex",
      justifyContent: "flex-start",
      position: "relative",
      right: 20,
      top: 20,
    },
  },
}));

const SmashDetails = ({ id, handle, source, commentCount }) => {
  const [open, setOpen] = useState(false);
  const [oldUrl, setOldUrl] = useState("");
  const { userHandle, userImage, createdAt, body, comments } = useSelector(
    (state) => state.data.smash
  );
  const { loading, screenWidth } = useSelector((state) => state.UI);
  let { smashId } = useParams();
  let history = useHistory();

  const dispatch = useDispatch();
  const classes = useStyles();

  const handleOpen = useCallback(() => {
    const newPath = `/user/${handle}/smash/${id}`;
    const oldPath = history.location.pathname;

    if (oldPath !== newPath) {
      setOldUrl(oldPath);
    } else {
      setOldUrl(`/user/${handle}`);
    }

    setOpen(true);
    dispatch(getOneSmash(id));

    window.history.pushState(null, null, newPath);
  }, [id, dispatch, handle, history]);

  useEffect(() => {
    if (smashId === id && source !== "comment") {
      handleOpen();
    }
  }, [smashId, handleOpen, id, source]);

  function handleClose() {
    if (!loading) {
      history.push(oldUrl);
      setOldUrl("");
      dispatch(clearErrors());
      dispatch(clearSmash());
      setOpen(false);
    }
  }

  const dialogMarkup = loading ? (
    <div className={classes.progressContainer}>
      <CircularProgress
        color="secondary"
        size={150}
        thickness={2}
      ></CircularProgress>
    </div>
  ) : (
    <Fragment>
      <DialogContent>
        <div className={classes.bodyFlex}>
          <div className={classes.exitBtnContainer}>
            <MyButton name="Close" action={handleClose}>
              <Close color="primary" />
            </MyButton>
          </div>
          <div className={classes.contentContainer}>
            <div className={classes.imageWrapper}>
              <img src={userImage} alt="user" className={classes.image} />
            </div>
            <div className={classes.contentTextWrapper}>
              <div>
                <MuiLink
                  variant="h5"
                  component={Link}
                  to={`/user/${userHandle}`}
                  color="primary"
                  display="block"
                  onClick={handleClose}
                  className={classes.userHandle}
                >
                  @{userHandle}
                </MuiLink>
                <hr className={classes.hr} />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className={classes.createdAt}
                >
                  {dayjs(createdAt).format("H:mm, MMMM D YYYY")}
                </Typography>
                <hr className={classes.hr} />
                <Typography variant="body1" className={classes.body}>
                  {body}
                </Typography>
              </div>
              <DialogActions className={classes.actionsDesktop}>
                <LikeBtn smashId={id} />
                <CommentBtn smashId={id} />
              </DialogActions>
            </div>
          </div>
        </div>
        <DialogActions className={classes.actionsMobile}>
          <LikeBtn smashId={id} />
          <CommentBtn smashId={id} />
        </DialogActions>
        <Divider className={classes.divider} />
        <AddComment smashId={id} />
        {comments && comments.length > 0 && (
          <Fragment>
            <Divider /> <CommentList />
          </Fragment>
        )}
      </DialogContent>
    </Fragment>
  );

  return (
    <Fragment>
      {source === "comment" ? (
        <Fragment>
          <MyButton
            name="See comments"
            action={handleOpen}
            btnClassName={classes.expandSmashComment}
          >
            <Comment color="primary" />
          </MyButton>
          <Typography variant="body2">{`${commentCount} comments`}</Typography>
        </Fragment>
      ) : (
        <MyButton
          name="Expand smash"
          action={handleOpen}
          btnClassName={classes.expandSmash}
        >
          <UnfoldMore color="primary" />
        </MyButton>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{ className: classes.dialogWindow }}
        fullScreen={screenWidth < 621 ? true : false}
      >
        {dialogMarkup}
      </Dialog>
    </Fragment>
  );
};

export default SmashDetails;

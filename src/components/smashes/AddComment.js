import React, { useState } from "react";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../redux/slices/dataSlice";
//MUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";

const useStyles = makeStyles((theme) => createStyles({
  form: {
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  commentBtn: {
    width: "100px",
    marginTop: 20,
    marginBottom: 20,
  },
}));

const AddComment = ({ smashId }) => {
  const [commentText, setCommentText] = useState("");
  const authenticated = useSelector((state) => state.user.authenticated);
  const errors = useSelector((state) => state.UI.errors);

  const dispatch = useDispatch();
  const classes = useStyles();

  function handleSubmit(event) {
    event.preventDefault();
    const body = commentText;
    dispatch(addComment({ smashId, text: { body } }));
    setCommentText("");
  }

  function handleTextChange(event) {
    setCommentText(event.target.value);
  }

  return (
    <form noValidate onSubmit={handleSubmit} className={classes.form}>
      <TextField
        id="comment"
        type="text"
        name="comment"
        value={commentText}
        onChange={handleTextChange}
        fullWidth
        variant="outlined"
        multiline
        rows={3}
        color="secondary"
        placeholder="Feel free to countersmash here"
        disabled={!authenticated}
        error={errors.message ? true : false}
        helperText={errors.message}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.commentBtn}
        disabled={!authenticated}
      >
        Comment
      </Button>
    </form>
  );
};

export default AddComment;

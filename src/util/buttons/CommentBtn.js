import React, { Fragment } from "react";
//Components
import MyButton from "./MyButton";
//MUI
import Typography from "@material-ui/core/Typography";
import Comment from "@material-ui/icons/Comment";
//redux
import { selectSmashById } from "../../redux/slices/dataSlice";
import { useSelector } from "react-redux";

const CommentBtn = ({ smashId }) => {
  const { commentCount } = useSelector((state) =>
    selectSmashById(state, smashId)
  );

  return (
    <Fragment>
      <MyButton name="Comment">
        <Comment color="primary" />
      </MyButton>
      <Typography variant="body2">{`${commentCount} comments`}</Typography>
    </Fragment>
  );
};

export default CommentBtn;

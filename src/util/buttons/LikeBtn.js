import React, { Fragment } from "react";
//Components
import MyButton from "./MyButton";
//Redux stuff
import { useSelector, useDispatch } from "react-redux";
import {
  selectSmashById,
  likeSmash,
  unlikeSmash,
  clearSmash,
} from "../../redux/slices/dataSlice";
//Router
import { Link } from "react-router-dom";
//MUI
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";

const LikeBtn = ({ smashId }) => {
  const authenticated = useSelector((state) => state.user.authenticated);
  const liked = useSelector((state) => state.user.likes[smashId]);
  const { likeStatus, smash } = useSelector((state) => state.data);
  const { likeCount } = useSelector((state) => selectSmashById(state, smashId));
  const dispatch = useDispatch();

  function handleLikeClick() {
    if (!liked && likeStatus === "idle") {
      const path = `/smashes/${smashId}/like`;
      dispatch(likeSmash(path));
    } else if (liked && likeStatus === "idle") {
      const path = `/smashes/${smashId}/unlike`;
      dispatch(unlikeSmash(path));
    }
  }

  function handleClearSmashData() {
    if (Object.keys(smash).length > 0) {
      dispatch(clearSmash());
    }
  }

  return (
    <Fragment>
      {!authenticated ? (
        <Link to="/login">
          <MyButton name="Like" action={handleClearSmashData}>
            <FavoriteBorder color="primary" />
          </MyButton>
        </Link>
      ) : !liked ? (
        <MyButton name="Like" action={handleLikeClick}>
          <FavoriteBorder color="primary" />
        </MyButton>
      ) : (
        <MyButton name="Unlike" action={handleLikeClick}>
          <Favorite color="primary" />
        </MyButton>
      )}
      <Typography variant="body2">{`${likeCount} likes`}</Typography>
    </Fragment>
  );
};

export default LikeBtn;

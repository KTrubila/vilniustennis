import React, { useState } from "react";
import { Fragment } from "react";
//Components
import MyButton from "../../util/buttons/MyButton";
//MUI
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { deleteSmash, selectSmashById } from "../../redux/slices/dataSlice";

const useStyles = makeStyles((theme) => createStyles({
  title: {
    paddingBottom: "0",
  },
  buttonContainer: {
    margin: "15px auto 10px auto",
    display: "flex",
    justifyContent: "center",
  },
  deleteBtn: {
      alignSelf: 'start',
  },
  '@media (min-width: 621px)': {
    deleteBtn: {
      position: 'relative',
      top: 5
    }
  }
}));

const DeleteSmash = ({ id }) => {
  const [open, setOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.credentials.handle);
  const { userHandle } = useSelector((state) => selectSmashById(state, id));

  const dispatch = useDispatch();
  const classes = useStyles();

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleDelete() {
    dispatch(deleteSmash(id));
    setOpen(false);
  }
  return (
    <Fragment>
      {currentUser === userHandle && (
        <MyButton name="Delete smash" action={handleOpen} btnClassName={classes.deleteBtn}>
          <DeleteOutline color="primary" />
        </MyButton>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={classes.title}>
          Are you sure you want to delete this smash?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            If you continue, the smash will be removed from the database and you won't be able to
            recover it
          </Typography>
          <DialogActions className={classes.buttonContainer}>
            <Button
              name="delete"
              color="primary"
              variant="contained"
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button
              name="cancel"
              color="secondary"
              variant="contained"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default DeleteSmash;

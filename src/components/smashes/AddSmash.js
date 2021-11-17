import React, { Fragment, useState, useRef } from "react";
//Components
import MyButton from "../../util/buttons/MyButton";
//MUI
import Dialog from "@material-ui/core/Dialog";
import PostAdd from "@material-ui/icons/PostAdd";
import Close from "@material-ui/icons/Close";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { addSmash } from "../../redux/slices/dataSlice";
import { clearErrors } from "../../redux/slices/uiSlice";

const useStyles = makeStyles((theme) => createStyles({
  addSmashHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  postActionArea: {
    marginTop: 10,
    paddingRight: 0,
  },
  imageWrapper: {
    width: "50px",
    height: "50px",
    marginRight: "5px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "50%",
  },
  form: {
    width: "88%",
  },
  dialogFlexContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  textField: {
    marginTop: 0,
  },
  progress: {
    position: "absolute",
  },
  postBtn: {
    position: "relative",
  },
  textButton: {
    width: '80%'
  },
}));

const AddSmash = ({source}) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const profilePhoto = useSelector((state) => state.user.credentials.imageUrl);
  const { errors, loading } = useSelector((state) => state.UI);
  const width = useSelector(state => state.UI.screenWidth);

  const inputBtn = useRef(null);

  const dispatch = useDispatch();
  const classes = useStyles();


  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setText("");
    if (errors.body) {
      dispatch(clearErrors());
    }
  }

  function handleTextChange(event) {
    setText(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = text;

    //async because we need to get the reply from server (server does validation). If successful, then we close the dialog
    //and clear any post-smash related errors; if not successful, errors are displayed (from redux state). If at any point we close
    //the dialog, post-smash related UI errors are cleared.
    const response = await dispatch(addSmash({ body }));
    //Because of above, we evaluate only if the asyncthunk was succesful - if yes (meaning no rejeceted action received after promise is resolved), we close the dialog.
    //Otherwise error will be displayed and dialog left open.
    if (response.type !== "data/addSmash/rejected") {
      handleClose();
    }
  };

  function removeFocus() {
    if (inputBtn.current) {
      inputBtn.current.blur();
    }
  }


  const buttonMarkup =
    source === "nav" ? (
      <MyButton action={handleOpen} name="Post smash">
        <PostAdd />
      </MyButton>
    ) : (
      <TextField
        id="addSmash"
        type="text"
        name="addSmash"
        fullWidth
        onClick={handleOpen}
        placeholder='Click to smash something'
        variant="outlined"
        className={classes.textButton}
        inputRef={inputBtn}
        InputProps={{readOnly: true}}
      />
    );
  return (
    <Fragment>
      {buttonMarkup}
      <Dialog open={open} onClose={handleClose} fullWidth fullScreen={width < 621 ? true : false} onExiting={removeFocus}> 
        <div className={classes.addSmashHeader}>
          <DialogTitle>Create smash</DialogTitle>
          <div>
          <MyButton action={handleClose} name="Close">
            <Close color="primary" />
          </MyButton>
          </div>
        </div>
        <DialogContent className={classes.postContentArea}>
          <div className={classes.dialogFlexContainer}>
            <div className={classes.imageWrapper}>
              <img src={profilePhoto} alt="user" className={classes.image} />
            </div>
            <form noValidate onSubmit={handleSubmit} className={classes.form}>
              <TextField
                id="smash"
                type="text"
                name="smash"
                value={text}
                onChange={handleTextChange}
                fullWidth
                variant="outlined"
                multiline
                rows={width < 621 ? 8 : 5}
                className={classes.textField}
                color="secondary"
                placeholder="What would you like to share?"
                helperText={errors.body}
                error={errors.body ? true : false}
              />
              <DialogActions className={classes.postActionArea}>
                <Button
                  type="submit"
                  name="postSmash"
                  color="primary"
                  variant="contained"
                  className={classes.postBtn}
                  disabled={loading}
                >
                  Smash it!
                  {loading && (
                    <CircularProgress
                      className={classes.progress}
                      color="secondary"
                      size={30}
                    ></CircularProgress>
                  )}
                </Button>
              </DialogActions>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default AddSmash;

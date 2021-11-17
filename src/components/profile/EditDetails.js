import React, { useState, Fragment } from "react";
//Components
import MyButton from "../../util/buttons/MyButton";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { setAdditionalDetails } from "../../redux/slices/userSlice";
//MUI
import Dialog from "@material-ui/core/Dialog";
import Edit from "@material-ui/icons/Edit";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Close from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      color: "#00352c",
    },
    btnContainer: {
      marginTop: 15,
      display: "flex",
      justifyContent: "left",
    },
    outlinedBtn: {
      width: "90%",
      maxWidth: 200,
      borderRadius: 15,
      textTransform: "none",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

const credentialsSelector = (state) => {
  return state.user.credentials;
};

const EditDetailsModal = ({ source }) => {
  const { bio, location, ntrpLevel, tennisExperience } = useSelector(
    credentialsSelector
  );
  const { screenWidth } = useSelector((state) => state.UI);

  const dispatch = useDispatch();
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [bioValue, setBioValue] = useState(bio ? bio : "");
  const [experienceValue, setExperienceValue] = useState(
    tennisExperience ? tennisExperience : ""
  );
  const [ntrpLevelValue, setNtrpLevelValue] = useState(
    ntrpLevel ? ntrpLevel : ""
  );
  const [locationValue, setLocationValue] = useState(location ? location : "");

  function handleOpenModal() {
    setOpen(true);
  }

  function handleInputChange(event) {
    switch (event.target.name) {
      case "bio":
        setBioValue(event.target.value);
        break;
      case "experience":
        setExperienceValue(event.target.value);
        break;
      case "ntrpLevel":
        setNtrpLevelValue(event.target.value);
        break;
      case "location":
        setLocationValue(event.target.value);
        break;
      default:
      //do nothing
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const additionalDetails = {
      bio: bioValue,
      tennisExperience: experienceValue,
      ntrpLevel: ntrpLevelValue,
      location: locationValue,
    };

    dispatch(setAdditionalDetails(additionalDetails));
    setOpen(false);
  }

  function handleCancel() {
    setBioValue(bio ? bio : "");
    setLocationValue(location ? location : "");
    setNtrpLevelValue(ntrpLevel ? ntrpLevel : "");
    setExperienceValue(tennisExperience ? tennisExperience : "");
    setOpen(false);
  }

  const openingBtn =
    source === "home" || (source === "userPage" && screenWidth > 621) ? (
      <MyButton
        place="top"
        name="Edit profile details"
        action={handleOpenModal}
      >
        <Edit color="primary" />
      </MyButton>
    ) : (
      <div className={classes.btnContainer}>
        <Button
          variant="outlined"
          onClick={handleOpenModal}
          color="secondary"
          className={classes.outlinedBtn}
          size="small"
        >
          Edit profile
        </Button>
      </div>
    );

  return (
    <Fragment>
      {openingBtn}
      <Dialog open={open} onClose={handleCancel} fullScreen={screenWidth < 621}>
        <div className={classes.header}>
          <DialogTitle className={classes.title}>
            Edit profile details
          </DialogTitle>
          <div>
            <MyButton name="Close" action={handleCancel}>
              <Close color="primary" />
            </MyButton>
          </div>
        </div>
        <DialogContent>
          <form noValidate onSubmit={handleSubmit} className={classes.form}>
            <TextField
              id="bio"
              type="text"
              name="bio"
              label="Bio"
              value={bioValue}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              className={classes.textInptut}
              variant="filled"
              multiline
              rows={4}
              color="secondary"
              placeholder="Few words about yourself"
            />
            <TextField
              id="experience"
              type="text"
              name="experience"
              label="Experience"
              value={experienceValue}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="filled"
              color="secondary"
              placeholder="Years of experience playing tennis"
            />
            <TextField
              id="ntrpLevel"
              type="text"
              name="ntrpLevel"
              label="NTRP Level"
              value={ntrpLevelValue}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="filled"
              color="secondary"
              placeholder="Find your tennis partner of a similar level"
            />
            <TextField
              id="location"
              type="text"
              name="location"
              label="Location"
              value={locationValue}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="filled"
              color="secondary"
              placeholder="Let others know where you're based"
            />
            <DialogActions>
              <Button type="submit" name="save" color="primary">
                Save
              </Button>
              <Button
                type="button"
                name="cancel"
                onClick={handleCancel}
                color="primary"
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default EditDetailsModal;

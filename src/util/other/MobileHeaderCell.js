import React, { useState } from "react";
//MUI
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import NotListedLocation from "@material-ui/icons/NotListedLocation";
import TableCell from "@material-ui/core/TableCell";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";

const useStyles = makeStyles((theme) =>
  createStyles({
    flexContainer: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

const MobileHeaderCell = ({ cellClassName, btnClassName, name }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  function handleClick() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <TableCell className={cellClassName}>
      <ClickAwayListener onClickAway={handleClose}>
        <div className={classes.flexContainer}>
          <Tooltip
            open={open}
            onClose={handleClose}
            title={name}
            disableFocusListener
            disableHoverListener
            disableTouchListener
          >
            <IconButton
              onClick={handleClick}
              className={btnClassName}
              color="primary"
            >
              <NotListedLocation />
            </IconButton>
          </Tooltip>
        </div>
      </ClickAwayListener>
    </TableCell>
  );
};

export default MobileHeaderCell;

import React, { Fragment } from "react";
//MUI
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const MyButton = ({
  children,
  place,
  name,
  action,
  btnClassName,
  color,
  disabled,
}) => {
  return (
    <Fragment>
      {!disabled ? (
        <Tooltip placement={place} title={name}>
          <IconButton onClick={action} className={btnClassName} color={color}>
            {children}
          </IconButton>
        </Tooltip>
      ) : (
        <IconButton
          className={btnClassName}
          color={color}
          disabled={disabled}
        >
          {children}
        </IconButton>
      )}
    </Fragment>
  );
};

export default MyButton;

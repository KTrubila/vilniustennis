import React, { Fragment } from "react";
//redux
import { selectAllCourts } from "../../redux/slices/courtsSlice";
import { useSelector } from "react-redux";
//MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
//times
import allTimes from "../../util/other/allTimes";

const useStyles = makeStyles((theme) =>
  createStyles({
    freeTime: {
      backgroundColor: theme.palette.secondary.main,
      borderRight: "1px solid rgba(224, 224, 224, 1)",
    },
    firstHalfFreeTime: {
      background: `linear-gradient(to right, ${theme.palette.secondary.main} 50%, ${theme.palette.primary.main} 50%)`,
      borderRight: "1px solid rgba(224, 224, 224, 1)",
    },
    secondHalfFreeTime: {
      background: `linear-gradient(to right, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 50%)`,
      borderRight: "1px solid rgba(224, 224, 224, 1)",
    },
    busyTime: {
      backgroundColor: theme.palette.primary.main,
      borderRight: "1px solid rgba(224, 224, 224, 1)",
    },
    headCells: {
      padding: 2,
      textAlign: "center",
    },
    tableContainer: {
      paddingRight: 5,
    },
  })
);

const TimeTableDesktop = ({ date }) => {
  const courtsEntitiesArr = useSelector(selectAllCourts);
  const classes = useStyles();

  const times = allTimes.map((time) => (
    <TableCell key={time} className={classes.headCells}>
      {time}
    </TableCell>
  ));

  const courtAvailabilityRows = courtsEntitiesArr.map((court) => {
    return (
      <TableRow key={court.name}>
        <TableCell component="th" scope="row">
          {court.name}
        </TableCell>
        {allTimes.map((time) => {
          const dateDay = date.match(/\d+$/)[0];
          if (court[dateDay].includes(time)) {
            return (
              <TableCell
                key={`${court.name}${time}`}
                className={classes.freeTime}
              ></TableCell>
            );
          } else if (
            court[dateDay].some((el) => `${el.slice(0, 5)}` === time)
          ) {
            return (
              <TableCell
                key={`${court.name}${time}`}
                className={classes.firstHalfFreeTime}
              ></TableCell>
            );
          } else if (
            court[dateDay].some(
              (el) => `${el.slice(0, 2)}:30` === `${time.slice(0, 2)}:30`
            )
          ) {
            return (
              <TableCell
                key={`${court.name}${time}`}
                className={classes.secondHalfFreeTime}
              />
            );
          } else {
            return (
              <TableCell
                key={`${court.name}${time}`}
                className={classes.busyTime}
              />
            );
          }
        })}
      </TableRow>
    );
  });

  return (
    <Fragment>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell />
              {times}
            </TableRow>
          </TableHead>
          <TableBody>{courtAvailabilityRows}</TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default TimeTableDesktop;

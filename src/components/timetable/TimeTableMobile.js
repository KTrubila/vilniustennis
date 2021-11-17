import React, { Fragment } from "react";
//redux
import { selectAllCourts, selectCourtsIds } from "../../redux/slices/courtsSlice";
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
//components
import MobileHeaderCell from "../../util/other/MobileHeaderCell";
//times
import allTimes from "../../util/other/allTimes";

const useStyles = makeStyles((theme) =>
  createStyles({
    tableContainer: {
      marginTop: 10,
      marginBottom: 5,
      paddingBottom: 5,
    },
    table: {
      width: "97%",
    },
    freeTime: {
      backgroundColor: theme.palette.secondary.main,
      borderRight: "1px solid rgba(224, 224, 224, 1)",
    },
    firstHalfFreeTime: {
      background: `linear-gradient(to bottom, ${theme.palette.secondary.main} 50%, ${theme.palette.primary.main} 50%)`,
      borderRight: "1px solid rgba(224, 224, 224, 1)",
    },
    secondHalfFreeTime: {
      background: `linear-gradient(to bottom, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 50%)`,
      borderRight: "1px solid rgba(224, 224, 224, 1)",
    },
    busyTime: {
      backgroundColor: theme.palette.primary.main,
      borderRight: "1px solid rgba(224, 224, 224, 1)",
    },
    headCells: {
      padding: "8px 0px",
    },
    rowHeader: {
      padding: "8px 2px 8px 2px",
      textAlign: "center",
      fontSize: "0.8em",
      background: 'white',
      position: 'sticky',
      left: '0px'
    },
    timesCell: {
      paddingLeft: 2,
      paddingRight: 2,
    },
    iconBtn: {
      padding: 4,
    },
  })
);

const TimeTableMobile = ({ date }) => {
  const courtsNamesArr = useSelector(selectCourtsIds);
  const courtsEntitiesArr = useSelector(selectAllCourts);
  const classes = useStyles();

  const names = courtsNamesArr.map((name) => (
    <MobileHeaderCell
      key={name}
      cellClassName={classes.headCells}
      btnClassName={classes.iconBtn}
      name={name}
    />
  ));

  const courtAvailabilityRows = allTimes.map((time) => {
    return (
      <TableRow key={time}>
        <TableCell component="th" scope="row" className={classes.rowHeader}>
          {time}
        </TableCell>
        {courtsEntitiesArr.map((court) => {
          const dateDay = date.match(/\d+$/)[0];
          if (court[dateDay].includes(time)) {
            return (
              <TableCell
                key={`${court.name}${time}`}
                className={classes.freeTime}
              />
            );
          } else if (
            court[dateDay].some((el) => `${el.slice(0, 5)}` === time)
          ) {
            return (
              <TableCell
                key={`${court.name}${time}`}
                className={classes.firstHalfFreeTime}
              />
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
          } else
            return (
              <TableCell
                key={`${court.name}${time}`}
                className={classes.busyTime}
              />
            );
        })}
      </TableRow>
    );
  });

  return (
    <Fragment>
      <TableContainer
        component={Paper}
        variant="outlined"
        className={classes.tableContainer}
      >
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.timesCell} />
              {names}
            </TableRow>
          </TableHead>
          <TableBody>{courtAvailabilityRows}</TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default TimeTableMobile;

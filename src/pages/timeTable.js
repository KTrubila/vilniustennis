import React, { useEffect, Fragment, useState } from "react";
//redux
import { getTimeTable, selectCourtsIds } from "../redux/slices/courtsSlice";
import { useDispatch, useSelector } from "react-redux";
//MUI
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
//dayjs
import dayjs from "dayjs";
//components
import MyButton from "../util/buttons/MyButton";
import TimeTableMobile from "../components/timetable/TimeTableMobile";
import TimeTableDesktop from "../components/timetable/TimeTableDesktop";
import TimetableSkeleton from '../util/skeletons/TimetableSkeleton';

const useStyles = makeStyles((theme) =>
  createStyles({
    buttonContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    list: {
      display: "flex",
      justifyContent: "space-between",
      width: "155px",
      marginTop: 8,
      marginBottom: 0,
    },
    freeListItem: {
      fontSize: "1.3em",
      "&::marker": {
        color: theme.palette.secondary.main,
      },
    },
    busyListItem: {
      fontSize: "1.3em",
      "&::marker": {
        color: theme.palette.primary.main,
      },
    },
    '@media (min-width: 950px)': {
        buttonContainer: {
            width: 400,
            margin: '0 auto'
        },
        freeListItem: {
            fontSize: '1.6em',
        },
        busyListItem: {
            fontSize: '1.6em'
        },
        
    }
  })
);

const TimeTable = () => {
  const [date, setDate] = useState(dayjs().format("YYYY-M-D"));
  const [dayCount, setDayCount] = useState(1);
  const { status } = useSelector((state) => state.courts);
  const courtsNamesArr = useSelector(selectCourtsIds);
  const { screenWidth } = useSelector((state) => state.UI);
  
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getTimeTable());
  }, [dispatch]);

  function handleNextDay() {
    setDate(dayjs(date).add(1, "day").format("YYYY-M-D"));
    setDayCount((prevCount) => prevCount + 1);
  }

  function handleDayBefore() {
    setDate(dayjs(date).subtract(1, "day").format("YYYY-M-D"));
    setDayCount((prevCount) => prevCount - 1);
  }

  return (
    <Fragment>
      {status !== "loading"  && courtsNamesArr.length > 0 ? (
        screenWidth < 950 ? (
          <Fragment>
            <div className={classes.buttonContainer}>
              <MyButton
                action={handleDayBefore}
                name="Check next day"
                disabled={dayCount === 1}
              >
                <NavigateBefore />
              </MyButton>

              <Typography variant="h5" color="primary" align="center">
                {dayjs(date).format("dddd, YYYY-MM-DD")}
              </Typography>
              <MyButton
                action={handleNextDay}
                name="Check next day"
                disabled={dayCount === 7}
              >
                <NavigateNextIcon />
              </MyButton>
            </div>
            <ul className={classes.list}>
              <li className={classes.freeListItem}>
                <Typography variant="caption">Free time</Typography>
              </li>
              <li className={classes.busyListItem}>
                <Typography variant="caption">Busy time</Typography>
              </li>
            </ul>
            <TimeTableMobile date={date} />
            <Typography variant="caption" >*Data is updated every 30 minutes</Typography>
          </Fragment>
        ) : (
          <Fragment>
              <div className={classes.buttonContainer}>
            <MyButton
              action={handleDayBefore}
              name="Check day before"
              disabled={dayCount === 1}
            >
              <NavigateBefore fontSize="large"/>
            </MyButton>

            <Typography variant="h5" color="primary" align="center">
              {dayjs(date).format("dddd, YYYY-MM-DD")}
            </Typography>
            <MyButton
              action={handleNextDay}
              name="Check next day"
              disabled={dayCount === 7}
            >
              <NavigateNextIcon fontSize="large"/>
            </MyButton>
            </div>
            <ul className={classes.list}>
              <li className={classes.freeListItem}>
                <Typography variant="caption">Free time</Typography>
              </li>
              <li className={classes.busyListItem}>
                <Typography variant="caption">Busy time</Typography>
              </li>
            </ul>
            <TimeTableDesktop date={date} />
            <Typography variant="caption" >*Data is updated every 30 minutes</Typography>
          </Fragment>
        )
      ) : (
        <TimetableSkeleton />
      )}
    </Fragment>
  );
};

export default TimeTable;

import React, { useEffect } from "react";
//router
import { useParams } from "react-router-dom";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  getUserPageData,
  clearUserPageData,
  selectAllSmashes,
  clearEntities
} from "../redux/slices/dataSlice";
//MUI
import Grid from "@material-ui/core/Grid";
//components
import Smash from "../components/smashes/Smash";
import UserProfile from "../components/profile/UserProfile";
import SmashesSkeleton from '../util/skeletons/SmashesSkeleton';
import UserProfileSkeleton from '../util/skeletons/UserProfileSkeleton';

const UserPage = () => {
  const { status: userStatus } = useSelector((state) => state.user);
  const smashes = useSelector(selectAllSmashes);
  const { status, userPage } = useSelector((state) => state.data);
  let { userPageHandle } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userStatus !== "loading") {
      dispatch(getUserPageData(userPageHandle));
    }
  }, [userPageHandle, dispatch, userStatus]);

  useEffect(() => {
      return () => {
        dispatch(clearUserPageData());
        dispatch(clearEntities())
      };
  },[dispatch]);

    const profileMarkup =
    status !== "loading" && userPage.handle ? (
      <UserProfile userDetails={userPage} />
    ) : (
      <UserProfileSkeleton />
    );

  const smashesMarkup =
    userPage.handle && smashes.length > 0 ? (
      smashes.map((smash) => <Smash key={smash.smashId} smash={smash}/>)
    ) : userPage.handle && smashes.length === 0 ? (
      <p>This user hasn't smashed yet</p>
    ) : (
      <SmashesSkeleton />
    );

  return (
    <Grid container spacing={3} direction="row-reverse">
      <Grid item xs={12} sm={4}>
        {profileMarkup}
      </Grid>
      <Grid item xs={12} sm={8}>
        {smashesMarkup}
      </Grid>
    </Grid>
  );
};

export default UserPage;

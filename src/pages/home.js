import React, { useEffect } from "react";
//MUI
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
//components
import Smash from "../components/smashes/Smash";
import Profile from "../components/profile/Profile";
import ProfileMobile from "../components/profile/ProfileMobile";
import SmashesSkeleton from "../util/skeletons/SmashesSkeleton";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllSmashes, selectAllSmashes } from "../redux/slices/dataSlice";

const Home = () => {
  const status = useSelector((state) => state.data.status);
  const smashes = useSelector(selectAllSmashes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSmashes());
  }, [dispatch]);

  let posts =
    status !== "loading" && smashes && smashes.length > 0 ? (
      smashes.map((smash) => <Smash smash={smash} key={smash.smashId} />)
    ) : status !== "loading" && smashes && smashes.length === 0 ? (
      <p>Nothing has been smashed yet</p>
    ) : (
      <SmashesSkeleton />
    );

  return (
    <Grid container spacing={3} direction="row-reverse">
      <Hidden smUp>
        <Grid item xs>
          <ProfileMobile />
        </Grid>
      </Hidden>
      <Hidden xsDown>
        <Grid item sm={4}>
          <Profile />
        </Grid>
      </Hidden>
      <Grid item sm={8} xs={12}>
        {posts}
      </Grid>
    </Grid>
  );
};

export default Home;

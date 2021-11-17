import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { likeSmash, unlikeSmash, deleteSmash } from "./dataSlice";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ userData, history }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/login", userData);

      setAuthorizationHeaders(response.data.token);
      dispatch(getUserData());
      history.push("/");
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async ({ newUserData, history }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/signup", newUserData);

      setAuthorizationHeaders(response.data.token);
      dispatch(getUserData());
      history.push("/");
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserData = createAsyncThunk("user/getUserData", async () => {
  try {
    const response = await axios.get("/user");
    return response.data;
  } catch (err) {
    console.error(err);
  }
});

const setAuthorizationHeaders = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch(setUnauthenticated());
};

export const updateProfilePicture = createAsyncThunk(
  "user/updateProfilePicture",
  async (formData, { dispatch }) => {
    try {
      await axios.post("/user/image", formData);
      await dispatch(getUserData());
    } catch (err) {
      console.error(err);
    }
  }
);

export const setAdditionalDetails = createAsyncThunk(
  "user/setAdditionalDetails",
  async (additionalDetails, { dispatch }) => {
    try {
      await axios.post("/user", additionalDetails);
      await dispatch(getUserData());
    } catch (err) {
      console.error(err);
    }
  }
);

export const markNotificationsRead = createAsyncThunk('user/markNotificationsRead', async(unreadIdArr, {getState}) => {
  try {
    await axios.post('/notifications', unreadIdArr); 
    return unreadIdArr;
  }
  catch(err) {
    console.error(err);
  }
})

const initialState = {
  authenticated: false,
  credentials: {},
  likes: {},
  likeIds: [],
  notifications: [],
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  //createSlice is using Immer behind the scenes which automatically makes state updates immutable without the need to use spread operators.
  reducers: {
    setAuthenticated: (state) => {
      state.authenticated = true;
    },
    setUnauthenticated: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.fulfilled, (state, action) => {
        const likeObj = action.payload.likes.reduce((obj, like) => {
          const likeId = like.smashId;
          obj[likeId] = like;
          return obj;
        }, {});

        const notifObj = action.payload.notifications.reduce((obj, notif) => {
          const notifId = notif.notificationId;
          obj[notifId] = notif;
          return obj;
        },{});

        const idList = Object.keys(likeObj);
        const notifIdList = Object.keys(notifObj);
        return {
          ...action.payload,
          authenticated: true,
          status: "idle",
          likes: likeObj,
          likeIds: idList,
          notifications: notifObj,
          notificationIds: notifIdList
        };
      })
      .addCase(getUserData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateProfilePicture.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(likeSmash.fulfilled, (state, action) => {
        state.likes[action.payload.smashId] = {
          smashId: action.payload.smashId,
          userHandle: state.credentials.handle,
        };
        state.likeIds.push(action.payload.smashId);
      })
      .addCase(unlikeSmash.fulfilled, (state, action) => {
        delete state.likes[action.payload.smashId];
        state.likeIds.splice(state.likeIds.indexOf(action.payload.smashId), 1);
      })
      .addCase(deleteSmash.fulfilled, (state, action) => {
        delete state.likes[action.payload.smashId];
        state.likeIds = state.likeIds.filter(
          (id) => id !== action.payload.smashId
        );
      })
      .addCase(markNotificationsRead.fulfilled, (state,{payload}) => {
        payload.forEach(id => {
          return state.notifications[id].read = true; 
        })
      })
  },
});

export const { setAuthenticated, setUnauthenticated } = userSlice.actions;

export default userSlice.reducer;

import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getAllSmashes = createAsyncThunk(
  "data/getAllSmashes",
  async () => {
    try {
      const response = await axios.get("/smashes");
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const smashesAdapter = createEntityAdapter({
  selectId: (smash) => smash.smashId,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = smashesAdapter.getInitialState({
  status: "idle",
  likeStatus: "idle",
  commentStatus: "idle",
  smash: {},
  userPage: {}
});

export const likeSmash = createAsyncThunk(
  "data/likeSmash",
  async (path, { dispatch, getState }) => {
    try {
      const response = await axios.get(path);
      if (getState().data.smash.smashId) {
        dispatch(changeLikeCount(response.data.likeCount));
      }
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const unlikeSmash = createAsyncThunk(
  "data/unlikeSmash",
  async (path, { dispatch, getState }) => {
    try {
      const response = await axios.get(path);
      if (getState().data.smash.smashId) {
        dispatch(changeLikeCount(response.data.likeCount));
      }
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const deleteSmash = createAsyncThunk(
  "data/deleteSmash",
  async (smashId) => {
    try {
      await axios.delete(`/smashes/${smashId}`);
      return { smashId };
    } catch (err) {
      console.error(err);
    }
  }
);

export const addSmash = createAsyncThunk(
  "data/addSmash",
  async (text, { rejectWithValue }) => {
    try {
      const response = await axios.post("/smashes", text);
      return response.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getOneSmash = createAsyncThunk("data/getOneSmash", async (id) => {
  try {
    const response = await axios.get(`/smashes/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
});

export const addComment = createAsyncThunk(
  "data/addComment",
  async ({ smashId, text }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/smashes/${smashId}/comment`, text);
      return response.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserPageData = createAsyncThunk(
  "data/getUserPageData",
  async (userPageHandle) => {
    try {
      const response = await axios.get(`/user/${userPageHandle}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    clearSmash: (state) => {
      state.smash = {};
    },
    changeLikeCount: (state, action) => {
      state.smash.likeCount = action.payload;
    },
    clearUserPageData: (state) => {
      state.userPage = {};
    },
    clearEntities: (state) => {
      state.entities = {};
      state.ids = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSmashes.fulfilled, (state, { payload }) => {
        smashesAdapter.upsertMany(state, payload);
        state.status = "idle";
      })
      .addCase(getAllSmashes.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllSmashes.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(likeSmash.fulfilled, (state, { payload }) => {
        const id = payload.smashId;
        smashesAdapter.updateOne(state, { id, changes: payload });
        state.likeStatus = "idle";
      })
      .addCase(likeSmash.pending, (state, action) => {
        state.likeStatus = "loading";
      })
      .addCase(unlikeSmash.fulfilled, (state, { payload }) => {
        const id = payload.smashId;
        smashesAdapter.updateOne(state, { id, changes: payload });
        state.likeStatus = "idle";
      })
      .addCase(unlikeSmash.pending, (state, action) => {
        state.likeStatus = "loading";
      })
      .addCase(deleteSmash.fulfilled, (state, action) => {
        const id = action.payload.smashId;
        smashesAdapter.removeOne(state, id);
      })
      .addCase(addSmash.fulfilled, smashesAdapter.addOne)
      .addCase(getOneSmash.fulfilled, (state, action) => {
        state.smash = action.payload;
      })
      .addCase(addComment.pending, (state, action) => {
        state.commentStatus = "loading";
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        const id = payload.smashId;
        const currentCount = state.entities[id].commentCount;
        smashesAdapter.updateOne(state, {
          id,
          changes: { commentCount: currentCount + 1 },
        });
        state.smash.commentCount = currentCount + 1;
        state.smash.comments.unshift(payload);
        state.commentStatus = "idle";
      })
      .addCase(addComment.rejected, (state, action) => {
        state.commentStatus = "idle";
      })
      .addCase(getUserPageData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserPageData.fulfilled, (state, {payload}) => {
        smashesAdapter.setAll(state, payload.smashes);
        state.userPage = payload.userDetails;
        state.status = "idle";
      })
      .addCase(getUserPageData.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export const {
  selectIds: selectSmashIds,
  selectById: selectSmashById,
  selectEntities: selectSmashEntities,
  selectAll: selectAllSmashes,
  selectTotal: selectTotalSmashes,
} = smashesAdapter.getSelectors((state) => state.data);

export const {
  clearSmash,
  changeLikeCount,
  clearUserPageData,
  clearEntities
} = dataSlice.actions;

export default dataSlice.reducer;

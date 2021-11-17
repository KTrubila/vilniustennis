import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "./userSlice";
import { addSmash, getOneSmash, addComment } from "./dataSlice";

const initialState = {
  loading: false,
  errors: {},
  screenWidth: window.innerWidth
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.errors = {};
    },
    setScreenWidth: (state, action) => {
      state.screenWidth = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.errors = {};
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.errors = action.payload;
      })
      .addCase(signupUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.errors = {};
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(addSmash.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addSmash.fulfilled, (state, action) => {
        state.loading = false;
        state.errors = {};
      })
      .addCase(addSmash.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(getOneSmash.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getOneSmash.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.errors = {};
      })
  },
});

export const {clearErrors, setScreenWidth} = uiSlice.actions;

export default uiSlice.reducer;

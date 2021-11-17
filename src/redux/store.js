import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import dataReducer from "./slices/dataSlice";
import uiReducer from "./slices/uiSlice";
import courtsReducer from "./slices/courtsSlice";


export default configureStore({
  reducer: {
    user: userReducer,
    data: dataReducer,
    UI: uiReducer,
    courts: courtsReducer
  },
});

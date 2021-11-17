import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
  } from "@reduxjs/toolkit";
  import axios from "axios";

export const courtsAdapter = createEntityAdapter({
    selectId: (court) => court.name,
})

export const getTimeTable = createAsyncThunk("courts/getTimeTable", async() => {
    try {
        const response = await axios.get("/timetable");
        return response.data;
    } catch(err) {
        console.error(err);
    }
})

const initialState = courtsAdapter.getInitialState({
    status: 'idle'
})

export const courtsSlice = createSlice({
    name: 'courts',
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(getTimeTable.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(getTimeTable.fulfilled, (state, {payload}) => {
                courtsAdapter.upsertMany(state, payload);
                state.status = 'idle';
            })
            .addCase(getTimeTable.rejected, (state, action) => {
                state.status = 'idle';
            })
    }
})

export const {
    selectIds: selectCourtsIds,
    selectById: selectCourtsById,
    selectEntities: selectCourtsEntities,
    selectAll: selectAllCourts,
    selectTotal: selectTotalCourts,
  } = courtsAdapter.getSelectors((state) => state.courts);

  export default courtsSlice.reducer;
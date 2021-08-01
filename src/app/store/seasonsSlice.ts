import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Season } from "../types";
import { fetchSeasonData } from "../api";

export interface SeasonsState {
  value: Season[];
  status: "idle" | "loading" | "failed";
}

const initialState: SeasonsState = {
  value: [],
  status: "idle",
};

export const fetchSeasonDataAsync = createAsyncThunk(
  "app/fetchSeasonData",
  async () => {
    const response = await fetchSeasonData();
    const results = response.data.MRData?.SeasonTable?.Seasons;
    return results;
  }
);

export const seasonsSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeasonDataAsync.rejected, (state, action) => {
        console.error(action.error);
        state.status = "failed";
        state.value = [];
      })
      .addCase(fetchSeasonDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSeasonDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSeasons = (state: RootState) => state.seasons;

export default seasonsSlice.reducer;

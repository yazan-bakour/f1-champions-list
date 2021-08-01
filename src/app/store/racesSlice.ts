import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Race } from "../types";
import { fetchRaceData } from "../api";

export interface RaceState {
  value: Race[];
  status: "idle" | "loading" | "failed";
}

const initialState: RaceState = {
  value: [],
  status: "idle",
};

export const fetchRaceDataAsync = createAsyncThunk(
  "app/fetchRaceData",
  async (season: string) => {
    const response = await fetchRaceData(season);
    const results = response.data?.MRData?.RaceTable?.Races || []
    return results;
  }
);

export const raceSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRaceDataAsync.rejected, (state, action) => {
        console.error(action.error);
        state.status = "failed";
      })
      .addCase(fetchRaceDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRaceDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectRaces = (state: RootState) => state.races;

export default raceSlice.reducer;

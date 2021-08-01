import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { fetchDriverData } from "../api";
import { StandingResponse, Driver } from "../types";

export interface DriverState {
  value: string;
  status: "idle" | "loading" | "failed";
}

const initialState: DriverState = {
  value: '',
  status: "idle",
};

export const fetchDriverDataAsync = createAsyncThunk(
  "app/fetchDriverData",
  async (season: string) => {
    const response = await fetchDriverData(season);
    const results = response.data?.MRData?.StandingsTable?.StandingsLists?.[0]
    ?.DriverStandings?.[0]?.Driver?.driverId || ''
    return results;
  }
);

export const driverSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDriverDataAsync.rejected, (state, action) => {
        console.error(action.error);
        state.status = "failed";
      })
      .addCase(fetchDriverDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDriverDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectDriver = (state: RootState) => state.championId;

export default driverSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Driver, Race, RaceType } from "../types";
import { fetchChampionsData } from "../api";

export interface DriverResultState {
  value: {
    driver: Driver;
    season: string;
    round: string;
  }[];
  status: "idle" | "loading" | "failed";
}

const initialState: DriverResultState = {
  value: [],
  status: "idle",
};

export const fetchChampionDataAsync = createAsyncThunk(
  "app/fetchChampionData",
  async (race: Race) => {
    const response = await fetchChampionsData(race.season, race.round);
    const result = {
      driver: response.data?.MRData.RaceTable.Races?.[0]?.Results?.[0]?.Driver,
      season: race.season,
      round: race.round,
    };
    return result;
  },
  {
    condition: (race: Race, { getState }) => {
      const state = getState()
      const champion = selectChampion(state as any, race)
      
      if(champion){
        return false
      }
    },
  }
);

export const championsSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChampionDataAsync.rejected, (state, action) => {
        console.error(action.error);
        state.status = "failed";
      })
      .addCase(fetchChampionDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChampionDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const foundDriverIdx = state.value.findIndex(
          (x) =>
            x.season === action.payload.season &&
            x.round === action.payload.round
        );
        if (foundDriverIdx > 0) {
          state.value[foundDriverIdx] = action.payload;
        } else {
          state.value.push(action.payload);
        }
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectChampion = (state: RootState, race: Race) =>
  state.champions?.value?.find(
    (x) => x.season === race.season && x.round === race.round
  )?.driver;

export default championsSlice.reducer;

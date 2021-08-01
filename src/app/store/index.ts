import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import seasonsSlice from "./seasonsSlice";
import racesSlice from "./racesSlice";
import driverSlice from "./standingTableDriverIdSlice";
import championsSlice from "./championsSlice";

export const store = configureStore({
  reducer: {
    champions: championsSlice,
    championId: driverSlice,
    races: racesSlice,
    seasons: seasonsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

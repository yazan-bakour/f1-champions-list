import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import championsSlice from "../store/championsSlice"
import driverSlice from "../store/standingTableDriverIdSlice"
import racesSlice from "../store/racesSlice"
import seasonsSlice from "../store/seasonsSlice"

function render(
  ui: any,
  {
    preloadedState,
    store = configureStore({
      reducer: { 
        champions: championsSlice,
        championId: driverSlice,
        races: racesSlice,
        seasons: seasonsSlice,},
      preloadedState,
    } as any),
    ...renderOptions
  }: any = {}
) {
  function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };

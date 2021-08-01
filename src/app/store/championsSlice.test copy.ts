import racesSlice, { RaceState } from "./racesSlice";

const initialState: RaceState = {
  value: [],
  status: "idle",
};
test('should return the initial state', () => {
  expect(racesSlice(undefined, {} as any)).toEqual(initialState)
})

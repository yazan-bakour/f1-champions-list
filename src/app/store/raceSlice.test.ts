import championsSlice, { DriverResultState } from "./championsSlice";

const initialState: DriverResultState = {
  value: [],
  status: "idle",
};
test('should return the initial state', () => {
  expect(championsSlice(undefined, {} as any)).toEqual(initialState)
})

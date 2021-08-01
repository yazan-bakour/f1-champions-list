import driverSlice, { DriverState } from "./standingTableDriverIdSlice";

const initialState: DriverState = {
  value: '',
  status: "idle",
};
test('should return the initial state', () => {
  expect(driverSlice(undefined, {} as any)).toEqual(initialState)
})

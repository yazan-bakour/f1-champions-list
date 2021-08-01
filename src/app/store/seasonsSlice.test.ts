import seasonsSlice, { SeasonsState } from "./seasonsSlice";

const initialState: SeasonsState = {
  value: [],
  status: "idle",
};
test('should return the initial state', () => {
  expect(seasonsSlice(undefined, {} as any)).toEqual(initialState)
})

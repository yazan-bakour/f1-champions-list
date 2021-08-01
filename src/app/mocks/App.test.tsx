import championsSlice, { DriverResultState } from "../store/championsSlice";
import { render, fireEvent, screen, waitForElementToBeRemoved } from './test-utils'
import App from '../../App'
import {server, rest} from "./server"


// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('fShow loading at first', async () => {
  // render(<App />)
  const { getByTestId } = render(<App />);
  const node = getByTestId("loading")
  expect((node)).toHaveTextContent("Loading...");
  await waitForElementToBeRemoved(node)
})

//After API is fetched! We check if the data has returned by checking the list data-testid
it('Check the returned data for Main', async () => {
  const { getByTestId, getAllByTestId } = render(<App />); 
  await waitForElementToBeRemoved(()=> getByTestId("loading"))
  const listNode = getAllByTestId('list')
  expect(listNode).toHaveLength(2)
});

//We check here is the year/list has been clicked
test('Season clicked', async () => {
  const { getByTestId } = render(<App />); 
  await waitForElementToBeRemoved(()=> getByTestId("loading"))
  fireEvent.click(screen.getByText(/2005/i))
})
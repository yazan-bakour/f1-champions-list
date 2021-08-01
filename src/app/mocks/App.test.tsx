import { render, fireEvent, screen, waitForElementToBeRemoved } from "@testing-library/react";
import Main from "../views/Main";
import Result from "../views/Result";

//If API not fetched yet, we need to check if laoding si returned
test("Show loading at first", async () => {  
  const { getByTestId } = render(<Main />);
  const node = getByTestId("loading")
  expect((node)).toHaveTextContent("Loading...");
  await waitForElementToBeRemoved(node)
});

//After API is fetched! We check if the data has returned by checking the list data-testid
it('Check the returned data for Main', async () => {
  const { getByTestId, getAllByTestId } = render(<Main />); 
  await waitForElementToBeRemoved(()=> getByTestId("loading"))
  const listNode = getAllByTestId('list')
  expect(listNode).toHaveLength(2)
});

//We check here is the year/list has been clicked
test('Season clicked', async () => {
  const { getByTestId } = render(<Main />); 
  await waitForElementToBeRemoved(()=> getByTestId("loading"))
  fireEvent.click(screen.getByText(/2005/i))
})

//We get the champion name from the Result component where the result API been called and champion name passed to the body with data-testid
test("Show champion name", async () => {
  const Results = {
    number:"6",
    position:"1",
    positionText:"1",
    points:"10",
    Driver:{
       driverId:"fisichella",
       code:"FIS",
       url:"http:\/\/en.wikipedia.org\/wiki\/Giancarlo_Fisichella",
       givenName:"Giancarlo",
       familyName:"Fisichella",
       dateOfBirth:"1973-01-14",
       nationality:"Italian"
    },
  }
  const Circut = {
    circuitId: "monza",
    url:"http://en.wikipedia.org/wiki/Autodromo_Nazionale_Monza",
    circuitName:"Autodromo Nazionale di Monza",
    Location:{
      lat:"45.6156",
      long:"9.28111",
      locality:"Monza",
      country:"Italy"
    }
  }
  const Race = {
    season: '2005', 
    round: '15',
    url: 'http://en.wikipedia.org/wiki/2005_Italian_Grand_Prix',
    raceName: 'Italian Grand Prix',
    Circuit: Circut,
    date: '2005-09-04', 
    time: '14:00:00Z',
    results: Results
  }
  const { getByTestId } = render(<Result season={Race} worldChampion='anyname' />);
  const champion = getByTestId("champion")
  expect((champion)).toHaveTextContent("-")
});

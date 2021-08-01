import { rest } from 'msw'
import { setupServer } from 'msw/node'

const handlers = [
  //f1 season api test
  rest.get('http://ergast.com/api/f1/seasons.json', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        MRData: {
          SeasonTable: {
            Seasons: [
              {
                season: '2005'
              },
              {
                season: '2006'
              }
            ]
          }
        }
      })
    )
  }),
  
// Champion name api test
  rest.get('http://ergast.com/api/f1/2005/driverStandings.json', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        MRData: {
          StandingsTable: {
            StandingsLists: {
              [0]:{
                DriverStandings:{
                  Driver:{
                    driverId:'Fernando'
                  }
                }
              }
            }
          }
        }
      })
    )
  })
]

// This configures a request mocking server with the given request handlers.
const server = setupServer(...handlers)

export { server, rest }

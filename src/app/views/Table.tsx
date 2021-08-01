import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Season, Race } from '../types'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react'
import { fetchRaceDataAsync, selectRaces } from "../store/racesSlice";
import { fetchDriverDataAsync, selectDriver } from '../store/standingTableDriverIdSlice'
import Result from './Result'

//Material ui makeStyle is similar concept with styled component, here we pass css through JS so browser wont take effert to understand the css.
const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        table: {
            minWidth: 650
          },
          tRow: {
              '& th': {
                  fontWeight: 'bold',
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '10px'
                }
              }
          }
    })
)

// Using param season here in the API endpoint to get the season race data
// Using Redux dispatch and selector to determine the slice actions/reducers 
// Get the winner/worldChampion from driverStanding API to compare with the race results
// We pass race as param to results to use for api and to fetch results of every race within season.
const BasicTable = ({ season }: { season: Season['season'] }) => {

  const classes = useStyles()

  const dispatch = useDispatch()

  const {value: races} = useSelector(selectRaces) // add status back to check the loading part
  const {value: driver, status} = useSelector(selectDriver)

  useEffect(() => {
    dispatch(fetchRaceDataAsync(season))
    dispatch(fetchDriverDataAsync(season))
  }, [season])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow className={classes.tRow}>
            <TableCell>Race Name</TableCell>
            <TableCell>Race Winner Name</TableCell>
            <TableCell>World Champion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {races?.map(
            (race: Race, idx: number) => {
              return (
                <Result
                  status={status}
                  key={idx}
                  race={race}
                  worldChampion={driver}
                />
              )
            }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BasicTable

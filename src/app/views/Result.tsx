import { Race } from "../types";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchChampionDataAsync,
  selectChampion,
} from "../store/championsSlice";
import { RootState } from "../store";
import { Typography } from "@material-ui/core";

//Material ui is ux friendly, fast to develop, and reusable components.
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    responsiveFontSize: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "10px",
        "& td": {
          fontSize: "10px",
        },
      },
    },
  })
);
// Result component is representting the table row with race name, winner, and world champion.
// Using redux to fetch the end point safely, and dispatch the action/reducer of driver results.
// Good thing Redux return also if data field or still loading, and based on that we can have better UX to show loading before data render.
//Use selector is replaceing useState to detrmine the slice chosen and the data to return.
// We useEffect because API will not load at first page load, so we need to go through react lif cicle to dispatch data.
const Result = ({
  status,
  race,
  worldChampion,
}: {
  status: any;
  race: Race;
  worldChampion?: string;
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const driver = useSelector((state: RootState) => selectChampion(state, race));

  useEffect(() => {
    dispatch(fetchChampionDataAsync(race));
  }, [race]);

  return (
    <>
      {status === "loading" ? (
        <Typography data-testid="loading" variant="body1" align="center">
          Loading...
        </Typography>
      ) : (
        <TableRow
          selected={driver?.driverId === worldChampion}
          className={classes.responsiveFontSize}
        >
          <TableCell data-testid="raceName">{race.raceName}</TableCell>
          <TableCell data-testid="champion">
            {driver?.givenName || "-"}
          </TableCell>
          <TableCell>
            {driver?.driverId === worldChampion ? "World Champion" : ""}
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default Result;

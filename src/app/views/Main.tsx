import React, { Fragment, useEffect } from "react";
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeasonDataAsync, selectSeasons } from "../store/seasonsSlice";
import Table from "./Table";

//Using Material UI for styled components
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

// Using react state hook to store values and update functions.
//Using redux hooks to dispatch action that been created in slice.
//Using react hooks effect to go through combination of react lifecycle, since the API call not loaded yet.
//UseSelector to select the value of slice from redux.
//Getting all seasons from 2005 till current from seasons API, and add them as accordion list.
function Main() {
  const classes = useStyles();

  const [open, setOpen] = React.useState("-1");

  const dispatch = useDispatch();
  const { value: seasons, status } = useSelector(selectSeasons);

  const handleClick = (id: string) => {
    setOpen(id);
  };

  useEffect(() => {
    dispatch(fetchSeasonDataAsync());
  }, []);

  // Checking nn data loaded! Then we show loading...
  // Mapping all seasons into a single season for each clickable list row
  return (
    <>
      {status === "loading" ? (
        <Typography data-testid="loading" variant="body1" align="center">
          Loading...
        </Typography>
      ) : (
        seasons.map((season, idx) => (
          <Fragment key={idx}>
            <ListItem
              data-testid="list"
              button
              onClick={() =>
                handleClick(open === season.season ? "-1" : season.season)
              }
            >
              <ListItemText primary={season.season} />
              {open === season.season ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <List component="nav" aria-labelledby="nested-list-subheader">
              <Collapse
                in={open === season.season}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <Table season={season.season} />
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </Fragment>
        ))
      )}
      {}
    </>
  );
}

export default Main;

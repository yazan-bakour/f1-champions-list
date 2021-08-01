import { StandingResponse, RaceType, SeasonType as SeasonType } from "./types";
import axios from "axios";

//This API file is to add any new endpoints and to be called by slices.
export const fetchChampionsData = async (season: string, round: string) =>
  axios.get<RaceType>(
    `http://ergast.com/api/f1/${season}/${round}/results.json`
  );

export const fetchRaceData = async (season: any) =>
  axios.get<RaceType>(`http://ergast.com/api/f1/${season}.json`);

export const fetchSeasonData = () =>
  axios.get<SeasonType>("http://ergast.com/api/f1/seasons.json?offset=55");

export const fetchDriverData = async (season: any) =>
  axios.get<StandingResponse>(
    `http://ergast.com/api/f1/${season}/driverStandings.json`
  );

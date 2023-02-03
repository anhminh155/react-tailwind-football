// import { IFiltersAPI } from "../types/football-type";
import { IFiltersAPI } from "types/lookup_tables";

export const API_URL = "https://api.football-data.org/v1/";

const handleEndParam = (param: IFiltersAPI): string => {
  let result: string = "";
  Object.keys(param).forEach((key, i: number) => {
    if (key !== "competitions") {
      result += `${key}=${param[key as keyof IFiltersAPI]}&`;
    }
  });
  return result;
};
const handleEndParamPlayer = (param: IFiltersAPI): string => {
  let result: string = "";
  Object.keys(param).forEach((key, i: number) => {
    result += `${key}=${param[key as keyof IFiltersAPI]}&`;
  });
  return result;
};
export const API_FOOTBALL = {
  //competitions
  competitions: (param: IFiltersAPI) => `competitions?${handleEndParam(param)}`,
  //Standings
  competitionsStandings: (param: IFiltersAPI) =>
    `competitions/${param.competitions}/standings?${handleEndParam(param)}`,
  //(Top) Scorers
  topScorersCompetitions: (param: IFiltersAPI) =>
    `competitions/${param.competitions}/scorers?${handleEndParam(param)}`,
  //Teams competitions
  competitionsTeams: (param: IFiltersAPI) =>
    `competitions/${param.competitions}/teams?${handleEndParam(param)}`,
  //Matches competitions
  competitionsMatches: (param: IFiltersAPI) =>
    `competitions/${param.competitions}/matches?${handleEndParam(param)}`,
  //Match
  matches: (param: IFiltersAPI) => `matches?${handleEndParam(param)}`,
  //Info match
  infoMatch: (param: IFiltersAPI) =>
    `matches/${param.ids}?${handleEndParam(param)}`,
  //h2h
  infoMatchHead2head: (param: IFiltersAPI) =>
    `matches/${param.ids}/head2head?${handleEndParam(param)}`,
  //------------------
  //Team
  teamInfo: (idTeam: number) => `teams/${idTeam}`,
  //team matches
  teamMatches: (param: IFiltersAPI) =>
    `teams/${param.id}/matches?${handleEndParam(param)}`,
  //---------------
  //Player
  playerInfo: (IdPlayer: number) => `persons/${IdPlayer}`,
  //Player Match
  playerMatches: (param: IFiltersAPI) =>
    `persons/${param.id}/matches?${handleEndParamPlayer(param)}`,
  //[---------------------------------------]
};
export const NEWS_FOOTBALL = {
  
}
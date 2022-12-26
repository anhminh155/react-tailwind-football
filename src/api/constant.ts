// import { IFiltersAPI } from "../types/football-type";

import { IFiltersAPI } from "../@types/lookup_tables";

export const API_URL = "https://api.football-data.org/v4/";

const TIER = "TIER_ONE";

const handleEndParam = (param: IFiltersAPI): string => {
  let result: string = "";
  Object.keys(param).forEach((key, i: number) => {
    if (key !== "competitions") {
      result += `${key}=${param[key as keyof IFiltersAPI]}&`;
    }
  });
  return result;
};

export const API_FOOTBALL = {
  //competitions
  competitions: (param: IFiltersAPI) =>
  `competitions?${handleEndParam(param)}`,

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

  //Team
  teamInfo: (idTeam: number) => `teams/${idTeam}`,

  teamMatches: (idTeam: number) => `teams/${idTeam}/matches`,














  footballTeamMatchesCompetitions: (idTeam: number, competition: string) =>
    `teams/${idTeam}/matches?competitions=${competition}`,

  footballAreas: (idArea?: number) => `areas/${idArea}`,

  footballTierCompetitions: (idArea: string) =>
    `competitions?plan=TIER_ONE&areas=${idArea}`,
  // 2267

  footballTeamCompetitions: (competition: string) =>
    `competitions/${competition}/teams`,

  //Best Player
  footballBestScorersCompetitions: (competition: string, limit: number) =>
    `competitions/${competition}/scorers?limit=${limit}`,

  footballInfoPersonsMatches: (idPerson: number) => `teams/90`,
  // `players/${idPerson}/matches?limit=10&competitions=PL`,
  // `players/${idPerson}/matches?limit=5`,

  footballMatches: (param: IFiltersAPI) => {
    return `competitions/${param.competitions}/matches?${handleEndParam(
      param
    )}`;
    // return `matches?dateFrom=2022-12-15&dateTo=2022-12-25&status=FINISHED`;
  },

  footballHead2Head: (idMatch: number) => `matches/${idMatch}/head2head`,
};

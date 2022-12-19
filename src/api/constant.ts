// import { IFiltersAPI } from "../types/football-type";

export const API_URL = "https://api.football-data.org/v4/";

const TIER = "TIER_ONE";

export const API_FOOTBALL = {
  competitions : `competitions?plan=TIER_ONE`,

  competitionsStandings: (competitionCode: string) =>
    `competitions/${competitionCode}/standings`,













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

  footballMatches: (param: any) => {
    let result: string = "";
    Object.keys(param).forEach((key, i: number) => {
      if (key !== "competitions") {
        result += `${key}=${param[key as keyof any]}&`;
      }
    });
    return `competitions/${param.competitions}/matches?${result}`;
    // return `matches?dateFrom=2022-12-15&dateTo=2022-12-25&status=FINISHED`;
  },

  footballHead2Head: (idMatch: number) => `matches/${idMatch}/head2head`,
};

export interface ITeamsMatches {
  filters: Filters;
  resultSet: ResultSet;
  matches: Match[];
}

export interface Filters {
  season: string;
  competitions: string;
  permission: string;
  limit: number;
}

export interface ResultSet {
  count: number;
  competitions: string;
  first: string;
  last: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
}

export interface Match {
  area: Area;
  competition: Competition;
  season: Season;
  id: number;
  utcDate: string;
  status: string;
  minute?: number | null;
  injuryTime?: number | null;
  attendance?: number | null;
  venue?: string | null;
  matchday?: number | null;
  stage: string;
  group?: string | null;
  lastUpdated: string;
  homeTeam: HomeTeam;
  awayTeam: AwayTeam;
  score: Score;
  goals: any[];
  penalties: any[];
  bookings: any[];
  substitutions: any[];
  odds: Odds;
  referees: Referee[];
}

export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
}

export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner: any;
  stages: string[];
}

export interface HomeTeam {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  coach: Coach;
  leagueRank?: number | null;
  formation?: string | null;
  lineup: any[];
  bench: any[];
}

export interface Coach {
  id?: number | null;
  name?: string | null;
  nationality?: string | null;
}

export interface AwayTeam {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  coach: Coach2;
  leagueRank?: number | null;
  formation?: string | null;
  lineup: any[];
  bench: any[];
}

export interface Coach2 {
  id?: number | null;
  name?: string | null;
  nationality?: string | null;
}

export interface Score {
  winner?: string | null;
  duration: string;
  fullTime: FullTime;
  halfTime: HalfTime;
}

export interface FullTime {
  home?: number | null;
  away?: number | null;
}

export interface HalfTime {
  home?: number | null;
  away?: number | null;
}

export interface Odds {
  msg: string;
}

export interface Referee {
  id: number;
  name: string;
  type: string;
  nationality?: string | null;
}

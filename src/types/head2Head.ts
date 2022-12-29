export interface IHead2Head {
  filters: Filters;
  resultSet: ResultSet;
  aggregates: Aggregates;
  matches: Match[];
}

export interface Filters {
  limit: number;
  permission: string;
}

export interface ResultSet {
  count: number;
  competitions: string;
  first: string;
  last: string;
}

export interface Aggregates {
  numberOfMatches: number;
  totalGoals: number;
  homeTeam: HomeTeam;
  awayTeam: AwayTeam;
}

export interface HomeTeam {
  id: number;
  name: string;
  wins: number;
  draws: number;
  losses: number;
}

export interface AwayTeam {
  id: number;
  name: string;
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
  attendance: number;
  venue: string;
  matchday: number;
  stage: string;
  group?: string | null;
  lastUpdated: string;
  homeTeam: HomeTeam2;
  awayTeam: AwayTeam2;
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
  winner?: Winner | null;
  stages: string[];
}

export interface Winner {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  lastUpdated: string;
}

export interface HomeTeam2 {
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
  id: number;
  name: string;
  nationality: string;
}

export interface AwayTeam2 {
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
  id: number;
  name: string;
  nationality: string;
}

export interface Score {
  winner: string;
  duration: string;
  fullTime: FullTime;
  halfTime: HalfTime;
}

export interface FullTime {
  home: number;
  away: number;
}

export interface HalfTime {
  home: number;
  away: number;
}

export interface Odds {
  msg?: string;
  homeWin?: number
  awayWin?: number
  draw?: number
}

export interface Referee {
  id: number;
  name: string;
  type: string;
  nationality: string;
}

export interface IPlayerMatches {
  filters: Filters;
  resultSet: ResultSet;
  aggregations: Aggregations;
  person: Person;
  matches: Match[];
}

export interface Filters {
  limit: number;
  offset: number;
  competitions: string;
  permission: string;
}

export interface ResultSet {
  count: number;
  competitions: string;
  first: string;
  last: string;
}

export interface Aggregations {
  matchesOnPitch: number;
  startingXI: number;
  minutesPlayed: number;
  goals: number;
  ownGoals: number;
  assists: number;
  penalties: number;
  subbedOut: number;
  subbedIn: number;
  yellowCards: number;
  yellowRedCards: number;
  redCards: number;
}

export interface Person {
  id: number;
  name: string;
  firstName: string;
  lastName: any;
  dateOfBirth: string;
  nationality: string;
  position: string;
  shirtNumber: any;
  lastUpdated: string;
}

export interface Match {
  area: Area;
  competition: Competition;
  season: Season;
  id: number;
  utcDate: string;
  status: string;
  minute: number;
  injuryTime: number;
  attendance: number;
  venue: string;
  matchday: number;
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
  formation: string;
  lineup: any[];
  bench: any[];
}

export interface Coach {
  id: number;
  name: string;
  nationality: string;
}

export interface AwayTeam {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  coach: Coach2;
  leagueRank?: number | null;
  formation: string;
  lineup: any[];
  bench: any[];
}

export interface Coach2 {
  id?: number | null;
  name?: string | null;
  nationality?: string | null;
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
  msg: string;
}

export interface Referee {
  id: number;
  name: string;
  type: string;
  nationality?: string | null;
}

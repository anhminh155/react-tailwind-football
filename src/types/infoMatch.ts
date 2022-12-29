export interface IInfoMatch {
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
  group: any;
  lastUpdated: string;
  homeTeam: HomeTeam;
  awayTeam: AwayTeam;
  score: Score;
  goals: Goal[];
  penalties: Penalty[];
  bookings: Booking[];
  substitutions: Substitution[];
  odds: Odds;
  referees: Referee[];
}

export interface Area {
  id: number;
  name: string;
  code: string;
  flag: any;
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
  leagueRank: any;
  formation: string;
  lineup: Lineup[];
  bench: Bench[];
  statistics: Statistics;
}

export interface Coach {
  id: number;
  name: string;
  nationality: string;
}

export interface Lineup {
  id: number;
  name: string;
  position?: string | null;
  shirtNumber: number;
}

export interface Bench {
  id: number;
  name: string;
  position?: string | null;
  shirtNumber: number;
}

export interface Statistics {
  msg: string;
}

export interface AwayTeam {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  coach: Coach2;
  leagueRank: any;
  formation: string;
  lineup: Lineup2[];
  bench: Bench2[];
  statistics: Statistics2;
}

export interface Coach2 {
  id: number;
  name: string;
  nationality: string;
}

export interface Lineup2 {
  id: number;
  name: string;
  position: string;
  shirtNumber: number;
}

export interface Bench2 {
  id: number;
  name: string;
  position?: string | null;
  shirtNumber: number;
}

export interface Statistics2 {
  msg: string;
}

export interface Score {
  winner: string;
  duration: string;
  fullTime: FullTime;
  halfTime?: HalfTime;
  regularTime?: RegularTime;
  extraTime?: ExtraTime;
  penalties?: Penalties;
}

export interface FullTime {
  home: number;
  away: number;
}

export interface HalfTime {
  home: number;
  away: number;
}

export interface RegularTime {
  home: number;
  away: number;
}

export interface ExtraTime {
  home: number;
  away: number;
}

export interface Penalties {
  home: number;
  away: number;
}

export interface Goal {
  minute: number;
  injuryTime: any;
  type: string;
  team: Team;
  scorer: Scorer;
  assist?: Assist | null;
  score: Score2;
}

export interface Team {
  id: number;
  name: string;
}

export interface Scorer {
  id: number;
  name: string;
}

export interface Assist {
  id: number;
  name: string;
}

export interface Score2 {
  home: number;
  away: number;
}

export interface Penalty {
  player: Player;
  team: Team2;
  scored: boolean;
}

export interface Player {
  id: number;
  name: string;
}

export interface Team2 {
  id: number | null;
  name: string | null;
}

export interface Booking {
  minute: number;
  team: Team3;
  player: Player2;
  card: string;
}

export interface Team3 {
  id: number;
  name: string;
}

export interface Player2 {
  id: number;
  name: string;
}

export interface Substitution {
  minute: number;
  team: Team4;
  playerOut: PlayerOut;
  playerIn: PlayerIn;
}

export interface Team4 {
  id: number;
  name: string;
}

export interface PlayerOut {
  id: number;
  name: string;
}

export interface PlayerIn {
  id: number;
  name: string;
}

export interface Odds {
  msg?: string;
  homeWin?: number;
  awayWin?: number;
  draw?: number;
}

export interface Referee {
  id: number;
  name: string;
  type: string;
  nationality?: string | null;
}

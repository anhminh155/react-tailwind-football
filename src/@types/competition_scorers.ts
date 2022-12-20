export type ICompetitionScorers = {
  count: number;
  filters: {
    season: string;
    limit: number;
  };
  competition: {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
  };
  season: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: any;
  };
  scorers: Array<{
    player: {
      id: number;
      name: string;
      firstName: string;
      lastName?: string | null;
      dateOfBirth: string;
      nationality: string;
      position: string;
      shirtNumber?: number | null;
      lastUpdated: string;
    };
    team: {
      id: number;
      name: string;
      shortName: string;
      tla: string;
      crest: string;
      address: string;
      website: string;
      founded: number;
      clubColors?: string | null;
      venue: string;
      lastUpdated: string;
    };
    goals: number;
    assists: any;
    penalties?: number | null;
  }>;
};

export interface rootCompetitionScorers {
  count: number;
  filters: Filters;
  competition: Competition;
  season: Season;
  scorers: Scorer[];
}

export interface Filters {
  season: string;
  limit: number;
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
}

export interface Scorer {
  player: Player;
  team: Team;
  goals: number;
  assists: any;
  penalties?: number;
}

export interface Player {
  id: number;
  name: string;
  firstName: string;
  lastName?: string | null;
  dateOfBirth: string;
  nationality: string;
  position: string;
  shirtNumber?: number | null;
  lastUpdated: string;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors?: string | null;
  venue: string;
  lastUpdated: string;
}

export interface ICompetitionMatches {
    filters: Filters
    resultSet: ResultSet
    competition: Competition
    matches: Match[]
  }
  
  export interface Filters {
    season: string
  }
  
  export interface ResultSet {
    count: number
    first: string
    last: string
    played: number
  }
  
  export interface Competition {
    id: number
    name: string
    code: string
    type: string
    emblem: string
  }
  
  export interface Match {
    area: Area
    competition: Competition2
    season: Season
    id: number
    utcDate: string
    status: string
    matchday: number
    stage: string
    group: any
    lastUpdated: string
    homeTeam: HomeTeam
    awayTeam: AwayTeam
    score: Score
    odds: Odds
    referees: any[]
  }
  
  export interface Area {
    id: number
    name: string
    code: string
    flag: string
  }
  
  export interface Competition2 {
    id: number
    name: string
    code: string
    type: string
    emblem: string
  }
  
  export interface Season {
    id: number
    startDate: string
    endDate: string
    currentMatchday: number
    winner: any
  }
  
  export interface HomeTeam {
    id: number
    name: string
    shortName: string
    tla: string
    crest: string
  }
  
  export interface AwayTeam {
    id: number
    name: string
    shortName: string
    tla: string
    crest: string
  }
  
  export interface Score {
    winner: any
    duration: string
    fullTime: FullTime
    halfTime: HalfTime
  }
  
  export interface FullTime {
    home: any
    away: any
  }
  
  export interface HalfTime {
    home: any
    away: any
  }
  
  export interface Odds {
    homeWin: number
    draw: number
    awayWin: number
  }
  
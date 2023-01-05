export interface IMatches {
    filters: Filters
    resultSet: ResultSet
    matches: Match[]
  }
  
  export interface Filters {
    dateFrom: string
    dateTo: string
    permission: string
  }
  
  export interface ResultSet {
    count: number
    competitions: string
    first: string
    last: string
    played: number
  }
  
  export interface Match {
    area: Area
    competition: Competition
    season: Season
    id: number
    utcDate: string
    status: string
    minute: any
    injuryTime: any
    attendance: any
    venue: string
    matchday: number
    stage: string
    group: any
    lastUpdated: string
    homeTeam: HomeTeam
    awayTeam: AwayTeam
    score: Score
    goals: any[]
    penalties: any[]
    bookings: any[]
    substitutions: any[]
    odds: Odds
    referees: Referee[]
  }
  
  export interface Area {
    id: number
    name: string
    code: string
    flag: string
  }
  
  export interface Competition {
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
    stages: string[]
  }
  
  export interface HomeTeam {
    id: number
    name: string
    shortName: string
    tla: string
    crest: string
    coach: Coach
    leagueRank: number
    formation: any
    lineup: any[]
    bench: any[]
  }
  
  export interface Coach {
    id: any
    name: any
    nationality: any
  }
  
  export interface AwayTeam {
    id: number
    name: string
    shortName: string
    tla: string
    crest: string
    coach: Coach2
    leagueRank: number
    formation: any
    lineup: any[]
    bench: any[]
  }
  
  export interface Coach2 {
    id: any
    name: any
    nationality: any
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
    msg: string
  }
  
  export interface Referee {
    id: number
    name: string
    type: string
    nationality?: string | null
  }
  
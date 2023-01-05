export interface ITeams {
  area: Area
  id: number
  name: string
  shortName: string
  tla: string
  crest: string
  address: string
  website: string
  founded: number
  clubColors: string
  venue: string
  runningCompetitions: RunningCompetition[]
  coach: Coach
  squad: Squad[]
  staff: any[]
  lastUpdated: string
}

export interface Area {
  id: number
  name: string
  code: string
  flag: string
}

export interface RunningCompetition {
  id: number
  name: string
  code: string
  type: string
  emblem: string
}

export interface Coach {
  id: number
  firstName: string
  lastName: any
  name: string
  dateOfBirth: string
  nationality: string
  contract: Contract
}

export interface Contract {
  start: any
  until: any
}

export interface Squad {
  id: number
  firstName?: string | null
  lastName?: string | null
  name: string
  position: string
  dateOfBirth: string
  nationality: string
  shirtNumber: number
  contract: Contract2
}

export interface Contract2 {
  start: string
  until: string
}

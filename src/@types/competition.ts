export interface IRootCompetition {
  count: number
  filters: Filters
  competitions: Competition[]
}

export interface Filters {
  client: string
}

export interface Competition {
  id: number
  area: Area
  name: string
  code: string
  type: string
  emblem: string
  plan: string
  currentSeason: CurrentSeason
  numberOfAvailableSeasons: number
  lastUpdated: string
}

export interface Area {
  id: number
  name: string
  code: string
  flag?: string | null
}

export interface CurrentSeason {
  id: number
  startDate: string
  endDate: string
  currentMatchday: number
  winner: any
}

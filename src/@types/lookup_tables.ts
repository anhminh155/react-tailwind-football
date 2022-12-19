/**
 * @param dateFrom String /yyyy-MM-dd/
 */
export interface IFiltersAPI {
  id?: number;
  ids?: number;
  matchday?: number;
  season?: string;
  status?:
    | 'SCHEDULED'
    | 'LIVE'
    | 'IN_PLAY'
    | 'PAUSED'
    | 'FINISHED'
    | 'POSTPONED'
    | 'SUSPENDED'
    | 'CANCELLED';
  venue?: 'HOME' | 'AWAY';
  date?: string;
  dateFrom?: string;
  dateTo?: string;
  stage?:
    | 'FINAL'
    | 'THIRD_PLACE'
    | 'SEMI_FINALS'
    | 'QUARTER_FINALS'
    | 'LAST_16'
    | 'LAST_32'
    | 'LAST_64'
    | 'ROUND_4'
    | 'ROUND_3'
    | 'ROUND_2'
    | 'ROUND_1'
    | 'GROUP_STAGE'
    | 'PRELIMINARY_ROUND'
    | 'QUALIFICATION'
    | 'QUALIFICATION_ROUND_1'
    | 'QUALIFICATION_ROUND_2'
    | 'QUALIFICATION_ROUND_3'
    | 'PLAYOFF_ROUND_1'
    | 'PLAYOFF_ROUND_2'
    | 'PLAYOFFS'
    | 'REGULAR_SEASON'
    | 'CLAUSURA'
    | 'APERTURA'
    | 'CHAMPIONSHIP'
    | 'RELEGATION'
    | 'RELEGATION_ROUND';
  plan?: 'TIER_ONE' | 'TIER_TWO' | 'TIER_THREE' | 'TIER_FOUR';
  competitions: string;
  areas?: string;
  group?: string;
  limit?: number;
  offset?: number;
}

//   Enum-Types
enum CompetitionType {
  LEAGUE = 'LEAGUE',
  LEAGUE_CUP = 'LEAGUE_CUP',
  CUP = 'CUP',
  PLAYOFFS = 'PLAYOFFS'
}
enum TeamType {
  CLUB = 'CLUB ',
  NATIONAL = 'NATIONAL'
}
enum MatchStatus {
  SCHEDULED = 'SCHEDULED ',
  TIMED = 'TIMED ',
  IN_PLAY = 'IN_PLAY ',
  PAUSED = 'PAUSED ',
  EXTRA_TIME = 'EXTRA_TIME ',
  PENALTY_SHOOTOUT = 'PENALTY_SHOOTOUT ',
  FINISHED = 'FINISHED ',
  SUSPENDED = 'SUSPENDED ',
  POSTPONED = 'POSTPONED ',
  CANCELLED = 'CANCELLED ',
  AWARDED = 'AWARDED'
}
enum MatchStage {
  FINAL = 'FINAL',
  THIRD_PLACE = 'THIRD_PLACE',
  SEMI_FINALS = 'SEMI_FINALS',
  QUARTER_FINALS = 'QUARTER_FINALS',
  LAST_16 = 'LAST_16',
  LAST_32 = 'LAST_32',
  LAST_64 = 'LAST_64',
  ROUND_4 = 'ROUND_4',
  ROUND_3 = 'ROUND_3',
  ROUND_2 = 'ROUND_2',
  ROUND_1 = 'ROUND_1',
  GROUP_STAGE = 'GROUP_STAGE',
  PRELIMINARY_ROUND = 'PRELIMINARY_ROUND',
  QUALIFICATION = 'QUALIFICATION',
  QUALIFICATION_ROUND_1 = 'QUALIFICATION_ROUND_1',
  QUALIFICATION_ROUND_2 = 'QUALIFICATION_ROUND_2',
  QUALIFICATION_ROUND_3 = 'QUALIFICATION_ROUND_3',
  PLAYOFF_ROUND_1 = 'PLAYOFF_ROUND_1',
  PLAYOFF_ROUND_2 = 'PLAYOFF_ROUND_2',
  PLAYOFFS = 'PLAYOFFS',
  REGULAR_SEASON = 'REGULAR_SEASON',
  CLAUSURA = 'CLAUSURA',
  APERTURA = 'APERTURA',
  CHAMPIONSHIP = 'CHAMPIONSHIP',
  RELEGATION = 'RELEGATION',
  RELEGATION_ROUND = 'RELEGATION_ROUND'
}

enum MatchGroup {
  GROUP_A = 'GROUP_A',
  GROUP_B = 'GROUP_B',
  GROUP_C = 'GROUP_C',
  GROUP_D = 'GROUP_D',
  GROUP_E = 'GROUP_E',
  GROUP_F = 'GROUP_F',
  GROUP_G = 'GROUP_G',
  GROUP_H = 'GROUP_H',
  GROUP_I = 'GROUP_I',
  GROUP_J = 'GROUP_J',
  GROUP_K = 'GROUP_K',
  GROUP_L = 'GROUP_L'
}

enum PenaltyType {
  MATCH = 'MATCH ',
  SHOOTOUT = 'SHOOTOUT'
}

enum ScoreDuration {
  REGULAR = 'REGULAR',
  EXTRA_TIME = 'EXTRA_TIME',
  PENALTY_SHOOTOUT = 'PENALTY_SHOOTOUT'
}
enum CardType {
  YELLOW = 'YELLOW ',
  YELLOW_RED = 'YELLOW_RED ',
  RED = 'RED'
}
enum GoalType {
  REGULAR = 'REGULAR ',
  OWN = 'OWN ',
  PENALTY = 'PENALTY'
}
enum PersonRole {
  REFEREE = 'REFEREE,',
  ASSISTANT_REFEREE_N1 = 'ASSISTANT_REFEREE_N1',
  ASSISTANT_REFEREE_N2 = 'ASSISTANT_REFEREE_N2',
  ASSISTANT_REFEREE_N3 = 'ASSISTANT_REFEREE_N3',
  FOURTH_OFFICIAL = 'FOURTH_OFFICIAL',
  VIDEO_ASSISTANT_REFEREE_N1 = 'VIDEO_ASSISTANT_REFEREE_N1',
  VIDEO_ASSISTANT_REFEREE_N2 = 'VIDEO_ASSISTANT_REFEREE_N2',
  VIDEO_ASSISTANT_REFEREE_N3 = 'VIDEO_ASSISTANT_REFEREE_N3'
}

export const EnumTypes = {
  CompetitionType,
  TeamType,
  MatchStatus,
  MatchStage,
  MatchGroup,
  PenaltyType,
  ScoreDuration,
  CardType,
  GoalType,
  PersonRole
};

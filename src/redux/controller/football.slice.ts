// /* eslint-disable no-use-before-define */
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  PayloadActionCreator,
} from "@reduxjs/toolkit";
import { ICompetitionMatches } from "types/competiiton_matches";
import { IRootCompetition } from "types/competition";
import { ICompetitionScorers } from "types/competition_scorers";
import { ICompetitionStandings } from "types/competition_standings";
import { ICompetitionTeam } from "types/competition_teams";
import { IHead2Head } from "types/head2Head";
import { IInfoMatch } from "types/infoMatch";
import { IFiltersAPI } from "types/lookup_tables";
import { API_FOOTBALL } from "../../api/constant";
import Http from "../../api/http.api";
import { DataFake } from "../../common/dataFake";
import Utils from "../../common/utils";
import { setMessage } from "./app.slice";

interface FootballState {
  loadingFootball: boolean;
  loadingCompetitionsMatches: boolean;
  loadingModalFootball: boolean;
  loadingH2H: boolean
  rootCompetitions: IRootCompetition;
  rootCompetitionsStanding: ICompetitionStandings;
  rootScorers: ICompetitionScorers;
  rootCompetitionsTeams: ICompetitionTeam;
  rootCompetitionsMatches: ICompetitionMatches;
  rootInfoMatch: IInfoMatch;
  rootHead2Head: IHead2Head;
}

const initAppState: FootballState = {
  loadingFootball: false,
  loadingModalFootball: false,
  loadingCompetitionsMatches: false,
  loadingH2H: false,
  rootCompetitions: DataFake.CompetitionsAreas(),
  rootCompetitionsStanding: DataFake.CompetitionsStandings(),
  rootScorers: DataFake.CompetitionScorers(),
  rootCompetitionsTeams: DataFake.CompetitionsTeams(),
  rootCompetitionsMatches: DataFake.CompetitionsMatches(),
  rootInfoMatch: DataFake.InfoMatch(),
  rootHead2Head: DataFake.Head2Head(),
};

const footballSlice = createSlice({
  name: "football",
  initialState: initAppState,
  reducers: {
    setLoadingFootball(state, action: PayloadAction<boolean>) {
      state.loadingFootball = action.payload;
    },
    setLoadingModalFootball(state, action: PayloadAction<boolean>) {
      state.loadingModalFootball = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCompetitions.pending, (state: any) => {
        state.loadingFootball = true;
      })
      .addCase(
        fetchCompetitions.fulfilled,
        (state: any, action: PayloadAction<IRootCompetition | any>) => {
          if (!action.payload.message) {
            state.rootCompetitions = action.payload;
            state.loadingFootball = false;
          }
        }
      );
    builder
      .addCase(fetchCompetitionStandings.pending, (state: any) => {
        state.loadingFootball = true;
      })
      .addCase(
        fetchCompetitionStandings.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          const payload: ICompetitionStandings = action.payload;
          if (!action.payload.message) {
            state.rootCompetitionsStanding = payload;
            state.loadingFootball = false;
          }
        }
      );
    builder
      .addCase(fetchCompetitionsTeams.pending, (state: any) => {
        state.loadingFootball = true;
      })
      .addCase(
        fetchCompetitionsTeams.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          const payload: ICompetitionTeam = action.payload;
          if (!action.payload.message) {
            state.rootCompetitionsTeams = payload;
            state.loadingFootball = false;
          }
        }
      );
    builder
      .addCase(fetchCompetitionsMatches.pending, (state: any) => {
        state.loadingCompetitionsMatches = true;
      })
      .addCase(
        fetchCompetitionsMatches.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          const payload: ICompetitionMatches = action.payload;
          if (!action.payload.message) {
            state.rootCompetitionsMatches = payload;
            state.loadingCompetitionsMatches = false;
          }
        }
      );
    builder
      .addCase(fetchTopScorersCompetitions.pending, (state: any) => {
        state.loadingFootball = true;
      })
      .addCase(
        fetchTopScorersCompetitions.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          const payload: ICompetitionScorers = action.payload;
          if (!action.payload.message) {
            state.rootScorers = payload;
            state.loadingFootball = false;
          }
        }
      );
    builder
      .addCase(fetchInfoMatch.pending, (state: any) => {
        state.loadingFootball = true;
      })
      .addCase(
        fetchInfoMatch.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          const payload: IInfoMatch = action.payload;
          // console.log(payload);
          if (!action.payload.message) {
            state.rootInfoMatch = payload;
            state.loadingFootball = false;
          }
        }
      );
    builder
      .addCase(fetchInfoMatchHead2head.pending, (state: any) => {
        state.loadingH2H = true;
      })
      .addCase(
        fetchInfoMatchHead2head.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          const payload: IHead2Head = action.payload;
          if (!action.payload.message) {
            state.rootHead2Head = payload;
            state.loadingH2H = false;
          }
        }
      );
    builder
      .addCase(fetchTeamMatches.pending, (state: any) => {
        state.loadingFootball = true;
      })
      .addCase(
        fetchTeamMatches.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          // const payload: ICompetitionScorers = action.payload;
          console.log(action.payload);
          if (!action.payload.message) {
            // state.rootScorers = action.payload;
            state.loadingFootball = false;
          }
        }
      );
  },
});

/**
 * @function fetchCompetitionsArea
 *
 * Call API list Competitions Tier 1
 */
export const fetchCompetitions = createAsyncThunk(
  "football/fetchCompetitions",
  async (param: IFiltersAPI, { dispatch }) => {
    try {
      const res: any = await Http.get(API_FOOTBALL.competitions(param));
      if (res.data) {
        const data = res.data as unknown;
        return data;
      }
    } catch (error) {
      dispatch(setMessage(Utils.getMassage()));
      dispatch(setLoadingFootball(false));
      return error;
    }
  }
);

/**
 * @function fetchCompetitionStandings
 *
 * Call API list fetchCompetition Standings with competitions code
 */
export const fetchCompetitionStandings = createAsyncThunk(
  "football/CompetitionStandings",
  async (param: IFiltersAPI, { dispatch }) => {
    try {
      const res: any = await Http.get(
        API_FOOTBALL.competitionsStandings(param)
      );
      if (res.data) {
        const data = res.data as unknown;
        return data;
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);

      dispatch(setMessage(Utils.getMassage()));
      dispatch(setLoadingFootball(false));
      return error;
    }
  }
);

/**
 * @function fetchCompetitionsMatches
 *
 * @type IFiltersAPI
 *
 */
export const fetchCompetitionsMatches = createAsyncThunk(
  "football/CompetitionsMatches",
  async (param: IFiltersAPI, { dispatch }) => {
    try {
      const res: any = await Http.get(API_FOOTBALL.competitionsMatches(param));
      if (res.data) {
        const data = res.data as unknown;
        return data;
      }
    } catch (error) {
      dispatch(setMessage(Utils.getMassage()));
      dispatch(setLoadingFootball(false));
      return error;
    }
  }
);

/**
 * @function fetchTopScorersCompetitions
 *
 * Call API list (Top) Scorers with 2 agu
 * @argument competition
 *
 * @argument limit
 */

export const fetchTopScorersCompetitions = createAsyncThunk(
  "football/fetchTopScorersCompetitions",
  async (param: IFiltersAPI, { dispatch }) => {
    try {
      const res: any = await Http.get(
        API_FOOTBALL.topScorersCompetitions(param)
      );
      if (res.data) {
        const data = res.data as unknown;
        return data;
      }
    } catch (error) {
      dispatch(setMessage(Utils.getMassage()));
      dispatch(setLoadingFootball(false));
      return error;
    }
  }
);

/**
 * @function fetchTeamMatches
 *
 * Call API list (Top) Scorers with 2 agu
 * @argument idTeam
 *
 */
// export type ITopScorers = {
//   competition: string;
//   limit: number;
// };
export const fetchTeamMatches = createAsyncThunk(
  "football/fetchTeamMatches",
  async (idTeam: number, { dispatch }) => {
    try {
      const res: any = await Http.get(API_FOOTBALL.teamMatches(idTeam));
      if (res.data) {
        const data = res.data as unknown;
        return data;
      }
    } catch (error) {
      dispatch(setMessage(Utils.getMassage()));
      dispatch(setLoadingFootball(false));
      return error;
    }
  }
);

/**
 * @function fetchCompetitionsTeams
 *
 * Call API list (Top) Scorers with 2 agu
 * @argument competition
 *
 */
export const fetchCompetitionsTeams = createAsyncThunk(
  "football/fetchCompetitionsTeams",
  async (param: IFiltersAPI, { dispatch }) => {
    try {
      const res: any = await Http.get(API_FOOTBALL.competitionsTeams(param));
      if (res.data) {
        const data = res.data as unknown;
        return data;
      }
    } catch (error) {
      dispatch(setMessage(Utils.getMassage()));
      dispatch(setLoadingFootball(false));
      return error;
    }
  }
);

/**
 * @function fetchInfoMatch
 *
 * Call API list (Top) Scorers with 2 agu
 * @argument competition
 *
 */
export const fetchInfoMatch = createAsyncThunk(
  "football/fetchInfoMatch",
  async (param: IFiltersAPI, { dispatch }) => {
    try {
      const res: any = await Http.get(API_FOOTBALL.infoMatch(param));
      if (res.data) {
        const data = res.data as unknown;
        return data;
      }
    } catch (error) {
      dispatch(setMessage(Utils.getMassage()));
      dispatch(setLoadingFootball(false));
      return error;
    }
  }
);

/**
 * @function fetchInfoMatchHead2head
 *
 * Call API fetchInfoMatchHead2head
 * @argument param
 *
 */
export const fetchInfoMatchHead2head = createAsyncThunk(
  "football/fetchInfoMatchHead2head",
  async (param: IFiltersAPI, { dispatch }) => {
    try {
      const res: any = await Http.get(API_FOOTBALL.infoMatchHead2head(param));
      if (res.data) {
        const data = res.data as unknown;
        return data;
      }
    } catch (error) {
      dispatch(setMessage(Utils.getMassage()));
      return error;
    }
  }
);

export const { setLoadingFootball, setLoadingModalFootball } =
  footballSlice.actions;
export const footballReducer = footballSlice.reducer;

// /* eslint-disable no-use-before-define */
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  PayloadActionCreator,
} from "@reduxjs/toolkit";
import { IRootCompetition } from "../../@types/competition";
import { ICompetitionScorers } from "../../@types/competition_scorers";
import { ICompetitionStandings } from "../../@types/competition_standings";
import { API_FOOTBALL } from "../../api/constant";
import Http from "../../api/http.api";
import { DataFake } from "../../common/dataFake";
import Utils from "../../common/utils";
import { setMessage } from "./app.slice";

interface FootballState {
  loadingFootball: boolean;
  loadingModalFootball: boolean;
  rootCompetitions: IRootCompetition;
  rootCompetitionsStanding: ICompetitionStandings;
  rootScorers: ICompetitionScorers;
}

const initAppState: FootballState = {
  loadingFootball: false,
  loadingModalFootball: false,
  rootCompetitions: DataFake.CompetitionsAreas(),
  rootCompetitionsStanding: DataFake.CompetitionsStandings(),
  rootScorers: DataFake.CompetitionScorers(),
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
      .addCase(fetchCompetitionsMatches.pending, (state: any) => {
        state.loadingFootball = true;
      })
      .addCase(
        fetchCompetitionsMatches.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          if (!action.payload.message) {
            // state.rootCompetitionsStanding = action.payload;
            state.loadingFootball = false;
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
            state.rootScorers = action.payload;
            state.loadingFootball = false;
          }
        }
      )
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
  async (_data, { dispatch }) => {
    try {
      const res: any = await Http.get(API_FOOTBALL.competitions);
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
  async (competitionCode: string, { dispatch }) => {
    try {
      const res: any = await Http.get(
        API_FOOTBALL.competitionsStandings(competitionCode)
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
 * @function fetchCompetitionsMatches
 *
 * @argument competitionCode
 */
export const fetchCompetitionsMatches = createAsyncThunk(
  "football/CompetitionsMatches",
  async (competitionCode: string, { dispatch }) => {
    try {
      const res: any = await Http.get(
        API_FOOTBALL.competitionsMatches(competitionCode)
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
 * @function fetchTopScorersCompetitions
 *
 * Call API list (Top) Scorers with 2 agu
 * @argument competition
 *
 * @argument limit
 */
export type ITopScorers = {
  competition: string;
  limit: number;
};
export const fetchTopScorersCompetitions = createAsyncThunk(
  "football/fetchTopScorersCompetitions",
  async ({ competition, limit }: ITopScorers, { dispatch }) => {
    try {
      const res: any = await Http.get(
        API_FOOTBALL.topScorersCompetitions(competition, limit)
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
export const { setLoadingFootball, setLoadingModalFootball } =
  footballSlice.actions;
export const footballReducer = footballSlice.reducer;

// /* eslint-disable no-use-before-define */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRootCompetition } from "../../@types/competition";
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
}

const initAppState: FootballState = {
  loadingFootball: false,
  loadingModalFootball: false,
  rootCompetitions: DataFake.CompetitionsAreas(),
  rootCompetitionsStanding: DataFake.CompetitionsStandings(),
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
          console.log(action.payload);
          if (!action.payload.message) {
            state.rootCompetitionsStanding = action.payload;
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

export const { setLoadingFootball, setLoadingModalFootball } =
  footballSlice.actions;
export const footballReducer = footballSlice.reducer;

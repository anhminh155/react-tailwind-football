// /* eslint-disable no-use-before-define */
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  PayloadActionCreator,
} from "@reduxjs/toolkit";
import { IRootCompetition } from "types/competition";
import { ICompetitionScorers } from "types/competition_scorers";
import { ICompetitionStandings } from "types/competition_standings";
import { ITeam } from "types/team";
import { API_FOOTBALL } from "../../api/constant";
import Http from "../../api/http.api";
import { DataFake } from "../../common/dataFake";
import Utils from "../../common/utils";
import { setMessage } from "./app.slice";

interface FootballState {
  loadingTeam: boolean;
  rootTeam: ITeam;
}

const initAppState: FootballState = {
  loadingTeam: false,
  rootTeam: DataFake.Team(),
};

const footballTeamSlice = createSlice({
  name: "footballTeam",
  initialState: initAppState,
  reducers: {
    setLoadingTeam(state, action: PayloadAction<boolean>) {
      state.loadingTeam = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTeam.pending, (state: any) => {
        state.loadingTeam = true;
      })
      .addCase(
        fetchTeam.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          console.log(action.payload);
          if (!action.payload.message) {
            state.rootTeam = action.payload;
            state.loadingTeam = false;
          }
        }
      );
  },
});

/**
 * @function fetchTeam
 */
export const fetchTeam = createAsyncThunk(
  "footballTeam/fetchTeam",
  async (idTeam: number, { dispatch }) => {
    try {
      const res: any = await Http.get(API_FOOTBALL.teamInfo(idTeam));
      if (res.data) {
        const data = res.data as unknown;
        return data;
      }
    } catch (error) {
      dispatch(setMessage(Utils.getMassage()));
      dispatch(setLoadingTeam(false));
      return error;
    }
  }
);

export const { setLoadingTeam } = footballTeamSlice.actions;
export const footballTeamReducer = footballTeamSlice.reducer;

// /* eslint-disable no-use-before-define */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITeams } from "types/teams";
import { API_FOOTBALL } from "api/constant";
import Http from "api/http.api";
import { DataFake } from "common/dataFake";
import { IFiltersAPI } from "types/lookup_tables";
import { ITeamsMatches } from "types/teams_matches";

interface FootballState {
  loadingTeam: boolean;
  loadingTeamMatch: boolean;
  rootTeam: ITeams;
  rootTeamsMatches: ITeamsMatches;
}

const initAppState: FootballState = {
  loadingTeam: false,
  loadingTeamMatch: false,
  rootTeam: DataFake.Teams(),
  rootTeamsMatches: DataFake.TeamsMatches(),
};

const footballTeamSlice = createSlice({
  name: "footballTeam",
  initialState: initAppState,
  reducers: {
    setLoadingTeam(state, action: PayloadAction<boolean>) {
      state.loadingTeam = action.payload;
    },
    setLoadingTeamMatch(state, action: PayloadAction<boolean>) {
      state.loadingTeamMatch = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTeam.pending, (state) => {
        state.loadingTeam = true;
      })
      .addCase(fetchTeam.fulfilled, (state, action: PayloadAction<any>) => {
        if (!action.payload.message) {
          state.rootTeam = action.payload;
          state.loadingTeam = false;
        }
      });
    builder
      .addCase(fetchTeamMatches.pending, (state: any) => {
        state.loadingTeamMatch = true;
      })
      .addCase(
        fetchTeamMatches.fulfilled,
        (state, action: PayloadAction<any>) => {
          const payload: ITeamsMatches = action.payload;
          if (!action.payload.message) {
            state.rootTeamsMatches = payload;
            state.loadingTeamMatch = false;
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
      dispatch(setLoadingTeam(false));
      return error;
    }
  }
);

/**
 * @function fetchTeamMatches
 */
export const fetchTeamMatches = createAsyncThunk(
  "football/fetchTeamMatches",
  async (param: IFiltersAPI, { dispatch }) => {
    try {
      const res: any = await Http.get(API_FOOTBALL.teamMatches(param));
      if (res.data) {
        const data = res.data as unknown;
        return data;
      }
    } catch (error) {
      dispatch(setLoadingTeamMatch(false));
      return error;
    }
  }
);

export const { setLoadingTeam, setLoadingTeamMatch } =
  footballTeamSlice.actions;
export const footballTeamReducer = footballTeamSlice.reducer;

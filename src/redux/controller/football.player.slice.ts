// /* eslint-disable no-use-before-define */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_FOOTBALL } from "api/constant";
import Http from "api/http.api";
import { DataFake } from "common/dataFake";
import { IFiltersAPI } from "types/lookup_tables";
import { IPlayer } from "types/player";
import { IPlayerMatches } from "types/player_matches";

interface FootballState {
  loadingPlayer: boolean;
  loadingPlayerMatches: boolean;
  rootPlayer: IPlayer;
  rootPlayerMatches: IPlayerMatches;
  competitionPlayer: string;
}

const initAppState: FootballState = {
  loadingPlayer: false,
  loadingPlayerMatches: false,
  rootPlayer: DataFake.PlayerInfo(),
  rootPlayerMatches: DataFake.PlayerMatches(),
  competitionPlayer: "",
};

const footballPlayerSlice = createSlice({
  name: "footballPlayer",
  initialState: initAppState,
  reducers: {
    setLoadingTeam(state, action: PayloadAction<boolean>) {
      state.loadingPlayer = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPlayer.pending, (state) => {
        state.loadingPlayer = true;
      })
      .addCase(fetchPlayer.fulfilled, (state, action: PayloadAction<any>) => {
        const payload: IPlayer = action.payload;
        if (!action.payload.message) {
          state.rootPlayer = payload;
          state.loadingPlayer = false;
        }
      });
    builder
      .addCase(fetchPlayerMatches.pending, (state) => {
        state.loadingPlayerMatches = true;
      })
      .addCase(
        fetchPlayerMatches.fulfilled,
        (state, action: PayloadAction<any>) => {
          const payload: IPlayerMatches = action.payload;
          if (
            state.rootPlayerMatches.person.id !== payload.person.id ||
            state.competitionPlayer?.length === 0
          ) {
            state.competitionPlayer = payload.resultSet.competitions;
          }
          if (!action.payload.message) {
            state.rootPlayerMatches = payload;
            state.loadingPlayerMatches = false;
          }
        }
      );
  },
});

/**
 * @function fetchPlayer
 */
export const fetchPlayer = createAsyncThunk(
  "footballPlayer/fetchPlayer",
  async (IdPlayer: number, { dispatch }) => {
    try {
      const res: any = await Http.get(API_FOOTBALL.playerInfo(IdPlayer));
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
 * @function fetchPlayerMatches
 */
export const fetchPlayerMatches = createAsyncThunk(
  "footballPlayer/fetchPlayerMatches",
  async (param: IFiltersAPI, { dispatch }) => {
    try {
      const res: any = await Http.get(API_FOOTBALL.playerMatches(param));
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

export const { setLoadingTeam } = footballPlayerSlice.actions;
export const footballPlayerReducer = footballPlayerSlice.reducer;

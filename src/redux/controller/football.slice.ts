/* eslint-disable no-use-before-define */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRootCompetition } from '../../@types/competition';
import { API_FOOTBALL } from '../../api/constant';
import Http from '../../api/http.api';
import { DataFake } from '../../common/dataFake';
import Utils from '../../common/utils';
import { setMessage } from './app.slice';

interface FootballState {
  loadingFootball: boolean;
  loadingModalFootball: boolean;
  rootCompetitions: IRootCompetition;
}

const initAppState: FootballState = {
  loadingFootball: false,
  loadingModalFootball: false,
  rootCompetitions: DataFake.CompetitionsAreas()
};

const footballSlice = createSlice({
  name: 'football',
  initialState: initAppState,
  reducers: {
    setLoadingFootball(state, action: PayloadAction<boolean>) {
      state.loadingFootball = action.payload;
    },
    setLoadingModalFootball(state, action: PayloadAction<boolean>) {
      state.loadingModalFootball = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCompetitions.pending, (state) => {
        state.loadingFootball = true;
      })
      .addCase(
        fetchCompetitions.fulfilled,
        (state, action: PayloadAction<IRootCompetition | any>) => {
          if (!action.payload.message) {
            state.rootCompetitions = action.payload;
            state.loadingModalFootball = false;
          }
        }
      );
  }
});

/**
 * @function fetchCompetitionsArea
 *
 * Call API list Competitions Tier 1
 */
export const fetchCompetitions = createAsyncThunk(
  'football/fetchCompetitionsArea',
  async (_data, { dispatch }) => {
    try {
      const res: any = await Http.get(API_FOOTBALL.Competitions());
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

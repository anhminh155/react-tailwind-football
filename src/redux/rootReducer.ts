import { AnyAction, combineReducers, ThunkDispatch } from "@reduxjs/toolkit";
import { appReducer } from "./controller/app.slice";
import { footballTeamReducer } from "./controller/football-team";
import { footballReducer } from "./controller/football.slice";

const rootReducer = combineReducers({
  app: appReducer,
  football: footballReducer,
  footballTeam: footballTeamReducer,
});

// 1. Get the root state's type from reducers
export type RootState = ReturnType<typeof rootReducer>;
// 2. Create a type for thunk dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export default rootReducer;

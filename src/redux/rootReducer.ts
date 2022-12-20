import { combineReducers } from "@reduxjs/toolkit";
import { appReducer } from "./controller/app.slice";
import { footballTeamReducer } from "./controller/football-team";
import { footballReducer } from "./controller/football.slice";

const rootReducer = combineReducers({
  app: appReducer,
  football: footballReducer,
  footballTeam: footballTeamReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

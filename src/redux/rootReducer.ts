import { combineReducers } from "@reduxjs/toolkit";
import { appReducer } from "./controller/app.slice";
import { footballReducer } from "./controller/football.slice";

const rootReducer = combineReducers({
  app: appReducer,
  football: footballReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

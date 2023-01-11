import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LanguageType, NavbarType } from "types/define";

interface AppState {
  type: string;
  message: string;
  theme: string;
  language: LanguageType;
  navbar: NavbarType;
  user: any | null;
}

const initAppState: AppState = {
  language: "en",
  navbar: "home",
  theme: "light",
  type: "",
  message: "",
  user: null,
};

const appSlice = createSlice({
  name: "app",
  initialState: initAppState,
  reducers: {
    changeLanguage(state, action: PayloadAction<LanguageType>) {
      state.language = action.payload;
    },
    setNavbar(state, action: PayloadAction<NavbarType>) {
      const navbar = action.payload;
      if (navbar !== state.navbar) {
        state.navbar = action.payload;
      }
    },
    setTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
    },
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    setUser(state, action: PayloadAction<string>) {
      state.user = JSON.parse(action.payload);
    },
  },
});

export const { changeLanguage, setNavbar, setMessage, setTheme, setUser } =
  appSlice.actions;
export const appReducer = appSlice.reducer;

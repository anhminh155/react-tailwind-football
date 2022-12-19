import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Utils from "./common/utils";
import Auth from "./layouts/Auth";
import Dashboard from "./layouts/Dashboard";
import { useSelectorRoot } from "./redux/hooks";
import { RootState } from "./redux/rootReducer";

type Props = {};

const App: React.FC<Props> = () => {
  const { theme } = useSelectorRoot((state: RootState) => state.app);
  if (!Utils.getValueLocalStorage("theme")) {
    Utils.setLocalStorage("theme", "dark");
  }
  return (
    <div className={`font-inter ${theme}`}>
      <Router>
        <Routes>
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="" element={<Navigate replace to="/dashboard" />} />
          {/* <Route path='*' element={<Navigate replace to='/' />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;

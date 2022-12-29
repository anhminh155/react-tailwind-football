import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Props } from "types/define";
import { useDispatchRoot, useSelectorRoot } from "redux/hooks";
import { RootState } from "redux/rootReducer";
import { IPathNameChild } from "routes";

const MatchesPage: React.FC<Props> = () => {
  const dispatch = useDispatchRoot();
  const {} = useSelectorRoot((state: RootState) => state.football);
  const { competitionCode, idTeam } = useParams<IPathNameChild>();

  useEffect(() => {
    // dispatch(fetchTeamMatches(Number(idTeam)));
  }, []);

  return <div>Matches</div>;
};

export default MatchesPage;

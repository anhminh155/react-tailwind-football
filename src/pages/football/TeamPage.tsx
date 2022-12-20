import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams } from "react-router-dom";
import { Props } from "../../@types/define";
import { fetchTeam } from "../../redux/controller/football-team";
import { useDispatchRoot, useSelectorRoot } from "../../redux/hooks";
import { RootState } from "../../redux/rootReducer";
import { IPathNameChild } from "../../routes";

const TeamPage: React.FC<Props> = () => {
  const dispatch = useDispatchRoot();
  const {rootTeam} = useSelectorRoot((state: RootState) => state.footballTeam);
  const { competitionCode, idTeam } = useParams<IPathNameChild>();

  useEffect(() => {
    dispatch(fetchTeam(Number(idTeam)));
  }, []);

  return (
    <div>
      <div className="">
        <LazyLoadImage
          effect="blur"
          src={rootTeam?.crest}
          className="h-10 bg-transparent"
          alt=""
        />
    <div className="">{rootTeam?.name}</div>
      </div>
    </div>
  );
};

export default React.memo(TeamPage);

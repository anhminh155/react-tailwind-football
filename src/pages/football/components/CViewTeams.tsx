import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Team } from "types/competition_teams";
import { Props } from "types/define";
import CLoading from "components/CLoading";
import { useSelectorRoot } from "redux/hooks";
import { RootState } from "redux/rootReducer";
import CModalViewTeam from "./CModalViewTeam";

const CViewTeams: React.FC<Props> = () => {
  const { loadingFootball, rootCompetitionsTeams } = useSelectorRoot(
    (state: RootState) => state.football
  );
  let [isOpen, setIsOpen] = useState<boolean>(false);
  let [dataTeam, setDataTeam] = useState<Team>();

  return (
    <CLoading loading={loadingFootball}>
      <div className=" flex items-center justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 p-5">
          {rootCompetitionsTeams.teams.map((team: Team, i: number) => (
            <div
              key={i}
              onClick={() => {
                setDataTeam(team);
                setIsOpen(true);
              }}
              className="flex flex-col dark:bg-gray-600 bg-white shadow-lg text-center py-5 rounded-lg hover:scale-105 cursor-pointer"
            >
              <LazyLoadImage
                effect="blur"
                src={team.crest}
                className="object-contain h-20 mx-auto"
                alt=""
              />
              <span className="px-2">{team.shortName}</span>
            </div>
          ))}
          <CModalViewTeam
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            dataTeam={dataTeam!}
          />
        </div>
      </div>
    </CLoading>
  );
};

export default React.memo(CViewTeams);

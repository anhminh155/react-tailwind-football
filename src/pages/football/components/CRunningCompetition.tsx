import React from "react";
import { Props } from "types/define";
import { ITeams, RunningCompetition } from "types/teams";
import CLoading from "components/CLoading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ResultSet } from "types/teams_matches";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import Utils from "common/utils";

interface ICRunningCompetition extends Props {
  getId?(idPlayer: number): void;
  dataTeam: ITeams;
  dataResult: ResultSet;
  loading?: boolean;
}

const CRunningCompetition: React.FC<ICRunningCompetition> = ({
  getId,
  dataTeam,
  loading = false,
  dataResult,
}) => {
  return (
    <CLoading loading={loading}>
      <div className="">
        <div className="bg-gray-200 dark:bg-gray-700 py-2 mb-1">
          <div className="uppercase flex items-center justify-center ">
            <div className="font-semibold">RESULT</div>
          </div>
        </div>
        <div className="py-3">
          <div className="">
            <span className="font-semibold pr-2 text-base">Season:</span>
            <span>{Utils.formatWithTimeZone(new Date(dataResult.first), "dd/MM/yyyy")}</span>
            <FontAwesomeIcon icon={faRightLong} className="text-base px-2" />
            <span>{Utils.formatWithTimeZone(new Date(dataResult.last), "dd/MM/yyyy")}</span>
          </div>
          <div className="">
            <span className="font-semibold pr-2 text-base">Total matches:</span>
            <span>{dataResult.count}</span>
          </div>
          <div className="">
            <span className="font-semibold pr-2 text-base">Wins:</span>
            <span>{dataResult.wins}</span>
          </div>
          <div className="">
            <span className="font-semibold pr-2 text-base">Draws:</span>
            <span>{dataResult.draws}</span>
          </div>
          <div className="">
            <span className="font-semibold pr-2 text-base">Losses:</span>
            <span>{dataResult.losses}</span>
          </div>
        </div>
      </div>
      {dataTeam.runningCompetitions.map(
        (cpt: RunningCompetition, i: number) => {
          return (
            <div key={i} className="">
              <div className="bg-gray-200 dark:bg-gray-700 py-2 mb-1">
                <div className="uppercase flex items-center justify-center ">
                  <LazyLoadImage
                    effect="blur"
                    src={cpt.emblem}
                    className="w-10 h-10 mr-3.5"
                    alt=""
                  />
                  <div className="font-semibold">{cpt.name}</div>
                </div>
              </div>
              <div className=""></div>
            </div>
          );
        }
      )}
    </CLoading>
  );
};

export default React.memo(CRunningCompetition);

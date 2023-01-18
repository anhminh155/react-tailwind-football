import React from "react";
import { Props } from "types/define";
import CLoading from "components/CLoading";
import { Aggregations, ResultSet } from "types/player_matches";
import Utils from "common/utils";

interface IPlayerAggregations extends Props {
  aggregations: Aggregations;
  loading?: boolean;
  resultSet: ResultSet;
}

const PlayerAggregations: React.FC<IPlayerAggregations> = ({
  aggregations,
  resultSet,
  loading = false,
}) => {
  return (
    <CLoading loading={loading}>
      <div className="">
        <div className="bg-gray-200 dark:bg-gray-700 py-2 mb-1">
          <div className="uppercase flex items-center justify-center ">
            <div className="font-semibold">
              AGGREGATIONS:
              {resultSet.first
                ? `${Utils.formatWithTimeZone(
                    new Date(resultSet.first),
                    "dd/MM/yyyy"
                  )} - ${Utils.formatWithTimeZone(
                    new Date(resultSet.last),
                    "dd/MM/yyyy"
                  )}`
                : ""}
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 p-2">
          <div className="pb-2 flex">
            <div className="font-semibold pr-2">Matches On Pitch:</div>
            <span>{aggregations.matchesOnPitch}</span>
          </div>
          <div className="pb-2 flex">
            <div className="font-semibold pr-2">Minutes Played:</div>
            <span>{aggregations.minutesPlayed}</span>
          </div>
          <div className="pb-2 flex">
            <div className="font-semibold pr-2">Goals:</div>
            <span>{aggregations.goals}</span>
          </div>
          <div className="pb-2 flex">
            <div className="font-semibold pr-2">Assists:</div>
            <span>{aggregations.assists}</span>
          </div>
          <div className="pb-2 flex">
            <div className="font-semibold pr-2">Penalties:</div>
            <span>{aggregations.penalties}</span>
          </div>
          <div className="pb-2 flex">
            <div className="font-semibold pr-2">Own Goals:</div>
            <span>{aggregations.ownGoals}</span>
          </div>
          <div className="pb-2 flex">
            <div className="font-semibold pr-2">Starting XI:</div>
            <span>{aggregations.startingXI}</span>
          </div>
          <div className="pb-2 flex">
            <div className="font-semibold pr-2">Subbed In:</div>
            <span>{aggregations.subbedIn}</span>
          </div>
          <div className="pb-2 flex">
            <div className="font-semibold pr-2">Subbed Out:</div>
            <span>{aggregations.subbedOut}</span>
          </div>
          <div className="pb-2 flex">
            <div className="font-semibold pr-2">Yellow Cards:</div>
            <span>{aggregations.yellowCards}</span>
          </div>
          <div className="pb-2 flex">
            <div className="font-semibold pr-2">Yellow Red Cards:</div>
            <span>{aggregations.yellowRedCards}</span>
          </div>
        </div>
      </div>
    </CLoading>
  );
};

export default React.memo(PlayerAggregations);

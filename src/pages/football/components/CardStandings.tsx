import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Standing, Table } from "../../../@types/competition_standings";
import { Props } from "../../../@types/define";
import Utils from "../../../common/utils";

interface CardStanding extends Props {
  standings: Standing[];
  type?: string;
}

const CardStanding: React.FC<CardStanding> = ({
  standings,
  type = "league",
}) => {
  return (
    <div className="">
      {standings
        .filter((e: Standing) => e.type === "TOTAL")
        .map((standing: Standing, index: number) => {
          return (
            <div key={index} className="mb-7">
              <div className="text-textDark mb-2 capitalize">
                {type.toLocaleLowerCase() === "cup"
                  ? Utils.removeSpecialKey(standing.group, "_")
                  : "Club"}
              </div>
              {standing.table.map((table: Table, i: number) => {
                return (
                  <div
                    key={i}
                    className="bg-[#F2F0F9] dark:bg-[#312e41] rounded-lg p-4 mb-2 flex gap-2"
                  >
                    <div>{i + 1}</div>
                    <div className="flex">
                      <LazyLoadImage
                        effect="blur"
                        className="h-5 w-5"
                        src={table.team.crest}
                        alt=""
                      />{" "}
                      <span>{table.team.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default CardStanding;

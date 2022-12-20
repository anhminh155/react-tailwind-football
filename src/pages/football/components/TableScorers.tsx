import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Scorer } from "../../../@types/competition_scorers";
import { Standing, Table } from "../../../@types/competition_standings";
import { Props } from "../../../@types/define";
import { EnumTypes } from "../../../@types/lookup_tables";
import { DataFake } from "../../../common/dataFake";
import Utils from "../../../common/utils";
import CLoading from "../../../components/CLoading";

interface ITableScorers extends Props {
  scorers: Scorer[] | any;
  loading?: boolean;
}

const TableScorers: React.FC<ITableScorers> = ({
  scorers,
  loading = false,
}) => {
  return (
    <div className="">
      <div className="flex flex-col select-none">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 pb-3">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <CLoading loading={loading}>
              <div className={`overflow-hidden sm:rounded-lg `}>
                <table className="min-w-full text-sm text-gray-700 dark:text-white">
                  <thead className="dark:bg-gray-800 bg-gray-600 text-xs uppercase font-medium">
                    <tr className="text-white" >
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Rank
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Age
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Team
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Goals
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Assists
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Penalties
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        position
                      </th>
                    </tr>
                  </thead>
                  <tbody className="dark:bg-gray-800 bg-white ">
                    {scorers.map((scorer: Scorer, i: number) => {
                      return (
                        <tr
                          key={i}
                          onClick={() => {
                            console.log(scorer);
                          }}
                          className="dark:bg-dark hover:dark:bg-gray-700 hover:bg-gray-600 hover:text-white cursor-pointer"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            {i + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-medium">
                              {scorer.player.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {Utils.getAge(scorer.player.dateOfBirth)}
                          </td>
                          <td className="flex px-6 py-4 whitespace-nowrap items-center">
                            <LazyLoadImage
                              effect="blur"
                              className="w-5"
                              src={scorer.team.crest}
                              alt=""
                            />
                            <span className="ml-2 font-medium">
                              {scorer.team.shortName}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            {scorer.goals ?? "0"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {scorer.assists ?? "0"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {scorer.penalties ?? "0"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {scorer.player.position}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CLoading>
          </div>
        </div>
      </div>
      {/* Component End  */}
    </div>
  );
};

export default React.memo(TableScorers);

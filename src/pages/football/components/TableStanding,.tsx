import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Standing, Table } from "../../../@types/competition_standings";
import { Props } from "../../../@types/define";

interface ITableStanding extends Props {
  standing: Standing;
}

const TableStanding: React.FC<ITableStanding> = ({ standing }) => {
  console.log(standing);

  return (
    <div className="pb-10">
      {/* Component Start */}
      {/* <h1 className="text-lg text-gray-400 font-medium">2020-21 Season</h1> */}
      <div className="flex flex-col mt-6">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full text-sm text-gray-400">
                <thead className="bg-gray-800 text-xs uppercase font-medium">
                  <tr>
                    <th />
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      Club
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      MP
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      W
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      D
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      L
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      GF
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      GA
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      GD
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      Pts
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      Last 5
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800">
                  {standing.table.map((table: Table, i: number) => {
                    return (
                      <tr key={i} className="bg-black bg-opacity-20">
                        <td className="pl-4">{table.position}</td>
                        <td className="flex px-6 py-4 whitespace-nowrap">
                          <LazyLoadImage
                            effect="blur"
                            className="w-5"
                            src={table.team.crest}
                            alt=""
                          />
                          <span className="ml-2 font-medium">
                            {table.team.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {table.playedGames}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {table.won}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {table.draw}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {table.lost}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {table.goalsFor}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {table.goalsAgainst}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {table.goalDifference}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {table.points}
                        </td>
                        <td className="flex px-6 py-4 whitespace-nowrap">
                          {table.form
                            .split(",")
                            .map((e: string, index: number) => {
                              if (e === "W") {
                                return (
                                  <svg
                                    className="w-4 fill-current text-green-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                );
                              } else if (e === "D") {
                                return (
                                  <svg
                                    className="w-4 fill-current text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                );
                              } else if (e === "L") {
                                return (
                                  <svg
                                    className="w-4 fill-current text-red-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                );
                              }
                            })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Component End  */}
    </div>
  );
};

export default TableStanding;

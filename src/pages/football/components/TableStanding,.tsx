import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { Standing, Table } from "../../../@types/competition_standings";
import { Props } from "../../../@types/define";
import { EnumTypes } from "../../../@types/lookup_tables";
import { DataFake } from "../../../common/dataFake";
import Utils from "../../../common/utils";
import CLoading from "../../../components/CLoading";

interface ITableStanding extends Props {
  standings: Standing[];
  type?: string;
  loading?: boolean;
}

enum StandingType {
  TOTAL = "TOTAL",
  HOME = "HOME",
  AWAY = "AWAY",
}

const TableStanding: React.FC<ITableStanding> = ({
  standings,
  type = EnumTypes.CompetitionType.LEAGUE,
  loading = false,
}) => {
  const [dataWithType, setDataWithType] = useState<Standing[]>(
    standings.filter((e: Standing) => e.type === StandingType.TOTAL)!
  );
  const [select, setSelect] = useState<"TOTAL" | "HOME" | "AWAY">("TOTAL");
  const navigate = useNavigate();

  useEffect(() => {
    if (type === EnumTypes.CompetitionType.CUP) {
      setSelect("TOTAL");
      setDataWithType(standings.filter((e: Standing) => e.type === "TOTAL")!);
    } else {
      setDataWithType(standings.filter((e: Standing) => e.type === select)!);
    }
  }, [standings]);

  return (
    <div className="text-sm">
      {type === EnumTypes.CompetitionType.LEAGUE ? (
        <ul className="border-b min-h-max grid grid-flow-col text-center text-white bg-gray-600 dark:bg-gray-800 rounded-t-lg p-1 dark:border-b dark:border-gray-500">
          <li
            className="cursor-pointer hover:shadow-md"
            onClick={() => {
              setSelect("TOTAL");
              setDataWithType(
                standings.filter(
                  (e: Standing) => e.type === StandingType.TOTAL
                )!
              );
            }}
          >
            <span
              className={`${
                select === "TOTAL"
                  ? "bg-white dark:bg-dark rounded-t-lg shadow text-violet dark:text-yellow"
                  : ""
              } flex justify-center py-2`}
            >
              TOTAL
            </span>
          </li>
          <li
            className="cursor-pointer hover:shadow-md"
            onClick={() => {
              setSelect("HOME");
              setDataWithType(
                standings.filter((e: Standing) => e.type === StandingType.HOME)!
              );
            }}
          >
            <span
              className={`${
                select === "HOME"
                  ? "bg-white dark:bg-dark rounded-t-lg shadow text-violet dark:text-yellow"
                  : ""
              } flex justify-center py-2`}
            >
              HOME
            </span>
          </li>
          <li
            className="cursor-pointer hover:shadow-md"
            onClick={() => {
              setSelect("AWAY");

              setDataWithType(
                standings.filter((e: Standing) => e.type === StandingType.AWAY)!
              );
            }}
          >
            <span
              className={`${
                select === "AWAY"
                  ? "bg-white dark:bg-dark rounded-t-lg shadow text-violet dark:text-yellow"
                  : ""
              } flex justify-center py-2`}
            >
              AWAY
            </span>
          </li>
        </ul>
      ) : (
        <></>
      )}

      <div className="flex flex-col select-none">
        {dataWithType.map((standing: Standing, key: number) => {
          return (
            <div
              key={key}
              className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 pb-3"
            >
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <CLoading loading={loading}>
                  <div
                    className={`overflow-hidden ${
                      type === EnumTypes.CompetitionType.CUP
                        ? "sm:rounded-lg"
                        : "sm:rounded-b-lg"
                    }`}
                  >
                    <table className="min-w-full text-sm text-gray-700 dark:text-white">
                      <thead className="dark:bg-gray-800 bg-gray-600 text-xs uppercase font-medium">
                        <tr className="text-white">
                          <th />
                          <th
                            scope="col"
                            className={`${
                              type === EnumTypes.CompetitionType.CUP
                                ? "w-56"
                                : ""
                            } px-6 py-3 text-left tracking-wider`}
                          >
                            {type === EnumTypes.CompetitionType.CUP ? (
                              <span className="capitalize">
                                {standing.group
                                  ? Utils.removeSpecialKey(standing.group, "_")
                                  : ""}
                              </span>
                            ) : (
                              "Club"
                            )}
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center tracking-wider"
                          >
                            MP
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center tracking-wider"
                          >
                            W
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center tracking-wider"
                          >
                            D
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center tracking-wider"
                          >
                            L
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center tracking-wider"
                          >
                            GF
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center tracking-wider"
                          >
                            GA
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center tracking-wider"
                          >
                            GD
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center tracking-wider"
                          >
                            Pts
                          </th>
                          {standing.table[0].form && (
                            <th
                              scope="col"
                              className="px-6 py-3 text-center tracking-wider"
                            >
                              Last 5
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="dark:bg-gray-800 bg-white ">
                        {standing.table.map((table: Table, i: number) => {
                          // {dataWithType?.table.map((table: Table, i: number) => {
                          return (
                            <tr
                              key={i}
                              onClick={() => {
                                console.log(table);
                                navigate(`team/${table.team.id}`);
                              }}
                              className="dark:bg-dark hover:dark:bg-gray-700 hover:bg-gray-400 hover:text-white cursor-pointer"
                            >
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
                              <td className="px-6 py-4 text-center whitespace-nowrap">
                                {table.playedGames}
                              </td>
                              <td className="px-6 py-4 text-center whitespace-nowrap">
                                {table.won}
                              </td>
                              <td className="px-6 py-4 text-center whitespace-nowrap">
                                {table.draw}
                              </td>
                              <td className="px-6 py-4 text-center whitespace-nowrap">
                                {table.lost}
                              </td>
                              <td className="px-6 py-4 text-center whitespace-nowrap">
                                {table.goalsFor}
                              </td>
                              <td className="px-6 py-4 text-center whitespace-nowrap">
                                {table.goalsAgainst}
                              </td>
                              <td className="px-6 py-4 text-center whitespace-nowrap">
                                {table.goalDifference}
                              </td>
                              <td className="px-6 py-4 text-center whitespace-nowrap">
                                {table.points}
                              </td>
                              {table.form && (
                                <td className="flex px-6 py-4 whitespace-nowrap">
                                  {table?.form
                                    .split(",")
                                    .map((e: string, index: number) => {
                                      if (e === "W") {
                                        return (
                                          <svg
                                            key={index}
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
                                            key={index}
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
                                            key={index}
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
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CLoading>
              </div>
            </div>
          );
        })}
      </div>
      {/* Component End  */}
    </div>
  );
};

export default React.memo(TableStanding);

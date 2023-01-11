import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Props } from "types/define";
import { useSelectorRoot } from "redux/hooks";
import { RootState } from "redux/rootReducer";
import { format } from "date-fns";
import { Match } from "types/head2Head";

interface ICHead2Head extends Props {
  getPath(path: string): void;
}

const CHead2Head: React.FC<ICHead2Head> = ({ getPath }) => {
  const { rootHead2Head } = useSelectorRoot(
    (state: RootState) => state.football
  );
  return (
    <div>
      <div>
        <div className="bg-gray-200 dark:bg-gray-700 text-center py-2">
          <span className="uppercase ">aggregates</span>
        </div>
        <div className="py-3">
          <span className="pr-2">Number Of Matches:</span>
          <span className="">{rootHead2Head.aggregates.numberOfMatches}</span>
        </div>
        <div className="py-3">
          <span className="pr-2">Total Goals:</span>
          <span className="">{rootHead2Head.aggregates.totalGoals}</span>
        </div>
        <div className="flex py-4 gap-2">
          <span className="w-32">
            {`
            ${(
              (rootHead2Head.aggregates.homeTeam.wins /
                rootHead2Head.aggregates.numberOfMatches) *
              100
            ).toFixed(0)}%(${rootHead2Head.aggregates.homeTeam.wins} wins)`}
          </span>
          <div className="w-full bg-gray-200 dark:bg-gray-200/70 h-4 dark:bg-gray-200 flex">
            <div
              className="bg-green-600 h-4"
              style={{
                width: `${(
                  (rootHead2Head.aggregates.homeTeam.wins /
                    rootHead2Head.aggregates.numberOfMatches) *
                  100
                ).toFixed(0)}%`,
              }}
            />
            {rootHead2Head.aggregates.homeTeam.draws > 0 ? (
              <div
                className="bg-gray-400 dark:bg-gray-400 h-4 text-center text-white"
                style={{
                  width: `${(
                    (rootHead2Head.aggregates.homeTeam.draws /
                      rootHead2Head.aggregates.numberOfMatches) *
                    100
                  ).toFixed(0)}%`,
                }}
              >
                {`${(
                  (rootHead2Head.aggregates.homeTeam.draws /
                    rootHead2Head.aggregates.numberOfMatches) *
                  100
                ).toFixed(0)}%(${rootHead2Head.aggregates.homeTeam.draws})`}
              </div>
            ) : (
              <></>
            )}
            <div
              className="bg-red-500 h-4"
              style={{
                width: `${(
                  (rootHead2Head.aggregates.awayTeam.wins /
                    rootHead2Head.aggregates.numberOfMatches) *
                  100
                ).toFixed(0)}%`,
              }}
            />
          </div>
          <span className="w-32 text-right">
            {`
            ${(
              (rootHead2Head.aggregates.awayTeam.wins /
                rootHead2Head.aggregates.numberOfMatches) *
              100
            ).toFixed(0)}%(${rootHead2Head.aggregates.awayTeam.wins} wins)`}
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700 dark:text-white">
          <thead className="dark:bg-gray-800 bg-gray-600 text-xs uppercase font-medium">
            <tr className="text-white">
              <th
                scope="col"
                className="px-6 py-3 text-left tracking-wider w-8"
              >
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-right tracking-wider">
                Home
              </th>
              <th
                scope="col"
                className="px-1 py-3 tracking-wider w-20 text-center"
              >
                Score
              </th>
              <th scope="col" className="px-6 py-3 text-left tracking-wider">
                Away
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left tracking-wider"
              ></th>
            </tr>
          </thead>
          <tbody className="dark:bg-gray-800 bg-white ">
            {rootHead2Head.matches ? (
              rootHead2Head.matches.map((match: Match, i: number) => {
                return (
                  <tr
                    key={i}
                    className="dark:bg-dark hover:dark:bg-gray-700 hover:bg-gray-400 hover:text-white"
                  >
                    <td className="px-6 py-4 min-w-fit">
                      {format(new Date(match.utcDate), "dd/MM/yyyy HH:mm")}
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end whitespace-nowrap">
                      <div>{match.homeTeam.shortName}</div>
                      <LazyLoadImage
                        effect="blur"
                        className="w-5 ml-2"
                        src={match.homeTeam.crest}
                        alt=""
                      />
                    </td>
                    <td className="px-1 py-4 text-center">
                      {match.score.winner === null
                        ? "vs"
                        : `${match.score.fullTime.home} - ${match.score.fullTime.away}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex">
                        <LazyLoadImage
                          effect="blur"
                          className="w-5 mr-2"
                          src={match.awayTeam.crest}
                          alt=""
                        />
                        <div>{match.awayTeam.shortName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 flex justify-end">
                      <div
                        onClick={() => {
                          getPath(
                            `/dashboard/${match.competition.type.toLowerCase()}-${
                              match.competition.code
                            }-${new Date(
                              match.season.startDate
                            ).getFullYear()}/${match.id}`
                          );
                        }}
                        className="cursor-pointer inline-flex rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Info
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <div>not found</div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(CHead2Head);

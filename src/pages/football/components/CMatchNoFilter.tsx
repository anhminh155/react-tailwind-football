import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { Props } from "types/define";
import { Match } from "types/teams_matches";
import CLoading from "components/CLoading";
import Utils from "common/utils";

interface ICMatchTeam extends Props {
  dataMatch?: Match[];
  loading?: boolean;
  showLeague?: boolean;
}

const CMatchNoFilter: React.FC<ICMatchTeam> = ({
  dataMatch,
  loading = false,
  showLeague = true,
}) => {
  const navigate = useNavigate();

  return (
    <CLoading loading={loading}>
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
              {showLeague ? <th scope="col" className="px-6 py-3 text-center tracking-wider">
                League
              </th> : null}
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
            {dataMatch ? (
              dataMatch.map((match: Match, i: number) => {
                return (
                  <tr
                    key={i}
                    className="dark:bg-dark hover:dark:bg-gray-700 hover:bg-gray-400 hover:text-white"
                  >
                    <td className="px-6 py-2 min-w-fit">
                      {Utils.formatWithTimeZone(new Date(match.utcDate), "dd/MM/yyyy HH:mm")}
                    </td>
                    {showLeague ? <td
                      onClick={() => {
                        navigate(
                          `/dashboard/${match.competition.type.toLowerCase()}-${
                            match.competition.code
                          }-${new Date(match.season.startDate).getFullYear()}`
                        );
                      }}
                      className="px-6 py-2 text-center whitespace-nowrap hover:bg-gray-200 hover:text-violet hover:cursor-pointer hover:dark:text-yellow hover:dark:bg-gray-400"
                    >
                      {match.competition.name}
                    </td> : null}
                    <td
                      className="px-6 py-2 text-right whitespace-nowrap hover:bg-gray-200 hover:text-violet hover:cursor-pointer hover:dark:text-yellow hover:dark:bg-gray-400"
                      onClick={() => {
                        navigate(
                          `/dashboard/${match.competition.type.toLowerCase()}-${
                            match.competition.code
                          }-${new Date(
                            match.season.startDate
                          ).getFullYear()}/team/${match.homeTeam.id}`
                        );
                      }}
                    >
                      <div className="flex items-center justify-end">
                        <div>{match.homeTeam.shortName}</div>
                        <LazyLoadImage
                          effect="blur"
                          className="w-5 ml-2"
                          src={match.homeTeam.crest}
                          alt=""
                        />
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center">
                      {match.score.winner === null
                        ? "vs"
                        : `${match.score.fullTime.home} - ${match.score.fullTime.away}`}
                    </td>
                    <td
                      onClick={() => {
                        navigate(
                          `/dashboard/${match.competition.type.toLowerCase()}-${
                            match.competition.code
                          }-${new Date(
                            match.season.startDate
                          ).getFullYear()}/team/${match.awayTeam.id}`
                        );
                      }}
                      className="px-6 py-2 whitespace-nowrap hover:bg-gray-200 hover:text-violet hover:cursor-pointer hover:dark:text-yellow hover:dark:bg-gray-400"
                    >
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
                    <td className="px-6 py-2 flex justify-end">
                      <div
                        onClick={() => {
                          navigate(
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
    </CLoading>
  );
};

export default React.memo(CMatchNoFilter);

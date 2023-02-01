import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Competition } from "types/competition";
import { Props } from "types/define";
import { useSelectorRoot } from "../redux/hooks";
import { RootState } from "../redux/rootReducer";
import { IPathNameChild } from "../routes";

const CBreadcrumb: React.FC<Props> = () => {
  const { rootCompetitions, rootCompetitionsMatches } = useSelectorRoot(
    (state: RootState) => state.football
  );
  const { rootPlayer } = useSelectorRoot(
    (state: RootState) => state.footballPlayer
  );
  const { rootTeam } = useSelectorRoot(
    (state: RootState) => state.footballTeam
  );
  const { competitionCode, idMatch, idTeam, IdPlayer } =
    useParams<IPathNameChild>();
  const location = useLocation();
  const [paramUrl, setParamUrl] = useState<{ name: string; path?: string }[]>([
    { name: "Dashboard", path: "" },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const foo: { name: string; path?: string }[] = [{ name: "Dashboard" }];
    const competition = rootCompetitions.competitions.find(
      (competition: Competition) =>
        competition.code === competitionCode?.split("-")[1]
    );

    if (competition) {
      foo.push({
        name: competition.name,
        path: `/dashboard/${location.pathname.split("/")[2]}`,
      });
    }
    if (idMatch) {
      const match = rootCompetitionsMatches.matches[0];
      foo.push({
        name: `${match?.homeTeam.name} vs ${match?.awayTeam.name}`,
      });
    }
    if (idTeam) {
      if (IdPlayer) {
        foo.push({
          name: `${rootPlayer.currentTeam.name}`,
          path: `/dashboard/${location.pathname.split("/")[2]}/team/${
            location.pathname.split("/")[4]
          }`,
        });
      } else {
        foo.push({
          name: `${rootTeam?.name}`,
          path: `/dashboard/${location.pathname.split("/")[2]}/team/${
            location.pathname.split("/")[4]
          }`,
        });
      }
    }
    if (IdPlayer) {
      foo.push({ name: `${rootPlayer.name}` });
    }
    setParamUrl(foo);
    // console.log(rootPlayer.name);
    
    //eslint-disable-next-line
  }, [rootCompetitions, location, rootCompetitionsMatches, rootPlayer]);

  return (
    <div className="mb-4">
      <nav className="flex mb-2" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3 flex-wrap">
          {paramUrl.map((param: any, i: number) => {
            if (i === 0) {
              return (
                <li
                  key={i}
                  className={`inline-flex items-center ${
                    paramUrl.length > i + 1
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                  onClick={() => navigate("/dashboard")}
                >
                  <span className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    {param.name}
                  </span>
                </li>
              );
            } else {
              return (
                <li
                  key={i}
                  className={`inline-flex items-center ${
                    paramUrl.length > i + 1
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (param.path) {
                      navigate(param.path);
                    }
                  }}
                >
                  <div className="flex items-center">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                      {param.name}
                    </span>
                  </div>
                </li>
              );
            }
          })}
        </ol>
      </nav>
    </div>
  );
};

export default React.memo(CBreadcrumb);

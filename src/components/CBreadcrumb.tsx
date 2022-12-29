import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Competition } from "types/competition";
import { Props } from "types/define";
import { useDispatchRoot, useSelectorRoot } from "../redux/hooks";
import { RootState } from "../redux/rootReducer";
import { IPathNameChild } from "../routes";

const CBreadcrumb: React.FC<Props> = () => {
  const dispatch = useDispatchRoot();
  const { rootCompetitions } = useSelectorRoot(
    (state: RootState) => state.football
  );
  const { competitionCode, idMatch } = useParams<IPathNameChild>();
  const location = useLocation();
  const [paramUrl, setParamUrl] = useState<string[]>(["Dashboard"]);
  const navigate = useNavigate();
// console.log(idMatch);
// console.log(rootCompetitions);


  useEffect(() => {
    const foo: string[] = ["Dashboard"];
    const competition = rootCompetitions.competitions.find(
      (competition: Competition) =>
        competition.code === competitionCode?.split("-")[1]
    );
    // console.log(rootCompetitions.competitions.find(
    //   (competition: Competition) =>
    //   idTeam === competition
    // ));
    // console.log(competition);
    
    if (competition) {
      foo.push(competition.name);
    }else if(idMatch){
      console.log(idMatch);
      
    }
    // console.log(foo);

    setParamUrl(foo);
  }, [rootCompetitions, idMatch]);

  return (
    <div>
      <nav className="flex mb-2" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          {paramUrl.map((name: string, i: number) => {
            if (i === 0) {
              return (
                <li
                  key={i}
                  className={`inline-flex items-center ${
                    paramUrl.length > i + 1
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                  onClick={()=> navigate('/dashboard')}
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
                    {name}
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
                      {name}
                    </span>
                  </div>
                </li>
              );
            }
          })}
          {/* <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Dashboard
            </a>
          </li>
          <li>
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
              <a
                href="#"
                className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                Projects
              </a>
            </div>
          </li>
          <li aria-current="page">
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
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                Flowbite
              </span>
            </div>
          </li> */}
        </ol>
      </nav>
    </div>
  );
};

export default React.memo(CBreadcrumb);

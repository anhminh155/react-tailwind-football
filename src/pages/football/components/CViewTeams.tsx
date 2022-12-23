import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams } from "react-router-dom";
import { Team } from "../../../@types/competition_teams";
import { Props } from "../../../@types/define";
import CLoading from "../../../components/CLoading";
import CModal from "../../../components/modals/CModal";
import { useDispatchRoot, useSelectorRoot } from "../../../redux/hooks";
import { RootState } from "../../../redux/rootReducer";
import { IPathNameChild } from "../../../routes";

const CViewTeams: React.FC<Props> = () => {
  const dispatch = useDispatchRoot();
  const { loadingFootball, rootCompetitionsTeams } = useSelectorRoot(
    (state: RootState) => state.football
  );
  const { competitionCode, idTeam } = useParams<IPathNameChild>();
  let [isOpen, setIsOpen] = useState<boolean>(false);
  let [dataTeam, setDataTeam] = useState<Team>();

  useEffect(() => {
    // dispatch(fetchTeamMatches(Number(idTeam)));
  }, []);
  // console.log(dataTeam);

  return (
    <CLoading loading={loadingFootball}>
      <div className=" flex items-center justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 p-5">
          {rootCompetitionsTeams.teams.map((team: Team, i: number) => (
            <div
              key={i}
              onClick={() => {
                setDataTeam(team);
                setIsOpen(true);
              }}
              className="dark:bg-gray-600 bg-white shadow-lg text-lg font-bold text-center p-10 rounded-lg hover:scale-105 cursor-pointer"
            >
              <LazyLoadImage
                effect="blur"
                src={team.crest}
                className="object-contain h-20 mx-auto"
                alt=""
              />
            </div>
          ))}
          <CModal show={isOpen} closeModal={(e: boolean) => setIsOpen(e)}>
            <div className="">
              <div className=" bg-white rounded-lg overflow-hidden">
                <div className="flex justify-center p-2">
                  <LazyLoadImage
                    effect="blur"
                    className="w-full h-56 object-cover object-center"
                    src={dataTeam?.crest}
                    alt=""
                  />
                </div>
                <div className="flex items-center px-6 py-3 bg-gray-700 justify-center">
                  <h1 className="mx-3 text-white font-semibold text-lg">
                    {dataTeam?.name}
                  </h1>
                </div>
                <div className="p-4 px-6">
                  <div className="pb-2 flex">
                    <div className="font-semibold pr-2">Short Name:</div>
                    <span>{dataTeam?.shortName}</span>
                  </div>
                  <div className="pb-2 flex">
                    <div className="font-semibold pr-2">Venue:</div>
                    <span>{dataTeam?.venue}</span>
                  </div>
                  <div className="pb-2 flex">
                    <div className="font-semibold pr-2 ">Founded:</div>
                    <span>{dataTeam?.founded}</span>
                  </div>
                  <div className="pb-2 flex">
                    <div className="font-semibold pr-2 ">Club Colors:</div>
                    <span>{dataTeam?.clubColors}</span>
                  </div>
                  <div className="pb-2 flex">
                    <div className="font-semibold pr-2 ">Coach:</div>
                    <span>{dataTeam?.coach.name}</span>
                  </div>
                  <div className="flex items-center mt-2 text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>

                    <h1
                      className="px-2 text-sm cursor-alias underline text-blue-600"
                      onClick={() => {
                        const url: any = encodeURIComponent(dataTeam?.address!);
                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${url}`,
                          "_system"
                        );
                      }}
                    >
                      {dataTeam?.address}
                    </h1>
                  </div>
                  <div className="flex items-center mt-4 text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                      />
                    </svg>

                    <h1
                      className="px-2 text-sm cursor-alias underline text-blue-600"
                      onClick={() => {
                        window.open(`${dataTeam?.website}`, "_system");
                      }}
                    >
                      {dataTeam?.website}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 pb-4">
              <button
                onClick={() => {
                  //Handle
                }}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                // onClick={closeModal}
              >
                View more...
              </button>
            </div>
          </CModal>
        </div>
      </div>
    </CLoading>
  );
};

export default React.memo(CViewTeams);

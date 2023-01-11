import { Popover, Transition } from "@headlessui/react";
import { getYear } from "date-fns";
import { Fragment } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Competition } from "types/competition";
import { EnumTypes } from "types/lookup_tables";
import { useSelectorRoot } from "redux/hooks";
import { RootState } from "redux/rootReducer";
import { IPathNameChild } from "routes";

export default function CPopoverCompetition() {
  const { rootCompetitions } = useSelectorRoot(
    (state: RootState) => state.football
  );
  const { competitionCode } = useParams<IPathNameChild>();
  const currentCompetition: Competition = rootCompetitions.competitions.find(
    (competition: Competition) =>
      competition.code === competitionCode?.split("-")[1]!
  )!;
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-sm select-none">
      <Popover className="relative">
        {(change) => (
          <>
            <Popover.Button>
              <div className="p-2 flex items-center">
                <LazyLoadImage
                  effect="blur"
                  className="h-10 mr-1 bg-transparent"
                  src={currentCompetition.area.flag!}
                  alt=""
                />
                <LazyLoadImage
                  effect="blur"
                  className="h-10 mr-2 bg-transparent"
                  src={currentCompetition.emblem!}
                  alt=""
                />
                <div className="flex flex-col items-start">
                  <div className="text-lg text-violet dark:text-yellow font-semibold text-left w-40">
                    {currentCompetition.name}
                  </div>
                  {competitionCode?.split("-")[2] ? (
                    <div className="text-xs opacity-70">{`Season: ${
                      competitionCode?.split("-")[2]
                    }`}</div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-50 mt-3 w-screen max-w-sm -translate-x-16 -translate-y-10 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white dark:bg-dark dark:text-white p-7 lg:grid-cols-1 overflow-auto h-[300px]">
                    {rootCompetitions.competitions.map(
                      (item: Competition, i: number) => (
                        <Link
                          onClick={() => change.close()}
                          to={
                            item.type === EnumTypes.CompetitionType.CUP
                              ? `/dashboard/cup-${item.code}-${Number(
                                  competitionCode?.split("-")[2]!
                                )}`
                              : `/dashboard/league-${item.code}-${Number(
                                  competitionCode?.split("-")[2]!
                                )}`
                          }
                          key={i}
                          className="cursor-pointer -m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-200 hover:dark:bg-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12 dark:bg-white px-1 rounded-md">
                            <LazyLoadImage
                              effect="blur"
                              className="h-10"
                              src={item.emblem}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="">{/* {item.} */}</p>
                          </div>
                        </Link>
                      )
                    )}
                  </div>
                  <div className="bg-gray-50 p-4 grid grid-cols-2 gap-1 dark:bg-gray-800">
                    <div className="text-center col-span-2 text-lg dark:text-yellow pb-2">
                      Change season
                    </div>
                    <button
                      disabled={competitionCode?.split("-")[0]! === "cup"}
                      onClick={() => {
                        navigate(
                          `/dashboard/league-${competitionCode?.split(
                            "-"
                          )[1]!}-${Number(competitionCode?.split("-")[2]!) - 1}`
                        );
                        change.close();
                      }}
                      // disabled={prevMonthButtonDisabled}
                      aria-label="calendar backward"
                      className={`${
                        competitionCode?.split("-")[0]! === "cup"
                          ? "cursor-not-allowed"
                          : ""
                      } bg-gray-200 dark:bg-gray-700 flex justify-center items-center py-2 col-span-1 text-gray-800 dark:text-gray-100 hover:bg-gray-800 hover:dark:bg-gray-900 hover:text-white rounded-md p-1 min-w-fit`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-left"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <polyline points="15 6 9 12 15 18" />
                      </svg>
                    </button>
                    <button
                      disabled={
                        Number(competitionCode?.split("-")[2]!) >=
                          getYear(new Date()) ||
                        competitionCode?.split("-")[2]! === "cup"
                      }
                      onClick={() => {
                        navigate(
                          `/dashboard/league-${competitionCode?.split(
                            "-"
                          )[1]!}-${Number(competitionCode?.split("-")[2]!) + 1}`
                        );

                        change.close();
                      }}
                      aria-label="calendar forward"
                      className={`${
                        Number(competitionCode?.split("-")[2]!) >=
                          getYear(new Date()) ||
                        competitionCode?.split("-")[0]! === "cup"
                          ? "cursor-not-allowed"
                          : ""
                      } bg-gray-200 dark:bg-gray-700 flex justify-center items-center py-2 col-span-1 text-gray-800 dark:text-gray-100 hover:bg-gray-800 hover:dark:bg-gray-900 hover:text-white rounded-md p-1`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler  icon-tabler-chevron-right"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <polyline points="9 6 15 12 9 18" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

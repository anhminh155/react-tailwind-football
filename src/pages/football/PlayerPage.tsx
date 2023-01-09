import React, { Fragment, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Props } from "types/define";
import { useDispatchRoot, useSelectorRoot } from "redux/hooks";
import { RootState } from "redux/rootReducer";
import { IPathNameChild } from "routes";
import CBreadcrumb from "components/CBreadcrumb";
import { IFiltersAPI } from "types/lookup_tables";
import CMatchNoFilter from "./components/CMatchNoFilter";
import {
  fetchPlayer,
  fetchPlayerMatches,
} from "redux/controller/football.player.slice";
import PlayerAggregations from "./components/PlayerAggregations";
import Utils from "common/utils";
import { format } from "date-fns";
import CLoading from "components/CLoading";
import {
  CheckIcon,
  ChevronUpDownIcon,
  PaperClipIcon,
} from "@heroicons/react/20/solid";
import { Listbox, Transition, Combobox } from "@headlessui/react";
import { Competition } from "types/competition";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const PlayerPage: React.FC<Props> = () => {
  const dispatch = useDispatchRoot();
  const {
    loadingPlayer,
    loadingPlayerMatches,
    rootPlayer,
    rootPlayerMatches,
    competitionPlayer,
  } = useSelectorRoot((state: RootState) => state.footballPlayer);
  const { rootCompetitions } = useSelectorRoot(
    (state: RootState) => state.football
  );
  const { competitionCode, IdPlayer } = useParams<IPathNameChild>();
  const navigate = useNavigate();
  const location = useLocation();
  const [runningCompetition, setRunningCompetition] = useState([
    { name: "ALL" },
  ]);
  const [selected, setSelected] = useState<any>(runningCompetition[0]);

  useEffect(() => {
    let newRunningCompetition: any = [{ name: "ALL" }];
    if (competitionPlayer) {
      competitionPlayer.split(",").forEach((code: string) => {
        const a = rootCompetitions.competitions.find(
          (competition: Competition) => competition.code === code
        );
        if (a) {
          newRunningCompetition.push({
            name: a?.name,
            code: a?.code,
            img: a.emblem,
          });
        }
      });
    }
    setRunningCompetition(newRunningCompetition);
  }, [competitionPlayer]);

  useEffect(() => {
    dispatch(fetchPlayer(Number(IdPlayer)));
  }, [IdPlayer]);

  useEffect(() => {
    let param: IFiltersAPI = {
      // ...paramApi,
      // ids: Number(idMatch),
      // season: competitionCode?.split("-")[2]!,
      // competitions: competitionCode?.split("-")[1]!,
    };
    if (selected.name === "ALL") {
      dispatch(fetchPlayerMatches({ ...param, id: Number(IdPlayer) }));
    } else {
      console.log({
        ...param,
        id: Number(IdPlayer),
        competitions: selected.code!,
      });

      dispatch(
        fetchPlayerMatches({
          ...param,
          id: Number(IdPlayer),
          competitions: selected.code!,
        })
      );
    }
  }, [IdPlayer, selected]);

  return (
    <CLoading loading={loadingPlayer}>
      <CBreadcrumb />
      <div className="">
        <div className="overflow-hidden bg-white dark:bg-dark shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-violet  dark:text-yellow  ">
              Player Information
            </h3>
            {/* <p className="mt-1 max-w-2xl text-sm ">
              Personal details and matches.
            </p> */}
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium ">Full name</dt>
                <dd className="mt-1 text-sm  sm:col-span-2 sm:mt-0">
                  {rootPlayer?.name}
                </dd>
              </div>
              <div className="bg-white dark:bg-gray-600 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium ">Birthday</dt>
                <dd className="mt-1 text-sm  sm:col-span-2 sm:mt-0">
                  {`${format(
                    new Date(rootPlayer?.dateOfBirth),
                    "dd/MM/yyyy"
                  )} (${Utils.getAge(rootPlayer?.dateOfBirth)} Years old)`}
                </dd>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium ">Shirt Number:</dt>
                <dd className="mt-1 text-sm  sm:col-span-2 sm:mt-0">
                  {rootPlayer?.shirtNumber}
                </dd>
              </div>
              <div className="bg-white dark:bg-gray-600 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium ">Position:</dt>
                <dd className="mt-1 text-sm  sm:col-span-2 sm:mt-0">
                  {rootPlayer?.position}
                </dd>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium ">Nationality:</dt>
                <dd className="mt-1 text-sm  sm:col-span-2 sm:mt-0">
                  {rootPlayer?.nationality}
                </dd>
              </div>
              <div className="bg-white dark:bg-gray-600 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium ">Current Team:</dt>
                <dd
                  onClick={() => {
                    navigate(
                      `${location.pathname.split("team/")[0]}team/${
                        rootPlayer.currentTeam.id
                      }`
                    );
                  }}
                  className="mt-1 text-sm  sm:col-span-2 sm:mt-0 flex hover:font-bold cursor-pointer"
                >
                  <LazyLoadImage
                    effect="blur"
                    src={rootPlayer.currentTeam.crest}
                    className="h-5 w-5 mr-2"
                    alt=""
                  />
                  <div className="">{rootPlayer.currentTeam?.name}</div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="my-5 bg-white text-sm rounded-md dark:bg-dark">
        <div className="bg-gray-200 dark:bg-gray-700 py-2 mb-1 p-2">
          {/* <div className="uppercase flex items-center justify-center ">
            <div className="font-semibold">FILTER</div>
          </div> */}
          <div className="">
            <div className="text-sm pb-1">Running Competition</div>
            <Listbox
              value={selected}
              onChange={(status: any) => {
                setSelected(status);
              }}
            >
              <div className={`relative `}>
                <Listbox.Button className="relative w-full xl:w-72 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate dark:text-black">
                    {selected.name}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {runningCompetition.map((person: any, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-violet/70 text-white dark:bg-dark/90"
                              : ""
                          }`
                        }
                        value={person}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {person.img && (
                                <LazyLoadImage
                                  effect="blur"
                                  src={person.img!}
                                  className="h-5 w-5 mr-2"
                                  alt=""
                                />
                              )}
                              {person.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <CheckIcon
                                  className="h-5 w-5 text-violet"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
        <PlayerAggregations
          resultSet={rootPlayerMatches.resultSet}
          aggregations={rootPlayerMatches.aggregations}
          loading={loadingPlayerMatches}
        />
        <div className="bg-gray-200 dark:bg-gray-700 py-2 mb-1">
          <div className="uppercase flex items-center justify-center ">
            <div className="font-semibold">RESULT</div>
          </div>
        </div>
        <CMatchNoFilter
          loading={loadingPlayerMatches}
          dataMatch={rootPlayerMatches.matches}
        />
      </div>
    </CLoading>
  );
};

export default React.memo(PlayerPage);

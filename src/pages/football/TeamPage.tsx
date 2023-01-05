import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams } from "react-router-dom";
import { Props } from "types/define";
import { useDispatchRoot, useSelectorRoot } from "redux/hooks";
import { RootState } from "redux/rootReducer";
import { IPathNameChild } from "routes";
import CBreadcrumb from "components/CBreadcrumb";
import { Tab } from "@headlessui/react";
import { IFiltersAPI } from "types/lookup_tables";
import {
  fetchTeam,
  fetchTeamMatches,
} from "redux/controller/football.team.slice";
import CSquad from "./components/CSquad";
import CRunningCompetition from "./components/CRunningCompetition";
import CMatchNoFilter from "./components/CMatchNoFilter";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const TeamPage: React.FC<Props> = () => {
  const dispatch = useDispatchRoot();
  const { rootTeam, loadingTeam, loadingTeamMatch, rootTeamsMatches } =
    useSelectorRoot((state: RootState) => state.footballTeam);
  const { competitionCode, idTeam } = useParams<IPathNameChild>();
  const [selectTab, setSelectTab] = useState<number>(0);
  const listTab: string[] = [
    "RESULTS",
    "FIXTURES",
    "RUNNING COMPETITIONS",
    "SQUAD",
  ];

  useEffect(() => {
    dispatch(fetchTeam(Number(idTeam)));
  }, [idTeam]);

  useEffect(() => {
    let param: IFiltersAPI = {
      // ...paramApi,
      // ids: Number(idMatch),
      season: competitionCode?.split("-")[2]!,
      competitions: competitionCode?.split("-")[1]!,
    };
    // dispatch(fetchInfoMatch(param));
    switch (selectTab) {
      case 0:
        //handle RESULTS
        dispatch(
          fetchTeamMatches({ ...param, id: Number(idTeam), status: "FINISHED" })
        );
        break;
      case 1:
        //handle FIXTURES
        dispatch(
          fetchTeamMatches({
            ...param,
            id: Number(idTeam),
            status: "SCHEDULED",
          })
        );
        break;

      case 2:
        //handle RUNNING COMPETITIONS
        dispatch(
          fetchTeamMatches({
            ...param,
            id: Number(idTeam),
          })
        );
        break;

      case 3:
        //handle SQUAD
        break;
      default:
        break;
    }
  }, [selectTab, idTeam]);

  return (
    <div>
      <CBreadcrumb />
      <div className="header shadow-lg rounded-md p-3 flex">
        <div className="col-span-1">
          <div className="w-full flex flex-col md:items-center md:px-3 lg:pr-11">
            <LazyLoadImage
              effect="blur"
              src={rootTeam?.crest}
              className="h-44 w-44"
              alt=""
            />
            <div className="py-2 font-bold text-center">{rootTeam?.name}</div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="pb-2 flex">
            <div className="font-semibold pr-2">Short Name:</div>
            <span>{rootTeam?.shortName}</span>
          </div>
          <div className="pb-2 flex">
            <div className="font-semibold pr-2">Venue:</div>
            <span>{rootTeam?.venue}</span>
          </div>
          <div className="pb-2 flex">
            <div className="font-semibold pr-2 ">Founded:</div>
            <span>{rootTeam?.founded}</span>
          </div>
          <div className="pb-2 flex">
            <div className="font-semibold pr-2 ">Club Colors:</div>
            <span>{rootTeam?.clubColors}</span>
          </div>
          <div className="pb-2 flex">
            <div className="font-semibold pr-2 ">Coach:</div>
            <span>{rootTeam?.coach.name}</span>
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
                const url: any = encodeURIComponent(rootTeam?.address!);
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${url}`,
                  "_system"
                );
              }}
            >
              {rootTeam?.address}
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
                window.open(`${rootTeam?.website}`, "_system");
              }}
            >
              {rootTeam?.website}
            </h1>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="my-5 bg-white text-sm rounded-md dark:bg-dark">
        <Tab.Group
          selectedIndex={selectTab}
          onChange={(index: number) => {
            setSelectTab(index);
          }}
        >
          <Tab.List className="flex space-x-1 rounded-t-xl  p-1">
            {listTab.map((title: string, index: number) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-violet dark:text-yellow",
                    selected
                      ? "bg-white dark:bg-gray-800 shadow"
                      : "text-black hover:bg-white/[0.12] hover:text-violet hover:bg-white hover:shadow hover:dark:bg-gray-800"
                  )
                }
              >
                {title}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="">
            <Tab.Panel className={classNames("rounded-b-xl p-3 pt-2 ")}>
              <CMatchNoFilter
                loading={loadingTeamMatch}
                dataMatch={rootTeamsMatches.matches}
              />
            </Tab.Panel>
            <Tab.Panel className={classNames("rounded-b-xl p-3 pt-5 ")}>
              <CMatchNoFilter
                loading={loadingTeamMatch}
                dataMatch={rootTeamsMatches.matches}
              />
            </Tab.Panel>
            <Tab.Panel className={classNames("rounded-b-xl p-3 pt-5 ")}>
              <CRunningCompetition
                dataTeam={rootTeam}
                dataResult={rootTeamsMatches.resultSet}
                loading={loadingTeam ?? loadingTeamMatch}
              />
            </Tab.Panel>
            <Tab.Panel className={classNames("rounded-b-xl p-3 pt-5 ")}>
              <CSquad dataTeam={rootTeam} loading={loadingTeam} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default React.memo(TeamPage);

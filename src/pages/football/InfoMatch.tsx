import CBreadcrumb from "components/CBreadcrumb";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCompetitionStandings,
  fetchInfoMatch,
  fetchInfoMatchHead2head,
} from "redux/controller/football.slice";
import { useDispatchRoot, useSelectorRoot } from "redux/hooks";
import { RootState } from "redux/rootReducer";
import { IPathNameChild } from "routes";
import { Props } from "types/define";
import { IFiltersAPI } from "types/lookup_tables";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { UsersIcon, MapPinIcon, EyeIcon } from "@heroicons/react/20/solid";
import { Tab } from "@headlessui/react";
import CSummary from "./components/CSummary";
import CLineUp from "./components/CLineUp";
import TableStanding from "./components/TableStanding,";
import CHead2Head from "./components/CHead2Head";
import Utils from "common/utils";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const InfoMatch: React.FC<Props> = () => {
  const dispatch = useDispatchRoot();
  const { rootCompetitionsStanding, loadingFootball, rootInfoMatch } =
    useSelectorRoot((state: RootState) => state.football);
  const [selectTab, setSelectTab] = useState<number>(0);
  const { competitionCode, idMatch } = useParams<IPathNameChild>();
  // const [check, setCheck] = useState<boolean>(false);
  const navigate = useNavigate();
  const listTab: string[] = [
    "SUMMARY",
    // "STATISTICS",
    "LINE UPS",
    // "ODDS",
    "STANDINGS",
    "H2H",
  ];

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
        //handle SUMMARY
        dispatch(fetchInfoMatch({ ...param, ids: Number(idMatch) }));
        break;
      // case 1:
      //   //handle STATISTICS
      //   break;
      case 1:
        //handle LINE UPS
        break;
      // case 3:
      //   //handle ODDS
      //   break;
      case 2:
        //handle STANDINGS
        if (competitionCode?.split("-")[0] === "cup") {
          dispatch(
            fetchCompetitionStandings({
              competitions: competitionCode?.split("-")[1]!,
            })
          );
        } else {
          dispatch(fetchCompetitionStandings(param));
        }
        break;

      case 3:
        //handle H2H
        dispatch(fetchInfoMatchHead2head({ ...param, ids: Number(idMatch) }));
        break;

      default:
        break;
    }
    //eslint-disable-next-line
  }, [selectTab]);

  return (
    <div>
      <CBreadcrumb />
      <div className="w-full rounded-lg bg-white dark:bg-dark shadow-inner font-normal text-sm">
        <div className="flex justify-center">
          <div className="flex justify-around bg-gray-300 w-2/3 rounded-b-lg text-gray-600">
            <div className="p-2">{`${rootInfoMatch.competition.name} (${rootInfoMatch.area.name})`}</div>
            <div className="p-2">
              {Utils.formatWithTimeZone(
                new Date(rootInfoMatch.utcDate!),
                "dd/MM HH:mm"
              )}
            </div>
          </div>
        </div>
        <div className="scorers flex items-center justify-center  font-bold text-gray-600  my-8">
          <div className="text-center w-44">
            <LazyLoadImage
              effect="blur"
              className="w-24 h-24"
              src={rootInfoMatch.homeTeam.crest}
              alt=""
            />
            <div className="">{rootInfoMatch.homeTeam.name}</div>
          </div>
          <div className="scorers px-20 text-6xl">
            <div className="whitespace-nowrap">
              <span>
                {rootInfoMatch.score.duration === "REGULAR"
                  ? rootInfoMatch.score.fullTime.home
                  : rootInfoMatch.score.regularTime?.home}
              </span>
              <span className="px-4">-</span>
              <span>
                {rootInfoMatch.score.duration === "REGULAR"
                  ? rootInfoMatch.score.fullTime.away
                  : rootInfoMatch.score.regularTime?.home}
              </span>
            </div>
            {/* <div className="text-sm font-normal text-center">
              {rootInfoMatch.score.duration}
            </div> */}
            {rootInfoMatch.score.duration === "REGULAR" ? (
              <div className="text-sm font-normal text-center capitalize">
                {Utils.removeSpecialKey(rootInfoMatch.score.duration, "_")}
              </div>
            ) : (
              <div className="font-normal">
                <div className="text-xs text-center">
                  <span className="pr-2">ExtraTime:</span>
                  <span>{`${rootInfoMatch.score.extraTime?.home} : ${rootInfoMatch.score.extraTime?.away}`}</span>
                </div>
                {rootInfoMatch.score.penalties ? (
                  <div className="text-xs text-center">
                    <span className="pr-2">Penalties:</span>
                    <span>{`${rootInfoMatch.score.penalties?.home} : ${rootInfoMatch.score.penalties?.away}`}</span>
                  </div>
                ) : (
                  ""
                )}
                <div className="text-sm font-normal text-center capitalize">
                  {Utils.removeSpecialKey(rootInfoMatch.score.duration, "_")}
                </div>
              </div>
            )}
          </div>
          <div className="text-center w-44">
            <LazyLoadImage
              effect="blur"
              className="w-24 h-24"
              src={rootInfoMatch.awayTeam.crest}
              alt=""
            />
            <div>{rootInfoMatch.awayTeam.name}</div>
            {/* <div
              className={`flex gap-2 cursor-pointer ${
                check ? "bg-green-400" : "bg-gray-200"
              } p-2 justify-between mt-2`}
            >
              <h4>0</h4>
              <i className="ri-add-line"></i>
            </div> */}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex justify-around py-1 bg-gray-100 w-5/6 rounded-t-lg text-gray-600 shadow-md">
            <div className="p-2 flex">
              <EyeIcon className={`h-5 w-5 text-gray-500 mr-1`} />
              {`Referees: ${rootInfoMatch.referees.find(
                (e: any) => e.type === "REFEREE"
              )?.name!}`}
            </div>
            <div className="p-2 flex">
              <UsersIcon className={`h-5 w-5 text-gray-500 mr-1`} />
              <span>
                {`Attendance: ${new Intl.NumberFormat().format(
                  rootInfoMatch.attendance
                )}`}
              </span>
            </div>
            <div className="p-2 flex">
              <MapPinIcon className={`h-5 w-5 text-gray-500 mr-1`} />
              <span>{`Venue: ${rootInfoMatch.venue}`}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="my-5 bg-white text-sm rounded-md dark:bg-dark">
        <Tab.Group
          selectedIndex={selectTab}
          onChange={(index: number) => {
            // console.log(index);
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
              <CSummary match={rootInfoMatch} loading={loadingFootball} />
            </Tab.Panel>
            {/* <Tab.Panel className={classNames("rounded-b-xl p-3 pt-5 ")}>
              <CStatistics match={rootInfoMatch} loading={loadingFootball} />
            </Tab.Panel> */}
            <Tab.Panel className={classNames("rounded-b-xl p-3 pt-5 ")}>
              <CLineUp match={rootInfoMatch} loading={loadingFootball} />
            </Tab.Panel>
            {/* <Tab.Panel
              className={classNames(
                "rounded-b-xl p-3 pt-5 bg-soft dark:bg-gray-700"
              )}
            >
              <div className="">
                <table className="min-w-full text-sm  ">
                  <thead className=" text-xs uppercase font-medium bg-gray-200 dark:bg-gray-700">
                    <tr className="">
                      <th scope="col" className="px-6 py-3">
                        Bookmaker
                      </th>
                      <th scope="col" className="px-6 py-3 ">
                        1
                      </th>
                      <th scope="col" className="px-1 py-3">
                        x
                      </th>
                      <th scope="col" className="px-6 py-3">
                        2
                      </th>
                    </tr>
                  </thead>
                  <tbody className="dark:bg-gray-800 bg-white ">
                    <tr className="dark:bg-dark hover:dark:bg-gray-700 hover:bg-gray-400 hover:text-white">
                      <td className="px-6 py-4 text-center">FootballBet</td>
                      <td className="px-6 py-4 text-center">
                        {rootInfoMatch.odds.homeWin}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {rootInfoMatch.odds.draw}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {rootInfoMatch.odds.awayWin}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Tab.Panel> */}
            <Tab.Panel
              className={classNames(
                "rounded-b-xl p-3 pt-5 bg-soft dark:bg-gray-700"
              )}
            >
              <TableStanding
                standings={rootCompetitionsStanding.standings}
                loading={loadingFootball}
                focusTeam={[
                  rootInfoMatch.homeTeam.id,
                  rootInfoMatch.awayTeam.id,
                ]}
              />
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                "rounded-b-xl p-3 pt-5 bg-soft dark:bg-gray-700"
              )}
            >
              <CHead2Head
                getPath={(path: string) => {
                  setSelectTab(0);
                  navigate(path);
                }}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default InfoMatch;

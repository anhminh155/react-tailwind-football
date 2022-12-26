// disable-eslint
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatchRoot, useSelectorRoot } from "../../redux/hooks";
import { RootState } from "../../redux/rootReducer";
import {
  fetchCompetitions,
  fetchCompetitionsMatches,
  fetchCompetitionStandings,
  fetchCompetitionsTeams,
  fetchTopScorersCompetitions,
} from "../../redux/controller/football.slice";
import { Props } from "../../@types/define";
import CBox from "../../components/CBox";
import TableStanding from "./components/TableStanding,";
import TableScorers from "./components/TableScorers";
import CPopoverCompetition from "./components/CPopoverCompetition";
import { Tab } from "@headlessui/react";
import CViewTeams from "./components/CViewTeams";
import { IFiltersAPI } from "../../@types/lookup_tables";
import { subDays, nextDay, subMonths, addMonths } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Utils from "../../common/utils";
import CMatches from "./components/CMatches";
import CBreadcrumb from "../../components/CBreadcrumb";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const CompetitionPage: React.FC<Props> = () => {
  const { competitionCode } = useParams();
  const dispatch = useDispatchRoot();
  const { loadingFootball, rootCompetitionsStanding, rootScorers } =
    useSelectorRoot((state: RootState) => state.football);
  const listTab: string[] = ["STANDINGS", "MATCHES", "TEAMS", "TOP SCORERS"];
  const [selectTab, setSelectTab] = useState<number>(0);
  const [paramApi, setParamAPi] = useState<IFiltersAPI>({
    competitions: competitionCode?.split("-")[1]!,
  });
  const [limitPlayer, setLimitPlayer] = useState<number>(10);
  const [paramCMatches, setParamCMatches] = useState<IFiltersAPI>({});

  useEffect(() => {
    // console.table([selectTab, paramCMatches, competitionCode]);
    let param: IFiltersAPI = {
      ...paramApi,
      season: competitionCode?.split("-")[2]!,
      competitions: competitionCode?.split("-")[1]!,
    };
    setParamAPi(param);
    switch (selectTab) {
      case 0:
        // STANDINGS
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
      case 1:
        // MATCHES
        console.log(paramCMatches);
        
        if (paramCMatches) {          
          dispatch(
            fetchCompetitionsMatches({
              ...param,
              // competitions: competitionCode?.split("-")[1]!,
              status: "FINISHED",
              dateFrom: Utils.getCurrentTimeUTC(subMonths(new Date(), 1)),
              dateTo: Utils.getCurrentTimeUTC(addMonths(new Date(), 1)),
            })
          );
        } else {
          dispatch(fetchCompetitionsMatches(paramCMatches));
        }
        //Done components
        break;
      case 2:
        // TEAMS
        dispatch(fetchCompetitionsTeams(param));
        break;
      case 3:
        // TOP SCORERS
        dispatch(
          fetchTopScorersCompetitions({
            ...param,
            limit: 10,
          })
        );
        break;
      default:
      // code block
    }
  }, [selectTab, paramCMatches, competitionCode]);


  return (
    <div className="">
      <CBreadcrumb />
      <CBox>
        {/* popover league */}
        <div className="inline-block hover:shadow-md hover:bg-gray-200 rounded-2xl -py-10 px-2 -m-2 mb-3 ring-0">
          <CPopoverCompetition />
        </div>

        <div className="w-full px-2 mt-5 sm:px-0 select-none">
          <Tab.Group
            defaultIndex={selectTab}
            onChange={(index: number) => {
              console.log(index);

              setSelectTab(index);
            }}
          >
            <Tab.List className="flex space-x-1 rounded-t-xl bg-soft dark:bg-gray-700 p-1">
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
              <Tab.Panel
                className={classNames(
                  "rounded-b-xl p-3 pt-5 bg-soft dark:bg-gray-700"
                )}
              >
                <TableStanding
                  standings={rootCompetitionsStanding?.standings}
                  type={rootCompetitionsStanding.competition.type}
                  loading={loadingFootball}
                />
              </Tab.Panel>
              <Tab.Panel
                className={classNames(
                  "rounded-b-xl p-3 pt-5 bg-soft dark:bg-gray-700"
                )}
              >
                <CMatches
                  getParam={(param: IFiltersAPI) => {
                    console.log(param);
                    setParamCMatches(param);
                  }}
                />
              </Tab.Panel>

              <Tab.Panel
                className={classNames(
                  "rounded-b-xl p-3 pt-5 bg-soft dark:bg-gray-700"
                )}
              >
                <CViewTeams />
              </Tab.Panel>
              <Tab.Panel
                className={classNames(
                  "rounded-b-xl p-3 pt-5 bg-soft dark:bg-gray-700"
                )}
              >
                <TableScorers
                  scorers={rootScorers?.scorers!}
                  loading={loadingFootball}
                  onMore={() => {
                    const lmt = limitPlayer + 10;
                    setLimitPlayer(lmt);
                    dispatch(
                      fetchTopScorersCompetitions({
                        ...paramApi,
                        limit: lmt,
                      })
                    );
                  }}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </CBox>
    </div>
  );
};

export default React.memo(CompetitionPage);

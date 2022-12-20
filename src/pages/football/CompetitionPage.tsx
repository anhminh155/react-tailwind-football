// disable-eslint
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatchRoot, useSelectorRoot } from "../../redux/hooks";
import { RootState } from "../../redux/rootReducer";
import {
  fetchCompetitionStandings,
  fetchCompetitionsTeams,
  fetchTopScorersCompetitions,
  ITopScorers,
} from "../../redux/controller/football.slice";
import { Props } from "../../@types/define";
import CBox from "../../components/CBox";
import TableStanding from "./components/TableStanding,";
import TableScorers from "./components/TableScorers";
import CPopoverCompetition from "./components/CPopoverCompetition";
import { Disclosure, Tab } from "@headlessui/react";
import CViewTeams from "./components/CViewTeams";


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const CompetitionPage: React.FC<Props> = () => {
  const { competitionCode } = useParams();
  const dispatch = useDispatchRoot();
  const { loadingFootball, rootCompetitionsStanding, rootScorers } =
    useSelectorRoot((state: RootState) => state.football);
  const listTab: string[] = ['STANDINGS', 'RESULTS', 'FIXTURES', 'TEAMS', 'TOP SCORERS']
  const [selectTab, setSelectTab] = useState<number>(0)

  useEffect(() => {
    switch (selectTab) {
      case 0:
        // STANDINGS
        dispatch(fetchCompetitionStandings(competitionCode?.split("_")[1]!));
        break;
      case 1:
        // FIXTURES
        break;
      case 2:
        // RESULTS       

        break;
      case 3:
        // TEAMS
        dispatch(fetchCompetitionsTeams(competitionCode?.split("_")[1]!))
        break;
      case 4:
        // TOP SCORERS
        const reqTopScorersCompetitions: ITopScorers = {
          competition: competitionCode?.split("_")[1]!,
          limit: 10,
        };
        dispatch(fetchTopScorersCompetitions(reqTopScorersCompetitions));
        break;
      default:
      // code block
    }
  }, [selectTab, competitionCode]);

  return (
    <div className="">
      <CBox>
        {/* popover league */}
        <div className="inline-block hover:shadow-md hover:bg-gray-200 rounded-2xl -py-10 px-2 -m-2 mb-3">
          <CPopoverCompetition />
        </div>
        <div className="w-full px-2 py-16 sm:px-0 select-none">
          <Tab.Group defaultIndex={selectTab} onChange={(index: number) => {
            setSelectTab(index)
          }}>
            <Tab.List className="flex space-x-1 rounded-t-xl bg-soft dark:bg-gray-700 p-1">
              {listTab.map((title: string, index: number) => (
                <Tab
                  key={index}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-violet dark:text-yellow',
                      selected
                        ? 'bg-white dark:bg-gray-800 shadow'
                        : 'text-black hover:bg-white/[0.12] hover:text-violet hover:bg-white hover:shadow hover:dark:bg-gray-800'
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
                  'rounded-b-xl p-3 pt-5 bg-soft dark:bg-gray-700',
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
                  'rounded-b-xl p-3 pt-5 bg-soft dark:bg-gray-700',
                )}
              >
                RESULTS
              </Tab.Panel>
              <Tab.Panel
                className={classNames(
                  'rounded-b-xl p-3 pt-5 bg-soft dark:bg-gray-700',
                )}
              >
                FIXTURES
              </Tab.Panel>

              <Tab.Panel
                className={classNames(
                  'rounded-b-xl p-3 pt-5 bg-soft dark:bg-gray-700',
                )}
              >
                <CViewTeams />
              </Tab.Panel>
              <Tab.Panel
                className={classNames(
                  'rounded-b-xl p-3 pt-5 bg-soft dark:bg-gray-700',
                )}
              >
                <TableScorers
                  scorers={rootScorers?.scorers!}
                  loading={loadingFootball}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>



        {/* <Disclosure>
          {(change) => {
            return (
              <div className="mb-2">
                <Disclosure.Button
                  className={`flex w-full justify-between ${change.open ? 'rounded-t-lg' : 'rounded-lg'}
                    bg-gray-100 px-4 py-2 text-left 
                    text-sm font-medium text-black dark:text-yellow
                    hover:text-white hover:bg-gray-400 focus:outline-none 
                    focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
                >
                  <div className="text-xl py-2">Top Scorers</div>
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 bg-soft rounded-b-lg">
                  <TableScorers
                    scorers={rootScorers?.scorers!}
                    loading={loadingFootball}
                  />
                </Disclosure.Panel>
              </div>
            );
          }}
        </Disclosure>
        <Disclosure defaultOpen >
          {(change) => {
            return (
              <div className="">
                <Disclosure.Button
                  className={`flex w-full justify-between ${change.open ? 'rounded-t-lg' : 'rounded-lg'}
                    bg-gray-100 px-4 py-2 text-left 
                    text-sm font-medium text-black dark:text-yellow
                    hover:text-white hover:bg-gray-400 focus:outline-none 
                    focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
                >
                  <div className="text-xl py-2">Standings</div>
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 bg-soft rounded-b-lg">
                  <div className="">
                    <TableStanding
                      standings={rootCompetitionsStanding?.standings}
                      type={rootCompetitionsStanding.competition.type}
                      loading={loadingFootball}
                    />
                  </div>
                </Disclosure.Panel>
              </div>
            );
          }}
        </Disclosure> */}
      </CBox>
    </div>
  );
};

export default CompetitionPage;

// disable-eslint
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatchRoot, useSelectorRoot } from "../../redux/hooks";
import { RootState } from "../../redux/rootReducer";
import {
  fetchCompetitionStandings,
  fetchTopScorersCompetitions,
  ITopScorers,
} from "../../redux/controller/football.slice";
import { Props } from "../../@types/define";
import CBox from "../../components/CBox";
import TableStanding from "./components/TableStanding,";
import TableScorers from "./components/TableScorers";
import CPopoverCompetition from "./components/CPopoverCompetition";
import { Disclosure } from "@headlessui/react";

const CompetitionPage: React.FC<Props> = () => {
  const { competitionCode } = useParams();
  const dispatch = useDispatchRoot();
  const { loadingFootball, rootCompetitionsStanding, rootScorers } =
    useSelectorRoot((state: RootState) => state.football);

  useEffect(() => {
    const reqTopScorersCompetitions: ITopScorers = {
      competition: competitionCode?.split("_")[1]!,
      limit: 10,
    };
    dispatch(fetchCompetitionStandings(competitionCode?.split("_")[1]!));
    dispatch(fetchTopScorersCompetitions(reqTopScorersCompetitions));
    // dispatch(fetchCompetitionsMatches(competitionCode?.split("_")[1]!));
  }, [competitionCode]);

  return (
    <div className="">
      <CBox>
        {/* popover league */}
        <div className="inline-block hover:bg-gray-200 rounded-2xl -py-10 px-2 -m-2 mb-3">
          <CPopoverCompetition />
        </div>

        {/* view table scorers */}

        <Disclosure>
          {(change) => {
            return (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-black dark:text-yellow hover:text-white hover:bg-gray-400 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <div className="text-xl py-2">(Top) Scorers</div>
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  <TableScorers
                    scorers={rootScorers?.scorers!}
                    loading={loadingFootball}
                  />
                </Disclosure.Panel>
              </>
            );
          }}
        </Disclosure>

        {/* <div className="">
          <div className="text-xl py-2">(Top) Scorers</div>
          <div>
            <TableScorers
              scorers={rootScorers?.scorers!}
              loading={loadingFootball}
            />
          </div>
        </div> */}
        {/* view table standings */}
        <div className="">
          <div className="text-xl py-2">Standings</div>
          <TableStanding
            standings={rootCompetitionsStanding?.standings}
            type={rootCompetitionsStanding.competition.type}
            loading={loadingFootball}
          />
        </div>
      </CBox>
    </div>
  );
};

export default CompetitionPage;

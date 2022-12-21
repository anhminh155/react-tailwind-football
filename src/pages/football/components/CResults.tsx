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
import DatePicker from "react-datepicker";
import { format, addDays, parseISO, subDays, nextDay } from "date-fns";
import { Match } from "../../../@types/competiiton_matches";
import { Switch } from "@headlessui/react";
import { fetchCompetitionsMatches } from "../../../redux/controller/football.slice";
import Utils from "../../../common/utils";
import { EnumTypes } from "../../../@types/lookup_tables";

interface ICResults extends Props {
  getParam: any;
}

const CResults: React.FC<ICResults> = ({ getParam }) => {
  const { loadingFootball, rootCompetitionsMatches } = useSelectorRoot(
    (state: RootState) => state.football
  );
  const { competitionCode, idTeam } = useParams<IPathNameChild>();
  const [dateRange, setDateRange] = useState<[any, any]>([
    subDays(new Date(), 14),
    nextDay(new Date(), 2),
  ]);
  const [startDate, endDate] = dateRange;
  const [enabled, setEnabled] = useState(false);

  return (
    <CLoading loading={loadingFootball}>
      <div className="flex bg-gray-300 dark:bg-dark dark:border-gray-700 border-transparent border-x-[13px] -mx-3 items-center justify-between">
        <div className="flex hover:bg-gray-500 hover:text-white p-3">
          <span className="pr-2">Date:</span>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            className="w-52 bg-transparent cursor-pointer"
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update: [any, any]) => {              
              setDateRange(update);
              if (update[0] !== null && update[1] !== null) {                
                if (enabled) {
                  getParam({
                    competitions: competitionCode?.split("-")[1]!,
                    dateFrom: Utils.getCurrentTimeUTC(update[0]),
                    dateTo: Utils.getCurrentTimeUTC(update[1]),
                  });
                } else {
                  getParam({
                    status: "FINISHED",
                    competitions: competitionCode?.split("-")[1]!,
                    dateFrom: Utils.getCurrentTimeUTC(update[0]),
                    dateTo: Utils.getCurrentTimeUTC(update[1]),
                  });
                }
              }
            }}
            withPortal
          />
        </div>
        <div className="flex items-center capitalize hover:bg-gray-500 hover:text-white p-3">
          <span className="pr-2">SCHEDULED/ALL:</span>
          <Switch
            checked={enabled}
            onChange={(e: boolean) => {
              console.log('Switch');
              
              if (e) {
                getParam({
                  competitions: competitionCode?.split("-")[1]!,
                  dateFrom: Utils.getCurrentTimeUTC(dateRange[0]),
                  dateTo: Utils.getCurrentTimeUTC(dateRange[1]),
                });
              } else {
                getParam({
                  status: "FINISHED",
                  competitions: competitionCode?.split("-")[1]!,
                  dateFrom: Utils.getCurrentTimeUTC(dateRange[0]),
                  dateTo: Utils.getCurrentTimeUTC(dateRange[1]),
                });
              }
              setEnabled(e);
            }}
            className={`${enabled ? "bg-teal-900" : "bg-gray-200"}
          relative inline-flex h-[28px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${enabled ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
      </div>
      <div className="mt-3">
        <table className="min-w-full text-sm text-gray-700 dark:text-white">
          <thead className="dark:bg-gray-800 bg-gray-600 text-xs uppercase font-medium">
            <tr className="text-white">
              <th
                scope="col"
                className="px-6 py-3 text-left tracking-wider w-8"
              >
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-right tracking-wider">
                Home
              </th>
              <th
                scope="col"
                className="px-6 py-3 tracking-wider w-20 text-center"
              >
                Score
              </th>
              <th scope="col" className="px-6 py-3 text-left tracking-wider">
                Away
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left tracking-wider"
              ></th>
            </tr>
          </thead>
          <tbody className="dark:bg-gray-800 bg-white ">
            {rootCompetitionsMatches.matches.map((match: Match, i: number) => {
              return (
                <tr
                  key={i}
                  className="dark:bg-dark hover:dark:bg-gray-700 hover:bg-gray-400 hover:text-white"
                >
                  <td className="px-6 py-4 min-w-fit">
                    {format(new Date(match.utcDate), "dd/MM HH:mm")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {match.homeTeam.shortName}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {match.score.winner === null
                      ? "vs"
                      : `${match.score.fullTime.home} - ${match.score.fullTime.away}`}
                  </td>
                  <td className="px-6 py-4">{match.awayTeam.shortName}</td>
                  <td className="px-6 py-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Info
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </CLoading>
  );
};

export default React.memo(CResults);

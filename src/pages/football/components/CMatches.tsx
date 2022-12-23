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
import {
  format,
  subDays,
  nextDay,
  getMonth,
  getYear,
  addMonths,
  subMonths,
} from "date-fns";
import { Match } from "../../../@types/competiiton_matches";
import { Switch } from "@headlessui/react";
import Utils from "../../../common/utils";

interface ICResults extends Props {
  getParam: any;
}

const CMatches: React.FC<ICResults> = ({ getParam }) => {
  const { loadingFootball, rootCompetitionsMatches, rootCompetitionsStanding } =
    useSelectorRoot((state: RootState) => state.football);
  const { competitionCode } = useParams<IPathNameChild>();
  const [dateRange, setDateRange] = useState<[any, any]>([
    subMonths(new Date(), 1),
    addMonths(new Date(), 1),
  ]);
  const [startDate, endDate] = dateRange;
  const [enabled, setEnabled] = useState<boolean>(false);

  console.log(rootCompetitionsStanding);

  //custom
  // const [startDate, setStartDate] = useState<any>(new Date());
  const range = (start: number, end: number): any => {
    return new Array(end - start).fill(undefined).map((d, i) => i + start);
  };
  const years = range(
    getYear(new Date(rootCompetitionsStanding.season.startDate)),
    getYear(new Date(rootCompetitionsStanding.season.endDate)) + 1
  );
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <CLoading loading={loadingFootball}>
      <div className="lg:flex bg-gray-300 dark:bg-dark dark:border-gray-700 border-transparent border-x-[13px] -mx-3 items-center justify-between">
        <div className="flex hover:bg-gray-500 hover:text-white p-3">
          <span className="pr-2">Date:</span>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            className="w-52 bg-transparent cursor-pointer"
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
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            withPortal
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="">
                <div className="bg-gray-300 text-[#216ba5] w-full py-3 -mt-2 rounded-md mb-3 font-bold text-lg ">
                  <span className="pr-2">Season:</span>
                  <span>{`${format(
                    new Date(rootCompetitionsStanding.season.startDate),
                    "dd/MM/yyyy"
                  )} - ${format(
                    new Date(rootCompetitionsStanding.season.endDate),
                    "dd/MM/yyyy"
                  )}`}</span>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    aria-label="calendar backward"
                    className="focus:text-gray-400 text-gray-800 dark:text-gray-100 hover:bg-gray-800 hover:text-white rounded-md p-1 min-w-fit"
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

                  <div className="flex items-center">
                    <span
                      tabIndex={0}
                      className="focus:outline-none text-base font-bold dark:text-gray-100 text-gray-800"
                    >
                      <span className="pr-2">
                        <select
                          className="bg-transparent hover:bg-gray-800 hover:text-white rounded-md p-1 w-32"
                          value={months[getMonth(date)]}
                          onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                          }
                        >
                          {months.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </span>
                      <span>
                        <select
                          className="bg-transparent hover:bg-gray-800 hover:text-white rounded-md p-1"
                          value={getYear(date)}
                          onChange={({ target: { value } }: any) =>
                            changeYear(value)
                          }
                        >
                          {years.map((option: any) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </span>
                    </span>
                  </div>
                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    aria-label="calendar forward"
                    className="focus:text-gray-400 text-gray-800 dark:text-gray-100 hover:bg-gray-800 hover:text-white rounded-md p-1"
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
            )}
            selected={startDate}
            // onChange={(date) => {
            //   setStartDate(date);
            // }}
          />
        </div>
        <div className="flex items-center capitalize hover:bg-gray-500 hover:text-white p-3">
          <span className="pr-2">FINISHED/ALL:</span>
          <Switch
            checked={enabled}
            onChange={(e: boolean) => {
              console.log("Switch");

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

export default React.memo(CMatches);

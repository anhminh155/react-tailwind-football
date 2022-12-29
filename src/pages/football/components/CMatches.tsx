import React, { Fragment, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Props } from "types/define";
import CLoading from "components/CLoading";
import { useSelectorRoot } from "redux/hooks";
import { RootState } from "redux/rootReducer";
import DatePicker from "react-datepicker";
import { format, getMonth, getYear } from "date-fns";
import { Match } from "types/competiiton_matches";
import Utils from "common/utils";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Listbox, Transition, Combobox } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

interface ICResults extends Props {
  getParam: any;
}

//Select
const stt = [
  { name: "ALL" },
  { name: "SCHEDULED" },
  { name: "FINISHED" },
  { name: "LIVE" },
  { name: "IN_PLAY" },
  { name: "PAUSED" },
  { name: "POSTPONED" },
  { name: "SUSPENDED" },
  { name: "CANCELLED" },
];
//Month
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

const ClickableInput = React.forwardRef(({ onClick, ...props }: any, ref) => (
  <div
    onClick={onClick}
    className="dark:text-black rounded-lg min-h-fit bg-white whitespace-nowrap text-left shadow-md p-2 sm:text-sm cursor-pointer"
  >
    {/* <span className="pr-2">Date:</span> */}
    <input ref={ref} type="button" className="cursor-pointer" {...props} />
  </div>
));

const CMatches: React.FC<ICResults> = ({ getParam }) => {
  const {
    loadingCompetitionsMatches,
    rootCompetitionsMatches,
    rootCompetitionsStanding,
    rootCompetitionsTeams,
  } = useSelectorRoot((state: RootState) => state.football);
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<[any, any]>([
    new Date(rootCompetitionsStanding.season.startDate),
    new Date(rootCompetitionsStanding.season.endDate),
  ]);
  const [startDate, endDate] = dateRange;
  const [selected, setSelected] = useState(stt[0]);
  const [listMatches, setListMatches] = useState<any>(
    rootCompetitionsMatches.matches
  );

  //Combobox
  const [selectedCombobox, setSelectedCombobox] = useState<any>(undefined);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // console.log(selectedCombobox);
    if (selectedCombobox === undefined || selectedCombobox.name === "All") {
      setListMatches(rootCompetitionsMatches?.matches!);
    } else {
      setListMatches(
        rootCompetitionsMatches.matches.filter(
          (match: Match, i: number) =>
            match.homeTeam.name === selectedCombobox?.name ||
            match.awayTeam.name === selectedCombobox?.name
        )
      );
    }
  }, [rootCompetitionsMatches]);

  let filteredTeams =
    query === ""
      ? [{ id: 0, name: "All", img: null }, ...rootCompetitionsTeams.teams]
      : rootCompetitionsTeams.teams.filter((team) =>
          team.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  //------------------------------

  //Date
  const range = (start: number, end: number): any => {
    return new Array(end - start).fill(undefined).map((d, i) => i + start);
  };

  const years = range(
    getYear(new Date(rootCompetitionsStanding.season.startDate)),
    getYear(new Date(rootCompetitionsStanding.season.endDate)) + 1
  );

  return (
    <CLoading loading={loadingCompetitionsMatches}>
      <div className="flex xl:flex-row flex-col xl:items-center gap-2">
        <div className={`${loadingCompetitionsMatches ? "z-0" : "z-20"}`}>
          <div className="text-sm pb-1">Team</div>
          <Combobox
            value={selectedCombobox}
            onChange={(e: any) => {
              // console.log(e);
              setSelectedCombobox(e);
              if (e.id !== 0) {
                setListMatches(
                  rootCompetitionsMatches.matches.filter(
                    (match: Match, i: number) =>
                      match.homeTeam.name === e?.name ||
                      match.awayTeam.name === e?.name
                  )
                );
              } else {
                setListMatches(rootCompetitionsMatches.matches);
              }
            }}
          >
            <div className="relative">
              <div className="relative w-full xl:w-56 cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none sm:text-sm">
                <Combobox.Input
                  placeholder="Search Team"
                  autoComplete="off"
                  className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
                  displayValue={(person: any) => person.name}
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                />
                {/* <Combobox.Button
                  onClick={(event: any) => {
                    console.log('go');
                    setQuery("");
                    setSelectedCombobox(undefined);
                  }}
                  className="absolute inset-y-0 right-5 flex items-center pr-2"
                >
                  <XCircleIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </Combobox.Button> */}
                <Combobox.Button className="absolute inset-y-0 -right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => {
                  setQuery("");
                }}
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredTeams.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredTeams.map((team: any) => (
                      <Combobox.Option
                        key={team.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-teal-600 text-white" : "text-gray-900"
                          }`
                        }
                        value={{ id: team.id, name: team.name }}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              <LazyLoadImage
                                effect="blur"
                                className="w-5 mr-2"
                                src={team.crest}
                                alt=""
                              />
                              <span>{team.name}</span>
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
        <div className="">
          <div className="text-sm pb-1">Status</div>
          <Listbox
            value={selected}
            onChange={(status: any) => {
              console.log(status);

              setSelected(status);
              if (status.name === "ALL") {
                console.log(1);
                getParam({
                  dateFrom: Utils.getCurrentTimeUTC(dateRange[0]),
                  dateTo: Utils.getCurrentTimeUTC(dateRange[1]),
                });
              } else {
                getParam({
                  status: status.name,
                  dateFrom: Utils.getCurrentTimeUTC(dateRange[0]),
                  dateTo: Utils.getCurrentTimeUTC(dateRange[1]),
                });
              }
            }}
          >
            <div
              className={`relative ${
                loadingCompetitionsMatches ? "z-0" : "z-10"
              }`}
            >
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
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {stt.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-violet/70 text-white dark:bg-dark/90"
                            : "text-gray-900"
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
        <div className="">
          <div className="text-sm pb-1">Date</div>

          <DatePicker
            customInput={<ClickableInput />}
            dateFormat="dd/MM/yyyy"
            className="bg-transparent cursor-pointer"
            onChange={(update: [any, any]) => {
              setDateRange(update);
              if (update[0] !== null && update[1] !== null) {
                if (selected.name === "ALL") {
                  getParam({
                    dateFrom: Utils.getCurrentTimeUTC(update[0]),
                    dateTo: Utils.getCurrentTimeUTC(update[1]),
                  });
                } else {
                  getParam({
                    status: selected.name,
                    dateFrom: Utils.getCurrentTimeUTC(update[0]),
                    dateTo: Utils.getCurrentTimeUTC(update[1]),
                  });
                }
              }
            }}
            onCalendarClose={() => {
              console.log("close");
              const prv = dateRange;
              console.log(prv);
            }}
            selected={startDate}
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            // withPortal
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="dark:bg-dark/40">
                <div className="bg-gray-300  text-[#216ba5] w-full p-3 -mt-2 font-bold text-lg ">
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
                    className=" focus:text-gray-400 text-gray-800 dark:text-gray-100 hover:bg-gray-800 hover:text-white rounded-md p-1 min-w-fit"
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
                      <span className="pr-2 b">
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
          />
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
                className="px-1 py-3 tracking-wider w-20 text-center"
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
            {listMatches ? (
              listMatches.map((match: Match, i: number) => {
                return (
                  <tr
                    key={i}
                    className="dark:bg-dark hover:dark:bg-gray-700 hover:bg-gray-400 hover:text-white"
                  >
                    <td className="px-6 py-4 min-w-fit">
                      {format(new Date(match.utcDate), "dd/MM HH:mm")}
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end">
                      <div>{match.homeTeam.shortName}</div>
                      <LazyLoadImage
                        effect="blur"
                        className="w-5 ml-2"
                        src={match.homeTeam.crest}
                        alt=""
                      />
                    </td>
                    <td className="px-1 py-4 text-center">
                      {match.score.winner === null
                        ? "vs"
                        : `${match.score.fullTime.home} - ${match.score.fullTime.away}`}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex">
                        <LazyLoadImage
                          effect="blur"
                          className="w-5 mr-2"
                          src={match.awayTeam.crest}
                          alt=""
                        />
                        <div>{match.awayTeam.shortName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 flex justify-end">
                      <button
                        onClick={() => navigate(`${match.id}`)}
                        type="button"
                        className="inline-flex rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Info
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <div>not found</div>
            )}
          </tbody>
        </table>
      </div>
    </CLoading>
  );
};

export default React.memo(CMatches);

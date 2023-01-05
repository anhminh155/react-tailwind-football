import React, { useState } from "react";
import { Props } from "types/define";
import { ITeams, Squad } from "types/teams";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import CLoading from "components/CLoading";
import { useNavigate } from "react-router-dom";

interface ICSquad extends Props {
  dataTeam: ITeams;
  loading?: boolean;
}

const CSquad: React.FC<ICSquad> = ({ dataTeam, loading = false }) => {
  const navigate = useNavigate();
  const [filterSquad, setFilterSquad] = useState<Squad[]>(
    dataTeam.squad ? dataTeam.squad : []
  );

  return (
    <CLoading loading={loading}>
      <div>
        <div className="bg-gray-200 dark:bg-gray-700 text-center py-2">
          <span className="uppercase ">squad</span>
        </div>
      </div>
      <div className="">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            onChange={(e) => {
              setFilterSquad(
                dataTeam.squad.filter((squad: Squad) =>
                  squad.name
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(e.target.value.toLowerCase().replace(/\s+/g, ""))
                )
              );
            }}
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search player..."
            required
          />
        </div>
      </div>

      <table className="min-w-full text-sm text-gray-700 dark:text-white">
        <thead className="dark:bg-gray-800 bg-gray-600 text-xs uppercase font-medium">
          <tr className="text-white">
            <th scope="col" className="px-6 py-3">
              Shirt Number
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-1 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Birthday
            </th>
            <th scope="col" className="px-6 py-3">
              Contract
            </th>
          </tr>
        </thead>
        <tbody className="dark:bg-gray-800 bg-white ">
          {filterSquad ? (
            filterSquad.map((squad: Squad, i: number) => {
              return (
                <tr
                  key={i}
                  onClick={() => {
                    navigate(`player/${squad.id}`);
                  }}
                  className="dark:bg-dark hover:dark:bg-gray-700 hover:bg-gray-400 hover:text-white text-center hover:cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {squad.shirtNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {squad.position}
                  </td>
                  <td className="px-1 py-4 whitespace-nowrap">{squad.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {squad.dateOfBirth}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {squad.contract.start}
                    <FontAwesomeIcon
                      icon={faRightLong}
                      className="text-base px-2"
                    />
                    {squad.contract.until}
                  </td>
                </tr>
              );
            })
          ) : (
            <div>not found</div>
          )}
        </tbody>
      </table>
    </CLoading>
  );
};

export default React.memo(CSquad);

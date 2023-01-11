import React from "react";
import { Props } from "types/define";
import CLoading from "components/CLoading";
import CModal from "components/modals/CModal";
import { useNavigate } from "react-router-dom";
import { IPlayerMatches } from "types/player_matches";
import { useSelectorRoot } from "redux/hooks";
import { RootState } from "redux/rootReducer";

interface ICModalViewPlayerMatch extends Props {
  isOpen: boolean;
  setIsOpen(e: boolean): void;
  playerMatches?: IPlayerMatches;
  loading: boolean;
  idTeam?: number;
}

const CModalViewPlayerMatch: React.FC<ICModalViewPlayerMatch> = ({
  setIsOpen,
  isOpen,
  playerMatches,
  idTeam,
  loading,
}) => {
  const navigate = useNavigate();
  const { rootInfoMatch } = useSelectorRoot(
    (state: RootState) => state.football
  );

  return (
    <CModal show={isOpen} closeModal={(e: boolean) => setIsOpen(e)}>
      <CLoading loading={loading} className="">
        <div className=" bg-white rounded-lg overflow-hidden">
          <div className="flex items-center px-6 py-3 bg-gray-700 justify-center">
            <h1 className="mx-3 text-white font-semibold text-lg">
              {playerMatches?.person.name}
            </h1>
          </div>
          <div className="p-4 px-6 grid grid-cols-2">
            <div className="pb-2 flex col-span-2">
              <div className="font-semibold pr-2">Position:</div>
              <span>{playerMatches?.person.position}</span>
            </div>
            <div className="pb-2 flex col-span-2">
              <div className="font-semibold pr-2">ShirtNumber:</div>
              <span>{playerMatches?.person.shirtNumber}</span>
            </div>
            <div className="pb-2 flex col-span-2">
              <div className="font-semibold pr-2">Nationality:</div>
              <span>{playerMatches?.person.nationality}</span>
            </div>
            <div className="pb-2 flex col-span-2">
              <div className="font-semibold pr-2 ">Birthday:</div>
              <span>{playerMatches?.person.dateOfBirth}</span>
            </div>
            <div className="pt-1 mb-2 flex col-span-2 bg-slate-400" />
            {playerMatches?.matches.length !== 0 ? (
              <>
                <div className="pb-2 flex">
                  <div className="font-semibold pr-2 ">Minutes Played:</div>
                  <span>{playerMatches?.aggregations.minutesPlayed}</span>
                </div>
                <div className="pb-2 flex">
                  <div className="font-semibold pr-2 ">Goals:</div>
                  <span>{playerMatches?.aggregations.goals}</span>
                </div>
                <div className="pb-2 flex">
                  <div className="font-semibold pr-2 ">Assists:</div>
                  <span>{playerMatches?.aggregations.assists}</span>
                </div>
                <div className="pb-2 flex">
                  <div className="font-semibold pr-2 ">Yellow Cards:</div>
                  <span>{playerMatches?.aggregations.yellowCards}</span>
                </div>
                <div className="pb-2 flex">
                  <div className="font-semibold pr-2 ">Red Cards:</div>
                  <span>{playerMatches?.aggregations.yellowRedCards}</span>
                </div>
              </>
            ) : (
              <div className="">-</div>
            )}
          </div>
        </div>

        <div className="px-6 pb-4">
          <button
            onClick={() => {
              //Handle
              navigate(
                `/dashboard/${rootInfoMatch.competition.type.toLowerCase()}-${
                  rootInfoMatch.competition.code
                }-${new Date(
                  rootInfoMatch.season.startDate!
                ).getFullYear()}/team/${idTeam}/player/${
                  playerMatches?.person.id
                }`
              );
            }}
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            View more...
          </button>
        </div>
      </CLoading>
    </CModal>
  );
};

export default React.memo(CModalViewPlayerMatch);

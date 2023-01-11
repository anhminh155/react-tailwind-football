import React, { useState } from "react";
import { Props } from "types/define";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFutbolBall,
  faShirt,
  faBullhorn,
  faStop,
} from "@fortawesome/free-solid-svg-icons";
import { Booking, Goal, IInfoMatch, Substitution } from "types/infoMatch";
import CLoading from "components/CLoading";
import CModalViewPlayerMatch from "./CModalViewPlayerMatch";
import { useDispatchRoot, useSelectorRoot } from "redux/hooks";
import { fetchPlayerMatches } from "redux/controller/football.player.slice";
import { addDays, format, subDays } from "date-fns";
import { RootState } from "redux/rootReducer";

interface ICSummary extends Props {
  loading?: boolean;
  match: IInfoMatch;
}

const CSummary: React.FC<ICSummary> = ({ loading = false, match }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { loadingPlayerMatches, rootPlayerMatches } = useSelectorRoot(
    (state: RootState) => state.footballPlayer
  );
  const dispatch = useDispatchRoot();
  const [selectTeam, setSelectTeam] = useState<number>();
  const param = {
    dateFrom: format(
      subDays(new Date(match.utcDate.split("T")[0]), 1),
      "yyyy-MM-dd"
    ),
    dateTo: format(
      addDays(new Date(match.utcDate.split("T")[0]), 1),
      "yyyy-MM-dd"
    ),
  };
  return (
    <CLoading loading={loading}>
      <div className="">
        <div className="bg-gray-200 dark:bg-gray-700 mb-1 text-center py-2">
          <FontAwesomeIcon icon={faFutbolBall} className="text-base pr-2" />
          <span>GOALS AND ASSISTS</span>
        </div>
        {match.goals.map((goal: Goal, i: number) => {
          return (
            <div key={i} className="w-full font-normal py-3 border-b">
              {goal.team.id === match.homeTeam.id ? (
                <div className="flex justify-start">
                  <span className="pr-5">{goal.minute}'</span>
                  <FontAwesomeIcon
                    icon={faFutbolBall}
                    className="text-base pr-2 text-green-500"
                  />
                  <span
                    onClick={() => {
                      //handle
                      dispatch(
                        fetchPlayerMatches({
                          ...param,
                          id: goal.scorer?.id,
                        })
                      );
                      setSelectTeam(goal.team.id);
                      setIsOpen(true);
                    }}
                    className="pr-1 hover:font-bold cursor-pointer"
                  >
                    {goal.scorer.name}
                  </span>
                  <span className="capitalize ">
                    {goal.assist !== null ? (
                      <span
                        className="hover:font-bold cursor-pointer"
                        onClick={() => {
                          //handle
                          dispatch(
                            fetchPlayerMatches({
                              ...param,
                              id: goal.assist?.id,
                            })
                          );
                          setSelectTeam(goal.team.id);
                          setIsOpen(true);
                        }}
                      >
                        (assist: {goal.assist?.name})
                      </span>
                    ) : (
                      <span>{`(${goal.type})`}</span>
                    )}
                  </span>
                </div>
              ) : (
                <div className="flex justify-end items-center">
                  <span className="capitalize pr-1">
                    {goal.assist !== null ? (
                      <span
                        className="hover:font-bold cursor-pointer"
                        onClick={() => {
                          //handle
                          dispatch(
                            fetchPlayerMatches({
                              ...param,
                              id: goal.assist?.id,
                            })
                          );

                          setSelectTeam(goal.team.id);
                          setIsOpen(true);
                        }}
                      >
                        (assist: {goal.assist?.name})
                      </span>
                    ) : (
                      `(${goal.type.toString().toLowerCase()})`
                    )}
                  </span>
                  <span
                    onClick={() => {
                      //handle
                      dispatch(
                        fetchPlayerMatches({
                          ...param,
                          id: goal.scorer?.id,
                        })
                      );

                      setSelectTeam(goal.team.id);
                      setIsOpen(true);
                    }}
                    className="pr-2 hover:font-bold cursor-pointer"
                  >
                    {goal.scorer.name}
                  </span>
                  <FontAwesomeIcon
                    icon={faFutbolBall}
                    className="text-base pr-2 text-green-500"
                  />
                  <span className="pl-5">{goal.minute}'</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="">
        <div className="bg-gray-200 dark:bg-gray-700 mb-1 text-center py-2">
          <FontAwesomeIcon icon={faShirt} className="text-base pr-2" />
          SUBSTITUTIONS
        </div>
        <span>
          {match.substitutions.map((substitution: Substitution, i: number) => {
            return (
              <div key={i} className="w-full font-normal py-3 border-b">
                {substitution.team.id === match.homeTeam.id ? (
                  <div className="flex justify-start gap-2">
                    <span className="pr-3">{substitution.minute}'</span>
                    <span
                      className="hover:font-bold cursor-pointer"
                      onClick={() => {
                        //handle
                        dispatch(
                          fetchPlayerMatches({
                            ...param,
                            id: substitution.playerIn?.id,
                          })
                        );
                        setSelectTeam(substitution.team.id);
                        setIsOpen(true);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faShirt}
                        className="text-base pr-2 text-green-500"
                      />
                      <span>{substitution.playerIn.name}</span>
                    </span>
                    <span
                      className="hover:font-bold cursor-pointer"
                      onClick={() => {
                        //handle
                        dispatch(
                          fetchPlayerMatches({
                            ...param,
                            id: substitution.playerOut?.id,
                          })
                        );
                        setSelectTeam(substitution.team.id);
                        setIsOpen(true);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faShirt}
                        className="text-base pr-2 text-red-500"
                      />
                      <span>{substitution.playerOut.name}</span>
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-end gap-2">
                    <span
                      className="hover:font-bold cursor-pointer"
                      onClick={() => {
                        //handle
                        dispatch(
                          fetchPlayerMatches({
                            ...param,
                            id: substitution.playerIn?.id,
                          })
                        );
                        setSelectTeam(substitution.team.id);
                        setIsOpen(true);
                      }}
                    >
                      <span className="pr-2">{substitution.playerIn.name}</span>
                      <FontAwesomeIcon
                        icon={faShirt}
                        className="text-base text-green-500"
                      />
                    </span>
                    <span
                      className="hover:font-bold cursor-pointer"
                      onClick={() => {
                        //handle
                        dispatch(
                          fetchPlayerMatches({
                            ...param,
                            id: substitution.playerOut?.id,
                          })
                        );
                        setSelectTeam(substitution.team.id);
                        setIsOpen(true);
                      }}
                    >
                      <span className="pr-2">
                        {substitution.playerOut.name}
                      </span>
                      <FontAwesomeIcon
                        icon={faShirt}
                        className="text-base text-red-500"
                      />
                    </span>
                    <span className="pl-3">{substitution.minute}'</span>
                  </div>
                )}
              </div>
            );
          })}
        </span>
      </div>
      <div className="">
        <div className="bg-gray-200 dark:bg-gray-700 mb-1 text-center py-2">
          <FontAwesomeIcon icon={faBullhorn} className="text-base pr-2" />
          FOULS
        </div>
        <span>
          {match.bookings.map((booking: Booking, i: number) => {
            return (
              <div key={i} className="w-full font-normal py-3 border-b">
                {booking.team.id === match.homeTeam.id ? (
                  <div className="flex justify-start gap-2 items-center">
                    <span className="pr-3">{booking.minute}'</span>
                    <div
                      className="hover:font-bold cursor-pointer"
                      onClick={() => {
                        //handle
                        dispatch(
                          fetchPlayerMatches({
                            ...param,
                            id: booking.player?.id,
                          })
                        );
                        setSelectTeam(booking.team.id);
                        setIsOpen(true);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faStop}
                        className={`text-base pr-2 ${
                          booking.card === "YELLOW"
                            ? "text-yellow"
                            : "text-red-600"
                        }`}
                      />
                      <span>{booking.player.name}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end gap-2 items-center">
                    <div
                      className="hover:font-bold cursor-pointer"
                      onClick={() => {
                        //handle
                        dispatch(
                          fetchPlayerMatches({
                            ...param,
                            id: booking.player?.id,
                          })
                        );
                        setSelectTeam(booking.team.id);
                        setIsOpen(true);
                      }}
                    >
                      <span className="pr-2">{booking.player.name}</span>
                      <FontAwesomeIcon
                        icon={faStop}
                        className={`text-base ${
                          booking.card === "YELLOW"
                            ? "text-yellow"
                            : "text-red-600"
                        }`}
                      />
                    </div>
                    <span className="pl-3">{booking.minute}'</span>
                  </div>
                )}
              </div>
            );
          })}
        </span>
      </div>
      <CModalViewPlayerMatch
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        playerMatches={rootPlayerMatches}
        loading={loadingPlayerMatches}
        idTeam={selectTeam}
      />
    </CLoading>
  );
};

export default React.memo(CSummary);

import React from "react";
import { Props } from "types/define";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleLine,
  faShirt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Bench, Bench2, IInfoMatch, Lineup, Lineup2 } from "types/infoMatch";
import Utils from "common/utils";
import SoccerLineUp from "react-soccer-lineup";
import CLoading from "components/CLoading";
import { useNavigate } from "react-router-dom";
import { useSelectorRoot } from "redux/hooks";
import { RootState } from "redux/rootReducer";

interface ILineUp extends Props {
  loading?: boolean;
  match: IInfoMatch;
}

const CLineUp: React.FC<ILineUp> = ({ match, loading }) => {
  const navigate = useNavigate()
  const {rootInfoMatch} = useSelectorRoot((state:RootState)=> state.football )
  const convertArr = (lineup: Lineup[] | Lineup2[]): any => {
    let arrLineup: any = {
      squad: {
        gk: {},
        df: [],
        cdm: [],
        cm: [],
        cam: [],
        fw: [],
      },
    };
    lineup.forEach((lp: Lineup | Lineup2, i: number) => {
      switch (lp.position) {
        case "Goalkeeper":
          arrLineup.squad.gk = {
            number: lp.shirtNumber,
            name: (
              <div className={`p-2 bg-[#38838F]  rounded-lg invisible lg:visible`}>{lp.name}</div>
            ),
          };
          arrLineup.squad.gk.onClick = () => {
            console.log(lp.name);
          };
          break;
        case "Centre-Back":
          arrLineup.squad.df.push({
            number: lp.shirtNumber,
            name: (
              <div className={`p-2 bg-[#38838F]  rounded-lg invisible lg:visible`}>{lp.name}</div>
            ),
          });
          break;
        case "Right-Back":
          arrLineup.squad.cm.push({
            number: lp.shirtNumber,
            name: (
              <div className={`p-2 bg-[#38838F]  rounded-lg invisible lg:visible`}>{lp.name}</div>
            ),
          });
          break;
        case "Left-Back":
          arrLineup.squad.cm.push({
            number: lp.shirtNumber,
            name: (
              <div className={`p-2 bg-[#38838F]  rounded-lg invisible lg:visible`}>{lp.name}</div>
            ),
          });
          break;
        case "Defensive Midfield":
          arrLineup.squad.cm.push({
            number: lp.shirtNumber,
            name: (
              <div className={`p-2 bg-[#38838F]  rounded-lg invisible lg:visible`}>{lp.name}</div>
            ),
          });
          break;
        case "Central Midfield":
          arrLineup.squad.cm.push({
            number: lp.shirtNumber,
            name: (
              <div className={`p-2 bg-[#38838F]  rounded-lg invisible lg:visible`}>{lp.name}</div>
            ),
          });
          break;
        case "Attacking Midfield":
          arrLineup.squad.fw.push({
            number: lp.shirtNumber,
            name: (
              <div className={`p-2 bg-[#38838F]  rounded-lg invisible lg:visible`}>{lp.name}</div>
            ),
          });
          break;
        case "Right Winger":
          arrLineup.squad.fw.push({
            number: lp.shirtNumber,
            name: (
              <div className={`p-2 bg-[#38838F]  rounded-lg invisible lg:visible`}>{lp.name}</div>
            ),
          });
          break;
        case "Centre-Forward":
          arrLineup.squad.fw.push({
            number: lp.shirtNumber,
            name: (
              <div className={`p-2 bg-[#38838F]  rounded-lg invisible lg:visible`}>{lp.name}</div>
            ),
          });
          break;

        default:
          arrLineup.squad.fw.push({
            number: lp.shirtNumber,
            name: (
              <div className={`p-2 bg-[#38838F]  rounded-lg invisible lg:visible`}>{lp.name}</div>
            ),
          });
          break;
      }
    });
    return arrLineup;
  };

  // console.log(match?.homeTeam.lineup);
  // console.log(match?.awayTeam.lineup);

  return (
    <CLoading loading={loading}>
      <div className="">
        <div className="bg-gray-200 dark:bg-gray-700 text-center py-2 flex justify-around items-center gap-2">
          <div className="">{match?.homeTeam.formation}</div>
          <div>
            <FontAwesomeIcon icon={faPeopleLine} className="text-base pr-2" />
            <span>LINE UP</span>
          </div>
          <div className="">{match?.awayTeam.formation}</div>
        </div>
        <div className="mb-2">
          <SoccerLineUp
            size={"responsive"}
            // pattern={"squares"}
            homeTeam={{
              ...convertArr(match?.homeTeam.lineup!),
              //   color: "lightblue",
            }}
            awayTeam={{
              ...convertArr(match?.awayTeam.lineup!),
              //   color: "red",
            }}
          />
        </div>
      </div>
      <div className="">
        <div className="bg-gray-200 dark:bg-gray-700 mb-1 text-center py-2">
          <FontAwesomeIcon icon={faShirt} className="text-base pr-2" />
          <span>SUBSTITUTES</span>
        </div>
        <div className="grid grid-cols-2 font-normal">
          <div className="lg:col-span-1 col-span-2">
            {match?.homeTeam.bench.map((bench: Bench, i: number) => {
              return (
                <div
                  key={i}
                  onClick={()=>{
                    navigate(
                      `/dashboard/${rootInfoMatch.competition.type.toLowerCase()}-${
                        rootInfoMatch.competition.code
                      }-${new Date(
                        rootInfoMatch.season.startDate!
                      ).getFullYear()}/team/${match?.homeTeam.id}/player/${
                        bench?.id
                      }`
                    )
                  }}
                  className="flex py-3 border-b border-gray-200 w-full whitespace-nowrap cursor-pointer hover:font-semibold"
                >
                  <div className="w-14 pr-2">No. {bench.shirtNumber}</div>
                  <span className="capitalize">{`${bench.name} (${
                    bench.position
                      ? Utils.removeSpecialKey(bench.position?.toString()!, "-")
                      : "Not Data"
                  })`}</span>
                </div>
              );
            })}
          </div>
          <div className="lg:col-span-1 col-span-2">
            {match?.awayTeam.bench.map((bench2: Bench2, i: number) => {
              return (
                <div
                  key={i}
                  onClick={()=>{
                    navigate(
                      `/dashboard/${rootInfoMatch.competition.type.toLowerCase()}-${
                        rootInfoMatch.competition.code
                      }-${new Date(
                        rootInfoMatch.season.startDate!
                      ).getFullYear()}/team/${match?.awayTeam.id}/player/${
                        bench2?.id
                      }`
                    )
                  }}
                  className="flex justify-end py-3 border-b border-gray-200 w-full whitespace-nowrap cursor-pointer hover:font-semibold"
                >
                  <span className="capitalize">{`${bench2.name} (${
                    bench2.position
                      ? Utils.removeSpecialKey(
                          bench2.position?.toString()!,
                          "-"
                        )
                      : "Not Data"
                  })`}</span>
                  <div className="w-14 pl-2 text-right">
                    No. {bench2.shirtNumber}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="">
        <div className="bg-gray-200 dark:bg-gray-700 mb-1 text-center py-2">
          <FontAwesomeIcon icon={faUser} className="text-base pr-2" />
          <span>COACHES</span>
        </div>
        <div className="flex justify-around font-normal">
          <div className="py-3">
            {`${match?.homeTeam.coach.name} (${match?.homeTeam.coach.nationality})`}
          </div>
          <div className="py-3">
            {`${match?.awayTeam.coach.name} (${match?.awayTeam.coach.nationality})`}
          </div>
        </div>
      </div>
    </CLoading>
  );
};

export default React.memo(CLineUp);

// disable-eslint
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ICompetitionStandings, Standing } from "../../@types/competition_standings";
import { useDispatchRoot, useSelectorRoot } from "../../redux/hooks";
import { RootState } from "../../redux/rootReducer";
import { DataFake } from "../../common/dataFake";
import { fetchCompetitionStandings } from "../../redux/controller/football.slice";
import CardStanding from "./components/CardStandings";
import { Props } from "../../@types/define";
import CBox from "../../components/CBox";
import Utils from "../../common/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import TableStanding from "./components/TableStanding,";

const Matches: React.FC<Props> = () => {
  const { competitionCode } = useParams();
  const dispatch = useDispatchRoot();
  const { rootCompetitions, rootCompetitionsStanding } = useSelectorRoot(
    (state: RootState) => state.football
  );

  // const rootCompetitionsStanding: ICompetitionStandings =
  //   DataFake.CompetitionsStandings();

  // console.log(rootCompetitionsStanding);
  // console.log(competitionCode?.split("_"));

  useEffect(() => {
    dispatch(fetchCompetitionStandings(competitionCode?.split("_")[1]!));
  }, [competitionCode]);
  return (
    <div className="">
      <CBox>
        <div className="py-10 flex items-center">
          <LazyLoadImage
            effect="blur"
            className="h-10 pr-2"
            src={rootCompetitionsStanding.area.flag}
            alt=""
          />
          <LazyLoadImage
            effect="blur"
            className="h-10 pr-2"
            src={rootCompetitionsStanding.competition.emblem}
            alt=""
          />
          <div>
            <div className="text-lg text-violet dark:text-yellow font-semibold">
              {rootCompetitionsStanding.competition.name}
            </div>
            <div className="text-xs opacity-70">{`Season ${Utils.formatTime(
              rootCompetitionsStanding.season.startDate,
              "yyyy"
            )}-${Utils.formatTime(
              rootCompetitionsStanding.season.endDate,
              "yyyy"
            )}`}</div>
          </div>
        </div>
        {rootCompetitionsStanding.competition.type.toLowerCase() ===
        "league" ? (
          <TableStanding standing={rootCompetitionsStanding.standings.find((e: Standing) => e.type === "TOTAL")!} />
        ) : (
          <CardStanding
            standings={rootCompetitionsStanding.standings}
            type={rootCompetitionsStanding.competition.type}
          />
        )}
      </CBox>
    </div>
  );
};

export default Matches;

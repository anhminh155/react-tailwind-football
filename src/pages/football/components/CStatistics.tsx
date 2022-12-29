import React from "react";
import { Props } from "types/define";
import { useSelectorRoot } from "redux/hooks";
import { RootState } from "redux/rootReducer";
import { IInfoMatch, Statistics } from "types/infoMatch";
import Utils from "common/utils";
import CLoading from "components/CLoading";

interface ICStatistics extends Props {
  loading?: boolean;
  match: IInfoMatch;
}

const CStatistics: React.FC<ICStatistics> = ({ match, loading, ...props }) => {
  const {} = useSelectorRoot((state: RootState) => state.football);

  //Data fake
  // const match: any = DataFake.InfoMatch();

  // const RenderProgress = (key: keyof Statistics) => {
  //   const statisticsHome: Statistics = match.homeTeam.statistics;
  //   const statisticsAway: Statistics = match.awayTeam.statistics;
  //   if (
  //     match.homeTeam.statistics[key] === 0 &&
  //     match.awayTeam.statistics[key] === 0
  //   ) {
  //     return (
  //       <div>
  //         <div className="bg-gray-200 dark:bg-gray-700 text-center py-2">
  //           <span className="uppercase ">
  //             {Utils.removeSpecialKey(key.toString(), "_")}
  //           </span>
  //         </div>
  //         <div className="flex py-4 gap-2">
  //           <span className="w-20">0%</span>
  //           <div className="w-full bg-gray-200 dark:bg-gray-700/70 h-4 dark:bg-gray-200">
  //             <div
  //               className="bg-violet dark:bg-yellow h-4 rounded-l-lg float-right"
  //               style={{
  //                 width: "0%",
  //               }}
  //             />
  //           </div>
  //           <div className="w-full bg-gray-200 dark:bg-gray-700/70 h-4 dark:bg-gray-200">
  //             <div
  //               className="bg-violet dark:bg-yellow h-4 rounded-r-lg"
  //               style={{
  //                 width: "0%",
  //               }}
  //             />
  //           </div>
  //           <span className="w-20 text-right">0%</span>
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         <div className="bg-gray-200 dark:bg-gray-700 text-center py-2">
  //           <span className="uppercase ">
  //             {Utils.removeSpecialKey(key.toString(), "_")}
  //           </span>
  //         </div>
  //         <div className="flex py-4 gap-2">
  //           <span className="w-20">
  //             {(
  //               (statisticsHome[key] /
  //                 (statisticsHome[key] + statisticsAway[key])) *
  //               100
  //             ).toFixed(0)}
  //             %
  //           </span>
  //           <div className="w-full bg-gray-200 dark:bg-gray-700/70 h-4 dark:bg-gray-200 ">
  //             <div
  //               className="bg-violet dark:bg-yellow h-4 rounded-l-lg float-right"
  //               style={{
  //                 width: `${(
  //                   (statisticsHome[key] /
  //                     (statisticsHome[key] + statisticsAway[key])) *
  //                   100
  //                 ).toFixed(0)}%`,
  //               }}
  //             />
  //           </div>
  //           <div className="w-full bg-gray-200 dark:bg-gray-700/70 h-4 dark:bg-gray-200 ">
  //             <div
  //               className="bg-violet dark:bg-yellow h-4 rounded-r-lg"
  //               style={{
  //                 width: `${(
  //                   (statisticsAway[key] /
  //                     (statisticsHome[key] + statisticsAway[key])) *
  //                   100
  //                 ).toFixed(0)}%`,
  //               }}
  //             />
  //           </div>
  //           <span className="w-20 text-right">
  //             {(
  //               (statisticsAway[key] /
  //                 (statisticsHome[key] + statisticsAway[key])) *
  //               100
  //             ).toFixed(0)}
  //             %
  //           </span>
  //         </div>
  //       </div>
  //     );
  //   }
  // };
  return (
    <CLoading loading={loading}>
      {/* {Object.keys(match.homeTeam.statistics).map((key: any, i: number) => {
        return <span key={i}>{RenderProgress(key)}</span>;
      })} */}
    </CLoading>
  );
};

export default React.memo(CStatistics);

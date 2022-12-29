import React, { useEffect, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Scorer } from "types/competition_scorers";
import { Props } from "types/define";
import Utils from "common/utils";
import CLoading from "components/CLoading";

interface ITableScorers extends Props {
  scorers: Scorer[] | any;
  loading?: boolean;
  onMore: any;
}

const TableScorers: React.FC<ITableScorers> = ({
  scorers,
  loading = false,
  onMore,
}) => {
  const moreEndRef = useRef<HTMLInputElement | any>(null);

  const scrollToBottom = () => {
    moreEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (scorers.length > 10) {
      scrollToBottom();
    }
  }, [scorers]);

  return (
    <div className="">
      <div className="flex flex-col select-none">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 pb-3">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <CLoading loading={loading}>
              <div className={`overflow-hidden sm:rounded-lg `}>
                <table className="min-w-full text-sm text-gray-700 dark:text-white">
                  <thead className="dark:bg-gray-800 bg-gray-600 text-xs uppercase font-medium">
                    <tr className="text-white">
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Rank
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Age
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Team
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Goals
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Assists
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Penalties
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        position
                      </th>
                    </tr>
                  </thead>
                  <tbody className="dark:bg-gray-800 bg-white ">
                    {scorers.map((scorer: Scorer, i: number) => {
                      return (
                        <tr
                          key={i}
                          ref={scorers.length - 10 === i ? moreEndRef : null}
                          onClick={() => {
                            console.log(scorer);
                          }}
                          className="dark:bg-dark hover:dark:bg-gray-700 hover:bg-gray-400 hover:text-white cursor-pointer"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            {i + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-medium">
                              {scorer.player.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {Utils.getAge(scorer.player.dateOfBirth)}
                          </td>
                          <td className="flex px-6 py-4 whitespace-nowrap items-center">
                            <LazyLoadImage
                              effect="blur"
                              className="w-5"
                              src={scorer.team.crest}
                              alt=""
                            />
                            <span className="ml-2 font-medium">
                              {scorer.team.shortName}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            {scorer.goals ?? "0"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {scorer.assists ?? "0"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {scorer.penalties ?? "0"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {scorer.player.position}
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="bg-gray-200 dark:bg-gray-800 hover:dark:bg-gray-900 hover:bg-gray-600 text-violet dark:text-white hover:text-white cursor-pointer text-md transition ease-out duration-600">
                      <td
                        onClick={onMore}
                        colSpan={8}
                        className="text-center py-3 "
                      >
                        <span className="animate-pulse">More 10 player...</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CLoading>
          </div>
        </div>
      </div>
      {/* Component End  */}
    </div>
  );
};

export default React.memo(TableScorers);

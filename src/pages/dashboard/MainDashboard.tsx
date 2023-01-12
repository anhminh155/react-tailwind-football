import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import CChatBox from "components/CChatbox";
import CLoading from "components/CLoading";
import {
  format,
  getYear,
  isMonday,
  isSunday,
  nextSunday,
  previousMonday,
} from "date-fns";
import { db } from "firebase-config";
import { ref } from "firebase/database";
import CMatchNoFilter from "pages/football/components/CMatchNoFilter";
import React, { useEffect } from "react";
import { useObject } from "react-firebase-hooks/database";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { fetchMatches } from "redux/controller/football.slice";
import { useDispatchRoot, useSelectorRoot } from "redux/hooks";
import { RootState } from "redux/rootReducer";
import CBreadcrumb from "../../components/CBreadcrumb";

type Props = {};

const MainDashboard: React.FC<Props> = () => {
  const dispatch = useDispatchRoot();
  const { rootMatches, rootCompetitions, loadingMatch } = useSelectorRoot(
    (state: RootState) => state.football
  );
  const { user } = useSelectorRoot((state: RootState) => state.app);
  const navigate = useNavigate();
  const [listFollowCompetition, loading, error] = useObject(
    ref(db, `users/${user?.uid}/football/competition`)
  );

  // console.log(listFollowCompetition?.val());

  useEffect(() => {
    dispatch(
      fetchMatches({
        dateFrom: isMonday(new Date())
          ? format(new Date(), "yyyy-MM-dd")
          : format(previousMonday(new Date()), "yyyy-MM-dd"),
        dateTo: isSunday(new Date())
          ? format(new Date(), "yyyy-MM-dd")
          : format(nextSunday(new Date()), "yyyy-MM-dd"),
      })
    );
    //eslint-disable-next-line
  }, []);

  return (
    <div className="">
      <CBreadcrumb />
      <CChatBox />

      <div className="w-ful">
        <CLoading
          loading={loadingMatch}
          className="mx-auto w-full rounded-2xl bg-white dark:bg-gray-500  p-2"
        >
          <div className="text-xl font-bold py-2">Football weekly</div>
          {rootMatches.resultSet.competitions
            .split(",")
            .map((code: string, i: number) => {
              const competition = rootCompetitions.competitions.find(
                (competition) => competition.code === code
              );
              return (
                <Disclosure
                  key={i}
                  as="div"
                  defaultOpen={i === 0 ? true : true}
                  className={`${i > 0 ? "mt-2" : ""}`}
                >
                  {({ open }) => {
                    return (
                      <>
                        <Disclosure.Button className="flex w-full justify-between bg-gray-200 dark:bg-gray-900 p-2">
                          <div
                            onClick={() =>
                              navigate(
                                `${competition?.type?.toLocaleLowerCase()}-${
                                  competition?.code
                                }-${getYear(
                                  new Date(
                                    competition?.currentSeason.startDate!
                                  )
                                )}`
                              )
                            }
                            className="flex items-center uppercase hover:font-bold"
                          >
                            <LazyLoadImage
                              effect="blur"
                              className="h-7 pr-2"
                              src={competition?.emblem}
                              alt=""
                            />
                            <span>{`${competition?.name} (${competition?.area.name})`}</span>
                          </div>
                          <ChevronUpIcon
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-violet dark:text-yellow`}
                          />
                        </Disclosure.Button>
                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel className="-mt-2 p-2 dark:bg-gray-900 bg-gray-200">
                            <CMatchNoFilter
                              showLeague={false}
                              dataMatch={rootMatches.matches.filter(
                                (matches) => matches.competition.code === code
                              )}
                            />
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    );
                  }}
                </Disclosure>
              );
            })}
        </CLoading>
      </div>
    </div>
  );
};

export default MainDashboard;

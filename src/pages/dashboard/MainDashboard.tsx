import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import CLoading from "components/CLoading";
import {
  format,
  getYear,
  isMonday,
  isSunday,
  nextMonday,
  nextSunday,
  nextWednesday,
  previousMonday,
} from "date-fns";
import CMatchNoFilter from "pages/football/components/CMatchNoFilter";
import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { fetchMatches } from "redux/controller/football.slice";
import { useDispatchRoot, useSelectorRoot } from "redux/hooks";
import { RootState } from "redux/rootReducer";
import CBreadcrumb from "../../components/CBreadcrumb";

type Props = {};

const MainDashboard: React.FC<Props> = () => {
  const { rootMatches, rootCompetitions, loadingMatch } = useSelectorRoot(
    (state: RootState) => state.football
  );
  const navigate = useNavigate();

  const dispatch = useDispatchRoot();
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
  }, []);

  return (
    <div className="">
      <CBreadcrumb />
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

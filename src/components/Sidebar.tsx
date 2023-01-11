/** disable-eslint */
import React, { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useLocation } from "react-router-dom";
import { AdminRoutes } from "../routes";
import ProfileMenu from "./ProfileMenu";
import appLogo from "../assets/img/applogo.png";
import { useDispatchRoot, useSelectorRoot } from "../redux/hooks";
import { fetchCompetitions } from "../redux/controller/football.slice";
import { Competition } from "types/competition";
import { EnumTypes } from "types/lookup_tables";
import { RootState } from "../redux/rootReducer";
import { getYear } from "date-fns";

type Props = {};

const Sidebar: React.FC<Props> = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuActive, setMenuActive] = useState("");
  const [collapse, setCollapse] = useState(true);
  const dispatch = useDispatchRoot();
  const { rootCompetitions } = useSelectorRoot(
    (state: RootState) => state.football
  );
  const [newRouter, setNewRouter] = useState(AdminRoutes);

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const location = useLocation();

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: any) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    const arrPath = location.pathname.split("/");
    setMenuActive(arrPath[2]);
  }, [location.pathname]);

  useEffect(() => {
    dispatch(fetchCompetitions({}));
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    let customRouter: any[] = [
      {
        name_var: "League",
        url_var: "league",
        icon_var: "ri-trophy-line",
        children: [],
      },
      {
        name_var: "Cup",
        url_var: "cup",
        icon_var: "ri-trophy-line",
        children: [],
      },
    ];

    const dataLeague = rootCompetitions.competitions.filter(
      (competition: Competition, i: number) =>
        competition.type === EnumTypes.CompetitionType.LEAGUE
    );
    const dataCup = rootCompetitions.competitions.filter(
      (competition: Competition, i: number) =>
        competition.type === EnumTypes.CompetitionType.CUP
    );

    dataLeague.forEach((competition: Competition) => {
      customRouter[0].children = [
        ...customRouter[0].children,
        {
          name_var: `${competition.name}`,
          url_var: `league-${competition.code}-${getYear(
            new Date(competition.currentSeason.startDate)
          )}`,
          icon_var: "",
          img_var: `${competition.emblem}`,
        },
      ];
    });
    dataCup.forEach((competition: Competition) => {
      // console.log(competition);
      customRouter[1].children = [
        ...customRouter[1].children,
        {
          name_var: `${competition.name}`,
          url_var: `cup-${competition.code}-${getYear(
            new Date(competition.currentSeason.startDate)
          )}`,
          icon_var: "",
          img_var: `${competition.emblem}`,
        },
      ];
    });
    setNewRouter([...AdminRoutes, ...customRouter]);
  }, [rootCompetitions]);

  const activePath = (path: string) => {
    if (location.pathname === "/dashboard") {
      if (path === "" || path === "/") {
        return true;
      }
    } else if (location.pathname === "/dashboard/" + path) {
      return true;
    } else {
      return false;
    }
  };

  const activeDrop = (path: string) => {
    if (location.pathname.includes(path.toLowerCase())) return true;
    else return false;
  };

  const handleShowSubMenu = (path: string) => {
    if (menuActive === path) {
      setMenuActive("");
    } else if (menuActive?.toLowerCase().includes(path.toLowerCase())) {
      setMenuActive("");
    } else {
      setMenuActive(path);
    }
  };

  const getRoutesPath = () => {
    return newRouter.map(
      ({ name_var, url_var, icon_var, children }: any, key: number) => (
        <div key={key} className="w-full">
          {children && children.length > 0 ? (
            <div>
              <div
                className={`px-4 py-1 -my-1 cursor-pointer ${
                  activeDrop(url_var) || menuActive === url_var
                    ? "text-violet dark:text-yellow font-semibold"
                    : "text-black dark:text-white"
                } flex justify-between items-center text-left transition duration-100 ease-in-out transform `}
                onClick={() => {
                  handleShowSubMenu(url_var);
                }}
              >
                <div className="flex item-center">
                  <i className={`${icon_var} mr-3`}></i>
                  <p>{name_var}</p>
                </div>
                {activeDrop(url_var) || menuActive === url_var ? (
                  <i className="ri-arrow-drop-down-line text-2xl"></i>
                ) : (
                  <i className="ri-arrow-drop-right-line text-2xl"></i>
                )}
              </div>
              <ul
                className={`${
                  menuActive?.includes(url_var)
                    ? "block py-1 ml-5 transition duration-500 ease-in-out transform "
                    : "hidden"
                }`}
              >
                {children.map(
                  ({ url_var, name_var, img_var }: any, key: number) => (
                    <li key={key}>
                      <Link
                        to={url_var}
                        onClick={() => {
                          setSidebarOpen(false);
                        }}
                        className={`ml-1.5 px-4 py-2.5 rounded-lg my-1 hover:scale-105 ${
                          activePath(url_var)
                            ? "text-violet dark:text-yellow bg-secondary rounded font-semibold"
                            : "text-black dark:text-white"
                        } block transition duration-150`}
                      >
                        <div className="flex">
                          {img_var ? (
                            <span className="mr-2 flex items-center justify-center ">
                              <LazyLoadImage
                                effect="blur"
                                style={{ minWidth: 24, height: 24 }}
                                className="rounded-full ring-2 ring-gray-200 dark:ring-gray-200"
                                src={img_var}
                                alt=""
                              />
                            </span>
                          ) : (
                            ""
                          )}
                          <p className="overflow-clip">{name_var}</p>
                        </div>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ) : (
            <div
              onClick={() => {
                setSidebarOpen(false);
              }}
            >
              <Link
                to={url_var}
                className={`flex item-center px-4 py-2.5 -my-1 rounded-lg ${
                  activePath(url_var)
                    ? "text-violet dark:text-yellow bg-secondary rounded"
                    : "text-black dark:text-white"
                } hover:dark:text-white cursor-pointer transition duration-100 ease-in-out transform hover:scale-105`}
              >
                <i className={`${icon_var} mr-3`}></i>
                <p>{name_var}</p>
              </Link>
            </div>
          )}
        </div>
      )
    );
  };

  const getRoutesPathUnCollapses = () => {
    return newRouter.map(
      ({ url_var, icon_var, children }: any, key: number) => (
        <div key={key} className="relative flex justify-center">
          {children && children.length > 0 ? (
            <div>
              <div
                className={`mb-1 cursor-pointer ${
                  activeDrop(url_var) || menuActive === url_var
                    ? "text-violet dark:text-yellow scale-150"
                    : "text-black dark:text-white"
                } hover:dark:text-white text-black mb-2.5 transition duration-300 ease-in-out transform hover:scale-150`}
                onMouseEnter={() => handleShowSubMenu(url_var)}
                onClick={() => handleShowSubMenu(url_var)}
              >
                <i className={`${icon_var} `}></i>
              </div>
              <ul
                className={`${
                  menuActive === url_var
                    ? "dark:bg-dark  bg-gray-200 absolute top-0 left-12 2xl:left-20 z-50 pl-2 pr-5 w-max rounded"
                    : "hidden"
                }`}
              >
                {children.map(
                  ({ url_var, name_var, icon_var }: any, key: number) => (
                    <li key={key}>
                      <Link
                        to={url_var}
                        onClick={() => setSidebarOpen(false)}
                        className={`px-4 py-2.5 rounded-lg my-1 ${
                          activePath(url_var)
                            ? "text-violet dark:text-yellow bg-secondary rounded -mr-3"
                            : "text-black dark:text-white"
                        } hover:dark:text-white hover:scale-105 text-black block transition`}
                      >
                        <div className="flex items-center">
                          <i className={`${icon_var} mr-3`}></i>
                          <p>{name_var}</p>
                        </div>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ) : (
            <Link
              to={url_var}
              onClick={() => setSidebarOpen(false)}
              className={`${
                activePath(url_var)
                  ? "text-violet dark:text-yellow scale-150"
                  : "text-black dark:text-white"
              } mb-2.5 hover:dark:text-white text-black transition duration-500 ease-in-out transform hover:scale-150`}
            >
              <i className={`${icon_var} `}></i>
            </Link>
          )}
        </div>
      )
    );
  };

  return (
    <>
      <div className={`z-20 border-r text-base select-none`}>
        {/* SIDEBAR MOBILE */}
        <div
          className={`fixed inset-0 dark:bg-dark bg-opacity-60 z-40 md:hidden md:z-auto transition-opacity duration-200 ${
            sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className="md:hidden sticky top-0 w-full pb-2 px-4 sm:px-6 lg:px-8 z-30">
          <div className="flex items-center justify-between pt-4 pb-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="inline-flex items-center justify-center p-1 rounded-md hover:dark:bg-dark hover:dark:text-white text-black outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark"
            >
              {sidebarOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            {/* Header */}
            <div className="flex h-full justify-between items-center">
              <span />
              <ProfileMenu />
            </div>
          </div>
          <h1>Dashboard</h1>
        </div>

        {/* SIDEBAR */}
        <div
          id="sidebar"
          ref={sidebar}
          className={`absolute z-40 left-0 top-0 md:static md:left-auto md:top-auto h-screen
          2xl:bg-soft bg-white dark:bg-zinc-800
          md:dark:bg-dark md:translate-x-0 transform transition-all duration-700 ease-in-out
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} ${
            collapse ? "w-64 2xl:w-72" : "md:w-[4.4rem] 2xl:w-[5rem]"
          } `}
        >
          <div
            className={`overflow-y-auto overflow-x-hidden h-full flex flex-col items-center dark:text-white text-black text-left`}
          >
            <div
              className="cursor-pointer z-10 w-full px-4 mb-8 mt-3.5"
              onClick={() => (window.location.href = "/dashboard")}
            >
              {collapse ? (
                <div className="flex items-center py-5">
                  <LazyLoadImage
                    effect="blur"
                    src={appLogo}
                    className="w-8 mr-3.5"
                    alt=""
                  />
                  <h1 className="text-2xl font-bold text-black dark:text-white select-none">
                    Football
                  </h1>
                </div>
              ) : (
                <div className="flex justify-center items-center mt-3.5">
                  <LazyLoadImage
                    effect="blur"
                    src={appLogo}
                    alt=""
                    className="w-8"
                  />
                </div>
              )}
            </div>

            {collapse ? (
              <div className="w-full space-y-4">{getRoutesPath()}</div>
            ) : (
              <div className="w-full h-full flex flex-col absolute top-24 transition-all duration-1000 space-y-3">
                {getRoutesPathUnCollapses()}
              </div>
            )}

            <button
              onClick={() => setCollapse(!collapse)}
              className={`hidden md:flex absolute ${
                collapse
                  ? "left-[14.9rem] 2xl:left-[16.8rem]"
                  : "left-[3.3rem] 2xl:left-[3.8rem]"
              } top-6 justify-center items-center bg-gray-300 dark:bg-gray-700 dark:border-gray-50 dark:border-2
                            dark:text-white text-black rounded-full shadow-lg w-9 h-9 hover:scale-125 transform transition-all duration-700 ease-in-out z-10`}
            >
              {collapse ? (
                <i className="ri-arrow-left-s-line text-2xl"></i>
              ) : (
                <i className="ri-arrow-right-s-line text-2xl"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

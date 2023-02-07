/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ProfileMenu from "components/ProfileMenu";
import Sidebar from "components/Sidebar";
import NotFound from "pages/dashboard/NotFound";
import { dashboardRoutes } from "routes";
import { auth, dbRef } from "firebase-config";
import { useDispatchRoot } from "redux/hooks";
import { setUser } from "redux/controller/app.slice";
import { child, get } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import CChatbox from "components/CChatbox";
import TimezoneSelect from "react-timezone-select";
import Utils from "common/utils";
import CModal from "components/modals/CModal";
import CButton from "components/CButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import img from "../assets/img/err.png";

// MAIN ROUTE
const getRoutes = () => {
  return dashboardRoutes.map((data, key) => {
    return <Route path={data.path} element={data.component} key={key} />;
  });
};

type Props = {};

const Dashboard: React.FC<Props> = () => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatchRoot();
  const [isShowChat, setIsShowChat] = useState<boolean>(false);
  const location = useLocation();
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement | any>(null);
  const [showModal, setShowModal] = useState<boolean>(true);

  // console.log(Utils.formatWithTimeZone(new Date, 'HH:mm'));

  //Handle timezone
  const [selectedTimezone, setSelectedTimezone] = useState<any>(
    Utils.getValueLocalStorage("timezone") ??
      Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  useEffect(() => {
    const tz = Utils.getValueLocalStorage("timezone");
    if (!tz) {
      Utils.setLocalStorage(
        "timezone",
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );
      setSelectedTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } else {
      setSelectedTimezone(tz);
    }
  }, []);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    if (user) {
      if (user.photoURL) {
        dispatch(setUser(JSON.stringify(user)));
      } else {
        get(child(dbRef, `users/${user.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              dispatch(
                setUser(
                  JSON.stringify({
                    ...user,
                    displayName: snapshot.val().displayName,
                    photoURL: snapshot.val().photoURL,
                  })
                )
              );
            } else {
              dispatch(
                setUser(
                  JSON.stringify({
                    ...user,
                    photoURL: `https://ui-avatars.com/api/?name=${user?.displayName}&background=152e4d&color=fff`,
                  })
                )
              );
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
      // console.log(user);
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // const uid = user.uid;
      // navigate('/dashboard')
      // ...
    } else {
      dispatch(setUser(null!));
      // User is signed out
      // ...
    }

    //eslint-disable-next-line
  }, [user]);

  return (
    <>
      {showModal ? (
        <CModal
          className="p-2"
          show={showModal}
          closeModal={(e: boolean) => setShowModal(e)}
        >
          <div className="p-2">
            <h1 className="text-lg font-bold">Notification</h1>
            <p>
              Due to this being a personal demo website, there are still some
              limitations.
            </p>
            <p>
              Please access the following link to access the CROS API:{" "}
              <a
                className="text-blue-700 italic"
                href="https://cors-anywhere.herokuapp.com/corsdemo"
                target="_blank"
              >
                https://cors-anywhere.herokuapp.com/corsdemo
              </a>
              <LazyLoadImage
                            effect="blur"
                            src={img}
                            alt=""
                            className="border"
                          />
            </p>
            <p className="pb-2">and click on the <span className="font-semibold">"Request temporary access to the demo server"</span> button, to temporarily restore the full functionality of CORS Anywhere for your client only.</p>
            <p>Sorry for the inconvenience.</p>
            <CButton
              onClick={() => setShowModal(false)}
              type="submit"
              className="bg-red-600 text-white hover:bg-red-500 mt-3"
            >
              Close
            </CButton>
          </div>
        </CModal>
      ) : (
        <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden font-poppins bg-soft dark:bg-dark text-dark font-medium transform transition-all duration-500 ease-in-out dark:text-white">
          <Sidebar />
          <div className="w-full overflow-x-hidden overflow-y-auto h-screen flex flex-col">
            {/* HEADER */}
            <div className="select-none hidden md:flex items-center h-[4.5rem] dark:bg-dark bg-soft pl-10 py-3 pr-5 sticky top-0 z-10 border-b transform transition-all duration-700 ease-in-out">
              <div className="flex w-full justify-between items-center z-40">
                {/* Dashboard */}
                {/* <h1 className="font-bold text-xl dark:text-white">
              </h1> */}
                <div className="select-wrapper">
                  <TimezoneSelect
                    className="text-gray-800"
                    value={selectedTimezone}
                    onChange={(tz) => {
                      Utils.setLocalStorage("timezone", tz);
                      setSelectedTimezone(tz);
                    }}
                  />
                </div>
                <ProfileMenu />
              </div>
            </div>
            <div className="relative">
              <span ref={ref} className="absolute -top-52"></span>
              {/* DASHBOARD CONTENT */}
              <div className="p-2 md:p-6 dark:bg-[#1e2836] h-full">
                <Routes>
                  {getRoutes()}
                  <Route path="*" element={<NotFound />} />
                  <Route
                    path="/"
                    element={<Navigate replace to="/dashboard" />}
                  />
                </Routes>
              </div>
              {/* FOOTER */}
              {/* <div className="sticky right-0 bottom-0 w-full flex items-center justify-between bg-soft p-5 px-3 md:px-5 mt-auto text-xs md:text-base dark:bg-dark dark:text-white dark:border-white border-t">
              <p>Football app</p>
              <p>{new Date().getFullYear()} © CompanyName v2.0</p>
            </div> */}
            </div>
            {location.pathname === "/dashboard" ? (
              <></>
            ) : (
              <div className={`z-40`}>
                <div
                  onClick={() => setIsShowChat(!isShowChat)}
                  className={`${
                    isShowChat ? "hidden" : ""
                  } absolute bottom-4 right-4 h-14 w-14 rounded-full bg-blue-600/40 hover:bg-blue-600 cursor-pointer flex justify-center items-center`}
                >
                  <i className="ri-chat-3-fill text-3xl text-blue-50"></i>
                </div>
                {isShowChat ? (
                  <div
                    // onBlur={() => setIsShowChat(false)}
                    className={`absolute bg-gray-500 p-2 transition-all ease-in duration-200 ${
                      fullScreen
                        ? "h-screen top-0 right-0 w-full z-50"
                        : "bottom-4 right-4 w-5/6 md:w-[500px] lg:w-[800px] rounded-xl shadow-2xl"
                    } `}
                  >
                    <div
                      onClick={() => setIsShowChat(false)}
                      className="absolute right-2 top-1 cursor-pointer hover:bg-white p-1 px-2 rounded-lg transition-all ease-in-out"
                    >
                      <i className="ri-close-line text-xl"></i>
                    </div>
                    <div
                      onClick={() => setFullScreen(!fullScreen)}
                      className="absolute right-12 top-1 cursor-pointer hover:bg-white p-1 px-2 rounded-lg transition-all ease-in-out"
                    >
                      <i
                        className={`${
                          fullScreen
                            ? "ri-fullscreen-exit-line"
                            : "ri-fullscreen-line"
                        } text-xl`}
                      ></i>
                    </div>
                    <div className="text-white pt-1 py-2">Chat Room</div>
                    <CChatbox
                      className={`${fullScreen ? "h-[98%]" : "h-96"}`}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

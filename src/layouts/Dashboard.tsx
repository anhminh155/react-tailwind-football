import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProfileMenu from "components/ProfileMenu";
import Sidebar from "components/Sidebar";
import NotFound from "pages/dashboard/NotFound";
import { dashboardRoutes } from "routes";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "firebase-config";
import { useDispatchRoot } from "redux/hooks";
import { setUser } from "redux/controller/app.slice";

// MAIN ROUTE
const getRoutes = () => {
  return dashboardRoutes.map((data, key) => {
    return <Route path={data.path} element={data.component} key={key} />;
  });
};

type Props = {};

const Dashboard: React.FC<Props> = () => {
  const authToken = sessionStorage.getItem("Auth Token");
  const dispatch = useDispatchRoot();

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        // console.log(user);
        dispatch(setUser(JSON.stringify(user)));
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
    });
    //eslint-disable-next-line
  }, [authToken]);

  return (
    <>
      <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden font-poppins bg-soft dark:bg-dark text-dark font-medium transform transition-all duration-500 ease-in-out dark:text-white">
        <Sidebar />
        <div className="w-full overflow-x-hidden overflow-y-auto h-screen flex flex-col">
          {/* HEADER */}
          <div className="select-none hidden md:flex items-center h-[4.5rem] dark:bg-dark bg-soft pl-10 py-3 pr-5 sticky top-0 z-10 border-b transform transition-all duration-700 ease-in-out">
            <div className="flex w-full justify-between items-center z-40">
              <h1 className="font-bold text-xl dark:text-white">Dashboard</h1>
              <ProfileMenu />
            </div>
          </div>
          <div className="relative">
            {/* DASHBOARD CONTENT */}
            <div className="p-6 dark:bg-[#1e2836] h-full">
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
        </div>

        <ToastContainer
          position="bottom-left"
          theme="dark"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
};

export default Dashboard;

import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AuthRoutes } from "../routes";
import NotFound from "../pages/dashboard/NotFound";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "firebase-config";

// MAIN ROUTE
const getRoutes = () => {
  return AuthRoutes.map((data, key) => {
    return <Route path={data.path} element={data.component} key={key} />;
  });
};

type Props = {};

const Auth: React.FC<Props> = () => {
  const navigate = useNavigate();
  const authToken = sessionStorage.getItem("Auth Token");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
        // console.log(user);
        
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        // navigate('/dashboard')
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
    //eslint-disable-next-line
  }, [authToken]);

  return (
    <>
      <div className="bg-[#eee] min-h-screen flex justify-center items-center font-poppins">
        <div className="flex justify-center w-[1366px]">
          <div className=" w-full md:w-2/3 h-full bg-white 2xl:rounded-tl-xl 2xl:rounded-bl-xl text-dark p-5 rounded-lg">
            <Routes>
              {getRoutes()}

              <Route path="*" element={<NotFound />} />
              <Route
                path="/"
                element={<Navigate replace to="/auth/sign-in" />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;

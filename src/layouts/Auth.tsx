import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../routes";
import NotFound from "../pages/dashboard/NotFound";

const BG = [
  require("../assets/img/bg1.jpg"),
  require("../assets/img/bg2.jpg"),
  require("../assets/img/bg3.jpg"),
  require("../assets/img/bg4.jpg"),
  require("../assets/img/bg5.jpg"),
  require("../assets/img/bg6.jpg"),
];

// MAIN ROUTE
const getRoutes = () => {
  return AuthRoutes.map((data, key) => {
    return <Route path={data.path} element={data.component} key={key} />;
  });
};

type Props = {};

const Auth: React.FC<Props> = () => {
  const [bgImage, setBgImage] = useState(BG[0]);

  useEffect(() => {
    setBgImage(BG[Math.floor(Math.random() * BG.length)]);
  }, []);

  return (
    <>
      <div className="bg-[#eee] min-h-screen flex justify-center items-center font-poppins">
        <div className="relative w-[1366px] h-[768px]">
          <div className="absolute top-0 left-0 w-full md:w-1/2 h-full bg-white 2xl:rounded-tl-xl 2xl:rounded-bl-xl text-dark z-10">
            <Routes>
              {getRoutes()}

              <Route path="*" element={<NotFound />} />
              <Route
                path="/"
                element={<Navigate replace to="/auth/sign-in" />}
              />
            </Routes>
          </div>

          {/* <div className="hidden md:block h-full w-full object-fill z-0"> */}
          <LazyLoadImage
            effect="blur"
            src={bgImage}
            alt=""
            className="hidden md:block h-full w-full object-fill z-0 2xl:rounded-xl"
          />
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Auth;

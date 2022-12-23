import React from "react";
import CBox from "../../components/CBox";
import CBreadcrumb from "../../components/CBreadcrumb";

type Props = {};

const MainDashboard: React.FC<Props> = () => {
  return (
    <>
      <CBreadcrumb />
      <CBox>MainDashboard</CBox>
    </>
  );
};

export default MainDashboard;

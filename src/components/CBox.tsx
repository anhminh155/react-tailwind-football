import React from "react";
import { Props } from "../@types/define";

const CBox: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full rounded-lg bg-white dark:bg-dark">
      <div className=" px-8 py-10">{children}</div>
    </div>
  );
};

export default React.memo(CBox);

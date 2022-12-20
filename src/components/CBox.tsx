import React from "react";
import { Props } from "../@types/define";

const CBox: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full rounded-lg bg-white dark:bg-dark shadow-md">
      <div className="sm:px-2 md:px-3 lg:px-6 py-10">{children}</div>
    </div>
  );
};

export default React.memo(CBox);

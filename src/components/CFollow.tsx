import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import { Props } from "types/define";

interface ICFollow extends Props {
  active?: boolean;
  titleTooltip?: string;
  size?: SizeProp;
}
function CFollow({
  titleTooltip = "Follow",
  size = "sm",
  active = false,
  ...props
}: ICFollow) {
  return (
    <div className="">
      <div className="relative flex flex-col items-center group">
        <button
          {...props}
          className={`${active ? "text-yellow " : "text-gray-300"}`}
        >
          <i className={`ri-star-fill  text-${size}`}></i>
        </button>
        <div className="absolute bottom-2 flex-col items-center hidden mb-6 group-hover:flex">
          <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg rounded-md">
            {titleTooltip}
          </span>
          <div className="w-3 h-3 -mt-2 rotate-45 bg-black" />
        </div>
      </div>
    </div>
  );
}

export default React.memo(CFollow);

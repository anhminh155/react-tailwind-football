import React, { memo } from "react";

export type TooltipProps = {
  children: React.ReactNode;
  text: string;
};

const CTooltip: React.FC<TooltipProps> = memo((props) => {
  return (
    <span className="group relative">
      <span className="pointer-events-none absolute -top-[68px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black before:content-[''] group-hover:opacity-100">
        {props.text}
      </span>

      {props.children}
    </span>
  );
});

CTooltip.displayName = "Tooltip";

export default CTooltip;

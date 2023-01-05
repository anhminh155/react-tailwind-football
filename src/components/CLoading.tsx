import React from "react";
import { Props } from "types/define";

interface ICLoading extends Props {
  loading?: boolean;
  background?: string;
}
function CLoading({
  loading = false,
  background = "#4cc67a36",
  children,
}: ICLoading) {
  return (
    <div className="relative">
      <div>{children}</div>
      {loading ? (
        <div
          className={`flex items-start justify-center h-full rounded-md w-full absolute top-0 bg-[#242c3787]`}
        >
          <div className="box-football">
            <div className="shadow" />
            <div className="gravity">
              <div className="ball" />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default React.memo(CLoading);

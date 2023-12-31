import React, { SVGProps, memo } from "react";

const CloseIcon = ({ width, height, className }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width ?? "48"}
    height={height ?? "48"}
    className={className}
    viewBox="0 0 48 48"
  >
    <path d="M38 12.83 35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

export default memo(CloseIcon);

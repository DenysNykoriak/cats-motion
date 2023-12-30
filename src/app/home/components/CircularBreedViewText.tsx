import { motion } from "framer-motion";
import React, { memo } from "react";

// TODO: refactor to one component for circular text
const CircularBreedViewText = () => (
  <div className="relative">
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-lg font-bold">VIDEO</span>
    </div>
    <motion.svg
      xmlns="http://www.w7.org/2000/sve"
      xmlLang="en"
      viewBox="0 0 500 500"
      width="200"
      height="200"
      animate={{
        rotate: ["0deg", "360deg"],
        transition: {
          type: "keyframes",
          repeat: Infinity,
          repeatType: "loop",
          duration: 15,
          ease: "linear",
        },
      }}
    >
      <defs>
        <path
          id="textcircle"
          d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
          transform="rotate(12,250,250)"
        />
      </defs>

      <g>
        <text
          className="relative fill-primary font-lato text-4xl"
          style={{
            wordSpacing: "20px",
          }}
        >
          <textPath xlinkHref="#textcircle" xmlSpace="preserve">
            {`CAPSULE SS ${new Date().getFullYear()}    CAPSULE SS ${new Date().getFullYear()}`}
          </textPath>
        </text>
      </g>
    </motion.svg>
  </div>
);

export default memo(CircularBreedViewText);

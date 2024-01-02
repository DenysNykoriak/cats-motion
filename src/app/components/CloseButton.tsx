import React, { useRef, useState } from "react";

import CircularProgressBarIcon from "./icons/CircularProgressBarIcon";
import CloseIcon from "./icons/CloseIcon";

const HOLD_TIME_STEP = 1;
const HOLD_TIME_MS_INTERVAL = 10;
const HOLD_TIME_LIMIT = 50;

type Props = {
  onClose: () => void;
};

const CloseButton = ({ onClose }: Props) => {
  const [holdTime, setHoldTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startHoldCounter = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setHoldTime((prev) => Math.min(prev + HOLD_TIME_STEP, HOLD_TIME_LIMIT));
      }, HOLD_TIME_MS_INTERVAL);
    }
  };

  const stopHoldCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setHoldTime(0);
  };

  return (
    <button
      className="relative z-logo cursor-none rounded-full p-2"
      onClick={onClose}
      onMouseEnter={startHoldCounter}
      onMouseLeave={stopHoldCounter}
    >
      <div className="absolute left-0 top-0">
        <CircularProgressBarIcon
          size={44}
          progress={(holdTime * 100) / HOLD_TIME_LIMIT}
        />
      </div>
      <CloseIcon height={28} width={28} className="fill-primary" />
    </button>
  );
};

export default CloseButton;

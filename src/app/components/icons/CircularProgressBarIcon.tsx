import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import React, { memo, useEffect } from "react";

const STROKE_WIDTH = 2;

type Props = {
  size?: number;
  progress: number;
};

const CircularProgressBarIcon = ({ size = 48, progress }: Props) => {
  const center = size / 2;
  const radius = size / 2 - STROKE_WIDTH / 2;
  const circumFence = 2 * Math.PI * radius;

  const progressMotionValue = useMotionValue(progress);

  const progressSpring = useSpring(progressMotionValue, {
    stiffness: 500,
    damping: 70,
  });

  const progressOffset = useTransform(
    progressSpring,
    [0, 100],
    [0, circumFence],
  );

  useEffect(() => {
    progressMotionValue.set(progress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        className="fill-none stroke-primary"
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={STROKE_WIDTH - 0.5}
      />
      <motion.circle
        className="fill-none stroke-secondary"
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={STROKE_WIDTH}
        strokeDasharray={circumFence}
        strokeDashoffset={progressOffset}
      />
    </svg>
  );
};

export default memo(CircularProgressBarIcon);

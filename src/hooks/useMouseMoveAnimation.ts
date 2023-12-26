import { useMotionValue, useSpring } from "framer-motion";
import { MouseEvent } from "react";

export const useMouseMoveAnimation = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const handleMouseMove = (e: MouseEvent) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    x.set(mouseX / screenWidth - 0.5);
    y.set(mouseY / screenHeight - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { mouseXSpring, mouseYSpring, handleMouseMove, handleMouseLeave };
};

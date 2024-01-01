import { AnimatePresence, Variant, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import { defaultTransitionEase } from "@/config/animations";

export type CustomCursorType = "discover" | "hover" | "scroll";

type Props = {
  cursorType: CustomCursorType;
};

const CustomCursor = ({ cursorType }: Props) => {
  const [cursorPosition, setCursorPosition] = useState({
    x: -200,
    y: -200,
  });

  const [isCursorShown, setIsCursorShown] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({
        x: e.clientX - 100,
        y: e.clientY - 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    setIsCursorShown(true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!isCursorShown) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-cursor flex h-[200px] w-[200px] items-center justify-center mix-blend-difference"
      style={{
        x: cursorPosition.x,
        y: cursorPosition.y,
      }}
    >
      <motion.div
        className="relative flex items-center justify-center rounded-full bg-primary"
        animate={cursorType}
        transition={{
          ease: defaultTransitionEase,
          duration: 0.4,
        }}
        initial={false}
        variants={
          {
            discover: {
              width: "96px",
              height: "96px",
            },
            hover: {
              width: "24px",
              height: "24px",
            },
            scroll: {
              width: "96px",
              height: "96px",
            },
          } satisfies Record<CustomCursorType, Variant>
        }
      >
        <AnimatePresence>
          {(cursorType === "discover" || cursorType === "scroll") && (
            <motion.span
              key="discoverText"
              className="text-sm font-bold text-bgPrimary"
              initial="hide"
              exit="hide"
              animate="show"
              variants={{
                hide: {
                  scale: 0,
                },
                show: {
                  scale: 1,
                },
              }}
              transition={{
                ease: defaultTransitionEase,
                duration: 0.4,
              }}
            >
              {cursorType === "discover" && "DISCOVER"}
              {cursorType === "scroll" && "SCROLL"}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;

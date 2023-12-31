import classNames from "classnames";
import { AnimationControls, motion } from "framer-motion";
import React from "react";

import Image from "next/image";

import { defaultTransitionEase } from "@/config/animations";

type Props = {
  imageSrc: string;
  imageAlt: string;
  animationControls: AnimationControls;
  className?: string;
  isWide?: boolean;
};

const IntroImage = ({
  imageSrc,
  imageAlt,
  animationControls,
  className,
  isWide,
}: Props) => (
  <div className={className}>
    <motion.div
      className={classNames(
        "h-[100px] relative",
        isWide ? "w-[175px]" : "w-[100px]",
      )}
      initial="initial"
      variants={{
        initial: {
          y: "0%",
        },
        closeIntro: {
          y: "100%",
          transition: {
            ease: defaultTransitionEase,
            duration: 1,
          },
        },
      }}
      animate={animationControls}
    >
      <Image
        className="pointer-events-none object-cover"
        src={imageSrc}
        alt={imageAlt}
        fill
      />
    </motion.div>
  </div>
);

export default IntroImage;

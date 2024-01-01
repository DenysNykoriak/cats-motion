import classNames from "classnames";
import { Variants, motion } from "framer-motion";
import React, { Fragment, ReactNode, useMemo } from "react";

import Image from "next/image";

import CircularText from "@/app/components/CircularText";
import { CustomCursorType } from "@/app/components/CustomCursor";
import { defaultTransitionEase } from "@/config/animations";
import { CatBreed, CatBreedWithImage } from "@/models/cats";

const breedInfoTextVariants: Variants = {
  initial: { y: "150%" },
  animate: {
    y: "0%",
    transition: {
      ease: defaultTransitionEase,
      duration: 1,
      delay: 0.3,
    },
  },
};

const breedImageVariants: Variants = {
  initial: {
    scale: 0.3,
  },
  animate: {
    scale: 1,
    transition: {
      type: "keyframes",
      delay: 0.4,
      duration: 1,
    },
  },
  exit: {
    scale: 0.5,
    transition: {
      type: "keyframes",
      duration: 1,
      ease: defaultTransitionEase,
    },
  },
};

const circularTextVariants: Variants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      duration: 0.5,
      ease: defaultTransitionEase,
      delay: 0.8,
    },
  },
};

type Props = {
  breed: CatBreed;
  image: CatBreedWithImage["image"];
  imageIndex: number;
  children?: ReactNode;
  disableEnterAnimation?: boolean;
  setCursorType: (cursorType: CustomCursorType) => void;
};

const HomeCatBreedContent = ({
  children,
  imageIndex,
  image,
  breed,
  disableEnterAnimation,
  setCursorType,
}: Props) => {
  const breedInfo = useMemo(
    () => [
      {
        title: "DESCRIPTION",
        value: breed.description,
      },
      { title: "TEMPERAMENT", value: breed.temperament },
      {
        title: "LIFE SPAN",
        value: `${breed.life_span} years`,
      },
      {
        title: "WEIGHT",
        value: `${breed.weight.metric} kg / ${breed.weight.imperial} lb`,
      },
    ],
    [breed],
  );

  return (
    <div
      className={classNames(
        "relative flex h-screen w-screen justify-between gap-8 px-14 pt-[118px]",
        {
          "bg-bgV1": imageIndex % 3 === 0,
          "bg-bgV2": imageIndex % 3 === 1,
          "bg-bgV3": imageIndex % 3 === 2,
        },
      )}
    >
      {children}

      {/* Breed Info */}
      <div className="mb-16 flex max-w-[40vw] flex-col justify-end">
        <div className="overflow-hidden pb-1">
          <motion.h2
            className="font-cormorant-garamond text-3xl"
            initial="initial"
            animate="animate"
            variants={
              !disableEnterAnimation ? breedInfoTextVariants : undefined
            }
          >
            CATS / <span className="text-lg">{breed.name}</span>
          </motion.h2>
        </div>
        <div className="mt-2 grid grid-cols-catBreedInfo gap-x-4 gap-y-2">
          {breedInfo.map((info) => (
            <Fragment key={info.title}>
              <div className="overflow-hidden pb-2">
                <motion.h3
                  className="font-normal"
                  initial="initial"
                  animate="animate"
                  variants={
                    !disableEnterAnimation ? breedInfoTextVariants : undefined
                  }
                >
                  {info.title}
                </motion.h3>
              </div>

              <div className="overflow-hidden pb-2">
                <motion.h3
                  initial="initial"
                  animate="animate"
                  variants={
                    !disableEnterAnimation ? breedInfoTextVariants : undefined
                  }
                >
                  {info.value}
                </motion.h3>
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      {/* Image */}
      <div
        className="relative mr-[10vw] h-[80vh] w-[45vw]"
        onMouseEnter={() => setCursorType("discover")}
        onMouseLeave={() => setCursorType("hover")}
      >
        <motion.div
          className="z-[10] flex h-[80vh] w-[45vw] flex-col justify-center"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={!disableEnterAnimation ? breedImageVariants : undefined}
        >
          <Image
            key={image.url}
            className="object-contain"
            src={image.url}
            alt={breed.name}
            loading="eager"
            fill
          />
        </motion.div>

        {/* Circular Text */}
        {!disableEnterAnimation && (
          <motion.div
            className="absolute bottom-[80px] right-[-100px] z-controls flex items-center justify-center overflow-hidden"
            initial="initial"
            animate="animate"
            variants={!disableEnterAnimation ? circularTextVariants : undefined}
          >
            <CircularText
              centralText="VIDEO"
              circularText={`CAPSULE SS ${new Date().getFullYear()}     CAPSULE SS ${new Date().getFullYear()}`}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomeCatBreedContent;

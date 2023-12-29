import classNames from "classnames";
import { motion, useAnimationControls } from "framer-motion";
import React, { Fragment, MutableRefObject, useEffect, useMemo } from "react";

import Image from "next/image";

import { CatBreedWithImage } from "@/models/cats";

export type HomeCatBreedInfo = {
  selectedBreed: CatBreedWithImage;
  breedIndex: number;
};

type Props = HomeCatBreedInfo & {
  onClose: () => void;
  imageRef: MutableRefObject<HTMLDivElement | null>;
};

const HomeCatBreedView = ({
  selectedBreed,
  breedIndex,
  imageRef,
  onClose,
}: Props) => {
  const imageRect = useMemo(
    () => imageRef.current?.getBoundingClientRect(),
    [imageRef],
  );

  const breedInfo = useMemo(
    () => [
      {
        title: "DESCRIPTION",
        value: selectedBreed.description,
      },
      { title: "TEMPERAMENT", value: selectedBreed.temperament },
      {
        title: "LIFE SPAN",
        value: `${selectedBreed.life_span} years`,
      },
      {
        title: "WEIGHT",
        value: `${selectedBreed.weight.metric} kg / ${selectedBreed.weight.imperial} lb`,
      },
    ],
    [selectedBreed],
  );

  const animationImageControls = useAnimationControls();

  useEffect(() => {
    animationImageControls.start("enter");

    const animTimeout = setTimeout(() => {
      animationImageControls.start({ scale: 0, transition: { duration: 10 } });
      animationImageControls.start("exit");
    }, 400);

    return () => {
      clearTimeout(animTimeout);
    };
  }, [animationImageControls]);

  if (!imageRect) return null;

  return (
    <div className="absolute inset-0">
      <motion.div
        className="absolute inset-x-0 z-firstModalView bg-primary"
        initial={{
          top: "100%",
          bottom: "0%",
        }}
        animate={{
          top: "0%",
          bottom: "0%",
          transition: {
            duration: 0.8,
            ease: [0.75, 0, 0.5, 0.995],
          },
        }}
        exit={{
          bottom: "100%",
          transition: {
            duration: 0.8,
            delay: 0.2,
            ease: [0.75, 0, 0.5, 0.995],
          },
        }}
      />

      {/* Content */}
      <motion.div
        className={classNames(
          "absolute inset-x-0 z-secondModalView overflow-hidden flex",
          {
            "bg-bgV1": breedIndex % 3 === 0,
            "bg-bgV2": breedIndex % 3 === 1,
            "bg-bgV3": breedIndex % 3 === 2,
          },
        )}
        // TODO: delete after exit button will be added
        onClick={onClose}
        initial={{
          top: "100%",
          bottom: "0%",
          alignItems: "flex-end",
        }}
        animate={{
          top: "0%",
          bottom: "0%",
          transition: {
            duration: 0.8,
            delay: 0.2,
            ease: [0.75, 0, 0.5, 0.995],
          },
        }}
        exit={{
          bottom: "100%",
          alignItems: "flex-start",
          transition: {
            duration: 0.8,
            ease: [0.75, 0, 0.5, 0.995],
          },
        }}
      >
        <div className="flex h-screen w-screen justify-between gap-8 px-14 pt-[118px]">
          <div className="flex max-w-[40vw] flex-col justify-end">
            <div className="mb-16">
              <div>
                <h2 className="font-cormorant-garamond text-3xl">
                  CATS / <span className="text-lg">{selectedBreed.name}</span>
                </h2>
                <div className="mt-3 grid grid-cols-catBreedInfo gap-4">
                  {breedInfo.map((info) => (
                    <Fragment key={info.title}>
                      <h3 className=" font-normal">{info.title}</h3>
                      <h3>{info.value}</h3>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <motion.div
            className="relative z-[10] mr-[10vw] h-[80vh] w-[45vw]"
            initial={{
              scale: 0.3,
            }}
            animate={{
              scale: 1,
              transition: {
                type: "keyframes",
                delay: 0.4,
                duration: 1,
              },
            }}
          >
            <Image
              className="object-contain"
              src={selectedBreed.image.url}
              alt={selectedBreed.name}
              fill
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Animation Images */}
      <>
        <motion.div
          className="absolute z-[10]"
          style={{
            width: imageRect.width,
            height: imageRect.height,
            top: imageRect.top,
            left: imageRect.left,
          }}
          initial="initial"
          animate={animationImageControls}
          custom={1}
          variants={{
            initial: {
              opacity: 0,
            },
            enter: (custom) => ({
              opacity: 1,
              transition: {
                type: "just",
                delay: 0.1 + 0.1 * custom,
              },
            }),
            exit: (custom) => ({
              display: "none",
              transition: {
                type: "just",
                delay: 0.1 + 0.1 * custom,
              },
            }),
          }}
        >
          <Image
            rel="preload"
            className="object-cover"
            src={selectedBreed.image.url}
            alt={selectedBreed.name}
            fill
          />
        </motion.div>
        <motion.div
          className="absolute z-[11]"
          style={{
            width: imageRect.width * 0.86,
            height: imageRect.height * 0.86,
            top: imageRect.top + imageRect.height * 0.07,
            left: imageRect.left + imageRect.width * 0.07,
          }}
          initial="initial"
          animate={animationImageControls}
          custom={2}
          variants={{
            initial: {
              opacity: 0,
            },
            enter: (custom) => ({
              opacity: 1,
              transition: {
                type: "just",
                delay: 0.1 + 0.1 * custom,
              },
            }),
            exit: (custom) => ({
              display: "none",
              transition: {
                type: "just",
                delay: 0.1 + 0.1 * custom,
              },
            }),
          }}
        >
          <Image
            rel="preload"
            className="object-cover"
            src={selectedBreed.image.url}
            alt={selectedBreed.name}
            fill
          />
        </motion.div>
        <motion.div
          className="absolute z-[12]"
          style={{
            width: imageRect.width * 0.5,
            height: imageRect.height * 0.5,
            top: imageRect.top + imageRect.height * 0.25,
            left: imageRect.left + imageRect.width * 0.25,
          }}
          initial="initial"
          animate={animationImageControls}
          custom={3}
          variants={{
            initial: {
              opacity: 0,
            },
            enter: (custom) => ({
              opacity: 1,
              transition: {
                type: "just",
                delay: 0.1 + 0.1 * custom,
              },
            }),
            exit: (custom) => ({
              display: "none",
              transition: {
                type: "just",
                delay: 0.1 + 0.1 * custom,
              },
            }),
          }}
        >
          <Image
            rel="preload"
            className="object-cover"
            src={selectedBreed.image.url}
            alt={selectedBreed.name}
            fill
          />
        </motion.div>
        <motion.div
          className="absolute z-[13]"
          style={{
            width: imageRect.width * 0.2,
            height: imageRect.height * 0.2,
            top: imageRect.top + imageRect.height * 0.4,
            left: imageRect.left + imageRect.width * 0.4,
          }}
          initial="initial"
          animate={animationImageControls}
          custom={4}
          variants={{
            initial: {
              opacity: 0,
            },
            enter: (custom) => ({
              opacity: 1,
              transition: {
                type: "just",
                delay: 0.1 + 0.1 * custom,
              },
            }),
            exit: (custom) => ({
              display: "none",
              transition: {
                type: "just",
                delay: 0.1 + 0.1 * custom,
              },
            }),
          }}
        >
          <Image
            rel="preload"
            className="object-cover"
            src={selectedBreed.image.url}
            alt={selectedBreed.name}
            fill
          />
        </motion.div>
      </>
    </div>
  );
};

export default HomeCatBreedView;

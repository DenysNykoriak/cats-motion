import classNames from "classnames";
import { motion, useAnimationControls } from "framer-motion";
import React, {
  Fragment,
  MutableRefObject,
  useEffect,
  useMemo,
  useState,
} from "react";

import Image from "next/image";

import { useCatBreedImages } from "@/hooks/useCatBreedImages";
import { CatBreedWithImage } from "@/models/cats";

import CloseButton from "../components/CloseButton";
import CloseIcon from "../components/icons/CloseIcon";

import CircularBreedViewText from "./components/CircularBreedViewText";

export type HomeCatBreedInfo = {
  selectedBreed: CatBreedWithImage;
  breedIndex: number;
};

type Props = HomeCatBreedInfo & {
  onClose: () => void;
  imageRef: MutableRefObject<HTMLDivElement | null>;
};

const HomeCatBreedModal = ({
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

  //TODO: use this variables
  const { isLoading: isImagesLoading, images: additionalBreedImages } =
    useCatBreedImages(selectedBreed.id);

  const allBreedImages = useMemo(
    () =>
      [selectedBreed.image, ...additionalBreedImages].filter(
        (image, index) => index === 0 || image.id !== selectedBreed.image.id,
      ),
    [selectedBreed.image, additionalBreedImages],
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = allBreedImages[activeImageIndex];

  //Animations
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
  //----

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
        <div className="relative flex h-screen w-screen justify-between gap-8 px-14 pt-[118px]">
          <div className="absolute right-10 top-[56px]">
            <CloseButton onClose={onClose} />
          </div>

          {/* Breed Info */}
          <div className="mb-16 flex max-w-[40vw] flex-col justify-end">
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

          {/* Image */}
          <div className="relative z-[10] mr-[10vw] h-[80vh] w-[45vw]">
            <motion.div
              className="h-[80vh] w-[45vw]"
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
                src={activeImage.url}
                alt={selectedBreed.name}
                fill
              />
            </motion.div>

            {/* Circular Text */}
            <motion.div
              className="absolute bottom-[80px] right-[-100px] flex items-center justify-center overflow-hidden"
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: {
                  duration: 0.5,
                  ease: [0.75, 0, 0.5, 0.995],
                  delay: 0.8,
                },
              }}
            >
              <CircularBreedViewText />
            </motion.div>
          </div>

          {/* Arrows */}
          <>
            <button
              className="absolute left-8 top-[45vh] font-cormorant-garamond text-3xl disabled:text-secondary"
              disabled={activeImageIndex <= 0}
              onClick={() => {
                setActiveImageIndex((prev) => prev - 1);
              }}
            >
              ←
            </button>
            <button
              className="absolute right-8 top-[45vh] font-cormorant-garamond text-3xl disabled:text-secondary"
              disabled={activeImageIndex >= allBreedImages.length - 1}
              onClick={() => {
                setActiveImageIndex((prev) => prev + 1);
              }}
            >
              →
            </button>
          </>
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

export default HomeCatBreedModal;

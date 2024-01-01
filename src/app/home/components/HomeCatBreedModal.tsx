import { Variants, motion, useAnimationControls } from "framer-motion";
import React, {
  Fragment,
  MutableRefObject,
  useEffect,
  useMemo,
  useState,
} from "react";

import Image from "next/image";

import { CustomCursorType } from "@/app/components/CustomCursor";
import { defaultTransitionEase } from "@/config/animations";
import { useCatBreedImages } from "@/hooks/useCatBreedImages";
import { CatBreedWithImage } from "@/models/cats";

import CloseButton from "../../components/CloseButton";

import HomeCatBreedContent from "./HomeCatBreedContent";

export type HomeCatBreedInfo = {
  selectedBreed: CatBreedWithImage;
  breedIndex: number;
};

type Props = HomeCatBreedInfo & {
  onClose: () => void;
  imageRef: MutableRefObject<HTMLDivElement | null>;
  setCursorType: (cursorType: CustomCursorType) => void;
};

const HomeCatBreedModal = ({
  selectedBreed,
  breedIndex,
  imageRef,
  onClose,
  setCursorType,
}: Props) => {
  const imageRect = useMemo(
    () => imageRef.current?.getBoundingClientRect(),
    [imageRef],
  );

  const { images: additionalBreedImages } = useCatBreedImages(selectedBreed.id);

  const allBreedImages = useMemo(
    () =>
      [selectedBreed.image, ...additionalBreedImages].filter(
        (image, index) => index === 0 || image.id !== selectedBreed.image.id,
      ),
    [selectedBreed.image, additionalBreedImages],
  );

  const [imageAnimationPage, setImageAnimationPage] = useState<{
    image: CatBreedWithImage["image"];
    animationName: "nextPage" | "prevPage";
  } | null>(null);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = allBreedImages[activeImageIndex];

  const handleNextImage = () => {
    if (imageAnimationPage) return;

    setImageAnimationPage({
      image: allBreedImages[activeImageIndex + 1],
      animationName: "nextPage",
    });

    setTimeout(() => {
      setActiveImageIndex((prev) => prev + 1);
      setImageAnimationPage(null);
    }, 1000);
  };

  const handlePrevImage = () => {
    if (imageAnimationPage) return;

    setImageAnimationPage({
      image: allBreedImages[activeImageIndex - 1],
      animationName: "prevPage",
    });

    setTimeout(() => {
      setActiveImageIndex((prev) => prev - 1);
      setImageAnimationPage(null);
    }, 1000);
  };

  const animationImageControls = useAnimationControls();

  useEffect(() => {
    animationImageControls.start("enter");

    const animTimeout = setTimeout(() => {
      animationImageControls.start({ scale: 0, transition: { duration: 10 } });
      animationImageControls.start("hide");
    }, 400);

    return () => {
      clearTimeout(animTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animationImageVariants: Variants = {
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
    hide: (custom) => ({
      display: "none",
      transition: {
        type: "just",
        delay: 0.1 + 0.1 * custom,
      },
    }),
    exit: (custom) => ({
      display: "block",
      width: imageRect?.width,
      height: imageRect?.height,
      top: imageRect?.top,
      left: imageRect?.left,
      scale: [0, 1],
      transition: {
        ease: defaultTransitionEase,
        duration: 1,
        delay: 0.1 * (custom - 1),
      },
    }),
  };

  if (!imageRect) return null;

  return (
    <div className="absolute inset-0">
      <motion.div
        className="absolute inset-x-0 bg-primary"
        initial={{
          top: "100%",
          bottom: "0%",
        }}
        animate={{
          top: "0%",
          bottom: "0%",
          transition: {
            duration: 0.8,
            ease: defaultTransitionEase,
          },
        }}
        exit={{
          bottom: "100%",
          transition: {
            duration: 0.8,
            delay: 0.2,
            ease: defaultTransitionEase,
          },
        }}
      />

      {/* Content */}
      <motion.div
        className="absolute inset-x-0 flex overflow-hidden"
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
            ease: defaultTransitionEase,
          },
        }}
        exit={{
          bottom: "100%",
          alignItems: "flex-start",
          transition: {
            duration: 0.8,
            ease: defaultTransitionEase,
          },
        }}
      >
        <HomeCatBreedContent
          breed={selectedBreed}
          image={activeImage}
          imageIndex={breedIndex + activeImageIndex}
          setCursorType={setCursorType}
        >
          <div className="absolute right-10 top-[56px] z-controls">
            <CloseButton onClose={onClose} />
          </div>

          {/* Arrows */}
          <>
            <button
              className="absolute left-8 top-[45vh] z-controls cursor-none font-cormorant-garamond text-3xl disabled:text-secondary"
              disabled={activeImageIndex <= 0}
              onClick={handlePrevImage}
            >
              ←
            </button>
            <button
              className="absolute right-8 top-[45vh] z-controls cursor-none font-cormorant-garamond text-3xl disabled:text-secondary"
              disabled={activeImageIndex >= allBreedImages.length - 1}
              onClick={handleNextImage}
            >
              →
            </button>
          </>
        </HomeCatBreedContent>
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
          exit="exit"
          animate={animationImageControls}
          custom={1}
          variants={animationImageVariants}
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
          exit="exit"
          animate={animationImageControls}
          custom={2}
          variants={animationImageVariants}
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
          exit="exit"
          animate={animationImageControls}
          custom={3}
          variants={animationImageVariants}
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
          exit="exit"
          animate={animationImageControls}
          custom={4}
          variants={animationImageVariants}
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

      {/* Image Change */}
      {imageAnimationPage && (
        <motion.div
          className="absolute inset-y-0 z-tempModalView hidden flex-col overflow-hidden"
          variants={{
            nextPage: {
              display: "flex",
              right: "0%",
              left: ["100%", "0%"],
              alignItems: "end",
              transition: {
                duration: 0.9,
                ease: defaultTransitionEase,
                delay: 0.1,
              },
            },
            prevPage: {
              display: "flex",
              left: "0%",
              right: ["100%", "0%"],
              alignItems: "start",
              transition: {
                duration: 0.9,
                ease: defaultTransitionEase,
                delay: 0.1,
              },
            },
          }}
          animate={imageAnimationPage.animationName}
        >
          <HomeCatBreedContent
            breed={selectedBreed}
            image={imageAnimationPage.image}
            imageIndex={
              breedIndex +
              activeImageIndex +
              (imageAnimationPage.animationName === "nextPage" ? 1 : -1)
            }
            disableEnterAnimation
            setCursorType={setCursorType}
          />
        </motion.div>
      )}
    </div>
  );
};

export default HomeCatBreedModal;

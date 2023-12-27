"use client";

import classNames from "classnames";
import { motion, useAnimationControls, useTransform } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";

import Image from "next/image";

import { useMouseMoveAnimation } from "@/hooks/useMouseMoveAnimation";
import { CatBreed } from "@/models/cats";

import Logo from "../components/Logo";

import CircularIntroText from "./components/CircularIntroText";
import IntroImage from "./components/IntroImage";

const SOCIALS = ["TW", "FB", "IG", "WECHAT"];
const FOOTER_LINKS = ["Our website", "Our Collections"];

type Props = {
  breeds: CatBreed[];
};

const HomeView = ({ breeds }: Props) => {
  const [isIntro, setIsIntro] = useState(true);

  const { mouseXSpring, mouseYSpring, handleMouseMove, handleMouseLeave } =
    useMouseMoveAnimation();

  const introImageRotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"],
  );
  const introImageRotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"],
  );

  const introTextRotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["10deg", "-10deg"],
  );
  const introTextRotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-10deg", "10deg"],
  );

  //Carousel
  const [catsCarouselWidth, setCatsCarouselWidth] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const breedsToShow = useMemo(
    () =>
      breeds.filter((breed) => !!breed.image) as (CatBreed & {
        image: NonNullable<CatBreed["image"]>;
      })[],
    [breeds],
  );

  useEffect(() => {
    if (!carouselRef.current || !carouselContainerRef.current) return;

    setCatsCarouselWidth(
      carouselRef.current.scrollWidth -
        carouselContainerRef.current.offsetWidth,
    );
  }, [breeds]);

  //---
  const introControls = useAnimationControls();

  const handleIntroClose = () => {
    if (!isIntro) {
      // TODO: delete this after intro animations will be ready
      setIsIntro(true);
      introControls.start("initial");

      return;
    }

    setIsIntro(false);
    introControls.start("closeIntro");
  };

  return (
    <div
      className="relative flex min-h-screen flex-col justify-between overflow-hidden"
      onClick={handleIntroClose}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <header className="flex justify-between px-12 pt-14">
        <Logo />
        <span className="cursor-pointer">ABOUT</span>
      </header>
      <main>
        {/* Intro Center Components */}
        <div className="relative mx-auto mt-[-200px] flex h-[40vh] w-[707px] flex-col items-start">
          {/* Header Components (After Intro) */}
          <motion.h1
            className="relative font-lato font-bold tracking-wide"
            initial="initial"
            variants={{
              initial: {
                left: "0vw",
                top: "0%",
                fontSize: "140px",
                lineHeight: "135px",
              },
              closeIntro: {
                left: "2vw",
                top: "-30%",
                fontSize: "30px",
                lineHeight: "30px",
                rotateX: "0deg",
                rotateY: "0deg",
                transition: {
                  ease: [0.75, 0, 0.5, 0.995],
                  duration: 1,
                },
              },
            }}
            animate={introControls}
            style={
              isIntro
                ? {
                    rotateX: introTextRotateX,
                    rotateY: introTextRotateY,
                    transformStyle: "preserve-3d",
                  }
                : undefined
            }
          >
            CATS
            <div className="absolute right-[calc(-100%-8px)] top-0 flex items-start overflow-hidden">
              <motion.sup
                className="top-0 text-sm font-normal leading-4"
                initial="initial"
                variants={{
                  initial: { transform: "translateY(100%)" },
                  closeIntro: {
                    transform: "translateY(0%)",
                    transition: {
                      duration: 0.5,
                      delay: 1,
                    },
                  },
                }}
                animate={introControls}
              >
                {breeds.length} BREEDS
              </motion.sup>
            </div>
          </motion.h1>
          <motion.h1
            className="relative whitespace-nowrap font-cormorant-garamond leading-none tracking-wider"
            initial="initial"
            variants={{
              initial: {
                left: "0vw",
                top: "0%",
                fontSize: "140px",
              },
              closeIntro: {
                left: "2vw",
                top: "-30%",
                fontSize: "30px",
                rotateX: "0deg",
                rotateY: "0deg",
                transition: {
                  ease: [0.75, 0, 0.5, 0.995],
                  duration: 1,
                },
              },
            }}
            animate={introControls}
            style={
              isIntro
                ? {
                    rotateX: introTextRotateX,
                    rotateY: introTextRotateY,
                    transformStyle: "preserve-3d",
                  }
                : undefined
            }
          >
            - in Motion
          </motion.h1>

          {/* Images */}
          <motion.div
            className="absolute inset-0"
            style={{
              rotateX: introImageRotateX,
              rotateY: introImageRotateY,
              transformStyle: "preserve-3d",
            }}
          >
            <IntroImage
              className="absolute left-[-180px] top-[16px] overflow-hidden"
              animationControls={introControls}
              imageSrc={breedsToShow[0].image.url}
              imageAlt={breedsToShow[0].name}
            />
            <IntroImage
              className="absolute left-[110px] top-[280px] overflow-hidden"
              animationControls={introControls}
              imageSrc={breedsToShow[1].image.url}
              imageAlt={breedsToShow[1].name}
            />
            <IntroImage
              className="absolute right-[70px] top-[380px] overflow-hidden"
              animationControls={introControls}
              imageSrc={breedsToShow[2].image.url}
              imageAlt={breedsToShow[2].name}
              isWide
            />
            <IntroImage
              className="absolute right-[-220px] top-[16px] overflow-hidden"
              animationControls={introControls}
              imageSrc={breedsToShow[3].image.url}
              imageAlt={breedsToShow[3].name}
              isWide
            />
          </motion.div>

          {/* Footer Components (After Intro) */}
          <motion.h3
            className="relative self-end font-lato leading-[95px] tracking-wide"
            initial="initial"
            variants={{
              initial: {
                left: "0vw",
                bottom: "0%",
                fontSize: "100px",
              },
              closeIntro: {
                left: "-20vw",
                bottom: "-155%",
                fontSize: "30px",
                rotateX: "0deg",
                rotateY: "0deg",
                transition: {
                  ease: [0.75, 0, 0.5, 0.995],
                  duration: 1,
                },
              },
            }}
            animate={introControls}
            style={
              isIntro
                ? {
                    rotateX: introTextRotateX,
                    rotateY: introTextRotateY,
                    transformStyle: "preserve-3d",
                  }
                : undefined
            }
          >
            ©{new Date().getFullYear()}
          </motion.h3>
        </div>

        <motion.div
          className="absolute right-[-45px] top-[38%] flex items-center justify-center overflow-hidden"
          initial="initial"
          variants={{
            initial: { scale: 1 },
            closeIntro: {
              scale: 0,
              transition: {
                duration: 0.5,
                ease: [0.75, 0, 0.5, 0.995],
              },
            },
          }}
          animate={introControls}
        >
          <CircularIntroText />
        </motion.div>

        {/* Slides */}
        <div
          className="absolute top-[20%] flex h-2/3 w-screen items-center justify-end overflow-hidden"
          ref={carouselContainerRef}
        >
          <motion.div
            className="flex items-center overflow-hidden"
            initial="initial"
            variants={{
              initial: { width: "0%", height: "0%" },
              closeIntro: {
                width: "100%",
                height: ["0%", "10%", "100%"],
                transition: {
                  duration: 0.8,
                  delay: 0.5,
                },
              },
            }}
            animate={introControls}
          >
            <motion.div
              className="flex h-[66vh] cursor-grab items-center gap-12 px-12 active:cursor-grabbing"
              ref={carouselRef}
              drag="x"
              dragConstraints={{ right: 0, left: -catsCarouselWidth - 48 }}
              dragElastic={0.1}
              variants={{
                closeIntro: {
                  x: ["0%", "-5%"],
                  transition: {
                    duration: 1.5,
                    delay: 0.5,
                  },
                },
              }}
              animate={introControls}
            >
              {breedsToShow.map((breed, index) => (
                <div
                  key={breed.id}
                  className={classNames(
                    "min-w-[32vw] relative bg-primary",
                    index % 2 === 0 ? "h-full" : "h-[90%]",
                  )}
                >
                  <Image
                    className="pointer-events-none object-cover"
                    src={breed.image.url}
                    alt={breed.name}
                    fill
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Footer Components */}
        <motion.h3
          className="absolute font-cormorant-garamond font-light"
          initial="initial"
          variants={{
            initial: {
              left: "32px",
              bottom: "20%",
              fontSize: "90px",
            },
            closeIntro: {
              left: "56px",
              bottom: "3.5%",
              fontSize: "30px",
              rotateX: "0deg",
              rotateY: "0deg",
              transition: {
                ease: [0.75, 0, 0.5, 0.995],
                duration: 1,
              },
            },
          }}
          animate={introControls}
          style={
            isIntro
              ? {
                  rotateX: introTextRotateX,
                  rotateY: introTextRotateY,
                  transformStyle: "preserve-3d",
                }
              : undefined
          }
        >
          CATS
        </motion.h3>
      </main>
      <footer className="flex justify-between px-12 pb-8">
        <div className="ml-[120px] flex gap-8">
          {SOCIALS.map((socialName) => (
            <span key={socialName} className="font-lato">
              {socialName}
            </span>
          ))}
        </div>
        <div className="flex gap-8">
          {FOOTER_LINKS.map((link) => (
            <span
              key={link}
              className={classNames(
                "font-lato whitespace-nowrap relative cursor-pointer",
                "after:w-full after:h-[1px] after:bg-primary after:bottom-[-4px] after:left-0 after:absolute",
              )}
            >
              {link}
            </span>
          ))}
          <span>©{new Date().getFullYear()} CatsMotion</span>
        </div>
      </footer>
    </div>
  );
};

export default HomeView;

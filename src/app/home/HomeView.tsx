"use client";

import classNames from "classnames";
import { motion, useAnimationControls } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";

import Image from "next/image";

import { CatBreed } from "@/models/cats";

import Logo from "../components/Logo";

const SOCIALS = ["TW", "FB", "IG", "WECHAT"];
const FOOTER_LINKS = ["Our website", "Our Collections"];

type Props = {
  breeds: CatBreed[];
};

const HomeView = ({ breeds }: Props) => {
  const [isIntro, setIsIntro] = useState(true);

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
      className="min-h-screen flex flex-col justify-between relative"
      onClick={handleIntroClose}
    >
      <header className="flex justify-between pt-14 px-12">
        <Logo />
        <span className="cursor-pointer">ABOUT</span>
      </header>
      <main>
        {/* Intro Center Components */}
        <div className="flex flex-col items-start mx-[25%] w-min h-[20vh] mt-[-150px]">
          {/* Header Components (After Intro) */}
          <motion.h1
            className="relative font-lato font-bold tracking-wide"
            initial="initial"
            variants={{
              initial: {
                left: "0vw",
                top: "0%",
                fontSize: "90px",
                lineHeight: "85px",
              },
              closeIntro: {
                left: "3vw",
                top: "-125%",
                fontSize: "30px",
                lineHeight: "30px",
                transition: {
                  ease: [0.75, 0, 0.5, 0.995],
                  duration: 1,
                },
              },
            }}
            animate={introControls}
          >
            CATS
            <div className="overflow-hidden absolute -right-[calc(100%+8px)] top-0 flex items-start">
              <motion.sup
                className="text-sm font-normal top-0 leading-4"
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
            className="relative font-cormorant-garamond leading-none whitespace-nowrap tracking-wider"
            initial="initial"
            variants={{
              initial: {
                left: "0vw",
                top: "0%",
                fontSize: "90px",
              },
              closeIntro: {
                left: "3vw",
                top: "-125%",
                fontSize: "30px",
                transition: {
                  ease: [0.75, 0, 0.5, 0.995],
                  duration: 1,
                },
              },
            }}
            animate={introControls}
          >
            - in Motion
          </motion.h1>

          {/* Footer Components (After Intro) */}
          <motion.h3
            className="font-lato relative self-end leading-[85px] tracking-wide"
            initial="initial"
            variants={{
              initial: {
                left: "0vw",
                bottom: "0%",
                fontSize: "90px",
              },
              closeIntro: {
                left: "15vw",
                bottom: "-245%",
                fontSize: "30px",
                transition: {
                  ease: [0.75, 0, 0.5, 0.995],
                  duration: 1,
                },
              },
            }}
            animate={introControls}
          >
            ©{new Date().getFullYear()}
          </motion.h3>
        </div>

        {/* Slides */}
        <div
          className="absolute flex items-center justify-end h-2/3 top-[20%] overflow-hidden w-screen"
          ref={carouselContainerRef}
        >
          <motion.div
            className="overflow-hidden flex items-center"
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
              className="flex gap-12 h-[66vh] px-12 items-center cursor-grab active:cursor-grabbing"
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
          className="font-cormorant-garamond absolute font-light"
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
              transition: {
                ease: [0.75, 0, 0.5, 0.995],
                duration: 1,
              },
            },
          }}
          animate={introControls}
        >
          CATS
        </motion.h3>
      </main>
      <footer className="pb-8 px-12 flex justify-between">
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

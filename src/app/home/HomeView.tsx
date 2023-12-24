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
        {/* Header Components */}
        <motion.h1
          className="absolute font-lato font-bold mx-auto"
          initial="initial"
          variants={{
            initial: {
              left: "20%",
              top: "30%",
              fontSize: "90px",
            },
            closeIntro: {
              left: "33%",
              top: "80px",
              fontSize: "30px",
              transition: {
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
        {/* TODO: change top: 45% to make it connected with title above */}
        <motion.h1
          className="text-3xl absolute font-cormorant-garamond mx-auto"
          initial="initial"
          variants={{
            initial: {
              left: "20%",
              top: "45%",
              fontSize: "90px",
            },
            closeIntro: {
              left: "33%",
              top: "120px",
              fontSize: "30px",
              transition: {
                duration: 1,
              },
            },
          }}
          animate={introControls}
        >
          - in Motion
        </motion.h1>

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
                  delay: 0.7,
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
                    delay: 0.7,
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
        <h3 className="font-cormorant-garamond text-3xl absolute bottom-9 left-14 font-light">
          CATS
        </h3>
        <h3 className="font-lato text-3xl absolute bottom-9 right-1/2 font-bold w-[100px] mx-auto">
          ©{new Date().getFullYear()}
        </h3>
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

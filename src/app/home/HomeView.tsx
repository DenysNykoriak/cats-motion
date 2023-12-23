"use client";

import classNames from "classnames";
import { motion } from "framer-motion";
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
  const [catsCarouselWidth, setCatsCarouselWidth] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);

  const breedsToShow = useMemo(
    () =>
      breeds.slice(0, 6).filter((breed) => !!breed.image) as (CatBreed & {
        image: NonNullable<CatBreed["image"]>;
      })[],
    [breeds],
  );

  useEffect(() => {
    if (!carouselRef.current) return;

    setCatsCarouselWidth(
      carouselRef.current.scrollWidth - carouselRef.current.offsetWidth,
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between relative">
      <header className="flex justify-between pt-14 px-12">
        <Logo />
        <span className="cursor-pointer">ABOUT</span>
      </header>
      <main>
        {/* Header Components */}
        <h1 className="text-3xl absolute font-lato font-bold top-20 mx-auto left-1/3">
          CATS
          <sup className="text-sm font-normal absolute -right-[calc(100%+8px)] top-[-1px]">
            10 BREEDS
          </sup>
        </h1>
        <h1 className="text-3xl absolute font-cormorant-garamond top-[120px] left-1/3 mx-auto">
          - in Motion
        </h1>

        {/* Slides */}
        <div className="absolute top-1/4 w-full h-1/2 overflow-hidden">
          <motion.div
            className="flex gap-12 h-full px-12"
            ref={carouselRef}
            drag="x"
            dragConstraints={{ right: 0, left: -catsCarouselWidth - 48 }}
          >
            {breedsToShow.map((breed) => (
              <div
                key={breed.id}
                className="w-1/4 min-w-[27vw] h-full relative bg-primary"
              >
                <Image
                  className="pointer-events-none"
                  src={breed.image.url}
                  alt={breed.name}
                  fill
                  objectFit="cover"
                />
              </div>
            ))}
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

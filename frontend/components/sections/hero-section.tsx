"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchFilterBar } from "@/components/search-filter-bar";
import { images } from "@/lib/adventure-data";

const heroSlides = [
  {
    id: 1,
    tag: "Make Your Hassle-Free Travel Plans Now!",
    titleLine1: "To The World Of An",
    titleLine2: "Incredible Vacation.",
    subtitle: "Explore wild river rapids, primary rainforests, ancient monoliths, and pristine Sri Lankan natural wonders.",
    image: images.rafting,
    alt: "Kitulgala White Water Rafting"
  },
  {
    id: 2,
    tag: "Deep Jungle Gorge Scrambling",
    titleLine1: "Unleash Your Inner",
    titleLine2: "Wild Explorer.",
    subtitle: "Natural rock slides, cliff jumps, and crystal stream scrambling guided by swift-water certified professionals.",
    image: images.canyoning,
    alt: "Jungle Canyoning Sri Lanka"
  },
  {
    id: 3,
    tag: "UNESCO Virgin Cloud Forests",
    titleLine1: "Trek Untouched",
    titleLine2: "Rainforest Trails.",
    subtitle: "Discover rare endemic wildlife, hidden cascades, and mist-veiled mountain canopies in Sinharaja & Knuckles.",
    image: images.trekking,
    alt: "Rainforest Trekking Sri Lanka"
  },
  {
    id: 4,
    tag: "Wild Safaris & High Monoliths",
    titleLine1: "Discover Ancient",
    titleLine2: "Sri Lankan Kingdoms.",
    subtitle: "Track leopards in Yala and climb King Kasyapa's 5th-century sky palace at Sigiriya Lion Rock.",
    image: images.highlands,
    alt: "Sigiriya and Highland Mountain Scenery"
  }
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 7500);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = heroSlides[current];
  const fullTitleWords = `${activeSlide.titleLine1} ${activeSlide.titleLine2}`.split(" ");

  return (
    <section className="relative flex min-h-[85vh] lg:min-h-[720px] xl:min-h-[780px] max-h-[1050px] w-full flex-col justify-center overflow-hidden bg-slate-950 pt-28 pb-12 text-white">
      {/* Background Image Carousel Track */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            width={1920}
            height={1200}
            className={`h-full w-full object-cover transition-transform duration-[7500ms] ease-out ${
              index === current ? "scale-105" : "scale-100"
            }`}
          />
        </div>
      ))}
      
      {/* Dark Scrim Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/30 z-0" />

      {/* Ambient Border Accent Lines */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-white/10 z-10 pointer-events-none">
        <div className="absolute top-1/4 h-60 w-px bg-gradient-to-b from-transparent via-emerald-400 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-white/10 z-10 pointer-events-none">
        <div className="absolute top-1/3 h-60 w-px bg-gradient-to-b from-transparent via-emerald-400 to-transparent" />
      </div>

      {/* Hero Content Shell */}
      <div className="page-shell relative z-10 flex flex-col justify-center py-6">
        {/* Single Synchronized Outer AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="max-w-4xl"
          >
            {/* Tag Line */}
            <motion.span
              initial={{ opacity: 0, filter: "blur(4px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="inline-block text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-400 mb-3 drop-shadow"
            >
              {activeSlide.tag}
            </motion.span>

            {/* Word-by-Word Blur & Motion Title Heading */}
            <h1 className="font-display text-4xl font-black leading-[1.08] sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-white drop-shadow-md">
              {fullTitleWords.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(6px)", y: 12 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.08 + index * 0.05,
                    ease: "easeInOut",
                  }}
                  className="mr-3 inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle Paragraph */}
            <motion.p
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.08 + fullTitleWords.length * 0.05 + 0.05,
                ease: "easeInOut",
              }}
              className="mt-4 max-w-2xl text-base text-slate-200 sm:text-lg lg:text-xl font-medium drop-shadow leading-relaxed"
            >
              {activeSlide.subtitle}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Embedded Floating Search Bar closely integrated below subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 lg:mt-12 max-w-5xl w-full"
        >
          <SearchFilterBar />
        </motion.div>
      </div>
    </section>
  );
}

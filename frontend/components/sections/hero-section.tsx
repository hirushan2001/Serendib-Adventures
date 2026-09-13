"use client";

import React, { useState, useEffect } from "react";
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
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const activeSlide = heroSlides[current];

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-slate-950 pt-28 pb-16 text-white">
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
            className={`h-full w-full object-cover transition-transform duration-[6000ms] ease-out ${
              index === current ? "scale-105" : "scale-100"
            }`}
          />
        </div>
      ))}
      
      {/* Dark Scrim Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/30 z-0" />

      {/* Hero Content Shell */}
      <div className="page-shell relative z-10 flex flex-1 flex-col justify-between pt-8 pb-6">
        {/* Top Header Text */}
        <div className="max-w-3xl pt-8 sm:pt-14">
          <span className="inline-block text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-400 mb-3 drop-shadow transition-all duration-500">
            {activeSlide.tag}
          </span>
          <h1 className="font-display text-4xl font-black leading-[1.02] sm:text-6xl lg:text-7xl tracking-tight text-white drop-shadow-md">
            {activeSlide.titleLine1}<br className="hidden sm:inline" /> {activeSlide.titleLine2}
          </h1>
          <p className="mt-4 max-w-xl text-base text-slate-200 sm:text-lg font-medium drop-shadow leading-relaxed">
            {activeSlide.subtitle}
          </p>
        </div>

        {/* Embedded Floating White Search Bar */}
        <div className="pt-10 pb-4">
          <SearchFilterBar />
        </div>
      </div>
    </section>
  );
}

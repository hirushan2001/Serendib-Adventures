import React from "react";
import { SearchFilterBar } from "@/components/search-filter-bar";
import { images } from "@/lib/adventure-data";

/**
 * HeroSection Component
 * Renders the floating rounded hero card with embedded search bar
 */
export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] flex-col justify-between overflow-hidden bg-slate-900 pt-28 pb-12 text-white w-full">
      {/* Background Hero Image */}
      <img
        src={images.rafting}
        alt="Tropical Sri Lankan River Adventure"
        width={1920}
        height={1200}
        className="absolute inset-0 h-full w-full object-cover"
      />
      
      {/* Soft Dark Scrim Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/40" />

      {/* Hero Content Shell */}
      <div className="page-shell relative z-10 flex flex-1 flex-col justify-between pt-8 pb-4">
        {/* Top Hero Text */}
        <div className="max-w-3xl pt-8 sm:pt-12">
          <span className="inline-block text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-400 mb-3 drop-shadow">
            Make Your Hassle-Free Travel Plans Now!
          </span>
          <h1 className="font-display text-4xl font-black leading-[1.02] sm:text-6xl lg:text-7xl tracking-tight text-white drop-shadow-md">
            To The World Of An<br className="hidden sm:inline" /> Incredible Vacation.
          </h1>
          <p className="mt-4 max-w-xl text-base text-slate-200 sm:text-lg font-medium drop-shadow leading-relaxed">
            Explore wild river rapids, primary rainforests, ancient monoliths, and pristine Sri Lankan natural wonders.
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

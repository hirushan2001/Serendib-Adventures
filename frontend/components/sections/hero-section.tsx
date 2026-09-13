import React from "react";
import { SearchFilterBar } from "@/components/search-filter-bar";
import { images } from "@/lib/adventure-data";

/**
 * HeroSection Component
 * Renders the floating rounded hero card with embedded search bar
 */
export function HeroSection() {
  return (
    <section className="page-shell pt-24 pb-12">
      <div className="relative flex min-h-[78vh] flex-col justify-between overflow-hidden rounded-[2.5rem] bg-slate-900 p-6 sm:p-12 shadow-2xl text-white">
        
        {/* Background Hero Image */}
        <img
          src={images.rafting}
          alt="Tropical Sri Lankan River Adventure"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover"
        />
        
        {/* Soft Dark Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/30" />

        {/* Hero Top Content */}
        <div className="relative z-10 max-w-3xl pt-10 sm:pt-14">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-400 mb-3 drop-shadow">
            Make Your Hassle-Free Travel Plans Now!
          </p>
          <h1 className="font-display text-4xl font-black leading-[1.02] sm:text-6xl lg:text-7xl tracking-tight text-white drop-shadow-md">
            To The World Of An<br className="hidden sm:inline" /> Incredible Vacation.
          </h1>
          <p className="mt-4 max-w-xl text-base text-slate-200 sm:text-lg font-medium drop-shadow">
            Explore wild river rapids, primary rainforests, ancient monoliths, and pristine Sri Lankan natural wonders.
          </p>
        </div>

        {/* Embedded Floating White Search Bar */}
        <div className="relative z-20 pt-10 pb-2">
          <SearchFilterBar />
        </div>

      </div>
    </section>
  );
}

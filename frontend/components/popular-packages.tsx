"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tour } from "@/lib/types";

export function PopularPackagesCarousel({ adventures }: { adventures: Tour[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative w-full">
      {/* Top Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Popular <span className="rounded-xl bg-emerald-200 px-3.5 py-0.5 text-slate-900 dark:bg-emerald-500/30 dark:text-emerald-300 font-extrabold inline-block">Within Sri Lanka</span> Packages
        </h2>

        <Link
          href="/adventures"
          className="group hidden sm:flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
        >
          <div className="flex items-center gap-1">
            <div className="flex flex-col gap-0.5">
              <span className="size-1 rounded-full bg-emerald-500 group-hover:bg-emerald-600 transition" />
              <span className="size-1 rounded-full bg-emerald-500 group-hover:bg-emerald-600 transition" />
            </div>
            <span className="size-1 rounded-full bg-emerald-500 group-hover:bg-emerald-600 transition" />
          </div>
          <span>See all</span>
        </Link>
      </div>

      {/* Cards Container with Side Floating Arrows & Clipped Overflow */}
      <div className="relative group px-1">
        
        {/* Floating Left Arrow */}
        <button
          suppressHydrationWarning
          onClick={() => handleScroll("left")}
          aria-label="Scroll left"
          className="absolute -left-3 top-1/2 z-30 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-900 shadow-2xl border border-slate-200 transition-all hover:bg-slate-900 hover:text-white active:scale-95 dark:bg-slate-900 dark:text-white dark:border-slate-700 dark:hover:bg-emerald-500"
        >
          <ChevronLeft className="size-6" />
        </button>

        {/* Outer Clipped Overflow Window */}
        <div className="overflow-hidden rounded-3xl">
          {/* Cards Scroll Track */}
          <div
            ref={scrollRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 pt-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {adventures.map((item) => {
              const shortName = item.location.split(",")[0].trim();
              const provinceName = item.location.split(",")[1]?.trim() || "Sri Lanka";

              return (
                <Link
                  key={item.id}
                  href={`/adventures/${item.slug}`}
                  className="group/card relative flex aspect-[3/4] w-[80vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl bg-slate-900 shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl sm:w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-3.75rem)/4)]"
                >
                  {/* Background Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    width={600}
                    height={800}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                  />

                  {/* Soft Gradient Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-slate-950/20" />

                  {/* Top Left Province/District Tag */}
                  <div className="relative z-10 p-5">
                    <span className="text-xs font-semibold text-slate-200/90 drop-shadow-md">
                      {provinceName}
                    </span>
                  </div>

                  {/* Bottom Card Title & Price Overlay */}
                  <div className="relative z-10 p-6 text-white">
                    <h3 className="font-display text-2xl sm:text-3xl font-black leading-none tracking-tight text-white drop-shadow-md">
                      {shortName}
                    </h3>

                    <p className="mt-2 text-base sm:text-lg font-extrabold text-slate-100 drop-shadow">
                      ${item.price} <span className="text-xs font-normal text-slate-300">Onwards</span>
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Floating Right Arrow */}
        <button
          suppressHydrationWarning
          onClick={() => handleScroll("right")}
          aria-label="Scroll right"
          className="absolute -right-3 top-1/2 z-30 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-900 shadow-2xl border border-slate-200 transition-all hover:bg-slate-900 hover:text-white active:scale-95 dark:bg-slate-900 dark:text-white dark:border-slate-700 dark:hover:bg-emerald-500"
        >
          <ChevronRight className="size-6" />
        </button>

      </div>

      {/* Mobile Centered "See all" below cards (matching reference screenshot) */}
      <div className="mt-7 flex justify-center sm:hidden">
        <Link
          href="/adventures"
          className="group inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition"
        >
          <div className="flex items-center gap-1">
            <div className="flex flex-col gap-0.5">
              <span className="size-1 rounded-full bg-emerald-500 group-hover:bg-emerald-600 transition" />
              <span className="size-1 rounded-full bg-emerald-500 group-hover:bg-emerald-600 transition" />
            </div>
            <span className="size-1 rounded-full bg-emerald-500 group-hover:bg-emerald-600 transition" />
          </div>
          <span>See all</span>
        </Link>
      </div>
    </div>
  );
}

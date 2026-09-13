"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronRight as ArrowRightIcon } from "lucide-react";
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
        <div className="flex items-center flex-wrap gap-2">
          <h2 className="font-display text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
            Best Selling Packages
          </h2>
          <span className="rounded-lg bg-orange-100 px-3 py-1 text-xl sm:text-2xl font-black text-orange-950 dark:bg-emerald-500/20 dark:text-emerald-400">
            Within Sri Lanka
          </span>
        </div>

        <div>
          <Link
            href="/adventures"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-600 shadow-md"
          >
            View All (200+) <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Cards Container with Side Floating Arrows & Clipped Overflow */}
      <div className="relative group px-1">
        
        {/* Floating Left Arrow */}
        <button
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
          onClick={() => handleScroll("right")}
          aria-label="Scroll right"
          className="absolute -right-3 top-1/2 z-30 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-900 shadow-2xl border border-slate-200 transition-all hover:bg-slate-900 hover:text-white active:scale-95 dark:bg-slate-900 dark:text-white dark:border-slate-700 dark:hover:bg-emerald-500"
        >
          <ChevronRight className="size-6" />
        </button>

      </div>
    </div>
  );
}

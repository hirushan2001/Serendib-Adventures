"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star, MapPin, Clock3, Mountain, Heart, ArrowUpRight } from "lucide-react";
import { Tour } from "@/lib/types";

export function PopularPackagesCarousel({ adventures }: { adventures: Tour[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative w-full">
      {/* Top Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Popular Tour Packages In <span className="rounded-xl bg-emerald-200 px-3.5 py-0.5 text-slate-900 dark:bg-emerald-500/30 dark:text-emerald-300 font-extrabold inline-block">Sri Lanka</span>
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
          className="absolute -left-4 top-1/2 z-30 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-900 shadow-2xl border border-slate-200 transition-all hover:bg-emerald-500 hover:text-white hover:border-emerald-500 active:scale-95 dark:bg-slate-900 dark:text-white dark:border-slate-800 dark:hover:bg-emerald-500"
        >
          <ChevronLeft className="size-6" />
        </button>

        {/* Outer Clipped Overflow Window */}
        <div className="overflow-hidden rounded-3xl py-2">
          {/* Cards Scroll Track */}
          <div
            ref={scrollRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pt-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {adventures.map((item) => {
              const isFav = !!favorites[item.id];

              return (
                <Link
                  key={item.id}
                  href={`/adventures/${item.slug}`}
                  className="group/card relative flex w-[85vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)]"
                >
                  {/* Card Image Container */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      width={600}
                      height={400}
                      className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover/card:scale-105"
                    />

                    {/* Top Left Emerald Category Badge */}
                    <div className="absolute top-3 left-3 bg-emerald-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-md backdrop-blur-md">
                      {item.category}
                    </div>

                    {/* Top Right Wishlist Button */}
                    <button
                      suppressHydrationWarning
                      onClick={(e) => toggleFavorite(item.id, e)}
                      aria-label="Save to wishlist"
                      className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-white/90 dark:bg-slate-900/90 shadow-md backdrop-blur-md hover:scale-110 active:scale-95 transition"
                    >
                      <Heart
                        className={`size-4 transition ${
                          isFav
                            ? "fill-emerald-500 text-emerald-500"
                            : "text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating & Location Tag */}
                      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="size-3.5 fill-current" />
                          <span className="text-slate-900 dark:text-white">{item.rating || 4.9}</span>
                          <span className="text-slate-400 font-normal">({item.reviewsCount || 45})</span>
                        </span>

                        <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                          <MapPin className="size-3.5 text-emerald-500 shrink-0" />
                          <span className="truncate max-w-[120px]">{item.location}</span>
                        </span>
                      </div>

                      {/* Card Title */}
                      <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover/card:text-emerald-600 dark:group-hover/card:text-emerald-400 transition">
                        {item.title}
                      </h3>

                      {/* Tour Details: Duration & Difficulty */}
                      <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Clock3 className="size-3.5 text-emerald-500" />
                          {item.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Mountain className="size-3.5 text-emerald-500" />
                          {item.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Footer: Price & Explore CTA */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">From</span>
                        <div className="flex items-baseline gap-1">
                          <strong className="font-display text-xl font-extrabold text-slate-900 dark:text-white">${item.price}</strong>
                          <span className="text-[11px] font-normal text-slate-400">/ person</span>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-3.5 py-2 shadow-sm transition group-hover/card:shadow-md">
                        <span>Explore</span>
                        <ArrowUpRight className="size-3.5" />
                      </div>
                    </div>
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
          className="absolute -right-4 top-1/2 z-30 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-900 shadow-2xl border border-slate-200 transition-all hover:bg-emerald-500 hover:text-white hover:border-emerald-500 active:scale-95 dark:bg-slate-900 dark:text-white dark:border-slate-800 dark:hover:bg-emerald-500"
        >
          <ChevronRight className="size-6" />
        </button>

      </div>

      {/* Mobile Centered "See all" below cards */}
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


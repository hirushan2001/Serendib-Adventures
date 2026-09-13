"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Star, ChevronRight as ArrowRightIcon } from "lucide-react";
import { Tour } from "@/lib/types";

export function PopularPackagesCarousel({ adventures }: { adventures: Tour[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const packageCounts = ["100+ Packages", "150+ Packages", "90+ Packages", "120+ Packages", "80+ Packages", "110+ Packages"];

  return (
    <div className="w-full">
      {/* Top Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
            Popular International Packages
          </h2>
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

      {/* Cards Track */}
      <div
        ref={scrollRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pt-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {adventures.map((item, idx) => (
          <Link
            key={item.id}
            href={`/adventures/${item.slug}`}
            className="group relative flex aspect-[3/4] w-[16.5rem] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl bg-slate-900 shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl sm:w-[18.5rem]"
          >
            {/* Background Image */}
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              width={600}
              height={800}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

            {/* Top Left Count Badge (Matching Reference) */}
            <div className="relative z-10 p-4">
              <span className="inline-block rounded-full bg-black/40 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                {packageCounts[idx % packageCounts.length]}
              </span>
            </div>

            {/* Bottom Card Info Overlay */}
            <div className="relative z-10 p-5 text-white">
              <h3 className="font-display text-xl font-bold leading-snug text-white transition group-hover:text-emerald-400 line-clamp-1">
                {item.title}
              </h3>

              <div className="mt-1 flex items-center justify-between gap-2 text-xs text-slate-200">
                <span className="font-medium text-slate-300 line-clamp-1">{item.category}</span>
                <div className="flex items-center gap-1 font-bold text-amber-400 shrink-0">
                  <Star className="size-3.5 fill-current text-amber-400" />
                  <span>{item.rating}</span>
                </div>
              </div>

              {/* Red Pin Location Tag */}
              <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin className="size-3.5 fill-red-500 text-red-500 shrink-0" />
                  <span className="line-clamp-1">{item.location}</span>
                </div>
                <span className="font-extrabold text-white text-sm">${item.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

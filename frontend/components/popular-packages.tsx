"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star, MapPin, Clock3, Heart, ArrowRight, Anchor } from "lucide-react";
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
          Popular Tour Packages In <span className="rounded-xl bg-[#c3e0ef] px-3.5 py-0.5 text-[#10354d] dark:bg-[#184E70]/30 dark:text-[#3992bf] font-extrabold inline-block">Sri Lanka</span>
        </h2>

        <Link
          href="/adventures"
          className="group hidden sm:flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-[#184E70] dark:hover:text-[#3992bf] transition"
        >
          <div className="flex items-center gap-1">
            <div className="flex flex-col gap-0.5">
              <span className="size-1 rounded-full bg-[#184E70] group-hover:bg-[#144260] transition" />
              <span className="size-1 rounded-full bg-[#184E70] group-hover:bg-[#144260] transition" />
            </div>
            <span className="size-1 rounded-full bg-[#184E70] group-hover:bg-[#144260] transition" />
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
          className="absolute -left-4 top-1/2 z-30 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-900 shadow-2xl border border-slate-200 transition-all hover:bg-[#184E70] hover:text-white hover:border-[#184E70] active:scale-95 dark:bg-slate-900 dark:text-white dark:border-slate-800 dark:hover:bg-[#184E70]"
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
              const cardUrl = item.viatorUrl || `/adventures/${item.slug}`;
              const isExternal = !!item.viatorUrl;

              const LinkWrapper = ({ children, className }: { children: React.ReactNode; className?: string }) => {
                if (isExternal) {
                  return (
                    <a href={cardUrl} target="_blank" rel="noopener noreferrer" className={className}>
                      {children}
                    </a>
                  );
                }
                return (
                  <Link href={cardUrl} className={className}>
                    {children}
                  </Link>
                );
              };

              return (
                <article
                  key={item.id}
                  className="group/card relative flex w-[85vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)]"
                >
                  {/* Header Image Container */}
                  <header className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 leading-none select-none">
                    <LinkWrapper className="block h-full w-full">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        width={600}
                        height={400}
                        className="block h-full w-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
                      />
                    </LinkWrapper>

                    {/* Top Left Red Price Badge */}
                    <div className="absolute top-0 left-0 bg-[#ff0050] text-white text-xs px-3.5 py-1.5 rounded-br-2xl shadow-md flex items-center gap-1.5 font-sans z-10">
                      <span className="font-normal text-white/95">From</span>
                      <strong className="font-display text-base font-black">${item.price}</strong>
                    </div>

                    {/* Top Right Wishlist Button */}
                    <button
                      suppressHydrationWarning
                      onClick={(e) => toggleFavorite(item.id, e)}
                      aria-label="Save to wishlist"
                      className="absolute top-3 right-3 grid size-8 place-items-center rounded-xl bg-white shadow-md transition hover:scale-110 active:scale-95 z-10"
                    >
                      <Heart
                        className={`size-4 ${
                          isFav ? "fill-[#ff0050] text-[#ff0050]" : "text-[#ff0050]"
                        }`}
                      />
                    </button>

                    {/* Bottom Location Tag (.product-card__location) */}
                    <div className="absolute -bottom-[1px] -left-[1px] z-20 flex items-center gap-1.5 bg-white px-[0.875rem] py-[0.375rem] rounded-tr-[6px] text-[0.75rem] font-bold text-[#00193c] shadow-sm">
                      <MapPin className="size-3.5 text-[#00193c] shrink-0" />
                      <span className="truncate">Discover Sri Lanka - {item.location}</span>
                    </div>
                  </header>

                  {/* Main Content Body */}
                  <main className="relative z-10 -mt-px bg-white dark:bg-slate-900 p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <LinkWrapper>
                        <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white line-clamp-2 leading-snug transition hover:text-[#184E70]">
                          {item.title}
                        </h3>
                      </LinkWrapper>

                      {/* Specs / Details List */}
                      <div className="mt-3.5 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                          <Anchor className="size-3.5 text-slate-700 dark:text-slate-300 shrink-0" />
                          <span>{item.groupSize ? "Hotel pick-up" : "Meet on location"}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                          <Clock3 className="size-3.5 text-slate-700 dark:text-slate-300 shrink-0" />
                          <span>{item.duration}</span>
                        </div>

                        <div className="mt-2.5">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-3 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                            <Star className="size-3.5 fill-emerald-500 text-emerald-500" />
                            {item.badge || "Bestseller"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <footer className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300">
                        <span className="grid size-5 place-items-center rounded-full border border-slate-800 dark:border-slate-300 text-[10px] font-black text-slate-800 dark:text-slate-300 leading-none">
                          24
                        </span>
                        <span>Flexible cancellation</span>
                      </div>

                      <LinkWrapper className="flex items-center gap-1 text-sm font-black text-[#ff0050] hover:text-[#e11d48] transition">
                        <span>View</span>
                        <ArrowRight className="size-4" />
                      </LinkWrapper>
                    </footer>
                  </main>
                </article>
              );
            })}
          </div>
        </div>

        {/* Floating Right Arrow */}
        <button
          suppressHydrationWarning
          onClick={() => handleScroll("right")}
          aria-label="Scroll right"
          className="absolute -right-4 top-1/2 z-30 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-900 shadow-2xl border border-slate-200 transition-all hover:bg-[#184E70] hover:text-white hover:border-[#184E70] active:scale-95 dark:bg-slate-900 dark:text-white dark:border-slate-800 dark:hover:bg-[#184E70]"
        >
          <ChevronRight className="size-6" />
        </button>

      </div>

      {/* Mobile Centered "See all" below cards */}
      <div className="mt-7 flex justify-center sm:hidden">
        <Link
          href="/adventures"
          className="group inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-[#184E70] dark:hover:text-[#3992bf] transition"
        >
          <div className="flex items-center gap-1">
            <div className="flex flex-col gap-0.5">
              <span className="size-1 rounded-full bg-[#184E70] group-hover:bg-[#144260] transition" />
              <span className="size-1 rounded-full bg-[#184E70] group-hover:bg-[#144260] transition" />
            </div>
            <span className="size-1 rounded-full bg-[#184E70] group-hover:bg-[#144260] transition" />
          </div>
          <span>See all</span>
        </Link>
      </div>
    </div>
  );
}

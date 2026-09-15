"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Heart, MapPin, Clock, ArrowRight, Star, Calendar, Bus, ChevronLeft, ChevronRight } from "lucide-react";
import { images } from "@/lib/adventure-data";

export interface ScheduledEvent {
  id: string;
  slug: string;
  title: string;
  locationTag: string;
  price: string;
  image: string;
  pickupInfo: string;
  eventDate: string;
  spotsLeft: string;
  badge: string;
}

const scheduledEvents: ScheduledEvent[] = [
  {
    id: "lanka-ella-abseil-event",
    slug: "waterfall-abseiling-experience",
    title: "Lanka Ella Waterfall Abseiling & Hiking Event",
    locationTag: "Discover Sri Lanka - Lanka Ella",
    price: "Rs. 17,500",
    image: images.abseiling,
    pickupInfo: "AC Bus Pickup from Colombo",
    eventDate: "29 March 2026",
    spotsLeft: "Max 16 Spots Only",
    badge: "Scheduled Event",
  },
  {
    id: "kitulgala-rafting-event",
    slug: "kitulgala-white-water-rafting",
    title: "Kitulgala White Water Rafting & Canyoning Fest",
    locationTag: "Discover Sri Lanka - Kitulgala",
    price: "Rs. 14,500",
    image: images.rafting,
    pickupInfo: "AC Bus from Colombo & Kandy",
    eventDate: "12 April 2026",
    spotsLeft: "Max 20 Spots Only",
    badge: "Scheduled Event",
  },
  {
    id: "sinharaja-safari-event",
    slug: "sinharaja-rainforest-expedition",
    title: "Sinharaja Rainforest Night & Dawn Safari Expedition",
    locationTag: "Discover Sri Lanka - Sinharaja",
    price: "Rs. 19,800",
    image: images.camping,
    pickupInfo: "AC Transport from Colombo",
    eventDate: "03 May 2026",
    spotsLeft: "Max 12 Spots Only",
    badge: "Scheduled Event",
  },
  {
    id: "knuckles-peak-event",
    slug: "knuckles-cloud-forest-trek",
    title: "Knuckles Cloud Forest Peak & Waterfall Hike",
    locationTag: "Discover Sri Lanka - Knuckles",
    price: "Rs. 16,000",
    image: images.trekking,
    pickupInfo: "AC Bus from Colombo & Kandy",
    eventDate: "17 May 2026",
    spotsLeft: "Max 15 Spots Only",
    badge: "Scheduled Event",
  },
];

export function UpcomingEventSection() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
    <section className="page-shell py-12 md:py-16">
      {/* Section Header */}
      <div className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Upcoming Scheduled <span className="rounded-xl bg-[#184E70]/15 px-3.5 py-0.5 text-[#184E70] dark:bg-[#184E70]/30 dark:text-sky-300 font-extrabold inline-block">Events</span>
          </h2>
        </div>

        <Link
          href="/booking"
          className="group hidden lg:flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-[#184E70] dark:hover:text-sky-400 transition"
        >
          <div className="flex items-center gap-1">
            <div className="flex flex-col gap-0.5">
              <span className="size-1 rounded-full bg-[#184E70] group-hover:bg-[#123d58] transition" />
              <span className="size-1 rounded-full bg-[#184E70] group-hover:bg-[#123d58] transition" />
            </div>
            <span className="size-1 rounded-full bg-[#184E70] group-hover:bg-[#123d58] transition" />
          </div>
          <span>See all</span>
        </Link>
      </div>

      {/* Cards Carousel Container with Side Floating Arrows */}
      <div className="relative group px-1">
        
        {/* Floating Left Arrow */}
        <button
          suppressHydrationWarning
          onClick={() => handleScroll("left")}
          aria-label="Scroll left"
          className="absolute -left-3 top-1/2 z-30 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-900 shadow-2xl border border-slate-200 transition-all hover:bg-[#184E70] hover:text-white active:scale-95 dark:bg-slate-900 dark:text-white dark:border-slate-700 dark:hover:bg-[#184E70]"
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
            {scheduledEvents.map((item) => {
              const isFav = !!favorites[item.id];

              return (
                <Link
                  href={`/adventures/${item.slug}`}
                  key={item.id}
                  className="group/card relative flex aspect-auto w-[80vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)]"
                >
                  {/* Image Header with Price & Badge Overlays */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 leading-none select-none">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="block h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                    />

                    {/* Top-Left Red Price Badge */}
                    <div className="absolute top-0 left-0 bg-[#ff0050] font-black text-white text-xs sm:text-sm px-3.5 py-1.5 rounded-br-2xl shadow-md flex items-center gap-1">
                      <span>Price</span>
                      <span className="text-sm sm:text-base">{item.price}</span>
                    </div>

                    {/* Top-Right Favorite Heart Icon */}
                    <button
                      suppressHydrationWarning
                      onClick={(e) => toggleFavorite(item.id, e)}
                      aria-label="Add to wishlist"
                      className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-white/90 dark:bg-slate-900/90 shadow-md backdrop-blur-md hover:scale-110 active:scale-95 transition"
                    >
                      <Heart
                        className={`size-4 transition ${
                          isFav
                            ? "fill-[#ff0050] text-[#ff0050]"
                            : "text-slate-600 dark:text-slate-300 hover:text-[#ff0050] dark:hover:text-[#ff0050]"
                        }`}
                      />
                    </button>

                    {/* Bottom-Left Location Tag */}
                    <div className="absolute -bottom-[1px] -left-[1px] z-20 flex items-center gap-1.5 bg-white px-[0.875rem] py-[0.375rem] rounded-tr-[6px] text-[0.75rem] font-bold text-[#00193c] shadow-sm">
                      <MapPin className="size-3.5 text-[#00193c] shrink-0" />
                      <span className="truncate max-w-[200px]">{item.locationTag}</span>
                    </div>
                  </div>

                  {/* Card Body Content */}
                  <div className="relative z-10 -mt-px bg-white dark:bg-slate-900 p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover/card:text-[#184E70] dark:group-hover/card:text-sky-400 transition">
                        {item.title}
                      </h3>

                      {/* Scheduled Event Specific Details */}
                      <div className="mt-3.5 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                          <Calendar className="size-3.5 text-[#184E70] dark:text-sky-400 shrink-0" />
                          <span className="font-bold text-[#184E70] dark:text-sky-300">{item.eventDate}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                          <Bus className="size-3.5 text-slate-700 dark:text-slate-300 shrink-0" />
                          <span>{item.pickupInfo}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                          <Clock className="size-3.5 text-slate-700 dark:text-slate-300 shrink-0" />
                          <span>{item.spotsLeft}</span>
                        </div>
                      </div>

                      {/* Badge Pill */}
                      <div className="mt-3.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-3 py-0.5 text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                          <Star className="size-3 fill-emerald-500 text-emerald-500" />
                          {item.badge}
                        </span>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300">
                        <span className="grid size-5 place-items-center rounded-full border border-slate-800 dark:border-slate-300 text-[10px] font-black text-slate-800 dark:text-slate-300 leading-none">
                          24
                        </span>
                        <span>Flexible cancellation</span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-black text-[#ff0050] hover:text-[#e11d48] group-hover/card:translate-x-1 transition">
                        View <ArrowRight className="size-3.5" />
                      </span>
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
          className="absolute -right-3 top-1/2 z-30 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-900 shadow-2xl border border-slate-200 transition-all hover:bg-[#184E70] hover:text-white active:scale-95 dark:bg-slate-900 dark:text-white dark:border-slate-700 dark:hover:bg-[#184E70]"
        >
          <ChevronRight className="size-6" />
        </button>

      </div>

      {/* Mobile/Tablet Centered "See all" below cards */}
      <div className="mt-7 flex justify-center lg:hidden">
        <Link
          href="/booking"
          className="group inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-[#184E70] dark:hover:text-sky-400 transition"
        >
          <div className="flex items-center gap-1">
            <div className="flex flex-col gap-0.5">
              <span className="size-1 rounded-full bg-[#184E70] group-hover:bg-[#123d58] transition" />
              <span className="size-1 rounded-full bg-[#184E70] group-hover:bg-[#123d58] transition" />
            </div>
            <span className="size-1 rounded-full bg-[#184E70] group-hover:bg-[#123d58] transition" />
          </div>
          <span>See all</span>
        </Link>
      </div>
    </section>
  );
}

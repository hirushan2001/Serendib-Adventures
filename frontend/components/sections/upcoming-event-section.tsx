"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, MapPin, Clock, ArrowRight, Star, Calendar, Bus } from "lucide-react";
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

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="page-shell py-12 md:py-16">
      {/* Section Header */}
      <div className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Upcoming Scheduled <span className="rounded-xl bg-emerald-200 px-3.5 py-0.5 text-slate-900 dark:bg-emerald-500/30 dark:text-emerald-300 font-extrabold inline-block">Events</span>
          </h2>
        </div>

        <Link
          href="/booking"
          className="group flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
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

      {/* 4 Cards Grid of Scheduled Events */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {scheduledEvents.map((item) => {
          const isFav = !!favorites[item.id];

          return (
            <Link
              href={`/adventures/${item.slug}`}
              key={item.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Header with Price & Badge Overlays */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Top-Left Emerald Price Badge */}
                <div className="absolute top-0 left-0 bg-emerald-500 font-black text-white text-xs sm:text-sm px-3.5 py-1.5 rounded-br-2xl shadow-md flex items-center gap-1">
                  <span>Price</span>
                  <span className="text-sm sm:text-base">{item.price}</span>
                </div>

                {/* Top-Right Favorite Heart Icon */}
                <button
                  onClick={(e) => toggleFavorite(item.id, e)}
                  aria-label="Add to wishlist"
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

                {/* Bottom-Left Location Pill Tag */}
                <div className="absolute bottom-2.5 left-3 rounded-lg bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-slate-800 dark:text-slate-200 shadow-sm flex items-center gap-1.5">
                  <MapPin className="size-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate max-w-[200px]">{item.locationTag}</span>
                </div>
              </div>

              {/* Card Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                    {item.title}
                  </h3>

                  {/* Scheduled Event Specific Details */}
                  <div className="mt-3.5 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                      <Calendar className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="font-bold text-emerald-700 dark:text-emerald-300">{item.eventDate}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                      <Bus className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{item.pickupInfo}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                      <Clock className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
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
                <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
                  <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition">
                    Book Event <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { Destination } from "@/lib/types";

export function DestinationsSpotlight({ destinations }: { destinations: Destination[] }) {
  return (
    <section className="page-shell py-12 md:py-16">
      {/* Section Header */}
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1.5">
            Beyond The Ordinary
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Explore Sri Lanka
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Six iconic landscapes. Countless ways to experience their untouched wild beauty.
        </p>
      </div>

      {/* Destinations Cards Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {destinations.map((item) => (
          <Link
            href="/destinations"
            key={item.id}
            className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-900 shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl"
          >
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              width={1000}
              height={1300}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 text-white">
              <span className="inline-block rounded-full bg-emerald-500 px-3.5 py-1 text-xs font-bold text-white shadow-md">
                {item.toursCount}
              </span>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-white drop-shadow-md transition group-hover:text-emerald-300">
                {item.name}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300 line-clamp-2">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}


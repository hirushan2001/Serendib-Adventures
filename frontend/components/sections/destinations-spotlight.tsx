import React from "react";
import Link from "next/link";
import { Destination } from "@/lib/types";

export function DestinationsSpotlight({ destinations }: { destinations: Destination[] }) {
  return (
    <section className="page-shell py-10 md:py-14">
      {/* Top Header Bar */}
      <div className="mb-6 md:mb-7 flex items-center justify-between gap-4">
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Top Destinations In <span className="rounded-xl bg-emerald-200 px-3.5 py-0.5 text-slate-900 dark:bg-emerald-500/30 dark:text-emerald-300 font-extrabold inline-block">Sri Lanka</span>
        </h2>

        {/* Right "See all" with emerald dots icon */}
        <Link
          href="/destinations"
          className="group hidden lg:flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
        >
          {/* 3 Emerald Dots Cluster Icon */}
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

      {/* 5-Column Grid on Desktop matching exact booklanka.com layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
        {destinations.slice(0, 10).map((item) => (
          <Link
            href="/destinations"
            key={item.id}
            className="group flex flex-col items-start cursor-pointer w-full"
          >
            {/* Image Container with exact 216px height matching booklanka.com CSS */}
            <div className="relative h-[216px] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-sm group-hover:shadow-md transition">
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                width={400}
                height={216}
                className="h-[216px] w-full object-cover origin-center transition-transform duration-200 ease-in-out group-hover:scale-105"
              />
            </div>

            {/* Destination Name Directly Below Image */}
            <h3 className="mt-2.5 font-bold text-sm sm:text-base text-slate-900 dark:text-white transition group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
              {item.name}
            </h3>
          </Link>
        ))}
      </div>

      {/* Mobile/Tablet Centered "See all" below cards */}
      <div className="mt-7 flex justify-center lg:hidden">
        <Link
          href="/destinations"
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
    </section>
  );
}


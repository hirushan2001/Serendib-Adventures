import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Category } from "@/lib/types";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="page-shell py-12 md:py-16">
      {/* Header with Title & Subtitle matching reference design */}
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1.5">
            Find Your Element
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Choose <span className="rounded-md bg-emerald-200/90 px-2.5 py-0.5 text-slate-900 dark:bg-emerald-500/30 dark:text-emerald-300 font-extrabold inline-block">Your Adventure</span>
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          From high-adrenaline river rapids to remote highland cloud forests,
          every experience is shaped by Sri Lanka's wild beauty.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid auto-rows-[20rem] gap-5 grid-cols-1 md:grid-cols-4">
        {categories.map((item) => (
          <Link
            href={`/adventures?category=${item.id}`}
            key={item.title}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-slate-900 shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${
              item.className || ""
            }`}
          >
            {/* Background Image */}
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              width={1000}
              height={800}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

            {/* Top Row: Badge & Tour Count Pill */}
            <div className="relative z-10 flex items-center justify-between p-5 sm:p-6">
              {item.badge ? (
                <span className="rounded-full bg-emerald-500 px-3.5 py-1 text-xs font-bold text-white shadow-md">
                  {item.badge}
                </span>
              ) : (
                <div />
              )}
              {item.count && (
                <span className="rounded-full bg-black/40 border border-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                  {item.count}
                </span>
              )}
            </div>

            {/* Bottom Row: Content & Glass Action Button */}
            <div className="relative z-10 flex items-end justify-between p-6 text-white">
              <div className="pr-4">
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-md transition group-hover:text-emerald-300">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="mt-1 text-xs sm:text-sm font-normal text-slate-200 drop-shadow line-clamp-1">
                    {item.subtitle}
                  </p>
                )}
              </div>

              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-white/20 border border-white/30 backdrop-blur-md text-white transition-all duration-300 group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-white shadow-lg group-hover:scale-110">
                <ArrowUpRight className="size-5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}


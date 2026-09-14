import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Category } from "@/lib/types";

function CategoryCard({ item, className = "" }: { item: Category; className?: string }) {
  return (
    <Link
      href={`/adventures?category=${item.id}`}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-slate-900 shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${className}`}
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
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

      {/* Top Row: Badge & Tour Count */}
      <div className="relative z-10 flex items-center justify-between p-5">
        {item.badge ? (
          <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow-md">
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

      {/* Bottom Row: Content with MapPin */}
      <div className="relative z-10 p-5 text-white">
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white drop-shadow-md transition group-hover:text-emerald-300">
          {item.title}
        </h3>
        {item.subtitle && (
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-200 font-medium drop-shadow">
            <MapPin className="size-3.5 text-emerald-400 shrink-0" />
            <span className="line-clamp-1">{item.subtitle}</span>
          </p>
        )}
      </div>
    </Link>
  );
}

export function CategoryGrid({ categories }: { categories: Category[] }) {
  const raftingCat = categories.find((c) => c.id === "white-water-rafting") || categories[0];
  const canyoningCat = categories.find((c) => c.id === "canyoning") || categories[1];
  const abseilingCat = categories.find((c) => c.id === "waterfall-abseiling") || categories[3];
  const trekkingCat = categories.find((c) => c.id === "jungle-trekking") || categories[2];
  const campingCat = categories.find((c) => c.id === "camping-nature") || categories[4];
  const safariCat = categories.find((c) => c.id === "cultural-safari") || categories[5];

  return (
    <section className="page-shell py-12 md:py-16">
      {/* Centered Header matching reference screenshot */}
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Choose <span className="rounded-xl bg-emerald-200 px-3.5 py-0.5 text-slate-900 dark:bg-emerald-500/30 dark:text-emerald-300 font-extrabold inline-block">Your Adventure</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          From high-adrenaline river rapids to remote highland cloud forests, every experience is shaped by Sri Lanka's wild beauty.
        </p>
      </div>

      {/* 3-Column Bento Grid matching uploaded screenshot */}
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Left Column (Wide Top Card + 2 Side-by-Side Bottom Cards) */}
        <div className="flex flex-col gap-5 lg:col-span-1">
          <CategoryCard item={raftingCat} className="h-[14rem]" />
          <div className="grid grid-cols-2 gap-5">
            <CategoryCard item={canyoningCat} className="h-[17rem]" />
            <CategoryCard item={abseilingCat} className="h-[17rem]" />
          </div>
        </div>

        {/* Middle Column (Single Tall Vertical Hero Card) */}
        <div className="lg:col-span-1">
          <CategoryCard item={trekkingCat} className="h-full min-h-[32rem]" />
        </div>

        {/* Right Column (2 Medium Stacked Cards) */}
        <div className="flex flex-col gap-5 lg:col-span-1">
          <CategoryCard item={campingCat} className="h-[15rem]" />
          <CategoryCard item={safariCat} className="h-[16rem]" />
        </div>
      </div>
    </section>
  );
}



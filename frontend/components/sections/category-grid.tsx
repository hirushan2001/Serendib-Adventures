"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import gsap from "gsap";
import { Category } from "@/lib/types";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const raftingCat = categories.find((c) => c.id === "white-water-rafting") || categories[0];
  const canyoningCat = categories.find((c) => c.id === "canyoning") || categories[1];
  const abseilingCat = categories.find((c) => c.id === "waterfall-abseiling") || categories[3];
  const trekkingCat = categories.find((c) => c.id === "jungle-trekking") || categories[2];
  const campingCat = categories.find((c) => c.id === "camping-nature") || categories[4];
  const safariCat = categories.find((c) => c.id === "cultural-safari") || categories[5];

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".masonry-item");
    if (!cards || cards.length === 0) return;

    // GSAP entry animation from bottom
    gsap.set(cards, { y: 45, opacity: 0 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.05,
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const renderCard = (item: Category, className: string) => {
    return (
      <Link
        key={item.id}
        href={`/adventures?category=${item.id}`}
        className={`masonry-item group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-slate-900 shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${className}`}
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
  };

  return (
    <section className="page-shell py-12 md:py-16">
      {/* Centered Header */}
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Choose <span className="rounded-xl bg-emerald-200 px-3.5 py-0.5 text-slate-900 dark:bg-emerald-500/30 dark:text-emerald-300 font-extrabold inline-block">Your Adventure</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          From high-adrenaline river rapids to remote highland cloud forests, every experience is shaped by Sri Lanka's wild beauty.
        </p>
      </div>

      {/* Bento Grid with GSAP Stagger & BlurToFocus Effects */}
      <div ref={sectionRef} className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Left Column */}
        <div className="flex flex-col gap-5 lg:col-span-1">
          {renderCard(raftingCat, "h-[14rem]")}
          <div className="grid grid-cols-2 gap-5">
            {renderCard(canyoningCat, "h-[17rem]")}
            {renderCard(abseilingCat, "h-[17rem]")}
          </div>
        </div>

        {/* Middle Column */}
        <div className="lg:col-span-1">
          {renderCard(trekkingCat, "h-full min-h-[32rem]")}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-5 lg:col-span-1">
          {renderCard(campingCat, "h-[15rem]")}
          {renderCard(safariCat, "h-[16rem]")}
        </div>
      </div>
    </section>
  );
}

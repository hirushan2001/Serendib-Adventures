"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock3, Heart, MapPin, Star, Anchor } from "lucide-react";
import { Tour } from "@/lib/types";

export function AdventureCard({ adventure }: { adventure: Tour }) {
  const [isSaved, setIsSaved] = useState(false);
  const cardUrl = adventure.viatorUrl || `/adventures/${adventure.slug}`;
  const isExternal = !!adventure.viatorUrl;

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
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white dark:bg-slate-900 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Header Image & Badges Container */}
      <header className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 leading-none select-none">
        <LinkWrapper className="block h-full w-full">
          <img
            src={adventure.image}
            alt={adventure.title}
            loading="lazy"
            width={800}
            height={500}
            className="block h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </LinkWrapper>

        {/* Top-Left Red Price Badge */}
        <div className="absolute top-0 left-0 bg-[#ff0050] text-white text-xs px-3.5 py-1.5 rounded-br-2xl shadow-md flex items-center gap-1.5 font-sans z-10">
          <span className="font-normal text-white/95">From</span>
          <strong className="font-display text-base font-black">${adventure.price}</strong>
        </div>

        {/* Top-Right Heart Wishlist Button */}
        <button
          suppressHydrationWarning
          onClick={(e) => {
            e.preventDefault();
            setIsSaved(!isSaved);
          }}
          aria-label={`Save ${adventure.title}`}
          className="absolute top-3 right-3 grid size-8 place-items-center rounded-xl bg-white shadow-md transition hover:scale-110 active:scale-95 z-10"
        >
          <Heart className={`size-4 ${isSaved ? "fill-[#ff0050] text-[#ff0050]" : "text-[#ff0050]"}`} />
        </button>

        {/* Bottom Location Tag (.product-card__location) */}
        <div className="absolute -bottom-[1px] -left-[1px] z-20 flex items-center gap-1.5 bg-white px-[0.875rem] py-[0.375rem] rounded-tr-[6px] text-[0.75rem] font-bold text-[#00193c] shadow-sm">
          <MapPin className="size-3.5 text-[#00193c] shrink-0" />
          <span className="truncate">Discover Sri Lanka - {adventure.location}</span>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="relative z-10 -mt-px bg-white dark:bg-slate-900 p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <LinkWrapper>
            <h3 className="font-display text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-snug line-clamp-2 transition hover:text-[#184E70]">
              {adventure.title}
            </h3>
          </LinkWrapper>

          {/* Details List */}
          <div className="mt-3.5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <Anchor className="size-3.5 text-slate-700 dark:text-slate-300 shrink-0" />
              <span>{adventure.groupSize ? "Hotel pick-up" : "Meet on location"}</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <Clock3 className="size-3.5 text-slate-700 dark:text-slate-300 shrink-0" />
              <span>{adventure.duration}</span>
            </div>

            <div className="mt-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-3 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                <Star className="size-3.5 fill-emerald-500 text-emerald-500" />
                {adventure.badge || "Bestseller"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer: Flexible Cancellation & View Button */}
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
}
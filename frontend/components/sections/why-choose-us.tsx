import React from "react";
import Link from "next/link";
import { ShieldCheck, Users, Leaf, Compass, Award, Star, ArrowRight } from "lucide-react";
import { images } from "@/lib/adventure-data";

const guideImage = "/assets/local-guide.jpg";

const guarantees = [
  [ShieldCheck, "Safety First Standards"],
  [Users, "Certified Local Guides"],
  [Leaf, "Eco-Friendly Footprint"],
  [Compass, "Uncharted Trails"],
  [Award, "Premium Rescue Gear"],
  [Star, "5-Star Guest Rating"],
] as const;

export function WhyChooseUs() {
  return (
    <section className="page-shell py-12 md:py-16 relative overflow-hidden">
      {/* Subtle Mountain Background Silhouette Effect */}
      <div className="pointer-events-none absolute -right-20 top-0 h-full w-2/3 opacity-[0.03] dark:opacity-[0.06]">
        <svg viewBox="0 0 800 600" className="h-full w-full object-cover">
          <path
            d="M0 600 L250 250 L400 450 L600 150 L800 600 Z"
            fill="currentColor"
            className="text-slate-900 dark:text-white"
          />
        </svg>
      </div>

      <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:items-center">
        
        {/* Left Side: 3-Image Asymmetric Collage (Matching reference screenshot) */}
        <div className="lg:col-span-6 relative">
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            
            {/* Image 1: Tall Vertical Left Photo */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
              <img
                src={images.trekking}
                alt="Mountain Hiker Sri Lanka"
                loading="lazy"
                width={600}
                height={900}
                className="h-[22rem] sm:h-[26rem] lg:h-[29rem] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            </div>

            {/* Image 2 & 3: Two Stacked Photos Right */}
            <div className="flex flex-col gap-4 sm:gap-5 justify-between">
              
              {/* Top Right Photo */}
              <div className="relative overflow-hidden rounded-2xl shadow-lg group h-[10.5rem] sm:h-[12.5rem] lg:h-[14rem]">
                <img
                  src={images.highlands}
                  alt="Sri Lanka Highland Mountains"
                  loading="lazy"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
              </div>

              {/* Bottom Right Photo */}
              <div className="relative overflow-hidden rounded-2xl shadow-lg group h-[10.5rem] sm:h-[12.5rem] lg:h-[14rem]">
                <img
                  src={guideImage}
                  alt="Serendib Adventure Guide"
                  loading="lazy"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
              </div>

            </div>
          </div>
        </div>

        {/* Right Side: Content & Features */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Why Choose <span className="rounded-xl bg-emerald-200 px-3.5 py-0.5 text-slate-900 dark:bg-emerald-500/30 dark:text-emerald-300 font-extrabold inline-block">Serendib</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            We pair deep local Sri Lankan river knowledge with certified international safety standards, creating intimate small-group journeys into the island's untouched wild.
          </p>

          {/* 6 Guarantee Feature Cards Grid */}
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {guarantees.map(([Icon, label]) => {
              const I = Icon;
              return (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 transition hover:border-emerald-500/40 dark:hover:border-emerald-500/40"
                >
                  <I className="size-4 text-emerald-500 shrink-0" />
                  <span className="font-display text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* View Details Action Button */}
          <div className="mt-8">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs sm:text-sm font-extrabold text-white transition hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 shadow-md"
            >
              <span>View Details</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}

import React from "react";
import { ShieldCheck, Users, Leaf, Compass, Award, Star } from "lucide-react";

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
    <section className="page-shell py-12">
      <div className="grid gap-12 rounded-[2.5rem] bg-white p-8 sm:p-12 shadow-xl lg:grid-cols-[1.05fr_.95fr] lg:items-center dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
        <div className="relative">
          <img
            src={guideImage}
            alt="Serendib local rafting guide"
            loading="lazy"
            width={1200}
            height={1408}
            className="h-[34rem] w-full rounded-3xl object-cover shadow-2xl"
          />
          <div className="absolute -bottom-5 -right-3 rounded-2xl bg-emerald-500 p-6 text-white shadow-xl md:right-6">
            <strong className="font-display text-4xl font-black">10+ Years</strong>
            <span className="ml-3 text-xs font-bold uppercase tracking-wider block mt-1 text-emerald-100">
              Guiding Rivers & Rainforests
            </span>
          </div>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">Why Serendib Adventures</p>
          <h2 className="font-display text-4xl font-black leading-tight sm:text-5xl text-slate-900 dark:text-white">
            More than an adventure. A story to tell.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
            We pair deep local Sri Lankan river knowledge with certified international safety standards, creating intimate small-group journeys into the wild.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {guarantees.map(([Icon, label]) => {
              const I = Icon;
              return (
                <div key={label} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-800/50">
                  <I className="size-5 text-emerald-500 shrink-0" />
                  <span className="font-display text-sm font-bold text-slate-800 dark:text-slate-200">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

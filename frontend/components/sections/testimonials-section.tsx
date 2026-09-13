import React from "react";
import { Star } from "lucide-react";
import { Review } from "@/lib/types";

export function TestimonialsSection({ reviews }: { reviews: Review[] }) {
  return (
    <section className="page-shell py-12 md:py-16">
      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1.5">
            Stories From Our Adventurers
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Guest Journal
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Real stories from travelers who explored Sri Lanka's rivers, rainforests, and mountain peaks with us.
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <figure key={review.id} className="relative rounded-[2rem] border border-slate-100 bg-white p-7 shadow-sm flex flex-col justify-between dark:bg-slate-900 dark:border-slate-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-1 text-amber-400" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                {review.sourceBadge && (
                  <span className="rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold dark:text-emerald-400">
                    {review.sourceBadge}
                  </span>
                )}
              </div>
              <blockquote className="mt-4 font-display text-base font-semibold leading-relaxed text-slate-800 dark:text-slate-200">
                “{review.comment}”
              </blockquote>
            </div>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 dark:border-slate-800/80 pt-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-500 font-bold text-white text-xs shadow-sm">
                {review.initials}
              </span>
              <div>
                <strong className="block text-sm font-bold text-slate-900 dark:text-white">{review.name}</strong>
                <small className="text-xs text-slate-500 dark:text-slate-400">
                  {review.country} · {review.trip}
                </small>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}


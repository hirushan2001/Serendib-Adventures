import React from "react";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Review } from "@/lib/types";

export function TestimonialsSection({ reviews }: { reviews: Review[] }) {
  return (
    <section className="page-shell py-12">
      <SectionHeading eyebrow="Guest journal" title="Stories From Our Adventurers" />
      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <figure key={review.id} className="relative rounded-3xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col justify-between dark:bg-slate-900 dark:border-slate-800">
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
              <blockquote className="mt-4 font-display text-base font-semibold leading-7 text-slate-800 dark:text-slate-200">
                “{review.comment}”
              </blockquote>
            </div>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 dark:border-slate-800 pt-4">
              <span className="grid size-10 place-items-center rounded-full bg-emerald-500 font-bold text-white text-xs">
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

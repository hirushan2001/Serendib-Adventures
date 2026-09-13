"use client";

import { Award, CheckCircle2, Shield, Star, ExternalLink } from "lucide-react";

export function TripAdvisorViatorBar() {
  return (
    <div className="w-full rounded-2xl border border-amber-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-forest/90 p-6 shadow-2xl backdrop-blur-xl text-white">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Rating Badges Header */}
        <div className="flex flex-wrap items-center gap-6">
          {/* TripAdvisor Badge */}
          <a
            href="https://www.tripadvisor.co.uk/AttractionProductReview-g608523-d19773087-White_Water_Rafting_Kitulgala-Kitulgala_Sabaragamuwa_Province.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3.5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-4 py-2.5 transition hover:border-emerald-400 hover:bg-emerald-900/50"
          >
            <div className="grid size-9 place-items-center rounded-full bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition">
              <Award className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-400">
                <span>TripAdvisor</span>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px]">Badge of Excellence</span>
              </div>
              <div className="mt-0.5 flex items-center gap-1">
                <div className="flex text-emerald-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-200">5.0 / 5.0</span>
                <ExternalLink className="size-3 text-muted-foreground group-hover:text-emerald-400 transition ml-1" />
              </div>
            </div>
          </a>

          {/* Viator Badge */}
          <a
            href="https://www.viator.com/tours/Kandy/White-Water-Rafting-Kitulgala/d22283-135461P7"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3.5 rounded-xl border border-amber-500/30 bg-amber-950/40 px-4 py-2.5 transition hover:border-amber-400 hover:bg-amber-900/50"
          >
            <div className="grid size-9 place-items-center rounded-full bg-amber-500/20 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
              <Star className="size-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-400">
                <span>Viator</span>
                <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px]">Top Rated Tour</span>
              </div>
              <div className="mt-0.5 flex items-center gap-1">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-200">5.0 Rating (Code 135461P7)</span>
                <ExternalLink className="size-3 text-muted-foreground group-hover:text-amber-400 transition ml-1" />
              </div>
            </div>
          </a>
        </div>

        {/* Value Promises & Guarantees */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300 border-t border-white/10 pt-4 lg:border-t-0 lg:pt-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-amber-400 shrink-0" />
            <span>Free Cancellation (24h)</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-amber-400 shrink-0" />
            <span>Instant Mobile Voucher</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-amber-400 shrink-0" />
            <span>Reserve Now & Pay Later</span>
          </div>
        </div>

      </div>
    </div>
  );
}

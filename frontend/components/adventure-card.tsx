"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock3, Heart, Mountain, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tour } from "@/lib/types";

export function AdventureCard({ adventure }: { adventure: Tour }) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={adventure.image}
          alt={adventure.title}
          loading="lazy"
          width={1200}
          height={900}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        
        {/* Category & Badge */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-forest/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
            {adventure.category}
          </span>
          {adventure.badge && (
            <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-slate-950 shadow-md">
              {adventure.badge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="glassIcon"
          size="icon"
          className={`absolute right-4 top-4 rounded-full transition-colors ${
            isSaved ? "bg-red-500 text-white hover:bg-red-600" : ""
          }`}
          onClick={() => setIsSaved(!isSaved)}
          aria-label={`Save ${adventure.title}`}
        >
          <Heart className={`size-4 ${isSaved ? "fill-current" : ""}`} />
        </Button>
      </div>

      <div className="p-6">
        {/* Rating & Location */}
        <div className="mb-2.5 flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span className="flex items-center gap-1 text-amber-500">
            <Star className="size-4 fill-current" />
            <strong className="text-foreground">{adventure.rating || 4.9}</strong>
            <span className="text-muted-foreground">({adventure.reviewsCount || 45})</span>
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5 text-primary" />
            {adventure.location || "Kitulgala"}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold leading-snug text-foreground transition group-hover:text-primary">
          {adventure.title}
        </h3>

        <div className="my-3 flex items-center gap-4 text-xs font-semibold text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock3 className="size-4 text-primary" />
            {adventure.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Mountain className="size-4 text-primary" />
            {adventure.difficulty}
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
          {adventure.overview || adventure.highlights?.[0] || "Experience Sri Lanka's raw beauty with certified local guides."}
        </p>

        <div className="mt-6 flex items-end justify-between gap-3 border-t border-border/60 pt-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground block">From</span>
            <div className="flex items-baseline gap-2">
              <strong className="font-display text-2xl font-extrabold text-foreground">${adventure.price}</strong>
              {adventure.oldPrice && (
                <span className="text-xs text-muted-foreground line-through">${adventure.oldPrice}</span>
              )}
            </div>
          </div>
          <Button asChild size="sm" variant="default" className="rounded-xl font-bold bg-amber-500 text-slate-950 hover:bg-amber-400">
            <Link href={`/adventures/${adventure.slug}`}>
              Explore <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

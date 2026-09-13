import React from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Destination } from "@/lib/types";

export function DestinationsSpotlight({ destinations }: { destinations: Destination[] }) {
  return (
    <section className="page-shell py-12">
      <SectionHeading
        eyebrow="Go further"
        title="Explore Sri Lanka Beyond the Ordinary"
        description="Six iconic landscapes. Countless ways to experience them."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {destinations.map((item) => (
          <Link
            href="/destinations"
            key={item.id}
            className="group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lg"
          >
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              width={1000}
              height={1300}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <span className="rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold text-white">
                {item.toursCount}
              </span>
              <h3 className="mt-3 font-display text-3xl font-bold text-white">{item.name}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-300 line-clamp-2">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Category } from "@/lib/types";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="page-shell py-12">
      <SectionHeading
        eyebrow="Find your element"
        title="Choose Your Adventure"
        description="From high-adrenaline river rapids to remote highland cloud forests, every experience is shaped by Sri Lanka's wild beauty."
      />
      <div className="grid auto-rows-[18rem] gap-5 md:grid-cols-4">
        {categories.map((item) => (
          <Link
            href={`/adventures?category=${item.id}`}
            key={item.title}
            className={`group relative overflow-hidden rounded-3xl ${item.className || ""}`}
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              width={1000}
              height={800}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
              <div>
                {item.badge && (
                  <span className="mb-2 inline-block rounded-full bg-emerald-500 px-3 py-0.5 text-[10px] font-extrabold text-white">
                    {item.badge}
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-xs text-slate-300">{item.subtitle}</p>
              </div>
              <div className="grid size-10 place-items-center rounded-full bg-white/20 backdrop-blur-md transition group-hover:bg-emerald-500 group-hover:text-white">
                <ArrowUpRight className="size-5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

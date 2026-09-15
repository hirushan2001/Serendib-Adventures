import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, Clock3, MapPin, ShieldCheck, Star, Users, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { adventures, images } from "@/lib/adventure-data";
import { AdventureBookingForm } from "@/components/adventure-booking-form";
import { PhotoGallery } from "@/components/photo-gallery";

export async function generateStaticParams() {
  return adventures.map((item) => ({
    slug: item.slug,
  }));
}

export default async function AdventureDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = adventures.find((item) => item.slug === slug || item.id === slug);

  if (!a) {
    notFound();
  }

  const galleryImages = [
    a.gallery?.[0] || images.canyoning,
    a.gallery?.[1] || images.trekking,
    a.gallery?.[2] || images.abseiling,
    a.gallery?.[3] || images.camping,
    images.highlands,
    images.rafting,
  ];

  return (
    <>
      {/* Header Title & Badges Top */}
      <section className="page-shell pt-24 pb-4">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="rounded-full bg-emerald-500 px-3.5 py-1 text-xs font-bold text-white shadow-sm">
            {a.category}
          </span>
          <span className="rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-3.5 py-1 text-xs font-semibold text-slate-800 dark:text-slate-200">
            {a.location}
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
          {a.title}
        </h1>
      </section>

      {/* Gallery Hero */}
      <section className="page-shell pb-8">
        <PhotoGallery
          mainImage={a.image}
          galleryImages={galleryImages}
          title={a.title}
        />
      </section>

      {/* Detail Content */}
      <section className="section-pad bg-background">
        <div className="page-shell grid gap-12 lg:grid-cols-[1fr_24rem]">
          <div>
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 gap-4 rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:grid-cols-4">
              <div className="flex items-center gap-3">
                <MapPin className="size-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Location</span>
                  <strong className="text-sm font-bold text-foreground">{a.location}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock3 className="size-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Duration</span>
                  <strong className="text-sm font-bold text-foreground">{a.duration}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Difficulty</span>
                  <strong className="text-sm font-bold text-foreground">{a.difficulty}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="size-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Group Size</span>
                  <strong className="text-sm font-bold text-foreground">{a.groupSize || "2 - 8 People"}</strong>
                </div>
              </div>
            </div>

            {/* Overview */}
            <h2 className="mt-12 font-display text-3xl font-extrabold text-foreground">
              Experience Overview
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {a.overview || "Our signature experience balances high-energy adventure with time to appreciate the remarkable natural surroundings. Every trip begins with a full safety briefing and is led by certified, experienced local guides."}
            </p>

            {/* Highlights */}
            {a.highlights && a.highlights.length > 0 && (
              <>
                <h2 className="mt-12 font-display text-2xl font-bold text-foreground">
                  Trip Highlights
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {a.highlights.map((item, idx) => (
                    <div key={idx} className="flex gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
                      <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
                      <span className="text-sm font-medium text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Itinerary Timeline */}
            {a.itinerary && a.itinerary.length > 0 && (
              <>
                <h2 className="mt-12 font-display text-2xl font-bold text-foreground">
                  Itinerary Timeline
                </h2>
                <ol className="relative mt-6 border-l-2 border-emerald-500/40 pl-6 space-y-8">
                  {a.itinerary.map((step, idx) => (
                    <li key={idx} className="relative">
                      <span className="absolute -left-[2rem] top-0 grid size-8 place-items-center rounded-full bg-emerald-500 text-xs font-bold text-white shadow-md">
                        {idx + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          {step.time}
                        </span>
                        <h3 className="font-display text-lg font-bold text-foreground">{step.title}</h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                    </li>
                  ))}
                </ol>
              </>
            )}

            {/* Included & What to Bring */}
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {a.included && (
                <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm">
                  <h3 className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
                    <Sparkles className="size-5 text-emerald-600 dark:text-emerald-400" /> What's Included
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {a.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="size-4 shrink-0 text-emerald-500 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {a.toBring && (
                <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm">
                  <h3 className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
                    <AlertCircle className="size-5 text-emerald-600 dark:text-emerald-400" /> What to Bring
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {a.toBring.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ChevronRight className="size-4 shrink-0 text-emerald-500 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Reviews */}
            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold text-foreground">Guest Reviews</h2>
              <div className="mt-4 rounded-[2rem] border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-2 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                  <span className="font-bold text-foreground ml-2">{a.rating || 4.9} out of 5</span>
                  <span className="text-xs text-muted-foreground">({a.reviewsCount || 45} verified reviews)</span>
                </div>
                <blockquote className="mt-4 font-display text-lg font-semibold text-foreground">
                  “The team made this trip unforgettable! Certified equipment, incredible energy, and total professionalism throughout.”
                </blockquote>
                <p className="mt-2 text-xs font-bold text-muted-foreground">Verified Adventurer · Recent Trip</p>
              </div>
            </div>
          </div>

          {/* Sticky Booking Inquiry Card */}
          <AdventureBookingForm price={a.price} oldPrice={a.oldPrice} />
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-slate-950 py-14 text-white">
        <div className="page-shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <span className="block text-xs font-extrabold uppercase tracking-widest text-emerald-400 mb-1">Keep Exploring</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">Find Another Wild Sri Lankan Experience</h2>
          </div>
          <Button asChild className="rounded-full font-bold bg-emerald-500 text-white hover:bg-emerald-600 px-6">
            <Link href="/adventures">
              All Adventure Packages <ChevronRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

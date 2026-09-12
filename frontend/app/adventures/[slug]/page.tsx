"use client";

import { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, Clock3, MapPin, ShieldCheck, Star, Users, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adventures, images } from "@/lib/adventure-data";

export default function AdventureDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const a = adventures.find((item) => item.slug === slug || item.id === slug);

  if (!a) {
    notFound();
  }

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingData, setBookingData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    guests: "2",
    notes: ""
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  return (
    <>
      {/* Gallery & Header Hero */}
      <section className="page-shell grid min-h-[72vh] gap-3 pt-28 md:grid-cols-[1.5fr_.5fr]">
        <div className="relative min-h-[30rem] overflow-hidden rounded-2xl shadow-xl">
          <img
            src={a.image}
            alt={a.title}
            width={1400}
            height={1000}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/95 via-forest/40 to-transparent p-8 pt-28 text-hero-foreground">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-slate-950">
                {a.category}
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur text-white">
                {a.location}
              </span>
            </div>
            <h1 className="font-display text-4xl font-extrabold sm:text-6xl text-white">
              {a.title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
          <div className="overflow-hidden rounded-2xl shadow-md">
            <img
              src={a.gallery?.[0] || images.canyoning}
              alt="Sri Lanka river & rainforest experience"
              loading="lazy"
              width={600}
              height={500}
              className="h-full min-h-44 w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>
          <div className="overflow-hidden rounded-2xl shadow-md">
            <img
              src={a.gallery?.[1] || images.trekking}
              alt="Kitulgala adventure trail"
              loading="lazy"
              width={600}
              height={500}
              className="h-full min-h-44 w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Detail Content */}
      <section className="section-pad bg-background">
        <div className="page-shell grid gap-12 lg:grid-cols-[1fr_24rem]">
          <div>
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:grid-cols-4">
              <div className="flex items-center gap-3">
                <MapPin className="size-5 text-amber-500" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Location</span>
                  <strong className="text-sm font-bold text-foreground">{a.location}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock3 className="size-5 text-amber-500" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Duration</span>
                  <strong className="text-sm font-bold text-foreground">{a.duration}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-amber-500" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Difficulty</span>
                  <strong className="text-sm font-bold text-foreground">{a.difficulty}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="size-5 text-amber-500" />
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
            <p className="mt-4 text-base leading-8 text-muted-foreground">
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
                    <div key={idx} className="flex gap-3 rounded-xl border border-border/70 bg-card p-4 shadow-sm">
                      <CheckCircle2 className="size-5 shrink-0 text-amber-500" />
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
                <ol className="relative mt-6 border-l-2 border-amber-500/40 pl-6 space-y-8">
                  {a.itinerary.map((step, idx) => (
                    <li key={idx} className="relative">
                      <span className="absolute -left-[2rem] top-0 grid size-8 place-items-center rounded-full bg-amber-500 text-xs font-bold text-slate-950 shadow-md">
                        {idx + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-bold text-amber-500">
                          {step.time}
                        </span>
                        <h3 className="font-display text-lg font-bold text-foreground">{step.title}</h3>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.desc}</p>
                    </li>
                  ))}
                </ol>
              </>
            )}

            {/* Included & What to Bring */}
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {a.included && (
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
                    <Sparkles className="size-5 text-amber-500" /> What's Included
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {a.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="size-4 shrink-0 text-amber-500 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {a.toBring && (
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
                    <AlertCircle className="size-5 text-amber-500" /> What to Bring
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {a.toBring.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ChevronRight className="size-4 shrink-0 text-amber-500 mt-1" />
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
              <div className="mt-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-2 text-amber-500">
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
          <aside>
            <div className="sticky top-28 rounded-2xl border border-border bg-card p-6 shadow-xl">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                    Starting From
                  </span>
                  <div className="flex items-baseline gap-2">
                    <strong className="font-display text-4xl font-extrabold text-foreground">${a.price}</strong>
                    <span className="text-xs text-muted-foreground">/ guest</span>
                  </div>
                </div>
                {a.oldPrice && (
                  <span className="rounded-full bg-amber-500/20 px-2.5 py-1 text-xs font-bold text-amber-500">
                    Save ${a.oldPrice - a.price}
                  </span>
                )}
              </div>

              <div className="my-6 border-t border-border" />

              {bookingSuccess ? (
                <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-6 text-center">
                  <CheckCircle2 className="mx-auto size-10 text-amber-500" />
                  <h3 className="mt-3 font-display text-lg font-bold text-foreground">Inquiry Received!</h3>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    Thank you, {bookingData.fullName}. Our Kitulgala team will contact you at {bookingData.email} within 2 hours to confirm availability and itinerary details.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 rounded-xl text-xs font-bold"
                    onClick={() => setBookingSuccess(false)}
                  >
                    Send Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <h3 className="font-display text-base font-bold text-foreground">Request Availability</h3>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">Full Name</label>
                    <Input
                      required
                      placeholder="Your name"
                      value={bookingData.fullName}
                      onChange={(e) => setBookingData({ ...bookingData, fullName: e.target.value })}
                      className="rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">Email Address</label>
                    <Input
                      required
                      type="email"
                      placeholder="name@domain.com"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                      className="rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">Phone / WhatsApp</label>
                    <Input
                      required
                      placeholder="+94 77 000 0000"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      className="rounded-xl text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">Date</label>
                      <Input
                        required
                        type="date"
                        value={bookingData.preferredDate}
                        onChange={(e) => setBookingData({ ...bookingData, preferredDate: e.target.value })}
                        className="rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">Guests</label>
                      <select
                        value={bookingData.guests}
                        onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                        className="w-full h-10 rounded-xl border border-border bg-background px-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-accent"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10, 15].map((num) => (
                          <option key={num} value={num}>{num} Guests</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full rounded-xl font-bold bg-amber-500 text-slate-950 hover:bg-amber-400">
                    Check Availability <ChevronRight className="ml-1 size-4" />
                  </Button>

                  <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground text-center">
                    <ShieldCheck className="size-3.5 text-amber-500" /> Zero booking fees · Pay at location
                  </p>
                </form>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-forest py-14 text-hero-foreground">
        <div className="page-shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow text-amber-500 font-bold uppercase tracking-widest">Keep Exploring</p>
            <h2 className="mt-1 font-display text-3xl font-bold text-white">Find Another Wild Sri Lankan Experience</h2>
          </div>
          <Button asChild className="rounded-xl font-bold bg-amber-500 text-slate-950 hover:bg-amber-400">
            <Link href="/adventures">
              All Adventure Packages <ChevronRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/adventure-data";

export function CtaBanner() {
  return (
    <section className="page-shell py-12 pb-20">
      <div className="relative flex min-h-[28rem] items-center overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 text-center text-white shadow-2xl">
        <img
          src={images.camping}
          alt="Riverside camping in Kitulgala"
          loading="lazy"
          width={1408}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="font-display text-4xl font-black sm:text-6xl text-white">
            Your next great Sri Lankan adventure starts here.
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
            Step outside the ordinary and experience the wild beauty of Kitulgala, Sinharaja, and beyond.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="rounded-full font-extrabold bg-emerald-500 text-white hover:bg-emerald-600 px-8">
              <Link href="/adventures">Explore All Adventures</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-full font-extrabold border border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white hover:border-white backdrop-blur-md px-8 shadow-sm">
              <Link href="/contact">Contact Our Local Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Heart, Leaf, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/adventure-data";

const guide = "/assets/local-guide.jpg";

export default function AboutPage() {
  return (
    <>
      <PageHero image={images.trekking} eyebrow="Our story" title="Born by the river">
        <p>We are guides, storytellers and lifelong students of Sri Lanka’s wildest places.</p>
      </PageHero>

      <section className="section-pad bg-background">
        <div className="page-shell grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">Since 2014</span>
            <h2 className="font-display text-3xl font-extrabold sm:text-5xl text-slate-900 dark:text-white">
              Adventure feels different when it’s personal.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Serendib began with a few rafts, a close-knit group of Kitulgala guides and a simple ambition: show guests the places we love, in the way they deserve to be seen.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
              Today, we still keep groups small, work with local communities and build every journey around respect—for people, place and the power of nature.
            </p>
          </div>
          <img
            src={guide}
            alt="Local Serendib river guide"
            width={1200}
            height={1408}
            loading="lazy"
            className="h-[32rem] w-full rounded-[2rem] object-cover shadow-xl"
          />
        </div>
      </section>

      <section className="bg-card section-pad border-y border-border">
        <div className="page-shell">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              [Heart, "Lead with warmth", "Every guest is welcomed as a friend, never processed as a booking."],
              [ShieldCheck, "Earn trust", "Preparation, trained guides and clear decisions come before thrills."],
              [Leaf, "Protect the wild", "We tread lightly and help local communities benefit from every visit."],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof Heart;
              return (
                <article key={t as string} className="border-t-2 border-emerald-500 pt-6">
                  <I className="size-7 text-emerald-600 dark:text-emerald-400" />
                  <h2 className="mt-5 font-display text-2xl font-bold text-foreground">{t as string}</h2>
                  <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">{d as string}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-background">
        <div className="page-shell grid gap-6 md:grid-cols-2">
          <img
            src={images.canyoning}
            alt="Canyoning in Sri Lankan rainforest"
            loading="lazy"
            width={1200}
            height={1504}
            className="h-[34rem] w-full rounded-[2rem] object-cover"
          />
          <div className="flex flex-col justify-center rounded-[2rem] bg-slate-900 p-8 text-white md:p-14 shadow-xl">
            <span className="block text-xs font-extrabold uppercase tracking-widest text-emerald-400 mb-2">Our promise</span>
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">Wild, never reckless.</h2>
            <p className="mt-5 leading-relaxed text-slate-200">
              Every guide is trained in rescue and first aid. Equipment is checked before every departure, routes are continuously assessed, and conditions—not schedules—make the final call.
            </p>
            <Button asChild className="mt-8 w-fit rounded-full font-bold bg-emerald-500 text-white hover:bg-emerald-600 px-8">
              <Link href="/contact">Meet our team</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

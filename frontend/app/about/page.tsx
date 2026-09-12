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
            <p className="eyebrow text-amber-500 font-bold">Since 2014</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl text-slate-100">
              Adventure feels different when it’s personal.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Serendib began with a few rafts, a close-knit group of Kitulgala guides and a simple ambition: show guests the places we love, in the way they deserve to be seen.
            </p>
            <p className="mt-4 leading-7 text-muted-foreground">
              Today, we still keep groups small, work with local communities and build every journey around respect—for people, place and the power of nature.
            </p>
          </div>
          <img
            src={guide}
            alt="Local Serendib river guide"
            width={1200}
            height={1408}
            loading="lazy"
            className="h-[34rem] w-full rounded-2xl object-cover shadow-2xl"
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
                <article key={t as string} className="border-t-2 border-amber-500 pt-6">
                  <I className="size-7 text-amber-500" />
                  <h2 className="mt-5 font-display text-2xl font-bold text-foreground">{t as string}</h2>
                  <p className="mt-3 leading-7 text-muted-foreground">{d as string}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-background">
        <div className="page-shell grid gap-4 md:grid-cols-2">
          <img
            src={images.canyoning}
            alt="Canyoning in Sri Lankan rainforest"
            loading="lazy"
            width={1200}
            height={1504}
            className="h-[36rem] w-full rounded-2xl object-cover"
          />
          <div className="flex flex-col justify-center rounded-2xl bg-forest p-8 text-hero-foreground md:p-14">
            <p className="eyebrow text-amber-500 font-bold">Our promise</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold text-white">Wild, never reckless.</h2>
            <p className="mt-5 leading-7 text-hero-muted">
              Every guide is trained in rescue and first aid. Equipment is checked before every departure, routes are continuously assessed, and conditions—not schedules—make the final call.
            </p>
            <Button asChild className="mt-7 w-fit rounded-xl font-bold bg-amber-500 text-slate-950 hover:bg-amber-400">
              <Link href="/contact">Meet our team</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

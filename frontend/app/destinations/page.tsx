import Link from "next/link";
import { ArrowUpRight, Calendar, CheckCircle2, MapPin } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { destinations, images } from "@/lib/adventure-data";

export default function DestinationsPage() {
  return (
    <>
      <PageHero image={images.highlands} eyebrow="Island of contrast" title="Beyond The Ordinary">
        <p>Follow wild rivers, granite mountain gaps, and ancient rainforest trails into Sri Lanka's premier adventure destinations.</p>
      </PageHero>

      <section className="section-pad bg-background">
        <div className="page-shell space-y-16">
          {destinations.map((d, i) => (
            <article
              key={d.id}
              className={`grid gap-8 overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-lg lg:grid-cols-2 lg:items-center ${
                i % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Image Column */}
              <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <img
                  src={d.image}
                  alt={`${d.name}, Sri Lanka`}
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-forest/90 px-3.5 py-1 text-xs font-bold text-white backdrop-blur">
                  {d.district} District
                </span>
                <span className="absolute right-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-slate-950 shadow-md">
                  {d.toursCount}
                </span>
              </div>

              {/* Details Column */}
              <div className="space-y-5 p-2 md:p-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
                  <MapPin className="size-4" /> {d.region}
                </div>

                <h2 className="font-display text-4xl font-extrabold text-foreground">{d.name}</h2>

                <p className="text-base leading-7 text-muted-foreground">
                  {d.overview || d.description}
                </p>

                {d.bestTimeToVisit && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground border-y border-border/60 py-3">
                    <Calendar className="size-4 text-amber-500" />
                    <span>Best Season to Visit: <strong className="text-foreground">{d.bestTimeToVisit}</strong></span>
                  </div>
                )}

                {d.highlights && d.highlights.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                      Destination Highlights
                    </h3>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {d.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-medium text-foreground">
                          <CheckCircle2 className="size-4 shrink-0 text-amber-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <Button asChild size="lg" className="rounded-xl font-bold bg-amber-500 text-slate-950 hover:bg-amber-400">
                    <Link href={`/adventures?destination=${d.id}`}>
                      Explore {d.name} Tours <ArrowUpRight className="ml-1 size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

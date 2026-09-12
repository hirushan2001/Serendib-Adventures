import Link from "next/link";
import { ArrowRight, ArrowUpRight, Award, Compass, Leaf, MapPin, ShieldCheck, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdventureCard } from "@/components/adventure-card";
import { SearchFilterBar } from "@/components/search-filter-bar";
import { adventures, categories, destinations, images, reviews } from "@/lib/adventure-data";

const guideImage = "/assets/local-guide.jpg";

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-10 grid gap-5 md:grid-cols-[1fr_.7fr] md:items-end">
      <div>
        <p className="eyebrow text-amber-500 font-bold uppercase tracking-widest">{eyebrow}</p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl text-slate-100">
          {title}
        </h2>
      </div>
      {description && (
        <p className="max-w-lg text-base leading-7 text-muted-foreground md:justify-self-end">
          {description}
        </p>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Integrated Search Bar */}
      <section className="relative flex min-h-[95svh] flex-col justify-between overflow-hidden bg-forest text-hero-foreground">
        <img
          src={images.rafting}
          alt="White-water rafting through Kitulgala rainforest"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-scrim absolute inset-0" />

        <div className="page-shell relative z-10 pt-36 pb-12 md:pt-44">
          <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-5 duration-700">
            <p className="eyebrow flex items-center gap-2 text-amber-500 font-bold uppercase tracking-widest">
              <MapPin className="size-4" /> Kitulgala, Sri Lanka
            </p>
            <h1 className="mt-4 font-display text-5xl font-extrabold leading-[0.95] sm:text-7xl lg:text-8xl text-slate-100">
              Discover the wild side of Sri Lanka.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-hero-muted sm:text-xl">
              Unforgettable adventures through rainforests, rivers, mountains, and hidden natural wonders.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-xl font-bold bg-amber-500 text-slate-950 hover:bg-amber-400">
                <Link href="/adventures">
                  Explore All Adventures <ArrowRight className="ml-1 size-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="heroOutline" className="rounded-xl font-bold">
                <Link href="/booking">Plan Your Adventure</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Search Filter Bar */}
        <div className="page-shell relative z-20 pb-12">
          <SearchFilterBar />
        </div>
      </section>

      {/* Featured Categories Bento Grid */}
      <section className="section-pad bg-background">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Find your element"
            title="Choose Your Adventure"
            description="From high-adrenaline river rapids to remote highland cloud forests, every experience is shaped by Sri Lanka's wild beauty."
          />
          <div className="grid auto-rows-[18rem] gap-4 md:grid-cols-4">
            {categories.map((item) => (
              <Link
                href={`/adventures?category=${item.id}`}
                key={item.title}
                className={`group relative overflow-hidden rounded-2xl ${item.className || ""}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  width={1000}
                  height={800}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-hero-foreground">
                  <div>
                    {item.badge && (
                      <span className="mb-2 inline-block rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold text-slate-950">
                        {item.badge}
                      </span>
                    )}
                    <h3 className="font-display text-2xl font-bold text-white">{item.title}</h3>
                    <p className="mt-1 text-xs text-hero-muted">{item.subtitle}</p>
                  </div>
                  <div className="grid size-10 place-items-center rounded-full bg-white/20 backdrop-blur transition group-hover:bg-amber-500 group-hover:text-slate-950">
                    <ArrowUpRight className="size-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experiences Grid */}
      <section className="section-pad bg-card/60">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Curated experiences"
            title="Popular Adventure Packages"
            description="Safety-led, thoughtfully paced, and designed for unforgettable memories."
          />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {adventures.slice(0, 6).map((item) => (
              <AdventureCard adventure={item} key={item.id} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg" className="rounded-xl font-bold">
              <Link href="/adventures">
                View All Experiences <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Serendib */}
      <section className="section-pad bg-background">
        <div className="page-shell grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div className="relative">
            <img
              src={guideImage}
              alt="Serendib local rafting guide"
              loading="lazy"
              width={1200}
              height={1408}
              className="h-[38rem] w-full rounded-2xl object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-3 rounded-2xl bg-amber-500 p-6 text-slate-950 shadow-xl md:right-8">
              <strong className="font-display text-4xl font-black">10+ Years</strong>
              <span className="ml-3 text-xs font-bold uppercase tracking-wider block mt-1">
                Guiding Rivers & Rainforests
              </span>
            </div>
          </div>
          <div>
            <p className="eyebrow text-amber-500 font-bold uppercase tracking-widest">Why Serendib Adventures</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl text-slate-100">
              More than an adventure. A story to tell.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              We pair deep local Sri Lankan river knowledge with certified international safety standards, creating intimate small-group journeys into the wild.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {[
                [ShieldCheck, "Safety First Standards"],
                [Users, "Certified Local Guides"],
                [Leaf, "Eco-Friendly Footprint"],
                [Compass, "Uncharted Trails"],
                [Award, "Premium Rescue Gear"],
                [Star, "5-Star Guest Rating"],
              ].map(([Icon, label]) => {
                const I = Icon as typeof ShieldCheck;
                return (
                  <div key={label as string} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
                    <I className="size-5 text-amber-500" />
                    <span className="font-display text-sm font-bold text-foreground">{label as string}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="bg-forest py-20 text-hero-foreground">
        <div className="page-shell grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {[
            ["10+", "Years of Adventure"],
            ["15,000+", "Happy Adventurers"],
            ["25+", "Unique Experiences"],
            ["100%", "Safety Record & Passion"],
          ].map(([n, l]) => (
            <div key={l} className="border-l-2 border-amber-500 pl-6">
              <strong className="font-display text-4xl font-extrabold text-amber-500 md:text-5xl">{n}</strong>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-hero-muted">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Destinations Spotlight */}
      <section className="section-pad bg-background">
        <div className="page-shell">
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
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  width={1000}
                  height={1300}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/95 via-forest/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-hero-foreground">
                  <span className="rounded-full bg-amber-500/90 px-3 py-1 text-[10px] font-bold text-slate-950">
                    {item.toursCount}
                  </span>
                  <h3 className="mt-3 font-display text-3xl font-bold text-white">{item.name}</h3>
                  <p className="mt-2 text-xs leading-5 text-hero-muted line-clamp-2">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad bg-card/60">
        <div className="page-shell">
          <SectionHeading eyebrow="Guest journal" title="Stories From Our Adventurers" />
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <figure key={review.id} className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                <div className="flex gap-1 text-amber-500" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 font-display text-base font-semibold leading-7 text-foreground">
                  “{review.comment}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                  <span className="grid size-10 place-items-center rounded-full bg-amber-500 font-bold text-slate-950 text-xs">
                    {review.initials}
                  </span>
                  <div>
                    <strong className="block text-sm font-bold text-foreground">{review.name}</strong>
                    <small className="text-xs text-muted-foreground">
                      {review.country} · {review.trip}
                    </small>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative flex min-h-[40rem] items-center overflow-hidden bg-forest text-center text-hero-foreground">
        <img
          src={images.camping}
          alt="Riverside camping in Kitulgala"
          loading="lazy"
          width={1408}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-forest/70 backdrop-blur-[2px]" />
        <div className="page-shell relative z-10">
          <p className="eyebrow text-amber-500 font-bold uppercase tracking-widest">The wild is calling</p>
          <h2 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-extrabold sm:text-6xl text-white">
            Your next great Sri Lankan adventure starts here.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-hero-muted text-lg">
            Step outside the ordinary and experience the wild beauty of Kitulgala, Sinharaja, and beyond.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="rounded-xl font-bold bg-amber-500 text-slate-950 hover:bg-amber-400">
              <Link href="/adventures">Explore All Adventures</Link>
            </Button>
            <Button asChild size="lg" variant="heroOutline" className="rounded-xl font-bold">
              <Link href="/contact">Contact Our Local Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

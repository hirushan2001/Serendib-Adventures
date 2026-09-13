"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, MapPin, Compass, Shield, ArrowDownUp } from "lucide-react";
import { AdventureCard } from "@/components/adventure-card";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adventures, images } from "@/lib/adventure-data";

function AdventuresContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDestination, setSelectedDestination] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category");
    const dest = searchParams.get("destination");
    const diff = searchParams.get("difficulty");
    const kw = searchParams.get("keyword");
    if (cat) setSelectedCategory(cat);
    if (dest) setSelectedDestination(dest);
    if (diff) setSelectedDifficulty(diff);
    if (kw) setQuery(kw);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return adventures
      .filter((a) => {
        const matchesCategory =
          selectedCategory === "all" ||
          a.categoryId === selectedCategory ||
          a.category.toLowerCase().includes(selectedCategory.toLowerCase());

        const matchesDestination =
          selectedDestination === "all" ||
          a.destinationId === selectedDestination ||
          a.location.toLowerCase().includes(selectedDestination.toLowerCase());

        const matchesDifficulty =
          selectedDifficulty === "all" ||
          a.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

        const matchesQuery =
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.location.toLowerCase().includes(query.toLowerCase()) ||
          a.category.toLowerCase().includes(query.toLowerCase());

        return matchesCategory && matchesDestination && matchesDifficulty && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return b.reviewsCount - a.reviewsCount;
      });
  }, [query, selectedCategory, selectedDestination, selectedDifficulty, sortBy]);

  return (
    <>
      <PageHero image={images.canyoning} eyebrow="Explore Sri Lanka" title="Find Your Next Adventure">
        <p>From river rapid rushes to ancient rock climbs, discover curated day tours shaped by Sri Lanka's wild outdoors.</p>
      </PageHero>

      <section className="section-pad bg-background">
        <div className="page-shell">
          {/* Top Search & Controls Bar */}
          <div className="grid gap-4 border-b border-border pb-7 md:grid-cols-[1fr_auto_auto] md:items-center">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-12 rounded-xl pl-12 shadow-sm text-sm"
                placeholder="Search tours by name, location, or activity..."
              />
            </div>

            <Button
              variant="outline"
              className="md:hidden rounded-xl font-bold flex items-center justify-center gap-2"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <SlidersHorizontal className="size-4" />
              {showMobileFilters ? "Hide Filters" : "Filter Options"}
            </Button>

            <div className="flex items-center gap-2">
              <ArrowDownUp className="size-4 text-muted-foreground hidden md:block" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort adventures"
                className="h-12 w-full md:w-52 rounded-xl border border-border bg-card px-4 text-sm font-semibold text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="recommended">Most Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid gap-10 pt-8 lg:grid-cols-[16rem_1fr]">
            {/* Sidebar Filters */}
            <aside className={`${showMobileFilters ? "block" : "hidden"} lg:block space-y-8 rounded-[2rem] border border-border bg-card p-6 shadow-sm`}>
              {/* Category Filter */}
              <div>
                <h3 className="eyebrow flex items-center gap-1.5 font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <Compass className="size-4" /> Category
                </h3>
                <div className="mt-3 flex flex-col gap-1">
                  {[
                    { id: "all", label: "All Categories" },
                    { id: "white-water-rafting", label: "White Water Rafting" },
                    { id: "canyoning", label: "Jungle Canyoning" },
                    { id: "waterfall-abseiling", label: "Waterfall Abseiling" },
                    { id: "jungle-trekking", label: "Rainforest Trekking" },
                    { id: "camping-nature", label: "Camping & Glamping" },
                    { id: "cultural-safari", label: "Safari & Heritage" },
                  ].map((cat) => (
                    <Button
                      key={cat.id}
                      variant={selectedCategory === cat.id ? "default" : "ghost"}
                      size="sm"
                      className={`justify-start rounded-xl font-semibold text-xs text-left ${
                        selectedCategory === cat.id ? "bg-emerald-500 text-white hover:bg-emerald-600 font-bold" : ""
                      }`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Destination Filter */}
              <div>
                <h3 className="eyebrow flex items-center gap-1.5 font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <MapPin className="size-4" /> Location
                </h3>
                <div className="mt-3 flex flex-col gap-1">
                  {[
                    { id: "all", label: "All Destinations" },
                    { id: "kitulgala", label: "Kitulgala" },
                    { id: "sigiriya", label: "Sigiriya" },
                    { id: "ella", label: "Ella Highlands" },
                    { id: "sinharaja", label: "Sinharaja Rainforest" },
                    { id: "yala", label: "Yala Safari" },
                    { id: "galle", label: "Galle Dutch Fort" },
                  ].map((loc) => (
                    <Button
                      key={loc.id}
                      variant={selectedDestination === loc.id ? "default" : "ghost"}
                      size="sm"
                      className={`justify-start rounded-xl font-semibold text-xs text-left ${
                        selectedDestination === loc.id ? "bg-emerald-500 text-white hover:bg-emerald-600 font-bold" : ""
                      }`}
                      onClick={() => setSelectedDestination(loc.id)}
                    >
                      {loc.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <h3 className="eyebrow flex items-center gap-1.5 font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <Shield className="size-4" /> Difficulty Level
                </h3>
                <div className="mt-3 flex flex-col gap-1">
                  {["all", "Easy", "Moderate", "Active", "Challenging"].map((diff) => (
                    <Button
                      key={diff}
                      variant={selectedDifficulty === diff ? "default" : "ghost"}
                      size="sm"
                      className={`justify-start rounded-xl font-semibold text-xs text-left ${
                        selectedDifficulty === diff ? "bg-emerald-500 text-white hover:bg-emerald-600 font-bold" : ""
                      }`}
                      onClick={() => setSelectedDifficulty(diff)}
                    >
                      {diff === "all" ? "All Levels" : diff}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedCategory !== "all" || selectedDestination !== "all" || selectedDifficulty !== "all" || query) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-xl text-xs font-bold"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedDestination("all");
                    setSelectedDifficulty("all");
                    setQuery("");
                  }}
                >
                  Reset All Filters
                </Button>
              )}
            </aside>

            {/* Results Grid */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Showing <strong className="text-foreground">{filtered.length}</strong> curated tour experiences
                </p>
              </div>

              {filtered.length ? (
                <div className="grid gap-8 md:grid-cols-2">
                  {filtered.map((item) => (
                    <AdventureCard key={item.id} adventure={item} />
                  ))}
                </div>
              ) : (
                <div className="rounded-[2rem] border border-dashed border-border p-12 text-center bg-card">
                  <h2 className="font-display text-2xl font-bold text-foreground">No adventures match your criteria</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try adjusting your filters, location, or search keyword.
                  </p>
                  <Button
                    variant="default"
                    className="mt-6 rounded-full font-bold bg-emerald-500 text-white hover:bg-emerald-600"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedDestination("all");
                      setSelectedDifficulty("all");
                      setQuery("");
                    }}
                  >
                    View All Adventures
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function AdventuresPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading adventures...</div>}>
      <AdventuresContent />
    </Suspense>
  );
}

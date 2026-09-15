"use client";

import { useMemo, useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, MapPin, Compass, Shield, ArrowDownUp, ChevronDown, Check, RotateCcw, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AdventureCard } from "@/components/adventure-card";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adventures, images } from "@/lib/adventure-data";

const categoryOptions = [
  { id: "all", label: "All Categories" },
  { id: "white-water-rafting", label: "White Water Rafting" },
  { id: "canyoning", label: "Jungle Canyoning" },
  { id: "waterfall-abseiling", label: "Waterfall Abseiling" },
  { id: "jungle-trekking", label: "Rainforest Trekking" },
  { id: "camping-nature", label: "Camping & Glamping" },
  { id: "cultural-safari", label: "Safari & Heritage" },
];

const destinationOptions = [
  { id: "all", label: "All Destinations" },
  { id: "kitulgala", label: "Kitulgala" },
  { id: "sigiriya", label: "Sigiriya" },
  { id: "ella", label: "Ella Highlands" },
  { id: "sinharaja", label: "Sinharaja Rainforest" },
  { id: "yala", label: "Yala Safari" },
  { id: "galle", label: "Galle Dutch Fort" },
];

function parseTourHours(durationStr: string): number {
  if (/full\s*day/i.test(durationStr) || /1\s*day/i.test(durationStr)) return 12;
  if (/(\d+)\s*day/i.test(durationStr)) {
    const match = durationStr.match(/(\d+)\s*day/i);
    return match ? parseInt(match[1], 10) * 12 : 24;
  }
  const matches = durationStr.match(/(\d+)/g);
  if (matches && matches.length > 0) {
    const nums = matches.map(Number);
    return Math.max(...nums);
  }
  return 12;
}

function AdventuresContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDestination, setSelectedDestination] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [maxDuration, setMaxDuration] = useState<number>(12);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [sortBy, setSortBy] = useState("recommended");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Dropdown open states
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isLocOpen, setIsLocOpen] = useState(false);
  const [isDiffOpen, setIsDiffOpen] = useState(false);

  const catRef = useRef<HTMLDivElement>(null);
  const locRef = useRef<HTMLDivElement>(null);
  const diffRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (catRef.current && !catRef.current.contains(event.target as Node)) {
        setIsCatOpen(false);
      }
      if (locRef.current && !locRef.current.contains(event.target as Node)) {
        setIsLocOpen(false);
      }
      if (diffRef.current && !diffRef.current.contains(event.target as Node)) {
        setIsDiffOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category");
    const dest = searchParams.get("destination");
    const diff = searchParams.get("difficulty");
    const kw = searchParams.get("keyword");
    const dur = searchParams.get("maxDuration");
    const pr = searchParams.get("maxPrice");
    if (cat) setSelectedCategory(cat);
    if (dest) setSelectedDestination(dest);
    if (diff) setSelectedDifficulty(diff);
    if (kw) setQuery(kw);
    if (dur) setMaxDuration(Number(dur));
    if (pr) setMaxPrice(Number(pr));
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

        const matchesDuration = parseTourHours(a.duration) <= maxDuration;
        const matchesPrice = a.price <= maxPrice;

        return matchesCategory && matchesDestination && matchesDifficulty && matchesQuery && matchesDuration && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return b.reviewsCount - a.reviewsCount;
      });
  }, [query, selectedCategory, selectedDestination, selectedDifficulty, maxDuration, maxPrice, sortBy]);

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
                suppressHydrationWarning
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-12 rounded-xl pl-12 shadow-sm text-sm"
                placeholder="Search tours by name, location, or activity..."
              />
            </div>

            <Button
              suppressHydrationWarning
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
                suppressHydrationWarning
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
            <aside className={`${showMobileFilters ? "block" : "hidden"} lg:block h-fit sticky top-28 space-y-6 rounded-[2rem] border border-border bg-card p-6 shadow-sm`}>
              {/* Filter Header with Reset */}
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                  <Filter className="size-4 text-[#184E70] dark:text-[#38bdf8]" />
                  <span>Filter Tours</span>
                </h3>
                <button
                  suppressHydrationWarning
                  type="button"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedDestination("all");
                    setSelectedDifficulty("all");
                    setMaxDuration(12);
                    setMaxPrice(500);
                    setQuery("");
                  }}
                  className="text-xs text-[#184E70] dark:text-[#38bdf8] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="size-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Category Filter Dropdown */}
              <div className="relative" ref={catRef}>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#184E70] dark:text-[#38bdf8] mb-2 flex items-center gap-1.5">
                  <Compass className="size-4" /> Category
                </label>
                <button
                  suppressHydrationWarning
                  type="button"
                  onClick={() => {
                    setIsCatOpen(!isCatOpen);
                    setIsLocOpen(false);
                    setIsDiffOpen(false);
                  }}
                  className="w-full flex items-center justify-between bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-foreground font-semibold rounded-xl px-3.5 py-3 hover:border-[#184E70] transition-all cursor-pointer"
                >
                  <span className="truncate">
                    {categoryOptions.find((c) => c.id === selectedCategory)?.label || "All Categories"}
                  </span>
                  <ChevronDown
                    className={`size-4 text-muted-foreground shrink-0 transition-transform duration-300 ${
                      isCatOpen ? "rotate-180 text-[#184E70]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isCatOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-800 z-50 max-h-60 overflow-y-auto p-1.5 space-y-1"
                    >
                      {categoryOptions.map((cat) => {
                        const isSelected = selectedCategory === cat.id;
                        return (
                          <button
                            suppressHydrationWarning
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(cat.id);
                              setIsCatOpen(false);
                            }}
                            className={`w-full flex items-center justify-between text-left text-xs px-3 py-2.5 rounded-lg transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#184E70] text-white font-bold"
                                : "text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-[#184E70]"
                            }`}
                          >
                            <span>{cat.label}</span>
                            {isSelected && <Check className="size-3.5 text-white" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Destination Filter Dropdown */}
              <div className="relative" ref={locRef}>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#184E70] dark:text-[#38bdf8] mb-2 flex items-center gap-1.5">
                  <MapPin className="size-4" /> Location
                </label>
                <button
                  suppressHydrationWarning
                  type="button"
                  onClick={() => {
                    setIsLocOpen(!isLocOpen);
                    setIsCatOpen(false);
                    setIsDiffOpen(false);
                  }}
                  className="w-full flex items-center justify-between bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-foreground font-semibold rounded-xl px-3.5 py-3 hover:border-[#184E70] transition-all cursor-pointer"
                >
                  <span className="truncate">
                    {destinationOptions.find((d) => d.id === selectedDestination)?.label || "All Destinations"}
                  </span>
                  <ChevronDown
                    className={`size-4 text-muted-foreground shrink-0 transition-transform duration-300 ${
                      isLocOpen ? "rotate-180 text-[#184E70]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isLocOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-800 z-50 max-h-60 overflow-y-auto p-1.5 space-y-1"
                    >
                      {destinationOptions.map((loc) => {
                        const isSelected = selectedDestination === loc.id;
                        return (
                          <button
                            suppressHydrationWarning
                            key={loc.id}
                            type="button"
                            onClick={() => {
                              setSelectedDestination(loc.id);
                              setIsLocOpen(false);
                            }}
                            className={`w-full flex items-center justify-between text-left text-xs px-3 py-2.5 rounded-lg transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#184E70] text-white font-bold"
                                : "text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-[#184E70]"
                            }`}
                          >
                            <span>{loc.label}</span>
                            {isSelected && <Check className="size-3.5 text-white" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Difficulty Level Dropdown */}
              <div className="relative" ref={diffRef}>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#184E70] dark:text-[#38bdf8] mb-2 flex items-center gap-1.5">
                  <Shield className="size-4" /> Difficulty Level
                </label>
                <button
                  suppressHydrationWarning
                  type="button"
                  onClick={() => {
                    setIsDiffOpen(!isDiffOpen);
                    setIsCatOpen(false);
                    setIsLocOpen(false);
                  }}
                  className="w-full flex items-center justify-between bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-foreground font-semibold rounded-xl px-3.5 py-3 hover:border-[#184E70] transition-all cursor-pointer"
                >
                  <span className="truncate">
                    {selectedDifficulty === "all" ? "All Levels" : selectedDifficulty}
                  </span>
                  <ChevronDown
                    className={`size-4 text-muted-foreground shrink-0 transition-transform duration-300 ${
                      isDiffOpen ? "rotate-180 text-[#184E70]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isDiffOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-800 z-50 max-h-60 overflow-y-auto p-1.5 space-y-1"
                    >
                      {["all", "Easy", "Moderate", "Active", "Challenging"].map((diff) => {
                        const isSelected = selectedDifficulty === diff;
                        const label = diff === "all" ? "All Levels" : diff;
                        return (
                          <button
                            suppressHydrationWarning
                            key={diff}
                            type="button"
                            onClick={() => {
                              setSelectedDifficulty(diff);
                              setIsDiffOpen(false);
                            }}
                            className={`w-full flex items-center justify-between text-left text-xs px-3 py-2.5 rounded-lg transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#184E70] text-white font-bold"
                                : "text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-[#184E70]"
                            }`}
                          >
                            <span>{label}</span>
                            {isSelected && <Check className="size-3.5 text-white" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Max Duration Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">MAX DURATION</label>
                  <span className="text-xs font-bold text-[#184E70] dark:text-[#38bdf8]">{maxDuration} Hours</span>
                </div>
                <input
                  suppressHydrationWarning
                  type="range"
                  min="4"
                  max="12"
                  step="1"
                  value={maxDuration}
                  onChange={(e) => setMaxDuration(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#184E70]"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground mt-1 font-semibold">
                  <span>4 hrs</span>
                  <span>8 hrs</span>
                  <span>12 hrs</span>
                </div>
              </div>

              {/* Max Price Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">MAX PRICE</label>
                  <span className="text-xs font-bold text-[#184E70] dark:text-[#38bdf8]">${maxPrice}</span>
                </div>
                <input
                  suppressHydrationWarning
                  type="range"
                  min="50"
                  max="500"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#184E70]"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground mt-1 font-semibold">
                  <span>$50</span>
                  <span>$250</span>
                  <span>$500</span>
                </div>
              </div>
            </aside>

            {/* Results Grid */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Showing <strong className="text-foreground">{filtered.length}</strong> curated tour experiences
                </p>
              </div>

              {filtered.length ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                    className="mt-6 rounded-full font-bold bg-[#184E70] text-white hover:bg-[#123d58]"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedDestination("all");
                      setSelectedDifficulty("all");
                      setMaxDuration(12);
                      setMaxPrice(500);
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

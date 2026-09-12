"use client";

import React, { useState } from "react";
import { Search, MapPin, Compass, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface SearchFilterBarProps {
  className?: string;
  onFilterChange?: (filters: { destination: string; category: string; difficulty: string; keyword: string }) => void;
  initialFilters?: { destination?: string; category?: string; difficulty?: string; keyword?: string };
  isCompact?: boolean;
}

export function SearchFilterBar({ className = "", onFilterChange, initialFilters }: SearchFilterBarProps) {
  const router = useRouter();
  const [destination, setDestination] = useState(initialFilters?.destination || "all");
  const [category, setCategory] = useState(initialFilters?.category || "all");
  const [difficulty, setDifficulty] = useState(initialFilters?.difficulty || "all");
  const [keyword, setKeyword] = useState(initialFilters?.keyword || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onFilterChange) {
      onFilterChange({ destination, category, difficulty, keyword });
    } else {
      const query = new URLSearchParams();
      if (destination !== "all") query.set("destination", destination);
      if (category !== "all") query.set("category", category);
      if (difficulty !== "all") query.set("difficulty", difficulty);
      if (keyword) query.set("keyword", keyword);
      router.push(`/adventures?${query.toString()}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`rounded-2xl border border-white/10 bg-forest/90 p-4 backdrop-blur-md shadow-2xl transition-all md:p-6 ${className}`}
    >
      <div className="grid gap-4 md:grid-cols-4 md:items-end">
        {/* Destination */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-hero-accent">
            <MapPin className="size-3.5" /> Destination
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/10 px-3.5 py-2.5 text-sm font-medium text-white transition focus:border-hero-accent focus:outline-none focus:ring-1 focus:ring-hero-accent"
          >
            <option value="all" className="bg-forest text-white">All Locations</option>
            <option value="kitulgala" className="bg-forest text-white">Kitulgala (River & Jungle)</option>
            <option value="sigiriya" className="bg-forest text-white">Sigiriya (Rock Citadel)</option>
            <option value="ella" className="bg-forest text-white">Ella (Highland Peaks)</option>
            <option value="sinharaja" className="bg-forest text-white">Sinharaja (UNESCO Rainforest)</option>
            <option value="yala" className="bg-forest text-white">Yala (Wild Leopard Park)</option>
            <option value="galle" className="bg-forest text-white">Galle (South Coast Ramparts)</option>
          </select>
        </div>

        {/* Activity Category */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-hero-accent">
            <Compass className="size-3.5" /> Activity Type
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/10 px-3.5 py-2.5 text-sm font-medium text-white transition focus:border-hero-accent focus:outline-none focus:ring-1 focus:ring-hero-accent"
          >
            <option value="all" className="bg-forest text-white">All Categories</option>
            <option value="white-water-rafting" className="bg-forest text-white">White Water Rafting</option>
            <option value="canyoning" className="bg-forest text-white">Jungle Canyoning</option>
            <option value="waterfall-abseiling" className="bg-forest text-white">Waterfall Abseiling</option>
            <option value="jungle-trekking" className="bg-forest text-white">Rainforest Trekking</option>
            <option value="camping-nature" className="bg-forest text-white">Camping & Glamping</option>
            <option value="cultural-safari" className="bg-forest text-white">Safari & Heritage</option>
          </select>
        </div>

        {/* Difficulty */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-hero-accent">
            <Shield className="size-3.5" /> Difficulty
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/10 px-3.5 py-2.5 text-sm font-medium text-white transition focus:border-hero-accent focus:outline-none focus:ring-1 focus:ring-hero-accent"
          >
            <option value="all" className="bg-forest text-white">All Levels</option>
            <option value="Easy" className="bg-forest text-white">Easy (Family Friendly)</option>
            <option value="Moderate" className="bg-forest text-white">Moderate (Active)</option>
            <option value="Active" className="bg-forest text-white">Active (High Energy)</option>
            <option value="Challenging" className="bg-forest text-white">Challenging (Thrill Seekers)</option>
          </select>
        </div>

        {/* Search Submit Button */}
        <div className="flex items-end">
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-xl bg-amber-500 px-6 text-sm font-bold text-slate-950 shadow-lg hover:bg-amber-400"
          >
            <Search className="mr-2 size-4" /> Find Adventures <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}

"use client";

import React, { useState } from "react";
import { Search, MapPin, Calendar, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface SearchFilterBarProps {
  className?: string;
  onFilterChange?: (filters: { destination: string; category: string; difficulty: string; keyword: string }) => void;
  initialFilters?: { destination?: string; category?: string; difficulty?: string; keyword?: string };
}

export function SearchFilterBar({ className = "", onFilterChange, initialFilters }: SearchFilterBarProps) {
  const router = useRouter();
  const [destination, setDestination] = useState(initialFilters?.destination || "all");
  const [category, setCategory] = useState(initialFilters?.category || "all");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onFilterChange) {
      onFilterChange({ destination, category, difficulty: "all", keyword: "" });
    } else {
      const query = new URLSearchParams();
      if (destination !== "all") query.set("destination", destination);
      if (category !== "all") query.set("category", category);
      router.push(`/adventures?${query.toString()}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`w-full rounded-2xl sm:rounded-full bg-white p-2.5 shadow-2xl border border-slate-100 text-slate-900 transition-all ${className}`}
    >
      <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-2 lg:grid-cols-5">
        
        {/* 1. Destination Segment */}
        <div className="flex items-center gap-3 px-4 py-2.5 lg:border-r lg:border-slate-200">
          <MapPin className="size-5 text-emerald-600 shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Where to go?
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              suppressHydrationWarning
              className="w-full bg-transparent font-bold text-sm text-slate-800 focus:outline-none cursor-pointer truncate"
            >
              <option value="all">Type Destination</option>
              <option value="kitulgala">Kitulgala (River Rapids)</option>
              <option value="sigiriya">Sigiriya (Lion Rock)</option>
              <option value="ella">Ella (Highland Peaks)</option>
              <option value="sinharaja">Sinharaja (Rainforest)</option>
              <option value="yala">Yala (Leopard Safari)</option>
              <option value="galle">Galle (Dutch Fort)</option>
            </select>
          </div>
        </div>

        {/* 2. Departure Date Segment */}
        <div className="flex items-center gap-3 px-4 py-2.5 lg:border-r lg:border-slate-200">
          <Calendar className="size-5 text-emerald-600 shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Departure Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              suppressHydrationWarning
              className="w-full bg-transparent font-bold text-sm text-slate-800 focus:outline-none cursor-pointer"
            />
          </div>
        </div>

        {/* 3. Duration / Category Segment */}
        <div className="flex items-center gap-3 px-4 py-2.5 lg:border-r lg:border-slate-200">
          <Clock className="size-5 text-emerald-600 shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Activity Type
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              suppressHydrationWarning
              className="w-full bg-transparent font-bold text-sm text-slate-800 focus:outline-none cursor-pointer truncate"
            >
              <option value="all">Select Duration/Type</option>
              <option value="white-water-rafting">White Water Rafting</option>
              <option value="canyoning">Jungle Canyoning</option>
              <option value="waterfall-abseiling">Waterfall Abseiling</option>
              <option value="jungle-trekking">Rainforest Trekking</option>
              <option value="camping-nature">Camping & Glamping</option>
              <option value="cultural-safari">Safari & Heritage</option>
            </select>
          </div>
        </div>

        {/* 4. Guests Segment */}
        <div className="flex items-center gap-3 px-4 py-2.5">
          <Users className="size-5 text-emerald-600 shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              suppressHydrationWarning
              className="w-full bg-transparent font-bold text-sm text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="1">1 Person</option>
              <option value="2">2 Guests</option>
              <option value="4">4 Guests</option>
              <option value="6">6+ Group</option>
            </select>
          </div>
        </div>

        {/* 5. Action Button */}
        <div className="p-1">
          <Button
            type="submit"
            size="lg"
            className="w-full h-12 rounded-xl sm:rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-md shadow-emerald-500/25 transition-all hover:scale-[1.02]"
          >
            Explore Now
          </Button>
        </div>

      </div>
    </form>
  );
}

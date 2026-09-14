"use client";

import React, { useState } from "react";
import { CheckCircle2, ShieldCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdventureBookingForm({ price, oldPrice }: { price: number; oldPrice?: number }) {
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
    <aside>
      <div className="sticky top-28 rounded-[2rem] border border-border bg-card p-6 shadow-sm">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
              Starting From
            </span>
            <div className="flex items-baseline gap-2">
              <strong className="font-display text-4xl font-extrabold text-foreground">${price}</strong>
              <span className="text-xs text-muted-foreground">/ guest</span>
            </div>
          </div>
          {oldPrice && (
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Save ${oldPrice - price}
            </span>
          )}
        </div>

        <div className="my-6 border-t border-border" />

        {bookingSuccess ? (
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center">
            <CheckCircle2 className="mx-auto size-10 text-emerald-500" />
            <h3 className="mt-3 font-display text-lg font-bold text-foreground">Inquiry Received!</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Thank you, {bookingData.fullName}. Our team will contact you at {bookingData.email} within 2 hours to confirm availability and details.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 rounded-full text-xs font-bold"
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
                  suppressHydrationWarning
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

            <Button type="submit" size="lg" className="w-full rounded-full font-bold bg-emerald-500 text-white hover:bg-emerald-600">
              Check Availability <ChevronRight className="ml-1 size-4" />
            </Button>

            <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground text-center">
              <ShieldCheck className="size-3.5 text-emerald-500" /> Zero booking fees · Pay at location
            </p>
          </form>
        )}
      </div>
    </aside>
  );
}

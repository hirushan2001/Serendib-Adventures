"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send, ShieldCheck, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { adventures } from "@/lib/adventure-data";

export function BookingForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    adventure: adventures[0]?.title || "Kitulgala White Water Rafting Expedition",
    date: "",
    guests: "2",
    notes: ""
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex min-h-[24rem] flex-col items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 p-8 text-center animate-in fade-in zoom-in-95">
        <div className="grid size-16 place-items-center rounded-full bg-amber-500 text-slate-950 shadow-lg">
          <CheckCircle2 className="size-8" />
        </div>
        <h2 className="mt-5 font-display text-3xl font-bold text-foreground">
          Inquiry Successfully Sent!
        </h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          Thank you, <strong className="text-foreground">{formData.fullName}</strong>. Your inquiry for <strong className="text-foreground">{formData.adventure}</strong> has been received by our Kitulgala base camp team.
        </p>
        <div className="mt-6 rounded-xl bg-card p-4 border border-border text-xs text-left w-full max-w-md space-y-1">
          <p><strong>Name:</strong> {formData.fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Date:</strong> {formData.date || "To be decided"}</p>
          <p><strong>Guests:</strong> {formData.guests} Persons</p>
        </div>
        <Button className="mt-6 rounded-xl font-bold" variant="outline" onClick={() => setSent(false)}>
          Send Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={compact ? "space-y-4" : "grid gap-6 md:grid-cols-2"}>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
          Full Name *
        </label>
        <Input
          required
          placeholder="e.g. Maya Thompson"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="rounded-xl text-sm"
        />
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
          Email Address *
        </label>
        <Input
          required
          type="email"
          placeholder="name@domain.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="rounded-xl text-sm"
        />
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
          Phone / WhatsApp *
        </label>
        <Input
          required
          placeholder="+94 77 123 4567"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="rounded-xl text-sm"
        />
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
          Selected Adventure
        </label>
        <select
          suppressHydrationWarning
          value={formData.adventure}
          onChange={(e) => setFormData({ ...formData, adventure: e.target.value })}
          className="w-full h-10 rounded-xl border border-border bg-card px-3 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
        >
          {adventures.map((item) => (
            <option key={item.id} value={item.title}>
              {item.title} (${item.price}/person)
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5 flex items-center gap-1">
          <Calendar className="size-3.5 text-amber-500" /> Preferred Date
        </label>
        <Input
          suppressHydrationWarning
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="rounded-xl text-sm"
        />
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5 flex items-center gap-1">
          <Users className="size-3.5 text-amber-500" /> Number of Guests
        </label>
        <select
          suppressHydrationWarning
          value={formData.guests}
          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
          className="w-full h-10 rounded-xl border border-border bg-card px-3 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
        >
          {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20].map((num) => (
            <option key={num} value={num}>{num} Adventurers</option>
          ))}
        </select>
      </div>

      <div className={compact ? "" : "md:col-span-2"}>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
          Special Requests or Dietary Requirements
        </label>
        <Textarea
          className="min-h-28 rounded-xl text-sm"
          placeholder="Let us know if you need pickup transfers, custom group arrangements, or vegetarian/vegan lunch options..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>

      <div className={compact ? "w-full" : "md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4"}>
        <Button type="submit" size="lg" className="rounded-xl font-bold bg-amber-500 text-slate-950 hover:bg-amber-400">
          Send Adventure Inquiry <Send className="ml-2 size-4" />
        </Button>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-amber-500" /> No payment required today. Direct confirmation from Kitulgala.
        </p>
      </div>
    </form>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { Check, Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { adventures, images } from "@/lib/adventure-data";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <PageHero image={images.camping} eyebrow="Talk to a local" title="Let’s plan something wild">
        <p>Tell us what excites you. Our Kitulgala team will help shape the right experience.</p>
      </PageHero>

      <section className="section-pad bg-background">
        <div className="page-shell grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <aside>
            <span className="block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">Get in touch</span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
              Close to the river.<br />
              Easy to reach.
            </h2>
            <div className="mt-8 grid gap-5 text-sm">
              {[
                [MapPin, "Kitulgala, Sabaragamuwa, Sri Lanka"],
                [Phone, "+94 77 123 4567"],
                [Mail, "info@serendibadventures.com"],
                [Instagram, "@serendibadventures"],
              ].map(([Icon, text]) => {
                const I = Icon as typeof MapPin;
                return (
                  <div className="flex items-center gap-3" key={text as string}>
                    <span className="grid size-10 place-items-center rounded-xl bg-card border border-border">
                      <I className="size-4 text-emerald-600 dark:text-emerald-400" />
                    </span>
                    <span className="text-foreground font-medium">{text as string}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 grid h-64 place-items-center rounded-[2rem] border border-border bg-card text-center p-6 shadow-sm">
              <MapPin className="mx-auto size-8 text-emerald-600 dark:text-emerald-400" />
              <p className="mt-2 text-sm font-bold text-foreground">
                Kitulgala River Base Camp<br />
                <span className="font-normal text-muted-foreground text-xs">Open Daily: 07:00 – 19:00</span>
              </p>
            </div>
          </aside>

          <div className="rounded-[2rem] border border-border bg-card p-6 md:p-10 shadow-sm">
            {sent ? (
              <div className="grid min-h-[30rem] place-items-center text-center">
                <div>
                  <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-500 text-white shadow-md">
                    <Check className="size-7" />
                  </span>
                  <h2 className="mt-5 font-display text-3xl font-bold text-foreground">Message Received!</h2>
                  <p className="mt-2 text-muted-foreground max-w-md text-sm">
                    Thank you for reaching out. Our Kitulgala team will respond to your inquiry shortly.
                  </p>
                  <Button className="mt-6 rounded-full font-bold" variant="outline" onClick={() => setSent(false)}>
                    Write another message
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <span className="block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">Send a message</span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  What would you love to experience?
                </h2>
                <form onSubmit={submit} className="mt-8 grid gap-5 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                      Name *
                    </label>
                    <Input required placeholder="Your name" className="rounded-xl text-sm" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                      Email *
                    </label>
                    <Input required type="email" placeholder="you@example.com" className="rounded-xl text-sm" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                      Phone / WhatsApp
                    </label>
                    <Input placeholder="+94 77 000 0000" className="rounded-xl text-sm" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                      Preferred Adventure
                    </label>
                    <select
                      suppressHydrationWarning
                      className="w-full h-10 rounded-xl border border-border bg-background px-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-accent"
                    >
                      <option>Not sure yet</option>
                      {adventures.map((a) => (
                        <option key={a.slug}>{a.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                      Message *
                    </label>
                    <Textarea
                      required
                      className="min-h-36 rounded-xl text-sm"
                      placeholder="Tell us about your group, dates and interests..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Button type="submit" size="lg" className="rounded-full font-bold bg-emerald-500 text-white hover:bg-emerald-600 px-8">
                      Send Message <Send className="ml-2 size-4" />
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}


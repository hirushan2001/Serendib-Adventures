"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Instagram, Facebook, Youtube, Menu, Mountain, X, Phone, Mail, MapPin, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  ["Home", "/"],
  ["Adventures", "/adventures"],
  ["Destinations", "/destinations"],
  ["About Us", "/about"],
  ["Contact", "/contact"],
] as const;

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${light ? "text-hero-foreground" : "text-foreground"}`} aria-label="Serendib Adventures home">
      <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground shadow-md">
        <Mountain className="size-5" />
      </span>
      <span className="font-display text-base font-extrabold uppercase leading-none tracking-[0.08em]">
        Serendib<br />
        <span className="text-[10px] font-semibold tracking-[0.28em] text-accent">Adventures</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-border bg-background/95 py-3 shadow-md backdrop-blur-md"
          : "bg-gradient-to-b from-black/60 to-transparent py-5"
      }`}
    >
      <div className="page-shell flex items-center justify-between gap-4">
        <Brand light={!solid} />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {links.map(([label, href]) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`nav-link font-medium transition ${
                  isActive
                    ? "!text-accent font-bold"
                    : solid
                    ? "text-foreground hover:text-primary"
                    : "text-hero-foreground hover:text-hero-accent"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="default" className="rounded-xl font-bold bg-amber-500 text-slate-950 hover:bg-amber-400">
            <Link href="/booking">
              Plan Your Adventure <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <Button
          variant={solid ? "ghost" : "glassIcon"}
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav className="page-shell mt-3 grid border-t border-border bg-background/98 py-6 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-3">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl px-4 py-3 font-display text-lg font-bold transition hover:bg-accent/10 hover:text-accent"
              >
                {label}
              </Link>
            ))}
          </div>
          <Button asChild size="lg" className="mt-6 rounded-xl font-bold bg-amber-500 text-slate-950 hover:bg-amber-400">
            <Link href="/booking">
              Plan Your Adventure <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-forest text-hero-foreground">
      <div className="page-shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Brand light />
          <p className="mt-6 text-sm leading-7 text-hero-muted">
            Small-group river, rainforest, and mountain day tours in Kitulgala and across Sri Lanka led by certified expert local guides.
          </p>
          <div className="mt-6 flex gap-3">
            <Button variant="footerIcon" size="icon" aria-label="Instagram">
              <Instagram className="size-4" />
            </Button>
            <Button variant="footerIcon" size="icon" aria-label="Facebook">
              <Facebook className="size-4" />
            </Button>
            <Button variant="footerIcon" size="icon" aria-label="YouTube">
              <Youtube className="size-4" />
            </Button>
          </div>
        </div>

        <div>
          <h2 className="footer-title text-hero-accent">Quick Links</h2>
          <ul className="footer-list space-y-2 mt-4 text-sm text-hero-muted">
            <li>
              <Link href="/adventures" className="hover:text-white transition">All Adventures & Tours</Link>
            </li>
            <li>
              <Link href="/destinations" className="hover:text-white transition">Sri Lanka Destinations</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">Our Story & Guides</Link>
            </li>
            <li>
              <Link href="/booking" className="hover:text-white transition">Book an Experience</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">Contact & Location</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="footer-title text-hero-accent">Destinations</h2>
          <ul className="footer-list space-y-2 mt-4 text-sm text-hero-muted">
            <li><Link href="/destinations" className="hover:text-white transition">Kitulgala Outdoor Capital</Link></li>
            <li><Link href="/destinations" className="hover:text-white transition">Sigiriya Lion Rock</Link></li>
            <li><Link href="/destinations" className="hover:text-white transition">Ella Central Highlands</Link></li>
            <li><Link href="/destinations" className="hover:text-white transition">Sinharaja Virgin Forest</Link></li>
            <li><Link href="/destinations" className="hover:text-white transition">Yala Leopard Safari</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="footer-title text-hero-accent">Contact Base</h2>
          <ul className="footer-list space-y-3 mt-4 text-sm text-hero-muted">
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 text-hero-accent" /> Kitulgala River Base, Sri Lanka
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 text-hero-accent" /> +94 77 123 4567
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 text-hero-accent" /> info@serendibadventures.com
            </li>
            <li className="flex items-center gap-2.5">
              <Compass className="size-4 text-hero-accent" /> Open Daily: 07:00 – 19:00
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-hero-foreground/15">
        <div className="page-shell flex flex-col gap-2 py-6 text-xs text-hero-muted sm:flex-row sm:justify-between">
          <span>© 2026 Serendib Adventures Sri Lanka. All rights reserved.</span>
          <span>Explore deeply. Travel lightly.</span>
        </div>
      </div>
    </footer>
  );
}

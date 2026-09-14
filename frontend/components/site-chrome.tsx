"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Instagram, Facebook, Youtube, Menu, Mountain, X, Phone, Mail, MapPin, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const links = [
  ["Home", "/"],
  ["All Packages", "/adventures"],
  ["Destinations", "/destinations"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Serendib Adventures home">
      <img
        src={siteConfig.logo}
        alt={siteConfig.name}
        className={`h-8 sm:h-9 w-auto object-contain transition ${light ? "brightness-0 invert" : ""}`}
      />
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/80 bg-white/90 py-3.5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90"
          : "bg-white py-4 border-b border-slate-100 dark:bg-slate-950 dark:border-slate-900"
      }`}
    >
      <div className="page-shell flex items-center justify-between gap-4">
        <Brand />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Main navigation">
          {links.map(([label, href]) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-semibold transition ${
                  isActive
                    ? "text-emerald-600 font-bold dark:text-emerald-400"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Button */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild className="rounded-full bg-slate-950 px-6 py-2 text-xs font-bold text-white transition hover:bg-slate-800 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-600">
            <Link href="/booking">
              Plan Trip
            </Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden rounded-full"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav className="page-shell mt-3 grid border-t border-slate-100 bg-white py-6 backdrop-blur-xl lg:hidden dark:bg-slate-950 dark:border-slate-900">
          <div className="flex flex-col gap-3">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl px-4 py-3 font-display text-lg font-bold transition hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-slate-900"
              >
                {label}
              </Link>
            ))}
          </div>
          <Button asChild size="lg" className="mt-6 rounded-full font-bold bg-slate-950 text-white hover:bg-slate-800">
            <Link href="/booking">
              Plan Trip <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-slate-950 text-white">
    {/* <footer className="bg-slate-950 text-white rounded-t-[2.5rem] md:rounded-t-[3.5rem] mt-8 overflow-hidden"> */}
      <div className="page-shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Brand light />
          <p className="mt-6 text-sm leading-7 text-slate-400">
            {siteConfig.description}
          </p>
          <div className="mt-6 flex gap-3">
            <Button asChild variant="footerIcon" size="icon" aria-label="Instagram">
              <a href={siteConfig.social.instagram.url} target="_blank" rel="noopener noreferrer" title="Follow us on Instagram">
                <Instagram className="size-4" />
              </a>
            </Button>
            <Button asChild variant="footerIcon" size="icon" aria-label="Facebook">
              <a href={siteConfig.social.facebook.url} target="_blank" rel="noopener noreferrer" title="Follow us on Facebook">
                <Facebook className="size-4" />
              </a>
            </Button>
            <Button asChild variant="footerIcon" size="icon" aria-label="YouTube">
              <a href={siteConfig.social.youtube.url} target="_blank" rel="noopener noreferrer" title="Subscribe to our YouTube channel">
                <Youtube className="size-4" />
              </a>
            </Button>
          </div>
        </div>

        <div>
          <h2 className="footer-title text-emerald-400">Quick Links</h2>
          <ul className="footer-list space-y-2 mt-4 text-sm text-slate-400">
            <li>
              <Link href="/adventures" className="hover:text-white transition">All Packages & Tours</Link>
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
          <h2 className="footer-title text-emerald-400">Destinations</h2>
          <ul className="footer-list space-y-2 mt-4 text-sm text-slate-400">
            <li><Link href="/destinations" className="hover:text-white transition">Kitulgala Outdoor Capital</Link></li>
            <li><Link href="/destinations" className="hover:text-white transition">Sigiriya Lion Rock</Link></li>
            <li><Link href="/destinations" className="hover:text-white transition">Ella Central Highlands</Link></li>
            <li><Link href="/destinations" className="hover:text-white transition">Sinharaja Virgin Forest</Link></li>
            <li><Link href="/destinations" className="hover:text-white transition">Yala Leopard Safari</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="footer-title text-emerald-400">Contact Base</h2>
          <ul className="footer-list space-y-3 mt-4 text-sm text-slate-400">
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 text-emerald-400" /> {siteConfig.contact.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 text-emerald-400" /> {siteConfig.contact.phone}
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 text-emerald-400" /> {siteConfig.contact.email}
            </li>
            <li className="flex items-center gap-2.5">
              <Compass className="size-4 text-emerald-400" /> {siteConfig.contact.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="page-shell flex flex-col gap-2 py-6 text-xs text-slate-400 sm:flex-row sm:justify-between">
          <span>© 2026 Serendib Adventures Sri Lanka. All rights reserved.</span>
          <span>Explore deeply. Travel light.</span>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Instagram, Facebook, Youtube, Menu, Mountain, X, Phone, Mail, MapPin, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

import { StaggeredMenu, MenuItem, SocialItem } from "@/components/StaggeredMenu";

const menuItems: MenuItem[] = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "All Packages", ariaLabel: "Browse adventure packages", link: "/adventures" },
  { label: "Destinations", ariaLabel: "Explore destinations", link: "/destinations" },
  { label: "About", ariaLabel: "Learn about us", link: "/about" },
  { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
];

const socialItems: SocialItem[] = [
  { label: "Instagram", link: siteConfig.social.instagram.url },
  { label: "Facebook", link: siteConfig.social.facebook.url },
  { label: "YouTube", link: siteConfig.social.youtube.url },
];

export function Brand({ light = false, className = "h-10 sm:h-12 lg:h-[3.25rem]" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Serendib Adventures home">
      <img
        src={siteConfig.logo}
        alt={siteConfig.name}
        className={`w-auto object-contain transition ${className} ${light ? "brightness-0 invert" : ""}`}
      />
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200/80 bg-white/90 py-2 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90"
            : "bg-white py-2.5 border-b border-slate-100 dark:bg-slate-950 dark:border-slate-900"
        }`}
      >
        <div className="page-shell flex items-center justify-between gap-4">
          <Brand className="h-10 sm:h-12 lg:h-[3.25rem]" />

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Main navigation">
            {menuItems.map((item) => {
              const isActive = item.link === "/" ? pathname === "/" : pathname.startsWith(item.link);
              return (
                <Link
                  key={item.link}
                  href={item.link}
                  className={`text-sm font-semibold transition ${
                    isActive
                      ? "text-emerald-600 font-bold dark:text-emerald-400"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button (Desktop) */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild className="rounded-full bg-slate-950 px-6 py-2 text-xs font-bold text-white transition hover:bg-slate-800 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-600">
              <Link href="/booking">
                Plan Trip
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ReactBits Staggered Mobile Menu (Fixed Overlay for Mobile/Tablet) */}
      <div className="lg:hidden">
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering={false}
          menuButtonColor="#0f172a"
          openMenuButtonColor="#0f172a"
          changeMenuColorOnOpen={false}
          colors={["#ecfdf5", "#d1fae5", "#a7f3d0", "#10b981"]}
          logoUrl={siteConfig.logo}
          accentColor="#059669"
          isFixed={true}
        />
      </div>
    </>
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

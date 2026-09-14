"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { X, ArrowRight, Instagram, Facebook, Youtube } from "lucide-react";
import gsap from "gsap";

export interface MenuItem {
  label: string;
  ariaLabel?: string;
  link: string;
}

export interface SocialItem {
  label: string;
  link: string;
  icon?: React.ReactNode;
}

export interface StaggeredMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  socialItems?: SocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  accentColor?: string;
  logoUrl?: string;
}

export function StaggeredMenu({
  isOpen,
  onClose,
  items,
  socialItems = [
    { label: "Instagram", link: "https://instagram.com", icon: <Instagram className="size-5" /> },
    { label: "Facebook", link: "https://facebook.com", icon: <Facebook className="size-5" /> },
    { label: "YouTube", link: "https://youtube.com", icon: <Youtube className="size-5" /> },
  ],
  displaySocials = true,
  displayItemNumbering = true,
  accentColor = "#10b981", // Emerald accent
  logoUrl = "/images/logos/logo.png",
}: StaggeredMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      const ctx = gsap.context(() => {
        // Animate Container Layer
        gsap.fromTo(
          containerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );

        // Slide panel from top/right
        gsap.fromTo(
          panelRef.current,
          { y: "-100%" },
          { y: "0%", duration: 0.5, ease: "power3.out" }
        );

        // Stagger animate menu items
        if (itemsRef.current) {
          const itemElements = itemsRef.current.children;
          gsap.fromTo(
            itemElements,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.08,
              delay: 0.2,
              ease: "power3.out",
            }
          );
        }

        // Animate Socials & Footer
        if (socialsRef.current) {
          gsap.fromTo(
            socialsRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, delay: 0.5, ease: "power2.out" }
          );
        }
      }, containerRef);

      return () => ctx.revert();
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col bg-slate-950/80 backdrop-blur-2xl transition-opacity lg:hidden"
    >
      {/* Full-Screen Menu Panel */}
      <div
        ref={panelRef}
        className="relative flex h-full w-full flex-col justify-between overflow-y-auto bg-slate-950 p-6 sm:p-10 text-white"
      >
        {/* Top Header Bar inside drawer */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-5">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <img src={logoUrl} alt="Logo" className="h-10 sm:h-12 w-auto object-contain" />
          </Link>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-11 place-items-center rounded-full bg-slate-900 border border-slate-800 text-white shadow-lg transition hover:bg-emerald-500 hover:text-slate-950 active:scale-95"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Staggered Navigation Items */}
        <div ref={itemsRef} className="my-auto flex flex-col gap-6 py-8">
          {items.map((item, idx) => {
            const formattedNum = String(idx + 1).padStart(2, "0");

            return (
              <Link
                key={item.link}
                href={item.link}
                onClick={onClose}
                aria-label={item.ariaLabel || item.label}
                className="group flex items-center justify-between border-b border-slate-900 pb-4 text-left transition"
              >
                <div className="flex items-baseline gap-4">
                  {displayItemNumbering && (
                    <span className="font-mono text-sm font-bold text-emerald-400 opacity-80">
                      {formattedNum}.
                    </span>
                  )}
                  <span className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100 group-hover:text-emerald-400 group-hover:translate-x-2 transition-all">
                    {item.label}
                  </span>
                </div>

                <div className="grid size-10 place-items-center rounded-full bg-slate-900 text-slate-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                  <ArrowRight className="size-5" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer & Social Icons */}
        <div ref={socialsRef} className="border-t border-slate-900 pt-6">
          {displaySocials && (
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Connect With Us
              </span>

              <div className="flex items-center gap-4">
                {socialItems.map((soc) => (
                  <a
                    key={soc.label}
                    href={soc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/90 px-4 py-2 text-xs font-bold text-slate-300 transition hover:border-emerald-500 hover:bg-emerald-500 hover:text-slate-950"
                  >
                    {soc.icon}
                    <span>{soc.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          <p className="mt-6 text-xs text-slate-400">
            © 2026 Serendib Adventures. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

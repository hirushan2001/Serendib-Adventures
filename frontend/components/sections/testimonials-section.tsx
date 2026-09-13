"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useMotionTemplate, animate } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Review } from "@/lib/types";

interface TestimonialsSectionProps {
  reviews: Review[];
}

function TestimonialCard({ review, index }: { review: Review; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      whileHover={{
        y: -8,
        scale: 1.015,
        transition: { type: "spring", stiffness: 350, damping: 25 },
      }}
      className="group relative rounded-[2rem] border border-slate-200/80 bg-white p-8 sm:p-9 flex flex-col justify-between shadow-lg hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900 transition-all duration-300 overflow-hidden h-full select-none"
    >
      {/* Aceternity UI Spotlight Beam Effect (Theme Matched) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.14),
              transparent 80%
            )
          `,
        }}
      />
      {/* Border Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.3),
              transparent 80%
            )
          `,
        }}
      />

      {/* Card Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1 text-amber-400">
            {Array.from({ length: review.rating || 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
          </div>
          {review.sourceBadge && (
            <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {review.sourceBadge}
            </span>
          )}
        </div>

        <p className="text-slate-700 dark:text-slate-200 text-base sm:text-lg font-medium leading-relaxed">
          "{review.comment}"
        </p>
      </div>

      {/* Reviewer Info (Bottom) */}
      <div className="relative z-10 flex items-center gap-3.5 pt-8 mt-6 border-t border-slate-100 dark:border-slate-800/80">
        <img
          src={
            review.avatar ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
          }
          alt={review.name}
          className="size-11 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
        />
        <div className="overflow-hidden">
          <strong className="block text-slate-900 dark:text-white font-bold text-base truncate">
            {review.name}
          </strong>
          <span className="block text-slate-500 dark:text-slate-400 text-xs sm:text-sm truncate">
            {review.country} · {review.trip}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection({ reviews }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - cardsToShow);

  const updateOffset = useCallback(
    (index: number) => {
      if (!trackRef.current) return;
      const cardElement = trackRef.current.children[0] as HTMLElement;
      if (!cardElement) return;

      const cardWidth = cardElement.offsetWidth;
      const gap = 24; // gap-6 (1.5rem)
      const targetX = -index * (cardWidth + gap);

      animate(x, targetX, {
        type: "spring",
        stiffness: 240,
        damping: 26,
        mass: 0.8,
      });
    },
    [x]
  );

  useEffect(() => {
    updateOffset(currentIndex);
  }, [currentIndex, cardsToShow, updateOffset]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay functionality
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="page-shell py-12 md:py-16 overflow-hidden">
      {/* Theme Matched Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1.5">
            Stories From Our Adventurers
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            People Love <span className="rounded-md bg-emerald-200/90 px-2.5 py-0.5 text-slate-900 dark:bg-emerald-500/30 dark:text-emerald-300 font-extrabold inline-block">Serendib</span>
          </h2>
        </div>

        {/* Navigation Arrows on Top Right */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            suppressHydrationWarning
            onClick={handlePrev}
            className="group size-11 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white hover:border-emerald-500 flex items-center justify-center transition-all duration-300 shadow-sm active:scale-90"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-5 transition-transform duration-200 group-hover:-translate-x-1" />
          </button>
          <button
            suppressHydrationWarning
            onClick={handleNext}
            className="group size-11 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white hover:border-emerald-500 flex items-center justify-center transition-all duration-300 shadow-sm active:scale-90"
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Carousel Window */}
      <div
        className="overflow-hidden -mx-2 px-2 py-3"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-6 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{
            left: trackRef.current
              ? -(
                  (reviews.length - cardsToShow) *
                  ((trackRef.current.children[0] as HTMLElement)?.offsetWidth + 24 || 350)
                )
              : 0,
            right: 0,
          }}
          onDragEnd={(_, info) => {
            const offset = info.offset.x;
            const velocity = info.velocity.x;

            if (offset < -50 || velocity < -500) {
              handleNext();
            } else if (offset > 50 || velocity > 500) {
              handlePrev();
            } else {
              updateOffset(currentIndex);
            }
          }}
        >
          {reviews.map((review, idx) => (
            <div
              key={review.id}
              className="w-full shrink-0 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <TestimonialCard review={review} index={idx} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Images, X, Heart } from "lucide-react";

interface PhotoGalleryProps {
  mainImage: string;
  galleryImages?: string[];
  title: string;
}

export function PhotoGallery({ mainImage, galleryImages, title }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [gridView, setGridView] = useState(false);

  const extraImages = galleryImages && galleryImages.length > 0 ? galleryImages : [];
  const allImages = Array.from(new Set([mainImage, ...extraImages]));
  const gridImages = allImages.slice(0, 5);
  const total = allImages.length;

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % total);
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + total) % total);
      if (e.key === "Escape") {
        setLightboxOpen(false);
        setGridView(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, total]);

  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  const openAt = (index: number) => {
    setActiveIndex(index);
    setGridView(false);
    setLightboxOpen(true);
  };

  const lightboxContent =
    lightboxOpen && portalTarget
      ? ReactDOM.createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-white flex flex-col select-none text-slate-900"
            style={{ animation: "galleryFadeIn 0.18s ease" }}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
              <button
                onClick={() => {
                  setLightboxOpen(false);
                  setGridView(false);
                }}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors shadow-sm"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {!gridView ? (
                <span className="text-sm font-medium text-slate-600 tabular-nums">
                  {activeIndex + 1} / {total}
                </span>
              ) : (
                <span className="text-sm sm:text-base font-semibold text-slate-800">
                  All Photos ({title})
                </span>
              )}

              <button
                onClick={() => setGridView((v) => !v)}
                className={`w-9 h-9 flex items-center justify-center rounded-full border transition-colors shadow-sm ${
                  gridView
                    ? "bg-slate-900 border-slate-900 text-white"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
                aria-label={gridView ? "Show single view" : "Show grid view"}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor" />
                  <rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor" />
                  <rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor" />
                  <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" />
                </svg>
              </button>
            </div>

            {/* Lightbox Content Body */}
            {gridView ? (
              <div className="flex-1 overflow-y-auto overscroll-contain bg-white">
                <div className="max-w-5xl mx-auto px-6 py-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {allImages.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setActiveIndex(i);
                          setGridView(false);
                        }}
                        className={`rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 cursor-pointer ring-4 transition-all shadow-sm ${
                          i === activeIndex ? "ring-[#6300e4] border-2 border-white" : "ring-transparent hover:ring-slate-300"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Photo ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 relative flex items-center justify-center bg-white overflow-hidden">
                <button
                  onClick={() => setActiveIndex((i) => (i - 1 + total) % total)}
                  className="absolute left-6 z-10 w-11 h-11 flex items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors shadow-md"
                  aria-label="Previous photo"
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div className="w-full h-full flex items-center justify-center px-4 sm:px-24 py-6">
                  <img
                    key={activeIndex}
                    src={allImages[activeIndex]}
                    alt={`Photo ${activeIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-2xl shadow-xl"
                    style={{ animation: "imgFadeIn 0.2s ease" }}
                  />
                </div>

                <button
                  onClick={() => setActiveIndex((i) => (i + 1) % total)}
                  className="absolute right-6 z-10 w-11 h-11 flex items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors shadow-md"
                  aria-label="Next photo"
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}

            <style>{`
              @keyframes galleryFadeIn {
                from { opacity: 0; }
                to   { opacity: 1; }
              }
              @keyframes imgFadeIn {
                from { opacity: 0; transform: scale(0.97); }
                to   { opacity: 1; transform: scale(1); }
              }
            `}</style>
          </div>,
          portalTarget
        )
      : null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-4 sm:grid-rows-2 gap-2.5 h-auto sm:h-[420px] rounded-2xl overflow-hidden shadow-xl">
        {/* Main Large Image (Spans 2 cols, 2 rows on desktop) */}
        <div
          className="relative h-64 sm:h-full sm:col-span-2 sm:row-span-2 group cursor-pointer overflow-hidden rounded-2xl sm:rounded-none bg-slate-900"
          onClick={() => openAt(0)}
        >
          <img
            src={gridImages[0]}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Wishlist Heart Button */}
          <button
            type="button"
            aria-label="Add to wishlist"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-4 left-4 z-20 size-11 rounded-xl bg-white text-slate-700 hover:text-rose-500 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-slate-100"
          >
            <Heart className="size-5" />
          </button>

          <div className="absolute bottom-4 right-4 sm:hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setGridView(true);
                setLightboxOpen(true);
              }}
              className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold px-3.5 py-2 rounded-xl shadow-lg hover:bg-slate-100 transition-colors"
            >
              <Images className="w-4 h-4 text-emerald-600" />
              <span>Photos ({total})</span>
            </button>
          </div>
        </div>

        {/* 4 Thumbnails on the right */}
        {gridImages.slice(1, 5).map((img, i) => (
          <div
            key={i}
            className="hidden sm:block relative group cursor-pointer overflow-hidden bg-slate-900"
            onClick={() => openAt(i + 1)}
          >
            <img
              src={img}
              alt={`Gallery image ${i + 2}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {i === 3 && (
              <div className="absolute inset-0 bg-black/40 hover:bg-black/30 backdrop-blur-[2px] transition-colors flex items-center justify-center p-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setGridView(true);
                    setLightboxOpen(true);
                  }}
                  className="flex items-center gap-2 bg-white text-slate-900 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-lg hover:bg-emerald-500 hover:text-white transition-all transform hover:scale-105"
                >
                  <Images className="w-4 h-4" />
                  <span>View all</span>
                </button>
              </div>
            )}
            {i !== 3 && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            )}
          </div>
        ))}
      </div>

      {lightboxContent}
    </>
  );
}

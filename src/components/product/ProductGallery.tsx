"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductArt, type ProductView } from "@/components/ui/ProductArt";

const VIEWS: { id: ProductView; label: string }[] = [
  { id: "front", label: "Front" },
  { id: "angle", label: "3/4" },
  { id: "side", label: "Profile" },
  { id: "back", label: "Back" },
];

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState<ProductView>("front");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;
      const idx = VIEWS.findIndex((v) => v.id === active);
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActive(VIEWS[(idx + 1) % VIEWS.length].id);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActive(VIEWS[(idx - 1 + VIEWS.length) % VIEWS.length].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative bg-white p-3 ring-1 ring-[var(--line)]">
        <div key={active} className="animate-pop">
          <ProductArt product={product} view={active} size="hero" />
        </div>
        {/* View label badge */}
        <span className="absolute left-6 top-6 inline-flex h-7 items-center bg-[var(--ink)] px-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white">
          {VIEWS.find((v) => v.id === active)?.label}
        </span>
        {/* Prev/next buttons */}
        <button
          type="button"
          aria-label="Previous view"
          onClick={() => {
            const idx = VIEWS.findIndex((v) => v.id === active);
            setActive(VIEWS[(idx - 1 + VIEWS.length) % VIEWS.length].id);
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center bg-white text-[var(--ink)] ring-1 ring-[var(--line)] shadow-sm transition hover:bg-[var(--ink)] hover:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next view"
          onClick={() => {
            const idx = VIEWS.findIndex((v) => v.id === active);
            setActive(VIEWS[(idx + 1) % VIEWS.length].id);
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center bg-white text-[var(--ink)] ring-1 ring-[var(--line)] shadow-sm transition hover:bg-[var(--ink)] hover:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
        {/* Pagination dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 bg-white/80 px-3 py-2 ring-1 ring-[var(--line)]">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              type="button"
              aria-label={`Show ${v.label} view`}
              onClick={() => setActive(v.id)}
              className={`h-1.5 transition-all ${
                active === v.id ? "w-6 bg-[var(--ink)]" : "w-1.5 bg-[var(--ink)]/30 hover:bg-[var(--ink)]/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            aria-label={`Show ${v.label} view`}
            aria-pressed={active === v.id}
            onClick={() => setActive(v.id)}
            className={`group relative bg-white p-1.5 transition ring-1 ${
              active === v.id ? "ring-[var(--ink)] ring-2" : "ring-[var(--line)] hover:ring-[var(--ink)]/50"
            }`}
          >
            <ProductArt product={product} view={v.id} size="card" className="aspect-[3/2]" />
            <span
              className={`absolute bottom-2 left-2 inline-flex h-5 items-center px-1.5 text-[9px] font-mono font-bold uppercase tracking-[0.14em] transition ${
                active === v.id
                  ? "bg-[var(--ink)] text-white"
                  : "bg-white/80 text-[var(--ink-3)] group-hover:bg-[var(--ink)] group-hover:text-white"
              }`}
            >
              {v.label}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-4)]">
        ← → Use arrow keys to switch views
      </p>
    </div>
  );
}

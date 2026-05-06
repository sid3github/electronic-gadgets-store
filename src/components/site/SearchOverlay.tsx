"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, PRODUCTS, formatINR } from "@/lib/products";
import { ProductArt } from "@/components/ui/ProductArt";
import { Search, X } from "@/components/ui/Icon";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setQuery("");
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  const closeSearch = () => {
    setQuery("");
    onClose();
  };

  const results = useMemo(() => {
    if (!query.trim()) return PRODUCTS.slice(0, 6);
    const q = query.toLowerCase();
    return PRODUCTS.filter((p) =>
      [p.name, p.brand, p.tagline, p.category, ...p.highlights].some((v) =>
        v.toLowerCase().includes(q),
      ),
    ).slice(0, 8);
  }, [query]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/products?q=${encodeURIComponent(q)}`);
      closeSearch();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[95] transition-opacity duration-300 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <div onClick={closeSearch} className="absolute inset-0 cursor-pointer bg-[var(--ink)]/40 backdrop-blur-sm" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        className={`relative mx-auto mt-0 flex h-full max-h-screen w-full flex-col bg-[var(--paper)] transition-transform duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] sm:mt-12 sm:h-auto sm:max-w-3xl sm:translate-y-0 ${
          open ? "translate-y-0" : "-translate-y-8"
        }`}
      >
        <form onSubmit={onSubmit} className="flex items-center gap-3 border-b border-[var(--line)] bg-white px-5 py-4">
          <Search size={20} className="text-[var(--ink-3)]" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tablets, laptops, kiosks…"
            className="h-11 flex-1 bg-transparent text-lg font-semibold text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none"
          />
          <kbd className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--ink-4)] sm:inline">
            ESC
          </kbd>
          <button
            type="button"
            aria-label="Close search"
            onClick={closeSearch}
            className="inline-flex h-10 w-10 items-center justify-center text-[var(--ink-3)] hover:text-[var(--ink)]"
          >
            <X size={18} />
          </button>
        </form>

        <div className="grid grid-cols-1 gap-6 overflow-y-auto bg-[var(--paper)] p-6 sm:grid-cols-[180px_1fr] sm:p-8">
          {/* Quick categories */}
          <aside className="flex flex-col gap-2 border-r border-[var(--line)] pr-4">
            <span className="eyebrow text-[var(--ink-4)]">Categories</span>
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/products?category=${c.slug}`}
                onClick={closeSearch}
                className="py-1.5 text-sm font-semibold text-[var(--ink-2)] transition hover:text-[var(--cobalt)]"
              >
                {c.label}
              </Link>
            ))}
          </aside>

          {/* Results */}
          <div className="flex flex-col gap-3">
            <span className="eyebrow text-[var(--ink-4)]">
              {query.trim() ? `Results · ${results.length}` : "Featured products"}
            </span>
            {results.length === 0 ? (
              <p className="text-sm text-[var(--ink-3)]">No products match &quot;{query}&quot;. Try a different term.</p>
            ) : (
              <ul className="flex flex-col">
                {results.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      onClick={closeSearch}
                      className="group flex items-center gap-4 border-b border-[var(--line)] py-3 transition hover:bg-white"
                    >
                      <div className="h-14 w-20 shrink-0">
                        <ProductArt product={p} size="card" className="aspect-[5/3.5]" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--ink-4)]">
                          {p.brand}
                        </span>
                        <h4 className="text-sm font-bold text-[var(--ink)] group-hover:text-[var(--cobalt)]">
                          {p.name}
                        </h4>
                      </div>
                      <span className="text-sm font-black text-[var(--ink)]">{formatINR(p.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

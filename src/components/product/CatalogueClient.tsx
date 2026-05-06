"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/lib/types";
import { CATEGORIES, getBrands, getPriceBuckets } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { Filter, Search, X } from "@/components/ui/Icon";

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to high" },
  { id: "price-desc", label: "Price: High to low" },
  { id: "rating", label: "Top rated" },
  { id: "newest", label: "Newest" },
] as const;

type SortId = (typeof SORTS)[number]["id"];

const CATEGORY_VALUES = CATEGORIES.map((c) => c.slug);

function readCategory(value: string | null) {
  return value && (CATEGORY_VALUES as string[]).includes(value) ? value : "";
}

export function CatalogueClient({ products }: { products: Product[] }) {
  const params = useSearchParams();
  const router = useRouter();

  const category = readCategory(params.get("category"));
  const query = params.get("q") ?? "";

  const [brands, setBrands] = useState<string[]>([]);
  const [priceBucket, setPriceBucket] = useState<string>("");
  const [sort, setSort] = useState<SortId>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const updateUrl = (next: { category?: string; q?: string }) => {
    const sp = new URLSearchParams(params.toString());
    if ("category" in next) {
      if (next.category) sp.set("category", next.category);
      else sp.delete("category");
    }
    if ("q" in next) {
      if (next.q) sp.set("q", next.q);
      else sp.delete("q");
    }
    const qs = sp.toString();
    router.replace(`/products${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const allBrands = getBrands();
  const buckets = getPriceBuckets();

  const filtered = useMemo(() => {
    let list = [...products];
    if (category) list = list.filter((p) => p.category === category);
    if (brands.length) list = list.filter((p) => brands.includes(p.brand));
    if (priceBucket) {
      const b = buckets.find((x) => x.label === priceBucket);
      if (b) list = list.filter((p) => p.price >= b.min && p.price <= b.max);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) =>
        [p.name, p.brand, p.tagline, p.description, ...p.highlights].some((field) =>
          field.toLowerCase().includes(q),
        ),
      );
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => (b.badge === "new" ? 1 : 0) - (a.badge === "new" ? 1 : 0));
        break;
    }
    return list;
  }, [products, category, brands, priceBucket, sort, query, buckets]);

  const reset = () => {
    setBrands([]);
    setPriceBucket("");
    updateUrl({ category: "", q: "" });
  };

  const toggleBrand = (b: string) => {
    setBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
  };

  const filterCount = (category ? 1 : 0) + brands.length + (priceBucket ? 1 : 0);

  return (
    <div className="flex flex-col gap-6">
      {/* category chip row */}
      <div className="flex flex-wrap gap-2">
        <CategoryChip label="All" active={!category} onClick={() => updateUrl({ category: "" })} />
        {CATEGORIES.map((c) => (
          <CategoryChip key={c.slug} label={c.label} active={category === c.slug} onClick={() => updateUrl({ category: c.slug })} />
        ))}
      </div>

      {/* Toolbar */}
      <div className="surface-card sticky top-[7rem] z-30 flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-4)]" />
          <input
            type="search"
            placeholder="Search tablets, laptops, kiosks…"
            value={query}
            onChange={(e) => updateUrl({ q: e.target.value })}
            className="h-11 w-full border border-[var(--line)] bg-white pl-11 pr-4 text-sm text-[var(--ink)] placeholder:text-[var(--ink-4)] transition focus:border-[var(--ink)] focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="inline-flex h-11 items-center gap-2 border border-[var(--line)] bg-white px-4 text-sm font-semibold text-[var(--ink)] lg:hidden"
          >
            <Filter size={14} /> Filters
            {filterCount ? (
              <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center bg-[var(--ink)] px-1 text-[10px] font-bold text-white">
                {filterCount}
              </span>
            ) : null}
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortId)}
            className="h-11 min-w-[170px] border border-[var(--line)] bg-white px-4 text-sm font-semibold text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                Sort: {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        {/* Filters — desktop sidebar */}
        <aside className="hidden lg:block">
          <FilterPanel
            brands={brands}
            toggleBrand={toggleBrand}
            allBrands={allBrands}
            priceBucket={priceBucket}
            setPriceBucket={setPriceBucket}
            buckets={buckets}
            onReset={reset}
            filterCount={filterCount}
          />
        </aside>

        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--ink-3)]">
              Showing <span className="text-[var(--ink)] font-bold">{filtered.length}</span>{" "}
              of <span className="text-[var(--ink)] font-bold">{products.length}</span> products
            </span>
            {filterCount > 0 ? (
              <button onClick={reset} className="text-sm font-semibold text-[var(--cobalt)] hover:underline">
                Clear all filters
              </button>
            ) : null}
          </div>

          {filtered.length === 0 ? (
            <div className=" border border-dashed border-[var(--line-strong)] bg-white p-12 text-center">
              <h3 className="text-lg font-bold text-[var(--ink)]">Nothing matches that search.</h3>
              <p className="mt-2 text-sm text-[var(--ink-3)]">Try clearing filters or searching for a different term.</p>
              <button onClick={reset} className="mt-4 inline-flex h-11 items-center bg-[var(--ink)] px-5 text-sm font-semibold text-white">
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.slug} product={p} tilt />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen ? (
        <div className="fixed inset-0 z-[80] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 cursor-pointer bg-[var(--ink)]/40 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-[var(--paper)] p-5">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-[var(--ink-3)]">Filters</span>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setFiltersOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center border border-[var(--line-strong)] bg-white text-[var(--ink)]"
              >
                <X size={16} />
              </button>
            </div>
            <div className="mt-5">
              <FilterPanel
                brands={brands}
                toggleBrand={toggleBrand}
                allBrands={allBrands}
                priceBucket={priceBucket}
                setPriceBucket={setPriceBucket}
                buckets={buckets}
                onReset={reset}
                filterCount={filterCount}
              />
            </div>
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-6 h-12 bg-[var(--ink)] font-semibold text-white"
            >
              Apply ({filtered.length} products)
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-9 items-center px-4 text-sm font-semibold transition ${
        active
          ? "bg-[var(--ink)] text-white"
          : "bg-white border border-[var(--line)] text-[var(--ink-2)] hover:border-[var(--ink)]"
      }`}
    >
      {label}
    </button>
  );
}

function FilterPanel({
  brands,
  toggleBrand,
  allBrands,
  priceBucket,
  setPriceBucket,
  buckets,
  onReset,
  filterCount,
}: {
  brands: string[];
  toggleBrand: (b: string) => void;
  allBrands: string[];
  priceBucket: string;
  setPriceBucket: (s: string) => void;
  buckets: { label: string; min: number; max: number }[];
  onReset: () => void;
  filterCount: number;
}) {
  return (
    <div className="flex flex-col gap-7 text-sm">
      <FilterGroup heading="Brand">
        {allBrands.map((b) => (
          <label key={b} className="flex cursor-pointer items-center gap-2.5 px-2.5 py-1.5 text-[var(--ink-2)] hover:bg-[var(--paper-tint)]">
            <input
              type="checkbox"
              checked={brands.includes(b)}
              onChange={() => toggleBrand(b)}
              className="h-4 w-4 rounded border-[var(--line-strong)] bg-white accent-[var(--ink)]"
            />
            <span>{b}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup heading="Price">
        {buckets.map((b) => (
          <label key={b.label} className="flex cursor-pointer items-center gap-2.5 px-2.5 py-1.5 text-[var(--ink-2)] hover:bg-[var(--paper-tint)]">
            <input
              type="radio"
              name="price"
              checked={priceBucket === b.label}
              onChange={() => setPriceBucket(priceBucket === b.label ? "" : b.label)}
              className="h-4 w-4 accent-[var(--ink)]"
            />
            <span>{b.label}</span>
          </label>
        ))}
      </FilterGroup>

      {filterCount > 0 ? (
        <button onClick={onReset} className="text-sm font-semibold text-[var(--cobalt)] hover:underline">
          Clear all filters
        </button>
      ) : null}
    </div>
  );
}

function FilterGroup({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <h4 className="px-2.5 eyebrow text-[var(--ink-3)]">{heading}</h4>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

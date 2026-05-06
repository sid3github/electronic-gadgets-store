"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, type MouseEvent, type PointerEvent } from "react";
import type { Category } from "@/lib/types";
import { CATEGORIES, PRODUCTS, formatINR } from "@/lib/products";
import { ProductArt } from "@/components/ui/ProductArt";
import { ArrowRight } from "@/components/ui/Icon";

const CATEGORY_LABELS: Record<Category, string> = {
  tablets: "Tablets",
  laptops: "Laptops",
  smartboards: "Boards",
  kiosks: "Kiosks",
  peripherals: "Accessories",
};

export function MegaMenu() {
  const [active, setActive] = useState<Category | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = pathname === "/products" ? searchParams.get("category") : null;
  const onDealsPage = pathname === "/deals";

  const closeTimerRef = useRef<number | null>(null);

  const open = (cat: Category) => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActive(cat);
  };

  const scheduleClose = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setActive(null), 120);
  };

  const browseCategory = (cat: Category) => {
    setActive(null);
    router.push(`/products?category=${cat}`);
  };

  return (
    <nav
      aria-label="Primary"
      className="hidden items-center justify-center gap-0.5 lg:flex"
      onMouseLeave={scheduleClose}
    >
      {CATEGORIES.map((c) => {
        const isCurrent = currentCategory === c.slug;
        return (
          <Link
            key={c.slug}
            href={`/products?category=${c.slug}`}
            onMouseEnter={() => open(c.slug)}
            onFocus={() => open(c.slug)}
            onClick={() => setActive(null)}
            aria-current={isCurrent ? "page" : undefined}
            aria-expanded={active === c.slug}
            className={`relative px-3.5 py-2 text-[14px] font-semibold transition ${
              active === c.slug || isCurrent
                ? "text-[var(--cobalt)]"
                : "text-[var(--ink-2)] hover:text-[var(--ink)]"
            }`}
          >
            {CATEGORY_LABELS[c.slug]}
            {active === c.slug || isCurrent ? (
              <span className="absolute inset-x-3 bottom-0 h-0.5 bg-[var(--cobalt)]" />
            ) : null}
          </Link>
        );
      })}
      <Link
        href="/deals"
        aria-current={onDealsPage ? "page" : undefined}
        className="relative px-3.5 py-2 text-[14px] font-semibold text-[var(--coral)] hover:text-[var(--coral)]"
        onMouseEnter={() => setActive(null)}
        onFocus={() => setActive(null)}
      >
        Deals
      </Link>

      {active ? (
        <div
          onMouseEnter={() => open(active)}
          onMouseLeave={scheduleClose}
          className="absolute left-0 right-0 top-full z-40 border-t border-[var(--line)] bg-white shadow-[0_30px_60px_-30px_rgba(10,10,10,0.25)]"
        >
          <MegaPanel
            category={active}
            onClose={() => setActive(null)}
            onBrowse={browseCategory}
          />
        </div>
      ) : null}
    </nav>
  );
}

function MegaPanel({
  category,
  onClose,
  onBrowse,
}: {
  category: Category;
  onClose: () => void;
  onBrowse: (category: Category) => void;
}) {
  const products = PRODUCTS.filter((p) => p.category === category);
  const featured = products.find((p) => p.badge === "best-seller") ?? products[0];

  const meta = CATEGORIES.find((c) => c.slug === category);
  const browse = (e: MouseEvent<HTMLAnchorElement> | PointerEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onBrowse(category);
  };

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-8 py-10 lg:grid-cols-12">
      <div className="lg:col-span-3">
        <span className="eyebrow text-[var(--ink-4)]">Category</span>
        <h3 className="mt-2 text-2xl font-black tracking-[-0.02em] text-[var(--ink)]">{meta?.label}</h3>
        <p className="mt-2 text-sm text-[var(--ink-3)]">{meta?.description}</p>
        <Link
          href={`/products?category=${category}`}
          onPointerDown={browse}
          onClick={browse}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--cobalt)] hover:text-[var(--cobalt-deep)]"
        >
          Browse all {products.length} <ArrowRight size={14} />
        </Link>
      </div>

      <div className="lg:col-span-5">
        <span className="eyebrow text-[var(--ink-4)]">All in {meta?.label.toLowerCase()}</span>
        <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {products.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/products/${p.slug}`}
                onClick={onClose}
                className="group flex flex-col gap-0.5 px-2.5 py-2 transition hover:bg-[var(--paper-tint)]"
              >
                <span className="text-sm font-bold text-[var(--ink)] group-hover:text-[var(--cobalt)]">
                  {p.name}
                </span>
                <span className="text-xs text-[var(--ink-3)]">{p.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {featured ? (
        <div className="lg:col-span-4">
          <span className="eyebrow text-[var(--ink-4)]">Best seller</span>
          <Link
            href={`/products/${featured.slug}`}
            onClick={onClose}
            className="mt-3 block bg-[var(--paper-tint)] p-2 ring-1 ring-[var(--line)] transition hover:ring-[var(--ink)]"
          >
            <ProductArt product={featured} size="card" />
            <div className="flex items-end justify-between gap-3 px-2 py-3">
              <div>
                <h4 className="text-sm font-black text-[var(--ink)]">{featured.name}</h4>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-base font-black text-[var(--ink)]">{formatINR(featured.price)}</span>
                  {featured.originalPrice ? (
                    <span className="text-xs text-[var(--ink-4)] line-through">
                      {formatINR(featured.originalPrice)}
                    </span>
                  ) : null}
                </div>
              </div>
              <ArrowRight size={16} className="text-[var(--ink)]" />
            </div>
          </Link>
        </div>
      ) : null}
    </div>
  );
}

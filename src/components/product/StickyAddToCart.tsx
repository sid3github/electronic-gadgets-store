"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { ProductArt } from "@/components/ui/ProductArt";
import { formatINR } from "@/lib/products";
import type { Product } from "@/lib/types";
import { CartIcon, Check, Minus, Plus } from "@/components/ui/Icon";

/**
 * Appears at the bottom of the viewport once the user scrolls past
 * the main buy box. Includes mini product summary, qty stepper, and add-to-cart.
 */
export function StickyAddToCart({ product, sentinelId }: { product: Product; sentinelId: string }) {
  const { add, openDrawer } = useCart();
  const [visible, setVisible] = useState(false);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const el = document.getElementById(sentinelId);
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [sentinelId]);

  const onAdd = () => {
    add(product.slug, qty);
    setAdded(true);
    window.setTimeout(() => openDrawer(), 250);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const max = Math.min(product.stock, 10);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[60] border-t border-[var(--line)] bg-white/95 backdrop-blur-md shadow-[0_-12px_30px_-10px_rgba(10,10,10,0.18)] transition-transform duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="hidden h-14 w-20 shrink-0 sm:block">
            <ProductArt product={product} size="card" className="aspect-[5/3.5]" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--ink-4)]">
              {product.brand}
            </span>
            <h3 className="truncate text-sm font-bold text-[var(--ink)] sm:text-base">{product.name}</h3>
            <div className="mt-0.5 flex items-baseline gap-1.5 sm:hidden">
              <span className="text-base font-black text-[var(--ink)]">{formatINR(product.price)}</span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden flex-col items-end sm:flex">
            <span className="text-xl font-black text-[var(--ink)]">{formatINR(product.price)}</span>
            {product.originalPrice ? (
              <span className="text-[11px] text-[var(--ink-4)] line-through">
                {formatINR(product.originalPrice)}
              </span>
            ) : null}
          </div>
          <div className="hidden h-12 items-stretch border border-[var(--line-strong)] bg-white sm:inline-flex">
            <button
              type="button"
              aria-label="Decrease"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-12 w-12 items-center justify-center text-[var(--ink-2)] transition hover:bg-[var(--paper-tint)] hover:text-[var(--ink)]"
            >
              <Minus size={14} />
            </button>
            <span className="flex h-12 w-12 items-center justify-center border-x border-[var(--line)] text-sm font-bold text-[var(--ink)] tabular-nums leading-none">
              {qty}
            </span>
            <button
              type="button"
              aria-label="Increase"
              onClick={() => setQty((q) => Math.min(max, q + 1))}
              className="flex h-12 w-12 items-center justify-center text-[var(--ink-2)] transition hover:bg-[var(--paper-tint)] hover:text-[var(--ink)]"
            >
              <Plus size={14} />
            </button>
          </div>
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex h-12 cursor-pointer items-center gap-2 bg-[var(--ink)] px-5 text-sm font-bold text-white transition hover:bg-[var(--ink-2)] sm:h-14 sm:px-6"
          >
            {added ? <Check size={16} /> : <CartIcon size={16} />}
            <span>{added ? "Added" : "Add to cart"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

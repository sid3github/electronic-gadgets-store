"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { ProductArt } from "@/components/ui/ProductArt";
import { formatINR } from "@/lib/products";
import { Minus, Plus, Trash } from "@/components/ui/Icon";

export function CartLines({ readOnly = false }: { readOnly?: boolean }) {
  const { resolveLines, setQuantity, remove, hydrated } = useCart();
  if (!hydrated) {
    return <div className=" bg-white p-6 text-sm text-[var(--ink-3)] ring-1 ring-[var(--line)]">Loading cart…</div>;
  }
  const lines = resolveLines();
  if (lines.length === 0) {
    return (
      <div className=" border border-dashed border-[var(--line-strong)] bg-white p-12 text-center">
        <h3 className="text-2xl font-bold text-[var(--ink)]">Your cart is empty.</h3>
        <p className="mt-2 text-sm text-[var(--ink-3)]">Add a tablet, a laptop or a kiosk to get started.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex h-12 items-center bg-[var(--ink)] px-6 text-sm font-semibold text-white"
        >
          Browse the catalogue
        </Link>
      </div>
    );
  }
  return (
    <ul className="flex flex-col gap-3">
      {lines.map(({ product, quantity, lineTotal }) => (
        <li
          key={product.slug}
          className="grid grid-cols-[88px_1fr] items-center gap-4 bg-white p-3 ring-1 ring-[var(--line)] sm:grid-cols-[120px_1fr_auto] sm:p-4"
        >
          <Link href={`/products/${product.slug}`} className="block sm:w-[120px]">
            <ProductArt product={product} size="card" className="aspect-[3/2]" />
          </Link>
          <div className="flex flex-col gap-1">
            <span className=" bg-[var(--paper-tint)] self-start px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--ink-2)]">{product.brand}</span>
            <Link href={`/products/${product.slug}`} className="text-sm font-bold leading-snug text-[var(--ink)] hover:text-[var(--cobalt)] sm:text-base">
              {product.name}
            </Link>
            <span className="text-xs text-[var(--ink-3)]">{product.tagline}</span>
            <div className="mt-2 flex items-center gap-3 text-xs text-[var(--ink-3)]">
              <span className="font-semibold text-[var(--ink)]">{formatINR(product.price)}</span>
              <span>×</span>
              <span>{quantity}</span>
            </div>
          </div>
          <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:flex-col sm:items-end">
            <span className="text-base font-bold text-[var(--ink)] sm:text-lg">{formatINR(lineTotal)}</span>
            {!readOnly ? (
              <div className="flex items-center gap-2">
                <div className="inline-flex h-10 items-stretch border border-[var(--line-strong)] bg-white">
                  <button
                    aria-label={`Decrease ${product.name} quantity`}
                    onClick={() => setQuantity(product.slug, quantity - 1)}
                    className="flex h-10 w-10 items-center justify-center text-[var(--ink-2)] transition hover:bg-[var(--paper-tint)] hover:text-[var(--ink)]"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="flex h-10 w-10 items-center justify-center border-x border-[var(--line)] text-sm font-bold text-[var(--ink)] tabular-nums leading-none">
                    {quantity}
                  </span>
                  <button
                    aria-label={`Increase ${product.name} quantity`}
                    onClick={() => setQuantity(product.slug, Math.min(product.stock, quantity + 1))}
                    className="flex h-10 w-10 items-center justify-center text-[var(--ink-2)] transition hover:bg-[var(--paper-tint)] hover:text-[var(--ink)]"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  aria-label={`Remove ${product.name}`}
                  onClick={() => remove(product.slug)}
                  className="flex h-10 w-10 items-center justify-center border border-[var(--coral-soft)] bg-[var(--coral-soft)] text-[var(--coral)] transition hover:bg-[var(--coral)] hover:text-white"
                >
                  <Trash size={14} />
                </button>
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

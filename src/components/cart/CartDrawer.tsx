"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { ProductArt } from "@/components/ui/ProductArt";
import { formatINR } from "@/lib/products";
import { ArrowRight, CartIcon, Minus, Plus, Shield, Trash, X } from "@/components/ui/Icon";

const SHIPPING_FREE_OVER = 25000;
const FLAT_SHIPPING = 499;

export function CartDrawer() {
  const { drawerOpen, closeDrawer, resolveLines, setQuantity, remove, subtotal, count, hydrated } = useCart();

  // ESC to close
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, closeDrawer]);

  // Lock body scroll when open
  useEffect(() => {
    if (!drawerOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [drawerOpen]);

  const lines = hydrated ? resolveLines() : [];
  const shipping = subtotal === 0 || subtotal >= SHIPPING_FREE_OVER ? 0 : FLAT_SHIPPING;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + gst;
  const freeShipPct = Math.min(100, Math.round((subtotal / SHIPPING_FREE_OVER) * 100));
  const remainingForFree = Math.max(0, SHIPPING_FREE_OVER - subtotal);

  return (
    <div
      className={`fixed inset-0 z-[90] transition-opacity duration-300 ${
        drawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!drawerOpen}
    >
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className={`absolute inset-0 cursor-pointer bg-[var(--ink)]/40 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[var(--paper)] shadow-[-30px_0_60px_-20px_rgba(10,10,10,0.3)] transition-transform duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[var(--line)] bg-white px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center bg-[var(--ink)] text-white">
              <CartIcon size={16} />
            </span>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-[var(--ink)]">Your cart</h2>
              <p className="text-xs text-[var(--ink-3)]">
                {count} item{count === 1 ? "" : "s"}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeDrawer}
            className="inline-flex h-10 w-10 items-center justify-center bg-white text-[var(--ink)] ring-1 ring-[var(--line)] transition hover:bg-[var(--paper-tint)]"
          >
            <X size={18} />
          </button>
        </header>

        {/* Free-shipping bar */}
        {hydrated && count > 0 ? (
          <div className="border-b border-[var(--line)] bg-[var(--paper-tint)] px-6 py-4">
            <p className="text-xs font-semibold text-[var(--ink-2)]">
              {shipping === 0 ? (
                <>🎉 You unlocked <span className="text-[#1a7f4f]">free shipping</span></>
              ) : (
                <>Add <span className="font-bold text-[var(--cobalt)]">{formatINR(remainingForFree)}</span> for free shipping</>
              )}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden bg-white">
              <div
                className="h-full bg-[var(--volt-lime)] transition-all duration-500"
                style={{ width: `${freeShipPct}%` }}
              />
            </div>
          </div>
        ) : null}

        {/* Body — lines */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {!hydrated ? (
            <p className="px-2 text-sm text-[var(--ink-3)]">Loading…</p>
          ) : lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 px-6 py-16 text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center bg-[var(--paper-tint)] text-[var(--ink-3)]">
                <CartIcon size={28} />
              </span>
              <h3 className="text-xl font-bold tracking-tight text-[var(--ink)]">Cart is empty</h3>
              <p className="max-w-xs text-sm text-[var(--ink-3)]">
                Add a tablet, laptop or kiosk to get started.
              </p>
              <Link
                href="/products"
                onClick={closeDrawer}
                className="mt-2 inline-flex h-12 items-center bg-[var(--ink)] px-6 text-sm font-semibold text-white"
              >
                Browse the catalogue
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {lines.map(({ product, quantity, lineTotal }) => (
                <li
                  key={product.slug}
                  className="grid grid-cols-[80px_1fr] gap-3 bg-white p-3 ring-1 ring-[var(--line)]"
                >
                  <Link href={`/products/${product.slug}`} onClick={closeDrawer} className="block">
                    <ProductArt product={product} size="card" className="aspect-square" />
                  </Link>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        onClick={closeDrawer}
                        className="text-sm font-bold leading-tight text-[var(--ink)] hover:text-[var(--cobalt)]"
                      >
                        {product.name}
                      </Link>
                      <button
                        aria-label={`Remove ${product.name}`}
                        onClick={() => remove(product.slug)}
                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center text-[var(--ink-4)] transition hover:bg-[var(--coral-soft)] hover:text-[var(--coral)]"
                      >
                        <Trash size={13} />
                      </button>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--ink-4)]">
                      {product.brand}
                    </span>
                    <div className="mt-auto flex items-center justify-between pt-1.5">
                      <div className="inline-flex h-9 items-stretch bg-[var(--paper-tint)] ring-1 ring-[var(--line)]">
                        <button
                          aria-label={`Decrease ${product.name}`}
                          onClick={() => setQuantity(product.slug, quantity - 1)}
                          className="flex h-9 w-9 items-center justify-center text-[var(--ink-2)] transition hover:bg-[var(--ink)] hover:text-white"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="flex h-9 w-9 items-center justify-center text-sm font-bold text-[var(--ink)] tabular-nums leading-none">
                          {quantity}
                        </span>
                        <button
                          aria-label={`Increase ${product.name}`}
                          onClick={() => setQuantity(product.slug, Math.min(product.stock, quantity + 1))}
                          className="flex h-9 w-9 items-center justify-center text-[var(--ink-2)] transition hover:bg-[var(--ink)] hover:text-white"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-sm font-black text-[var(--ink)]">{formatINR(lineTotal)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — totals + CTA */}
        {hydrated && lines.length > 0 ? (
          <footer className="border-t border-[var(--line)] bg-white px-6 py-5">
            <dl className="space-y-1.5 text-sm">
              <div className="flex items-center justify-between text-[var(--ink-3)]">
                <dt>Subtotal</dt>
                <dd className="font-semibold text-[var(--ink)]">{formatINR(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between text-[var(--ink-3)]">
                <dt>GST (18%)</dt>
                <dd className="font-semibold text-[var(--ink)]">{formatINR(gst)}</dd>
              </div>
              <div className="flex items-center justify-between text-[var(--ink-3)]">
                <dt>Shipping</dt>
                <dd className={shipping === 0 ? "font-semibold text-[#1a7f4f]" : "font-semibold text-[var(--ink)]"}>
                  {shipping === 0 ? "Free" : formatINR(shipping)}
                </dd>
              </div>
            </dl>
            <div className="my-3 h-px bg-[var(--line)]" />
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-bold text-[var(--ink)]">Total</span>
              <span className="text-2xl font-black tracking-[-0.02em] text-[var(--ink)]">{formatINR(total)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="mt-4 inline-flex h-13 w-full items-center justify-center gap-2 bg-[var(--ink)] text-sm font-bold text-white transition hover:bg-[var(--ink-2)]"
            >
              Continue to checkout <ArrowRight size={16} />
            </Link>
            <button
              type="button"
              onClick={closeDrawer}
              className="mt-2 inline-flex h-10 w-full items-center justify-center text-xs font-semibold text-[var(--ink-3)] hover:text-[var(--ink)]"
            >
              Continue shopping
            </button>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-[var(--ink-4)]">
              <Shield size={12} className="text-[var(--cobalt)]" />
              <span>24-month warranty included on every purchase</span>
            </div>
          </footer>
        ) : null}
      </aside>
    </div>
  );
}

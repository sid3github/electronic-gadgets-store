"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatINR } from "@/lib/products";
import { ArrowRight, Shield } from "@/components/ui/Icon";

const SHIPPING_FREE_OVER = 25000;
const FLAT_SHIPPING = 499;

export function CartSummary({
  ctaHref = "/checkout",
  ctaLabel = "Proceed to checkout",
  hideCta = false,
}: {
  ctaHref?: string;
  ctaLabel?: string;
  hideCta?: boolean;
}) {
  const { subtotal, count, hydrated } = useCart();
  const shipping = subtotal === 0 || subtotal >= SHIPPING_FREE_OVER ? 0 : FLAT_SHIPPING;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + gst;

  // free-shipping progress
  const freeShipPct = Math.min(100, Math.round((subtotal / SHIPPING_FREE_OVER) * 100));
  const remainingForFree = Math.max(0, SHIPPING_FREE_OVER - subtotal);

  if (!hydrated) {
    return <div className="surface-card p-6 text-sm text-[var(--ink-3)]">Loading order summary…</div>;
  }

  return (
    <div className="surface-card sticky top-32 flex flex-col gap-5 p-6">
      <div className="flex items-center justify-between">
        <h3 className="eyebrow text-[var(--ink-3)]">Order summary</h3>
        <span className="font-mono text-xs text-[var(--ink-4)]">{count} item{count === 1 ? "" : "s"}</span>
      </div>

      {/* free-shipping bar */}
      {count > 0 ? (
        <div className="flex flex-col gap-2 bg-[var(--paper-tint)] p-3">
          <p className="text-xs font-semibold text-[var(--ink-2)]">
            {shipping === 0 ? (
              <>🎉 You unlocked <span className="text-[#1a7f4f]">free shipping</span></>
            ) : (
              <>Add <span className="text-[var(--cobalt)] font-bold">{formatINR(remainingForFree)}</span> for free shipping</>
            )}
          </p>
          <div className="h-1.5 overflow-hidden bg-white">
            <div
              className="h-full bg-[var(--volt-lime)] transition-all"
              style={{ width: `${freeShipPct}%` }}
            />
          </div>
        </div>
      ) : null}

      <dl className="space-y-2.5 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-[var(--ink-3)]">Subtotal</dt>
          <dd className="text-[var(--ink)] font-semibold">{formatINR(subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-[var(--ink-3)]">GST (18%)</dt>
          <dd className="text-[var(--ink)] font-semibold">{formatINR(gst)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-[var(--ink-3)]">Shipping</dt>
          <dd className={shipping === 0 ? "text-[#1a7f4f] font-semibold" : "text-[var(--ink)] font-semibold"}>
            {shipping === 0 ? "Free" : formatINR(shipping)}
          </dd>
        </div>
      </dl>
      <div className="my-1 h-px bg-[var(--line)]" />
      <div className="flex items-baseline justify-between text-base">
        <span className="font-bold text-[var(--ink)]">Total</span>
        <span className="text-2xl font-black text-[var(--ink)]">{formatINR(total)}</span>
      </div>
      {!hideCta ? (
        <Link
          href={count > 0 ? ctaHref : "/products"}
          aria-disabled={count === 0}
          className={`inline-flex h-13 items-center justify-center gap-2 text-sm font-semibold transition ${
            count === 0
              ? "pointer-events-none bg-[var(--paper-tint)] text-[var(--ink-4)]"
              : "bg-[var(--ink)] text-white hover:bg-[var(--ink-2)]"
          }`}
        >
          {count === 0 ? "Add items first" : ctaLabel}
          {count > 0 ? <ArrowRight size={16} /> : null}
        </Link>
      ) : null}
      <div className="flex items-start gap-2 text-xs text-[var(--ink-4)]">
        <Shield size={14} className="mt-0.5 text-[var(--cobalt)]" />
        <span>Direct-from-brand purchase. 24-month warranty included on all hardware.</span>
      </div>
    </div>
  );
}

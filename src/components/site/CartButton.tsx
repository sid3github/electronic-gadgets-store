"use client";

import { useCart } from "@/lib/cart-context";
import { CartIcon } from "@/components/ui/Icon";

export function CartButton() {
  const { count, hydrated, openDrawer } = useCart();
  const showCount = hydrated && count > 0;

  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={`Cart — ${count} item${count === 1 ? "" : "s"}`}
      className="group relative inline-flex h-11 items-center gap-2 bg-[var(--ink)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--ink-2)]"
    >
      <CartIcon size={16} />
      <span className="hidden sm:inline">Cart</span>
      <span
        aria-hidden
        className={`inline-flex h-6 min-w-[24px] items-center justify-center px-1.5 text-[11px] font-bold transition ${
          showCount ? "bg-[var(--volt-lime)] text-[var(--ink)]" : "bg-white/15 text-white"
        }`}
      >
        {showCount ? (count > 99 ? "99+" : count) : "0"}
      </span>
    </button>
  );
}

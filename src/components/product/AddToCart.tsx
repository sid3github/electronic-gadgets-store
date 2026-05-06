"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/Button";
import { Check, Minus, Plus, CartIcon } from "@/components/ui/Icon";

export function AddToCart({ slug, stock }: { slug: string; stock: number }) {
  const { add, openDrawer } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const max = Math.min(stock, 10);

  const onAdd = () => {
    add(slug, qty);
    setAdded(true);
    // small delay so the user sees the button confirm, then drawer slides in
    window.setTimeout(() => openDrawer(), 250);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
      <div className="inline-flex h-14 items-stretch border border-[var(--line-strong)] bg-white">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="flex h-14 w-14 items-center justify-center text-[var(--ink-2)] transition hover:bg-[var(--paper-tint)] hover:text-[var(--ink)]"
        >
          <Minus size={16} />
        </button>
        <span className="flex h-14 w-14 items-center justify-center border-x border-[var(--line)] text-base font-bold text-[var(--ink)] tabular-nums leading-none">
          {qty}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => setQty((q) => Math.min(max, q + 1))}
          className="flex h-14 w-14 items-center justify-center text-[var(--ink-2)] transition hover:bg-[var(--paper-tint)] hover:text-[var(--ink)]"
        >
          <Plus size={16} />
        </button>
      </div>
      <Button
        onClick={onAdd}
        size="lg"
        variant="ink"
        leadingIcon={added ? <Check /> : <CartIcon />}
        className="flex-1"
        aria-live="polite"
      >
        {added ? "Added to cart" : `Add ${qty} to cart`}
      </Button>
    </div>
  );
}

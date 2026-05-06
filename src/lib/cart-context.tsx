"use client";

import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS } from "./products";
import type { CartItem, Product } from "./types";

const STORAGE_KEY = "egs-cart-v1";

type CartContextValue = {
  items: CartItem[];
  hydrated: boolean;
  count: number;
  subtotal: number;
  add: (slug: string, quantity?: number) => void;
  remove: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  resolveLines: () => Array<{ product: Product; quantity: number; lineTotal: number }>;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed.filter((i) => i?.slug && i.quantity > 0));
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const add = useCallback((slug: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug);
      if (existing) {
        return prev.map((i) => (i.slug === slug ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { slug, quantity }];
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((i) => i.slug !== slug);
      return prev.map((i) => (i.slug === slug ? { ...i, quantity } : i));
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const { count, subtotal } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const item of items) {
      const product = PRODUCTS.find((p) => p.slug === item.slug);
      if (!product) continue;
      count += item.quantity;
      subtotal += product.price * item.quantity;
    }
    return { count, subtotal };
  }, [items]);

  const resolveLines = useCallback(() => {
    return items
      .map((item) => {
        const product = PRODUCTS.find((p) => p.slug === item.slug);
        if (!product) return null;
        return { product, quantity: item.quantity, lineTotal: product.price * item.quantity };
      })
      .filter((x): x is { product: Product; quantity: number; lineTotal: number } => x !== null);
  }, [items]);

  const value: CartContextValue = {
    items,
    hydrated,
    count,
    subtotal,
    add,
    remove,
    setQuantity,
    clear,
    resolveLines,
    drawerOpen,
    openDrawer,
    closeDrawer,
  };

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const ctx = use(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

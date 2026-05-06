import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatINR } from "@/lib/products";
import { Badge } from "@/components/ui/Badge";
import { ProductArt } from "@/components/ui/ProductArt";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { Rating } from "./Rating";
import { ArrowRight } from "@/components/ui/Icon";

const BADGE_TONE = {
  new: "mint",
  "best-seller": "lime",
  deal: "coral",
  limited: "lavender",
} as const;

export function ProductCard({ product, tilt = false }: { product: Product; tilt?: boolean }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const card = (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex h-full flex-col overflow-hidden bg-white p-3 ring-1 ring-[var(--line)] transition-shadow duration-300 hover:ring-[var(--ink)]/30 hover:shadow-[0_40px_60px_-30px_rgba(10,10,10,0.3)]"
    >
      <div className="relative">
        <ProductArt product={product} size="card" />
        <div className="depth-near absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.badge ? (
            <Badge tone={BADGE_TONE[product.badge]} size="sm">{product.badge.replace("-", " ")}</Badge>
          ) : null}
          {discount > 0 ? <Badge tone="ink" size="sm">-{discount}%</Badge> : null}
        </div>
      </div>
      <div className="depth-mid flex flex-1 flex-col gap-2 p-3 pt-4">
        <div className="flex items-center justify-between gap-2">
          <span className="bg-[var(--paper-tint)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--ink-2)]">
            {product.brand}
          </span>
          <Rating value={product.rating} count={product.reviewCount} size={11} />
        </div>
        <h3 className="text-base font-bold leading-snug tracking-tight text-[var(--ink)]">
          {product.name}
        </h3>
        <p className="line-clamp-2 min-h-[2.6em] text-sm leading-[1.3] text-[var(--ink-3)]">
          {product.tagline}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[var(--ink)]">{formatINR(product.price)}</span>
            {product.originalPrice ? (
              <span className="text-xs text-[var(--ink-4)] line-through">{formatINR(product.originalPrice)}</span>
            ) : null}
          </div>
          <span className="inline-flex h-10 w-10 items-center justify-center bg-[var(--paper-tint)] text-[var(--ink)] transition-colors group-hover:bg-[var(--ink)] group-hover:text-white">
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );

  if (tilt) {
    return (
      <Tilt3D max={2} scale={1.003} className="h-full">
        {card}
      </Tilt3D>
    );
  }
  return card;
}

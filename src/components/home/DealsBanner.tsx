import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Tag } from "@/components/ui/Icon";
import { ACTIVE_DEALS, formatINR, getProduct } from "@/lib/products";
import { ProductArt } from "@/components/ui/ProductArt";
import { Tilt3D } from "@/components/ui/Tilt3D";

export function DealsBanner() {
  const productDeal = ACTIVE_DEALS.find((d) => d.scope === "product");
  const product = productDeal?.scopeValue ? getProduct(productDeal.scopeValue) : undefined;

  return (
    <section className="py-20 sm:py-28">
      <Container size="wide">
        <div className="relative overflow-hidden bg-[var(--volt-lime)] p-8 sm:p-14 md:p-20">
          <div className="absolute -right-10 -top-10 h-48 w-48 bg-[var(--ink)] opacity-90" />
          <div className="absolute -left-12 bottom-12 h-32 w-32 bg-[var(--coral)] opacity-80" />

          <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-5">
              <Badge tone="ink" withDot className="self-start">Live deals</Badge>
              <h2 className="text-balance text-[clamp(2.25rem,5vw+0.5rem,4.5rem)] font-black leading-[0.92] tracking-[-0.04em] text-[var(--ink)]">
                Time-bound{" "}
                <span className="font-display italic font-normal">offers,</span>{" "}
                <span className="block">no coupon stacking.</span>
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-[var(--ink-2)]">
                Volume rebates for schools, flash deals on creator hardware, and bundle pricing on accessories. The price you see is the price you pay.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button href="/deals" variant="ink" size="lg" leadingIcon={<Tag />}>
                  See all deals
                </Button>
                <Button href="/products?category=peripherals" variant="secondary" size="lg" trailingIcon={<ArrowRight />}>
                  Shop the bundle
                </Button>
              </div>
              {/* mini deal chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {ACTIVE_DEALS.slice(0, 3).map((d) => (
                  <span key={d.id} className="chip border-[var(--ink)]/20 bg-white/80 text-[var(--ink)]">
                    <Tag size={10} /> {d.code ?? `${d.discountPct}% off`}
                  </span>
                ))}
              </div>
            </div>

            {product && productDeal ? (
              <Tilt3D max={10} scale={1.02}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group relative block bg-[var(--paper)] p-3 ring-1 ring-[var(--ink)]/15 transition-shadow hover:shadow-[0_50px_80px_-30px_rgba(10,10,10,0.4)]"
                >
                  <div className="relative">
                    <ProductArt product={product} size="feature" />
                    <span className="depth-near absolute right-4 top-4 inline-flex h-8 items-center bg-[var(--coral)] px-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                      Ends {productDeal.endsAt}
                    </span>
                  </div>
                  <div className="depth-mid flex items-end justify-between gap-3 px-5 py-5">
                    <div>
                      <span className="eyebrow text-[var(--ink-3)]">{product.brand}</span>
                      <h3 className="mt-1 text-[20px] font-black leading-tight tracking-[-0.02em] text-[var(--ink)]">{product.name}</h3>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-2xl font-black tracking-[-0.02em] text-[var(--coral)]">{formatINR(product.price)}</span>
                        {product.originalPrice ? (
                          <span className="text-sm text-[var(--ink-4)] line-through">{formatINR(product.originalPrice)}</span>
                        ) : null}
                      </div>
                    </div>
                    <Badge tone="coral" size="md">{productDeal.discountPct}% off</Badge>
                  </div>
                </Link>
              </Tilt3D>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

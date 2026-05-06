import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/product/ProductCard";
import { ACTIVE_DEALS, getDealProducts, getProduct } from "@/lib/products";
import { ArrowRight, Bolt, Tag } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Deals & offers",
  description: "Time-bound offers, bulk-procurement rebates and bundle pricing — direct from EGS.",
};

const DEAL_BG = ["var(--volt-lime)", "var(--peach)", "var(--mint)"];

function daysLeft(endsAt: string): number {
  const end = new Date(endsAt).getTime();
  const now = Date.now();
  return Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));
}

export default function DealsPage() {
  const dealProducts = getDealProducts();

  return (
    <>
      <section className="relative py-20 sm:py-28">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Badge tone="coral" withDot className="mb-5">Live offers</Badge>
              <h1 className="display-1 text-balance">
                Time-bound deals.{" "}
                <span className="highlight-lime">No coupon stacking.</span>
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-pretty text-lg leading-relaxed text-[var(--ink-3)]">
                Our deals are simple. The price you see is the price you pay. No "scratch to reveal", no marked-up MRP gymnastics, no inventory tricks. Most offers are time-bound — once they're gone, they're gone.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container size="wide">
          <h2 className="display-3">Active offers</h2>
          <p className="mt-2 text-[var(--ink-3)]">Codes are auto-applied at checkout where applicable.</p>
          <ul className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {ACTIVE_DEALS.map((deal, i) => {
              const days = daysLeft(deal.endsAt);
              const product = deal.scope === "product" && deal.scopeValue ? getProduct(deal.scopeValue) : null;
              return (
                <li
                  key={deal.id}
                  className="relative flex flex-col gap-4 overflow-hidden p-7 ring-1 ring-[var(--ink)]/10"
                  style={{ background: DEAL_BG[i % DEAL_BG.length] }}
                >
                  <div className="flex items-center justify-between">
                    <Badge tone="ink"><Tag size={10} className="mr-1" /> -{deal.discountPct}%</Badge>
                    <span className="font-mono text-xs font-bold text-[var(--ink-2)]">
                      {days > 0 ? `${days} days left` : "Ends today"}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-[var(--ink)]">{deal.title}</h3>
                  <p className="text-sm text-[var(--ink-2)]">{deal.subtitle}</p>
                  {deal.code ? (
                    <div className="mt-2 inline-flex w-fit items-center gap-2 border-2 border-dashed border-[var(--ink)] bg-white/40 px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--ink)]">
                      <Bolt size={12} /> {deal.code}
                    </div>
                  ) : null}
                  <div className="mt-auto pt-2">
                    {product ? (
                      <Link href={`/products/${product.slug}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--ink)]">
                        Shop {product.name} <ArrowRight size={14} />
                      </Link>
                    ) : deal.scope === "category" && deal.scopeValue ? (
                      <Link href={`/products?category=${deal.scopeValue}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--ink)]">
                        Browse {deal.scopeValue} <ArrowRight size={14} />
                      </Link>
                    ) : (
                      <Link href="/products" className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--ink)]">
                        Browse catalogue <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {dealProducts.length ? (
        <section className="py-20 sm:py-24">
          <Container size="wide">
            <h2 className="display-3">Discounted SKUs</h2>
            <p className="mt-2 text-[var(--ink-3)]">Products with a live cut on direct price.</p>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {dealProducts.map((p) => (
                <ProductCard key={p.slug} product={p} tilt />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-20 sm:py-24">
        <Container size="wide">
          <div className=" bg-[var(--cobalt)] p-10 text-center ring-1 ring-[var(--ink)]/10 md:p-14">
            <Badge tone="lime" className="mb-4">Partner network</Badge>
            <h2 className="display-2 mx-auto max-w-2xl text-balance text-white">
              Need a different SKU? Our partner network covers what we don't.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              For specialty hardware we don't carry — printers, projectors, scanning solutions — we maintain referral links to vetted partner platforms. Same warranty principles apply.
            </p>
            <Link href="/contact#partner" className="mt-6 inline-flex h-12 items-center gap-2 bg-[var(--volt-lime)] px-6 text-sm font-bold text-[var(--ink)]">
              Ask about partner referrals <ArrowRight size={14} />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

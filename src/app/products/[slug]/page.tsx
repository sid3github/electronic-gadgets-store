import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/product/Rating";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AddToCart } from "@/components/product/AddToCart";
import { StickyAddToCart } from "@/components/product/StickyAddToCart";
import { ProductFAQ } from "@/components/product/ProductFAQ";
import { CompleteSetup } from "@/components/product/CompleteSetup";
import { CATEGORIES, PRODUCTS, formatINR, getProduct } from "@/lib/products";
import { Award, Bolt, Check, Refresh, Shield, Truck } from "@/components/ui/Icon";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.tagline,
    openGraph: { title: product.name, description: product.tagline },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = CATEGORIES.find((c) => c.slug === product.category);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const related = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);

  const trustItems = [
    { icon: Shield, label: `${product.warrantyMonths}-month warranty included` },
    { icon: Refresh, label: "Free replacement on technical defects" },
    { icon: Truck, label: "Ships in 48 hours from Mumbai" },
    { icon: Award, label: "Direct-from-brand. No reseller layers." },
  ];

  return (
    <>
      <section className="py-12 sm:py-16">
        <Container size="wide">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[var(--ink-3)]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-[var(--ink)]">Home</Link></li>
              <li className="text-[var(--ink-4)]">/</li>
              <li><Link href="/products" className="hover:text-[var(--ink)]">Catalogue</Link></li>
              <li className="text-[var(--ink-4)]">/</li>
              <li>
                <Link href={`/products?category=${product.category}`} className="hover:text-[var(--ink)]">
                  {category?.label}
                </Link>
              </li>
              <li className="text-[var(--ink-4)]">/</li>
              <li className="text-[var(--ink)] font-semibold">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Gallery */}
            <ProductGallery product={product} />

            {/* Info */}
            <div className="flex flex-col gap-6 lg:pl-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="soft">{category?.label}</Badge>
                {product.badge ? <Badge tone={product.badge === "deal" ? "coral" : product.badge === "new" ? "mint" : "lime"}>{product.badge.replace("-", " ")}</Badge> : null}
                {discount > 0 ? <Badge tone="ink">-{discount}% direct</Badge> : null}
              </div>
              <div>
                <p className="eyebrow text-[var(--ink-3)]">{product.brand}</p>
                <h1 className="display-2 mt-2 text-balance text-[var(--ink)]">{product.name}</h1>
                <p className="mt-3 text-lg text-[var(--ink-3)]">{product.tagline}</p>
              </div>

              <Rating value={product.rating} count={product.reviewCount} size={16} />

              <div className=" bg-white p-6 ring-1 ring-[var(--line)]">
                <div className="flex items-end gap-4">
                  <span className="text-4xl font-black tracking-tight text-[var(--ink)]">{formatINR(product.price)}</span>
                  {product.originalPrice ? (
                    <span className="pb-1 text-base text-[var(--ink-4)] line-through">{formatINR(product.originalPrice)}</span>
                  ) : null}
                  {discount > 0 ? (
                    <span className="pb-1 text-sm font-bold text-[var(--coral)]">Save {formatINR((product.originalPrice ?? 0) - product.price)}</span>
                  ) : null}
                </div>

                <p className="mt-3 text-sm text-[var(--ink-3)]">
                  Inclusive of GST · Free shipping ≥ ₹25,000
                  {product.stock < 20 ? (
                    <>
                      {" · "}
                      <span className="font-semibold text-[var(--coral)]">Only {product.stock} left at this price</span>
                    </>
                  ) : (
                    <>{" · "}<span className="font-semibold text-[#1a7f4f]">In stock</span></>
                  )}
                </p>

                <div className="mt-5">
                  <AddToCart slug={product.slug} stock={product.stock} />
                </div>

                <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {trustItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.label} className="flex items-center gap-2 bg-[var(--paper-tint)] px-3 py-2.5">
                        <Icon size={14} className="text-[var(--cobalt)]" />
                        <span className="text-xs font-medium text-[var(--ink-2)]">{item.label}</span>
                      </li>
                    );
                  })}
                </ul>
                {/* Sentinel for sticky CTA — appears once this scrolls past viewport top */}
                <div id="buy-box-sentinel" className="h-px w-full" aria-hidden />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8 flex flex-col gap-12">
              <div>
                <h2 className="display-3">Why this gadget</h2>
                <p className="mt-3 text-base leading-relaxed text-[var(--ink-3)]">{product.description}</p>
              </div>

              <div>
                <h3 className="eyebrow text-[var(--ink-3)]">Highlights</h3>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {product.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 bg-white p-4 ring-1 ring-[var(--line)]">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center bg-[var(--volt-lime)] text-[var(--ink)]">
                        <Check size={12} />
                      </span>
                      <span className="text-sm font-medium text-[var(--ink-2)]">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="eyebrow text-[var(--ink-3)]">Specifications</h3>
                <dl className="mt-4 overflow-hidden ring-1 ring-[var(--line)]">
                  {product.specs.map((spec, idx) => (
                    <div
                      key={spec.label}
                      className={`grid grid-cols-1 sm:grid-cols-3 ${idx % 2 === 0 ? "bg-white" : "bg-[var(--paper-tint)]"}`}
                    >
                      <dt className="px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--ink-3)]">{spec.label}</dt>
                      <dd className="col-span-2 px-5 py-3.5 text-sm text-[var(--ink)]">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="surface-card sticky top-32 flex flex-col gap-4 p-6">
                <div className="inline-flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 bg-[var(--volt-lime)]" />
                  <span className="eyebrow text-[var(--ink-3)]">Trust signals</span>
                </div>
                <ul className="space-y-3 text-sm text-[var(--ink-2)]">
                  {product.trustBadges.map((badge) => (
                    <li key={badge} className="flex items-start gap-2">
                      <Shield size={16} className="mt-0.5 text-[var(--cobalt)]" />
                      {badge}
                    </li>
                  ))}
                </ul>
                <div className="my-2 h-px bg-[var(--line)]" />
                <div className="text-sm text-[var(--ink-3)]">
                  Need 10+ units? Talk to procurement for volume pricing and pre-imaged delivery.
                </div>
                <Button href="/contact#bulk" variant="lime" leadingIcon={<Bolt />}>
                  Request bulk quote
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24">
        <Container size="wide">
          <ProductFAQ product={product} />
        </Container>
      </section>

      {/* Complete-the-setup — companion accessories */}
      <CompleteSetup product={product} />

      {/* Related — other in same category */}
      {related.length ? (
        <section className="py-20 sm:py-24">
          <Container size="wide">
            <span className="eyebrow text-[var(--ink-3)]">More in {category?.label.toLowerCase()}</span>
            <h2 className="mt-3 text-balance text-[clamp(1.75rem,3vw+0.5rem,2.75rem)] font-black leading-[0.95] tracking-[-0.02em] text-[var(--ink)]">
              You might also <span className="font-display italic font-normal text-[var(--cobalt)]">like.</span>
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} tilt />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Sticky add-to-cart bar — appears when buy-box-sentinel scrolls past top */}
      <StickyAddToCart product={product} sentinelId="buy-box-sentinel" />
    </>
  );
}

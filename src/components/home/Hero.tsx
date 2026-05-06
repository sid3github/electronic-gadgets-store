import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Bolt, Shield, Star, Truck } from "@/components/ui/Icon";
import { ProductArt } from "@/components/ui/ProductArt";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { formatINR, getProduct } from "@/lib/products";

export function Hero() {
  const featured = getProduct("apex-slate-pro-12")!;
  const discount = featured.originalPrice
    ? Math.round(((featured.originalPrice - featured.price) / featured.originalPrice) * 100)
    : 0;

  return (
    <section className="relative pt-12 pb-24 sm:pt-20 sm:pb-32">
      <Container size="wide">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: copy */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="inline-flex items-center gap-2.5 self-start">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping bg-[var(--volt-lime)] opacity-75" />
                <span className="relative h-2 w-2 bg-[var(--volt-lime)]" />
              </span>
              <span className="eyebrow text-[var(--ink-3)]">Now shipping · Mumbai</span>
            </div>
            <h1 className="text-balance text-[clamp(2.75rem,6.5vw+0.5rem,5.5rem)] font-black leading-[0.92] tracking-[-0.04em] text-[var(--ink)]">
              Future-ready{" "}
              <span className="font-display italic font-normal text-[var(--cobalt)]">gadgets,</span>
              <br />
              priced for{" "}
              <span className="relative inline-block">
                <span className="relative z-10">India.</span>
                <span aria-hidden className="absolute bottom-1 left-0 right-0 h-3 bg-[var(--volt-lime)] -z-0" />
              </span>
            </h1>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-[var(--ink-3)] sm:text-xl">
              Tablets, laptops, smartboards and kiosks — direct from EGS at <span className="font-bold text-[var(--ink)]">30–45% below market</span>, with a 24-month warranty and a real human at every step.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button href="/products" variant="ink" size="lg" trailingIcon={<ArrowRight />}>
                Shop the catalogue
              </Button>
              <Button href="/deals" variant="lime" size="lg" leadingIcon={<Bolt />}>
                See live deals
              </Button>
            </div>
            {/* trust strip */}
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
              {[
                { icon: Shield, label: "24-mo warranty" },
                { icon: Truck, label: "Free ship ₹25K+" },
                { icon: Bolt, label: "48h dispatch" },
                { icon: Star, label: "4.8★ avg" },
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.label} className="flex items-center gap-2 text-[13px] font-semibold text-[var(--ink-2)]">
                    <Icon size={14} className="text-[var(--cobalt)]" />
                    <span>{t.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: 3D product showcase */}
          <div className="lg:col-span-6 relative">
            {/* Side stat panel — moved to top-right so it never collides with the price */}
            <div className="pointer-events-none absolute -right-3 -top-6 z-10 hidden flex-col gap-1 bg-[var(--volt-lime)] px-5 py-4 shadow-[0_12px_30px_-10px_rgba(10,10,10,0.25)] sm:-right-6 sm:-top-8 md:flex">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--ink-2)]">
                Stylus included
              </span>
              <span className="text-2xl font-black leading-none tracking-[-0.02em] text-[var(--ink)]">
                Free.
              </span>
            </div>
            <Tilt3D max={11} scale={1.02} className="block">
              <Link
                href={`/products/${featured.slug}`}
                className="relative block bg-white shadow-[0_50px_80px_-30px_rgba(10,10,10,0.32),0_20px_40px_-20px_rgba(232,90,31,0.18)] ring-1 ring-[var(--line)] transition-shadow hover:shadow-[0_60px_100px_-30px_rgba(10,10,10,0.42),0_30px_60px_-20px_rgba(232,90,31,0.24)]"
              >
                {/* Image area with parallax depth on inner art */}
                <div className="relative">
                  <ProductArt product={featured} size="hero" />
                  {/* Floating badges that pop forward in 3D */}
                  <div className="depth-near absolute left-6 top-6 flex flex-col items-start gap-2">
                    <span className="inline-flex h-7 items-center bg-[var(--ink)] px-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                      ⭐ Best seller
                    </span>
                    {discount > 0 ? (
                      <span className="inline-flex h-7 items-center bg-[var(--coral)] px-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                        Save {discount}%
                      </span>
                    ) : null}
                  </div>
                </div>
                {/* Pricing block — also lifted in 3D */}
                <div className="depth-mid relative flex items-end justify-between gap-4 border-t border-[var(--line)] bg-white p-6">
                  <div className="flex flex-col gap-1.5">
                    <span className="eyebrow text-[var(--ink-3)]">{featured.brand} · Tablets</span>
                    <h3 className="text-[22px] font-black leading-tight tracking-[-0.02em] text-[var(--ink)]">
                      {featured.name}
                    </h3>
                    <div className="mt-2 flex items-baseline gap-2.5">
                      <span className="text-3xl font-black tracking-[-0.02em] text-[var(--ink)]">
                        {formatINR(featured.price)}
                      </span>
                      {featured.originalPrice ? (
                        <span className="text-base text-[var(--ink-4)] line-through">
                          {formatINR(featured.originalPrice)}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center bg-[var(--ink)] text-white transition-colors hover:bg-[var(--cobalt)]">
                    <ArrowRight size={20} />
                  </span>
                </div>
              </Link>
            </Tilt3D>
          </div>
        </div>
      </Container>
    </section>
  );
}

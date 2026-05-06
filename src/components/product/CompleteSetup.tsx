import Link from "next/link";
import type { Product } from "@/lib/types";
import { PRODUCTS, formatINR } from "@/lib/products";
import { ProductArt } from "@/components/ui/ProductArt";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { ArrowRight } from "@/components/ui/Icon";

const COMPANION_BY_CATEGORY: Record<string, string[]> = {
  tablets: ["glide-pulse-stylus", "glide-flux-hub-8in1", "glide-arc-cable-100w"],
  laptops: ["glide-flux-hub-8in1", "glide-arc-cable-100w", "glide-pulse-stylus"],
  smartboards: ["glide-grid-wall-mount", "glide-pulse-stylus", "glide-arc-cable-100w"],
  kiosks: ["glide-arc-cable-100w", "glide-flux-hub-8in1", "glide-grid-wall-mount"],
  peripherals: ["glide-pulse-stylus", "glide-flux-hub-8in1", "glide-arc-cable-100w"],
};

const HEADLINE_BY_CATEGORY: Record<string, { eyebrow: string; head: string; body: string }> = {
  tablets: {
    eyebrow: "Complete the setup",
    head: "Made for the way you sketch, present and teach.",
    body: "Pair the tablet with a pressure-sensitive stylus, a desk-grade USB-C dock and a certified cable to round out the kit.",
  },
  laptops: {
    eyebrow: "Workstation, dialed in",
    head: "Plug in once, get every port a real workstation needs.",
    body: "Our Flux dock, certified cable and lightweight stylus take the laptop from desk to studio without missing a beat.",
  },
  smartboards: {
    eyebrow: "Install-ready",
    head: "Everything to put a 4K board on the wall, today.",
    body: "Steel mount, replacement stylus tips and the right cabling — pre-bundled so install crews don't wait on procurement.",
  },
  kiosks: {
    eyebrow: "Deploy-ready",
    head: "Cables, mounts and accessories so you don't ship twice.",
    body: "A certified power cable, our universal mount kit and a backup hub — bundle now, save a service visit later.",
  },
  peripherals: {
    eyebrow: "Pairs well",
    head: "Other accessories that ship together.",
    body: "Customers who buy this also pick up the rest of the kit — bundle to save and skip a second order.",
  },
};

export function CompleteSetup({ product }: { product: Product }) {
  const slugs = COMPANION_BY_CATEGORY[product.category] ?? [];
  const companions = slugs
    .map((s) => PRODUCTS.find((p) => p.slug === s))
    .filter((p): p is Product => p !== undefined && p.slug !== product.slug)
    .slice(0, 3);

  if (companions.length === 0) return null;

  const copy = HEADLINE_BY_CATEGORY[product.category] ?? HEADLINE_BY_CATEGORY.peripherals;
  const bundleTotal = companions.reduce((sum, p) => sum + p.price, 0);
  const bundleOriginal = companions.reduce((sum, p) => sum + (p.originalPrice ?? p.price), 0);
  const savings = bundleOriginal - bundleTotal;

  return (
    <section className="bg-[var(--ink)] py-20 sm:py-28 text-white">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <span className="eyebrow text-[var(--volt-lime)]">{copy.eyebrow}</span>
            <h2 className="mt-3 text-balance text-[clamp(2rem,4vw+0.5rem,3.5rem)] font-black leading-[0.95] tracking-[-0.03em]">
              {copy.head.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="font-display italic font-normal text-[var(--volt-lime)]">
                {copy.head.split(" ").slice(-2).join(" ")}
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
              {copy.body}
            </p>
          </div>

          {savings > 0 ? (
            <div className="lg:col-span-6">
              <div className="bg-white/5 p-6 ring-1 ring-white/10">
                <span className="eyebrow text-white/60">Bundle total</span>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-3xl font-black tracking-[-0.02em] text-white sm:text-4xl">
                    {formatINR(bundleTotal)}
                  </span>
                  <span className="text-base text-white/40 line-through">{formatINR(bundleOriginal)}</span>
                  <span className="bg-[var(--volt-lime)] px-2 py-0.5 text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink)]">
                    Save {formatINR(savings)}
                  </span>
                </div>
                <p className="mt-3 text-sm text-white/65">
                  Add all three accessories at checkout — they ship in the same box.
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {companions.map((p) => (
            <li key={p.slug}>
              <Tilt3D max={8} scale={1.015} className="h-full">
                <Link
                  href={`/products/${p.slug}`}
                  className="group relative flex h-full flex-col bg-white p-3 text-[var(--ink)] transition-shadow hover:shadow-[0_30px_50px_-20px_rgba(0,0,0,0.5)]"
                >
                  <ProductArt product={p} size="card" />
                  <div className="depth-mid flex flex-1 flex-col gap-1.5 p-3 pt-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--ink-4)]">
                      {p.brand}
                    </span>
                    <h3 className="text-base font-bold text-[var(--ink)]">{p.name}</h3>
                    <p className="line-clamp-2 min-h-[2.6em] text-sm leading-[1.3] text-[var(--ink-3)]">
                      {p.tagline}
                    </p>
                    <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                      <div className="flex flex-col">
                        <span className="text-lg font-black text-[var(--ink)]">{formatINR(p.price)}</span>
                        {p.originalPrice ? (
                          <span className="text-xs text-[var(--ink-4)] line-through">
                            {formatINR(p.originalPrice)}
                          </span>
                        ) : null}
                      </div>
                      <span className="inline-flex h-10 w-10 items-center justify-center bg-[var(--paper-tint)] text-[var(--ink)] transition group-hover:bg-[var(--ink)] group-hover:text-white">
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Tilt3D>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

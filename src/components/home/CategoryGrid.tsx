import Link from "next/link";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { Container } from "@/components/ui/Container";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { ArrowRight } from "@/components/ui/Icon";

const TILE_BG = {
  tablets: "var(--cat-tablets)",
  laptops: "var(--cat-laptops)",
  smartboards: "var(--cat-smartboards)",
  kiosks: "var(--cat-kiosks)",
  peripherals: "var(--cat-peripherals)",
} as const;

export function CategoryGrid() {
  return (
    <section className="py-20 sm:py-28">
      <Container size="wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="eyebrow text-[var(--ink-3)]">Browse by category</span>
            <h2 className="max-w-3xl text-balance text-[clamp(2rem,4vw+0.5rem,3.5rem)] font-black leading-[0.95] tracking-[-0.03em] text-[var(--ink)]">
              Pick your <span className="font-display italic font-normal text-[var(--cobalt)]">aisle.</span>
            </h2>
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink)] hover:text-[var(--cobalt)]">
            All products <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {CATEGORIES.map((cat, idx) => {
            const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
            return (
              <Tilt3D key={cat.slug} max={7} scale={1.02} className="h-full">
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="group relative flex aspect-[3/4] h-full flex-col justify-between overflow-hidden p-4 ring-1 ring-[var(--ink)]/10 transition-shadow duration-300 hover:shadow-[0_24px_48px_-20px_rgba(10,10,10,0.25)] sm:p-5"
                  style={{ background: TILE_BG[cat.slug] }}
                >
                  {/* Top row — pops forward */}
                  <div className="depth-near flex items-center justify-between">
                    <span className="bg-[var(--ink)] px-2.5 py-1 font-mono text-[10px] font-bold text-white">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[var(--ink)]/70">
                      {count.toString().padStart(2, "0")} SKUs
                    </span>
                  </div>

                  {/* Centre — silhouette with extra parallax depth */}
                  <div className="depth-mid flex flex-1 items-center justify-center py-4">
                    <div className="transition-transform duration-500 group-hover:scale-105">
                      <CategorySilhouette slug={cat.slug} />
                    </div>
                  </div>

                  {/* Bottom — title + cta */}
                  <div className="depth-near flex flex-col gap-2">
                    <h3 className="text-[20px] font-black leading-none tracking-[-0.02em] text-[var(--ink)]">
                      {cat.label}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--ink)]">
                      Shop <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </Tilt3D>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function CategorySilhouette({ slug }: { slug: keyof typeof TILE_BG }) {
  const common = {
    width: 110,
    height: 110,
    viewBox: "0 0 100 100",
    fill: "none",
    stroke: "var(--ink)",
    strokeWidth: 2.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (slug) {
    case "tablets":
      return (
        <svg {...common}>
          <rect x="28" y="14" width="44" height="72" rx="6" fill="white" />
          <rect x="32" y="18" width="36" height="60" fill="var(--cat-tablets)" opacity="0.5" />
          <line x1="46" y1="82" x2="54" y2="82" />
          <circle cx="50" cy="16.5" r="0.8" fill="var(--ink)" />
          {/* a friendly stylus */}
          <line x1="78" y1="22" x2="92" y2="64" strokeWidth="3" />
          <circle cx="79" cy="20" r="2" fill="var(--ink)" stroke="none" />
        </svg>
      );
    case "laptops":
      return (
        <svg {...common}>
          <path d="M 16 36 L 84 36 L 84 70 L 16 70 Z" fill="white" />
          <rect x="20" y="40" width="60" height="26" fill="var(--cat-laptops)" opacity="0.5" />
          <path d="M 8 70 L 92 70 L 88 78 L 12 78 Z" fill="white" />
          <line x1="44" y1="74" x2="56" y2="74" />
        </svg>
      );
    case "smartboards":
      return (
        <svg {...common}>
          <rect x="12" y="16" width="76" height="56" rx="3" fill="white" />
          <rect x="16" y="20" width="68" height="48" fill="var(--cat-smartboards)" opacity="0.5" />
          <path d="M 24 56 Q 36 36 48 50 T 76 30" stroke="var(--ink)" strokeWidth="2" fill="none" />
          <circle cx="24" cy="56" r="2" fill="var(--ink)" stroke="none" />
          <circle cx="76" cy="30" r="2" fill="var(--ink)" stroke="none" />
          <rect x="44" y="72" width="12" height="3" fill="var(--ink)" stroke="none" />
          <line x1="50" y1="75" x2="50" y2="90" />
          <line x1="40" y1="90" x2="60" y2="90" />
        </svg>
      );
    case "kiosks":
      return (
        <svg {...common}>
          <rect x="30" y="6" width="40" height="60" rx="4" fill="white" />
          <rect x="34" y="10" width="32" height="48" fill="var(--cat-kiosks)" opacity="0.5" />
          <rect x="40" y="20" width="20" height="14" fill="var(--ink)" stroke="none" opacity="0.85" />
          <line x1="40" y1="40" x2="60" y2="40" />
          <line x1="40" y1="46" x2="56" y2="46" />
          <line x1="40" y1="52" x2="60" y2="52" />
          <path d="M 28 68 L 72 68 L 76 92 L 24 92 Z" fill="white" />
          <line x1="42" y1="76" x2="58" y2="76" />
        </svg>
      );
    case "peripherals":
      return (
        <svg {...common}>
          {/* hub */}
          <rect x="22" y="46" width="56" height="20" rx="4" fill="white" />
          <line x1="32" y1="56" x2="38" y2="56" strokeWidth="3" />
          <line x1="42" y1="56" x2="48" y2="56" strokeWidth="3" />
          <line x1="52" y1="56" x2="58" y2="56" strokeWidth="3" />
          <line x1="62" y1="56" x2="68" y2="56" strokeWidth="3" />
          {/* cable curving up */}
          <path d="M 50 46 C 50 30, 70 22, 82 18" strokeWidth="3" fill="none" />
          <rect x="78" y="14" width="8" height="10" rx="1.5" fill="var(--ink)" stroke="none" />
          {/* stylus */}
          <path d="M 18 90 L 38 70" strokeWidth="3" />
          <circle cx="38" cy="70" r="2" fill="var(--ink)" stroke="none" />
        </svg>
      );
  }
}

import { Container } from "@/components/ui/Container";
import { TESTIMONIALS } from "@/lib/products";
import { Rating } from "@/components/product/Rating";

const TONES = [
  { bg: "var(--mint)", quote: "var(--ink)" },
  { bg: "var(--lavender)", quote: "var(--ink)" },
  { bg: "var(--peach)", quote: "var(--ink)" },
];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <Container size="wide">
        <div className="flex flex-col items-start gap-3">
          <div className="inline-flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 bg-[var(--volt-lime)]" />
            <span className="eyebrow text-[var(--ink-3)]">Customer voices</span>
          </div>
          <h2 className="text-balance text-[clamp(2rem,4vw+0.5rem,3.5rem)] font-black leading-[0.95] tracking-[-0.03em] text-[var(--ink)]">
            Decision-makers,{" "}
            <span className="font-display italic font-normal text-[var(--cobalt)]">not influencers.</span>
          </h2>
          <p className="mt-2 max-w-2xl text-[var(--ink-3)]">
            How procurement teams, principals and IT heads actually work with EGS, in their own words.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => {
            const tone = TONES[i % TONES.length];
            return (
              <figure
                key={t.id}
                className="relative flex flex-col gap-5 overflow-hidden p-7 ring-1 ring-[var(--ink)]/8"
                style={{ background: tone.bg }}
              >
                <span className="absolute right-6 top-4 font-serif text-[120px] leading-none text-[var(--ink)]/12 select-none">
                  ”
                </span>
                <div className="flex items-center justify-between">
                  <Rating value={t.rating} />
                  <span className=" bg-[var(--ink)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
                    Verified
                  </span>
                </div>
                <blockquote className="text-lg font-medium leading-snug text-[var(--ink)]">"{t.quote}"</blockquote>
                <figcaption className="mt-auto flex items-center gap-3 border-t border-[var(--ink)]/15 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center bg-[var(--ink)] text-sm font-bold text-white">
                    {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--ink)]">{t.name}</div>
                    <div className="text-xs text-[var(--ink-2)]">
                      {t.role} · {t.organization}
                    </div>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

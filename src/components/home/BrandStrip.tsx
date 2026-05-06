import { Container } from "@/components/ui/Container";

const BRANDS = ["APEX", "LUMEN", "NEURON", "PLINTH", "GLIDE", "HELIO"];

export function BrandStrip() {
  return (
    <section className="border-y border-[var(--line)] bg-[var(--paper-tint)] py-10 sm:py-12">
      <Container size="wide">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:gap-10 md:text-left">
          <p className="max-w-[14rem] shrink-0 text-sm font-semibold leading-snug text-[var(--ink-3)]">
            Six trusted brands. <span className="text-[var(--ink)]">One warranty desk.</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-12">
            {BRANDS.map((b) => (
              <span
                key={b}
                className="text-xl font-black tracking-[0.12em] text-[var(--ink)]/55 transition-colors hover:text-[var(--ink)] sm:text-[22px]"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

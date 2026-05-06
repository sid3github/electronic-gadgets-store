import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container size="narrow">
        <div className="relative overflow-hidden bg-white p-12 text-center ring-1 ring-[var(--line)]">
          <div className="mx-auto mb-6 inline-flex items-center justify-center bg-[var(--volt-lime)] px-5 py-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink)]">
            404 · circuit-open
          </div>
          <h1 className="display-1 leading-none">
            <span className="block">No signal</span>
            <span className="block text-[var(--ink-4)]">on this path.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-[var(--ink-3)]">
            The page you're looking for has been moved, retired, or never existed in this circuit.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/" variant="ink" trailingIcon={<ArrowRight />}>Back to home</Button>
            <Link href="/products" className="text-sm font-semibold text-[var(--cobalt)] hover:underline">
              Browse the catalogue →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const LEGAL_NAV = [
  { href: "/legal/terms", label: "Terms & Conditions" },
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/returns", label: "Return & Replacement Policy" },
  { href: "/warranty", label: "Warranty Policy" },
];

export function LegalLayout({
  title,
  effective,
  children,
  active,
}: {
  title: string;
  effective: string;
  children: ReactNode;
  active: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container size="wide">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <span className="eyebrow text-[var(--ink-3)]">Legal</span>
            <nav className="mt-4 flex flex-col bg-white p-2 ring-1 ring-[var(--line)]">
              {LEGAL_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={` px-4 py-3 text-sm font-semibold transition ${
                    item.href === active
                      ? "bg-[var(--ink)] text-white"
                      : "text-[var(--ink-2)] hover:bg-[var(--paper-tint)] hover:text-[var(--ink)]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          <article className="max-w-3xl">
            <header className="mb-8">
              <h1 className="display-2">{title}</h1>
              <p className="mt-2 eyebrow text-[var(--ink-3)]">Effective: {effective}</p>
            </header>
            <div className="legal-body flex flex-col gap-6">{children}</div>
          </article>
        </div>
      </Container>
    </section>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-bold tracking-tight text-[var(--ink)]">{heading}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-[var(--ink-3)]">{children}</div>
    </section>
  );
}

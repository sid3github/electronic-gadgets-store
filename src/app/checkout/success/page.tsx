import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Check, Mail, Phone, ArrowRight } from "@/components/ui/Icon";
import { SITE } from "@/lib/site";

type SearchParams = { ref?: string };

export const metadata: Metadata = {
  title: "Order received",
  description: "Thanks — your EGS order has been received and our team will be in touch shortly.",
  robots: { index: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { ref } = await searchParams;
  const orderId = ref && /^[A-Za-z0-9-]{4,40}$/.test(ref) ? ref : null;

  return (
    <section className="py-20">
      <Container size="narrow">
        <div className="relative overflow-hidden bg-white p-10 text-center ring-1 ring-[var(--line)] md:p-14">
          {/* lime confetti dots */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-8 top-10 h-3 w-3 bg-[var(--volt-lime)]" />
            <div className="absolute right-12 top-16 h-2 w-2 bg-[var(--coral)]" />
            <div className="absolute left-20 top-32 h-2.5 w-2.5 bg-[var(--cobalt)]" />
            <div className="absolute right-24 top-40 h-3 w-3 bg-[var(--mint)]" />
            <div className="absolute left-12 bottom-32 h-2 w-2 bg-[var(--lavender)]" />
            <div className="absolute right-10 bottom-20 h-2.5 w-2.5 bg-[var(--peach)]" />
          </div>
          <div className="relative">
            <div className="mx-auto flex h-20 w-20 items-center justify-center bg-[var(--volt-lime)] text-[var(--ink)] ring-4 ring-[var(--ink)]">
              <Check size={32} />
            </div>
            <p className="mt-6 eyebrow text-[var(--ink-3)]">Order received</p>
            <h1 className="display-2 mt-3 text-balance">
              Thanks — we've got it from here.
            </h1>
            <p className="mx-auto mt-3 max-w-md text-[var(--ink-3)]">
              A confirmation has been emailed to you. Our operations team will reach out within{" "}
              <span className="font-semibold text-[var(--ink)]">1 business hour</span> to confirm stock and share a secure payment link.
            </p>
            {orderId ? (
              <div className="mt-8 inline-flex items-center gap-3 bg-[var(--paper-tint)] px-5 py-3 font-mono text-sm">
                <span className="text-[var(--ink-3)]">Reference</span>
                <span className="font-bold text-[var(--cobalt)]">{orderId}</span>
              </div>
            ) : null}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/products" variant="ink" trailingIcon={<ArrowRight />}>Continue shopping</Button>
              <Button href="/warranty" variant="secondary">Read our support promise</Button>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-3 text-sm text-[var(--ink-3)] sm:grid-cols-2">
              <a href={`mailto:${SITE.contact.ordersEmail}`} className="inline-flex items-center justify-center gap-2 bg-[var(--paper-tint)] p-3 hover:text-[var(--cobalt)]">
                <Mail size={14} className="text-[var(--cobalt)]" /> {SITE.contact.ordersEmail}
              </a>
              <a href={`tel:${SITE.contact.phone.replace(/\s+/g, "")}`} className="inline-flex items-center justify-center gap-2 bg-[var(--paper-tint)] p-3 hover:text-[var(--cobalt)]">
                <Phone size={14} className="text-[var(--cobalt)]" /> {SITE.contact.phone}
              </a>
            </div>
            <p className="mt-8 text-xs text-[var(--ink-4)]">
              Need to make a change? Reply to the confirmation email or{" "}
              <Link href="/contact" className="text-[var(--cobalt)] underline">contact support</Link>.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

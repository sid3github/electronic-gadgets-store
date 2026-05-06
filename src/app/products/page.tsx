import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { CatalogueClient } from "@/components/product/CatalogueClient";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catalogue",
  description: "Browse tablets, laptops, interactive boards, kiosks and accessories from EGS — direct-to-customer with full warranty.",
};

export default function ProductsPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container size="wide">
        <header className="flex flex-col gap-4 pb-10">
          <span className="eyebrow text-[var(--ink-3)]">Catalogue</span>
          <h1 className="display-2 text-balance">Every device, in one filterable grid.</h1>
          <p className="max-w-2xl text-[var(--ink-3)]">
            All prices are direct-to-customer and include 24-month warranty. Bulk discounts kick in at 10 units — talk to procurement for a quote.
          </p>
        </header>
        <Suspense fallback={<div className="text-[var(--ink-3)]">Loading catalogue…</div>}>
          <CatalogueClient products={PRODUCTS} />
        </Suspense>
      </Container>
    </section>
  );
}

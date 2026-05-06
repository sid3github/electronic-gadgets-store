import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CartLines } from "@/components/cart/CartLines";
import { CartSummary } from "@/components/cart/CartSummary";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your EGS cart — review items before checkout.",
};

export default function CartPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container size="wide">
        <header className="mb-10 flex flex-col gap-2">
          <span className="eyebrow text-[var(--ink-3)]">Step 1 of 2</span>
          <h1 className="display-2">Your cart</h1>
          <p className="text-[var(--ink-3)]">Review the items below, then continue to delivery details.</p>
        </header>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <CartLines />
          <CartSummary ctaLabel="Continue to delivery" />
        </div>
      </Container>
    </section>
  );
}

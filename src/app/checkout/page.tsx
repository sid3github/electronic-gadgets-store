import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CartLines } from "@/components/cart/CartLines";
import { CartSummary } from "@/components/cart/CartSummary";
import { CheckoutForm } from "@/components/cart/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Submit your delivery details and place your EGS order.",
};

export default function CheckoutPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container size="wide">
        <header className="mb-10 flex flex-col gap-2">
          <span className="eyebrow text-[var(--ink-3)]">Step 2 of 2</span>
          <h1 className="display-2">Delivery & order</h1>
          <p className="text-[var(--ink-3)]">Tell us where to ship. We confirm via email within an hour and call to schedule the delivery.</p>
        </header>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-10">
            <CheckoutForm />
            <div className="flex flex-col gap-3">
              <h2 className="eyebrow text-[var(--ink-3)]">Items in this order</h2>
              <CartLines readOnly />
            </div>
          </div>
          <CartSummary hideCta />
        </div>
      </Container>
    </section>
  );
}

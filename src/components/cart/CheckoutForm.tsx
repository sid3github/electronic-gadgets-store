"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/Button";
import { FieldRow, HelperText, Input, Label, Select, Textarea } from "@/components/ui/Field";
import { Check, Shield } from "@/components/ui/Icon";

const STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand",
  "West Bengal",
];

type FormState = {
  status: "idle" | "submitting" | "ok" | "error";
  message?: string;
};

export function CheckoutForm() {
  const router = useRouter();
  const { resolveLines, subtotal, count, clear } = useCart();
  const [state, setState] = useState<FormState>({ status: "idle" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (count === 0) {
      setState({ status: "error", message: "Your cart is empty." });
      return;
    }
    setState({ status: "submitting" });
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);

    // honeypot
    if (fd.get("company_url")) {
      setState({ status: "error", message: "Submission blocked." });
      return;
    }

    const lines = resolveLines();
    const payload = {
      customer: {
        name: fd.get("name"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        organization: fd.get("organization"),
      },
      shipping: {
        line1: fd.get("line1"),
        line2: fd.get("line2"),
        city: fd.get("city"),
        state: fd.get("state"),
        pin: fd.get("pin"),
        notes: fd.get("notes"),
      },
      items: lines.map((l) => ({
        slug: l.product.slug,
        name: l.product.name,
        quantity: l.quantity,
        unitPrice: l.product.price,
        lineTotal: l.lineTotal,
      })),
      subtotal,
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: { ok: boolean; orderId?: string; message?: string } = await res.json();
      if (!res.ok || !data.ok) {
        setState({ status: "error", message: data.message ?? "Order could not be placed. Please try again." });
        return;
      }
      clear();
      router.push(`/checkout/success?ref=${encodeURIComponent(data.orderId ?? "")}`);
    } catch (err) {
      setState({ status: "error", message: err instanceof Error ? err.message : "Network error" });
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit} noValidate>
      <fieldset className="flex flex-col gap-5 bg-white p-6 ring-1 ring-[var(--line)]">
        <legend className="px-2 eyebrow text-[var(--ink-3)]">Contact</legend>
        <FieldRow columns={2}>
          <div>
            <Label htmlFor="name" required>Full name</Label>
            <Input id="name" name="name" autoComplete="name" required minLength={2} placeholder="Anita Rao" />
          </div>
          <div>
            <Label htmlFor="email" required>Email</Label>
            <Input id="email" type="email" name="email" autoComplete="email" required placeholder="anita@school.edu.in" />
          </div>
        </FieldRow>
        <FieldRow columns={2}>
          <div>
            <Label htmlFor="phone" required>Phone</Label>
            <Input id="phone" type="tel" name="phone" autoComplete="tel" required pattern="[0-9+\s\-]{10,15}" placeholder="+91 90000 00420" />
            <HelperText>Used for delivery coordination only.</HelperText>
          </div>
          <div>
            <Label htmlFor="organization" hint="Schools, businesses">Organization</Label>
            <Input id="organization" name="organization" autoComplete="organization" placeholder="Lakeside International School" />
          </div>
        </FieldRow>
      </fieldset>

      <fieldset className="flex flex-col gap-5 bg-white p-6 ring-1 ring-[var(--line)]">
        <legend className="px-2 eyebrow text-[var(--ink-3)]">Shipping address</legend>
        <div>
          <Label htmlFor="line1" required>Address line 1</Label>
          <Input id="line1" name="line1" autoComplete="address-line1" required placeholder="Plot 12, Sector 18" />
        </div>
        <div>
          <Label htmlFor="line2">Address line 2</Label>
          <Input id="line2" name="line2" autoComplete="address-line2" placeholder="Near landmark, optional" />
        </div>
        <FieldRow columns={3}>
          <div>
            <Label htmlFor="city" required>City</Label>
            <Input id="city" name="city" autoComplete="address-level2" required placeholder="Mumbai" />
          </div>
          <div>
            <Label htmlFor="state" required>State</Label>
            <Select id="state" name="state" required defaultValue="">
              <option value="" disabled>Select state</option>
              {STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="pin" required>PIN code</Label>
            <Input id="pin" name="pin" inputMode="numeric" autoComplete="postal-code" required pattern="[0-9]{6}" placeholder="400051" />
          </div>
        </FieldRow>
        <div>
          <Label htmlFor="notes" hint="Optional">Delivery notes</Label>
          <Textarea id="notes" name="notes" rows={3} placeholder="Receiving dock, GST instructions, gate access, etc." />
        </div>
      </fieldset>

      {/* Honeypot — invisible to humans, traps bots */}
      <input
        type="text"
        name="company_url"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />

      <div className="flex flex-col items-start gap-4 bg-[var(--cobalt-soft)] p-5 text-sm text-[var(--ink-2)] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Shield size={18} className="mt-0.5 text-[var(--cobalt)]" />
          <div>
            <p className="font-bold text-[var(--ink)]">No card needed in v1.</p>
            <p className="text-[var(--ink-3)]">
              Once you submit, our operations team confirms your order over email and shares a secure payment link within 1 business hour.
            </p>
          </div>
        </div>
      </div>

      {state.status === "error" ? (
        <p role="alert" className=" border border-[var(--coral)] bg-[var(--coral-soft)] p-3 text-sm text-[var(--coral)]">
          {state.message ?? "Submission failed."}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        variant="ink"
        leadingIcon={state.status === "ok" ? <Check /> : undefined}
        disabled={state.status === "submitting" || count === 0}
        className="self-start"
      >
        {state.status === "submitting" ? "Placing order…" : count === 0 ? "Cart is empty" : "Place order"}
      </Button>
      <p className="text-xs text-[var(--ink-4)]">
        By submitting, you agree to our <a href="/legal/terms" className="text-[var(--cobalt)] underline">Terms</a> and{" "}
        <a href="/legal/privacy" className="text-[var(--cobalt)] underline">Privacy Policy</a>.
      </p>
    </form>
  );
}

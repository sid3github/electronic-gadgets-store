"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { Plus, Minus } from "@/components/ui/Icon";

export function ProductFAQ({ product }: { product: Product }) {
  const items = buildFaq(product);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      <span className="eyebrow text-[var(--ink-3)]">Frequently asked</span>
      <h2 className="mt-3 text-balance text-[clamp(1.75rem,3vw+0.5rem,2.75rem)] font-black leading-[0.95] tracking-[-0.02em] text-[var(--ink)]">
        Quick answers <span className="font-display italic font-normal text-[var(--cobalt)]">before you buy.</span>
      </h2>
      <ul className="mt-8 flex flex-col">
        {items.map((item, idx) => {
          const isOpen = open === idx;
          return (
            <li key={item.q} className="border-b border-[var(--line)]">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : idx)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-5 text-left transition hover:text-[var(--cobalt)]"
              >
                <span className="text-base font-bold text-[var(--ink)] sm:text-lg">{item.q}</span>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center bg-[var(--paper-tint)] text-[var(--ink-2)] transition group-hover:bg-[var(--ink)]">
                  {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>
              <div
                className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
                  isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-3xl text-[15px] leading-relaxed text-[var(--ink-3)]">{item.a}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function buildFaq(p: Product): { q: string; a: string }[] {
  const wm = p.warrantyMonths;
  const baseFaq: { q: string; a: string }[] = [
    {
      q: `Does the ${p.name} come with a warranty?`,
      a: `Yes — every ${p.name} ships with a ${wm}-month brand warranty. Manufacturing and technical defects are replaced free of charge for the full warranty period. Physical and liquid damage are explicitly excluded; see our Warranty page for the full terms.`,
    },
    {
      q: "How fast will my order ship?",
      a: "In-stock orders are dispatched within 48 hours from our Mumbai warehouse. Standard delivery across India takes 3–7 business days. High-value SKUs ship insured and require a signature on delivery.",
    },
    {
      q: "Do you offer bulk pricing?",
      a: "Yes — volume pricing kicks in at 10 units. Schools and businesses get pre-imaged devices, asset tagging and a fleet console at no extra cost. Talk to procurement for a custom quote.",
    },
    {
      q: "What's the return policy?",
      a: "You can return any unopened, unused product within 14 days of delivery for a full refund. Out-of-the-box defects are replaced within 7 days, no questions asked. Used hardware is only accepted for warranty replacement, not standard returns.",
    },
    {
      q: "Is GST included in the price?",
      a: `Yes — all listed prices are inclusive of GST. The total ${p.price >= 25000 ? "qualifies for free shipping" : "shows shipping at checkout"}. We provide a GSTIN-compliant invoice with every order for input-tax credit purposes.`,
    },
  ];

  // Category-specific Q&A
  if (p.category === "tablets") {
    baseFaq.splice(2, 0, {
      q: "Is the stylus included or sold separately?",
      a: `The active stylus is ${p.slug.includes("pro") ? "included in the box" : "sold separately as a bundle"}. Our Glide Pulse Stylus is fully compatible and snaps magnetically to the tablet for charging.`,
    });
  } else if (p.category === "smartboards") {
    baseFaq.splice(2, 0, {
      q: "Do you handle installation?",
      a: "Yes — installation is free in metro cities (Mumbai, Bengaluru, Delhi, Hyderabad, Chennai, Pune). For other locations, we coordinate with vetted local installers. The wall-mount kit is included with every smartboard.",
    });
  } else if (p.category === "kiosks") {
    baseFaq.splice(2, 0, {
      q: "Can the kiosk run our existing software?",
      a: "Yes — kiosks ship with Android or Windows and support custom kiosk-mode apps via APK or MSI. Our team can pre-image units to your exact software stack before shipping.",
    });
  }

  return baseFaq;
}

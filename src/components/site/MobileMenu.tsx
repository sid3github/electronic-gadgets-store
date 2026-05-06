"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "@/components/ui/Icon";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/products?category=tablets", label: "Tablets" },
  { href: "/products?category=laptops", label: "Laptops" },
  { href: "/products?category=smartboards", label: "Interactive Boards" },
  { href: "/products?category=kiosks", label: "Kiosks" },
  { href: "/products?category=peripherals", label: "Accessories" },
  { href: "/deals", label: "Deals & Offers" },
  { href: "/warranty", label: "Warranty & Support" },
  { href: "/about", label: "About EGS" },
  { href: "/contact", label: "Contact" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex h-11 w-11 items-center justify-center border border-[var(--line-strong)] bg-white text-[var(--ink)] lg:hidden"
      >
        <Menu size={18} />
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-[80] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="absolute inset-0 cursor-pointer bg-[var(--ink)]/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative ml-auto flex h-full w-[92%] max-w-sm flex-col gap-2 bg-[var(--paper)] p-6">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-[var(--ink-3)]">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center border border-[var(--line-strong)] bg-white text-[var(--ink)]"
              >
                <X size={16} />
              </button>
            </div>
            <nav className="mt-6 flex flex-col">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-[var(--line)] py-3.5 text-[18px] font-semibold text-[var(--ink)] transition hover:text-[var(--cobalt)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-1.5 text-sm text-[var(--ink-3)]">
              <span className="eyebrow text-[var(--ink-3)]">24/7 Support</span>
              <a href={`tel:${SITE.contact.phone.replace(/\s+/g, "")}`} className="text-[var(--ink)] font-semibold">{SITE.contact.phone}</a>
              <a href={`mailto:${SITE.contact.supportEmail}`} className="text-[var(--cobalt)]">{SITE.contact.supportEmail}</a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

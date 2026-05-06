import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";
import { Mail, MapPin, Phone } from "@/components/ui/Icon";

const FOOTER_NAV: Array<{ heading: string; links: { href: string; label: string }[] }> = [
  {
    heading: "Shop",
    links: [
      { href: "/products?category=tablets", label: "Tablets" },
      { href: "/products?category=laptops", label: "Laptops" },
      { href: "/products?category=smartboards", label: "Interactive Boards" },
      { href: "/products?category=kiosks", label: "Kiosks" },
      { href: "/products?category=peripherals", label: "Accessories" },
      { href: "/deals", label: "Deals & Offers" },
    ],
  },
  {
    heading: "Support",
    links: [
      { href: "/warranty", label: "Warranty & Replacement" },
      { href: "/contact", label: "Contact Us" },
      { href: "/legal/returns", label: "Return Policy" },
      { href: "/warranty#tat", label: "Support TAT" },
      { href: "/contact#bulk", label: "Bulk Procurement" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About EGS" },
      { href: "/about#mission", label: "Our Mission" },
      { href: "/legal/terms", label: "Terms & Conditions" },
      { href: "/legal/privacy", label: "Privacy Policy" },
      { href: "/legal/returns", label: "Return Policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 bg-[var(--ink)] text-[var(--paper)]">
      <Container size="wide" className="py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="inline-flex items-end leading-none">
              <span className="text-[64px] font-black tracking-[-0.06em] text-white">egs</span>
              <span className="ml-1 inline-block h-3 w-3 translate-y-[-4px] bg-[var(--volt-lime)]" />
            </div>
            <div className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
              Electronic · Gadgets · Store
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              {SITE.description}
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm text-white/80">
              <a href={`mailto:${SITE.contact.salesEmail}`} className="inline-flex items-center gap-2 hover:text-[var(--volt-lime)]">
                <Mail size={14} className="text-[var(--volt-lime)]" /> {SITE.contact.salesEmail}
              </a>
              <a href={`tel:${SITE.contact.phone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-2 hover:text-[var(--volt-lime)]">
                <Phone size={14} className="text-[var(--volt-lime)]" /> {SITE.contact.phone}
              </a>
              <span className="inline-flex items-start gap-2 text-white/60">
                <MapPin size={14} className="mt-0.5 text-[var(--volt-lime)]" />
                <span>
                  {SITE.contact.address.line2}, {SITE.contact.address.city} {SITE.contact.address.pin}
                </span>
              </span>
            </div>
          </div>
          {FOOTER_NAV.map((col) => (
            <div key={col.heading} className="md:col-span-2 lg:col-span-2">
              <h3 className="mb-4 eyebrow text-[var(--volt-lime)]">{col.heading}</h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/70 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="mb-4 eyebrow text-[var(--volt-lime)]">Service Levels</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-white/70">
              <li>Support — under {SITE.policies.supportTatHours}h</li>
              <li>On-site — {SITE.policies.onSiteTatBusinessDays} business days</li>
              <li>Replacement — within {SITE.policies.replacementWindowDays} days</li>
              <li>Returns — {SITE.policies.returnWindowDays} day window</li>
            </ul>
          </div>
        </div>

        {/* Big EGS marquee */}
        <div className="my-16 overflow-hidden border-y border-white/10 py-3">
          <div className="flex animate-ticker whitespace-nowrap text-[clamp(48px,8vw,120px)] font-black uppercase tracking-tight">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="mx-6 inline-flex items-center gap-6 text-white">
                Electronic <span className="text-[var(--volt-lime)]">Gadgets</span> Store{" "}
                <span className="text-white/30">·</span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 pt-2 md:flex-row md:items-center">
          <p className="text-xs text-white/50">© {new Date().getFullYear()} Electronic Gadgets Store. All rights reserved. CIN U72200KA2024PTC000420.</p>
          <p className="text-xs text-white/50">
            Designed and assembled in <span className="text-white">Mumbai, India</span>.
          </p>
        </div>
      </Container>
    </footer>
  );
}

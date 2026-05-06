import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SupportForm } from "@/components/site/SupportForm";
import { SITE } from "@/lib/site";
import { Building, Mail, MapPin, Phone } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Talk to EGS. Sales, support, warranty claims and bulk procurement — all in one place.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative py-20 sm:py-28">
        <Container size="wide">
          <Badge tone="cobalt" withDot className="mb-5">Customer success</Badge>
          <h1 className="display-1 max-w-4xl text-balance">
            Talk to a human.{" "}
            <span className="highlight-lime">First response in {SITE.policies.supportTatHours} hours.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-[var(--ink-3)]">
            Sales, support, warranty replacements or bulk procurement — pick a channel below or fill the form. Every message is logged against an order or organization, so we can pick up where you left off.
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5 flex flex-col gap-4">
              {[
                { icon: Mail, label: "Sales", value: SITE.contact.salesEmail, href: `mailto:${SITE.contact.salesEmail}`, bg: "var(--mint)" },
                { icon: Mail, label: "Support", value: SITE.contact.supportEmail, href: `mailto:${SITE.contact.supportEmail}`, bg: "var(--volt-lime)" },
                { icon: Phone, label: "Phone", value: SITE.contact.phone, href: `tel:${SITE.contact.phone.replace(/\s+/g, "")}`, bg: "var(--lavender)" },
                { icon: Phone, label: "WhatsApp", value: SITE.contact.whatsapp, href: `https://wa.me/${SITE.contact.whatsapp.replace(/[^0-9]/g, "")}`, bg: "var(--peach)" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-4 bg-white p-5 ring-1 ring-[var(--line)] transition hover:ring-[var(--ink)]"
                  >
                    <span className="flex h-12 w-12 items-center justify-center text-[var(--ink)]" style={{ background: item.bg }}>
                      <Icon size={20} />
                    </span>
                    <div className="flex flex-col">
                      <span className="eyebrow text-[var(--ink-3)]">{item.label}</span>
                      <span className="text-base font-bold text-[var(--ink)] group-hover:text-[var(--cobalt)]">{item.value}</span>
                    </div>
                  </a>
                );
              })}

              <div className="mt-4 bg-[var(--ink)] p-6 text-white">
                <h3 className="eyebrow text-[var(--volt-lime)]">Service-level commitments</h3>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  {[
                    ["First response", `≤ ${SITE.policies.supportTatHours} hours`],
                    ["Replacement initiation", "≤ 48 hours"],
                    ["On-site (metro)", `${SITE.policies.onSiteTatBusinessDays} business days`],
                    ["On-site (non-metro)", "5 business days"],
                  ].map(([k, v]) => (
                    <li key={k} className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                      <span>{k}</span>
                      <span className="font-mono font-bold text-[var(--volt-lime)]">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-2 flex items-start gap-3 bg-white p-5 ring-1 ring-[var(--line)] text-sm text-[var(--ink-3)]">
                <Building size={18} className="mt-0.5 text-[var(--cobalt)]" />
                <div>
                  <div className="font-semibold text-[var(--ink)]">{SITE.contact.address.line1}</div>
                  <div>{SITE.contact.address.line2}</div>
                  <div>{SITE.contact.address.city}, {SITE.contact.address.state} {SITE.contact.address.pin}</div>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-[var(--ink-4)]">
                    <MapPin size={12} className="text-[var(--cobalt)]" /> {SITE.contact.hours}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-8">
              <div id="bulk" className="scroll-mt-32">
                <h2 className="display-3">Send us a message</h2>
                <p className="mt-2 text-[var(--ink-3)]">Pick a topic — bulk procurement, technical support, warranty or general — and we'll route the message to the right desk.</p>
                <div className="mt-6">
                  <SupportForm formId="contact-form" />
                </div>
              </div>

              <div className="overflow-hidden bg-white ring-1 ring-[var(--line)]">
                <div className="aspect-[16/9] w-full">
                  <iframe
                    title="EGS HQ map"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=72.8550%2C19.0540%2C72.8810%2C19.0740&layer=mapnik&marker=19.0644%2C72.8678"
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="flex flex-col gap-1 p-4 text-sm text-[var(--ink-3)] sm:flex-row sm:items-center sm:justify-between">
                  <span>EGS HQ · One BKC, Bandra Kurla Complex, Mumbai</span>
                  <a
                    href="https://maps.google.com/?q=One+BKC+Mumbai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[var(--cobalt)]"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              <div id="partner" className="scroll-mt-32 bg-[var(--cobalt-soft)] p-6 text-sm text-[var(--ink-2)]">
                <h3 className="text-base font-bold text-[var(--ink)]">Partner & referral programme</h3>
                <p className="mt-2 text-[var(--ink-3)]">
                  We maintain a small set of vetted referral links to trusted partner platforms for hardware EGS doesn't carry directly. Talk to procurement to request a partner introduction.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

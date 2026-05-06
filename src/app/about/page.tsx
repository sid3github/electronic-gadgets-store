import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Award, Building, Cpu, Shield } from "@/components/ui/Icon";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About EGS",
  description: "Why Electronic Gadgets Store exists, how we operate, and what direct-to-customer electronics actually means.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative py-20 sm:py-28">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Badge tone="lime" withDot className="mb-5">Our story</Badge>
              <h1 className="display-1 text-balance">
                We sell <span className="highlight-lime">the gadgets,</span> and stand behind them after the box opens.
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-pretty text-lg leading-relaxed text-[var(--ink-3)]">
                Electronic Gadgets Store (EGS) was started by procurement and IT folks who got tired of warranty fights with open-market resellers. We sell direct, support direct and replace direct — and we publish our SLAs so you can hold us to them.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section id="mission" className="py-20 sm:py-24">
        <Container size="wide">
          <div className=" bg-[var(--ink)] p-10 sm:p-14">
            <div className="max-w-3xl">
              <span className="eyebrow text-[var(--volt-lime)]">Mission</span>
              <h2 className="display-2 mt-3 text-balance text-white">
                Make professional electronics{" "}
                <span className="text-[var(--volt-lime)]">boring to procure.</span>
              </h2>
              <p className="mt-4 text-lg text-white/70">
                The interesting part of buying a tablet for a classroom should be the lesson, not the warranty card. We do the unsexy work so the device just keeps showing up to class.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {[
                { icon: Shield, title: "Trust by paperwork", body: "Every device ships with a warranty card, a serial-bound invoice and a support contract you can actually read.", accent: "var(--mint)" },
                { icon: Cpu, title: "Hardware we'd use ourselves", body: "We test every SKU through a full school-day cycle before we list it. If we wouldn't use it, we don't ship it.", accent: "var(--volt-lime)" },
                { icon: Award, title: "Service before scale", body: "We grow as fast as our support team can grow. Headcount on the support floor is published every quarter.", accent: "var(--lavender)" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex flex-col gap-4 bg-white/5 p-7 ring-1 ring-white/10">
                    <div className="flex h-12 w-12 items-center justify-center text-[var(--ink)]" style={{ background: item.accent }}>
                      <Icon />
                    </div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-white/70">{item.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="eyebrow text-[var(--ink-3)]">What we sell</span>
              <h2 className="display-2 mt-3">Five categories. One operating model.</h2>
              <ul className="mt-8 space-y-4 text-[var(--ink-2)]">
                {[
                  ["Tablets", "Education-grade tablets, ruggedized field tablets and creative tablets."],
                  ["Laptops", "Classroom notebooks, ultraportables and creator-grade workstations."],
                  ["Interactive boards", "65\" and 86\" touch panels with full installation."],
                  ["Kiosks", "Floor-standing and counter-mounted self-service terminals."],
                  ["Peripherals", "Hubs, cables, mounts, styli and the boring stuff that makes the rest work."],
                ].map(([title, body]) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--volt-lime)] ring-2 ring-[var(--ink)]" />
                    <span>
                      <span className="font-bold text-[var(--ink)]">{title}.</span>{" "}
                      <span className="text-[var(--ink-3)]">{body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                ["8,400+", "Devices shipped", "var(--mint)"],
                ["240+", "Schools served", "var(--volt-lime)"],
                ["96%", "First-call resolution", "var(--lavender)"],
                ["18 hr", "Median support response", "var(--peach)"],
              ].map(([value, label, bg]) => (
                <div key={label} className=" p-7" style={{ background: bg }}>
                  <div className="text-4xl font-black tracking-tight text-[var(--ink)] sm:text-5xl">{value}</div>
                  <div className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--ink-2)]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container size="wide">
          <div className=" bg-white p-10 ring-1 ring-[var(--line)] md:p-14">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div>
                <span className="eyebrow text-[var(--ink-3)]">Where we are</span>
                <h2 className="display-3 mt-3">Mumbai-built, India-shipped.</h2>
                <p className="mt-4 max-w-md text-[var(--ink-3)]">
                  Our HQ, warehouse and support floor are co-located in One BKC, Bandra Kurla Complex, Mumbai. Anything we ship has been physically through that building.
                </p>
                <div className="mt-6 flex items-start gap-3 text-sm text-[var(--ink-2)]">
                  <Building size={18} className="mt-0.5 text-[var(--cobalt)]" />
                  <div>
                    <div className="font-semibold">{SITE.contact.address.line1}</div>
                    <div className="text-[var(--ink-3)]">
                      {SITE.contact.address.line2}, {SITE.contact.address.city} {SITE.contact.address.pin}
                    </div>
                    <div className="text-[var(--ink-4)]">{SITE.contact.hours}</div>
                  </div>
                </div>
              </div>
              <div>
                <span className="eyebrow text-[var(--ink-3)]">Get in touch</span>
                <h2 className="display-3 mt-3">Three ways. Pick the fastest.</h2>
                <ul className="mt-6 space-y-4 text-sm text-[var(--ink-2)]">
                  <li>
                    <span className="text-[var(--ink-3)] mr-2">Sales</span>
                    <Link className="font-semibold text-[var(--cobalt)]" href={`mailto:${SITE.contact.salesEmail}`}>
                      {SITE.contact.salesEmail}
                    </Link>
                  </li>
                  <li>
                    <span className="text-[var(--ink-3)] mr-2">Support</span>
                    <Link className="font-semibold text-[var(--cobalt)]" href={`mailto:${SITE.contact.supportEmail}`}>
                      {SITE.contact.supportEmail}
                    </Link>
                  </li>
                  <li>
                    <span className="text-[var(--ink-3)] mr-2">Phone</span>
                    <Link className="font-semibold text-[var(--cobalt)]" href={`tel:${SITE.contact.phone.replace(/\s+/g, "")}`}>
                      {SITE.contact.phone}
                    </Link>
                  </li>
                </ul>
                <Button href="/contact" variant="ink" size="lg" trailingIcon={<ArrowRight />} className="mt-8">
                  Open a support ticket
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

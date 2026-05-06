import { Container } from "@/components/ui/Container";
import { Award, Bolt, Headset, Refresh, Shield, Truck } from "@/components/ui/Icon";
import { SITE } from "@/lib/site";

const USPS = [
  {
    icon: Shield,
    title: "24-month brand warranty",
    body: "Every device ships with an EGS-issued warranty — not a third-party reseller policy. Public terms, logged response times.",
    accent: "var(--mint)",
  },
  {
    icon: Refresh,
    title: "Free replacement on technical defects",
    body: "Manufacturing defects, system failures and component issues are replaced — not 'reviewed', not 'disputed'. Physical damage excluded.",
    accent: "var(--volt-lime)",
  },
  {
    icon: Headset,
    title: "Real humans, 24/7",
    body: `Talk to a real engineer — not a tier-one bot. First response within ${SITE.policies.supportTatHours} hours, on-site within ${SITE.policies.onSiteTatBusinessDays} business days.`,
    accent: "var(--lavender)",
  },
  {
    icon: Truck,
    title: "Bulk procurement, standard",
    body: "Volume pricing kicks in at 10 units. Pre-imaged devices, asset tagging, and a fleet console — included by default.",
    accent: "var(--peach)",
  },
  {
    icon: Bolt,
    title: "Same-week dispatch",
    body: "In-stock orders ship within 48 hours from our Mumbai warehouse. Tracked, insured, signature-on-delivery for high-value SKUs.",
    accent: "var(--sun)",
  },
  {
    icon: Award,
    title: "No grey market",
    body: "We do not sell to resellers. Every box, serial and warranty card is registered against a single end-customer record.",
    accent: "var(--coral-soft)",
  },
];

export function UspSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container size="wide">
        <div className="bg-[var(--ink)] px-6 py-16 sm:px-14 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 bg-[var(--volt-lime)]" />
              <span className="eyebrow text-[var(--volt-lime)]">Why EGS</span>
            </div>
            <h2 className="mt-6 text-balance text-[clamp(2rem,4.5vw+0.5rem,4rem)] font-black leading-[0.95] tracking-[-0.03em] text-white">
              Six reasons{" "}
              <span className="font-display italic font-normal text-[var(--volt-lime)]">not to buy</span>{" "}
              these on the open market.
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-white/70">
              Open-market pricing usually wins until something breaks. EGS is built around the months after the unboxing.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {USPS.map((u) => {
              const Icon = u.icon;
              return (
                <div
                  key={u.title}
                  className="group relative flex flex-col gap-4 overflow-hidden bg-white/[0.04] p-7 ring-1 ring-white/[0.08] transition hover:bg-white/[0.07] hover:ring-white/[0.16]"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center text-[var(--ink)]"
                    style={{ background: u.accent }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-white">{u.title}</h3>
                  <p className="text-sm leading-relaxed text-white/70">{u.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

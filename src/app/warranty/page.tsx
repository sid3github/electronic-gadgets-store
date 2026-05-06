import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Award, Bolt, Refresh, Shield, Headset, Check } from "@/components/ui/Icon";
import { SupportForm } from "@/components/site/SupportForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Warranty & support",
  description: "EGS warranty, replacement and complaint policy with published SLAs and turnaround times.",
};

const COVER = [
  { icon: Shield, title: "Manufacturing defects", body: "Failures originating in components, assembly or factory firmware. Covered for the full warranty period." },
  { icon: Bolt, title: "Premature battery degradation", body: "Capacity below 80% of rated within 12 months of purchase, under typical use." },
  { icon: Refresh, title: "Display, port and input failures", body: "Dead pixels, ghosting, USB-C/HDMI port failures, keyboard or touch surface input issues." },
  { icon: Award, title: "Out-of-the-box defects", body: "Anything unboxing-day. Replaced within 7 days, no questions asked." },
];

const NOT_COVER = [
  "Physical damage from drops, impacts or pressure (unless ruggedized SKU explicitly covers it).",
  "Liquid ingress beyond the device's IP rating.",
  "Unauthorized hardware modifications.",
  "Cosmetic wear (scuffs, scratches that don't affect function).",
  "Damage from non-EGS chargers exceeding rated specifications.",
];

const PROCESS = [
  { step: "01", title: "Open a claim", body: "Submit a claim from this page or email support — include your order reference and device serial." },
  { step: "02", title: "Diagnostic", body: "Our engineer schedules a 15-min remote diagnostic, usually same-day. We confirm if it's a covered defect." },
  { step: "03", title: "Replacement dispatch", body: "If covered, we courier a replacement and a return label. We pay the freight in both directions." },
  { step: "04", title: "Verification", body: "We test the returned device, log the failure mode and update your warranty record. You get a written summary." },
];

export default function WarrantyPage() {
  return (
    <>
      <section className="relative py-20 sm:py-28">
        <Container size="wide">
          <Badge tone="mint" withDot className="mb-5">Warranty & replacement</Badge>
          <h1 className="display-1 max-w-4xl text-balance">
            Free replacement on technical defects.{" "}
            <span className="highlight-lime">In writing.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-[var(--ink-3)]">
            Open-market resellers debate. We replace. EGS covers manufacturing and technical defects for the full warranty period — physical damage explicitly excluded, every other condition listed below.
          </p>
        </Container>
      </section>

      <section className="py-10">
        <Container size="wide">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              ["24+", "month standard warranty", "var(--mint)"],
              ["7", "day OOB replacement", "var(--volt-lime)"],
              [`${SITE.policies.supportTatHours}h`, "first-response SLA", "var(--lavender)"],
              [`${SITE.policies.onSiteTatBusinessDays}d`, "on-site (metro) TAT", "var(--peach)"],
            ].map(([value, label, bg]) => (
              <div key={label} className=" p-7" style={{ background: bg }}>
                <div className="text-4xl font-black tracking-tight text-[var(--ink)] sm:text-5xl">{value}</div>
                <div className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--ink-2)]">{label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="display-3">What's covered</h2>
              <p className="mt-2 text-[var(--ink-3)]">All technical defects originating in hardware or factory software.</p>
              <ul className="mt-6 space-y-3">
                {COVER.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.title} className="flex items-start gap-3 bg-white p-5 ring-1 ring-[var(--line)]">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--mint)] text-[var(--ink)]">
                        <Icon size={18} />
                      </span>
                      <div>
                        <h3 className="font-bold text-[var(--ink)]">{item.title}</h3>
                        <p className="mt-1 text-sm text-[var(--ink-3)]">{item.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h2 className="display-3">Not covered</h2>
              <p className="mt-2 text-[var(--ink-3)]">In the spirit of "no surprises" — these are the explicit exclusions.</p>
              <ul className="mt-6 space-y-3">
                {NOT_COVER.map((line) => (
                  <li key={line} className="flex items-start gap-3 bg-[var(--coral-soft)] p-5 text-sm text-[var(--ink-2)]">
                    <span className="mt-0.5 inline-flex h-2 w-2 shrink-0 bg-[var(--coral)]" />
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-[var(--volt-lime)] p-5 text-sm text-[var(--ink)]">
                <span className="font-bold">Want accidental cover?</span>{" "}
                Add EGS Care+ at checkout for an extended warranty that includes accidental damage. Bulk orders qualify automatically.
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="tat" className="scroll-mt-32 py-16">
        <Container size="wide">
          <h2 className="display-3">Complaint resolution & TAT</h2>
          <p className="mt-2 max-w-2xl text-[var(--ink-3)]">
            Every complaint is logged with a ticket number. The status, owner and ETA are visible to you and to your account manager.
          </p>
          <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <li key={p.step} className="flex flex-col gap-3 bg-white p-6 ring-1 ring-[var(--line)]">
                <span className="inline-flex h-9 w-9 items-center justify-center bg-[var(--ink)] font-mono text-xs font-bold text-[var(--volt-lime)]">{p.step}</span>
                <h3 className="text-base font-bold text-[var(--ink)]">{p.title}</h3>
                <p className="text-sm text-[var(--ink-3)]">{p.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Acknowledgement", `≤ ${SITE.policies.supportTatHours} hours`, "From submitted-ticket timestamp"],
              ["Diagnostic & decision", "≤ 48 hours", "Covered or not — communicated in writing"],
              ["Replacement dispatch", "≤ 5 business days", "If covered, after device receipt"],
            ].map(([title, sla, sub]) => (
              <div key={title} className=" bg-[var(--cobalt-soft)] p-6">
                <h3 className="eyebrow text-[var(--cobalt)]">{title}</h3>
                <div className="mt-2 font-mono text-2xl font-bold text-[var(--ink)]">{sla}</div>
                <p className="mt-1 text-xs text-[var(--ink-3)]">{sub}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Badge tone="lime" withDot>Open a claim</Badge>
              <h2 className="display-2 mt-4">Need a replacement?</h2>
              <p className="mt-3 text-[var(--ink-3)]">
                File a warranty claim using the form on the right. Have your device serial and order reference handy — both speed up routing significantly.
              </p>
              <div className="mt-6 flex flex-col gap-3 text-sm text-[var(--ink-2)]">
                <span className="inline-flex items-center gap-2"><Headset size={16} className="text-[var(--cobalt)]" /> Support · {SITE.contact.supportEmail}</span>
                <span className="inline-flex items-center gap-2"><Bolt size={16} className="text-[var(--cobalt)]" /> Phone · {SITE.contact.phone}</span>
              </div>
              <Button href="/contact" variant="secondary" trailingIcon={<ArrowRight />} className="mt-6">
                More contact options
              </Button>
            </div>
            <div className="lg:col-span-7">
              <SupportForm defaultTopic="warranty" formId="warranty-form" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

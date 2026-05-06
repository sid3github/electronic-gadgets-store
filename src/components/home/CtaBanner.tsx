import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Mail, Phone } from "@/components/ui/Icon";
import { SITE } from "@/lib/site";

export function CtaBanner() {
  return (
    <section className="py-20 sm:py-28">
      <Container size="wide">
        <div className="relative overflow-hidden bg-[var(--cobalt)] p-10 sm:p-14 md:p-20">
          {/* big cobalt poster */}
          <svg
            aria-hidden
            viewBox="0 0 800 400"
            preserveAspectRatio="xMidYMid slice"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
          >
            <circle cx="700" cy="60" r="160" fill="var(--volt-lime)" />
            <circle cx="100" cy="380" r="140" fill="var(--coral)" />
            <path d="M 0 200 Q 200 140, 400 200 T 800 200" stroke="white" strokeWidth="2" fill="none" opacity="0.3" />
          </svg>
          <div className="relative grid grid-cols-1 items-end gap-10 md:grid-cols-2">
            <div className="max-w-xl text-white">
              <span className="eyebrow text-white/70">Procurement at scale</span>
              <h2 className="mt-3 text-balance text-[clamp(2rem,4.5vw+0.5rem,4rem)] font-black leading-[0.95] tracking-[-0.03em] text-white">
                Equipping a school,{" "}
                <span className="font-display italic font-normal text-[var(--volt-lime)]">campus or chain?</span>
              </h2>
              <p className="mt-4 text-base text-white/85">
                Tell us the rollout. We'll build the spec, the imaging, the delivery schedule and the warranty book — usually inside two weeks.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact#bulk" variant="lime" size="lg" trailingIcon={<ArrowRight />}>
                  Talk to procurement
                </Button>
                <Button href="/products" variant="secondary" size="lg">
                  Browse SKUs
                </Button>
              </div>
            </div>
            <ul className="flex flex-col gap-3 bg-white/10 p-6 ring-1 ring-white/20 backdrop-blur-sm">
              <li className="flex items-center justify-between gap-3 border-b border-white/15 pb-3">
                <span className="text-sm font-semibold text-white/70">Sales</span>
                <a href={`mailto:${SITE.contact.salesEmail}`} className="text-sm font-bold text-white inline-flex items-center gap-1.5">
                  <Mail size={14} /> {SITE.contact.salesEmail}
                </a>
              </li>
              <li className="flex items-center justify-between gap-3 border-b border-white/15 pb-3">
                <span className="text-sm font-semibold text-white/70">Phone</span>
                <a href={`tel:${SITE.contact.phone.replace(/\s+/g, "")}`} className="text-sm font-bold text-white inline-flex items-center gap-1.5">
                  <Phone size={14} /> {SITE.contact.phone}
                </a>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-white/70">Bulk minimum</span>
                <span className="text-sm font-bold text-[var(--volt-lime)]">10 units</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

import { Bolt, Shield, Truck, Tag } from "@/components/ui/Icon";

const items = [
  { icon: <Bolt />, text: "Free shipping across India on orders ≥ ₹25,000" },
  { icon: <Shield />, text: "24-month warranty + free replacement on technical defects" },
  { icon: <Truck />, text: "Bulk procurement? Bulk discounts kick in at 10 units" },
  { icon: <Tag />, text: "EDU Q2 — 8% off classroom bundles. Code: EDUQ226" },
  { icon: <Shield />, text: "Direct-from-brand. No grey market resellers." },
];

export function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden bg-[var(--ink)] text-[var(--paper)]">
      <div className="relative flex h-9 items-center">
        <div className="flex animate-ticker whitespace-nowrap will-change-transform">
          {[...items, ...items].map((item, idx) => (
            <span
              key={idx}
              className="mx-8 inline-flex items-center gap-2 text-[12px] font-medium"
            >
              <span className="text-[var(--volt-lime)]">{item.icon}</span>
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

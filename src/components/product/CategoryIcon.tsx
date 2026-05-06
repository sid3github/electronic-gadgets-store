import type { CategoryMeta } from "@/lib/types";

const SIZE = { sm: 28, md: 40, lg: 56 } as const;

export function CategoryIcon({ slug, size = "md" }: { slug: CategoryMeta["iconKey"]; size?: keyof typeof SIZE }) {
  const s = SIZE[size];
  const common = {
    width: s,
    height: s,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (slug) {
    case "tablet":
      return (
        <svg {...common}>
          <rect x="14" y="6" width="20" height="36" rx="3" />
          <line x1="20" y1="38" x2="28" y2="38" />
          <line x1="14" y1="11" x2="34" y2="11" />
          <line x1="14" y1="33" x2="34" y2="33" />
        </svg>
      );
    case "laptop":
      return (
        <svg {...common}>
          <rect x="8" y="12" width="32" height="22" rx="2" />
          <line x1="14" y1="18" x2="34" y2="18" />
          <line x1="14" y1="24" x2="28" y2="24" />
          <path d="M4 38h40l-2 4H6Z" />
        </svg>
      );
    case "smartboard":
      return (
        <svg {...common}>
          <rect x="6" y="8" width="36" height="26" rx="2" />
          <path d="M14 28c4-8 10-8 14 0" />
          <circle cx="14" cy="28" r="1.5" />
          <circle cx="28" cy="28" r="1.5" />
          <line x1="20" y1="38" x2="28" y2="38" />
          <line x1="24" y1="34" x2="24" y2="42" />
        </svg>
      );
    case "kiosk":
      return (
        <svg {...common}>
          <rect x="14" y="6" width="20" height="28" rx="2" />
          <line x1="20" y1="14" x2="28" y2="14" />
          <line x1="18" y1="20" x2="30" y2="20" />
          <line x1="18" y1="26" x2="26" y2="26" />
          <path d="M12 34h24l2 8H10Z" />
        </svg>
      );
    case "peripheral":
      return (
        <svg {...common}>
          <rect x="8" y="20" width="32" height="14" rx="3" />
          <line x1="14" y1="26" x2="14" y2="28" />
          <line x1="20" y1="26" x2="20" y2="28" />
          <line x1="26" y1="26" x2="26" y2="28" />
          <line x1="32" y1="26" x2="32" y2="28" />
          <path d="M24 20v-8M20 12h8" />
        </svg>
      );
  }
}

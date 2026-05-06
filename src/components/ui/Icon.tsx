import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const baseProps = (size = 16) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function CartIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M3 3h2l2.5 12.5a2 2 0 0 0 2 1.5h8.5a2 2 0 0 0 2-1.5L22 7H6" />
      <circle cx="9" cy="21" r="1" />
      <circle cx="18" cy="21" r="1" />
    </svg>
  );
}

export function ArrowRight({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export function Check({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="m5 12 4.5 4.5L20 6" />
    </svg>
  );
}

export function Shield({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function Bolt({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M13 3 4 14h7l-1 7 9-11h-7l1-7Z" />
    </svg>
  );
}

export function Truck({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7" />
      <circle cx="7.5" cy="18" r="2" />
      <circle cx="17.5" cy="18" r="2" />
    </svg>
  );
}

export function Headset({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 14h3v5H5a1 1 0 0 1-1-1v-4Z" />
      <path d="M20 14h-3v5h2a1 1 0 0 0 1-1v-4Z" />
      <path d="M17 19a4 4 0 0 1-4 3" />
    </svg>
  );
}

export function Tag({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M3 12V4h8l10 10-8 8L3 12Z" />
      <circle cx="8" cy="8" r="1.5" />
    </svg>
  );
}

export function Search({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function Star({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest} fill="currentColor" stroke="none">
      <path d="M12 2 14.6 9h7.4l-6 4.5 2.3 7.5L12 16.5 5.7 21l2.3-7.5-6-4.5h7.4Z" />
    </svg>
  );
}

export function StarOutline({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M12 2 14.6 9h7.4l-6 4.5 2.3 7.5L12 16.5 5.7 21l2.3-7.5-6-4.5h7.4Z" />
    </svg>
  );
}

export function Plus({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Minus({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function Trash({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="M6 7v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

export function MapPin({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M12 22s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function Phone({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function Mail({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 7 9-7" />
    </svg>
  );
}

export function Menu({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function X({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function Filter({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M3 5h18l-7 9v6l-4-2v-4L3 5Z" />
    </svg>
  );
}

export function Refresh({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M3 12a9 9 0 0 1 16-5.5L21 5" />
      <path d="M21 5v5h-5" />
      <path d="M21 12a9 9 0 0 1-16 5.5L3 19" />
      <path d="M3 19v-5h5" />
    </svg>
  );
}

export function Award({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <circle cx="12" cy="9" r="6" />
      <path d="m9 14-1.5 7L12 19l4.5 2L15 14" />
    </svg>
  );
}

export function Cpu({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
    </svg>
  );
}

export function Building({ size, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
      <path d="M9 21v-3h6v3" />
    </svg>
  );
}

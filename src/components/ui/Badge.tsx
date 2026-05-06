import type { ReactNode } from "react";

type Tone = "ink" | "lime" | "cobalt" | "coral" | "mint" | "sun" | "lavender" | "soft";

const toneClass: Record<Tone, string> = {
  ink: "bg-[var(--ink)] text-white",
  lime: "bg-[var(--volt-lime)] text-[var(--ink)]",
  cobalt: "bg-[var(--cobalt-soft)] text-[var(--cobalt)]",
  coral: "bg-[var(--coral-soft)] text-[var(--coral)]",
  mint: "bg-[var(--mint)] text-[var(--ink)]",
  sun: "bg-[var(--sun)] text-[var(--ink)]",
  lavender: "bg-[var(--lavender)] text-[var(--ink)]",
  soft: "bg-[var(--paper-tint)] text-[var(--ink-2)]",
};

export function Badge({
  children,
  tone = "ink",
  className = "",
  withDot = false,
  size = "md",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  withDot?: boolean;
  size?: "sm" | "md";
}) {
  const sizeCls = size === "sm" ? "h-6 px-2.5 text-[10px]" : "h-7 px-3 text-[11px]";
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-[0.08em] ${sizeCls} ${toneClass[tone]} ${className}`}
    >
      {withDot ? <span className="h-1.5 w-1.5 bg-current animate-pulse" /> : null}
      {children}
    </span>
  );
}

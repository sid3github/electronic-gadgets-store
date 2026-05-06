import Link from "next/link";

/**
 * EGS — premium typographic identity.
 * Heavy lowercase "egs" wordmark with a single chromatic period as the
 * brand tell. No competing icon — the type carries the mark, like Sonos / Rains.
 *
 * Variants:
 *   <Logo />        wordmark used in the site header (mark + tagline optional)
 *   <LogoMark />    compact icon for footer/avatars/email
 */

export function LogoMark({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`relative inline-flex items-center justify-center bg-[var(--ink)] text-white ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" width={size * 0.7} height={size * 0.7}>
        <text
          x="50"
          y="64"
          textAnchor="middle"
          fontSize="58"
          fontWeight="900"
          letterSpacing="-3"
          fontFamily="var(--font-geist-sans), system-ui, sans-serif"
          fill="currentColor"
        >
          egs
        </text>
      </svg>
      <span
        aria-hidden
        className="absolute right-2.5 top-2.5 h-1.5 w-1.5 bg-[var(--volt-lime)]"
      />
    </span>
  );
}

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const wordSize =
    size === "sm" ? "text-[26px]" : size === "lg" ? "text-[44px]" : "text-[34px]";
  const taglineSize = size === "sm" ? "text-[8px]" : "text-[9px]";

  return (
    <Link
      href="/"
      className="group inline-flex items-end gap-0 leading-none text-[var(--ink)]"
      aria-label="Electronic Gadgets Store — Home"
    >
      <span className={`inline-flex items-end ${wordSize} font-black tracking-[-0.06em]`}>
        <span>egs</span>
        <span
          aria-hidden
          className="ml-[1px] inline-block h-[0.18em] w-[0.18em] translate-y-[-0.04em] bg-[var(--volt-lime)] transition-transform duration-300 group-hover:scale-150"
        />
      </span>
      {size !== "sm" ? (
        <span
          className={`ml-3 hidden flex-col gap-1 self-center font-mono ${taglineSize} font-semibold uppercase leading-tight tracking-[0.2em] text-[var(--ink-3)] sm:flex`}
        >
          <span>Electronic</span>
          <span>Gadgets</span>
          <span>Store</span>
        </span>
      ) : null}
    </Link>
  );
}

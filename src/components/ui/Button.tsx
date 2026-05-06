import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "ink" | "lime" | "danger";
type Size = "sm" | "md" | "lg";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-[var(--orange)] text-white hover:bg-[var(--orange-deep)] shadow-sm",
  secondary:
    "bg-white text-[var(--ink)] border border-[var(--line-strong)] hover:bg-[var(--ink)] hover:text-white hover:border-[var(--ink)]",
  ghost:
    "bg-transparent text-[var(--ink)] hover:bg-[var(--paper-tint)]",
  ink:
    "bg-[var(--ink)] text-white hover:bg-[var(--orange)]",
  lime:
    "bg-[var(--orange)] text-white hover:bg-[var(--orange-deep)] shadow-sm",
  danger:
    "bg-[var(--coral-soft)] text-[var(--coral)] border border-[var(--coral)] hover:bg-[var(--coral)] hover:text-white",
};

const sizeClass: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-14 px-7 text-base gap-2.5",
};

const baseClass =
  "inline-flex cursor-pointer items-center justify-center font-semibold tracking-tight transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--volt-lime)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
};

type AnchorProps = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;
type ButtonProps = CommonProps & { href?: undefined } & ComponentPropsWithoutRef<"button">;

export function Button(props: ButtonProps | AnchorProps) {
  const {
    variant = "primary",
    size = "md",
    children,
    leadingIcon,
    trailingIcon,
    className = "",
    ...rest
  } = props;

  const cls = `${baseClass} ${variantClass[variant]} ${sizeClass[size]} ${className}`;
  const inner = (
    <>
      {leadingIcon ? <span className="-ml-1 flex h-4 w-4 items-center">{leadingIcon}</span> : null}
      <span className="whitespace-nowrap">{children}</span>
      {trailingIcon ? <span className="-mr-1 flex h-4 w-4 items-center">{trailingIcon}</span> : null}
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest as AnchorProps;
    return (
      <Link href={href} className={cls} {...linkRest}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" className={cls} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {inner}
    </button>
  );
}

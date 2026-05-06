import type { ComponentPropsWithoutRef, ReactNode } from "react";

const fieldShellClass =
  "block w-full border border-[var(--line-strong)] bg-white px-4 py-3 text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-4)] transition focus:border-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--volt-lime)]/40";

export function Label({
  htmlFor,
  children,
  hint,
  required,
}: {
  htmlFor: string;
  children: ReactNode;
  hint?: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline justify-between text-sm font-semibold text-[var(--ink)]">
      <span>
        {children}
        {required ? <span className="ml-0.5 text-[var(--coral)]">*</span> : null}
      </span>
      {hint ? <span className="text-xs font-medium text-[var(--ink-4)]">{hint}</span> : null}
    </label>
  );
}

export function Input(props: ComponentPropsWithoutRef<"input">) {
  const { className = "", ...rest } = props;
  return <input className={`${fieldShellClass} ${className}`} {...rest} />;
}

export function Textarea(props: ComponentPropsWithoutRef<"textarea">) {
  const { className = "", ...rest } = props;
  return <textarea className={`${fieldShellClass} resize-y min-h-[120px] ${className}`} {...rest} />;
}

export function Select(props: ComponentPropsWithoutRef<"select">) {
  const { className = "", ...rest } = props;
  return <select className={`${fieldShellClass} appearance-none ${className}`} {...rest} />;
}

export function FieldRow({ children, columns = 2 }: { children: ReactNode; columns?: 1 | 2 | 3 }) {
  const cls = columns === 1 ? "grid-cols-1" : columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3";
  return <div className={`grid gap-4 ${cls}`}>{children}</div>;
}

export function HelperText({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "danger" | "success" }) {
  const color = tone === "danger" ? "text-[var(--coral)]" : tone === "success" ? "text-[#1a7f4f]" : "text-[var(--ink-4)]";
  return <p className={`mt-1.5 text-xs ${color}`}>{children}</p>;
}

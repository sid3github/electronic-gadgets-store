import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  const alignmentBlock = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-3 ${alignmentBlock} ${align === "center" ? "max-w-2xl" : ""}`}>
      <div className={`flex w-full ${align === "center" ? "justify-center" : "justify-between"} items-end gap-6 flex-wrap`}>
        <div className={`flex flex-col gap-3 ${align === "center" ? "items-center" : "items-start"}`}>
          {eyebrow ? (
            <div className="inline-flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 bg-[var(--volt-lime)]" />
              <span className="eyebrow text-[var(--ink-3)]">{eyebrow}</span>
            </div>
          ) : null}
          <h2 className="display-2 text-balance text-[var(--ink)]">{title}</h2>
          {description ? (
            <p className={`text-pretty text-[var(--ink-3)] ${align === "center" ? "max-w-xl" : "max-w-2xl"} text-base sm:text-lg leading-relaxed`}>{description}</p>
          ) : null}
        </div>
        {action && align !== "center" ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}

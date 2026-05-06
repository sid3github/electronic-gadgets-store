import { Star, StarOutline } from "@/components/ui/Icon";

export function Rating({ value, count, size = 14 }: { value: number; count?: number; size?: number }) {
  const filled = Math.round(value);
  return (
    <div className="inline-flex items-center gap-2 text-sm">
      <span className="inline-flex items-center gap-0.5 text-[var(--ink)]">
        {Array.from({ length: 5 }).map((_, i) =>
          i < filled ? <Star key={i} size={size} /> : <StarOutline key={i} size={size} className="opacity-30" />,
        )}
      </span>
      <span className="font-mono text-xs text-[var(--ink-2)]">{value.toFixed(1)}</span>
      {typeof count === "number" ? <span className="text-xs text-[var(--ink-4)]">({count.toLocaleString()})</span> : null}
    </div>
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Fade-up on scroll using IntersectionObserver — light, no library. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            window.setTimeout(() => el.classList.add("is-visible"), delay);
            obs.unobserve(el);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  const TagComponent = Tag as "div";
  return (
    <TagComponent
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${className}`}
    >
      {children}
    </TagComponent>
  );
}

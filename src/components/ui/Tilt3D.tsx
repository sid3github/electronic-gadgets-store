"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Max rotation in degrees on each axis — default 10° */
  max?: number;
  /** Scale on hover — default 1.02 */
  scale?: number;
  /** Whether to render a cursor-following shine highlight overlay */
  shine?: boolean;
  /** Make the inner box use preserve-3d so children with translateZ pop forward */
  parallax?: boolean;
  className?: string;
  innerClassName?: string;
};

/**
 * Tilt3D — wraps a card in mouse-tracked perspective tilt with
 * optional cursor-following shine and parallax depth.
 * Children that want to pop forward should add `transform-[translateZ(40px)]`
 * or use depth-near / depth-mid / depth-back utility classes.
 */
export function Tilt3D({
  children,
  max = 5,
  scale = 1.01,
  shine = true,
  parallax = true,
  className = "",
  innerClassName = "",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * max;     // tilt up when cursor up
    const ry = (px - 0.5) * max;     // tilt right when cursor right
    el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
  };

  const onLeave = () => {
    const el = wrapRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-3d h-full ${className}`}
      style={
        {
          "--rx": "0deg",
          "--ry": "0deg",
          "--mx": "50%",
          "--my": "50%",
          "--tilt-scale": scale,
        } as CSSProperties
      }
    >
      <div className={`tilt-3d-inner h-full ${parallax ? "tilt-3d-parallax" : ""} ${innerClassName}`}>
        {children}
        {shine ? <span className="tilt-3d-shine" aria-hidden /> : null}
      </div>
    </div>
  );
}

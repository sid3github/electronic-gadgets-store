import type { Product } from "@/lib/types";

export type ProductView = "front" | "angle" | "side" | "back";

type Props = {
  product: Pick<Product, "artVariant" | "artHue" | "name" | "brand">;
  size?: "card" | "feature" | "hero";
  view?: ProductView;
  className?: string;
};

const SIZE = {
  card: { w: 360, h: 260 },
  feature: { w: 640, h: 460 },
  hero: { w: 800, h: 600 },
};

export function ProductArt({ product, size = "card", view = "front", className = "" }: Props) {
  const dims = SIZE[size];
  const hue = product.artHue;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: hue,
        aspectRatio: `${dims.w} / ${dims.h}`,
      }}
    >
      <BackdropShapes hue={hue} view={view} />
      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
        {product.artVariant === "tablet" ? <TabletGlyph view={view} brand={product.brand} /> : null}
        {product.artVariant === "laptop" ? <LaptopGlyph view={view} brand={product.brand} /> : null}
        {product.artVariant === "smartboard" ? <SmartboardGlyph view={view} brand={product.brand} /> : null}
        {product.artVariant === "kiosk" ? <KioskGlyph view={view} brand={product.brand} /> : null}
        {product.artVariant === "peripheral" ? <PeripheralGlyph view={view} brand={product.brand} /> : null}
      </div>
    </div>
  );
}

function BackdropShapes({ hue, view }: { hue: string; view: ProductView }) {
  // Slight backdrop variation per view so thumbnails feel different
  const shift = view === "front" ? 0 : view === "angle" ? 60 : view === "side" ? 120 : 180;
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 800 600"
      aria-hidden
    >
      <defs>
        <linearGradient id={`bg-${shift}`} x1="0" y1="0" x2="800" y2="600" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={hue} />
          <stop offset="100%" stopColor={shade(hue, -8)} />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill={`url(#bg-${shift})`} />
      <circle cx={650 - shift} cy="120" r="120" fill="rgba(255,255,255,0.32)" />
      <path d="M 0 540 A 200 200 0 0 1 400 540 Z" fill="rgba(10,10,10,0.05)" />
    </svg>
  );
}

const INK = "#0c0e1c";
const PAPER = "#ffffff";
const SHADOW = "rgba(10,10,10,0.18)";

/* ─────────────────── TABLET ─────────────────── */
function TabletGlyph({ view, brand }: { view: ProductView; brand: string }) {
  if (view === "front") return <TabletFront />;
  if (view === "angle") return <TabletAngle />;
  if (view === "side") return <TabletSide />;
  return <TabletBack brand={brand} />;
}

function TabletFront() {
  return (
    <svg viewBox="0 0 400 320" className="h-full w-full" aria-hidden>
      <ellipse cx="200" cy="290" rx="140" ry="14" fill={SHADOW} />
      <g transform="translate(120, 25)">
        <rect x="0" y="0" width="160" height="270" fill={INK} />
        <rect x="6" y="6" width="148" height="258" fill={PAPER} />
        <circle cx="80" cy="14" r="2" fill={INK} fillOpacity="0.3" />
        <rect x="18" y="22" width="60" height="6" fill={INK} />
        <rect x="18" y="34" width="120" height="3" fill={INK} fillOpacity="0.3" />
        <rect x="18" y="42" width="100" height="3" fill={INK} fillOpacity="0.3" />
        <rect x="18" y="58" width="55" height="55" fill="#ff8a3d" />
        <rect x="83" y="58" width="55" height="55" fill="#f0e2d0" />
        <rect x="18" y="123" width="55" height="55" fill="#ffd0a8" />
        <rect x="83" y="123" width="55" height="55" fill="#ff5a1f" />
        <rect x="18" y="195" width="120" height="40" fill={INK} fillOpacity="0.06" />
        <circle cx="38" cy="215" r="6" fill={INK} />
        <circle cx="58" cy="215" r="6" fill={INK} fillOpacity="0.4" />
        <circle cx="78" cy="215" r="6" fill={INK} fillOpacity="0.4" />
      </g>
      <g transform="translate(290, 60) rotate(35)">
        <rect x="0" y="0" width="10" height="180" fill={INK} />
        <rect x="0" y="0" width="10" height="60" fill="#ff8a3d" />
        <polygon points="0,0 10,0 5,-12" fill={INK} />
      </g>
    </svg>
  );
}

function TabletAngle() {
  return (
    <svg viewBox="0 0 400 320" className="h-full w-full" aria-hidden>
      <ellipse cx="200" cy="295" rx="160" ry="14" fill={SHADOW} />
      {/* perspective tablet — front face */}
      <g>
        <polygon points="100,40 270,30 270,270 100,280" fill={INK} />
        <polygon points="106,46 264,37 264,264 106,274" fill={PAPER} />
        {/* screen content angled */}
        <rect x="118" y="60" width="50" height="5" fill={INK} />
        <rect x="118" y="72" width="100" height="2" fill={INK} fillOpacity="0.3" />
        <rect x="118" y="85" width="50" height="50" fill="#ff8a3d" />
        <rect x="178" y="83" width="50" height="50" fill="#f0e2d0" />
        <rect x="118" y="148" width="50" height="50" fill="#ffd0a8" />
        <rect x="178" y="146" width="50" height="50" fill="#ff5a1f" />
      </g>
      {/* edge / side — receding */}
      <polygon points="270,30 300,40 300,260 270,270" fill={shade(INK, 30)} />
      {/* USB-C port hint on side */}
      <rect x="280" y="155" width="14" height="3" fill="#666" />
    </svg>
  );
}

function TabletSide() {
  return (
    <svg viewBox="0 0 400 320" className="h-full w-full" aria-hidden>
      <ellipse cx="200" cy="280" rx="100" ry="10" fill={SHADOW} />
      {/* very thin profile */}
      <rect x="100" y="40" width="200" height="220" fill={INK} />
      <rect x="103" y="40" width="194" height="220" fill={shade(INK, 25)} />
      {/* glass sliver */}
      <rect x="100" y="40" width="3" height="220" fill={PAPER} fillOpacity="0.95" />
      {/* ports */}
      <rect x="160" y="258" width="22" height="3" fill="#444" />
      <rect x="220" y="258" width="6" height="3" fill="#444" />
      <rect x="232" y="258" width="6" height="3" fill="#444" />
      {/* volume buttons */}
      <rect x="100" y="100" width="3" height="14" fill={INK} />
      <rect x="100" y="120" width="3" height="22" fill={INK} />
      {/* power */}
      <rect x="297" y="100" width="3" height="22" fill={INK} />
      {/* thinness label */}
      <line x1="100" y1="280" x2="300" y2="280" stroke={INK} strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
    </svg>
  );
}

function TabletBack({ brand }: { brand: string }) {
  return (
    <svg viewBox="0 0 400 320" className="h-full w-full" aria-hidden>
      <ellipse cx="200" cy="290" rx="140" ry="14" fill={SHADOW} />
      <g transform="translate(120, 25)">
        {/* rear casing — slightly different shade */}
        <rect x="0" y="0" width="160" height="270" fill={shade(INK, 18)} />
        <rect x="6" y="6" width="148" height="258" fill={shade(INK, 22)} />
        {/* camera bump — top-left corner */}
        <rect x="18" y="20" width="58" height="58" fill={INK} />
        <circle cx="34" cy="36" r="9" fill="#0a0c18" stroke="#3a4258" strokeWidth="1.5" />
        <circle cx="34" cy="36" r="4" fill="#1a2333" />
        <circle cx="56" cy="36" r="6" fill="#0a0c18" stroke="#3a4258" strokeWidth="1" />
        <circle cx="34" cy="58" r="3" fill="#ff8a3d" />
        <circle cx="56" cy="58" r="3" fill="#0a0c18" />
        {/* brand wordmark on back */}
        <text
          x="80"
          y="160"
          textAnchor="middle"
          fontSize="14"
          fontWeight="900"
          letterSpacing="-0.5"
          fontFamily="var(--font-geist-sans), system-ui, sans-serif"
          fill={PAPER}
          fillOpacity="0.92"
        >
          {brand.toLowerCase()}
        </text>
        <line x1="56" y1="172" x2="104" y2="172" stroke={PAPER} strokeOpacity="0.3" strokeWidth="1" />
      </g>
    </svg>
  );
}

/* ─────────────────── LAPTOP ─────────────────── */
function LaptopGlyph({ view, brand }: { view: ProductView; brand: string }) {
  if (view === "front") return <LaptopFront />;
  if (view === "angle") return <LaptopAngle />;
  if (view === "side") return <LaptopSide />;
  return <LaptopBack brand={brand} />;
}

function LaptopFront() {
  return (
    <svg viewBox="0 0 460 320" className="h-full w-full" aria-hidden>
      <ellipse cx="230" cy="290" rx="180" ry="14" fill={SHADOW} />
      <g>
        <path d="M 70 40 L 390 40 L 390 220 L 70 220 Z" fill={INK} />
        <rect x="80" y="50" width="300" height="160" fill={PAPER} />
        <rect x="92" y="64" width="60" height="6" fill={INK} />
        <rect x="92" y="78" width="180" height="3" fill={INK} fillOpacity="0.3" />
        <rect x="92" y="86" width="140" height="3" fill={INK} fillOpacity="0.3" />
        <rect x="92" y="100" width="80" height="80" fill="#ff8a3d" />
        <rect x="180" y="100" width="80" height="80" fill="#f0e2d0" />
        <rect x="268" y="100" width="80" height="80" fill="#ff5a1f" />
        <rect x="92" y="186" width="120" height="6" fill={INK} />
        <path d="M 50 220 L 410 220 L 430 250 L 30 250 Z" fill={INK} />
        <rect x="200" y="226" width="60" height="10" fill={PAPER} fillOpacity="0.4" />
      </g>
    </svg>
  );
}

function LaptopAngle() {
  return (
    <svg viewBox="0 0 460 320" className="h-full w-full" aria-hidden>
      <ellipse cx="230" cy="295" rx="190" ry="14" fill={SHADOW} />
      {/* base from 3/4 angle */}
      <polygon points="50,250 410,230 440,260 30,275" fill={INK} />
      <polygon points="80,253 380,235 380,242 80,260" fill={shade(INK, 30)} />
      {/* keyboard hint */}
      <g opacity="0.6">
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 12 }).map((_, c) => (
            <rect
              key={`${r}-${c}`}
              x={100 + c * 23}
              y={228 + r * 4}
              width="18"
              height="2.5"
              fill={shade(INK, 50)}
            />
          )),
        )}
      </g>
      {/* lid open at angle — left edge taller, right shorter, perspective */}
      <polygon points="60,40 380,28 410,225 50,250" fill={INK} />
      <polygon points="72,52 366,42 392,222 72,242" fill={PAPER} />
      {/* screen content */}
      <rect x="84" y="62" width="60" height="5" fill={INK} />
      <rect x="84" y="74" width="120" height="3" fill={INK} fillOpacity="0.3" />
      <rect x="84" y="92" width="70" height="70" fill="#ff8a3d" />
      <rect x="158" y="89" width="70" height="70" fill="#f0e2d0" />
      <rect x="232" y="86" width="70" height="70" fill="#ff5a1f" />
    </svg>
  );
}

function LaptopSide() {
  return (
    <svg viewBox="0 0 460 320" className="h-full w-full" aria-hidden>
      <ellipse cx="230" cy="270" rx="170" ry="10" fill={SHADOW} />
      {/* closed laptop — pure thin profile */}
      <g transform="translate(60, 200)">
        <rect width="340" height="14" fill={INK} />
        <rect x="0" y="0" width="340" height="2" fill={shade(INK, 50)} />
        {/* hinge break line */}
        <line x1="0" y1="14" x2="340" y2="14" stroke="#3a4258" strokeWidth="1" />
        {/* ports */}
        <rect x="40" y="6" width="22" height="3" fill="#444" />
        <rect x="70" y="6" width="22" height="3" fill="#444" />
        <rect x="100" y="6" width="6" height="3" fill="#444" />
        <rect x="240" y="6" width="22" height="3" fill="#444" />
        <rect x="270" y="6" width="22" height="3" fill="#444" />
      </g>
      {/* dimension callouts */}
      <line x1="60" y1="234" x2="400" y2="234" stroke={INK} strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
      <text x="230" y="252" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono), ui-monospace" fill={INK} fillOpacity="0.5" letterSpacing="0.1em">
        14.2 mm
      </text>
    </svg>
  );
}

function LaptopBack({ brand }: { brand: string }) {
  return (
    <svg viewBox="0 0 460 320" className="h-full w-full" aria-hidden>
      <ellipse cx="230" cy="290" rx="180" ry="14" fill={SHADOW} />
      {/* closed lid view from above */}
      <g>
        <rect x="60" y="40" width="340" height="220" fill={shade(INK, 20)} />
        {/* rear vents */}
        <g opacity="0.4">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x={80 + i * 28} y={56} width="14" height="3" fill={INK} />
          ))}
        </g>
        {/* brand wordmark on lid */}
        <text
          x="230"
          y="160"
          textAnchor="middle"
          fontSize="22"
          fontWeight="900"
          letterSpacing="-0.5"
          fontFamily="var(--font-geist-sans), system-ui, sans-serif"
          fill={PAPER}
          fillOpacity="0.95"
        >
          {brand.toLowerCase()}
        </text>
        <circle cx="262" cy="158" r="3" fill="#ff8a3d" />
        {/* hinge bar */}
        <rect x="140" y="252" width="180" height="6" fill={INK} />
        <rect x="140" y="246" width="180" height="2" fill={shade(INK, 40)} />
      </g>
    </svg>
  );
}

/* ─────────────────── SMARTBOARD ─────────────────── */
function SmartboardGlyph({ view, brand }: { view: ProductView; brand: string }) {
  if (view === "front") return <SmartboardFront />;
  if (view === "angle") return <SmartboardAngle />;
  if (view === "side") return <SmartboardSide />;
  return <SmartboardBack brand={brand} />;
}

function SmartboardFront() {
  return (
    <svg viewBox="0 0 460 320" className="h-full w-full" aria-hidden>
      <ellipse cx="230" cy="298" rx="100" ry="10" fill={SHADOW} />
      <rect x="40" y="20" width="380" height="240" fill={INK} />
      <rect x="50" y="30" width="360" height="220" fill={PAPER} />
      <path d="M 80 200 Q 140 80 220 150 T 380 80" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="80" cy="200" r="6" fill="#ff8a3d" stroke={INK} strokeWidth="2" />
      <circle cx="220" cy="150" r="6" fill="#f0e2d0" stroke={INK} strokeWidth="2" />
      <circle cx="380" cy="80" r="6" fill="#ff5a1f" />
      <rect x="240" y="170" width="100" height="60" fill="#ffc88a" stroke={INK} strokeWidth="2" />
      <rect x="248" y="180" width="60" height="4" fill={INK} />
      <rect x="248" y="190" width="80" height="3" fill={INK} fillOpacity="0.6" />
      <rect x="248" y="198" width="70" height="3" fill={INK} fillOpacity="0.6" />
      <rect x="248" y="206" width="50" height="3" fill={INK} fillOpacity="0.6" />
      <rect x="180" y="260" width="100" height="14" fill={INK} />
      <path d="M 230 260 L 230 250" stroke={INK} strokeWidth="3" />
    </svg>
  );
}

function SmartboardAngle() {
  return (
    <svg viewBox="0 0 460 320" className="h-full w-full" aria-hidden>
      <ellipse cx="230" cy="298" rx="120" ry="10" fill={SHADOW} />
      {/* rotated perspective board */}
      <polygon points="80,30 410,50 400,260 60,240" fill={INK} />
      <polygon points="92,42 396,62 386,244 70,228" fill={PAPER} />
      {/* drawing on screen perspective */}
      <path d="M 110 180 Q 180 80 250 140 T 380 90" stroke={INK} strokeWidth="3" fill="none" />
      <circle cx="110" cy="180" r="5" fill="#ff8a3d" stroke={INK} strokeWidth="2" />
      <circle cx="380" cy="90" r="5" fill="#ff5a1f" />
      {/* receding side edge */}
      <polygon points="410,50 430,70 420,272 400,260" fill={shade(INK, 30)} />
      {/* base */}
      <rect x="180" y="262" width="100" height="14" fill={INK} />
    </svg>
  );
}

function SmartboardSide() {
  return (
    <svg viewBox="0 0 460 320" className="h-full w-full" aria-hidden>
      <ellipse cx="230" cy="290" rx="100" ry="10" fill={SHADOW} />
      {/* side profile of board on stand */}
      <rect x="180" y="40" width="20" height="220" fill={INK} />
      <rect x="200" y="40" width="6" height="220" fill={shade(INK, 30)} />
      {/* glass surface */}
      <rect x="178" y="40" width="3" height="220" fill={PAPER} fillOpacity="0.9" />
      {/* mount bracket */}
      <rect x="190" y="240" width="40" height="20" fill={INK} />
      {/* stand pole */}
      <rect x="206" y="260" width="8" height="20" fill={INK} />
      {/* stand base */}
      <rect x="160" y="280" width="100" height="10" fill={INK} />
      {/* dimension callout */}
      <text x="320" y="155" fontSize="11" fontFamily="var(--font-geist-mono)" fill={INK} fillOpacity="0.5" letterSpacing="0.1em">
        86″
      </text>
      <line x1="218" y1="40" x2="310" y2="40" stroke={INK} opacity="0.3" strokeDasharray="3,3" />
      <line x1="218" y1="260" x2="310" y2="260" stroke={INK} opacity="0.3" strokeDasharray="3,3" />
      <line x1="305" y1="40" x2="305" y2="260" stroke={INK} opacity="0.3" />
    </svg>
  );
}

function SmartboardBack({ brand }: { brand: string }) {
  return (
    <svg viewBox="0 0 460 320" className="h-full w-full" aria-hidden>
      <ellipse cx="230" cy="298" rx="100" ry="10" fill={SHADOW} />
      <rect x="40" y="20" width="380" height="240" fill={shade(INK, 18)} />
      <rect x="50" y="30" width="360" height="220" fill={shade(INK, 25)} />
      {/* VESA mount pattern */}
      {[
        [180, 90], [280, 90], [180, 190], [280, 190],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="9" fill="#0a0c18" stroke="#3a4258" strokeWidth="1.5" />
          <circle cx={x} cy={y} r="3" fill="#3a4258" />
        </g>
      ))}
      {/* port row at bottom */}
      <rect x="80" y="220" width="240" height="20" fill="#0a0c18" />
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x={88 + i * 28} y={228} width="20" height="6" fill="#3a4258" />
      ))}
      {/* brand */}
      <text
        x="230"
        y="65"
        textAnchor="middle"
        fontSize="16"
        fontWeight="900"
        letterSpacing="-0.5"
        fontFamily="var(--font-geist-sans), system-ui, sans-serif"
        fill={PAPER}
        fillOpacity="0.85"
      >
        {brand.toLowerCase()}
      </text>
    </svg>
  );
}

/* ─────────────────── KIOSK ─────────────────── */
function KioskGlyph({ view, brand }: { view: ProductView; brand: string }) {
  if (view === "front") return <KioskFront />;
  if (view === "angle") return <KioskAngle />;
  if (view === "side") return <KioskSide />;
  return <KioskBack brand={brand} />;
}

function KioskFront() {
  return (
    <svg viewBox="0 0 320 380" className="h-full w-full" aria-hidden>
      <ellipse cx="160" cy="362" rx="120" ry="10" fill={SHADOW} />
      <rect x="60" y="20" width="200" height="300" fill={INK} />
      <rect x="70" y="30" width="180" height="240" fill={PAPER} />
      <rect x="84" y="52" width="60" height="6" fill={INK} />
      <rect x="84" y="68" width="140" height="3" fill={INK} fillOpacity="0.3" />
      <rect x="84" y="76" width="120" height="3" fill={INK} fillOpacity="0.3" />
      <rect x="84" y="100" width="70" height="70" fill="#ff8a3d" />
      <rect x="166" y="100" width="70" height="70" fill="#f0e2d0" />
      <rect x="84" y="180" width="70" height="70" fill="#ffd0a8" />
      <rect x="166" y="180" width="70" height="70" fill="#ff5a1f" />
      <rect x="100" y="280" width="120" height="20" fill={INK} />
      <path d="M 110 300 L 210 300 L 230 340 L 90 340 Z" fill={INK} />
      <rect x="120" y="276" width="60" height="3" fill={PAPER} fillOpacity="0.7" />
    </svg>
  );
}

function KioskAngle() {
  return (
    <svg viewBox="0 0 320 380" className="h-full w-full" aria-hidden>
      <ellipse cx="160" cy="362" rx="130" ry="10" fill={SHADOW} />
      {/* tilted body */}
      <polygon points="60,20 240,28 232,272 70,280" fill={INK} />
      <polygon points="72,32 228,38 222,260 80,268" fill={PAPER} />
      <rect x="86" y="56" width="50" height="5" fill={INK} />
      <rect x="86" y="68" width="100" height="3" fill={INK} fillOpacity="0.3" />
      <rect x="86" y="86" width="60" height="60" fill="#ff8a3d" />
      <rect x="156" y="84" width="60" height="60" fill="#f0e2d0" />
      <rect x="86" y="156" width="60" height="60" fill="#ffd0a8" />
      <rect x="156" y="154" width="60" height="60" fill="#ff5a1f" />
      {/* receding edge */}
      <polygon points="240,28 270,42 262,282 232,272" fill={shade(INK, 25)} />
      {/* base in perspective */}
      <polygon points="100,290 220,294 250,344 80,338" fill={INK} />
      <polygon points="220,294 250,308 270,348 250,344" fill={shade(INK, 25)} />
    </svg>
  );
}

function KioskSide() {
  return (
    <svg viewBox="0 0 320 380" className="h-full w-full" aria-hidden>
      <ellipse cx="160" cy="362" rx="80" ry="10" fill={SHADOW} />
      {/* slim profile */}
      <rect x="140" y="20" width="40" height="280" fill={INK} />
      <rect x="142" y="20" width="3" height="280" fill={PAPER} fillOpacity="0.9" />
      {/* card reader bump */}
      <rect x="178" y="180" width="20" height="40" fill={INK} />
      <rect x="180" y="190" width="14" height="3" fill="#666" />
      {/* ports */}
      <rect x="180" y="80" width="3" height="22" fill="#444" />
      <rect x="180" y="106" width="3" height="14" fill="#444" />
      {/* base */}
      <path d="M 110 300 L 210 300 L 230 340 L 90 340 Z" fill={INK} />
      {/* dimension */}
      <line x1="100" y1="20" x2="60" y2="20" stroke={INK} opacity="0.3" strokeDasharray="3,3" />
      <line x1="100" y1="300" x2="60" y2="300" stroke={INK} opacity="0.3" strokeDasharray="3,3" />
      <line x1="65" y1="20" x2="65" y2="300" stroke={INK} opacity="0.3" />
      <text x="40" y="165" fontSize="11" fontFamily="var(--font-geist-mono)" fill={INK} fillOpacity="0.5" letterSpacing="0.1em" transform="rotate(-90, 40, 165)">
        32″
      </text>
    </svg>
  );
}

function KioskBack({ brand }: { brand: string }) {
  return (
    <svg viewBox="0 0 320 380" className="h-full w-full" aria-hidden>
      <ellipse cx="160" cy="362" rx="120" ry="10" fill={SHADOW} />
      <rect x="60" y="20" width="200" height="300" fill={shade(INK, 18)} />
      <rect x="70" y="30" width="180" height="240" fill={shade(INK, 25)} />
      {/* service door with screws */}
      <rect x="92" y="60" width="136" height="160" fill="#0a0c18" stroke="#3a4258" strokeWidth="1" />
      {[[100, 70], [220, 70], [100, 210], [220, 210]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="3" fill="#3a4258" />
          <line x1={x - 2} y1={y} x2={x + 2} y2={y} stroke="#1a2333" />
          <line x1={x} y1={y - 2} x2={x} y2={y + 2} stroke="#1a2333" />
        </g>
      ))}
      <text
        x="160"
        y="148"
        textAnchor="middle"
        fontSize="14"
        fontWeight="900"
        letterSpacing="-0.5"
        fontFamily="var(--font-geist-sans), system-ui, sans-serif"
        fill={PAPER}
        fillOpacity="0.7"
      >
        {brand.toLowerCase()}
      </text>
      <text x="160" y="166" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill={PAPER} fillOpacity="0.4" letterSpacing="0.18em">
        SERVICE PANEL
      </text>
      <path d="M 110 300 L 210 300 L 230 340 L 90 340 Z" fill={INK} />
    </svg>
  );
}

/* ─────────────────── PERIPHERAL ─────────────────── */
function PeripheralGlyph({ view, brand }: { view: ProductView; brand: string }) {
  if (view === "front") return <PeripheralFront />;
  if (view === "angle") return <PeripheralAngle />;
  if (view === "side") return <PeripheralSide />;
  return <PeripheralBack brand={brand} />;
}

function PeripheralFront() {
  return (
    <svg viewBox="0 0 460 320" className="h-full w-full" aria-hidden>
      <ellipse cx="230" cy="290" rx="160" ry="12" fill={SHADOW} />
      <rect x="120" y="120" width="220" height="80" fill={INK} />
      <rect x="138" y="146" width="22" height="10" fill={PAPER} fillOpacity="0.85" />
      <rect x="166" y="146" width="22" height="10" fill={PAPER} fillOpacity="0.85" />
      <rect x="194" y="146" width="22" height="10" fill={PAPER} fillOpacity="0.85" />
      <rect x="222" y="146" width="22" height="10" fill={PAPER} fillOpacity="0.85" />
      <rect x="250" y="146" width="40" height="10" fill="#ff8a3d" />
      <rect x="298" y="146" width="22" height="10" fill={PAPER} fillOpacity="0.85" />
      <circle cx="320" cy="172" r="5" fill="#ff8a3d" />
      <circle cx="138" cy="172" r="3" fill={PAPER} fillOpacity="0.6" />
      <path d="M 230 120 C 230 60, 320 40, 380 30" stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x="372" y="20" width="22" height="28" fill={INK} />
      <rect x="378" y="10" width="10" height="14" fill={INK} />
      <path d="M 230 200 C 230 250, 140 270, 80 280" stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x="60" y="270" width="22" height="28" fill={INK} />
      <rect x="66" y="296" width="10" height="14" fill={INK} />
    </svg>
  );
}

function PeripheralAngle() {
  return (
    <svg viewBox="0 0 460 320" className="h-full w-full" aria-hidden>
      <ellipse cx="230" cy="280" rx="170" ry="12" fill={SHADOW} />
      {/* tilted hub */}
      <polygon points="90,140 350,120 360,200 100,220" fill={INK} />
      <polygon points="90,140 350,120 350,128 90,148" fill={shade(INK, 35)} />
      {/* ports angled */}
      {Array.from({ length: 5 }).map((_, i) => (
        <rect key={i} x={120 + i * 36} y={172} width="22" height="9" fill={PAPER} fillOpacity="0.85" />
      ))}
      <circle cx="320" cy="190" r="5" fill="#ff8a3d" />
      {/* curve cable up */}
      <path d="M 220 130 C 240 80, 320 50, 390 40" stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x="380" y="30" width="22" height="28" fill={INK} />
    </svg>
  );
}

function PeripheralSide() {
  return (
    <svg viewBox="0 0 460 320" className="h-full w-full" aria-hidden>
      <ellipse cx="230" cy="270" rx="120" ry="10" fill={SHADOW} />
      {/* thin profile of hub */}
      <rect x="140" y="180" width="180" height="20" fill={INK} />
      <rect x="140" y="178" width="180" height="3" fill={shade(INK, 40)} />
      {/* port openings */}
      <rect x="160" y="186" width="22" height="8" fill="#444" />
      <rect x="190" y="186" width="22" height="8" fill="#444" />
      <rect x="220" y="186" width="22" height="8" fill="#444" />
      {/* cable out one end */}
      <path d="M 320 190 C 360 190, 380 160, 400 140" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
      <rect x="394" y="130" width="14" height="20" fill={INK} />
      {/* dimension */}
      <line x1="140" y1="216" x2="320" y2="216" stroke={INK} opacity="0.3" strokeDasharray="3,3" />
      <text x="230" y="234" textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fill={INK} fillOpacity="0.5" letterSpacing="0.1em">
        12 mm thin
      </text>
    </svg>
  );
}

function PeripheralBack({ brand }: { brand: string }) {
  return (
    <svg viewBox="0 0 460 320" className="h-full w-full" aria-hidden>
      <ellipse cx="230" cy="280" rx="160" ry="12" fill={SHADOW} />
      <rect x="120" y="120" width="220" height="100" fill={shade(INK, 20)} />
      <rect x="120" y="120" width="220" height="6" fill={shade(INK, 35)} />
      {/* engraved info text */}
      <text x="230" y="160" textAnchor="middle" fontSize="20" fontWeight="900" letterSpacing="-0.5" fontFamily="var(--font-geist-sans)" fill={PAPER} fillOpacity="0.85">
        {brand.toLowerCase()}
      </text>
      <text x="230" y="180" textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill={PAPER} fillOpacity="0.4" letterSpacing="0.18em">
        MODEL · FX-08 · IND
      </text>
      <text x="230" y="195" textAnchor="middle" fontSize="8" fontFamily="var(--font-geist-mono)" fill={PAPER} fillOpacity="0.35" letterSpacing="0.12em">
        100W · USB-C PD 3.0 · USB-IF
      </text>
      {/* serial label */}
      <rect x="160" y="206" width="140" height="10" fill={PAPER} fillOpacity="0.08" />
    </svg>
  );
}

function shade(hex: string, percent: number): string {
  const h = hex.replace("#", "");
  const r = Math.max(0, Math.min(255, parseInt(h.slice(0, 2), 16) + Math.round(2.55 * percent)));
  const g = Math.max(0, Math.min(255, parseInt(h.slice(2, 4), 16) + Math.round(2.55 * percent)));
  const b = Math.max(0, Math.min(255, parseInt(h.slice(4, 6), 16) + Math.round(2.55 * percent)));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

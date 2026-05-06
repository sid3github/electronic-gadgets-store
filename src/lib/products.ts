import type { CategoryMeta, Deal, Product, Testimonial } from "./types";

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: "tablets",
    label: "Tablets",
    description: "Ultra-portable touchscreen workhorses for classrooms, fieldwork and creative teams.",
    iconKey: "tablet",
  },
  {
    slug: "laptops",
    label: "Laptops",
    description: "Performance notebooks engineered for long days, heavier loads and zero compromise.",
    iconKey: "laptop",
  },
  {
    slug: "smartboards",
    label: "Interactive Boards",
    description: "Collaborative touchscreens that turn any room into an interactive learning surface.",
    iconKey: "smartboard",
  },
  {
    slug: "kiosks",
    label: "Kiosks",
    description: "Self-service terminals built for reception desks, queue management and retail.",
    iconKey: "kiosk",
  },
  {
    slug: "peripherals",
    label: "Peripherals",
    description: "Cables, hubs, mounts, styli and add-ons that complete the setup.",
    iconKey: "peripheral",
  },
];

export const PRODUCTS: Product[] = [
  // ── Tablets ────────────────────────────────────────────────
  {
    slug: "apex-slate-pro-12",
    name: "Apex Slate Pro 12",
    brand: "Apex",
    category: "tablets",
    tagline: "12.4\" OLED tablet for educators and creators",
    price: 49900,
    originalPrice: 79900,
    rating: 4.8,
    reviewCount: 412,
    stock: 18,
    badge: "best-seller",
    artVariant: "tablet",
    artHue: "#fff1e6",
    highlights: [
      "12.4\" 2.8K OLED, 120Hz, anti-glare glass",
      "Active stylus with 4096-level pressure included",
      "All-day 14h battery, fast-charge to 60% in 30 min",
      "Dual USB-C with DisplayPort out for whiteboarding",
    ],
    specs: [
      { label: "Display", value: "12.4\" OLED 2800x1752 @ 120Hz" },
      { label: "Processor", value: "Apex A8 octa-core" },
      { label: "Memory", value: "12 GB LPDDR5" },
      { label: "Storage", value: "256 GB UFS 4.0" },
      { label: "Battery", value: "10,090 mAh • up to 14 hours" },
      { label: "Connectivity", value: "Wi-Fi 6E • BT 5.3 • Optional 5G" },
      { label: "Weight", value: "598 g" },
    ],
    description:
      "The Slate Pro 12 is the everyday companion for classrooms, agencies and field teams who need real performance without lugging a laptop. Color-accurate OLED, an active stylus and dual USB-C let you draft, present and project from the same device.",
    trustBadges: [
      "24-month direct warranty",
      "Free replacement on technical defects",
      "Bulk procurement support",
    ],
    warrantyMonths: 24,
  },
  {
    slug: "helio-slate-air-10",
    name: "Helio Slate Air 10",
    brand: "Helio",
    category: "tablets",
    tagline: "10.5\" everyday tablet, classroom-tough",
    price: 21900,
    originalPrice: 32900,
    rating: 4.6,
    reviewCount: 278,
    stock: 64,
    badge: "new",
    artVariant: "tablet",
    artHue: "#f0e2d0",
    highlights: [
      "10.5\" IPS 2K display with bonded glass",
      "Drop-tested to MIL-STD-810H",
      "Optional kid-mode with parental controls",
      "Stylus and folio cover sold as bundle",
    ],
    specs: [
      { label: "Display", value: "10.5\" IPS 2000x1200 @ 90Hz" },
      { label: "Processor", value: "Helio H6" },
      { label: "Memory", value: "8 GB LPDDR5" },
      { label: "Storage", value: "128 GB UFS 3.1" },
      { label: "Battery", value: "7,400 mAh" },
      { label: "Weight", value: "455 g" },
    ],
    description:
      "Built for shared classrooms and one-on-one programs. The Slate Air 10 survives drops, spills and a thousand chargers. Multi-user accounts and a tamper-proof admin console keep the fleet manageable.",
    trustBadges: [
      "12-month warranty + 6-month accidental cover",
      "Bulk-friendly imaging tools",
      "Trade-up program available",
    ],
    warrantyMonths: 18,
  },
  {
    slug: "neuron-edge-rugged-tab",
    name: "Neuron Edge Rugged Tab",
    brand: "Neuron",
    category: "tablets",
    tagline: "IP68 ruggedized field tablet",
    price: 39900,
    originalPrice: 64900,
    rating: 4.7,
    reviewCount: 132,
    stock: 22,
    artVariant: "tablet",
    artHue: "#ffc88a",
    highlights: [
      "IP68 dust + water resistance",
      "Glove-friendly capacitive touch",
      "Hot-swappable battery",
      "Optional barcode scanner module",
    ],
    specs: [
      { label: "Display", value: "10.1\" IPS 1920x1200, 800 nits" },
      { label: "Processor", value: "Neuron N5" },
      { label: "Memory", value: "8 GB" },
      { label: "Storage", value: "128 GB" },
      { label: "Battery", value: "Hot-swap 7,000 mAh + 7,000 mAh" },
    ],
    description:
      "When the device is the workplace, you need a tablet that earns its keep on a forklift, a wind farm or a wet warehouse aisle. The Edge Rugged Tab keeps going long after consumer hardware has tapped out.",
    trustBadges: ["24-month industrial warranty", "On-site service tier available"],
    warrantyMonths: 24,
  },

  // ── Laptops ────────────────────────────────────────────────
  {
    slug: "lumen-ion-14-creator",
    name: "Lumen Ion 14 Creator",
    brand: "Lumen",
    category: "laptops",
    tagline: "14\" OLED creator laptop with discrete graphics",
    price: 99900,
    originalPrice: 169900,
    rating: 4.9,
    reviewCount: 561,
    stock: 12,
    badge: "best-seller",
    artVariant: "laptop",
    artHue: "#f0e2d0",
    highlights: [
      "14\" 3K OLED HDR, 120Hz, 100% DCI-P3",
      "Lumen V-Core i9 + RTX-class discrete GPU",
      "32 GB DDR5, 1 TB Gen4 NVMe",
      "Per-key RGB, vapor chamber cooling",
    ],
    specs: [
      { label: "Display", value: "14\" OLED 2880x1800 @ 120Hz" },
      { label: "CPU", value: "Lumen V-Core i9-14H, 14 cores" },
      { label: "GPU", value: "Discrete 8 GB GDDR6" },
      { label: "RAM", value: "32 GB DDR5-6400" },
      { label: "Storage", value: "1 TB PCIe Gen4 NVMe" },
      { label: "Ports", value: "2x TB4, HDMI 2.1, SD UHS-II" },
      { label: "Battery", value: "76 Wh • 10 hr typical" },
    ],
    description:
      "The Ion 14 Creator was built around one belief: power should not weigh six pounds. Calibrated OLED, a chassis you can carry one-handed and a thermal stack that lets the silicon stretch. Pro creators ship with this.",
    trustBadges: ["3-year warranty", "Next-business-day on-site (metro)", "Replacement on technical defects"],
    warrantyMonths: 36,
  },
  {
    slug: "apex-ion-15-classroom",
    name: "Apex Ion 15 Classroom",
    brand: "Apex",
    category: "laptops",
    tagline: "Rugged 15\" laptop for shared learning programs",
    price: 44900,
    originalPrice: 79900,
    rating: 4.5,
    reviewCount: 219,
    stock: 86,
    artVariant: "laptop",
    artHue: "#fff1e6",
    highlights: [
      "Spill-resistant keyboard, 180° hinge",
      "Reinforced corners, MIL-STD-810H tested",
      "8 hour battery + fast charge",
      "Fleet management agent pre-installed",
    ],
    specs: [
      { label: "Display", value: "15.6\" FHD anti-glare" },
      { label: "CPU", value: "Apex A-Core i5" },
      { label: "RAM", value: "16 GB DDR5" },
      { label: "Storage", value: "512 GB SSD" },
      { label: "Webcam", value: "1080p with privacy shutter" },
    ],
    description:
      "Designed with school IT in mind. Bulk imaging, locked-down kiosk modes and a chassis that survives backpacks, buses and break rooms. Ships fully managed.",
    trustBadges: ["24-month warranty", "Free swap on technical defects", "Bulk pricing tier"],
    warrantyMonths: 24,
  },
  {
    slug: "neuron-stride-13",
    name: "Neuron Stride 13",
    brand: "Neuron",
    category: "laptops",
    tagline: "13\" ultraportable for procurement teams",
    price: 59900,
    originalPrice: 99900,
    rating: 4.6,
    reviewCount: 154,
    stock: 41,
    badge: "deal",
    artVariant: "laptop",
    artHue: "#ffd0a8",
    highlights: [
      "1.05 kg magnesium alloy chassis",
      "16 GB RAM, 512 GB SSD",
      "Wi-Fi 7, BT 5.4",
      "Backlit keyboard, fingerprint reader",
    ],
    specs: [
      { label: "Display", value: "13.3\" IPS QHD" },
      { label: "CPU", value: "Neuron N7" },
      { label: "RAM", value: "16 GB LPDDR5x" },
      { label: "Storage", value: "512 GB NVMe" },
      { label: "Weight", value: "1.05 kg" },
    ],
    description:
      "An ultraportable that survives airports, car parks and conference rooms. The Stride 13 is the laptop you'll happily hand to a sales lead on day one.",
    trustBadges: ["18-month warranty", "Replacement on technical defects"],
    warrantyMonths: 18,
  },

  // ── Smartboards ────────────────────────────────────────────
  {
    slug: "plinth-canvas-86-pro",
    name: "Plinth Canvas 86 Pro",
    brand: "Plinth",
    category: "smartboards",
    tagline: "86\" 4K interactive board with OPS slot",
    price: 199000,
    originalPrice: 349000,
    rating: 4.9,
    reviewCount: 87,
    stock: 6,
    badge: "limited",
    artVariant: "smartboard",
    artHue: "#ffd0a8",
    highlights: [
      "86\" 4K UHD anti-glare touch surface",
      "40-point IR multi-touch with palm rejection",
      "OPS slot for plug-in Windows PC",
      "Built-in whiteboard, screen-share for 9 devices",
    ],
    specs: [
      { label: "Display", value: "86\" 4K UHD, 350 nits" },
      { label: "Touch", value: "40-point IR" },
      { label: "OS", value: "Plinth Board OS 4 + optional OPS PC" },
      { label: "Speakers", value: "2x 20W front-firing" },
      { label: "Mounting", value: "VESA 800x400 + wall kit included" },
    ],
    description:
      "Replace the projector, the whiteboard and the conference TV with one surface that just works. The Canvas 86 Pro turns any classroom or boardroom into a collaborative workspace in under an hour.",
    trustBadges: ["3-year warranty", "Free installation in metros", "Annual on-site checkup"],
    warrantyMonths: 36,
  },
  {
    slug: "plinth-canvas-65",
    name: "Plinth Canvas 65",
    brand: "Plinth",
    category: "smartboards",
    tagline: "65\" interactive panel for huddle rooms",
    price: 119000,
    originalPrice: 199000,
    rating: 4.7,
    reviewCount: 54,
    stock: 11,
    artVariant: "smartboard",
    artHue: "#fff1e6",
    highlights: [
      "65\" 4K UHD touch surface",
      "20-point multi-touch",
      "Wireless mirroring out of the box",
      "Front IO for stylus + USB-C",
    ],
    specs: [
      { label: "Display", value: "65\" 4K UHD" },
      { label: "Touch", value: "20-point IR" },
      { label: "Connectivity", value: "Wi-Fi 6, HDMI 2.1, USB-C" },
    ],
    description:
      "Right-sized for huddle rooms, training labs and small classrooms. Same touch responsiveness as the 86 Pro, just a tighter footprint.",
    trustBadges: ["2-year warranty", "Free wall-mount kit"],
    warrantyMonths: 24,
  },

  // ── Kiosks ─────────────────────────────────────────────────
  {
    slug: "plinth-helix-kiosk-32",
    name: "Plinth Helix Kiosk 32",
    brand: "Plinth",
    category: "kiosks",
    tagline: "32\" floor-standing self-service kiosk",
    price: 139000,
    originalPrice: 249000,
    rating: 4.7,
    reviewCount: 39,
    stock: 8,
    badge: "new",
    artVariant: "kiosk",
    artHue: "#ff8a3d",
    highlights: [
      "32\" capacitive touchscreen, 1000 nits",
      "Integrated thermal printer + barcode scanner",
      "Optional NFC payment + camera modules",
      "Steel chassis with locking service door",
    ],
    specs: [
      { label: "Display", value: "32\" PCAP touch, 1000 nits" },
      { label: "Compute", value: "Plinth K-Compute (i5)" },
      { label: "Peripherals", value: "Thermal printer, 2D scanner, NFC ready" },
      { label: "Mounting", value: "Floor-bolted with adjustable feet" },
    ],
    description:
      "Built for high-traffic lobbies, hospitals and retail floors. The Helix Kiosk 32 ships configured to your software stack — Android or Windows — and supports remote diagnostics out of the box.",
    trustBadges: ["3-year warranty", "On-site replacement of technical defects", "Custom branding wrap available"],
    warrantyMonths: 36,
  },
  {
    slug: "plinth-helix-counter-22",
    name: "Plinth Helix Counter 22",
    brand: "Plinth",
    category: "kiosks",
    tagline: "22\" countertop kiosk for retail & quick service",
    price: 64900,
    originalPrice: 119000,
    rating: 4.5,
    reviewCount: 28,
    stock: 19,
    artVariant: "kiosk",
    artHue: "#f0e2d0",
    highlights: [
      "22\" PCAP touchscreen",
      "Integrated card reader bracket",
      "Slim countertop footprint",
      "Lockable cable channel",
    ],
    specs: [
      { label: "Display", value: "22\" PCAP touch, 350 nits" },
      { label: "Compute", value: "Plinth K-Compute (i3)" },
      { label: "Peripherals", value: "Card reader bracket, optional printer" },
    ],
    description:
      "Counter-mounted self-service for cafes, clinics and quick-service retail. Pairs with most Indian POS stacks via REST or USB-HID.",
    trustBadges: ["2-year warranty", "Custom branding wrap"],
    warrantyMonths: 24,
  },

  // ── Peripherals ────────────────────────────────────────────
  {
    slug: "glide-pulse-stylus",
    name: "Glide Pulse Stylus",
    brand: "Glide",
    category: "peripherals",
    tagline: "4096-pressure active stylus with magnetic charging",
    price: 3990,
    originalPrice: 8990,
    rating: 4.8,
    reviewCount: 612,
    stock: 240,
    badge: "best-seller",
    artVariant: "peripheral",
    artHue: "#f0e2d0",
    highlights: [
      "4096 pressure levels, 60° tilt",
      "Magnetic side-charging",
      "Programmable side button",
      "Compatible with Slate Pro 12 + Canvas series",
    ],
    specs: [
      { label: "Pressure levels", value: "4096" },
      { label: "Battery", value: "12 hr active use, 30-day standby" },
      { label: "Tip", value: "Replaceable, 2 tips included" },
    ],
    description:
      "The Pulse Stylus is the input layer your tablet or smartboard has been asking for. Snap-on charging, palm rejection and a feel that's closer to ink than glass.",
    trustBadges: ["12-month warranty"],
    warrantyMonths: 12,
  },
  {
    slug: "glide-flux-hub-8in1",
    name: "Glide Flux Hub 8-in-1",
    brand: "Glide",
    category: "peripherals",
    tagline: "USB-C dock with 4K HDMI, Ethernet and 100W PD",
    price: 2990,
    originalPrice: 6490,
    rating: 4.6,
    reviewCount: 489,
    stock: 320,
    badge: "deal",
    artVariant: "peripheral",
    artHue: "#fff1e6",
    highlights: [
      "Dual 4K HDMI out",
      "100W passthrough power",
      "Gigabit Ethernet + SD/microSD",
      "Aluminum chassis stays cool",
    ],
    specs: [
      { label: "Ports", value: "2x HDMI, 1x USB-C 100W PD, 3x USB-A, GbE, SD/microSD" },
      { label: "Material", value: "CNC aluminum" },
    ],
    description:
      "Plug one cable into your laptop, get every port a real workstation needs. The Flux Hub is the dock we ship to every team rolling out the Ion 14.",
    trustBadges: ["18-month warranty", "Lifetime firmware updates"],
    warrantyMonths: 18,
  },
  {
    slug: "glide-arc-cable-100w",
    name: "Glide Arc USB-C Cable 100W",
    brand: "Glide",
    category: "peripherals",
    tagline: "Braided 2m USB-C cable, 100W PD + 40Gbps data",
    price: 799,
    originalPrice: 1990,
    rating: 4.7,
    reviewCount: 1240,
    stock: 1100,
    artVariant: "peripheral",
    artHue: "#ffc88a",
    highlights: [
      "100W power delivery, 40Gbps data",
      "Aramid-fiber braid, 25,000 bend-tested",
      "USB-IF certified",
      "Velcro tie included",
    ],
    specs: [
      { label: "Length", value: "2 m" },
      { label: "Power", value: "100W PD 3.0" },
      { label: "Data", value: "USB4 / Thunderbolt 4 compatible" },
    ],
    description: "The cable you stop hiding from auditors. Certified, braided, color-matched.",
    trustBadges: ["24-month warranty"],
    warrantyMonths: 24,
  },
  {
    slug: "glide-grid-wall-mount",
    name: "Glide Grid Wall Mount",
    brand: "Glide",
    category: "peripherals",
    tagline: "Universal smartboard wall mount kit",
    price: 5490,
    originalPrice: 12900,
    rating: 4.5,
    reviewCount: 96,
    stock: 64,
    artVariant: "peripheral",
    artHue: "#ffd0a8",
    highlights: [
      "Fits 55–98\" displays up to 90 kg",
      "VESA up to 800x400",
      "Cable channel + cable lock",
      "Tilt + level adjustment",
    ],
    specs: [
      { label: "Capacity", value: "Up to 90 kg" },
      { label: "VESA", value: "200x200 to 800x400" },
    ],
    description: "Steel mount built for daily classroom use. Comes with all anchors and a level. Free wall survey on request.",
    trustBadges: ["Lifetime structural warranty"],
    warrantyMonths: 60,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Anita Rao",
    role: "Principal",
    organization: "Lakeside International School",
    quote:
      "We standardized 14 classrooms on the Canvas 86 Pro. EGS handled installation, training and a defect replacement inside 36 hours. Procurement done right.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Vikram Shah",
    role: "Head of IT",
    organization: "Helix Hospitals Group",
    quote:
      "The Helix Kiosks replaced six different POS-style machines across our reception desks. The remote diagnostics alone paid for themselves in three months.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Priya Menon",
    role: "Procurement Officer",
    organization: "Northwind Polytechnic",
    quote:
      "Open-market pricing is a trap once you factor warranty fights. EGS's direct replacement policy on technical defects is the real value here.",
    rating: 5,
  },
];

export const ACTIVE_DEALS: Deal[] = [
  {
    id: "festive-edu-2026",
    title: "Edu Q2 Procurement Offer",
    subtitle: "8% off any classroom bundle of 10+ devices",
    discountPct: 8,
    endsAt: "2026-06-30",
    scope: "site",
    code: "EDUQ226",
  },
  {
    id: "creator-flash",
    title: "Creator Flash — Ion 14",
    subtitle: "Save ₹15,000 on the Lumen Ion 14 Creator until month-end",
    discountPct: 10,
    endsAt: "2026-05-31",
    scope: "product",
    scopeValue: "lumen-ion-14-creator",
  },
  {
    id: "peripherals-bundle",
    title: "Peripherals Bundle",
    subtitle: "Buy any 3 peripherals, get 15% off the cheapest",
    discountPct: 15,
    endsAt: "2026-07-15",
    scope: "category",
    scopeValue: "peripherals",
    code: "GEAR3",
  },
];

// Helpers
export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string) {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) =>
    ["apex-slate-pro-12", "lumen-ion-14-creator", "plinth-canvas-86-pro", "plinth-helix-kiosk-32"].includes(p.slug),
  );
}

export function getDealProducts(): Product[] {
  return PRODUCTS.filter((p) => p.originalPrice && p.originalPrice > p.price);
}

export function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getBrands(): string[] {
  return Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort();
}

export function getPriceBuckets() {
  return [
    { label: "Under ₹10K", min: 0, max: 10000 },
    { label: "₹10K – ₹50K", min: 10000, max: 50000 },
    { label: "₹50K – ₹1L", min: 50000, max: 100000 },
    { label: "₹1L – ₹2L", min: 100000, max: 200000 },
    { label: "₹2L+", min: 200000, max: Infinity },
  ];
}

export function categoryAccent(category: string): string {
  switch (category) {
    case "tablets": return "var(--cat-tablets)";
    case "laptops": return "var(--cat-laptops)";
    case "smartboards": return "var(--cat-smartboards)";
    case "kiosks": return "var(--cat-kiosks)";
    case "peripherals": return "var(--cat-peripherals)";
    default: return "var(--volt-lime)";
  }
}

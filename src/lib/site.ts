export const SITE = {
  name: "Electronic Gadgets Store",
  shortName: "EGS",
  tagline: "Future-ready electronics for schools, businesses and creators.",
  description:
    "Electronic Gadgets Store (EGS) is a direct-to-customer electronics retailer specializing in tablets, laptops, interactive boards, kiosks and accessories — backed by a real warranty, real humans and real replacement guarantees.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://egs-store.example",
  contact: {
    phone: "+91 80 4000 0420",
    whatsapp: "+91 90000 00420",
    salesEmail: "sales@egs-store.example",
    supportEmail: process.env.SUPPORT_EMAIL ?? "support@egs-store.example",
    ordersEmail: process.env.ORDERS_EMAIL ?? "orders@egs-store.example",
    address: {
      line1: "Electronic Gadgets Store Pvt. Ltd.",
      line2: "Level 7, One BKC, Bandra Kurla Complex",
      city: "Mumbai",
      state: "Maharashtra",
      pin: "400051",
      country: "India",
    },
    hours: "Mon–Sat, 09:30 – 19:00 IST",
  },
  policies: {
    warrantyMonths: 24,
    accidentalCoverMonths: 6,
    replacementWindowDays: 7,
    returnWindowDays: 14,
    supportTatHours: 24,
    onSiteTatBusinessDays: 3,
    bulkPricingMinUnits: 10,
  },
};

export type SiteConfig = typeof SITE;

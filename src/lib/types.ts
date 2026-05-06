export type Category = "tablets" | "laptops" | "smartboards" | "kiosks" | "peripherals";

export type ArtProfile =
  | "tablet-pro-12"
  | "tablet-air-10"
  | "tablet-rugged"
  | "laptop-creator-14"
  | "laptop-classroom-15"
  | "laptop-ultra-13"
  | "board-86"
  | "board-65"
  | "kiosk-floor-32"
  | "kiosk-counter-22"
  | "accessory-stylus"
  | "accessory-hub"
  | "accessory-cable"
  | "accessory-mount";

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: Category;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  highlights: string[];
  specs: { label: string; value: string }[];
  description: string;
  trustBadges: string[];
  warrantyMonths: number;
  badge?: "new" | "best-seller" | "deal" | "limited";
  artVariant: "tablet" | "laptop" | "smartboard" | "kiosk" | "peripheral";
  artHue: string;
  artProfile?: ArtProfile;
};

export type CartItem = {
  slug: string;
  quantity: number;
};

export type Deal = {
  id: string;
  title: string;
  subtitle: string;
  discountPct: number;
  endsAt: string;
  scope: "site" | "category" | "product";
  scopeValue?: string;
  code?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  organization: string;
  quote: string;
  rating: number;
};

export type CategoryMeta = {
  slug: Category;
  label: string;
  description: string;
  iconKey: "tablet" | "laptop" | "smartboard" | "kiosk" | "peripheral";
};

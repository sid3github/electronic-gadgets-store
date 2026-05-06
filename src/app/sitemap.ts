import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = [
    "/", "/about", "/products", "/deals", "/warranty", "/contact",
    "/legal/terms", "/legal/privacy", "/legal/returns",
  ];

  const productRoutes = PRODUCTS.map((p) => `/products/${p.slug}`);

  return [...staticRoutes, ...productRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/products/") ? 0.8 : 0.6,
  }));
}

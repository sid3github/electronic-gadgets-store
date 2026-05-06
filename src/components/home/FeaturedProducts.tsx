import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
import { getFeaturedProducts } from "@/lib/products";

export function FeaturedProducts() {
  const products = getFeaturedProducts();
  return (
    <section className="py-20 sm:py-28">
      <Container size="wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="eyebrow text-[var(--ink-3)]">Hand-picked this month</span>
            <h2 className="text-balance text-[clamp(2rem,4vw+0.5rem,3.5rem)] font-black leading-[0.95] tracking-[-0.03em] text-[var(--ink)]">
              Top sellers,{" "}
              <span className="font-display italic font-normal text-[var(--cobalt)]">ready to ship.</span>
            </h2>
            <p className="mt-1 max-w-xl text-[var(--ink-3)]">
              Hover any product to see it in 3D — our most-shipped SKUs across schools, retail floors and creative studios.
            </p>
          </div>
          <Button href="/products" variant="secondary" trailingIcon={<ArrowRight />}>
            All products
          </Button>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} tilt />
          ))}
        </div>
      </Container>
    </section>
  );
}

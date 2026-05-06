import { Hero } from "@/components/home/Hero";
import { BrandStrip } from "@/components/home/BrandStrip";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { DealsBanner } from "@/components/home/DealsBanner";
import { UspSection } from "@/components/home/UspSection";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStrip />
      <CategoryGrid />
      <FeaturedProducts />
      <DealsBanner />
      <UspSection />
      <Testimonials />
      <CtaBanner />
    </>
  );
}

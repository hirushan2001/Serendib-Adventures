import { HeroSection } from "@/components/sections/hero-section";
import { PopularPackagesCarousel } from "@/components/popular-packages";
import { CategoryGrid } from "@/components/sections/category-grid";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { DestinationsSpotlight } from "@/components/sections/destinations-spotlight";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { adventures, categories, destinations, reviews } from "@/lib/adventure-data";

/**
 * HomePage Composition Root
 * Declaratively composes high-level page section components
 */
export default function HomePage() {
  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen">
      <HeroSection />
      
      <section className="page-shell py-12 md:py-16">
        <PopularPackagesCarousel adventures={adventures} />
      </section>

      <CategoryGrid categories={categories} />
      <WhyChooseUs />
      <DestinationsSpotlight destinations={destinations} />
      <TestimonialsSection reviews={reviews} />
      <CtaBanner />
    </div>
  );
}

import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import { TensileCanvas } from "@/components/TensileCanvas";
import { HeroSection } from "@/sections/HeroSection";
import { TextMarquee } from "@/components/TextMarquee";
import { StatsSection } from "@/sections/StatsSection";
import { ClientLogosMarquee } from "@/components/ClientLogosMarquee";
import { ApproachSection } from "@/sections/ApproachSection";
import { SolutionsSection } from "@/sections/SolutionsSection";
import { LocationsGridSection } from "@/sections/LocationsGridSection";
import { BlueprintBand } from "@/sections/BlueprintBand";
import { ProjectsMarquee } from "@/components/ProjectsMarquee";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { VideoGallerySection } from "@/sections/VideoGallerySection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { ProcessSection } from "@/sections/ProcessSection";
import { EngineeringSection } from "@/sections/EngineeringSection";
import { FaqSection } from "@/sections/FaqSection";
import { ClosingSection } from "@/sections/ClosingSection";
import { QuotePanel } from "@/components/QuotePanel";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  useSEO({
    title: "Car Parking Shades, Industrial Steel Sheds & Tensile Membrane Pakistan | TSP Tensile",
    description: "Pakistan's #1 manufacturer of cantilever car parking sheds, industrial factory & warehouse sheds, marquee tents & swimming pool canopies. 100+ projects completed across Pakistan. Call/WhatsApp 0302 4001063.",
    path: "/",
    keywords: "car parking sheds pakistan, cantilever parking shade lahore, industrial shed construction pakistan, warehouse steel structure shed, factory shed lahore, marquee shed, porch sheds, wall mounted sheds, swimming pool shade, dairy farm shed, peb pre engineered building pakistan, tensile fabric structure islamabad, car parking shades karachi, TSP tensile"
  });

  const [quoteOpen, setQuoteOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* 3D tensile canvas overlay on hero */}
      <div className="home-canvas-wrap" aria-hidden="true">
        <TensileCanvas />
      </div>

      <HeroSection onQuoteOpen={() => setQuoteOpen(true)} scrollTo={scrollTo} />
      <TextMarquee />
      <StatsSection />
      <ClientLogosMarquee />
      <ApproachSection scrollTo={scrollTo} />
      <SolutionsSection />
      <LocationsGridSection />
      <BlueprintBand scrollTo={scrollTo} />
      <ProjectsMarquee onQuoteOpen={() => setQuoteOpen(true)} />
      <ProjectsSection onQuoteOpen={() => setQuoteOpen(true)} />
      <VideoGallerySection />
      <TestimonialsSection />
      <ProcessSection onQuoteOpen={() => setQuoteOpen(true)} />
      <EngineeringSection onQuoteOpen={() => setQuoteOpen(true)} />
      <FaqSection />
      <ClosingSection onQuoteOpen={() => setQuoteOpen(true)} />

      <AnimatePresence>
        {quoteOpen && <QuotePanel onClose={() => setQuoteOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

/* Style reminder: Desert Modernism — warm ivory canvas, ink-blue type, eucalyptus accent, editorial asymmetry */
import { useState } from "react";
import { TensileCanvas } from "@/components/TensileCanvas";
import { HeroSection } from "@/sections/HeroSection";
import { StatsSection } from "@/sections/StatsSection";
import { ApproachSection } from "@/sections/ApproachSection";
import { SolutionsSection } from "@/sections/SolutionsSection";
import { BlueprintBand } from "@/sections/BlueprintBand";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { ProcessSection } from "@/sections/ProcessSection";
import { EngineeringSection } from "@/sections/EngineeringSection";
import { FaqSection } from "@/sections/FaqSection";
import { ClosingSection } from "@/sections/ClosingSection";
import { QuotePanel } from "@/components/QuotePanel";
import { AnimatePresence } from "framer-motion";

export default function Home() {
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
      <StatsSection />
      <ApproachSection scrollTo={scrollTo} />
      <SolutionsSection />
      <BlueprintBand scrollTo={scrollTo} />
      <ProjectsSection onQuoteOpen={() => setQuoteOpen(true)} />
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

import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Wind, SunMedium } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

const heroImage = "/images/hero.jpg";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.23, 1, 0.32, 1] as const } },
};

interface HeroSectionProps {
  onQuoteOpen: () => void;
  scrollTo: (id: string) => void;
}

export function HeroSection({ onQuoteOpen, scrollTo }: HeroSectionProps) {
  const { content } = useContent();

  const eyebrow = content?.company?.tagline || "Tensile Architecture & Cantilever Shades / Pakistan";
  const heading = content?.company?.heroHeading || "Shade becomes architecture when every curve has a reason.";
  const lede = content?.company?.heroSub || "Custom membrane structures and cantilever parking shades engineered for Pakistan's climate. Designed, fabricated, and installed as one considered whole.";
  const whatsappNumber = (content?.company?.whatsapp || "923001234567").replace(/[^0-9]/g, "");

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Copy & Actions */}
          <motion.div
            className="hero-copy"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p className="eyebrow" variants={itemVariants}>
              {eyebrow}
            </motion.p>
            <motion.h1 variants={itemVariants}>
              {heading}
            </motion.h1>
            <motion.p className="hero-lede" variants={itemVariants}>
              {lede}
            </motion.p>
            <motion.div className="hero-actions" variants={itemVariants}>
              <button className="button button-solid" onClick={onQuoteOpen}>
                Tell us about your space <ArrowUpRight size={17} />
              </button>
              <button className="text-link" onClick={() => scrollTo("projects")}>
                Explore selected work <span>↘</span>
              </button>
            </motion.div>

            {/* Quick Engineering Trust Badges */}
            <motion.div className="hero-badges-row" variants={itemVariants}>
              <div className="hero-badge-pill">
                <ShieldCheck size={16} />
                <span>15-Year Fabric Warranty</span>
              </div>
              <div className="hero-badge-pill">
                <Wind size={16} />
                <span>140 km/h Wind Rated</span>
              </div>
              <div className="hero-badge-pill">
                <SunMedium size={16} />
                <span>100% UV Block PVDF/PTFE</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Showcase Image Card */}
          <motion.div
            className="hero-image-wrap"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
          >
            <div className="hero-image-card">
              <img
                src={heroImage}
                alt="TSP Tensile executive cantilever car parking membrane canopy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/images/commercial.jpg";
                }}
              />
              <div className="hero-image-overlay">
                <div className="hero-image-caption">
                  <span>Flagship Project · TSP Tensile</span>
                  <strong>Executive Cantilever Tensile Shade</strong>
                </div>
                <span className="hero-spec-tag">Zero-Rust 316 Rigging</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

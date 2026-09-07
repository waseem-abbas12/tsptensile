import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const images = {
  hero: "/manus-storage/tensile-hero_d649ec63.jpg",
  mark: "/manus-storage/tensile-mark_1a7db8b0.png",
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const } },
};

interface HeroSectionProps {
  onQuoteOpen: () => void;
  scrollTo: (id: string) => void;
}

export function HeroSection({ onQuoteOpen, scrollTo }: HeroSectionProps) {
  return (
    <section className="hero-section">
      {/* Hero image slides in from right */}
      <motion.div
        className="hero-image"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.0, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
      >
        <img src={images.hero} alt="White tensile canopy over a modern arrival court" />
      </motion.div>

      {/* Copy block staggers in */}
      <motion.div
        className="hero-copy"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="eyebrow" variants={itemVariants}>
          Tensile architecture / Pakistan
        </motion.p>
        <motion.h1 variants={itemVariants}>
          Shade becomes architecture when every curve has a reason.
        </motion.h1>
        <motion.p className="hero-lede" variants={itemVariants}>
          Custom membrane structures for places that deserve more than an
          afterthought. Designed, engineered and installed as one considered whole.
        </motion.p>
        <motion.div className="hero-actions" variants={itemVariants}>
          <button className="button button-solid" onClick={onQuoteOpen}>
            Tell us about your space <ArrowUpRight size={17} />
          </button>
          <button className="text-link" onClick={() => scrollTo("projects")}>
            Explore selected work <span>↘</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Index rail */}
      <motion.div
        className="hero-index"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <span>01</span>
        <span className="index-line" />
        <span>06</span>
        <small>SCROLL TO EXPLORE</small>
      </motion.div>
    </section>
  );
}

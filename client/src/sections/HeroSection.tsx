import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Wind, SunMedium, ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { HeroVerticalSocials } from "@/components/SocialIcons";

interface HeroSlide {
  image: string;
  project: string;
  title: string;
  spec: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    image: "/images/hero.jpg",
    project: "Flagship Project · TSP Tensile",
    title: "Executive Cantilever Car Parking Shade",
    spec: "Zero-Rust 316 Rigging",
  },
  {
    image: "/images/hero_flagship.jpg",
    project: "Commercial Landmark · DHA Lahore",
    title: "Hyperbolic Paraboloid Architectural Canopy",
    spec: "140 km/h Wind Certified",
  },
  {
    image: "/images/hero_luxury.jpg",
    project: "Private Residence · Bahria Town",
    title: "Luxury Swimming Pool Tensile Membrane",
    spec: "100% UV & Heat Shield",
  },
  {
    image: "/images/hero_canopy.jpg",
    project: "Institutional Plaza · Islamabad",
    title: "Architectural Entrance Arch & Walkway",
    spec: "German Mehler PVDF Fabric",
  },
];

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const eyebrow = content?.company?.tagline || "Tensile Architecture & Cantilever Shades / Pakistan";
  const heading = content?.company?.heroHeading || "Shade becomes architecture when every curve has a reason.";
  const lede = content?.company?.heroSub || "Custom membrane structures and cantilever parking shades engineered for Pakistan's climate. Designed, fabricated, and installed as one considered whole.";

  // Auto slide every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const active = HERO_SLIDES[currentSlide];

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

          {/* Right Column: Hero Luxury Image Carousel */}
          <motion.div
            className="hero-image-wrap"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="hero-image-card">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active.image}
                  src={active.image}
                  alt={active.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/commercial.jpg";
                  }}
                />
              </AnimatePresence>

              {/* Slide Navigation Arrows (Hover) */}
              <div className="hero-slider-arrows" aria-hidden="true">
                <button
                  className="hero-arrow-btn prev"
                  onClick={prevSlide}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  className="hero-arrow-btn next"
                  onClick={nextSlide}
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Caption Overlay */}
              <div className="hero-image-overlay">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="hero-image-caption"
                  >
                    <span>{active.project}</span>
                    <strong>{active.title}</strong>
                  </motion.div>
                </AnimatePresence>
                <span className="hero-spec-tag">{active.spec}</span>
              </div>

              {/* Slide Indicator Dots */}
              <div className="hero-slider-dots">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    className={`hero-slider-dot ${idx === currentSlide ? "active" : ""}`}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <HeroVerticalSocials />
    </section>
  );
}

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation, staggerContainer, fadeUp, slideInLeft, slideInRight } from "@/hooks/useScrollAnimation";

const images = {
  detail: "/images/detail.jpg",
};

interface EngineeringSectionProps {
  onQuoteOpen: () => void;
}

export function EngineeringSection({ onQuoteOpen }: EngineeringSectionProps) {
  const { ref, isInView } = useScrollAnimation({ amount: 0.15 });

  return (
    <section className="engineering-section" id="engineering" ref={ref}>
      <motion.div
        className="engineering-image"
        variants={slideInLeft}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <img
          src={images.detail}
          alt="Close detail of tensile fabric seam and steel connection"
        />
      </motion.div>

      <motion.div
        className="engineering-copy"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.p className="eyebrow" variants={fadeUp}>
          The detail matters
        </motion.p>
        <motion.h2 variants={fadeUp}>Performance is part of the beauty.</motion.h2>
        <motion.p variants={fadeUp}>
          Fabric, steel, shade, drainage and maintenance are not hidden
          technicalities. They are what let a structure keep its calm presence
          for years.
        </motion.p>
        <motion.div className="detail-list" variants={fadeUp}>
          <span>
            <b>01</b> Site-led engineering
          </span>
          <span>
            <b>02</b> Material clarity
          </span>
          <span>
            <b>03</b> Installation discipline
          </span>
        </motion.div>
        <motion.button
          className="button button-dark"
          onClick={onQuoteOpen}
          variants={fadeUp}
        >
          Talk to an engineer <ArrowUpRight size={17} />
        </motion.button>
      </motion.div>
    </section>
  );
}

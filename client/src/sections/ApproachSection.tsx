import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  useScrollAnimation,
  staggerContainer,
  fadeUp,
  slideInLeft,
  slideInRight,
} from "@/hooks/useScrollAnimation";

interface ApproachSectionProps {
  scrollTo: (id: string) => void;
}

export function ApproachSection({ scrollTo }: ApproachSectionProps) {
  const { ref, isInView } = useScrollAnimation({ amount: 0.2 });

  return (
    <section className="statement-section" id="approach" ref={ref}>
      <motion.div
        className="section-rail"
        variants={slideInLeft}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <span>02</span>
        <span>OUR APPROACH</span>
      </motion.div>

      <motion.div
        className="statement-content"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.p className="eyebrow" variants={fadeUp}>
          Built around the site
        </motion.p>
        <motion.h2 variants={fadeUp}>
          We make shade feel like it was always meant to be there.
        </motion.h2>
        <motion.div className="statement-bottom" variants={fadeUp}>
          <p>
            From a first sketch to the final tension, our work sits between
            architecture and everyday comfort. We read the site, find the
            gesture and build the details to hold it.
          </p>
          <button
            className="circle-arrow"
            onClick={() => scrollTo("process")}
            aria-label="Read our process"
          >
            <ArrowUpRight size={22} />
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="statement-mark"
        variants={slideInRight}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <span>F</span>
        <span>F</span>
      </motion.div>
    </section>
  );
}

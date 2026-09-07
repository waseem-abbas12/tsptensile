import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation, staggerContainer, fadeUp } from "@/hooks/useScrollAnimation";

interface ClosingSectionProps {
  onQuoteOpen: () => void;
}

export function ClosingSection({ onQuoteOpen }: ClosingSectionProps) {
  const { ref, isInView } = useScrollAnimation({ amount: 0.2 });

  return (
    <section className="closing-section" ref={ref}>
      <div className="closing-mark">↗</div>
      <motion.div
        className="container closing-content"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.p className="eyebrow" variants={fadeUp}>
          Have a space in mind?
        </motion.p>
        <motion.h2 variants={fadeUp}>
          Let's bring the structure into focus.
        </motion.h2>
        <motion.p className="closing-subline" variants={fadeUp}>
          Tell us about the space. We'll bring the structure into focus.
        </motion.p>
        <motion.button
          className="button button-solid"
          onClick={onQuoteOpen}
          variants={fadeUp}
        >
          Share your project <ArrowUpRight size={17} />
        </motion.button>
      </motion.div>
    </section>
  );
}

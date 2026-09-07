import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation, staggerContainer, fadeUp } from "@/hooks/useScrollAnimation";

interface BlueprintBandProps {
  scrollTo: (id: string) => void;
}

export function BlueprintBand({ scrollTo }: BlueprintBandProps) {
  const { ref, isInView } = useScrollAnimation({ amount: 0.2 });

  return (
    <section className="blueprint-band" ref={ref}>
      <div className="blueprint-grid" />
      <motion.div
        className="container blueprint-content"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.p className="eyebrow" variants={fadeUp}>
          Material / movement / light
        </motion.p>
        <motion.h2 variants={fadeUp}>Good structure is quiet confidence.</motion.h2>
        <motion.div className="blueprint-meta" variants={fadeUp}>
          <span>01 — Fabric tension</span>
          <span>02 — Steel logic</span>
          <span>03 — Rain &amp; shade</span>
          <button
            className="button button-outline-light"
            onClick={() => scrollTo("engineering")}
          >
            See how we think <ArrowUpRight size={17} />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

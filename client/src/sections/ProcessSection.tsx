import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation, staggerContainer, fadeUp } from "@/hooks/useScrollAnimation";

const steps = [
  {
    num: "01",
    title: "Listen & measure",
    desc: "We understand the site, the use and the conditions around it. A short visit or a set of photos is often enough to begin.",
  },
  {
    num: "02",
    title: "Shape the idea",
    desc: "Clear concepts and considered geometry make the direction tangible. You see the form before a single bolt is ordered.",
  },
  {
    num: "03",
    title: "Engineer the detail",
    desc: "Structure, fabric, drainage and fixing are resolved together — not handed off to a separate consultant.",
  },
  {
    num: "04",
    title: "Make & install",
    desc: "The finished form arrives with a team that knows why every part is there. We stay on site until the work is right.",
  },
];

interface ProcessSectionProps {
  onQuoteOpen: () => void;
}

export function ProcessSection({ onQuoteOpen }: ProcessSectionProps) {
  const { ref, isInView } = useScrollAnimation({ amount: 0.1 });

  return (
    <section className="process-section" id="process" ref={ref}>
      <div className="container process-layout">
        <motion.div
          className="process-intro"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p className="eyebrow" variants={fadeUp}>
            How it comes together
          </motion.p>
          <motion.h2 variants={fadeUp}>Less handover. More ownership.</motion.h2>
          <motion.p variants={fadeUp}>
            One team carries the idea from the first conversation to the last
            bolt. That is how the details stay connected.
          </motion.p>
          <motion.button
            className="text-link"
            onClick={onQuoteOpen}
            variants={fadeUp}
          >
            Start a conversation <span>↗</span>
          </motion.button>
        </motion.div>

        <div className="timeline" ref={ref}>
          {/* Animated vertical line */}
          <motion.div
            className="timeline-line"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
            style={{ transformOrigin: "top" }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="timeline-item"
              initial={{ opacity: 0, x: 30 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: 30 }
              }
              transition={{
                delay: 0.3 + i * 0.18,
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <div className="timeline-dot" />
              <div className="timeline-content">
                <span className="timeline-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

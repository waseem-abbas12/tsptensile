import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useScrollAnimation, staggerContainer, fadeUp } from "@/hooks/useScrollAnimation";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 120, suffix: "+", label: "Projects delivered" },
  { value: 8, suffix: "", label: "Years building" },
  { value: 4, suffix: "", label: "Cities served" },
  { value: 100, suffix: "%", label: "In-house team" },
];

function AnimatedNumber({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18 });
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isInView) {
      motionVal.set(value);
    }
  }, [isInView, motionVal, value]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = `${Math.round(latest)}${suffix}`;
      }
    });
  }, [spring, suffix]);

  return (
    <span ref={displayRef} className="stat-number">
      0{suffix}
    </span>
  );
}

export function StatsSection() {
  const { ref, isInView } = useScrollAnimation({ amount: 0.3 });

  return (
    <section className="stats-section" ref={ref}>
      <div className="container">
        <motion.div
          className="stats-grid"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} className="stat-item" variants={fadeUp}>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} isInView={isInView} />
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import {
  useScrollAnimation,
  staggerContainer,
  fadeUp,
  slideInLeft,
  slideInRight,
} from "@/hooks/useScrollAnimation";

const images = {
  pool: "/images/commercial.jpg",
};

const solutionItems = [
  {
    num: "01",
    title: "Arrival & parking",
    desc: "Elegant cover for the moments between the road and the door.",
  },
  {
    num: "02",
    title: "Walkways & entrances",
    desc: "Light, continuous structures that guide people through a place.",
  },
  {
    num: "03",
    title: "Pool & recreation",
    desc: "Cool, composed shelter that lets outdoor life stay outdoors.",
  },
  {
    num: "04",
    title: "Custom membranes",
    desc: "One-off forms shaped around the way your site is actually used.",
  },
];

export function SolutionsSection() {
  const { ref, isInView } = useScrollAnimation({ amount: 0.15 });

  return (
    <section className="solutions-section" id="solutions" ref={ref}>
      <div className="container">
        <motion.div
          className="section-heading-row"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp}>
            <p className="eyebrow">What we make</p>
            <h2>Useful shelter. Strong presence.</h2>
          </motion.div>
          <motion.p className="heading-note" variants={fadeUp}>
            Every brief is different. The system stays clear: understand the
            place, design the response, make it last.
          </motion.p>
        </motion.div>

        <div className="solutions-layout">
          <motion.div
            className="solution-feature"
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <img src={images.pool} alt="Tensile pool shade in warm daylight" />
            <div className="image-caption">
              <span>01 / POOL &amp; GARDEN</span>
              <span>Explore the possibilities ↗</span>
            </div>
          </motion.div>

          <motion.div
            className="solution-list"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {solutionItems.map((item) => (
              <motion.div key={item.num} variants={fadeUp}>
                <span>{item.num}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

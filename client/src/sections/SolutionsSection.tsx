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
    title: "Cantilever Parking & Porch Sheds",
    desc: "Obstruction-free zero front-column parking shades for residential villas, corporate plazas & EV bays.",
  },
  {
    num: "02",
    title: "Industrial, Factory & Warehouse Sheds",
    desc: "Heavy-duty steel structure sheds, pre-engineered buildings (PEB), workshops & dairy farm sheds.",
  },
  {
    num: "03",
    title: "Swimming Pool, Padel & Sports Sheds",
    desc: "Heatproof & UV-blocking tensile fabric canopies for pools, padel courts, and sports arenas.",
  },
  {
    num: "04",
    title: "Marquees, Shadi Halls & Gazebos",
    desc: "Clear-span architectural tensile membrane roofs, banquet lawns, covered walkways & entrance arches.",
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

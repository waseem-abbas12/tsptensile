import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation, fadeUp, staggerContainer } from "@/hooks/useScrollAnimation";

const images = {
  hero: "/manus-storage/tensile-hero_d649ec63.jpg",
  pool: "/manus-storage/tensile-project-pool_7a74d370.jpg",
  walkway: "/manus-storage/tensile-project-walkway_6b2a07e8.jpg",
  detail: "/manus-storage/tensile-detail_0f9d56cf.jpg",
};

const projects = [
  {
    title: "The arrival canopy",
    type: "Commercial",
    city: "Lahore",
    system: "PVC membrane · Steel mast",
    image: images.hero,
    number: "01",
  },
  {
    title: "Pool house membrane",
    type: "Residential",
    city: "Islamabad",
    system: "HDPE shade · Tension cable",
    image: images.pool,
    number: "02",
  },
  {
    title: "Garden link walkway",
    type: "Hospitality",
    city: "Rawalpindi",
    system: "PTFE tensioned · Timber posts",
    image: images.walkway,
    number: "03",
  },
  {
    title: "Corporate parking canopy",
    type: "Commercial",
    city: "Lahore",
    system: "Modular steel · Polycarbonate",
    image: images.detail,
    number: "04",
  },
  {
    title: "Rooftop garden shade",
    type: "Residential",
    city: "Islamabad",
    system: "Sail shade · Stainless steel",
    image: images.hero,
    number: "05",
  },
  {
    title: "Hotel terrace pergola",
    type: "Hospitality",
    city: "Karachi",
    system: "Retractable awning · Aluminium",
    image: images.pool,
    number: "06",
  },
];

const filters = ["All", "Commercial", "Residential", "Hospitality"];

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.23, 1, 0.32, 1] as const,
    },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

interface ProjectsSectionProps {
  onQuoteOpen: () => void;
}

export function ProjectsSection({ onQuoteOpen }: ProjectsSectionProps) {
  const [filter, setFilter] = useState("All");
  const { ref, isInView } = useScrollAnimation({ amount: 0.1 });

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.type === filter),
    [filter]
  );

  return (
    <section className="projects-section" id="projects" ref={ref}>
      <div className="container">
        <motion.div
          className="section-heading-row"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp}>
            <p className="eyebrow">Selected work</p>
            <h2>Projects with a point of view.</h2>
          </motion.div>
          <motion.div className="filter-tabs" variants={fadeUp}>
            {filters.map((item) => (
              <button
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <div className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.title}
                className={`project-card project-${(i % 3) + 1}`}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-info">
                  <span>
                    {project.number} / {project.city}
                  </span>
                  <h3>{project.title}</h3>
                  <p>{project.type} structure</p>
                  <span className="project-system">{project.system}</span>
                  <ArrowUpRight size={19} />
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="projects-cta"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button className="button button-solid" onClick={onQuoteOpen}>
            Start your project <ArrowUpRight size={17} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

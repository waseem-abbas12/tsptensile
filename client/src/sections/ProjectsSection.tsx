import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation, fadeUp, staggerContainer } from "@/hooks/useScrollAnimation";
import { useContent } from "@/contexts/ContentContext";

const filters = ["All", "Commercial", "Residential", "Hospitality", "Institutional"];

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
  const { content } = useContent();
  const [filter, setFilter] = useState("All");
  const { ref, isInView } = useScrollAnimation({ amount: 0.1 });

  const projectList = content?.projects?.length ? content.projects : [];

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projectList
        : projectList.filter((p) => p.type.toLowerCase() === filter.toLowerCase()),
    [filter, projectList]
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
                key={project.id || project.title}
                className={`project-card project-${(i % 3) + 1}`}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                onClick={onQuoteOpen}
                style={{ cursor: "pointer" }}
              >
                <div className="project-image">
                  <img
                    src={project.image || "/images/hero.jpg"}
                    alt={project.title}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/hero.jpg";
                    }}
                  />
                </div>
                <div className="project-info">
                  <span>
                    {project.id ? (project.id.length === 1 ? `0${project.id}` : project.id) : `0${i + 1}`} / {project.city}
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

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation, fadeUp, staggerContainer } from "@/hooks/useScrollAnimation";
import { TensileCanvas } from "@/components/TensileCanvas";
import { useContent } from "@/contexts/ContentContext";

const images = {
  hero: "/manus-storage/tensile-hero_d649ec63.jpg",
  pool: "/manus-storage/tensile-project-pool_7a74d370.jpg",
  walkway: "/manus-storage/tensile-project-walkway_6b2a07e8.jpg",
  detail: "/manus-storage/tensile-detail_0f9d56cf.jpg",
};

const ALL_PROJECTS = [
  { id: "01", title: "The Arrival Canopy", type: "Commercial", city: "Lahore", system: "PVC membrane · Steel mast", image: images.hero, year: "2023", area: "420 m²", description: "A welcoming entry canopy for a corporate campus in DHA Lahore. The asymmetric single-mast form anchors the main gate while allowing full vehicular clearance below." },
  { id: "02", title: "Pool House Membrane", type: "Residential", city: "Islamabad", system: "HDPE shade · Tension cable", image: images.pool, year: "2023", area: "180 m²", description: "A lightweight HDPE membrane spans the pool and adjacent terrace of a private villa in F-7. The geometry follows the sun path — maximum shade from 10am to 4pm." },
  { id: "03", title: "Garden Link Walkway", type: "Hospitality", city: "Rawalpindi", system: "PTFE tensioned · Timber posts", image: images.walkway, year: "2024", area: "95 m × 3.2 m", description: "A 95-metre covered walkway connecting the restaurant building to the garden pavilion of a boutique hotel. PTFE fabric lets in diffused daylight while blocking direct sun and rain." },
  { id: "04", title: "Corporate Parking Canopy", type: "Commercial", city: "Lahore", system: "Modular steel · Polycarbonate", image: images.detail, year: "2024", area: "1,200 m²", description: "A modular canopy system covering 120 parking bays for a corporate office in Gulberg. Polycarbonate panels allow ambient light through while blocking UV." },
  { id: "05", title: "Rooftop Garden Shade", type: "Residential", city: "Islamabad", system: "Sail shade · Stainless steel", image: images.hero, year: "2024", area: "340 m²", description: "Three overlapping sail shades create a layered canopy over the rooftop garden of a residential tower in Blue Area. Each sail is independently adjustable for seasonal sun angles." },
  { id: "06", title: "Hotel Terrace Pergola", type: "Hospitality", city: "Karachi", system: "Retractable awning · Aluminium", image: images.pool, year: "2025", area: "260 m²", description: "A motorised retractable fabric pergola over the sea-facing terrace of a boutique hotel in Clifton. Wind sensors auto-retract the fabric above 45 km/h." },
  { id: "07", title: "School Sports Canopy", type: "Institutional", city: "Lahore", system: "HDPE shade · Galvanised posts", image: images.walkway, year: "2025", area: "800 m²", description: "A large free-standing HDPE shade structure covering the main sports ground of a private school in DHA. Engineered to withstand Lahore's summer storms." },
  { id: "08", title: "Shopping Mall Entry", type: "Commercial", city: "Islamabad", system: "PVC tensioned · Glass fins", image: images.detail, year: "2025", area: "560 m²", description: "A dramatic tensile entry canopy for a new retail mall in Bahria Town. The doubly-curved PVC membrane is backlit at night, creating a luminous landmark." },
];

const FILTERS = ["All", "Commercial", "Residential", "Hospitality", "Institutional"];

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] as const } }),
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.22 } },
};

export default function ProjectsPage() {
  const { content } = useContent();
  const ALL_PROJECTS = content.projects;
  const [filter, setFilter] = useState("All");
  const { ref, isInView } = useScrollAnimation({ amount: 0.05 });

  const filtered = useMemo(() =>
    filter === "All" ? ALL_PROJECTS : ALL_PROJECTS.filter((p) => p.type === filter),
    [filter]
  );

  return (
    <div className="inner-page">
      {/* Page hero */}
      <section className="page-hero" style={{ background: "var(--ink)" }}>
        <div className="tensile-canvas-wrap">
          <TensileCanvas />
        </div>
        <div className="container page-hero-content">
          <motion.p className="eyebrow" style={{ color: "var(--sage)" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Selected work</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}>
            Every project, a specific answer to a specific place.
          </motion.h1>
          <motion.p className="page-hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            {ALL_PROJECTS.length} completed projects across 4 cities. Residential, commercial, hospitality and institutional.
          </motion.p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="projects-section" ref={ref}>
        <div className="container">
          <div className="filter-tabs-center">
            {FILTERS.map((f) => (
              <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>

          <div className="projects-grid-full">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.article key={p.title} className="project-card-full" custom={i} variants={cardVariants} initial="hidden" animate="visible" exit="exit" layout>
                  <div className="project-image">
                    <img src={p.image} alt={p.title} style={{ objectPosition: i % 3 === 2 ? "center top" : "center" }} />
                    <div className="project-overlay">
                      <div className="project-overlay-meta">
                        <span>{p.system}</span>
                        <span>{p.area}</span>
                      </div>
                    </div>
                  </div>
                  <div className="project-info">
                    <div className="project-info-top">
                      <span className="project-id">{p.id}</span>
                      <span className="project-type">{p.type}</span>
                      <span className="project-year">{p.year}</span>
                    </div>
                    <h3>{p.title}</h3>
                    <p className="project-city">📍 {p.city}</p>
                    <p className="project-desc">{p.description}</p>
                    <span className="project-system">{p.system}</span>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation, fadeUp, staggerContainer } from "@/hooks/useScrollAnimation";
import { TensileCanvas } from "@/components/TensileCanvas";
import { useContent } from "@/contexts/ContentContext";

const images = {
  hero: "/images/hero.jpg",
  pool: "/images/commercial.jpg",
  walkway: "/images/walkway.jpg",
  detail: "/images/detail.jpg",
};

const ALL_PROJECTS = [
  {
    id: "01",
    title: "National EV Fast-Charging Station Canopy",
    type: "Commercial",
    city: "Lahore",
    system: "Cantilever Wing · EV Infrastructure Shade",
    image: "/images/project_ev_charging_canopy.jpg",
    year: "2024",
    area: "350 m²",
    description: "Custom-fabricated architectural cantilever tensile canopy sheltering electric vehicle (EV) fast-charging infrastructure at an elite colonial heritage landmark estate in Lahore."
  },
  {
    id: "02",
    title: "Radio Pakistan Executive Parking Canopy",
    type: "Commercial",
    city: "Islamabad",
    system: "Cantilever Arch · Tensile Membrane",
    image: "/images/project_radio_pakistan.jpg",
    year: "2024",
    area: "650 m²",
    description: "Custom-engineered double cantilever arch tensile car parking structure for the national broadcasting headquarters (Radio Pakistan), sheltering executive vehicles with high UV-reflective membrane."
  },
  {
    id: "03",
    title: "DHA Luxury Villa Row Gate & Driveway Shades",
    type: "Residential",
    city: "Lahore",
    system: "Modular Cantilever · Architectural Awning",
    image: "/images/project_dha_street_villas.jpg",
    year: "2024",
    area: "480 m²",
    description: "Continuous custom cantilever tensile driveway canopies designed for modern luxury townhouses in DHA Phase 6, featuring sleek minimal steel frames and high-tension membrane."
  },
  {
    id: "04",
    title: "The Grand Arrival Canopy",
    type: "Commercial",
    city: "Lahore",
    system: "PTFE Membrane · Steel Mast",
    image: "/images/hero_luxury.jpg",
    year: "2024",
    area: "420 m²",
    description: "Double-curved hyperbolic paraboloid white PTFE architectural membrane canopy suspended by tapered steel masts over a modern corporate campus entrance."
  },
  {
    id: "03",
    title: "Padel & Multi-Sport Arena Long-Span Roof",
    type: "Institutional",
    city: "Lahore",
    system: "Barrel Vault Arch · Tensile Roof",
    image: "/images/project_sports_arena.jpg",
    year: "2024",
    area: "1,800 m²",
    description: "Massive clear-span structural steel arched truss framework covered with weatherproof tensile membrane for professional indoor padel courts and sports facilities."
  },
  {
    id: "04",
    title: "Executive Cantilever Car Parking Bays",
    type: "Commercial",
    city: "Lahore",
    system: "Heavy Steel Cantilever · PVC Membrane",
    image: "/images/commercial.jpg",
    year: "2024",
    area: "1,200 m²",
    description: "High-end cantilevered tensile canopy sheltering luxury corporate executive parking with zero front-column obstruction for effortless vehicle maneuverability."
  },
  {
    id: "05",
    title: "Private Villa Gate & Driveway Canopy",
    type: "Residential",
    city: "Islamabad",
    system: "Curved Arch · Polycarbonate & Membrane",
    image: "/images/project_residential_gate.jpg",
    year: "2023",
    area: "120 m²",
    description: "Bespoke residential entrance gate canopy engineered to seamlessly integrate with villa boundary architecture, providing shade from street to driveway."
  },
  {
    id: "06",
    title: "Heritage Conservation Canopy (ETPB)",
    type: "Institutional",
    city: "Lahore",
    system: "Heritage Cantilever · Protective Canopy",
    image: "/images/project_heritage_site.jpg",
    year: "2023",
    area: "250 m²",
    description: "Government of Pakistan heritage conservation installation at historic landmark site, custom-fabricated to preserve site aesthetics while providing essential sun and rain protection."
  },
  {
    id: "07",
    title: "Villa Pool Terrace Tensile Membrane",
    type: "Residential",
    city: "Islamabad",
    system: "Hyperbolic Paraboloid · Tension Cable",
    image: "/images/luxury_pool.jpg",
    year: "2023",
    area: "180 m²",
    description: "Sculptural sail shade structure spanning private villa swimming pool and travertine deck in F-7 Islamabad, engineered for optimal seasonal sun protection."
  },
  {
    id: "08",
    title: "Heavy Steel Truss & Architectural Framework",
    type: "Commercial",
    city: "Lahore",
    system: "Precision CNC · Arched Steel Trusses",
    image: "/images/project_steel_engineering.jpg",
    year: "2024",
    area: "Heavy Fabrication",
    description: "In-house structural engineering and fabrication of arched steel roof trusses, tested for heavy wind loads, seismic resilience, and precise membrane pre-stressing."
  },
  {
    id: "09",
    title: "Arch Cantilever Parking Shade Structure",
    type: "Commercial",
    city: "Rawalpindi",
    system: "Tubular Steel · Curved PVC Membrane",
    image: "/images/project_cantilever_parking.jpg",
    year: "2025",
    area: "450 m²",
    description: "Modular arch cantilever car parking shade with powder-coated steel posts and curved waterproof fabric covering multiple parking bays."
  },
  {
    id: "10",
    title: "Garden Link Covered Walkway",
    type: "Hospitality",
    city: "Rawalpindi",
    system: "PTFE Tensioned · Timber & Steel",
    image: "/images/luxury_walkway.jpg",
    year: "2024",
    area: "95 m × 3.2 m",
    description: "Undulating covered tensile walkway connecting hotel suites with lush landscaped pavilions, filtering soft natural daylight while deflecting rain."
  },
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

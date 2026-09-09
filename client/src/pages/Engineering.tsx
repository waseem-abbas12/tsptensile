import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation, staggerContainer, fadeUp, slideInLeft, slideInRight } from "@/hooks/useScrollAnimation";
import { TensileCanvas } from "@/components/TensileCanvas";

const images = {
  detail: "/images/detail.jpg",
  walkway: "/images/walkway.jpg",
};

const materials = [
  { name: "PVC-coated Polyester", tensile: "2,800 N/5cm", tear: "350 N", lifespan: "20–25 yr", weight: "900–1,050 g/m²", fire: "Class B1", uses: "Commercial, institutional, permanent" },
  { name: "HDPE Shade Cloth", tensile: "480 N/5cm", tear: "120 N", lifespan: "5–8 yr", weight: "180–330 g/m²", fire: "Class E", uses: "Residential, agricultural, budget" },
  { name: "PTFE / Glass Fibre", tensile: "5,200 N/5cm", tear: "720 N", lifespan: "30+ yr", weight: "1,100–1,400 g/m²", fire: "Class A1 (non-combustible)", uses: "Premium, landmark, airport" },
  { name: "ETFE Foil", tensile: "3,900 N/5cm", tear: "280 N", lifespan: "40+ yr", weight: "150–300 g/m²", fire: "Class B1", uses: "Ultra-premium, botanical, roofing" },
];

const principles = [
  { title: "Structure and fabric resolve together", desc: "We do not design a form and then ask an engineer to make it stand. The structural logic and the geometry are developed by the same people, in the same conversation." },
  { title: "Every connection is drawn before it is made", desc: "Termination plates, mast shoes, anchor bolts — each one is detailed in the fabrication drawings. Nothing is left to site improvisation." },
  { title: "Drainage is geometry, not an afterthought", desc: "How water leaves the membrane is decided at concept stage. The low points, the drainage channels and the spout positions are part of the design, not a correction added later." },
  { title: "Tension is calibrated, not guessed", desc: "Pre-stress levels are calculated for each cable. On site, tensioning is measured — not done by feel. A tensioning report is part of every handover." },
];

export default function EngineeringPage() {
  const { ref: r1, isInView: iv1 } = useScrollAnimation({ amount: 0.15 });
  const { ref: r2, isInView: iv2 } = useScrollAnimation({ amount: 0.1 });
  const { ref: r3, isInView: iv3 } = useScrollAnimation({ amount: 0.1 });

  return (
    <div className="inner-page">
      <section className="page-hero" style={{ background: "var(--ink)" }}>
        <div className="tensile-canvas-wrap"><TensileCanvas /></div>
        <div className="container page-hero-content">
          <motion.p className="eyebrow" style={{ color: "var(--sage)" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>The detail matters</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}>
            Performance is part of the beauty.
          </motion.h1>
          <motion.p className="page-hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            Fabric, steel, drainage and maintenance are not hidden technicalities — they are what let a structure keep its calm presence for decades.
          </motion.p>
        </div>
      </section>

      {/* Principles */}
      <section className="engineering-principles" ref={r1}>
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate={iv1 ? "visible" : "hidden"}>
            <motion.p className="eyebrow" variants={fadeUp}>Engineering philosophy</motion.p>
            <motion.h2 variants={fadeUp}>Four rules we never break.</motion.h2>
            <div className="principles-grid">
              {principles.map((p, i) => (
                <motion.div key={p.title} className="principle-card" variants={fadeUp} custom={i}>
                  <span className="principle-num">0{i + 1}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Materials table */}
      <section className="materials-section" ref={r2}>
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate={iv2 ? "visible" : "hidden"}>
            <motion.p className="eyebrow" variants={fadeUp}>Fabric specifications</motion.p>
            <motion.h2 variants={fadeUp}>Material comparison.</motion.h2>
            <motion.div className="materials-table-wrap" variants={fadeUp}>
              <table className="materials-table">
                <thead>
                  <tr>
                    <th>Material</th>
                    <th>Tensile strength</th>
                    <th>Tear strength</th>
                    <th>Lifespan</th>
                    <th>Weight</th>
                    <th>Fire rating</th>
                    <th>Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((m) => (
                    <tr key={m.name}>
                      <td><strong>{m.name}</strong></td>
                      <td>{m.tensile}</td>
                      <td>{m.tear}</td>
                      <td>{m.lifespan}</td>
                      <td>{m.weight}</td>
                      <td>{m.fire}</td>
                      <td>{m.uses}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Image split */}
      <section className="engineering-split" ref={r3}>
        <motion.div className="engineering-image" variants={slideInLeft} initial="hidden" animate={iv3 ? "visible" : "hidden"}>
          <img src={images.detail} alt="Cable termination detail" />
        </motion.div>
        <motion.div className="engineering-copy" variants={staggerContainer} initial="hidden" animate={iv3 ? "visible" : "hidden"}>
          <motion.p className="eyebrow" variants={fadeUp}>Site engineering</motion.p>
          <motion.h2 variants={fadeUp}>We stay on site until the work is right.</motion.h2>
          <motion.p variants={fadeUp}>Installation is carried out by the same team that understands the design intent. Tensioning is measured, not guessed. The fabric is checked for proper drainage before we leave.</motion.p>
          <motion.div className="detail-list" variants={fadeUp}>
            <span><b>01</b> Site-led engineering</span>
            <span><b>02</b> Material clarity</span>
            <span><b>03</b> Installation discipline</span>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Link href="/contact" className="button button-dark" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 28 }}>
              Talk to an engineer <ArrowUpRight size={17} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

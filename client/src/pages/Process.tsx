import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation, staggerContainer, fadeUp } from "@/hooks/useScrollAnimation";
import { TensileCanvas } from "@/components/TensileCanvas";

const steps = [
  {
    num: "01",
    title: "Listen & Measure",
    duration: "1–2 days",
    icon: "◎",
    short: "Site visit + brief",
    desc: "Every project begins with the site, not the catalogue. We visit, measure, photograph and listen. What is the space trying to do? What does it feel like in summer at 2pm? What does the client want to feel when they use it?",
    detail: "A short visit or a set of photos and dimensions is often enough to get started. We look at orientation, existing structure, drainage paths, wind exposure and aesthetic context before we draw a single line.",
    deliverable: "Site report + project brief document",
  },
  {
    num: "02",
    title: "Shape the Idea",
    duration: "3–5 days",
    icon: "△",
    short: "Concept design",
    desc: "With the brief clear, we develop the geometry. How the fabric spans. Where the masts sit. How the edge cables resolve at the boundary. We work in plan, section and 3D sketch until the form is something we both believe in.",
    detail: "This is where the design either becomes considered or defaults to catalogue. We spend more time here than anywhere else — because the form you approve at this stage is the form you will live with for 20 years.",
    deliverable: "Concept drawings + 3D visualisation + preliminary material selection",
  },
  {
    num: "03",
    title: "Engineer the Detail",
    duration: "5–10 days",
    icon: "□",
    short: "Structural + fabric engineering",
    desc: "Structure, fabric, drainage and fixing are resolved together — not handed to a separate consultant who has never seen the brief. The engineers and designers work in the same room.",
    detail: "We calculate membrane tension, mast loads, foundation requirements and fabric patterning. Every connection detail — how a cable terminates at a plate, how a mast base is anchored — is drawn before fabrication begins.",
    deliverable: "Structural calculations + fabrication drawings + specification",
  },
  {
    num: "04",
    title: "Fabricate & Install",
    duration: "2–4 weeks",
    icon: "◉",
    short: "Manufacture + site installation",
    desc: "The finished form arrives with a team that knows exactly why every part is where it is. We stay on site until the structure is right — tensioned correctly, draining properly, looking exactly as drawn.",
    detail: "Fabric is cut and welded in our workshop. Steel is fabricated by our partner workshop to our drawings. Installation is carried out by the same team that understands the design intent — not a third-party labour contractor.",
    deliverable: "Installed structure + tensioning report + maintenance guide",
  },
];

export default function ProcessPage() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation({ amount: 0.2 });

  return (
    <div className="inner-page">
      <section className="page-hero" style={{ background: "var(--ink)" }}>
        <div className="tensile-canvas-wrap"><TensileCanvas /></div>
        <div className="container page-hero-content">
          <motion.p className="eyebrow" style={{ color: "var(--sage)" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>How we work</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}>
            One team. One conversation. No handover.
          </motion.h1>
          <motion.p className="page-hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            From the first sketch to the final bolt, the same people carry the idea forward.
          </motion.p>
        </div>
      </section>

      {/* Steps */}
      <section className="process-page-section">
        <div className="container">
          {steps.map((step, i) => {
            const { ref, isInView } = useScrollAnimation({ amount: 0.2 });
            return (
              <motion.div key={step.num} className="process-step-full" ref={ref}
                initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}>
                <div className="process-step-marker">
                  <div className="process-step-icon">{step.icon}</div>
                  {i < steps.length - 1 && <div className="process-step-connector" />}
                </div>
                <div className="process-step-body">
                  <div className="process-step-meta">
                    <span className="process-step-num">{step.num}</span>
                    <span className="process-step-duration">{step.duration}</span>
                    <span className="process-step-short">{step.short}</span>
                  </div>
                  <h2>{step.title}</h2>
                  <p className="process-step-desc">{step.desc}</p>
                  <p className="process-step-detail">{step.detail}</p>
                  <div className="process-step-deliverable">
                    <span className="deliverable-label">Deliverable</span>
                    <span>{step.deliverable}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta-band">
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
            <motion.p className="eyebrow" variants={fadeUp}>Ready to begin?</motion.p>
            <motion.h2 variants={fadeUp}>Step one takes 15 minutes.</motion.h2>
            <motion.p variants={fadeUp}>Tell us about your space. We'll come back with the right next step.</motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/contact" className="button button-solid" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 28 }}>
                Start the conversation <ArrowUpRight size={17} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation, staggerContainer, fadeUp } from "@/hooks/useScrollAnimation";
import { TensileCanvas } from "@/components/TensileCanvas";

const values = [
  { num: "01", title: "Site first", desc: "Every decision begins with the specific place and its specific conditions. We do not fit sites to solutions — we fit solutions to sites." },
  { num: "02", title: "Honesty of structure", desc: "We do not hide steel behind cladding or pretend a fabric is weightless. The structure is part of the expression." },
  { num: "03", title: "In-house all the way", desc: "Design, engineering, fabrication and installation are carried out by one team. Handovers multiply error. We eliminate them." },
  { num: "04", title: "Long life, low maintenance", desc: "A structure that requires constant attention is not a solution. We specify materials and details that hold their quality." },
];

const timeline = [
  { year: "2016", event: "Founded in Lahore by Khalid Ahmed with two engineers and one workshop." },
  { year: "2018", event: "First hospitality project — a 400m² shade canopy for a boutique hotel in Gulberg." },
  { year: "2019", event: "Islamabad office opened. First institutional project: PAF Base school sports canopy." },
  { year: "2021", event: "PTFE glass fibre capability added. First landmark structure — shopping mall entry canopy, Bahria Town." },
  { year: "2023", event: "Expanded to Rawalpindi. 80th completed project delivered." },
  { year: "2025", event: "120+ projects. Four cities. One team." },
];

export default function AboutPage() {
  const { ref: r1, isInView: iv1 } = useScrollAnimation({ amount: 0.15 });
  const { ref: r2, isInView: iv2 } = useScrollAnimation({ amount: 0.1 });
  const { ref: r3, isInView: iv3 } = useScrollAnimation({ amount: 0.1 });

  return (
    <div className="inner-page">
      <section className="page-hero" style={{ background: "var(--ink)" }}>
        <div className="tensile-canvas-wrap"><TensileCanvas /></div>
        <div className="container page-hero-content">
          <motion.p className="eyebrow" style={{ color: "var(--sage)" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>About Form/Field</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}>
            We make structures that belong where they are placed.
          </motion.h1>
          <motion.p className="page-hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            Founded in Lahore in 2016. 120+ projects. One conviction: that the space between a structure and its site is where the real design lives.
          </motion.p>
        </div>
      </section>

      {/* Statement */}
      <section className="about-statement" ref={r1}>
        <div className="container">
          <motion.div className="about-statement-inner" variants={staggerContainer} initial="hidden" animate={iv1 ? "visible" : "hidden"}>
            <motion.p className="eyebrow" variants={fadeUp}>Who we are</motion.p>
            <motion.blockquote variants={fadeUp}>
              "The best shade structure is one you stop noticing — because it has become part of the place."
            </motion.blockquote>
            <motion.p variants={fadeUp}>
              Form/Field Structures is a tensile architecture practice based in Lahore, with offices in Islamabad and Rawalpindi. We design, engineer, fabricate and install custom tensile shade and membrane structures for residential, commercial, hospitality and institutional clients across Pakistan.
            </motion.p>
            <motion.p variants={fadeUp}>
              We are not a shade supplier with a catalogue. Every structure we build begins with a site visit, a conversation and a design that responds to the specific place. Our team carries the idea from the first sketch to the final bolt — without handovers.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values" ref={r2}>
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate={iv2 ? "visible" : "hidden"}>
            <motion.p className="eyebrow" variants={fadeUp}>What we believe</motion.p>
            <motion.h2 variants={fadeUp}>Four values that shape every project.</motion.h2>
            <div className="values-grid">
              {values.map((v) => (
                <motion.div key={v.num} className="value-card" variants={fadeUp}>
                  <span className="value-num">{v.num}</span>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline-section" ref={r3}>
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate={iv3 ? "visible" : "hidden"}>
            <motion.p className="eyebrow" variants={fadeUp}>Our history</motion.p>
            <motion.h2 variants={fadeUp}>Nine years in the making.</motion.h2>
            <div className="about-timeline">
              {timeline.map((item, i) => (
                <motion.div key={item.year} className="about-timeline-item" variants={fadeUp} custom={i}>
                  <span className="about-timeline-year">{item.year}</span>
                  <div className="about-timeline-dot" />
                  <p>{item.event}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CEO link */}
      <section className="page-cta-band">
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
            <motion.p className="eyebrow" variants={fadeUp}>Meet the team</motion.p>
            <motion.h2 variants={fadeUp}>The person behind Form/Field.</motion.h2>
            <motion.p variants={fadeUp}>Learn about the vision that shaped the practice.</motion.p>
            <motion.div variants={fadeUp} style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 28 }}>
              <Link href="/about/ceo" className="button button-solid" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                About the CEO <ArrowUpRight size={17} />
              </Link>
              <Link href="/contact" className="button button-outline" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                Get in touch <ArrowUpRight size={17} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

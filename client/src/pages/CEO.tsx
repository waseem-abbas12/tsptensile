import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, Quote } from "lucide-react";
import { useScrollAnimation, staggerContainer, fadeUp } from "@/hooks/useScrollAnimation";
import { useContent } from "@/contexts/ContentContext";
import { useSEO } from "@/hooks/useSEO";

const milestones = [
  { year: "2008", text: "Joined Haif Trading & Contracting Company, Riyadh — 6 years of structural steel erection and fabrication across Saudi Arabia." },
  { year: "2014", text: "Moved to SAJCO (Shibh Al-Jazira Contracting Company) as Erection Engineer — deepened expertise in structural fabrication and site coordination." },
  { year: "2016", text: "Returned to Pakistan. Joined Sarwar & Company as Structural Foreman — contributed to the KOTO Hydro Power Project." },
  { year: "2018", text: "In-Charge of Structural Erection & Fabrication at FWO (Frontier Works Organization) — overseeing full site execution." },
  { year: "2019", text: "Joined Descon Engineering Ltd. as Foreman — applying 10+ years of Pakistan and Saudi experience to landmark engineering projects." },
  { year: "2025", text: "120+ tensile and shade projects delivered across Pakistan's most prestigious housing societies, corporations, hospitals and government institutions." },
];

export default function CeoPage() {
  useSEO({
    title: "Shaukat Rauf - Founder & CEO | TSP Tensile Pakistan",
    description: "Meet Shaukat Rauf, Founder & CEO of TSP Tensile. 18+ years of mechanical and structural engineering experience across Haif Trading (Saudi Arabia), Descon, and FWO.",
    path: "/about/ceo",
    keywords: "shaukat rauf ceo, tsp tensile founder, structural tensile engineering expert pakistan",
    breadcrumbs: [
      { name: "About", url: "/about" },
      { name: "CEO Profile", url: "/about/ceo" }
    ]
  });

  const { content } = useContent();
  const ceo = content?.ceo || {
    name: "Shaukat Rauf",
    title: "Founder & Chief Executive",
    intro: "Shaukat Rauf is a Mechanical & Architectural Engineering professional with 18+ years of experience spanning Saudi Arabia and Pakistan.",
    years: "18+",
    projects: "120+",
    teamSize: "24",
    quotes: [],
  };

  const ceoQuotes = ceo.quotes?.length ? ceo.quotes : [
    "The best tensile structure is one that looks inevitable — as if it could only have been that form in that place.",
    "We spend more time on a connection detail than most contractors spend on an entire design.",
    "Pakistan has some of the most demanding climates for outdoor structures. That demands better engineering, not cheaper materials.",
  ];

  const { ref: r1, isInView: iv1 } = useScrollAnimation({ amount: 0.2 });
  const { ref: r2, isInView: iv2 } = useScrollAnimation({ amount: 0.15 });
  const { ref: r3, isInView: iv3 } = useScrollAnimation({ amount: 0.15 });

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="inner-page">
      {/* CEO Hero */}
      <section className="ceo-hero">
        <div className="container ceo-hero-inner">
          <motion.div className="ceo-text" variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p className="eyebrow" variants={fadeUp}>Leadership</motion.p>
            <motion.h1 variants={fadeUp}>{ceo.name}</motion.h1>
            <motion.p className="ceo-title" variants={fadeUp}>{ceo.title}</motion.p>
            <motion.p className="ceo-intro" variants={fadeUp}>
              {ceo.intro}
            </motion.p>
            <motion.div className="ceo-credentials" variants={fadeUp}>
              <div><span className="cred-num">{ceo.years}</span><span className="cred-label">Years leading the team</span></div>
              <div><span className="cred-num">{ceo.projects}</span><span className="cred-label">Projects delivered</span></div>
              <div><span className="cred-num">{ceo.teamSize}</span><span className="cred-label">Team members</span></div>
            </motion.div>
          </motion.div>
          <motion.div className="ceo-image-wrap" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}>
            <div className="ceo-image-placeholder">
              <div className="ceo-initials">{getInitials(ceo.name)}</div>
              <p>Leadership Portrait</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* In his words */}
      <section className="ceo-quotes-section" ref={r1}>
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate={iv1 ? "visible" : "hidden"}>
            <motion.p className="eyebrow" variants={fadeUp}>In words</motion.p>
            <motion.h2 variants={fadeUp}>On the practice of tensile architecture.</motion.h2>
            <div className="ceo-quotes">
              {ceoQuotes.map((q, i) => (
                <motion.div key={i} className="ceo-quote-card" variants={fadeUp} custom={i}>
                  <Quote size={28} className="ceo-quote-icon" />
                  <p>"{q}"</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="ceo-vision" ref={r2}>
        <div className="container">
          <motion.div className="ceo-vision-inner" variants={staggerContainer} initial="hidden" animate={iv2 ? "visible" : "hidden"}>
            <motion.div variants={fadeUp}>
              <p className="eyebrow">Vision</p>
              <h2>What TSP Tensile Structures is building toward.</h2>
            </motion.div>
            <motion.div className="ceo-vision-text" variants={fadeUp}>
              <p>With 8 years of hands-on structural engineering in Saudi Arabia — working with companies like Haif Trading & Contracting and SAJCO — and 10+ years of Pakistan-based project execution at Sarwar & Company, FWO and Descon Engineering, Shaukat Rauf brings unmatched depth to every TSP project.</p>
              <p>His core expertise spans the full value chain: structural steel erection, PVC fabric cutting and hot-air welding, membrane tensioning, aluminium channel fixing, MS pipe and truss planning — all carried out in-house, by a team he has built and trained personally.</p>
              <p>His vision for TSP is a practice where international-grade engineering standards meet Pakistani site realities — delivering tensile and shade structures for housing societies, corporates, hospitals, defence establishments and private clients that are built to last.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Milestones */}
      <section className="ceo-milestones" ref={r3}>
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate={iv3 ? "visible" : "hidden"}>
            <motion.p className="eyebrow" variants={fadeUp}>Journey</motion.p>
            <motion.h2 variants={fadeUp}>Key moments in the practice.</motion.h2>
            <div className="about-timeline">
              {milestones.map((m, i) => (
                <motion.div key={m.year} className="about-timeline-item" variants={fadeUp} custom={i}>
                  <span className="about-timeline-year">{m.year}</span>
                  <div className="about-timeline-dot" />
                  <p>{m.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta-band">
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
            <motion.h2 variants={fadeUp}>Speak directly with the team.</motion.h2>
            <motion.p variants={fadeUp}>{ceo.name} and the leadership team review every initial project brief personally.</motion.p>
            <motion.div variants={fadeUp} style={{ marginTop: 28 }}>
              <Link href="/contact" className="button button-solid" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                Get in touch <ArrowUpRight size={17} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { useScrollAnimation, staggerContainer, fadeUp, slideInLeft, slideInRight } from "@/hooks/useScrollAnimation";
import { TensileCanvas } from "@/components/TensileCanvas";

const images = {
  hero: "/images/hero.jpg",
  pool: "/images/commercial.jpg",
  walkway: "/images/walkway.jpg",
  detail: "/images/detail.jpg",
};

const solutions = [
  {
    id: "01",
    name: "PVC Membrane Structures",
    tagline: "The workhorse of tensile architecture.",
    desc: "PVC-coated polyester is the most widely used tensile fabric — durable, UV-stable, fire-rated and available in dozens of colours. Ideal for permanent commercial and institutional installations.",
    benefits: ["25–30 year lifespan", "Self-cleaning surface", "Fire Class B1", "Custom printed finish available"],
    image: images.hero,
    applications: ["Car parking canopies", "Commercial entrance structures", "Stadium shade", "Institutional walkways"],
  },
  {
    id: "02",
    name: "HDPE Shade Cloth",
    tagline: "Breathable, lightweight, built for heat.",
    desc: "High-density polyethylene shade cloth is the right material for residential and recreational spaces. It allows air movement, reduces ambient temperature by up to 15°C, and is installed without complex anchoring.",
    benefits: ["Up to 95% UV block", "Air permeable — no heat trap", "Lightweight: 5–7 year lifespan", "Most affordable tensile solution"],
    image: images.pool,
    applications: ["Residential gardens", "Swimming pool surrounds", "School play areas", "Agricultural shade"],
  },
  {
    id: "03",
    name: "PTFE Glass Fibre",
    tagline: "Permanent, translucent, architectural grade.",
    desc: "PTFE-coated glass fibre is the premium tensile material. Non-combustible, translucent (allowing up to 13% diffused light) and with a lifespan exceeding 30 years. Used for landmark structures.",
    benefits: ["30+ year lifespan", "Non-combustible (Class A1)", "Translucent — diffused daylight", "Self-cleaning PTFE coating"],
    image: images.walkway,
    applications: ["Airport terminals", "Covered public plazas", "Hotel atriums", "Sports facilities"],
  },
  {
    id: "04",
    name: "Polycarbonate Canopies",
    tagline: "Where structure meets transparency.",
    desc: "Polycarbonate panels on steel or aluminium frames offer a rigid-but-light alternative to fabric for situations where full rain protection and natural light are both required.",
    benefits: ["Full waterproofing", "Allows natural light", "Impact-resistant IK10", "Available in clear, opal or bronze"],
    image: images.detail,
    applications: ["Corporate parking", "Commercial loading bays", "Retail shopfronts", "Covered walkways"],
  },
];

function SolutionBlock({ sol, idx }: { sol: typeof solutions[0]; idx: number }) {
  const { ref, isInView } = useScrollAnimation({ amount: 0.15 });
  const isEven = idx % 2 === 0;

  return (
    <section className={`solution-full${isEven ? "" : " solution-full-reverse"}`} id={`sol-${sol.id}`} ref={ref}>
      <motion.div className="solution-full-image" variants={isEven ? slideInLeft : slideInRight} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        <img src={sol.image} alt={sol.name} />
        <div className="solution-id-badge">{sol.id}</div>
      </motion.div>
      <motion.div className="solution-full-copy" variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        <motion.p className="eyebrow" variants={fadeUp}>{sol.tagline}</motion.p>
        <motion.h2 variants={fadeUp}>{sol.name}</motion.h2>
        <motion.p variants={fadeUp}>{sol.desc}</motion.p>
        <motion.ul className="solution-benefits" variants={fadeUp}>
          {sol.benefits.map((b) => (
            <li key={b}><CheckCircle size={16} />{b}</li>
          ))}
        </motion.ul>
        <motion.div variants={fadeUp}>
          <p className="solution-applications-label">Applications</p>
          <div className="solution-applications">
            {sol.applications.map((a) => <span key={a}>{a}</span>)}
          </div>
        </motion.div>
        <motion.div variants={fadeUp}>
          <Link href="/contact" className="button button-solid" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 28 }}>
            Discuss this solution <ArrowUpRight size={17} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function SolutionsPage() {
  return (
    <div className="inner-page">
      <section className="page-hero" style={{ background: "var(--ink)" }}>
        <div className="tensile-canvas-wrap"><TensileCanvas /></div>
        <div className="container page-hero-content">
          <motion.p className="eyebrow" style={{ color: "var(--sage)" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Our solutions</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}>
            The right material makes all the difference.
          </motion.h1>
          <motion.p className="page-hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            Four core systems. Each chosen for a specific climate, budget and architectural intent.
          </motion.p>
        </div>
      </section>

      {solutions.map((sol, i) => <SolutionBlock key={sol.id} sol={sol} idx={i} />)}
    </div>
  );
}

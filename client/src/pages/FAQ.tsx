import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation, staggerContainer, fadeUp, slideInLeft } from "@/hooks/useScrollAnimation";
import { TensileCanvas } from "@/components/TensileCanvas";

const categories = [
  {
    name: "Getting started",
    faqs: [
      ["How do I get a quote?", "Share your city, project type and a few photos or dimensions via our contact page or WhatsApp. Our team reviews every brief personally and comes back with the right next step — usually a follow-up call or a site visit."],
      ["Do you visit the site before quoting?", "For projects above a certain scale, a site visit is essential. For smaller residential projects, good photos and dimensions are often enough to prepare a preliminary estimate."],
      ["What information do I need to provide?", "City and specific location, approximate dimensions or area required, intended use (parking, garden, pool, commercial, etc.), any budget range you have in mind, and photos of the space if available."],
      ["How long does it take to get a quote?", "A preliminary estimate is usually ready within 1–2 working days. A detailed quotation with material specifications and structural parameters typically takes 3–5 days."],
    ],
  },
  {
    name: "Materials & Design",
    faqs: [
      ["What materials do you use?", "We work with PVC-coated polyester, HDPE shade cloth, PTFE-coated glass fibre, ETFE foil and polycarbonate. The right material depends on your climate, budget, lifespan requirement and aesthetic intent."],
      ["Can the design be custom?", "Every project we do is custom. We do not work from a fixed catalogue. The geometry, material, colour and structural system are all designed for the specific site."],
      ["Can you match an existing colour or finish?", "Yes. PVC and HDPE fabrics are available in a wide range of standard colours. Custom colour matching is possible for PVC at a minimum order quantity."],
      ["How do I choose between HDPE and PVC?", "HDPE is lighter, breathable and more affordable — suited for residential and recreational use. PVC is heavier, fully waterproof and longer-lasting — suited for commercial and institutional use. We will recommend the right one for your project."],
    ],
  },
  {
    name: "Installation & Timeline",
    faqs: [
      ["How long does installation take?", "A residential shade typically takes 2–3 days on site. A larger commercial structure with multiple masts may take 1–2 weeks. We confirm a timeline after scoping your project."],
      ["Do you handle everything — design, fabrication and installation?", "Yes. Our service is designed as one joined-up process from concept through installation and aftercare. You do not manage separate contractors."],
      ["What happens if weather delays the installation?", "We account for weather windows in our scheduling, particularly for tensioning operations. Delays due to weather are communicated immediately and rescheduled at no additional cost."],
      ["Can you work around existing structures, trees or drainage?", "Yes. We have experience designing around existing walls, trees, drainage channels and structural constraints. This is part of the site-led design approach."],
    ],
  },
  {
    name: "Maintenance & Warranty",
    faqs: [
      ["What maintenance does a tensile structure require?", "PVC and PTFE membranes are largely self-cleaning with rainfall. An annual inspection of cable tensions, connection hardware and drainage is recommended. HDPE shade cloth should be checked annually for UV degradation."],
      ["Do you offer a warranty?", "Yes. We provide a structural warranty on all installed works. Fabric warranties follow the manufacturer's specification — typically 5–10 years for HDPE and 10–20 years for PVC."],
      ["Can you repair an existing structure?", "We assess existing structures from other installers on a case-by-case basis. Repairs, re-tensioning and fabric replacement are all services we offer."],
    ],
  },
];

export default function FaqPage() {
  const [openItem, setOpenItem] = useState<string | null>("Getting started-0");
  const { ref, isInView } = useScrollAnimation({ amount: 0.05 });

  return (
    <div className="inner-page">
      <section className="page-hero" style={{ background: "var(--ink)" }}>
        <div className="tensile-canvas-wrap"><TensileCanvas /></div>
        <div className="container page-hero-content">
          <motion.p className="eyebrow" style={{ color: "var(--sage)" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Before we begin</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}>Answers to the questions we hear most.</motion.h1>
          <motion.p className="page-hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            {categories.reduce((n, c) => n + c.faqs.length, 0)} questions, four categories. Can't find yours? Send us a message.
          </motion.p>
        </div>
      </section>

      <section className="faq-page-section" ref={ref}>
        <div className="container faq-page-inner">
          {categories.map((cat, ci) => (
            <motion.div key={cat.name} className="faq-category"
              initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: ci * 0.12, duration: 0.6 }}>
              <h2 className="faq-category-name">{cat.name}</h2>
              <div className="faq-list">
                {cat.faqs.map(([question, answer], qi) => {
                  const key = `${cat.name}-${qi}`;
                  const isOpen = openItem === key;
                  return (
                    <div key={question} className={`faq-item${isOpen ? " open" : ""}`}>
                      <button onClick={() => setOpenItem(isOpen ? null : key)}>
                        <span>{question}</span>
                        {isOpen ? <Minus size={19} /> : <Plus size={19} />}
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} style={{ overflow: "hidden" }}>
                            {answer}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="page-cta-band">
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp}>Still have questions?</motion.h2>
            <motion.p variants={fadeUp}>Send us a photo of the space. That is usually enough to start.</motion.p>
            <motion.div variants={fadeUp} style={{ marginTop: 28 }}>
              <Link href="/contact" className="button button-solid" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                Contact us <ArrowUpRight size={17} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

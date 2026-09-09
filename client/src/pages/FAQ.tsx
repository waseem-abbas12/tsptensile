import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation, staggerContainer, fadeUp } from "@/hooks/useScrollAnimation";
import { TensileCanvas } from "@/components/TensileCanvas";
import { useContent } from "@/contexts/ContentContext";

export default function FaqPage() {
  const { content } = useContent();
  const categories = content?.faqCategories?.length ? content.faqCategories : [];
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
                {cat.faqs.map((faqItem: any, qi) => {
                  const question = faqItem.question || (Array.isArray(faqItem) ? faqItem[0] : "");
                  const answer = faqItem.answer || (Array.isArray(faqItem) ? faqItem[1] : "");
                  const key = `${cat.name}-${qi}`;
                  const isOpen = openItem === key;
                  return (
                    <div key={key} className={`faq-item${isOpen ? " open" : ""}`}>
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

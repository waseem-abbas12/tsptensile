import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useScrollAnimation, staggerContainer, fadeUp, slideInLeft } from "@/hooks/useScrollAnimation";

const faqs = [
  [
    "Can you design around an existing site?",
    "Yes. Every project begins with a site conversation and, where needed, a measurement visit so the structure responds to the exact space. We have worked around existing walls, drainage, and trees.",
  ],
  [
    "How does the quotation process work?",
    "Share your city, project type and a few images or dimensions. Our team reviews the brief, then comes back with the right next step — usually a follow-up call or a site visit.",
  ],
  [
    "Do you handle installation?",
    "Our service is designed as one joined-up process: concept, engineering, fabrication, installation and aftercare. You do not need to manage separate contractors.",
  ],
  [
    "What materials do you use?",
    "We work with PVC-coated polyester, HDPE shade cloth, PTFE-coated glass fibre and polycarbonate depending on the application. We specify the right material for the climate, load and aesthetic of your project.",
  ],
  [
    "How long does a project take?",
    "Timelines vary with scale. A straightforward residential canopy typically takes 4–6 weeks from design sign-off to installation. We confirm a timeline after scoping your project.",
  ],
];

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { ref, isInView } = useScrollAnimation({ amount: 0.1 });

  return (
    <section className="faq-section" ref={ref}>
      <div className="container faq-layout">
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="eyebrow">Before we begin</p>
          <h2>A few useful answers.</h2>
          <p className="faq-side-note">
            Still unsure where to start? Send us a photo of the space — that is
            often enough to begin.
          </p>
        </motion.div>

        <motion.div
          className="faq-list"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {faqs.map(([question, answer], index) => (
            <motion.div
              key={question}
              className={`faq-item${openFaq === index ? " open" : ""}`}
              variants={fadeUp}
            >
              <button
                onClick={() =>
                  setOpenFaq(openFaq === index ? null : index)
                }
              >
                <span>{question}</span>
                {openFaq === index ? (
                  <Minus size={19} />
                ) : (
                  <Plus size={19} />
                )}
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    {answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

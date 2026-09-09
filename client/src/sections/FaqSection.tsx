import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useScrollAnimation, staggerContainer, fadeUp, slideInLeft } from "@/hooks/useScrollAnimation";
import { useContent } from "@/contexts/ContentContext";

export function FaqSection() {
  const { content } = useContent();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { ref, isInView } = useScrollAnimation({ amount: 0.1 });

  const faqs = useMemo(() => {
    if (content?.faqCategories?.length) {
      return content.faqCategories.flatMap((c) => c.faqs).slice(0, 6);
    }
    return [];
  }, [content]);

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
          {faqs.map((faq, index) => {
            const question = faq.question || (faq as any)[0];
            const answer = faq.answer || (faq as any)[1];
            return (
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
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

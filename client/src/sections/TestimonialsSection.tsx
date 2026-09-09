import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useScrollAnimation, staggerContainer, fadeUp } from "@/hooks/useScrollAnimation";
import { useContent } from "@/contexts/ContentContext";

export function TestimonialsSection() {
  const { content } = useContent();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { ref, isInView } = useScrollAnimation({ amount: 0.15 });

  const testimonials = content?.testimonials?.length ? content.testimonials : [];

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  // Auto-advance every 6s
  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <section className="testimonials-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-heading-row"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp}>
            <p className="eyebrow">What clients say</p>
            <h2>Built on trust, proven in place.</h2>
          </motion.div>
          <motion.div className="testimonials-nav" variants={fadeUp}>
            <button
              className="testimonials-btn"
              onClick={scrollPrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="testimonials-btn"
              onClick={scrollNext}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="testimonials-viewport" ref={emblaRef}>
            <div className="testimonials-track">
              {testimonials.map((t, idx) => {
                const author = t.author || (t as any).name || "Client";
                const designation = t.designation || (t as any).location || "";
                return (
                  <div key={idx} className="testimonial-card">
                    <Quote size={32} className="testimonial-quote-icon" />
                    <p className="testimonial-text">"{t.quote}"</p>
                    <div className="testimonial-author">
                      <strong>{author}</strong>
                      {designation && <span>{designation}</span>}
                      {t.project && <span className="testimonial-project">{t.project}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots */}
          <div className="testimonials-dots" aria-hidden="true">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot${i === selectedIndex ? " active" : ""}`}
                onClick={() => emblaApi?.scrollTo(i)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

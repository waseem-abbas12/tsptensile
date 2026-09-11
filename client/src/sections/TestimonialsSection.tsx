import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
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
        {/* Google Reviews Trust Pill */}
        <motion.div
          className="google-trust-badge"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5 }}
        >
          <div className="google-g-circle">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.96 0 12s.45 3.83 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
          </div>
          <div className="google-trust-text">
            <strong>4.9 ★★★★★ Rating on Google Reviews</strong>
            <span>Verified client reviews across Lahore, Islamabad, Karachi & Rawalpindi</span>
          </div>
        </motion.div>

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
                    <div className="testimonial-card-top">
                      <Quote size={28} className="testimonial-quote-icon" />
                      <div className="card-star-rating">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                        ))}
                      </div>
                    </div>
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

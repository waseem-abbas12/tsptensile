import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useScrollAnimation, staggerContainer, fadeUp } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    quote:
      "The team understood the brief on first meeting. What arrived on site was exactly what we discussed, and the installation crew left the place cleaner than they found it.",
    name: "Raza M.",
    location: "DHA, Lahore",
    project: "Arrival canopy — residential compound",
  },
  {
    quote:
      "We had a difficult roof terrace — awkward proportions, a parapet wall, drainage issues. Form/Field found the geometry that made it sing. It's the first thing every guest mentions.",
    name: "Sara K.",
    location: "F-7, Islamabad",
    project: "Rooftop garden shade",
  },
  {
    quote:
      "From drawing to final bolt in six weeks. No delays, no excuses, no drama. Just a structure that does exactly what it was supposed to do.",
    name: "Ahmed H.",
    location: "F-6, Islamabad",
    project: "Commercial entrance canopy",
  },
  {
    quote:
      "I've recommended Form/Field to three neighbours since our pool canopy was installed. The shade is perfect in summer and the cables still look taut two years on.",
    name: "Tariq N.",
    location: "Bahria Town, Rawalpindi",
    project: "Pool & garden membrane",
  },
];

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { ref, isInView } = useScrollAnimation({ amount: 0.15 });

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
              {testimonials.map((t) => (
                <div key={t.name} className="testimonial-card">
                  <Quote size={32} className="testimonial-quote-icon" />
                  <p className="testimonial-text">"{t.quote}"</p>
                  <div className="testimonial-author">
                    <strong>{t.name}</strong>
                    <span>{t.location}</span>
                    <span className="testimonial-project">{t.project}</span>
                  </div>
                </div>
              ))}
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

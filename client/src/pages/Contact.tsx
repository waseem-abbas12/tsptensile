import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useScrollAnimation, staggerContainer, fadeUp } from "@/hooks/useScrollAnimation";
import { TensileCanvas } from "@/components/TensileCanvas";
import { useContent } from "@/contexts/ContentContext";

type FormState = { name: string; phone: string; city: string; type: string; message: string; };

export default function ContactPage() {
  const { content } = useContent();
  const offices = content.offices;
  const whatsapp = content.company.whatsapp;

  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", phone: "", city: "", type: "", message: "" });
  const { ref, isInView } = useScrollAnimation({ amount: 0.1 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello Form/Field,\n\nName: ${form.name}\nPhone: ${form.phone}\nCity: ${form.city}\nProject type: ${form.type}\n\nMessage:\n${form.message}`
    );
    window.open(`https://wa.me/${whatsapp}?text=${text}`, "_blank");
    setSent(true);
  };

  return (
    <div className="inner-page">
      <section className="page-hero page-hero-short" style={{ background: "var(--ink)" }}>
        <div className="tensile-canvas-wrap"><TensileCanvas /></div>
        <div className="container page-hero-content">
          <motion.p className="eyebrow" style={{ color: "var(--sage)" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Get in touch</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}>
            Tell us about your space.
          </motion.h1>
        </div>
      </section>

      <section className="contact-section" ref={ref}>
        <div className="container contact-layout">
          {/* Form */}
          <motion.div className="contact-form-wrap" variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <motion.h2 variants={fadeUp}>Send us your brief</motion.h2>
            <motion.p variants={fadeUp}>We review every message personally and respond within one working day.</motion.p>

            {sent ? (
              <motion.div className="contact-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="success-icon" style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--teal)", color: "white", display: "grid", placeItems: "center", margin: "0 auto 24px" }}>✓</div>
                <h3>Message sent</h3>
                <p>Your brief has been sent via WhatsApp. We'll respond within one working day.</p>
              </motion.div>
            ) : (
              <motion.form className="contact-form" onSubmit={handleSubmit} variants={fadeUp}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your name *</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ahmed Khan" />
                  </div>
                  <div className="form-group">
                    <label>WhatsApp number *</label>
                    <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+92 300 0000000" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
                      <option value="">Select city</option>
                      <option>Lahore</option>
                      <option>Islamabad</option>
                      <option>Rawalpindi</option>
                      <option>Karachi</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Project type</label>
                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                      <option value="">Select type</option>
                      <option>Car parking shade</option>
                      <option>Pool / garden shade</option>
                      <option>Commercial canopy</option>
                      <option>Walkway cover</option>
                      <option>Rooftop shade</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Tell us about the space</label>
                  <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Dimensions, current situation, any constraints or special requirements..." />
                </div>
                <button type="submit" className="button button-solid" style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", justifyContent: "center" }}>
                  Send via WhatsApp <ArrowUpRight size={17} />
                </button>
              </motion.form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div className="contact-info-wrap" variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <motion.div variants={fadeUp}>
              <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="whatsapp-big-btn">
                <MessageCircle size={24} /> Chat on WhatsApp
              </a>
            </motion.div>

            <motion.div className="contact-direct" variants={fadeUp}>
              <div><Mail size={16} /><a href="mailto:hello@formfield.pk">hello@formfield.pk</a></div>
              <div><Phone size={16} /><a href="tel:+923001234567">+92 300 1234567</a></div>
            </motion.div>

            <motion.div className="offices-list" variants={staggerContainer}>
              <motion.p className="eyebrow" variants={fadeUp}>Our offices</motion.p>
              {offices.map((o) => (
                <motion.div key={o.city} className="office-item" variants={fadeUp}>
                  <MapPin size={15} />
                  <div>
                    <strong>{o.city}</strong>
                    <span>{o.address}</span>
                    <a href={`tel:${o.phone}`}>{o.phone}</a>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="contact-hours" variants={fadeUp}>
              <p className="eyebrow">Working hours</p>
              <p>Monday – Saturday<br /><strong>9:00 am – 6:00 pm</strong></p>
              <p style={{ marginTop: 8, fontSize: 13, color: "var(--ink-soft)" }}>We respond to WhatsApp messages outside these hours when possible.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

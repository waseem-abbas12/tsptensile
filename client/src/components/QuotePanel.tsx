import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronRight, MessageCircle, X } from "lucide-react";

interface QuotePanelProps {
  onClose: () => void;
}

type Step = 1 | 2 | 3;

interface FormData {
  name: string;
  whatsapp: string;
  city: string;
  projectType: string;
  description: string;
}

const stepVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "60%" : "-60%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.38, ease: [0.23, 1, 0.32, 1] as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-60%" : "60%",
    opacity: 0,
    transition: { duration: 0.28 },
  }),
};

export function QuotePanel({ onClose }: QuotePanelProps) {
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    whatsapp: "",
    city: "",
    projectType: "",
    description: "",
  });

  const goTo = (nextStep: Step) => {
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  };

  const update =
    (field: keyof FormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const whatsappMessage = encodeURIComponent(
    `Hi Form/Field — I'd like to discuss a project.\n\nName: ${formData.name}\nWhatsApp: ${formData.whatsapp}\nCity: ${formData.city}\nProject Type: ${formData.projectType}\n\n${formData.description}`.trim()
  );
  const whatsappUrl = `https://wa.me/923001234567?text=${whatsappMessage}`;

  return (
    <div
      className="quote-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Request a quote"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="quote-panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Close */}
        <button
          className="icon-button close-button"
          onClick={onClose}
          aria-label="Close quote form"
        >
          <X size={20} />
        </button>

        {/* Step dots */}
        {step < 3 && (
          <div className="quote-steps-indicator" aria-hidden="true">
            {([1, 2] as const).map((s) => (
              <div key={s} className={`step-dot${step >= s ? " active" : ""}`} />
            ))}
          </div>
        )}

        <div className="quote-steps-container">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 1 && (
              <motion.div
                key="step1"
                className="quote-step"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <p className="eyebrow">Start with the space</p>
                <h2>Tell us what needs a roof.</h2>
                <p className="panel-intro">
                  A few details are enough for our team to understand the brief
                  and recommend a next step.
                </p>

                <label>
                  Name
                  <input
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={update("name")}
                  />
                </label>
                <label>
                  WhatsApp number
                  <input
                    required
                    type="tel"
                    placeholder="03XX XXXXXXX"
                    value={formData.whatsapp}
                    onChange={update("whatsapp")}
                  />
                </label>

                <button
                  className="button button-solid full-width"
                  onClick={() =>
                    formData.name && formData.whatsapp && goTo(2)
                  }
                  disabled={!formData.name || !formData.whatsapp}
                >
                  Continue <ChevronRight size={17} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                className="quote-step"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <p className="eyebrow">Project details</p>
                <h2>Tell us about the space.</h2>
                <p className="panel-intro">
                  Any detail helps — even a rough size or a photo of the site is
                  a good start.
                </p>

                <div className="form-row">
                  <label>
                    City
                    <select value={formData.city} onChange={update("city")}>
                      <option value="" disabled>
                        Select city
                      </option>
                      <option>Lahore</option>
                      <option>Islamabad</option>
                      <option>Rawalpindi</option>
                      <option>Karachi</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label>
                    Project type
                    <select
                      value={formData.projectType}
                      onChange={update("projectType")}
                    >
                      <option value="" disabled>
                        Select type
                      </option>
                      <option>Car parking</option>
                      <option>Walkway or entrance</option>
                      <option>Pool or garden</option>
                      <option>Rooftop</option>
                      <option>Commercial canopy</option>
                      <option>Custom</option>
                    </select>
                  </label>
                </div>

                <label>
                  What are you imagining?
                  <textarea
                    rows={4}
                    placeholder="Tell us about the site, size or timeline"
                    value={formData.description}
                    onChange={update("description")}
                  />
                </label>

                <button
                  className="button button-solid full-width"
                  onClick={() => goTo(3)}
                >
                  Send project brief <ArrowUpRight size={17} />
                </button>
                <button
                  className="quote-back-btn"
                  onClick={() => goTo(1)}
                  type="button"
                >
                  ← Back
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                className="quote-step quote-success"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <motion.div
                  className="success-icon"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.25,
                    type: "spring",
                    stiffness: 260,
                    damping: 18,
                  }}
                >
                  <Check size={28} strokeWidth={2.5} />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Brief received.
                </motion.h2>

                <motion.p
                  className="panel-intro"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                >
                  Thank you, {formData.name || "friend"}. Our team will review
                  your brief and reach out within 24 hours. You can also
                  continue the conversation directly on WhatsApp right now.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-whatsapp full-width"
                  >
                    <MessageCircle size={18} /> Open in WhatsApp
                  </a>
                  <button
                    className="button button-dark full-width"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

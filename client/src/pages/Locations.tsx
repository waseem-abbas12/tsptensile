import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, MapPin, Phone, ShieldCheck, CheckCircle2, MessageCircle, ChevronRight, Award, Compass, Layers } from "lucide-react";
import { TensileCanvas } from "@/components/TensileCanvas";
import { CITIES_DATA } from "@/data/locationsData";
import { useScrollAnimation, staggerContainer, fadeUp } from "@/hooks/useScrollAnimation";
import { useSEO } from "@/hooks/useSEO";

export default function LocationsPage() {
  useSEO({
    title: "Locations Served | Car Parking Shades Lahore, Islamabad, Karachi",
    description: "TSP Tensile provides cantilever car parking shades, tensile fabric roofs, and industrial sheds across Lahore, Islamabad, Rawalpindi, Karachi, and nationwide. Book a free site survey.",
    path: "/locations",
    keywords: "car parking shades lahore, tensile structures islamabad, parking sheds rawalpindi, tensile fabric karachi, shade contractor pakistan",
    breadcrumbs: [
      { name: "Locations", url: "/locations" }
    ]
  });

  const { ref: r1, isInView: iv1 } = useScrollAnimation({ amount: 0.1 });
  const { ref: r2, isInView: iv2 } = useScrollAnimation({ amount: 0.1 });

  const citiesList = Object.values(CITIES_DATA);

  return (
    <div className="inner-page">
      {/* Hero */}
      <section className="page-hero" style={{ background: "var(--ink)" }}>
        <div className="tensile-canvas-wrap"><TensileCanvas /></div>
        <div className="container page-hero-content">
          <motion.p
            className="eyebrow"
            style={{ color: "var(--sage)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Nationwide Coverage · Pakistan
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            Tensile Architecture &amp; Car Parking Shades Across Pakistan
          </motion.h1>
          <motion.p
            className="page-hero-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Headquartered in Lahore with active installation teams and representative offices in Islamabad, Rawalpindi, and Karachi. Serving homeowners, corporations, and defence institutions nationwide.
          </motion.p>
        </div>
      </section>

      {/* Main Cities Grid */}
      <section className="locations-directory-section" ref={r1} style={{ padding: "90px 0", background: "var(--paper)" }}>
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={iv1 ? "visible" : "hidden"}
          >
            <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 55px" }}>
              <motion.p className="eyebrow" variants={fadeUp}>Choose Your City</motion.p>
              <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 500, margin: "12px 0 18px", fontFamily: "var(--serif)" }}>
                Local Fabrication, Custom Engineering &amp; Fast Installation
              </motion.h2>
              <motion.p variants={fadeUp} style={{ color: "var(--ink-soft)", fontSize: "16px", lineHeight: 1.65 }}>
                Select your city to view local projects, society approval standards (DHA, Bahria, CDA), price per sq ft guides, and book a free on-site survey.
              </motion.p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}>
              {citiesList.map((city) => (
                <motion.div
                  key={city.slug}
                  variants={fadeUp}
                  style={{
                    background: "white",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 8px 30px rgba(20,45,60,0.06)",
                    transition: "transform 0.3s, box-shadow 0.3s"
                  }}
                  className="city-directory-card"
                >
                  <div style={{ height: "190px", position: "relative", overflow: "hidden" }}>
                    <img
                      src={city.localProjects[0]?.image || "/images/hero.jpg"}
                      alt={`${city.name} Car Parking Shades & Tensile Structures`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div style={{
                      position: "absolute",
                      top: "14px",
                      left: "14px",
                      background: "rgba(20,45,60,0.85)",
                      color: "white",
                      padding: "4px 12px",
                      borderRadius: "100px",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase"
                    }}>
                      {city.region}
                    </div>
                    <div style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                      background: "var(--teal)",
                      color: "white",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: 600
                    }}>
                      {city.stats.projects} Delivered
                    </div>
                  </div>

                  <div style={{ padding: "26px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--teal)", marginBottom: "6px" }}>
                      <MapPin size={16} />
                      <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                        {city.name} Hub
                      </span>
                    </div>

                    <h3 style={{ fontSize: "22px", fontWeight: 600, color: "var(--ink)", margin: "0 0 10px" }}>
                      {city.name}
                    </h3>

                    <p style={{ fontSize: "13.5px", color: "var(--ink-soft)", lineHeight: 1.6, margin: "0 0 18px", flex: 1 }}>
                      {city.heroSub.slice(0, 120)}...
                    </p>

                    <div style={{ borderTop: "1px solid var(--line)", paddingTop: "14px", marginBottom: "18px" }}>
                      <span style={{ display: "block", fontSize: "10.5px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--teal)", fontWeight: 700, marginBottom: "8px" }}>
                        Major Coverage Areas:
                      </span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {city.serviceAreas.slice(0, 4).map((area) => (
                          <span key={area} style={{ fontSize: "11px", background: "var(--ivory)", padding: "3px 8px", borderRadius: "4px", color: "var(--ink-soft)" }}>
                            {area.split("(")[0]}
                          </span>
                        ))}
                        {city.serviceAreas.length > 4 && (
                          <span style={{ fontSize: "11px", color: "var(--teal)", fontWeight: 600, alignSelf: "center" }}>
                            +{city.serviceAreas.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                      <Link
                        href={`/locations/${city.slug}`}
                        className="button button-solid"
                        style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "12.5px" }}
                      >
                        Explore {city.name} <ArrowUpRight size={15} />
                      </Link>
                      <a
                        href={`https://wa.me/${city.whatsapp}?text=Hello%20TSP%20Tensile,%20I'm%20inquiring%20about%20a%20car%20parking%20shade%20or%20tensile%20structure%20in%20${city.name}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="header-wa-btn"
                        style={{ width: "42px", padding: 0, justifyContent: "center" }}
                        title={`Chat with ${city.name} Desk`}
                      >
                        <MessageCircle size={17} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nationwide Value Pillars */}
      <section className="locations-trust-band" ref={r2} style={{ padding: "90px 0", background: "var(--ink)", color: "white" }}>
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate={iv2 ? "visible" : "hidden"}>
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 50px" }}>
              <motion.p className="eyebrow" style={{ color: "var(--sage)" }} variants={fadeUp}>Nationwide Standards</motion.p>
              <motion.h2 variants={fadeUp} style={{ color: "white", fontSize: "clamp(30px, 3.8vw, 48px)", fontWeight: 500, fontFamily: "var(--serif)" }}>
                Why Pakistan's Elite Developers &amp; Homeowners Trust Us
              </motion.h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "32px" }}>
              <motion.div variants={fadeUp} style={{ background: "rgba(255,255,255,0.05)", padding: "32px 28px", borderRadius: "8px", borderTop: "2px solid var(--teal)" }}>
                <ShieldCheck size={32} style={{ color: "var(--sage)", marginBottom: "16px" }} />
                <h3 style={{ fontSize: "18px", color: "white", margin: "0 0 10px" }}>15-Year Weather Warranty</h3>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
                  Official manufacturer-backed guarantees on German Mehler and French Serge Ferrari PVDF fabrics against UV degradation, tearing, and fading.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} style={{ background: "rgba(255,255,255,0.05)", padding: "32px 28px", borderRadius: "8px", borderTop: "2px solid var(--terra)" }}>
                <Compass size={32} style={{ color: "var(--terra)", marginBottom: "16px" }} />
                <h3 style={{ fontSize: "18px", color: "white", margin: "0 0 10px" }}>Certified Structural Engineering</h3>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
                  Every canopy is modeled for wind speeds up to 140 km/h, seismic resistance, and monsoon drainage with 3D structural analysis.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} style={{ background: "rgba(255,255,255,0.05)", padding: "32px 28px", borderRadius: "8px", borderTop: "2px solid var(--teal)" }}>
                <Layers size={32} style={{ color: "var(--sage)", marginBottom: "16px" }} />
                <h3 style={{ fontSize: "18px", color: "white", margin: "0 0 10px" }}>100% In-House Turnkey Team</h3>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
                  No middlemen or sub-contractors. Our team handles site survey, 3D design, precision steel cutting, high-frequency hot-air welding, and on-site tensioning.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} style={{ background: "rgba(255,255,255,0.05)", padding: "32px 28px", borderRadius: "8px", borderTop: "2px solid var(--terra)" }}>
                <Award size={32} style={{ color: "var(--terra)", marginBottom: "16px" }} />
                <h3 style={{ fontSize: "18px", color: "white", margin: "0 0 10px" }}>Free Site Visit &amp; Quote</h3>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
                  Fast 24-hour dispatch for on-site laser measurements in Lahore, Islamabad, and Rawalpindi with comprehensive 3D visual renders.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="page-cta-band">
        <div className="container">
          <p className="eyebrow">Ready to start?</p>
          <h2>Book a Free Site Survey in Your City Today</h2>
          <p>Our engineering team will assess your site, take laser measurements, and present a custom 3D cantilever shade or tensile structure proposal.</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginTop: "28px" }}>
            <Link href="/contact" className="button button-solid">
              Schedule Free Site Visit <ArrowUpRight size={16} />
            </Link>
            <a
              href="https://wa.me/923024001063?text=Hello%20TSP%20Tensile,%20I'd%20like%20to%20book%20a%20site%20visit%20for%20a%20car%20parking%20shade."
              target="_blank"
              rel="noopener noreferrer"
              className="button button-outline"
            >
              <MessageCircle size={16} /> Chat on WhatsApp (0302 4001063)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

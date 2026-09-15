import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import { CITIES_DATA } from "@/data/locationsData";
import { useScrollAnimation, staggerContainer, fadeUp } from "@/hooks/useScrollAnimation";

export function LocationsGridSection() {
  const { ref: r1, isInView: iv1 } = useScrollAnimation({ amount: 0.1 });
  const citiesList = Object.values(CITIES_DATA);

  return (
    <section className="locations-directory-section" ref={r1} style={{ padding: "90px 0", background: "var(--paper)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={iv1 ? "visible" : "hidden"}
        >
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 55px" }}>
            <motion.p className="eyebrow" variants={fadeUp}>Nationwide Presence &amp; Local Fabrication</motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(30px, 3.8vw, 48px)", fontWeight: 500, margin: "12px 0 18px", fontFamily: "var(--serif)" }}>
              Specialized Tensile Fabric &amp; Car Parking Shades Across Pakistan
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color: "var(--ink-soft)", fontSize: "16px", lineHeight: 1.65 }}>
              Engineered specifically for each city's unique microclimate and society bylaws — from Lahore's extreme summer heat (DHA, Bahria) to Islamabad's monsoon rains (CDA) and Karachi's high-salinity coastal winds. Select your city to view local projects, society approval standards, price per sq ft guides, and book a free on-site survey.
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
  );
}

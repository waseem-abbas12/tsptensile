import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  MapPin,
  Phone,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Clock,
  Sparkles,
  Layers,
  HelpCircle,
  Calendar,
  AlertCircle
} from "lucide-react";
import { TensileCanvas } from "@/components/TensileCanvas";
import { CITIES_DATA } from "@/data/locationsData";
import { useScrollAnimation, staggerContainer, fadeUp } from "@/hooks/useScrollAnimation";
import { useSEO } from "@/hooks/useSEO";
import { ZoomableImage } from "@/components/ZoomableImage";

interface LocationCityProps {
  city?: string;
  params?: { city?: string };
}

export default function LocationCityPage(props?: LocationCityProps) {
  const [, routeParams] = useRoute("/locations/:city");
  const citySlug = (props?.city || props?.params?.city || routeParams?.city || "lahore").toLowerCase();
  const city = CITIES_DATA[citySlug] || CITIES_DATA.lahore;

  useSEO({
    title: city.metaTitle,
    description: city.metaDescription,
    path: `/locations/${city.slug}`,
    keywords: `${city.h1}, car parking sheds ${city.name.toLowerCase()}, tensile shades ${city.name.toLowerCase()}, cantilever parking sheds ${city.name.toLowerCase()}, shade contractor ${city.name.toLowerCase()}`,
    breadcrumbs: [
      { name: "Locations", url: "/locations" },
      { name: city.name, url: `/locations/${city.slug}` }
    ]
  });

  const { ref: r1, isInView: iv1 } = useScrollAnimation({ amount: 0.1 });
  const { ref: r2, isInView: iv2 } = useScrollAnimation({ amount: 0.1 });
  const { ref: r3, isInView: iv3 } = useScrollAnimation({ amount: 0.1 });

  return (
    <div className="inner-page">
      {/* ── City Hero Section ── */}
      <section className="page-hero" style={{ background: "var(--ink)" }}>
        <div className="tensile-canvas-wrap"><TensileCanvas /></div>
        <div className="container page-hero-content">
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(45,106,104,0.3)", border: "1px solid var(--teal)", padding: "5px 14px", borderRadius: "100px", marginBottom: "16px" }}>
            <MapPin size={14} style={{ color: "var(--sage)" }} />
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "white" }}>
              {city.name}, {city.region} · Service Hub
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            style={{ fontSize: "clamp(34px, 4.5vw, 68px)", maxWidth: "880px" }}
          >
            {city.h1}
          </motion.h1>

          <motion.p
            className="page-hero-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            style={{ maxWidth: "720px" }}
          >
            {city.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "32px", alignItems: "center" }}
          >
            <Link
              href="/contact"
              className="button button-solid"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13px" }}
            >
              Book Free Site Visit in {city.name} <ArrowUpRight size={16} />
            </Link>

            <a
              href={`https://wa.me/${city.whatsapp}?text=Hello%20TSP%20Tensile,%20I'm%20inquiring%20about%20a%20car%20parking%20shade%20or%20tensile%20structure%20in%20${city.name}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="button header-wa-btn"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "46px", fontSize: "13px" }}
            >
              <MessageCircle size={17} /> WhatsApp {city.name} Desk ({city.phone})
            </a>
          </motion.div>

          {/* Quick city trust metrics */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "18px",
            marginTop: "42px",
            paddingTop: "28px",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            maxWidth: "780px"
          }}>
            <div>
              <strong style={{ display: "block", fontSize: "28px", fontFamily: "var(--serif)", color: "white" }}>{city.stats.projects}</strong>
              <span style={{ fontSize: "11px", color: "var(--sage)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Projects Delivered</span>
            </div>
            <div>
              <strong style={{ display: "block", fontSize: "28px", fontFamily: "var(--serif)", color: "white" }}>{city.stats.warranty}</strong>
              <span style={{ fontSize: "11px", color: "var(--sage)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Fabric Warranty</span>
            </div>
            <div>
              <strong style={{ display: "block", fontSize: "28px", fontFamily: "var(--serif)", color: "white" }}>{city.stats.experience}</strong>
              <span style={{ fontSize: "11px", color: "var(--sage)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Engineering Lead</span>
            </div>
            <div>
              <strong style={{ display: "block", fontSize: "28px", fontFamily: "var(--serif)", color: "white" }}>24 Hours</strong>
              <span style={{ fontSize: "11px", color: "var(--sage)", textTransform: "uppercase", letterSpacing: "0.08em" }}>On-Site Survey Time</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service Areas in this City ── */}
      <section style={{ padding: "50px 0 60px", background: "var(--ivory)", borderBottom: "1px solid var(--line)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "22px" }}>
            <div>
              <span className="eyebrow" style={{ margin: 0 }}>Serving All Prime Locations</span>
              <h2 style={{ fontSize: "24px", margin: "6px 0 0", fontWeight: 600 }}>
                Housing Societies &amp; Commercial Zones in {city.name}
              </h2>
            </div>
            <span style={{ fontSize: "12px", color: "var(--teal)", fontWeight: 600 }}>
              ✓ Free site laser measurement across all listed sectors
            </span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {city.serviceAreas.map((area) => (
              <div
                key={area}
                style={{
                  background: "white",
                  border: "1px solid var(--line)",
                  borderRadius: "100px",
                  padding: "8px 18px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "12.5px",
                  fontWeight: 500,
                  color: "var(--ink)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
                }}
              >
                <CheckCircle2 size={14} style={{ color: "var(--teal)", flexShrink: 0 }} />
                <span>{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Climate Engineering Challenge & Solution ── */}
      <section style={{ padding: "80px 0", background: "var(--paper)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "50px", alignItems: "center" }} className="location-split-grid">
            <div>
              <p className="eyebrow">Engineered For {city.name}&apos;s Climate</p>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontFamily: "var(--serif)", fontWeight: 500, margin: "12px 0 20px" }}>
                Why Ordinary Metal Sheds Fail in {city.name}
              </h2>
              <p style={{ color: "var(--ink-soft)", fontSize: "16px", lineHeight: 1.7, margin: "0 0 24px" }}>
                {city.climateChallenge}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                {city.whyChoosePoints.map((pt, idx) => (
                  <div key={idx} style={{ background: "white", padding: "18px 20px", border: "1px solid var(--line)", borderRadius: "6px" }}>
                    <strong style={{ display: "block", fontSize: "14px", color: "var(--ink)", marginBottom: "6px" }}>
                      {pt.title}
                    </strong>
                    <p style={{ fontSize: "12.5px", color: "var(--ink-soft)", lineHeight: 1.55, margin: 0 }}>
                      {pt.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: "10px", overflow: "hidden", boxShadow: "0 20px 50px rgba(20,45,60,0.18)" }}>
                <ZoomableImage
                  src={city.localProjects[0]?.image || "/images/hero.jpg"}
                  alt={`${city.name} Tensile Fabric Cantilever Shade`}
                  caption={`${city.name} — Tensile Engineering Installation`}
                  zoomScale={2.4}
                  showExpandBtn={true}
                  style={{ width: "100%", height: "420px" }}
                />
              </div>
              <div style={{
                position: "absolute",
                bottom: "-20px",
                right: "-15px",
                background: "var(--teal)",
                color: "white",
                padding: "18px 22px",
                borderRadius: "8px",
                boxShadow: "0 10px 30px rgba(45,106,104,0.3)",
                maxWidth: "240px"
              }}>
                <span style={{ display: "block", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.85 }}>Direct Delivery</span>
                <strong style={{ fontSize: "15px", display: "block", marginTop: "4px" }}>
                  Fast Turnaround in {city.name}
                </strong>
                <span style={{ fontSize: "12px", opacity: 0.85, marginTop: "4px", display: "block" }}>
                  5–7 days fabrication, 1 day on-site erection.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Transparent Price per Sq Ft Guide for this City ── */}
      <section style={{ padding: "85px 0", background: "var(--ivory)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }} ref={r1}>
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate={iv1 ? "visible" : "hidden"}>
            <div style={{ maxWidth: "700px", margin: "0 auto 45px", textAlign: "center" }}>
              <motion.p className="eyebrow" variants={fadeUp}>Cost Estimation Guide</motion.p>
              <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "var(--serif)", fontWeight: 500, margin: "10px 0 16px" }}>
                {city.name} Car Parking Shade &amp; Tensile Price per Sq Ft
              </motion.h2>
              <motion.p variants={fadeUp} style={{ color: "var(--ink-soft)", fontSize: "15px", lineHeight: 1.65 }}>
                Transparent pricing backed by high-grade European and Australian architectural fabrics. Final cost depends on clear span width, foundation type, and cantilever reach.
              </motion.p>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", background: "white", borderRadius: "8px", overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,0.05)" }}>
                <thead>
                  <tr style={{ background: "var(--ink)", color: "white", textAlign: "left" }}>
                    <th style={{ padding: "16px 20px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Tensile System / Fabric</th>
                    <th style={{ padding: "16px 20px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Price Range (PKR)</th>
                    <th style={{ padding: "16px 20px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Lifespan</th>
                    <th style={{ padding: "16px 20px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Warranty</th>
                    <th style={{ padding: "16px 20px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Ideal Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {city.pricingGuide.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid var(--line)", background: idx % 2 === 0 ? "white" : "var(--paper)" }}>
                      <td style={{ padding: "18px 20px", fontWeight: 600, color: "var(--ink)", fontSize: "14px" }}>
                        {item.material}
                      </td>
                      <td style={{ padding: "18px 20px", color: "var(--teal)", fontWeight: 700, fontSize: "15px" }}>
                        {item.priceRange}
                      </td>
                      <td style={{ padding: "18px 20px", color: "var(--ink-soft)", fontSize: "13.5px" }}>
                        {item.durability}
                      </td>
                      <td style={{ padding: "18px 20px", color: "var(--terra)", fontWeight: 600, fontSize: "13.5px" }}>
                        {item.warranty}
                      </td>
                      <td style={{ padding: "18px 20px", color: "var(--ink-soft)", fontSize: "13px" }}>
                        {item.bestFor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: "24px", background: "white", padding: "18px 24px", borderRadius: "6px", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <AlertCircle size={20} style={{ color: "var(--teal)", flexShrink: 0 }} />
                <span style={{ fontSize: "13.5px", color: "var(--ink-soft)" }}>
                  Need an exact quote for your residential car porch or commercial plaza in {city.name}?
                </span>
              </div>
              <a
                href={`https://wa.me/${city.whatsapp}?text=Hello%20TSP%20Tensile,%20I'd%20like%20a%20price%20estimate%20for%20a%20car%20parking%20shade%20in%20${city.name}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-solid"
                style={{ fontSize: "12.5px" }}
              >
                Get Exact Price on WhatsApp <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Flagship Projects in this City ── */}
      <section style={{ padding: "90px 0", background: "var(--paper)" }} ref={r2}>
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate={iv2 ? "visible" : "hidden"}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "45px" }}>
              <div>
                <motion.p className="eyebrow" variants={fadeUp}>Proven Local Track Record</motion.p>
                <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "var(--serif)", fontWeight: 500, margin: "6px 0 0" }}>
                  Featured Tensile Projects in {city.name}
                </motion.h2>
              </div>
              <Link href="/projects" className="button button-outline-dark" style={{ border: "1px solid var(--ink)", padding: "10px 20px", fontSize: "13px" }}>
                View All Nationwide Projects <ArrowUpRight size={15} />
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px" }}>
              {city.localProjects.map((proj, idx) => (
                <motion.article
                  key={idx}
                  variants={fadeUp}
                  style={{
                    background: "white",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.05)"
                  }}
                >
                  <div style={{ height: "230px", overflow: "hidden", position: "relative" }}>
                    <ZoomableImage
                      src={proj.image}
                      alt={`${proj.title} - ${proj.location}`}
                      caption={`${proj.title} — ${proj.location} (${proj.type})`}
                      zoomScale={2.4}
                      showExpandBtn={true}
                      style={{ width: "100%", height: "100%" }}
                    />
                    <div style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "14px",
                      background: "rgba(20,45,60,0.85)",
                      color: "white",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: 600,
                      pointerEvents: "none",
                      zIndex: 10,
                    }}>
                      {proj.area}
                    </div>
                  </div>
                  <div style={{ padding: "24px" }}>
                    <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--teal)", fontWeight: 700 }}>
                      {proj.type}
                    </span>
                    <h3 style={{ fontSize: "19px", fontWeight: 600, color: "var(--ink)", margin: "8px 0 6px" }}>
                      {proj.title}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--ink-soft)", fontSize: "12px", marginBottom: "12px" }}>
                      <MapPin size={13} style={{ color: "var(--terra)" }} />
                      <span>{proj.location}</span>
                    </div>
                    <p style={{ fontSize: "13.5px", color: "var(--ink-soft)", lineHeight: 1.6, margin: 0 }}>
                      {proj.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Complete Sheds & Tensile Taxonomy (Hyper-Local Ranking Cloud) ── */}
      <section style={{ padding: "60px 0 70px", background: "white", borderTop: "1px solid var(--line)" }}>
        <div className="container">
          <div style={{ maxWidth: "800px", marginBottom: "30px" }}>
            <span className="eyebrow">Comprehensive Shade &amp; Shed Capabilities in {city.name}</span>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontFamily: "var(--serif)", fontWeight: 500, margin: "8px 0 12px" }}>
              All Types of Industrial, Commercial &amp; Residential Sheds
            </h2>
            <p style={{ color: "var(--ink-soft)", fontSize: "14.5px", lineHeight: 1.6 }}>
              From custom car porches in residential sectors to 50,000+ sq.ft industrial warehouse PEB sheds and wedding marquees, TSP Tensile fabricates every type of structural steel and PVC membrane structure across {city.name} and surrounding industrial zones.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            <div style={{ background: "var(--paper)", padding: "20px", borderRadius: "8px", border: "1px solid var(--line)" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                🚗 Parking &amp; Porch Sheds
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "12.5px", color: "var(--ink-soft)", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>✓ Cantilever Car Parking Shades (Zero Column)</li>
                <li>✓ Residential Porch &amp; Garage Sheds</li>
                <li>✓ Wall Mounted &amp; Pole Parking Sheds</li>
                <li>✓ Hospital, Hotel &amp; Airport Parking Canopies</li>
                <li>✓ Commercial Plaza &amp; Office Fleet Bays</li>
                <li>✓ Foldable &amp; Remote Control Retractable Shades</li>
              </ul>
            </div>

            <div style={{ background: "var(--paper)", padding: "20px", borderRadius: "8px", border: "1px solid var(--line)" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                🏭 Industrial &amp; Storage Sheds
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "12.5px", color: "var(--ink-soft)", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>✓ Pre-Engineered Buildings (PEB Steel Sheds)</li>
                <li>✓ Factory &amp; Manufacturing Workshop Sheds</li>
                <li>✓ Logistics Warehouse &amp; Storage Sheds</li>
                <li>✓ Dairy Farm &amp; Livestock Steel Structures</li>
                <li>✓ Agricultural &amp; Poultry Farm Sheds</li>
                <li>✓ Heavy Duty Long-Span MS Galvanized Sheds</li>
              </ul>
            </div>

            <div style={{ background: "var(--paper)", padding: "20px", borderRadius: "8px", border: "1px solid var(--line)" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                🎪 Event, Sports &amp; Lifestyle Sheds
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "12.5px", color: "var(--ink-soft)", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>✓ Shadi Hall &amp; Marriage Lawn Marquees</li>
                <li>✓ Swimming Pool Heatproof &amp; UV Shades</li>
                <li>✓ Padel &amp; Tennis Court Tensile Enclosures</li>
                <li>✓ Rooftop Restaurant Pergolas &amp; Gazebos</li>
                <li>✓ School, College &amp; Hospital Covered Walkways</li>
                <li>✓ Stadium, Amphitheatre &amp; Dome Sheds</li>
              </ul>
            </div>

            <div style={{ background: "var(--paper)", padding: "20px", borderRadius: "8px", border: "1px solid var(--line)" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                📐 Engineered Geometries &amp; Fabrics
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "12.5px", color: "var(--ink-soft)", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>✓ Hyperbolic Paraboloid (Hypar) Shapes</li>
                <li>✓ Conical, Barrel Vault &amp; Pyramid Tensile</li>
                <li>✓ German Mehler Valmex 900 GSM PVDF</li>
                <li>✓ Australian HDPE Breathable Shade Cloth</li>
                <li>✓ French Serge Ferrari Architectural Membrane</li>
                <li>✓ Hot-Dip Galvanized &amp; Powder Coated Steel</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: "24px", paddingTop: "18px", borderTop: "1px dashed var(--line)", display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--teal)" }}>
              {city.name} Popular Search Queries:
            </span>
            {[
              `Car parking sheds ${city.name}`,
              `Tensile shades ${city.name}`,
              `Cantilever parking shade price ${city.name}`,
              `Industrial shed construction ${city.name}`,
              `Warehouse steel shed ${city.name}`,
              `Swimming pool shade ${city.name}`,
              `Padel court roof ${city.name}`,
              `Marquee shed fabricator ${city.name}`,
              `Porch shed design ${city.name}`,
              `Factory shed installation ${city.name}`
            ].map((tag) => (
              <span key={tag} style={{ fontSize: "11px", background: "var(--ivory)", padding: "4px 10px", borderRadius: "4px", color: "var(--ink-soft)" }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── City FAQs (Schema Optimized) ── */}
      <section style={{ padding: "85px 0", background: "var(--ivory)", borderTop: "1px solid var(--line)" }} ref={r3}>
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate={iv3 ? "visible" : "hidden"}>
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 45px" }}>
              <motion.p className="eyebrow" variants={fadeUp}>Common Questions</motion.p>
              <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontFamily: "var(--serif)", fontWeight: 500, margin: "8px 0 14px" }}>
                Frequently Asked Questions in {city.name}
              </motion.h2>
              <motion.p variants={fadeUp} style={{ color: "var(--ink-soft)", fontSize: "15px" }}>
                Everything you need to know about pricing, building bylaws, installation timelines, and material warranties in {city.name}.
              </motion.p>
            </div>

            <div style={{ maxWidth: "820px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "14px" }}>
              {city.faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  style={{
                    background: "white",
                    border: "1px solid var(--line)",
                    borderRadius: "6px",
                    padding: "24px 28px"
                  }}
                >
                  <h3 style={{ fontSize: "17px", fontWeight: 600, color: "var(--ink)", margin: "0 0 10px", display: "flex", gap: "10px", alignItems: "baseline" }}>
                    <span style={{ color: "var(--teal)", fontSize: "14px", fontWeight: 700 }}>Q{idx + 1}.</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.7, margin: "0 0 0 24px" }}>
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── City Contact & Survey Booking CTA ── */}
      <section className="page-cta-band">
        <div className="container">
          <p className="eyebrow">Local Office &amp; Engineering Support</p>
          <h2>Schedule Your Free Site Visit in {city.name}</h2>
          <p>
            Our {city.name} engineering desk is ready to measure your residential car porch or commercial plaza space and provide a certified 3D tensile proposal within 24 hours.
          </p>

          <div style={{ marginTop: "24px", display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.12)", padding: "8px 18px", borderRadius: "100px", fontSize: "13px" }}>
            <MapPin size={15} style={{ color: "var(--sage)" }} />
            <span>{city.address} · Call: {city.phone}</span>
          </div>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginTop: "28px" }}>
            <Link href="/contact" className="button button-solid">
              Book On-Site Inspection <ArrowUpRight size={16} />
            </Link>
            <a
              href={`https://wa.me/${city.whatsapp}?text=Hello%20TSP%20Tensile,%20I'd%20like%20to%20book%20a%20site%20visit%20in%20${city.name}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-outline"
            >
              <MessageCircle size={16} /> Chat on WhatsApp ({city.phone})
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

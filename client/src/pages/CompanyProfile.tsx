import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Download,
  FileText,
  ShieldCheck,
  Award,
  Compass,
  Building2,
  Sparkles,
  PhoneCall,
  MessageCircle,
  Check,
  Calculator,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { ZoomableImage } from "@/components/ZoomableImage";
import { useSEO } from "@/hooks/useSEO";
import { useContent } from "@/contexts/ContentContext";

interface Chapter {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  summary: string;
  keyPoints: string[];
  image: string;
  caption: string;
  tag: string;
}

const chapters: Chapter[] = [
  {
    id: "overview",
    num: "CH. 01",
    title: "Executive Summary & Corporate Pedigree",
    subtitle: "Pioneering Turnkey Tensile Architecture in Pakistan",
    summary:
      "TSP Tensile Structures is Pakistan's premier specialized engineering practice dedicated exclusively to architectural design, finite-element computational analysis, precision steel fabrication, and tensioned membrane installation.",
    keyPoints: [
      "18+ Years combined international & domestic engineering leadership",
      "Over 150+ completed installations across Lahore, Islamabad, Karachi & nationwide",
      "Turnkey single-source delivery: Zero 3rd-party subcontractor handovers",
      "Headquartered in Lahore with regional project liaisons in Islamabad & Rawalpindi",
    ],
    image: "/images/hero_flagship.jpg",
    caption: "Flagship Hyperbolic Paraboloid Tensile Installation — Engineered by TSP Tensile",
    tag: "Corporate Dossier",
  },
  {
    id: "pillars",
    num: "CH. 02",
    title: "Four Core Architectural Pillars",
    subtitle: "The Principles Governing Every Commission",
    summary:
      "Unlike generic metal shed fabricators, TSP treats tensile architecture as an intimate harmony between structural mathematics and desert modernist aesthetics.",
    keyPoints: [
      "Pillar 01 — Site-First Contextual Synthesis: Tailored to sun-path and aerodynamic exposure",
      "Pillar 02 — Mathematical Honesty: True hyperbolic and conical anticlastic geometry",
      "Pillar 03 — Uncompromising Material Science: Genuine European PVDF & PTFE membranes",
      "Pillar 04 — Lifetime Engineering Accountability: 15–25 years design life",
    ],
    image: "/images/luxury_car_parking.jpg",
    caption: "Architectural Cantilever Parking System — Unobstructed 2-Car Clear Clearance",
    tag: "Core Philosophy",
  },
  {
    id: "leadership",
    num: "CH. 03",
    title: "Executive Leadership & Track Record",
    subtitle: "Led by Engr. Shaukat Rauf — 18+ Years Pedigree",
    summary:
      "The engineering practice is directed by Shaukat Rauf, whose professional career spans over nearly two decades across mega infrastructure projects in Saudi Arabia and Pakistan.",
    keyPoints: [
      "Haif Trading & Contracting (Riyadh, KSA - 6 Years): Heavy structural steel erection",
      "Sarwar & Company: KOTO Hydroelectric Power Project structural erection",
      "Frontier Works Organization (FWO): Heavy-duty strategic civil infrastructure",
      "Descon Engineering Ltd: Foreman role at Pakistan's premier engineering conglomerate",
    ],
    image: "/images/project_steel_engineering.jpg",
    caption: "Precision CNC Fabricated Structural Steel Frame with 80-Micron Hot-Dip Galvanizing",
    tag: "Executive Leadership",
  },
  {
    id: "solutions",
    num: "CH. 04",
    title: "Six Specialized Architectural Solutions",
    subtitle: "From Executive Cantilevers to Olympic-Span Canopies",
    summary:
      "We engineer six distinct classes of tensile architecture for institutional, commercial, residential, and recreational clients.",
    keyPoints: [
      "1. Architectural Cantilever Car Shades (Single & Double bays with zero front columns)",
      "2. Conical & Gazebo Tensile Pavilions (Dramatic 3D peak tension for estates & clubs)",
      "3. Hyperbolic Paraboloid (Hypar) Sails (Sculptural anticlastic membranes)",
      "4. Inverted Umbrella Canopies (Center mast with internal rainwater drainage)",
      "5. Industrial Warehouse & Commercial Clear-Span Enclosures (Cost-effective volume)",
      "6. Sports Arena & Padel Court Canopies (All-weather UV and rain protection)",
    ],
    image: "/images/project_sports_arena_padel.jpg",
    caption: "Padel Court & Sports Arena Enclosure — Complete Weatherproof High-Span Roof",
    tag: "Product Matrix",
  },
  {
    id: "materials",
    num: "CH. 05",
    title: "Material Science & European Membranes",
    subtitle: "Mehler Texnologies · Serge Ferrari · Architectural PTFE",
    summary:
      "TSP Tensile exclusively sources certified architectural-grade membranes from Tier-1 European manufacturers. We strictly reject substandard non-lacquered PVC flex.",
    keyPoints: [
      "German Mehler Valmex 900 GSM: Dual PVDF lacquer, Class B1 flame retardant, 4300 N/5cm",
      "French Serge Ferrari Précontraint 1050 GSM: Low-elongation pre-stretched matrix, 20+ yr life",
      "Architectural PTFE 1250 GSM: Teflon-coated woven fiberglass, non-combustible, 25-30+ yr life",
      "100% UV-blockout, self-cleaning fluoropolymer coating repels Pakistani smog and dust",
    ],
    image: "/images/engineering_detail.jpg",
    caption: "Micro-Engineered Cable Tensioners & Marine-Grade Stainless Steel Turnbuckles",
    tag: "Material Science",
  },
  {
    id: "galvanizing",
    num: "CH. 06",
    title: "Structural Steel & Hot-Dip Galvanizing",
    subtitle: "ASTM A123 Certified 80-Micron Anti-Corrosion Protection",
    summary:
      "Pakistan's monsoons, extreme summer heat, and urban moisture destroy poorly painted steel in under 3 years. TSP applies full-submersion hot-dip galvanizing for multi-decade life.",
    keyPoints: [
      "Seamless ASTM A53 Grade B & ASTM A500 heavy-wall hollow structural sections",
      "Submerged in 450°C molten zinc bath depositing minimum 80-micron metallurgical bond",
      "Optional two-pack marine epoxy primer + aliphatic polyurethane topcoat (RAL matched)",
      "Grade 316 / 304 marine-grade stainless steel cables, swaged studs, and clevis pins",
    ],
    image: "/images/project_cantilever_parking.jpg",
    caption: "Heavy-Gauge Cantilever Armature — Withstands 160 km/h Monsoonal Gale Winds",
    tag: "Corrosion Science",
  },
  {
    id: "workflow",
    num: "CH. 07",
    title: "The Six-Stage Turnkey Workflow",
    subtitle: "From Computational Form-Finding to Precision Rigging",
    summary:
      "Every project follows our ISO-aligned, six-stage turnkey process guaranteeing engineering compliance, structural safety, and millimetric fabrication accuracy.",
    keyPoints: [
      "Phase 1: Digital Site Survey & Aerodynamic Wind Mapping",
      "Phase 2: Computational Form-Finding in Rhino / Grasshopper",
      "Phase 3: Finite Element Structural Analysis (SAP2000 / ANSYS) per ASCE 7-10 & IBC",
      "Phase 4: CNC Plasma Cutting & Precision Robotic/MIG Fabrication",
      "Phase 5: High-Frequency Radio-Frequency (RF) Membrane Seaming",
      "Phase 6: Hydraulic & Turnbuckle Rigging, Pre-Tensioning & Final Load Handover",
    ],
    image: "/images/luxury_walkway.jpg",
    caption: "Covered Walkway Canopy — Continuous Shade Link for Institutional Campuses",
    tag: "Engineering Protocol",
  },
  {
    id: "commercial",
    num: "CH. 08",
    title: "Landmark Commercial & Institutional Projects",
    subtitle: "Trusted by Federal Bodies, Corporate HQs & Sports Arenas",
    summary:
      "Our portfolio includes some of the most visible public and corporate infrastructure projects completed across major metropolitan centers in Pakistan.",
    keyPoints: [
      "Radio Pakistan HQ (Islamabad): Multi-bay executive staff parking canopies",
      "Sports Arena & Padel Club: 12,000 sq.ft weather-tight athletic canopy",
      "Corporate EV Charging Hub: High-clearance multi-station solar-compatible canopy",
      "Nestle, KFC, Government House, PAF, and Beaconhouse Institutional Shades",
    ],
    image: "/images/project_radio_pakistan.jpg",
    caption: "Radio Pakistan Islamabad Installation — Heavy Cantilever Structural Profile",
    tag: "Commercial Portfolio",
  },
  {
    id: "residential",
    num: "CH. 09",
    title: "Residential & Luxury Estate Portfolios",
    subtitle: "DHA, Bahria Town, Gulberg, Model Town & F-Sectors",
    summary:
      "For discerning homeowners and luxury villas, our shades enhance architectural curb appeal while preserving multi-million rupee luxury vehicles from brutal solar UV damage.",
    keyPoints: [
      "DHA Phase 5 & 6 Lahore: Custom 2-car & 3-car cantilever driveway shades",
      "Bahria Town Golf City & Islamabad F-7/F-8 Estates: Conical patio pavilions",
      "Luxury Swimming Pool Shade Canopies: Glare-free UV filtering for privacy",
      "Rooftop Gazebos & Terrace Shade Structures with panoramic city sightlines",
    ],
    image: "/images/project_dha_street_villas.jpg",
    caption: "DHA Luxury Villa Dual-Cantilever Porch Shade — Architectural Desert Modernism",
    tag: "Residential Portfolio",
  },
  {
    id: "pricing",
    num: "CH. 10",
    title: "Transparent Commercial Pricing Matrix",
    subtitle: "Honest Rates Per Square Foot in PKR (Turnkey Delivered)",
    summary:
      "We provide straightforward, transparent square-foot pricing that includes architectural 3D drawings, structural steel fabrication, German/French membrane, and certified installation.",
    keyPoints: [
      "German Mehler 900 GSM: PKR 450 - 550 / sq.ft (Ideal for Cantilever & Car Shades)",
      "French Serge Ferrari 1050 GSM: PKR 580 - 720 / sq.ft (Premium Conical & Large Spans)",
      "Architectural PTFE Membrane: PKR 1,200 - 1,800 / sq.ft (Institutional 25+ yr life)",
      "Standard 2-Car Cantilever (18x18 ft): PKR 160,000 - 210,000 turnkey complete",
    ],
    image: "/images/project_ev_charging_canopy.jpg",
    caption: "Commercial Cantilever Fleet Shade — Turnkey Package with Foundation Anchors",
    tag: "Pricing & Quotation",
  },
  {
    id: "quality",
    num: "CH. 11",
    title: "Quality Standards & Engineering Compliance",
    subtitle: "ASTM · DIN · BS EN · Building Code of Pakistan (BCP 2021)",
    summary:
      "Every tensioned structure we construct complies rigorously with international building standards, wind engineering codes, and structural safety guidelines.",
    keyPoints: [
      "DIN 4102-B1 & NFPA 701: Certified flame retardant and self-extinguishing",
      "ASCE 7-10 & BCP 2021: Engineered to resist up to 160 km/h monsoonal wind loads",
      "ASTM D4851: Standard test methods for coated and laminated architectural fabrics",
      "Written 10 to 15-year warranty certificate with registered corporate warranty seal",
    ],
    image: "/images/detail.jpg",
    caption: "High-Load Base Plate & High-Tensile Anchor Bolts Chemical-Anchored to Foundation",
    tag: "Standards & Codes",
  },
  {
    id: "contact",
    num: "CH. 12",
    title: "Nationwide Deployment & Direct Survey Desk",
    subtitle: "Lahore · Islamabad · Rawalpindi · Karachi · Nationwide",
    summary:
      "Our mobile engineering teams conduct on-site digital surveys across all major cities of Pakistan within 24 to 48 hours of booking.",
    keyPoints: [
      "Head Office & Fabrication Yard: Multan Road / Raiwind Road Industrial Area, Lahore",
      "Islamabad & Rawalpindi Regional Liaison: G-11 Markaz / Bahria Phase 7",
      "Direct WhatsApp Hotline: 0302 4001063 (Engr. Shaukat Rauf Direct)",
      "Instant 24-Hour Quotation & 3D Concept Visualization upon receipt of site dimensions",
    ],
    image: "/images/luxury_pool.jpg",
    caption: "Swimming Pool Leisure Canopy — Installed for Luxury Estate Club",
    tag: "Contact & Booking",
  },
];

export default function CompanyProfilePage() {
  const { content } = useContent();
  const [activeTab, setActiveTab] = useState(0);

  useSEO({
    title: "Official Company Profile | TSP Tensile Structures Pakistan",
    description:
      "Explore TSP Tensile Structures official 12-chapter corporate company profile. Download executive PDF dossier, view structural engineering standards, material science, CEO profile and completed landmark projects.",
    path: "/company-profile",
    keywords:
      "tsp tensile company profile pdf, tensile shade corporate profile pakistan, shaukat rauf ceo profile, tensile structure catalog download, car parking shades brochure lahore islamabad",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Company Profile", url: "/company-profile" },
    ],
  });

  const pdfUrl = "/TSP_Tensile_Structures_Company_Profile.pdf";
  const activeChapter = chapters[activeTab];
  const whatsappNumber = (content?.company?.whatsapp || "923024001063").replace(/[^0-9]/g, "");

  return (
    <div className="company-profile-page" style={{ background: "#F7F5F0", minHeight: "100vh" }}>
      {/* ── 1. CINEMATIC EXECUTIVE HERO ── */}
      <section
        style={{
          background: "radial-gradient(ellipse at 80% 20%, #173E52 0%, #0A1D27 60%, #061219 100%)",
          color: "#FFFFFF",
          padding: "70px 0 60px",
          position: "relative",
          overflow: "hidden",
          borderBottom: "3px solid #F59E0B",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(245, 158, 11, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.8,
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(245, 158, 11, 0.15)",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                padding: "6px 16px",
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.1em",
                color: "#F59E0B",
                marginBottom: 20,
                textTransform: "uppercase",
              }}
            >
              <Award size={14} />
              <span>Official Corporate Dossier & Architectural Catalog · 2026 Edition</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: "clamp(2rem, 5vw, 3.4rem)",
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: 16,
                fontFamily: "var(--font-heading, serif)",
              }}
            >
              TSP TENSILE STRUCTURES <br />
              <span style={{ color: "#F59E0B" }}>ARCHITECTURAL PROFILE</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                color: "#D1D5DB",
                lineHeight: 1.6,
                maxWidth: 780,
                margin: "0 auto 32px",
              }}
            >
              Pakistan's premier single-source tensile architecture practice. Engineered under Engr.
              Shaukat Rauf with 18+ years of international & national engineering pedigree. View the
              complete 12-chapter dossier online or download the high-resolution executive PDF.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                display: "flex",
                gap: 14,
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: 30,
              }}
            >
              <a
                href={pdfUrl}
                download="TSP_Tensile_Structures_Company_Profile.pdf"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                  color: "#0B1E28",
                  padding: "16px 32px",
                  borderRadius: 100,
                  fontWeight: 900,
                  fontSize: 15,
                  boxShadow: "0 12px 30px rgba(245, 158, 11, 0.4)",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  border: "2px solid #FCD34D",
                }}
              >
                <Download size={20} style={{ strokeWidth: 2.5 }} />
                <span>DOWNLOAD OFFICIAL 12-PAGE PDF (8.7 MB)</span>
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}?text=Assalam%20o%20Alaikum%20TSP%20Tensile,%20I%20have%20reviewed%20your%20Company%20Profile%20and%20would%20like%20to%20discuss%20a%20turnkey%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "#FFFFFF",
                  padding: "16px 28px",
                  borderRadius: 100,
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                }}
              >
                <MessageCircle size={19} style={{ color: "#25D366" }} />
                <span>WhatsApp VIP Desk</span>
              </a>

              <Link
                href="/calculator"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  color: "#E2E8F0",
                  padding: "16px 24px",
                  borderRadius: 100,
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                <Calculator size={18} style={{ color: "#F59E0B" }} />
                <span>Live Cost Calculator ↗</span>
              </Link>
            </motion.div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                fontSize: 12,
                color: "#9CA3AF",
                flexWrap: "wrap",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <FileText size={14} style={{ color: "#F59E0B" }} /> 12 Full Chapters
              </span>
              <span>•</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <ShieldCheck size={14} style={{ color: "#F59E0B" }} /> ASTM & DIN Standards
              </span>
              <span>•</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <Building2 size={14} style={{ color: "#F59E0B" }} /> 150+ Nationwide Projects
              </span>
              <span>•</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <Sparkles size={14} style={{ color: "#F59E0B" }} /> Turnkey Delivery
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. EXECUTIVE LIVE STATS COUNTER STRIP ── */}
      <section
        style={{
          background: "#0E2A38",
          color: "#FFFFFF",
          padding: "24px 0",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 24,
              textAlign: "center",
            }}
          >
            <div>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: "#F59E0B" }}>18+ Years</div>
              <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 2 }}>
                Structural Engineering Pedigree
              </div>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: "#F59E0B" }}>150+</div>
              <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 2 }}>
                Turnkey Tensile Projects Delivered
              </div>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: "#F59E0B" }}>160 km/h</div>
              <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 2 }}>
                Monsoonal Wind Load Compliance
              </div>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: "#F59E0B" }}>15–25 Yrs</div>
              <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 2 }}>
                European Membrane Design Life
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. INTERACTIVE 12-CHAPTER DOSSIER EXPLORER ── */}
      <section style={{ padding: "64px 0", background: "#F5F2EA" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 40px" }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: "#B45309",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Interactive Digital Dossier
            </span>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 800,
                color: "#0E2A38",
                marginTop: 8,
                marginBottom: 12,
                fontFamily: "var(--font-heading, serif)",
              }}
            >
              Explore the 12 Chapters of TSP Tensile
            </h2>
            <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.6 }}>
              Select any chapter below to review its technical summary, engineering highlights, and
              high-resolution project photography with 2.4x loupe inspection.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              overflowX: "auto",
              paddingBottom: 14,
              marginBottom: 32,
              scrollbarWidth: "thin",
            }}
          >
            {chapters.map((ch, idx) => {
              const isSelected = activeTab === idx;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  style={{
                    flex: "0 0 auto",
                    padding: "10px 16px",
                    borderRadius: 8,
                    border: isSelected ? "2px solid #0E2A38" : "1px solid #D1D5DB",
                    background: isSelected ? "#0E2A38" : "#FFFFFF",
                    color: isSelected ? "#FFFFFF" : "#1E293B",
                    fontSize: 13,
                    fontWeight: isSelected ? 800 : 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    boxShadow: isSelected ? "0 4px 12px rgba(14, 42, 56, 0.2)" : "none",
                  }}
                >
                  <span
                    style={{
                      color: isSelected ? "#F59E0B" : "#64748B",
                      fontSize: 11,
                      fontWeight: 800,
                    }}
                  >
                    {ch.num}
                  </span>
                  <span>{ch.title.split("&")[0].trim()}</span>
                </button>
              );
            })}
          </div>

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 16,
              border: "1px solid #E2E8F0",
              boxShadow: "0 10px 35px rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                alignItems: "stretch",
              }}
            >
              <div
                style={{
                  padding: "40px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        background: "#0E2A38",
                        color: "#F59E0B",
                        padding: "3px 10px",
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {activeChapter.num}
                    </span>
                    <span
                      style={{
                        background: "#FEF3C7",
                        color: "#92400E",
                        padding: "3px 10px",
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {activeChapter.tag}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)",
                      fontWeight: 800,
                      color: "#0F172A",
                      lineHeight: 1.25,
                      marginBottom: 6,
                    }}
                  >
                    {activeChapter.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 14,
                      color: "#D97706",
                      fontWeight: 700,
                      marginBottom: 18,
                    }}
                  >
                    {activeChapter.subtitle}
                  </p>

                  <p
                    style={{
                      fontSize: 15,
                      color: "#475569",
                      lineHeight: 1.65,
                      marginBottom: 24,
                    }}
                  >
                    {activeChapter.summary}
                  </p>

                  <div style={{ marginBottom: 28 }}>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: "#0F172A",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 12,
                      }}
                    >
                      Key Technical & Engineering Highlights:
                    </div>
                    <div style={{ display: "grid", gap: 10 }}>
                      {activeChapter.keyPoints.map((pt, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            fontSize: 14,
                            color: "#334155",
                            lineHeight: 1.5,
                          }}
                        >
                          <CheckCircle2
                            size={16}
                            style={{ color: "#16A34A", flexShrink: 0, marginTop: 3 }}
                          />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    paddingTop: 24,
                    borderTop: "1px solid #F1F5F9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      disabled={activeTab === 0}
                      onClick={() => setActiveTab((prev) => Math.max(0, prev - 1))}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 6,
                        border: "1px solid #CBD5E1",
                        background: activeTab === 0 ? "#F1F5F9" : "#FFFFFF",
                        color: activeTab === 0 ? "#94A3B8" : "#0F172A",
                        cursor: activeTab === 0 ? "not-allowed" : "pointer",
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      ← Previous
                    </button>
                    <button
                      type="button"
                      disabled={activeTab === chapters.length - 1}
                      onClick={() =>
                        setActiveTab((prev) => Math.min(chapters.length - 1, prev + 1))
                      }
                      style={{
                        padding: "8px 16px",
                        borderRadius: 6,
                        border: "1px solid #0E2A38",
                        background:
                          activeTab === chapters.length - 1 ? "#F1F5F9" : "#0E2A38",
                        color: activeTab === chapters.length - 1 ? "#94A3B8" : "#FFFFFF",
                        cursor: activeTab === chapters.length - 1 ? "not-allowed" : "pointer",
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      Next Chapter →
                    </button>
                  </div>

                  <a
                    href={pdfUrl}
                    download="TSP_Tensile_Structures_Company_Profile.pdf"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      color: "#B45309",
                      fontSize: 13,
                      fontWeight: 800,
                      textDecoration: "none",
                    }}
                  >
                    <Download size={15} />
                    <span>Download Full PDF ⬇</span>
                  </a>
                </div>
              </div>

              <div
                style={{
                  background: "#0A1D27",
                  minHeight: 420,
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  borderLeft: "1px solid #E2E8F0",
                }}
              >
                <div style={{ flex: 1, position: "relative" }}>
                  <ZoomableImage
                    src={activeChapter.image}
                    alt={activeChapter.title}
                    caption={activeChapter.caption}
                    zoomScale={2.4}
                    badgeText="2.4x HD LOUPE ZOOM"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div
                  style={{
                    padding: "12px 18px",
                    background: "rgba(10, 29, 39, 0.95)",
                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#E2E8F0",
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontStyle: "italic" }}>{activeChapter.caption}</span>
                  <span
                    style={{
                      background: "rgba(245, 158, 11, 0.2)",
                      color: "#F59E0B",
                      padding: "2px 8px",
                      borderRadius: 4,
                      fontSize: 10,
                      fontWeight: 800,
                    }}
                  >
                    TOUCH / HOVER TO ZOOM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. MATERIAL SCIENCE & EUROPEAN MEMBRANES ── */}
      <section style={{ padding: "64px 0", background: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 48px" }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: "#B45309",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Certified Raw Materials
            </span>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                fontWeight: 800,
                color: "#0E2A38",
                marginTop: 8,
                marginBottom: 12,
                fontFamily: "var(--font-heading, serif)",
              }}
            >
              European Architectural Membrane Science
            </h2>
            <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.6 }}>
              We exclusively import and install certified membranes engineered for the brutal solar
              radiation and monsoonal deluges of Pakistan.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {/* Card 1: Mehler */}
            <div
              style={{
                background: "#F8FAFC",
                borderRadius: 14,
                border: "1px solid #E2E8F0",
                padding: "32px",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  background: "#0E2A38",
                  color: "#F59E0B",
                  padding: "4px 10px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 800,
                  marginBottom: 16,
                }}
              >
                GERMANY · MEHLER TEXNOLOGIES
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>
                Valmex FR 900 GSM (Type II)
              </h3>
              <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, marginBottom: 20 }}>
                High-tenacity low-wick polyester base cloth with multi-layer knife coating and dual
                PVDF top lacquering. Pakistan's most proven membrane for car parking and canopies.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
                <li style={{ fontSize: 13, color: "#334155", display: "flex", gap: 8 }}>
                  <Check size={16} style={{ color: "#16A34A", flexShrink: 0 }} />
                  <span>
                    <strong>Tensile Strength:</strong> 4300 / 4000 N/5cm
                  </span>
                </li>
                <li style={{ fontSize: 13, color: "#334155", display: "flex", gap: 8 }}>
                  <Check size={16} style={{ color: "#16A34A", flexShrink: 0 }} />
                  <span>
                    <strong>Fire Safety:</strong> DIN 4102 B1 Self-Extinguishing
                  </span>
                </li>
                <li style={{ fontSize: 13, color: "#334155", display: "flex", gap: 8 }}>
                  <Check size={16} style={{ color: "#16A34A", flexShrink: 0 }} />
                  <span>
                    <strong>Expected Lifespan:</strong> 15 – 20 Years
                  </span>
                </li>
                <li style={{ fontSize: 13, color: "#334155", display: "flex", gap: 8 }}>
                  <Check size={16} style={{ color: "#16A34A", flexShrink: 0 }} />
                  <span>
                    <strong>UV Filtration:</strong> 99.8% UV-A / UV-B Blockout
                  </span>
                </li>
              </ul>
            </div>

            {/* Card 2: Serge Ferrari */}
            <div
              style={{
                background: "#F8FAFC",
                borderRadius: 14,
                border: "2px solid #F59E0B",
                padding: "32px",
                position: "relative",
                boxShadow: "0 8px 24px rgba(245, 158, 11, 0.12)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -12,
                  right: 20,
                  background: "#F59E0B",
                  color: "#0F172A",
                  padding: "2px 10px",
                  borderRadius: 100,
                  fontSize: 10,
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                }}
              >
                MOST SPECIFIED
              </div>
              <div
                style={{
                  display: "inline-block",
                  background: "#0E2A38",
                  color: "#F59E0B",
                  padding: "4px 10px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 800,
                  marginBottom: 16,
                }}
              >
                FRANCE · SERGE FERRARI
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>
                Précontraint 1050 GSM (Type III)
              </h3>
              <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, marginBottom: 20 }}>
                Patented bi-axial pre-tensioning during coating eliminates elongation and sagging
                under Pakistan's extreme summer heat waves. Unrivaled dimensional stability.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
                <li style={{ fontSize: 13, color: "#334155", display: "flex", gap: 8 }}>
                  <Check size={16} style={{ color: "#16A34A", flexShrink: 0 }} />
                  <span>
                    <strong>Tensile Strength:</strong> 5000 / 4800 N/5cm
                  </span>
                </li>
                <li style={{ fontSize: 13, color: "#334155", display: "flex", gap: 8 }}>
                  <Check size={16} style={{ color: "#16A34A", flexShrink: 0 }} />
                  <span>
                    <strong>Anti-Dirt Coating:</strong> Fluotop T2 Dirt-Repellent
                  </span>
                </li>
                <li style={{ fontSize: 13, color: "#334155", display: "flex", gap: 8 }}>
                  <Check size={16} style={{ color: "#16A34A", flexShrink: 0 }} />
                  <span>
                    <strong>Expected Lifespan:</strong> 20 – 25 Years
                  </span>
                </li>
                <li style={{ fontSize: 13, color: "#334155", display: "flex", gap: 8 }}>
                  <Check size={16} style={{ color: "#16A34A", flexShrink: 0 }} />
                  <span>
                    <strong>Thermal Deflection:</strong> Low Solar Heat Gain (SHGC)
                  </span>
                </li>
              </ul>
            </div>

            {/* Card 3: Architectural PTFE */}
            <div
              style={{
                background: "#F8FAFC",
                borderRadius: 14,
                border: "1px solid #E2E8F0",
                padding: "32px",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  background: "#0E2A38",
                  color: "#F59E0B",
                  padding: "4px 10px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 800,
                  marginBottom: 16,
                }}
              >
                PTFE · WOVEN FIBERGLASS
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>
                Architectural PTFE 1250 GSM
              </h3>
              <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, marginBottom: 20 }}>
                Teflon-coated woven fiberglass membrane. Completely non-combustible Class A1 fire
                rating, self-cleans naturally under rainfall, ideal for landmark civic icons.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
                <li style={{ fontSize: 13, color: "#334155", display: "flex", gap: 8 }}>
                  <Check size={16} style={{ color: "#16A34A", flexShrink: 0 }} />
                  <span>
                    <strong>Fire Safety:</strong> Class A1 Completely Non-Combustible
                  </span>
                </li>
                <li style={{ fontSize: 13, color: "#334155", display: "flex", gap: 8 }}>
                  <Check size={16} style={{ color: "#16A34A", flexShrink: 0 }} />
                  <span>
                    <strong>Expected Lifespan:</strong> 25 – 35+ Years
                  </span>
                </li>
                <li style={{ fontSize: 13, color: "#334155", display: "flex", gap: 8 }}>
                  <Check size={16} style={{ color: "#16A34A", flexShrink: 0 }} />
                  <span>
                    <strong>Light Transmittance:</strong> Up to 15% Diffused Daylight
                  </span>
                </li>
                <li style={{ fontSize: 13, color: "#334155", display: "flex", gap: 8 }}>
                  <Check size={16} style={{ color: "#16A34A", flexShrink: 0 }} />
                  <span>
                    <strong>Application:</strong> Stadiums, Airports, Corporate HQs
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. TRANSPARENT COMMERCIAL PRICING MATRIX ── */}
      <section style={{ padding: "64px 0", background: "#F5F2EA" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 40px" }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: "#B45309",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Turnkey Commercial Rates
            </span>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                fontWeight: 800,
                color: "#0E2A38",
                marginTop: 8,
                marginBottom: 12,
                fontFamily: "var(--font-heading, serif)",
              }}
            >
              Commercial Pricing Matrix (PKR / Sq.Ft)
            </h2>
            <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.6 }}>
              All prices represent complete turnkey execution including structural design, heavy steel
              fabrication, hot-dip galvanizing, imported European membrane, and on-site rigging.
            </p>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 14,
              border: "1px solid #E2E8F0",
              overflowX: "auto",
              boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                fontSize: 14,
              }}
            >
              <thead>
                <tr style={{ background: "#0E2A38", color: "#FFFFFF" }}>
                  <th style={{ padding: "16px 20px" }}>Structure Type</th>
                  <th style={{ padding: "16px 20px" }}>Recommended Membrane</th>
                  <th style={{ padding: "16px 20px" }}>Rate (PKR / Sq.Ft)</th>
                  <th style={{ padding: "16px 20px" }}>Warranty</th>
                  <th style={{ padding: "16px 20px" }}>Typical 2-Car Package</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <td style={{ padding: "16px 20px", fontWeight: 700, color: "#0F172A" }}>
                    Cantilever Car Parking (Standard)
                  </td>
                  <td style={{ padding: "16px 20px", color: "#475569" }}>German Mehler 900 GSM</td>
                  <td style={{ padding: "16px 20px", fontWeight: 800, color: "#B45309" }}>
                    PKR 450 – 520
                  </td>
                  <td style={{ padding: "16px 20px", color: "#16A34A", fontWeight: 700 }}>
                    10 Years
                  </td>
                  <td style={{ padding: "16px 20px", color: "#0F172A" }}>PKR 160,000 – 185,000</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #F1F5F9", background: "#F8FAFC" }}>
                  <td style={{ padding: "16px 20px", fontWeight: 700, color: "#0F172A" }}>
                    Architectural Cantilever (Heavy-Duty)
                  </td>
                  <td style={{ padding: "16px 20px", color: "#475569" }}>
                    French Serge Ferrari 1050 GSM
                  </td>
                  <td style={{ padding: "16px 20px", fontWeight: 800, color: "#B45309" }}>
                    PKR 580 – 680
                  </td>
                  <td style={{ padding: "16px 20px", color: "#16A34A", fontWeight: 700 }}>
                    15 Years
                  </td>
                  <td style={{ padding: "16px 20px", color: "#0F172A" }}>PKR 195,000 – 230,000</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <td style={{ padding: "16px 20px", fontWeight: 700, color: "#0F172A" }}>
                    Conical / Gazebo Peak Canopy
                  </td>
                  <td style={{ padding: "16px 20px", color: "#475569" }}>Mehler / Ferrari Dual</td>
                  <td style={{ padding: "16px 20px", fontWeight: 800, color: "#B45309" }}>
                    PKR 550 – 750
                  </td>
                  <td style={{ padding: "16px 20px", color: "#16A34A", fontWeight: 700 }}>
                    10–15 Years
                  </td>
                  <td style={{ padding: "16px 20px", color: "#0F172A" }}>Custom Quote</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #F1F5F9", background: "#F8FAFC" }}>
                  <td style={{ padding: "16px 20px", fontWeight: 700, color: "#0F172A" }}>
                    Inverted Umbrella (Center Mast)
                  </td>
                  <td style={{ padding: "16px 20px", color: "#475569" }}>
                    Serge Ferrari Précontraint
                  </td>
                  <td style={{ padding: "16px 20px", fontWeight: 800, color: "#B45309" }}>
                    PKR 650 – 850
                  </td>
                  <td style={{ padding: "16px 20px", color: "#16A34A", fontWeight: 700 }}>
                    15 Years
                  </td>
                  <td style={{ padding: "16px 20px", color: "#0F172A" }}>PKR 220,000 – 280,000</td>
                </tr>
                <tr>
                  <td style={{ padding: "16px 20px", fontWeight: 700, color: "#0F172A" }}>
                    Institutional PTFE Fiberglass Roof
                  </td>
                  <td style={{ padding: "16px 20px", color: "#475569" }}>Architectural PTFE</td>
                  <td style={{ padding: "16px 20px", fontWeight: 800, color: "#B45309" }}>
                    PKR 1,200 – 1,800
                  </td>
                  <td style={{ padding: "16px 20px", color: "#16A34A", fontWeight: 700 }}>
                    25 Years
                  </td>
                  <td style={{ padding: "16px 20px", color: "#0F172A" }}>Institutional Tenders</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            style={{
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <span style={{ fontSize: 13, color: "#64748B" }}>
              * Rates vary based on foundation excavation requirements and site accessibility.
            </span>
            <Link
              href="/calculator"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#0E2A38",
                color: "#FFFFFF",
                padding: "10px 20px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <span>Launch Live Cost Calculator</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. DIRECT ACTION BOTTOM BANNER ── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0A1D27 0%, #173E52 100%)",
          color: "#FFFFFF",
          padding: "60px 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: 740, margin: "0 auto" }}>
            <Award size={36} style={{ color: "#F59E0B", margin: "0 auto 16px" }} />
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 900,
                marginBottom: 16,
                fontFamily: "var(--font-heading, serif)",
              }}
            >
              Ready to Discuss Your Project with TSP Tensile?
            </h2>
            <p style={{ fontSize: 16, color: "#CBD5E1", lineHeight: 1.6, marginBottom: 32 }}>
              Book an on-site architectural survey with our structural team. We deliver 3D concept
              models, wind-load calculations, and guaranteed quotation within 48 hours.
            </p>

            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href={pdfUrl}
                download="TSP_Tensile_Structures_Company_Profile.pdf"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#F59E0B",
                  color: "#0B1E28",
                  padding: "15px 30px",
                  borderRadius: 100,
                  fontWeight: 900,
                  fontSize: 15,
                  textDecoration: "none",
                  boxShadow: "0 8px 24px rgba(245, 158, 11, 0.35)",
                }}
              >
                <Download size={18} />
                <span>DOWNLOAD 12-PAGE PDF</span>
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}?text=Assalam%20o%20Alaikum%20Engr%20Shaukat%20Rauf,%20I%20would%20like%20to%20schedule%20a%20site%20survey%20for%20our%20property.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(255, 255, 255, 0.12)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "#FFFFFF",
                  padding: "15px 28px",
                  borderRadius: 100,
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: "none",
                }}
              >
                <PhoneCall size={18} style={{ color: "#25D366" }} />
                <span>0302 4001063 (Direct Desk)</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

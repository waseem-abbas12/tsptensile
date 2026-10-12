import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X, MessageCircle, Smartphone, Download, Calculator, Home, Layers } from "lucide-react";
import { ScrollProgress } from "@/components/ScrollProgress";
import { QuotePanel } from "@/components/QuotePanel";
import { AiAssistant } from "@/components/AiAssistant";
import { SocialIconsRow, FloatingWhatsAppButton } from "@/components/SocialIcons";
import { useContent } from "@/contexts/ContentContext";
import { DownloadAppModal } from "@/components/DownloadAppModal";

function BrandMark({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ display: "inline-block", flexShrink: 0 }}>
      {/* Tensile membrane sail wings */}
      <path d="M6 29 C12 18, 16 12, 18 5 C17 14, 13 23, 6 29 Z" fill="#F59E0B" />
      <path d="M30 29 C24 18, 20 12, 18 5 C19 14, 23 23, 30 29 Z" fill="#D97706" opacity="0.9" />
      {/* Center hyperbolic curved membrane */}
      <path d="M8 28 C13 23, 23 23, 28 28 C22 25, 14 25, 8 28 Z" fill="#FFFFFF" opacity="0.95" />
      {/* Structural Mast */}
      <line x1="18" y1="4" x2="18" y2="30" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      {/* Mast Finial */}
      <circle cx="18" cy="4" r="1.5" fill="#FBBF24" />
      {/* High-tensile stay cables */}
      <line x1="18" y1="7" x2="6" y2="29" stroke="#94A3B8" strokeWidth="0.75" strokeLinecap="round" />
      <line x1="18" y1="7" x2="30" y2="29" stroke="#94A3B8" strokeWidth="0.75" strokeLinecap="round" />
      <line x1="18" y1="16" x2="11" y2="28" stroke="#FBBF24" strokeWidth="0.65" strokeDasharray="1.5 1" opacity="0.8" />
      <line x1="18" y1="16" x2="25" y2="28" stroke="#FBBF24" strokeWidth="0.65" strokeDasharray="1.5 1" opacity="0.8" />
      {/* Base Anchor Points */}
      <circle cx="6" cy="29" r="1.2" fill="#E2E8F0" />
      <circle cx="30" cy="29" r="1.2" fill="#E2E8F0" />
      <circle cx="18" cy="30" r="1.2" fill="#E2E8F0" />
    </svg>
  );
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/company-profile", label: "Profile" },
  { href: "/solutions", label: "Solutions" },
  { href: "/projects", label: "Projects" },
  { href: "/calculator", label: "Calculator" },
  { href: "/locations", label: "Locations" },
  { href: "/engineering", label: "Engineering" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { content } = useContent();
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location, navigate] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0); }, [location]);

  const whatsappRaw = (content?.company?.whatsapp || "923024001063").replace(/[^0-9]/g, "");
  const phoneDisplay = content?.company?.phone || "0302 4001063";

  return (
    <div className="site-shell">
      <ScrollProgress />

      {/* ── Top Announcement Bar (Controllable from Admin Panel) ── */}
      {content.appSettings?.announcementEnabled && (
        <aside
          className="top-announcement-bar"
          style={{
            background: "linear-gradient(90deg, #0B1E28 0%, #173E52 50%, #0B1E28 100%)",
            color: "#FFFFFF",
            padding: "8px 16px",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            borderBottom: "1px solid rgba(245, 158, 11, 0.3)",
            textAlign: "center",
            position: "relative",
            zIndex: 1000,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              background: "#F59E0B",
              color: "#0F172A",
              fontSize: "10px",
              fontWeight: 800,
              padding: "2px 8px",
              borderRadius: "100px",
              letterSpacing: "0.05em",
            }}
          >
            {content.appSettings?.announcementBadge || "OFFICIAL APP"}
          </span>
          <span style={{ color: "#E2E8F0" }}>
            {content.appSettings?.announcementTextUrdu || "موبائل ایپ لائیو: ریئل ٹائم تخمینہ کیلکولیٹر اور 2.4x ایچ ڈی زوم فیچر کے ساتھ"}
          </span>
          <button
            type="button"
            onClick={() => setAppModalOpen(true)}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.35)",
              color: "#FFFFFF",
              borderRadius: "100px",
              padding: "2px 10px",
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Download App ↗
          </button>
        </aside>
      )}

      {/* ── Header ── */}
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="header-inner">
          <Link href="/" className="brand" aria-label="TSP Tensile Home">
            <div className="brand-mark-box">
              <BrandMark />
            </div>
            <div className="brand-text">
              <span className="brand-name">{content?.company?.name || "TSP TENSILE"}</span>
              <span className="brand-sub">Architectural Structures</span>
            </div>
          </Link>

          {/* Complete Desktop Navigation Bar */}
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={location === link.href ? "active-link" : ""}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            {/* Download Mobile App — Desktop header button */}
            <button
              type="button"
              className="header-download-btn header-download-desktop"
              onClick={() => setAppModalOpen(true)}
              title="Download TSP Tensile Mobile App"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(245, 158, 11, 0.14)",
                border: "1px solid rgba(245, 158, 11, 0.45)",
                color: "#B45309",
                padding: "7px 13px",
                borderRadius: "100px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <Smartphone size={14} style={{ color: "#D97706" }} />
              <span>Download App</span>
            </button>

            {/* Phone — desktop only */}
            <a
              href={`tel:${phoneDisplay.replace(/[^0-9]/g, "")}`}
              className="header-phone-btn"
              title="Call us directly"
            >
              <span>{phoneDisplay}</span>
            </a>

            {/* WhatsApp — desktop only (floating button handles mobile) */}
            <a
              href={`https://wa.me/${whatsappRaw}?text=Hello%20TSP%20Tensile,%20I'd%20like%20to%20inquire%20about%20a%20tensile%20structure.`}
              target="_blank"
              rel="noopener noreferrer"
              className="header-wa-btn header-wa-desktop"
              title="Chat directly on WhatsApp"
            >
              <MessageCircle size={15} />
              <span>WhatsApp</span>
            </a>

            {/* Get a quote — desktop only (in mobile menu below) */}
            <button className="header-cta header-cta-desktop" onClick={() => setQuoteOpen(true)}>
              Get a quote <ArrowUpRight size={15} />
            </button>

            {/* Download App — mobile button right at top of screen */}
            <button
              type="button"
              className="header-download-mobile"
              onClick={() => setAppModalOpen(true)}
              aria-label="Download TSP Tensile Mobile App"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                background: "#0E2A38",
                color: "#FFFFFF",
                border: "1px solid rgba(245, 158, 11, 0.6)",
                padding: "6px 12px",
                borderRadius: "100px",
                fontSize: "11px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <Download size={13} style={{ color: "#F59E0B" }} />
              <span>App</span>
            </button>

            {/* ☰ Hamburger — ALWAYS visible on mobile */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="mobile-nav">
            {/* Quick Mobile App Install Banner in Mobile Menu */}
            <div
              onClick={() => {
                setMenuOpen(false);
                setAppModalOpen(true);
              }}
              style={{
                background: "linear-gradient(135deg, #0E2A38 0%, #173E52 100%)",
                color: "#FFFFFF",
                padding: "12px 14px",
                borderRadius: "10px",
                marginBottom: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                border: "1px solid rgba(245, 158, 11, 0.4)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Smartphone size={20} style={{ color: "#F59E0B" }} />
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700 }}>TSP Tensile Mobile App</div>
                  <div style={{ fontSize: "11px", color: "var(--sage)" }}>1-Tap Install · Works Offline</div>
                </div>
              </div>
              <span
                style={{
                  background: "#F59E0B",
                  color: "#0F172A",
                  padding: "4px 9px",
                  borderRadius: "100px",
                  fontSize: "10.5px",
                  fontWeight: 800,
                }}
              >
                INSTALL
              </span>
            </div>

            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="mobile-nav-actions" style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
              <a
                href={`https://wa.me/${whatsappRaw}?text=Hello%20TSP%20Tensile,%20I'd%20like%20to%20inquire%20about%20a%20tensile%20structure.`}
                target="_blank"
                rel="noopener noreferrer"
                className="button header-wa-btn"
                style={{ display: "flex", justifyContent: "center", width: "100%" }}
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
              <button
                className="button button-solid"
                onClick={() => { setMenuOpen(false); setQuoteOpen(true); }}
                style={{ width: "100%" }}
              >
                Get a quote <ArrowUpRight size={16} />
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* ── Page content ── */}
      <main>{children}</main>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Link href="/" className="brand footer-brand">
              <div className="brand-mark-box" style={{ background: "rgba(255,255,255,0.12)" }}>
                <BrandMark />
              </div>
              <div className="brand-text">
                <span className="brand-name" style={{ color: "white" }}>
                  {content?.company?.name || "TSP TENSILE"}
                </span>
                <span className="brand-sub" style={{ color: "var(--sage)" }}>Architectural Structures</span>
              </div>
            </Link>
            <p>{content?.company?.heroSub || "Custom tensile architecture & parking shades engineered for Pakistan's climate."}</p>
            <div style={{ marginTop: "18px" }}>
              <span className="footer-label" style={{ marginBottom: "10px" }}>Follow Our Work</span>
              <SocialIconsRow />
            </div>
          </div>
          <div>
            <span className="footer-label">Products & Sheds</span>
            <Link href="/solutions#cantilever">Cantilever Parking & Porch Sheds</Link>
            <Link href="/solutions#industrial-sheds">Industrial & Warehouse Sheds</Link>
            <Link href="/solutions#tensile-roofs">Tensile Membrane Roofs</Link>
            <Link href="/solutions#marquee-event-shades">Marquee & Shadi Hall Sheds</Link>
            <Link href="/solutions#pool-shades">Swimming Pool Shades</Link>
            <Link href="/solutions#walkways">Covered Walkway Canopies</Link>
            <Link href="/solutions#padel-courts">Padel Court Enclosures</Link>
            <Link href="/solutions#rooftop">Rooftop Pergolas & Gazebos</Link>
            <Link href="/projects">View 100+ Completed Projects ↗</Link>
          </div>
          <div>
            <span className="footer-label">Locations Served</span>
            <Link href="/locations/lahore">Car Parking Shades Lahore</Link>
            <Link href="/locations/islamabad">Tensile Shades Islamabad</Link>
            <Link href="/locations/rawalpindi">Parking Sheds Rawalpindi</Link>
            <Link href="/locations/karachi">Tensile Fabric Karachi</Link>
            <Link href="/locations" style={{ color: "var(--accent)", fontWeight: 600 }}>All Cities & Site Survey ↗</Link>
          </div>
          <div>
            <span className="footer-label">Direct Contact</span>
            <a href={`tel:${(content?.company?.phone || "0302 4001063").replace(/\s+/g, "")}`}>
              📞 {content?.company?.phone || "0302 4001063"}
            </a>
            <a
              href={`https://wa.me/${whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp Direct ↗
            </a>
            <a href={`mailto:${content?.company?.email || "info@tsptensile.pk"}`}>
              ✉️ {content?.company?.email || "info@tsptensile.pk"}
            </a>
            <span style={{ fontSize: "12px", lineHeight: "1.5", marginTop: "4px", display: "block", color: "var(--ink-soft)" }}>
              DHA · Bahria Town · Gulberg · F-6/F-7 · Clifton · Nationwide Service
            </span>
          </div>
          <div>
            <span className="footer-label">Company & Legal</span>
            <Link href="/about">About TSP Tensile</Link>
            <Link href="/about/ceo">About the CEO</Link>
            <Link href="/company-profile" style={{ color: "#F59E0B", fontWeight: 700 }}>
              🌟 Corporate Profile (Dossier)
            </Link>
            <a
              href="/TSP_Tensile_Structures_Company_Profile.pdf"
              download="TSP_Tensile_Structures_Company_Profile.pdf"
              style={{ color: "#F59E0B", fontWeight: 700 }}
              title="Download official company profile PDF"
            >
              📄 Download Profile (PDF 8.7MB) ⬇
            </a>
            <Link href="/calculator" style={{ color: "#F59E0B", fontWeight: 700 }}>📐 Cost Calculator (تخمینہ) ↗</Link>
            <Link href="/app" style={{ color: "var(--sage)", fontWeight: 700 }}>📱 Download Mobile App ↗</Link>
            <Link href="/engineering">Structural Engineering</Link>
            <Link href="/process">Installation Process</Link>
            <Link href="/faq">FAQs & Pricing</Link>
            <Link href="/contact">Free Site Survey</Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} {content?.company?.name || "TSP Tensile Structures"}. All rights reserved. Pakistan's #1 Tensile Shade Manufacturer.</span>
          <span>Lahore · Islamabad · Rawalpindi · Karachi · Nationwide</span>
        </div>
      </footer>

      {/* ── Mobile App Bottom Bar (Native Mobile App Experience) ── */}
      {content.appSettings?.showAppFloatingBanner !== false && (
        <nav
          className="mobile-bottom-app-bar"
          aria-label="Mobile App Navigation"
        >
          <Link href="/" className={location === "/" ? "active" : ""}>
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link href="/calculator" className={location === "/calculator" ? "active" : ""}>
            <Calculator size={18} />
            <span>Calculator</span>
          </Link>
          <Link href="/projects" className={location === "/projects" ? "active" : ""}>
            <Layers size={18} />
            <span>Projects</span>
          </Link>
          <button type="button" onClick={() => setAppModalOpen(true)}>
            <Smartphone size={18} style={{ color: "#F59E0B" }} />
            <span style={{ color: "#F59E0B" }}>App</span>
          </button>
          <a
            href={`https://wa.me/${whatsappRaw}?text=Hello%20TSP%20Tensile,%20I'd%20like%20to%20inquire%20about%20a%20tensile%20structure.`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} style={{ color: "#25D366" }} />
            <span>WhatsApp</span>
          </a>
        </nav>
      )}

      {/* ── Download App Modal ── */}
      <DownloadAppModal
        isOpen={appModalOpen}
        onClose={() => setAppModalOpen(false)}
        onOpenCalculator={() => navigate("/calculator")}
      />

      {/* ── Quote panel ── */}
      <AnimatePresence>
        {quoteOpen && <QuotePanel onClose={() => setQuoteOpen(false)} />}
      </AnimatePresence>

      {/* ── Floating WhatsApp Action ── */}
      <FloatingWhatsAppButton />

      {/* ── Gemini AI Assistant Widget ── */}
      <AiAssistant />
    </div>
  );
}

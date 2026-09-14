import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X, MessageCircle } from "lucide-react";
import { ScrollProgress } from "@/components/ScrollProgress";
import { QuotePanel } from "@/components/QuotePanel";
import { AiAssistant } from "@/components/AiAssistant";
import { SocialIconsRow, FloatingWhatsAppButton } from "@/components/SocialIcons";
import { useContent } from "@/contexts/ContentContext";

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
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/solutions", label: "Solutions" },
  { href: "/process", label: "Process" },
  { href: "/engineering", label: "Engineering" },
  { href: "/about/ceo", label: "CEO Message" },
  { href: "/contact", label: "Contact" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { content } = useContent();
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

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
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "10px 0 2px",
                  fontSize: "12px",
                  color: "var(--ink-soft)",
                  borderTop: "1px dashed var(--line)",
                  marginTop: "6px",
                  fontWeight: 600
                }}
              >
                🔒 Admin Portal Login
              </Link>
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
            <span className="footer-label">Explore</span>
            <Link href="/solutions">Solutions</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/process">Process</Link>
            <Link href="/engineering">Engineering</Link>
            <Link href="/about">About</Link>
          </div>
          <div>
            <span className="footer-label">Contact</span>
            <a href={`mailto:${content?.company?.email || "info@tsptensile.pk"}`}>
              {content?.company?.email || "info@tsptensile.pk"}
            </a>
            <a href={`tel:${(content?.company?.phone || "0302 4001063").replace(/\s+/g, "")}`}>
              {content?.company?.phone || "0302 4001063"}
            </a>
            <a
              href={`https://wa.me/${whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp ↗
            </a>
            <span>
              {content?.offices?.length
                ? content.offices.map((o) => o.city).join(" · ")
                : "Lahore · Islamabad · Rawalpindi"}
            </span>
          </div>
          <div>
            <span className="footer-label">Company</span>
            <Link href="/about">About TSP Tensile</Link>
            <Link href="/about/ceo">About the CEO</Link>
            <Link href="/faq">FAQs</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/admin" style={{ opacity: 0.6, fontSize: "12px", letterSpacing: "0.04em", marginTop: "4px" }}>
              Admin Portal ↗
            </Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} {content?.company?.name || "TSP Tensile Structures"}. All rights reserved.</span>
          <span>Engineered for Pakistan's Climate & Built to Last.</span>
        </div>
      </footer>

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

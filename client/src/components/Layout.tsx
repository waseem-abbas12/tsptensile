import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X, MessageCircle } from "lucide-react";
import { ScrollProgress } from "@/components/ScrollProgress";
import { QuotePanel } from "@/components/QuotePanel";
import { AiAssistant } from "@/components/AiAssistant";
import { useContent } from "@/contexts/ContentContext";

function BrandMark({ className }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ display: "inline-block", flexShrink: 0 }}>
      <path d="M4 26L16 6L28 26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 6V26" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      <path d="M10 18C14 15 18 15 22 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/projects", label: "Projects" },
  { href: "/process", label: "Process" },
  { href: "/engineering", label: "Engineering" },
  { href: "/about", label: "About" },
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

  const whatsappRaw = (content?.company?.whatsapp || "923001234567").replace(/[^0-9]/g, "");

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

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navLinks.slice(1).map((link) => (
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
            <a
              href={`https://wa.me/${whatsappRaw}?text=Hello%20TSP%20Tensile,%20I'd%20like%20to%20inquire%20about%20a%20tensile%20structure.`}
              target="_blank"
              rel="noopener noreferrer"
              className="header-wa-btn"
              title="Chat directly on WhatsApp"
            >
              <MessageCircle size={15} />
              <span>WhatsApp</span>
            </a>

            <button className="header-cta" onClick={() => setQuoteOpen(true)}>
              Get a quote <ArrowUpRight size={15} />
            </button>

            <button
              className="mobile-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
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
            <a href={`tel:${(content?.company?.phone || "+92 300 1234567").replace(/\s+/g, "")}`}>
              {content?.company?.phone || "+92 300 1234567"}
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

      {/* ── Gemini AI Assistant Widget ── */}
      <AiAssistant />
    </div>
  );
}

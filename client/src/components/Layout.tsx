import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ScrollProgress } from "@/components/ScrollProgress";
import { QuotePanel } from "@/components/QuotePanel";

const images = { mark: "/manus-storage/tensile-mark_1a7db8b0.png" };

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0); }, [location]);

  return (
    <div className="site-shell">
      <ScrollProgress />

      {/* ── Header ── */}
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="header-inner">
          <Link href="/" className="brand" aria-label="Form/Field home">
            <img src={images.mark} alt="" />
            <span>FORM<span className="brand-light">/</span>FIELD</span>
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

          <button className="header-cta" onClick={() => setQuoteOpen(true)}>
            Get a quote <ArrowUpRight size={16} />
          </button>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-nav">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>{link.label}</Link>
            ))}
            <button className="button button-solid" onClick={() => { setMenuOpen(false); setQuoteOpen(true); }}>
              Get a quote <ArrowUpRight size={16} />
            </button>
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
              <img src={images.mark} alt="" />
              <span>FORM<span className="brand-light">/</span>FIELD</span>
            </Link>
            <p>Custom tensile architecture for warmer, more useful spaces.</p>
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
            <a href="mailto:hello@formfield.pk">hello@formfield.pk</a>
            <a href="tel:+923001234567">+92 300 1234567</a>
            <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
            <span>Lahore · Islamabad · Rawalpindi</span>
          </div>
          <div>
            <span className="footer-label">Company</span>
            <Link href="/about">About Form/Field</Link>
            <Link href="/about/ceo">About the CEO</Link>
            <Link href="/faq">FAQs</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Form/Field Structures</span>
          <span>Designed around the site.</span>
        </div>
      </footer>

      {/* ── Quote panel ── */}
      <AnimatePresence>
        {quoteOpen && <QuotePanel onClose={() => setQuoteOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Smartphone,
  Download,
  Calculator,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Share2,
  ArrowRight,
  MessageCircle,
  Eye,
  Zap,
  Globe
} from "lucide-react";
import { usePwaInstall } from "@/hooks/usePwaInstall";
import { useSEO } from "@/hooks/useSEO";
import { useContent } from "@/contexts/ContentContext";

export default function MobileAppPage() {
  const { canInstall, isInstalled, isIos, promptInstall } = usePwaInstall();
  const { content } = useContent();

  useSEO({
    title: "Download TSP Tensile Mobile App | Progressive Web App Pakistan",
    description: "Install the official TSP Tensile Structures Pakistan mobile app. Instant tensile structure cost estimation calculator, 2.4x fabric loupe zoom and offline portfolio.",
    path: "/app"
  });

  const [installStatus, setInstallStatus] = useState<string | null>(null);

  const handleInstall = async () => {
    if (canInstall) {
      const res = await promptInstall();
      if (res === "accepted") {
        setInstallStatus("installed");
      }
    }
  };

  const whatsappRaw = (content?.company?.whatsapp || "923024001063").replace(/[^0-9]/g, "");

  return (
    <div className="mobile-app-page" style={{ background: "var(--paper)", minHeight: "100vh", paddingBottom: "100px" }}>
      {/* ── Hero Section ── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0E2A38 0%, #163C50 60%, #1D4C66 100%)",
          color: "#FFFFFF",
          padding: "135px 0 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "45px", alignItems: "center" }} className="app-hero-grid">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(245, 158, 11, 0.2)", border: "1px solid rgba(245, 158, 11, 0.4)", padding: "5px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, color: "#FDE68A", marginBottom: "16px" }}>
                <Smartphone size={14} /> OFFICIAL MOBILE APP · آفیشل موبائل ایپ
              </div>

              <h1 style={{ fontSize: "clamp(34px, 5.2vw, 56px)", fontFamily: "var(--serif)", fontWeight: 500, lineHeight: 1.15, margin: "0 0 18px", color: "#FFFFFF" }}>
                TSP Tensile Structures in Your Pocket
              </h1>

              <p style={{ fontSize: "16.5px", color: "rgba(255, 255, 255, 0.85)", lineHeight: 1.65, margin: "0 0 28px", maxWidth: "600px" }}>
                Install the complete TSP Tensile mobile app on your Android or iPhone. Fast, lightweight, works offline, and includes the live Tensile Cost Estimation Calculator.
              </p>

              {/* Action Buttons */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center", marginBottom: "24px" }}>
                {isInstalled || installStatus === "installed" ? (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#10B981", color: "#FFFFFF", padding: "12px 24px", borderRadius: "100px", fontWeight: 700, fontSize: "14px" }}>
                    <CheckCircle2 size={18} />
                    <span>App Installed on this Device ✓</span>
                  </div>
                ) : isIos ? (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#FFFFFF", color: "#0E2A38", padding: "12px 22px", borderRadius: "100px", fontWeight: 700, fontSize: "13.5px" }}>
                    <Share2 size={16} style={{ color: "#2563EB" }} />
                    <span>Tap Safari Share (⎋) &gt; Add to Home Screen</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleInstall}
                    style={{
                      background: "#F59E0B",
                      color: "#0F172A",
                      border: "none",
                      padding: "14px 28px",
                      borderRadius: "100px",
                      fontWeight: 800,
                      fontSize: "15px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                      boxShadow: "0 10px 30px rgba(245, 158, 11, 0.35)",
                      transition: "transform 0.15s ease",
                    }}
                  >
                    <Download size={18} />
                    <span>Install App on Phone (ایپ انسٹال کریں)</span>
                  </button>
                )}

                <Link
                  href="/calculator"
                  style={{
                    background: "rgba(255, 255, 255, 0.12)",
                    color: "#FFFFFF",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    padding: "13px 24px",
                    borderRadius: "100px",
                    fontWeight: 600,
                    fontSize: "14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none",
                  }}
                >
                  <Calculator size={16} />
                  <span>Open Estimation Calculator</span>
                </Link>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", fontSize: "12.5px", color: "var(--sage)" }}>
                <span>✓ 0 MB Storage Footprint</span>
                <span>✓ Instant Updates</span>
                <span>✓ Zero Ads or Logins</span>
              </div>
            </div>

            {/* Visual Phone Mockup Card */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: "280px",
                  height: "520px",
                  background: "#08161E",
                  borderRadius: "36px",
                  border: "5px solid #234A5F",
                  boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0,0,0,0.8)",
                  padding: "14px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Notch */}
                <div style={{ width: "90px", height: "14px", background: "#234A5F", borderRadius: "10px", margin: "0 auto 12px" }} />

                {/* Mockup Screen Content */}
                <div style={{ flex: 1, background: "#FFFFFF", borderRadius: "22px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  {/* Top Bar */}
                  <div style={{ background: "#0E2A38", color: "#FFFFFF", padding: "12px 14px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "18px", height: "18px", borderRadius: "4px", background: "#F59E0B" }} />
                    <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em" }}>TSP TENSILE</span>
                  </div>

                  {/* Calculator Widget Preview */}
                  <div style={{ padding: "12px", flex: 1, background: "#F8FAFC", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ background: "#FFFFFF", padding: "10px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                      <span style={{ fontSize: "9px", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>Cost Calculator</span>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0E2A38", margin: "2px 0" }}>2-Car Cantilever Shade</div>
                      <div style={{ fontSize: "11px", color: "#10B981", fontWeight: 700 }}>PKR 245,000 – 270,000</div>
                    </div>

                    <div style={{ background: "#FFFFFF", padding: "8px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                      <span style={{ fontSize: "9px", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>Fabric Loupe</span>
                      <div style={{ fontSize: "11px", color: "#0F172A" }}>🔍 2.4x High-Definition Zoom</div>
                    </div>

                    <div style={{ background: "#FFFFFF", padding: "8px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                      <span style={{ fontSize: "9px", color: "#64748B", textTransform: "uppercase", fontWeight: 700 }}>Nationwide Desk</span>
                      <div style={{ fontSize: "11px", color: "#0F172A" }}>Lahore · Islamabad · Karachi</div>
                    </div>

                    <div style={{ marginTop: "auto", background: "#25D366", color: "#FFFFFF", padding: "8px", borderRadius: "8px", textAlign: "center", fontSize: "11px", fontWeight: 700 }}>
                      💬 Chat on WhatsApp
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key App Features Grid ── */}
      <section className="container" style={{ marginTop: "70px" }}>
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 45px" }}>
          <span className="eyebrow" style={{ color: "var(--teal)" }}>EVERYTHING AT YOUR FINGERTIPS</span>
          <h2 style={{ fontSize: "34px", fontFamily: "var(--serif)", margin: "6px 0 14px" }}>
            Why Install the TSP Tensile Mobile App?
          </h2>
          <p style={{ color: "var(--ink-soft)", fontSize: "15px", margin: 0 }}>
            Enjoy the full desktop capabilities optimized for smooth one-hand mobile use.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          <div style={{ background: "#FFFFFF", padding: "28px", borderRadius: "14px", border: "1px solid var(--line)" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(45, 106, 104, 0.12)", color: "#2D6A68", display: "grid", placeItems: "center", marginBottom: "16px" }}>
              <Calculator size={22} />
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 10px" }}>
              Tensile Estimation Calculator
            </h3>
            <p style={{ color: "var(--ink-soft)", fontSize: "13.5px", lineHeight: 1.6, margin: 0 }}>
              Quickly calculate custom prices for car parking shades and canopies in Pakistani Rupees. Select fabric type, structural finish, and city for instantaneous estimates.
            </p>
          </div>

          <div style={{ background: "#FFFFFF", padding: "28px", borderRadius: "14px", border: "1px solid var(--line)" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(245, 158, 11, 0.15)", color: "#D97706", display: "grid", placeItems: "center", marginBottom: "16px" }}>
              <Eye size={22} />
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 10px" }}>
              2.4x Pan &amp; Zoom Loupe
            </h3>
            <p style={{ color: "var(--ink-soft)", fontSize: "13.5px", lineHeight: 1.6, margin: 0 }}>
              Touch and pan across architectural structure photos on your mobile phone to inspect PVC seams, cable terminations, and steel clamps in extreme HD clarity.
            </p>
          </div>

          <div style={{ background: "#FFFFFF", padding: "28px", borderRadius: "14px", border: "1px solid var(--line)" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(37, 211, 102, 0.14)", color: "#16A34A", display: "grid", placeItems: "center", marginBottom: "16px" }}>
              <MessageCircle size={22} />
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 10px" }}>
              1-Tap WhatsApp Engineering Desk
            </h3>
            <p style={{ color: "var(--ink-soft)", fontSize: "13.5px", lineHeight: 1.6, margin: 0 }}>
              Send photos of your house porch or commercial plot directly to our engineers to receive free laser site survey booking and 3D concept renders.
            </p>
          </div>

          <div style={{ background: "#FFFFFF", padding: "28px", borderRadius: "14px", border: "1px solid var(--line)" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(30, 64, 175, 0.12)", color: "#1E40AF", display: "grid", placeItems: "center", marginBottom: "16px" }}>
              <Zap size={22} />
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 10px" }}>
              Lightning Fast &amp; Offline Ready
            </h3>
            <p style={{ color: "var(--ink-soft)", fontSize: "13.5px", lineHeight: 1.6, margin: 0 }}>
              Built using cutting-edge Progressive Web App (PWA) architecture. Opens smoothly even on slow mobile data connections without consuming device storage.
            </p>
          </div>
        </div>
      </section>

      {/* ── Step-by-Step Installation Guides ── */}
      <section className="container" style={{ marginTop: "75px" }}>
        <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "36px", border: "1px solid var(--line)" }}>
          <h2 style={{ fontSize: "26px", fontFamily: "var(--serif)", margin: "0 0 24px" }}>
            Easy Installation Instructions (آسان طریقہ کار)
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }} className="app-install-guides-grid">
            {/* Android Guide */}
            <div style={{ background: "var(--paper)", padding: "24px", borderRadius: "12px", border: "1px solid var(--line)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "16px", color: "var(--ink)", marginBottom: "12px" }}>
                <Smartphone size={20} style={{ color: "#10B981" }} />
                <span>Android Phones (Google Chrome / Samsung Internet)</span>
              </div>
              <ol style={{ margin: 0, paddingLeft: "20px", fontSize: "13.5px", color: "var(--ink-soft)", lineHeight: 1.7 }}>
                <li>Open <strong>tsptensile.com</strong> in Google Chrome.</li>
                <li>Tap the <strong>&quot;Install App on Phone&quot;</strong> button above, OR tap the <strong>three dots (⋮)</strong> at top right.</li>
                <li>Select <strong>&quot;Install App&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.</li>
                <li>The TSP Tensile icon will appear on your application drawer and home screen.</li>
              </ol>
            </div>

            {/* iOS Guide */}
            <div style={{ background: "var(--paper)", padding: "24px", borderRadius: "12px", border: "1px solid var(--line)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "16px", color: "var(--ink)", marginBottom: "12px" }}>
                <Share2 size={20} style={{ color: "#2563EB" }} />
                <span>iPhone &amp; iPad (Apple Safari)</span>
              </div>
              <ol style={{ margin: 0, paddingLeft: "20px", fontSize: "13.5px", color: "var(--ink-soft)", lineHeight: 1.7 }}>
                <li>Open <strong>tsptensile.com</strong> in Safari.</li>
                <li>Tap the <strong>Share icon (⎋)</strong> (the square with arrow pointing up) at bottom bar.</li>
                <li>Scroll down and tap <strong>&quot;Add to Home Screen&quot; (⊞)</strong>.</li>
                <li>Tap <strong>&quot;Add&quot;</strong> in the top-right corner. Done!</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

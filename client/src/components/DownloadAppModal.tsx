import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Download, CheckCircle2, Share2, Sparkles, ShieldCheck, ArrowRight, Calculator } from "lucide-react";
import { usePwaInstall } from "@/hooks/usePwaInstall";

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCalculator?: () => void;
}

export function DownloadAppModal({ isOpen, onClose, onOpenCalculator }: DownloadAppModalProps) {
  const { canInstall, isInstalled, isIos, isAndroid, promptInstall } = usePwaInstall();

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (canInstall) {
      const result = await promptInstall();
      if (result === "accepted") {
        onClose();
      }
    }
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          display: "grid",
          placeItems: "center",
          padding: "16px",
          background: "rgba(10, 20, 30, 0.75)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            maxWidth: "480px",
            width: "100%",
            boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.08)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Header Gradient Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, #0E2A38 0%, #173E52 50%, #20536E 100%)",
              color: "#FFFFFF",
              padding: "28px 24px 22px",
              position: "relative",
            }}
          >
            <button
              onClick={onClose}
              aria-label="Close modal"
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "rgba(255, 255, 255, 0.15)",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "grid",
                placeItems: "center",
                color: "#FFFFFF",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "14px",
                  background: "#0E2A38",
                  border: "2px solid rgba(255, 255, 255, 0.25)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
                  <path d="M6 29 C12 18, 16 12, 18 5 C17 14, 13 23, 6 29 Z" fill="#F59E0B" />
                  <path d="M30 29 C24 18, 20 12, 18 5 C19 14, 23 23, 30 29 Z" fill="#D97706" opacity="0.9" />
                  <path d="M8 28 C13 23, 23 23, 28 28 C22 25, 14 25, 8 28 Z" fill="#FFFFFF" opacity="0.95" />
                  <line x1="18" y1="4" x2="18" y2="30" stroke="#FFFFFF" strokeWidth="1.8" />
                  <circle cx="18" cy="4" r="1.5" fill="#FBBF24" />
                </svg>
              </div>

              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(245, 158, 11, 0.2)", border: "1px solid rgba(245, 158, 11, 0.4)", padding: "2px 8px", borderRadius: "100px", fontSize: "10.5px", fontWeight: 700, color: "#FDE68A", marginBottom: "4px" }}>
                  <Sparkles size={11} /> OFFICIAL APP
                </div>
                <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 700, letterSpacing: "-0.01em", color: "#FFFFFF" }}>
                  TSP Tensile Structures
                </h3>
                <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94A3B8" }}>
                  Pakistan&apos;s #1 Tensile Architecture Mobile App
                </p>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div style={{ padding: "22px 24px 24px" }}>
            {/* Status if already installed */}
            {isInstalled ? (
              <div
                style={{
                  background: "#ECFDF5",
                  border: "1px solid #A7F3D0",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "18px",
                }}
              >
                <CheckCircle2 size={22} style={{ color: "#059669", flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "13.5px", color: "#065F46" }}>
                    ایپ پہلے سے انسٹال ہے (App is Installed)
                  </div>
                  <div style={{ fontSize: "12px", color: "#047857" }}>
                    You are already using the official TSP Tensile mobile app on this device.
                  </div>
                </div>
              </div>
            ) : null}

            {/* Feature List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "22px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(45, 106, 104, 0.12)", color: "#2D6A68", display: "grid", placeItems: "center", flexShrink: 0, marginTop: "2px" }}>
                  <Calculator size={13} />
                </div>
                <div>
                  <strong style={{ fontSize: "13px", color: "#0F172A", display: "block" }}>
                    Live Estimation Calculator (تخمینہ کیلکولیٹر)
                  </strong>
                  <span style={{ fontSize: "12px", color: "#64748B" }}>
                    Calculate instant car parking & tensile structure costs in PKR.
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(245, 158, 11, 0.14)", color: "#D97706", display: "grid", placeItems: "center", flexShrink: 0, marginTop: "2px" }}>
                  <Sparkles size={13} />
                </div>
                <div>
                  <strong style={{ fontSize: "13px", color: "#0F172A", display: "block" }}>
                    2.4x Pan & Zoom Loupe & HD Fullscreen
                  </strong>
                  <span style={{ fontSize: "12px", color: "#64748B" }}>
                    Inspect fabric weave, PVC hot-air welds, and stainless steel joints up close.
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(37, 99, 235, 0.12)", color: "#2563EB", display: "grid", placeItems: "center", flexShrink: 0, marginTop: "2px" }}>
                  <ShieldCheck size={13} />
                </div>
                <div>
                  <strong style={{ fontSize: "13px", color: "#0F172A", display: "block" }}>
                    100% Free &amp; Lightweight (No Play Store required)
                  </strong>
                  <span style={{ fontSize: "12px", color: "#64748B" }}>
                    Instant install directly from browser. Takes 0 MB phone storage.
                  </span>
                </div>
              </div>
            </div>

            {/* Platform Specific Instructions */}
            {isIos ? (
              <div
                style={{
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: "14px",
                  padding: "16px",
                  marginBottom: "20px",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "13px", color: "#0F172A", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Share2 size={15} style={{ color: "#2563EB" }} /> How to Install on iPhone / iPad (iOS):
                </div>
                <ol style={{ margin: 0, paddingLeft: "18px", fontSize: "12.5px", color: "#334155", lineHeight: "1.6" }}>
                  <li>
                    Tap the <strong>Share button</strong> (<strong>⎋</strong> box with arrow) at the bottom of Safari.
                  </li>
                  <li>
                    Scroll down and tap <strong>&quot;Add to Home Screen&quot; (⊞)</strong>.
                  </li>
                  <li>
                    Tap <strong>Add</strong> on the top right. TSP Tensile will appear on your phone screen!
                  </li>
                </ol>
              </div>
            ) : canInstall ? (
              <button
                type="button"
                onClick={handleInstallClick}
                style={{
                  width: "100%",
                  background: "#0E2A38",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "12px",
                  padding: "14px 20px",
                  fontSize: "14.5px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(14, 42, 56, 0.25)",
                  transition: "all 0.2s ease",
                  marginBottom: "12px",
                }}
              >
                <Download size={18} />
                <span>Download &amp; Install App Now (ایپ انسٹال کریں)</span>
              </button>
            ) : (
              <div
                style={{
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: "14px",
                  padding: "16px",
                  marginBottom: "16px",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "13px", color: "#0F172A", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Smartphone size={16} style={{ color: "#2D6A68" }} /> Android &amp; Desktop Quick Install:
                </div>
                <p style={{ margin: 0, fontSize: "12.5px", color: "#475569", lineHeight: "1.55" }}>
                  Tap the browser menu <strong>(⋮ 3 vertical dots)</strong> at the top right of your screen and select <strong>&quot;Install App&quot;</strong> or <strong>&quot;Add to Home Screen&quot;</strong>.
                </p>
              </div>
            )}

            {/* Quick Link to Estimation Calculator */}
            {onOpenCalculator && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCalculator();
                }}
                style={{
                  width: "100%",
                  background: "transparent",
                  color: "#2D6A68",
                  border: "1px solid #2D6A68",
                  borderRadius: "12px",
                  padding: "11px 18px",
                  fontSize: "13px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <Calculator size={16} />
                <span>Open Tensile Estimation Calculator</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

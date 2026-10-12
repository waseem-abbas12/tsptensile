import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Smartphone,
  Download,
  CheckCircle2,
  Share2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Calculator,
  ExternalLink,
  Copy,
  AlertTriangle
} from "lucide-react";
import { usePwaInstall } from "@/hooks/usePwaInstall";

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCalculator?: () => void;
}

export function DownloadAppModal({ isOpen, onClose, onOpenCalculator }: DownloadAppModalProps) {
  const { canInstall, isInstalled, isIos, isAndroid, isInAppBrowser, openInChrome, promptInstall } = usePwaInstall();
  const [copied, setCopied] = useState(false);
  const [showAndroidGuide, setShowAndroidGuide] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (canInstall) {
      const result = await promptInstall();
      if (result === "accepted") {
        onClose();
      }
    } else if (isInAppBrowser) {
      openInChrome();
    } else {
      setShowAndroidGuide(true);
    }
  };

  const handleCopyLink = async () => {
    const url = window.location.origin + "/app";
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement("input");
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
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
            maxWidth: "490px",
            width: "100%",
            boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.08)",
            overflow: "hidden",
            position: "relative",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header Gradient Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, #0E2A38 0%, #173E52 50%, #20536E 100%)",
              color: "#FFFFFF",
              padding: "24px 22px 20px",
              position: "relative",
              flexShrink: 0,
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
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: "#0E2A38",
                  border: "2px solid rgba(255, 255, 255, 0.25)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                  <path d="M6 29 C12 18, 16 12, 18 5 C17 14, 13 23, 6 29 Z" fill="#F59E0B" />
                  <path d="M30 29 C24 18, 20 12, 18 5 C19 14, 23 23, 30 29 Z" fill="#D97706" opacity="0.9" />
                  <path d="M8 28 C13 23, 23 23, 28 28 C22 25, 14 25, 8 28 Z" fill="#FFFFFF" opacity="0.95" />
                  <line x1="18" y1="4" x2="18" y2="30" stroke="#FFFFFF" strokeWidth="1.8" />
                  <circle cx="18" cy="4" r="1.5" fill="#FBBF24" />
                </svg>
              </div>

              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(245, 158, 11, 0.2)", border: "1px solid rgba(245, 158, 11, 0.4)", padding: "2px 8px", borderRadius: "100px", fontSize: "10px", fontWeight: 700, color: "#FDE68A", marginBottom: "3px" }}>
                  <Sparkles size={11} /> OFFICIAL APP
                </div>
                <h3 style={{ margin: 0, fontSize: "19px", fontWeight: 700, letterSpacing: "-0.01em", color: "#FFFFFF" }}>
                  TSP Tensile Structures
                </h3>
                <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94A3B8" }}>
                  Pakistan&apos;s #1 Tensile Architecture Mobile App
                </p>
              </div>
            </div>
          </div>

          {/* Body Content - Scrollable if screen is small */}
          <div style={{ padding: "20px 22px 22px", overflowY: "auto", flex: 1 }}>
            {/* Status if already installed */}
            {isInstalled ? (
              <div
                style={{
                  background: "#ECFDF5",
                  border: "1px solid #A7F3D0",
                  borderRadius: "12px",
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "16px",
                }}
              >
                <CheckCircle2 size={20} style={{ color: "#059669", flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "13px", color: "#065F46" }}>
                    ایپ پہلے سے انسٹال ہے (App is Installed)
                  </div>
                  <div style={{ fontSize: "11.5px", color: "#047857" }}>
                    You are already running the TSP Tensile mobile app on your phone.
                  </div>
                </div>
              </div>
            ) : null}

            {/* In-App Browser Warning (WhatsApp / Messenger / Instagram) */}
            {isInAppBrowser && (
              <div
                style={{
                  background: "#FFFBEB",
                  border: "1.5px solid #FCD34D",
                  borderRadius: "14px",
                  padding: "14px 16px",
                  marginBottom: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <AlertTriangle size={20} style={{ color: "#D97706", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <strong style={{ fontSize: "13px", color: "#92400E", display: "block" }}>
                      ⚠️ واٹس ایپ کے اندر ایپ براہ راست ڈاؤنلوڈ نہیں ہوتی
                    </strong>
                    <p style={{ margin: "4px 0 10px", fontSize: "12px", color: "#78350F", lineHeight: "1.5" }}>
                      موبائل میں ایپ انسٹال کرنے کے لیے اسے گوگل کروم (Google Chrome) میں کھولیں۔
                    </p>
                    <button
                      type="button"
                      onClick={openInChrome}
                      style={{
                        background: "#0E2A38",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "10px",
                        padding: "10px 16px",
                        fontSize: "12.5px",
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(14, 42, 56, 0.2)",
                      }}
                    >
                      <ExternalLink size={14} />
                      <span>Google Chrome میں کھولیں (Open in Chrome)</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Feature List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "18px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(45, 106, 104, 0.12)", color: "#2D6A68", display: "grid", placeItems: "center", flexShrink: 0, marginTop: "2px" }}>
                  <Calculator size={13} />
                </div>
                <div>
                  <strong style={{ fontSize: "13px", color: "#0F172A", display: "block" }}>
                    Live Estimation Calculator (تخمینہ کیلکولیٹر)
                  </strong>
                  <span style={{ fontSize: "11.5px", color: "#64748B" }}>
                    Calculate instant car parking & tensile structure rates in PKR.
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
                  <span style={{ fontSize: "11.5px", color: "#64748B" }}>
                    Inspect fabric weave, PVC welds, and steel joints up close on your phone.
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(37, 99, 235, 0.12)", color: "#2563EB", display: "grid", placeItems: "center", flexShrink: 0, marginTop: "2px" }}>
                  <ShieldCheck size={13} />
                </div>
                <div>
                  <strong style={{ fontSize: "13px", color: "#0F172A", display: "block" }}>
                    100% Free · 0 MB Storage Footprint
                  </strong>
                  <span style={{ fontSize: "11.5px", color: "#64748B" }}>
                    Runs straight from your home screen with zero storage consumption.
                  </span>
                </div>
              </div>
            </div>

            {/* Platform Action Area */}
            {isIos ? (
              <div
                style={{
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: "14px",
                  padding: "16px",
                  marginBottom: "16px",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "13px", color: "#0F172A", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Share2 size={15} style={{ color: "#2563EB" }} /> iPhone / iPad پر انسٹال کرنے کا آسان طریقہ:
                </div>
                <ol style={{ margin: 0, paddingLeft: "18px", fontSize: "12px", color: "#334155", lineHeight: "1.65" }}>
                  <li>
                    سفاری براؤزر میں نیچے <strong>Share بٹن</strong> (<strong>⎋</strong> تیر والا باکس) پر کلک کریں۔
                  </li>
                  <li>
                    تھوڑا نیچے سکرول کر کے <strong>&quot;Add to Home Screen&quot; (⊞)</strong> دبائیں۔
                  </li>
                  <li>
                    اوپر دائیں طرف <strong>Add</strong> دبائیں—ایپ آپ کے فون میں آ جائے گی!
                  </li>
                </ol>
              </div>
            ) : canInstall ? (
              <button
                type="button"
                onClick={handleInstallClick}
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #0E2A38 0%, #1E4E68 100%)",
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
                <span>📲 1-Click Install App (ایپ انسٹال کریں)</span>
              </button>
            ) : (
              <div style={{ marginBottom: "16px" }}>
                {/* Visual Step-by-Step Box */}
                <div
                  style={{
                    background: "#F0FDF4",
                    border: "1.5px solid #86EFAC",
                    borderRadius: "14px",
                    padding: "16px",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: "13.5px", color: "#166534", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Smartphone size={16} style={{ color: "#16A34A" }} />
                    <span>Android فون پر انسٹال کرنے کے 2 آسان سٹیپس:</span>
                  </div>
                  <ol style={{ margin: 0, paddingLeft: "20px", fontSize: "12.5px", color: "#14532D", lineHeight: "1.7" }}>
                    <li>
                      اوپر دائیں کونے پر موجود <strong>3 ڈاٹس (⋮)</strong> مینو پر کلک کریں۔
                    </li>
                    <li>
                      مینو سے <strong>&quot;Install App&quot;</strong> یا <strong>&quot;Add to Home screen&quot;</strong> منتخب کریں۔
                    </li>
                    <li>
                      <strong>Install</strong> پر ٹیپ کریں۔ ایپ آپ کی موبائل اسکرین پر محفوظ ہو جائے گی!
                    </li>
                  </ol>
                </div>

                {/* Direct Action Buttons for Android & Desktop Fallback */}
                <div style={{ display: "grid", gridTemplateColumns: isAndroid ? "1fr 1fr" : "1fr", gap: "8px" }}>
                  {isAndroid && (
                    <button
                      type="button"
                      onClick={openInChrome}
                      style={{
                        background: "#0E2A38",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "10px",
                        padding: "11px 14px",
                        fontSize: "12.5px",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        cursor: "pointer",
                      }}
                    >
                      <ExternalLink size={14} />
                      <span>کروم میں کھولیں</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    style={{
                      background: copied ? "#ECFDF5" : "#F8FAFC",
                      color: copied ? "#059669" : "#334155",
                      border: "1px solid #CBD5E1",
                      borderRadius: "10px",
                      padding: "11px 14px",
                      fontSize: "12.5px",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      cursor: "pointer",
                    }}
                  >
                    {copied ? <CheckCircle2 size={15} /> : <Copy size={14} />}
                    <span>{copied ? "لنک کاپی ہو گیا! ✓" : "ایپ لنک کاپی کریں"}</span>
                  </button>
                </div>
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
                  marginTop: "6px",
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

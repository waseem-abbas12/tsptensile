import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

export interface ZoomableImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  style?: React.CSSProperties;
  zoomScale?: number;
  showExpandBtn?: boolean;
  badgeText?: string;
  priority?: boolean;
  aspectRatio?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

export function ZoomableImage({
  src,
  alt,
  caption,
  className = "",
  style,
  zoomScale = 2.4,
  showExpandBtn = true,
  badgeText,
  priority = false,
  aspectRatio,
  onError,
}: ZoomableImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // 1. Desktop Mouse Move (2.4x Pan & Zoom Loupe)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));
    setOrigin({ x, y });
    if (!isZoomed) setIsZoomed(true);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMouseMove(e);
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setOrigin({ x: 50, y: 50 });
  };

  // 2. Mobile Touch Move (Touch-to-Pan)
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length !== 1) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.min(100, Math.max(0, ((touch.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((touch.clientY - rect.top) / rect.height) * 100));
    setOrigin({ x, y });
    setIsZoomed(true);
  };

  const handleTouchEnd = () => {
    setIsZoomed(false);
    setOrigin({ x: 50, y: 50 });
  };

  return (
    <>
      <div
        ref={containerRef}
        className={`zoomable-image-container ${className}`}
        style={{
          position: "relative",
          overflow: "hidden",
          display: "block",
          cursor: isZoomed ? "crosshair" : "zoom-in",
          aspectRatio: aspectRatio,
          ...style,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchMove}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {/* Main Image with 2.4x Loupe Transform */}
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={onError}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: isZoomed ? `scale(${zoomScale})` : "scale(1)",
            transformOrigin: `${origin.x}% ${origin.y}%`,
            transition: isZoomed
              ? "transform-origin 0.05s ease-out, transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)"
              : "transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)",
            pointerEvents: "none",
            willChange: "transform, transform-origin",
          }}
        />

        {/* Desktop Loupe Active Indicator Badge */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="zoom-loupe-badge"
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                background: "rgba(15, 23, 42, 0.88)",
                backdropFilter: "blur(8px)",
                color: "#F8FAFC",
                padding: "5px 12px",
                borderRadius: "100px",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.04em",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              <span style={{ color: "#F59E0B" }}>🔍</span> {zoomScale}x Loupe
            </motion.div>
          )}
        </AnimatePresence>

        {/* Optional Custom Badge */}
        {badgeText && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "rgba(15, 23, 42, 0.82)",
              backdropFilter: "blur(6px)",
              color: "#F1F5F9",
              padding: "4px 10px",
              borderRadius: "4px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.05em",
              border: "1px solid rgba(255,255,255,0.15)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            {badgeText}
          </div>
        )}

        {/* 3. Floating Circular Expand Button (⛶) at Bottom-Right */}
        {showExpandBtn && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="zoom-expand-btn"
            title="Fullscreen HD View (⛶)"
            aria-label="Open Fullscreen HD Lightbox"
            style={{
              position: "absolute",
              right: "14px",
              bottom: "14px",
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "rgba(15, 23, 42, 0.82)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#FFFFFF",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.4)",
              transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease",
              zIndex: 15,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.15)";
              e.currentTarget.style.background = "rgba(45, 106, 104, 0.95)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = "rgba(15, 23, 42, 0.82)";
            }}
          >
            <Maximize2 size={18} strokeWidth={2.2} />
          </button>
        )}
      </div>

      {/* Fullscreen HD Lightbox Modal */}
      {isLightboxOpen && typeof document !== "undefined" &&
        createPortal(
          <FullscreenLightbox
            src={src}
            alt={alt}
            caption={caption || alt}
            onClose={() => setIsLightboxOpen(false)}
          />,
          document.body
        )}
    </>
  );
}

function FullscreenLightbox({
  src,
  alt,
  caption,
  onClose,
}: {
  src: string;
  alt: string;
  caption: string;
  onClose: () => void;
}) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") setScale((s) => Math.min(s + 0.5, 4));
      if (e.key === "-") setScale((s) => Math.max(s - 0.5, 1));
      if (e.key === "0") {
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const zoomIn = () => setScale((s) => Math.min(s + 0.6, 4));
  const zoomOut = () => {
    setScale((s) => {
      const next = Math.max(s - 0.6, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };
  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale((s) => Math.min(s + 0.3, 4));
    } else {
      setScale((s) => {
        const next = Math.max(s - 0.3, 1);
        if (next === 1) setPosition({ x: 0, y: 0 });
        return next;
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "rgba(3, 7, 18, 0.96)",
        backdropFilter: "blur(16px)",
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          background: "rgba(15, 23, 42, 0.65)",
          backdropFilter: "blur(12px)",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              background: "rgba(245, 158, 11, 0.2)",
              color: "#FBBF24",
              padding: "4px 10px",
              borderRadius: "100px",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              flexShrink: 0,
            }}
          >
            HD Viewer
          </span>
          <h4
            style={{
              margin: 0,
              fontSize: "14px",
              color: "#FFFFFF",
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "480px",
            }}
          >
            {caption}
          </h4>
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255, 255, 255, 0.08)",
              borderRadius: "8px",
              padding: "2px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            <button
              type="button"
              onClick={zoomOut}
              disabled={scale <= 1}
              style={{
                background: "none",
                border: 0,
                color: scale <= 1 ? "rgba(255,255,255,0.3)" : "#FFFFFF",
                padding: "7px 10px",
                cursor: scale <= 1 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
              }}
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>
            <span
              style={{
                color: "#F8FAFC",
                fontSize: "12px",
                fontWeight: 600,
                padding: "0 6px",
                minWidth: "45px",
                textAlign: "center",
              }}
            >
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={zoomIn}
              disabled={scale >= 4}
              style={{
                background: "none",
                border: 0,
                color: scale >= 4 ? "rgba(255,255,255,0.3)" : "#FFFFFF",
                padding: "7px 10px",
                cursor: scale >= 4 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
              }}
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </button>
            {scale > 1 && (
              <button
                type="button"
                onClick={resetZoom}
                style={{
                  background: "none",
                  border: 0,
                  color: "#F59E0B",
                  padding: "7px 10px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  borderLeft: "1px solid rgba(255,255,255,0.12)",
                }}
                title="Reset"
              >
                <RotateCcw size={15} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              color: "#FCA5A5",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              transition: "background 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.35)";
              e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)";
              e.currentTarget.style.color = "#FCA5A5";
            }}
            title="Close"
            aria-label="Close Lightbox"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* Main Center Viewport */}
      <div
        style={{
          flex: 1,
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
          position: "relative",
          cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <motion.img
          src={src}
          alt={alt}
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
          style={{
            maxWidth: "92vw",
            maxHeight: "80vh",
            objectFit: "contain",
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? "none" : "transform 0.2s ease-out",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
            borderRadius: "6px",
            pointerEvents: scale > 1 ? "auto" : "none",
          }}
          draggable={false}
        />
      </div>

      {/* Bottom Tip Bar */}
      <div
        style={{
          padding: "12px 24px",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "18px",
          color: "rgba(255, 255, 255, 0.55)",
          fontSize: "12px",
          background: "rgba(15, 23, 42, 0.4)",
        }}
      >
        <span>💡 Use mouse wheel or controls to zoom up to 400%</span>
        <span>•</span>
        <span>Drag to pan across fabric weave details</span>
        <span>•</span>
        <span>Press <kbd style={{ background: "rgba(255,255,255,0.12)", padding: "2px 6px", borderRadius: "4px", color: "white" }}>Esc</kbd> to exit</span>
      </div>
    </motion.div>
  );
}

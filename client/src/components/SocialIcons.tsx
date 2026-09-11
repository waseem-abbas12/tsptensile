import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

export interface SocialLink {
  name: string;
  url: string;
  color: string;
  icon: (props: { size?: number }) => React.ReactNode;
}

export const SOCIAL_LINKS = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61556578018152",
    color: "#1877F2",
    svg: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/",
    color: "#E4405F",
    svg: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/",
    color: "#FF0000",
    svg: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/",
    color: "#0A66C2",
    svg: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/923481816618",
    color: "#25D366",
    svg: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.031 0C5.396 0 .029 5.367.029 12.002c0 2.119.553 4.187 1.603 6.007L0 24l6.168-1.618a11.966 11.966 0 0 0 5.863 1.524l.005.001c6.634 0 12.001-5.367 12.001-12.003A12.002 12.002 0 0 0 12.031 0zm.004 21.905h-.004a9.92 9.92 0 0 1-5.064-1.394l-.363-.216-3.761.986 1.003-3.666-.237-.377a9.94 9.94 0 0 1-1.526-5.236C2.083 6.527 6.545 2.065 12.035 2.065c2.662 0 5.165 1.036 7.046 2.92a9.914 9.914 0 0 1 2.916 7.042c-.001 5.492-4.464 9.878-9.962 9.878zm5.452-7.44c-.299-.15-1.77-.874-2.044-.974-.274-.1-.473-.15-.672.15-.2.299-.773.974-.948 1.173-.174.2-.349.225-.648.075-.299-.15-1.264-.466-2.408-1.485-.89-.794-1.49-1.774-1.665-2.073-.174-.299-.019-.461.13-.61.135-.134.299-.349.449-.523.15-.175.2-.299.3-.499.1-.2.05-.374-.025-.524-.075-.15-.672-1.62-.922-2.219-.243-.583-.49-.504-.672-.513l-.574-.01c-.2 0-.523.075-.797.374-.274.299-1.047 1.022-1.047 2.493 0 1.471 1.072 2.892 1.222 3.092.15.2 2.11 3.221 5.111 4.519.714.309 1.272.493 1.707.631.717.228 1.37.196 1.886.119.576-.086 1.77-.723 2.019-1.421.25-.698.25-1.296.175-1.421-.075-.125-.274-.2-.573-.349z"/>
      </svg>
    ),
  },
];

/** Footer or inline social media links */
export function SocialIconsRow({ className = "" }: { className?: string }) {
  return (
    <div className={`social-icons-row ${className}`} aria-label="Social media channels">
      {SOCIAL_LINKS.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-btn"
          title={`Follow us on ${item.name}`}
          aria-label={item.name}
          style={{ "--hover-color": item.color } as React.CSSProperties}
        >
          {item.svg}
        </a>
      ))}
    </div>
  );
}

/** Sticky floating WhatsApp action button (Bottom-right) */
export function FloatingWhatsAppButton() {
  const { content } = useContent();
  const whatsappRaw = (content?.company?.whatsapp || "923481816618").replace(/[^0-9]/g, "");

  return (
    <a
      href={`https://wa.me/${whatsappRaw}?text=Hello%20TSP%20Tensile,%20I'd%20like%20to%20get%20a%20quote%20for%20a%20tensile%20fabric%20structure.`}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-wa-btn"
      aria-label="Chat on WhatsApp"
      title="Chat with us directly on WhatsApp"
    >
      <div className="wa-icon-glow"></div>
      <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
        <path d="M12.031 0C5.396 0 .029 5.367.029 12.002c0 2.119.553 4.187 1.603 6.007L0 24l6.168-1.618a11.966 11.966 0 0 0 5.863 1.524l.005.001c6.634 0 12.001-5.367 12.001-12.003A12.002 12.002 0 0 0 12.031 0zm.004 21.905h-.004a9.92 9.92 0 0 1-5.064-1.394l-.363-.216-3.761.986 1.003-3.666-.237-.377a9.94 9.94 0 0 1-1.526-5.236C2.083 6.527 6.545 2.065 12.035 2.065c2.662 0 5.165 1.036 7.046 2.92a9.914 9.914 0 0 1 2.916 7.042c-.001 5.492-4.464 9.878-9.962 9.878zm5.452-7.44c-.299-.15-1.77-.874-2.044-.974-.274-.1-.473-.15-.672.15-.2.299-.773.974-.948 1.173-.174.2-.349.225-.648.075-.299-.15-1.264-.466-2.408-1.485-.89-.794-1.49-1.774-1.665-2.073-.174-.299-.019-.461.13-.61.135-.134.299-.349.449-.523.15-.175.2-.299.3-.499.1-.2.05-.374-.025-.524-.075-.15-.672-1.62-.922-2.219-.243-.583-.49-.504-.672-.513l-.574-.01c-.2 0-.523.075-.797.374-.274.299-1.047 1.022-1.047 2.493 0 1.471 1.072 2.892 1.222 3.092.15.2 2.11 3.221 5.111 4.519.714.309 1.272.493 1.707.631.717.228 1.37.196 1.886.119.576-.086 1.77-.723 2.019-1.421.25-.698.25-1.296.175-1.421-.075-.125-.274-.2-.573-.349z"/>
      </svg>
      <span className="wa-tooltip">Chat with us</span>
    </a>
  );
}

/** Floating Vertical Follow Bar (like in hero reference) */
export function HeroVerticalSocials() {
  return (
    <div className="hero-vertical-socials" aria-hidden="true">
      <span className="vertical-socials-label">FOLLOW US</span>
      <div className="vertical-socials-line"></div>
      <div className="vertical-socials-icons">
        {SOCIAL_LINKS.slice(0, 4).map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
            aria-label={item.name}
          >
            {item.svg}
          </a>
        ))}
      </div>
    </div>
  );
}

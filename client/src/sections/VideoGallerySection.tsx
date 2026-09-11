import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Shield, Wind, Sparkles } from "lucide-react";
import { useScrollAnimation, staggerContainer, fadeUp } from "@/hooks/useScrollAnimation";

interface VideoItem {
  id: string;
  title: string;
  category: string;
  location: string;
  poster: string;
  videoUrl: string;
  duration: string;
  feature: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: "v1",
    title: "Cantilever Parking Shade · Wind Load & Rain Runoff Test",
    category: "Car Parking Shade",
    location: "DHA Phase 6, Lahore",
    poster: "/images/luxury_car_parking.jpg",
    videoUrl: "https://m-a-tensile.vercel.app/assets/imgs/M.ATensil/videos/vedio1.mp4",
    duration: "0:45",
    feature: "140 km/h Wind Certified",
  },
  {
    id: "v2",
    title: "Luxury Swimming Pool Tensile Membrane Installation",
    category: "Pool Shade Structure",
    location: "Bahria Town, Islamabad",
    poster: "/images/luxury_pool.jpg",
    videoUrl: "https://m-a-tensile.vercel.app/assets/imgs/M.ATensil/videos/vedio2.mp4",
    duration: "0:38",
    feature: "100% UV & Heat Block",
  },
  {
    id: "v3",
    title: "Commercial Architectural Canopy · Membrane Tensioning",
    category: "Commercial Plaza",
    location: "Gulberg III, Lahore",
    poster: "/images/hero_canopy.jpg",
    videoUrl: "https://m-a-tensile.vercel.app/assets/imgs/M.ATensil/videos/vedio3.mp4",
    duration: "0:52",
    feature: "Zero-Rust Grade 316 Rigging",
  },
];

export function VideoGallerySection() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const { ref, isInView } = useScrollAnimation({ amount: 0.15 });

  return (
    <section className="video-gallery-section" id="videos" ref={ref}>
      <div className="container">
        <motion.div
          className="section-heading-row"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp}>
            <p className="eyebrow">Real Fabric Performance</p>
            <h2>Watch our shade projects in motion.</h2>
          </motion.div>
          <motion.p className="heading-note" variants={fadeUp}>
            See real tensile membrane tensioning, wind deflection resistance, and clean runoff engineering recorded across live site installations.
          </motion.p>
        </motion.div>

        <div className="video-grid">
          {VIDEOS.map((item, idx) => (
            <motion.div
              key={item.id}
              className="video-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              onClick={() => setActiveVideo(item)}
            >
              <div className="video-thumb-wrap">
                <img
                  src={item.poster}
                  alt={item.title}
                  className="video-poster-img"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/hero.jpg";
                  }}
                />
                <div className="video-overlay-gradient"></div>

                {/* Play Button Badge */}
                <div className="video-play-badge">
                  <Play size={22} fill="white" className="play-icon" />
                </div>

                <div className="video-thumb-top">
                  <span className="video-cat-tag">{item.category}</span>
                  <span className="video-dur-tag">{item.duration}</span>
                </div>

                <div className="video-thumb-bottom">
                  <div className="video-feature-pill">
                    <Shield size={12} />
                    <span>{item.feature}</span>
                  </div>
                </div>
              </div>

              <div className="video-card-info">
                <h3>{item.title}</h3>
                <span className="video-location">{item.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {activeVideo && (
          <div className="video-modal-backdrop" onClick={() => setActiveVideo(null)}>
            <motion.div
              className="video-modal-dialog"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="video-modal-header">
                <div>
                  <span className="modal-cat">{activeVideo.category} · {activeVideo.location}</span>
                  <h4>{activeVideo.title}</h4>
                </div>
                <button
                  className="video-modal-close"
                  onClick={() => setActiveVideo(null)}
                  aria-label="Close video"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="video-player-frame">
                <video
                  src={activeVideo.videoUrl}
                  poster={activeVideo.poster}
                  controls
                  autoPlay
                  playsInline
                  className="modal-video-element"
                >
                  Your browser does not support HTML video.
                </video>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

import { useState, useRef } from "react";
import { Link } from "wouter";
import { ArrowUpRight, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

interface ProjectsMarqueeProps {
  onQuoteOpen: () => void;
}

export function ProjectsMarquee({ onQuoteOpen }: ProjectsMarqueeProps) {
  const { content } = useContent();
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const projects = content?.projects?.length ? content.projects : [];

  // Duplicate the list 3 times so the marquee is infinitely smooth and seamless
  const repeatedProjects = [...projects, ...projects, ...projects];

  return (
    <section className="projects-marquee-section" id="projects-marquee" aria-label="Our Latest Shade Projects">
      <div className="container">
        <div className="projects-marquee-heading-row">
          <div>
            <p className="eyebrow">Our Portfolio</p>
            <h2 className="section-title">Our Latest Shade Projects</h2>
          </div>
          <div className="projects-marquee-actions">
            <Link href="/projects" className="primary-outline-btn">
              All Projects &nbsp; <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Full-width Infinite Project Cards Marquee Track */}
      <div
        className="projects-marquee-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={trackRef}
          className={`projects-marquee-track ${isPaused ? "paused" : ""}`}
        >
          {repeatedProjects.map((project, idx) => (
            <article
              key={`${project.id || project.title}-${idx}`}
              className="project-marquee-card"
              onClick={onQuoteOpen}
              title={`Inquire about ${project.title}`}
            >
              <div className="project-marquee-img-wrap">
                <img
                  src={project.image || "/images/hero.jpg"}
                  alt={project.title}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/hero.jpg";
                  }}
                />
                <div className="project-marquee-gradient"></div>

                {/* Top Badge */}
                <div className="project-marquee-top-badge">
                  <span className="project-cat-pill">
                    {project.type || "Tensile Shade"} Project
                  </span>
                  <span className="project-city-pill">{project.city || "Pakistan"}</span>
                </div>

                {/* Floating Bottom Card Content */}
                <div className="project-marquee-content-box">
                  <div className="project-marquee-meta">
                    <span className="project-system-text">{project.system || "Membrane Architecture"}</span>
                    <h3 className="project-title-text">{project.title}</h3>
                  </div>
                  <div className="project-marquee-arrow-btn" aria-hidden="true">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Helper caption */}
      <div className="container projects-marquee-footer">
        <div className="marquee-hint">
          <span className="hint-pulse"></span>
          <span>Hover to pause · Click any project to get an instant engineering estimate</span>
        </div>
        <button className="button button-solid" onClick={onQuoteOpen}>
          Request Quote For Your Space <ArrowUpRight size={16} />
        </button>
      </div>
    </section>
  );
}

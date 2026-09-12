import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

// ── Default data (same as what's hardcoded in pages) ──────────────────────

export interface Project {
  id: string;
  title: string;
  type: string;
  city: string;
  system: string;
  image: string;
  year: string;
  area: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  designation: string;
  project: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  name: string;
  faqs: FaqItem[];
}

export interface Office {
  city: string;
  address: string;
  phone: string;
  email: string;
}

export interface CeoData {
  name: string;
  title: string;
  intro: string;
  years: string;
  projects: string;
  teamSize: string;
  quotes: string[];
}

export interface CompanyData {
  name: string;
  tagline: string;
  heroHeading: string;
  heroSub: string;
  phone: string;
  email: string;
  whatsapp: string;
  workingHours: string;
}

export interface SiteContent {
  company: CompanyData;
  ceo: CeoData;
  projects: Project[];
  testimonials: Testimonial[];
  faqCategories: FaqCategory[];
  offices: Office[];
}

const DEFAULT_IMAGES = {
  hero: "/images/hero.jpg",
  pool: "/images/commercial.jpg",
  walkway: "/images/walkway.jpg",
  detail: "/images/detail.jpg",
};

export const DEFAULT_CONTENT: SiteContent = {
  company: {
    name: "TSP Tensile Structures",
    tagline: "Tensile Architecture & Car Parking Shades / Pakistan",
    heroHeading: "Shade becomes architecture when every curve has a reason.",
    heroSub: "Custom tensile membrane structures and cantilever parking shades engineered for Pakistan's climate. Designed, fabricated, and installed as one considered whole.",
    phone: "+92 300 1234567",
    email: "info@tsptensile.pk",
    whatsapp: "923001234567",
    workingHours: "Monday – Saturday, 9:00 am – 6:00 pm",
  },
  ceo: {
    name: "Shaukat Bhullar",
    title: "Founder & Chief Executive",
    intro: "Shaukat Bhullar founded TSP Tensile Structures in Lahore in 2016 after a decade working in structural engineering and architectural fabrication. His conviction was simple: Pakistan deserved tensile structures designed with the same rigour as the best international work — and that meant design, engineering and installation under one roof.",
    years: "9+",
    projects: "120+",
    teamSize: "24",
    quotes: [
      "The best tensile structure is one that looks inevitable — as if it could only have been that form in that place.",
      "We spend more time on a connection detail than most contractors spend on an entire design.",
      "Pakistan has some of the most demanding climates for outdoor structures. That demands better engineering, not cheaper materials.",
    ],
  },
  projects: [
    {
      id: "01",
      title: "Executive Cantilever Car Parking Bays",
      type: "Commercial",
      city: "Lahore",
      system: "Heavy Steel Cantilever · Architectural PVDF",
      image: "/images/hero.jpg",
      year: "2025",
      area: "850 m²",
      description: "Flagship luxury cantilevered tensile canopy sheltering executive fleet parking with zero front-column obstruction, 316 marine-grade stainless rigging, and 15-year weatherproofing."
    },
    {
      id: "02",
      title: "Arch Cantilever Luxury Driveway Canopy",
      type: "Residential",
      city: "Islamabad",
      system: "Tubular Steel Arches · Curved PVC/PVDF",
      image: "/images/project_cantilever_parking.jpg",
      year: "2025",
      area: "420 m²",
      description: "Custom-engineered arched cantilever tensile car parking structure for high-end residential estates, combining sleek white tubular framing with high UV-reflective membrane."
    },
    {
      id: "03",
      title: "The Grand Arrival Canopy",
      type: "Commercial",
      city: "Lahore",
      system: "PTFE Membrane · Steel Mast Tensioning",
      image: "/images/hero_luxury.jpg",
      year: "2024",
      area: "560 m²",
      description: "Double-curved hyperbolic paraboloid white PTFE architectural membrane canopy suspended by tapered steel masts over a prestigious corporate campus entrance."
    },
    {
      id: "04",
      title: "National EV Fast-Charging Station Canopy",
      type: "Commercial",
      city: "Lahore",
      system: "Cantilever Wing · EV Infrastructure Shade",
      image: "/images/project_ev_charging_canopy.jpg",
      year: "2024",
      area: "350 m²",
      description: "Custom-fabricated architectural cantilever tensile canopy sheltering electric vehicle (EV) fast-charging infrastructure at an elite colonial heritage landmark estate in Lahore."
    },
    {
      id: "05",
      title: "Radio Pakistan Executive Parking Canopy",
      type: "Institutional",
      city: "Islamabad",
      system: "Cantilever Arch · Tensile Membrane",
      image: "/images/project_radio_pakistan.jpg",
      year: "2024",
      area: "650 m²",
      description: "Custom-engineered double cantilever arch tensile car parking structure for the national broadcasting headquarters (Radio Pakistan), sheltering executive vehicles with high UV-reflective membrane."
    },
    {
      id: "06",
      title: "DHA Luxury Villa Row Gate & Driveway Shades",
      type: "Residential",
      city: "Lahore",
      system: "Modular Cantilever · Architectural Awning",
      image: "/images/project_dha_street_villas.jpg",
      year: "2024",
      area: "480 m²",
      description: "Continuous custom cantilever tensile driveway canopies designed for modern luxury townhouses in DHA Phase 6, featuring sleek minimal steel frames and high-tension membrane."
    },
    {
      id: "07",
      title: "Padel & Multi-Sport Arena Long-Span Roof",
      type: "Commercial",
      city: "Lahore",
      system: "Barrel Vault Arch · Tensile Roof",
      image: "/images/project_sports_arena.jpg",
      year: "2024",
      area: "1,800 m²",
      description: "Massive clear-span structural steel arched truss framework covered with weatherproof tensile membrane for professional indoor padel courts and sports facilities."
    },
    {
      id: "08",
      title: "Villa Pool Terrace Tensile Membrane",
      type: "Residential",
      city: "Islamabad",
      system: "Hyperbolic Paraboloid · Tension Cable",
      image: "/images/luxury_pool.jpg",
      year: "2023",
      area: "180 m²",
      description: "Sculptural sail shade structure spanning private villa swimming pool and travertine deck in F-7 Islamabad, engineered for optimal seasonal sun protection."
    },
    {
      id: "09",
      title: "Garden Link Covered Walkway",
      type: "Hospitality",
      city: "Rawalpindi",
      system: "PTFE Tensioned · Timber & Steel",
      image: "/images/luxury_walkway.jpg",
      year: "2024",
      area: "95 m × 3.2 m",
      description: "Undulating covered tensile walkway connecting hotel suites with lush landscaped pavilions, filtering soft natural daylight while deflecting rain."
    },
  ],
  testimonials: [
    { quote: "We'd used other shade contractors before. The difference with TSP Tensile was immediate — they came to site, asked questions nobody else had asked, and came back with something that genuinely fitted the space.", author: "Tariq Mahmood", designation: "Director, Gulberg Commercial Properties", project: "Corporate Canopy · Lahore 2024" },
    { quote: "The pool canopy has changed how we use the house. We're outside from morning to evening now. The fact that it looks considered — not like an afterthought — is what I'm most pleased about.", author: "Sana Mirza", designation: "Homeowner", project: "Residential Pool Shade · Islamabad 2023" },
    { quote: "From the first site visit to handover, I knew exactly what was happening and why. The team stayed on site until the tensioning was right. That level of care is rare in Pakistan.", author: "Usman Farooqi", designation: "Managing Director, The Jasmine Hotel", project: "Terrace Walkway · Rawalpindi 2024" },
    { quote: "They solved a drainage problem three other contractors had ignored for two years. The membrane channels water exactly where we needed it. No complaints since day one.", author: "Rabia Chaudhry", designation: "Estate Manager, DHA Villa Complex", project: "Entry Canopy · Lahore 2023" },
  ],
  faqCategories: [
    {
      name: "Getting started",
      faqs: [
        { question: "How do I get a quote?", answer: "Share your city, project type and a few photos or dimensions via our contact page or WhatsApp. Our team reviews every brief personally and comes back with the right next step — usually a follow-up call or a site visit." },
        { question: "Do you visit the site before quoting?", answer: "For projects above a certain scale, a site visit is essential. For smaller residential projects, good photos and dimensions are often enough to prepare a preliminary estimate." },
        { question: "What information do I need to provide?", answer: "City and specific location, approximate dimensions or area required, intended use (parking, garden, pool, commercial, etc.), any budget range you have in mind, and photos of the space if available." },
        { question: "How long does it take to get a quote?", answer: "A preliminary estimate is usually ready within 1–2 working days. A detailed quotation with material specifications and structural parameters typically takes 3–5 days." },
      ],
    },
    {
      name: "Materials & Design",
      faqs: [
        { question: "What materials do you use?", answer: "We work with PVC-coated polyester, HDPE shade cloth, PTFE-coated glass fibre, ETFE foil and polycarbonate. The right material depends on your climate, budget, lifespan requirement and aesthetic intent." },
        { question: "Can the design be custom?", answer: "Every project we do is custom. We do not work from a fixed catalogue. The geometry, material, colour and structural system are all designed for the specific site." },
        { question: "Can you match an existing colour or finish?", answer: "Yes. PVC and HDPE fabrics are available in a wide range of standard colours. Custom colour matching is possible for PVC at a minimum order quantity." },
        { question: "How do I choose between HDPE and PVC?", answer: "HDPE is lighter, breathable and more affordable — suited for residential and recreational use. PVC is heavier, fully waterproof and longer-lasting — suited for commercial and institutional use. We will recommend the right one for your project." },
      ],
    },
    {
      name: "Installation & Timeline",
      faqs: [
        { question: "How long does installation take?", answer: "A residential shade typically takes 2–3 days on site. A larger commercial structure with multiple masts may take 1–2 weeks. We confirm a timeline after scoping your project." },
        { question: "Do you handle everything — design, fabrication and installation?", answer: "Yes. Our service is designed as one joined-up process from concept through installation and aftercare. You do not manage separate contractors." },
        { question: "What happens if weather delays the installation?", answer: "We account for weather windows in our scheduling, particularly for tensioning operations. Delays due to weather are communicated immediately and rescheduled at no additional cost." },
      ],
    },
    {
      name: "Maintenance & Warranty",
      faqs: [
        { question: "What maintenance does a tensile structure require?", answer: "PVC and PTFE membranes are largely self-cleaning with rainfall. An annual inspection of cable tensions, connection hardware and drainage is recommended. HDPE shade cloth should be checked annually for UV degradation." },
        { question: "Do you offer a warranty?", answer: "Yes. We provide a structural warranty on all installed works. Fabric warranties follow the manufacturer's specification — typically 5–10 years for HDPE and 10–20 years for PVC." },
        { question: "Can you repair an existing structure?", answer: "We assess existing structures from other installers on a case-by-case basis. Repairs, re-tensioning and fabric replacement are all services we offer." },
      ],
    },
  ],
  offices: [
    { city: "Lahore", address: "DHA Phase 5, Lahore, Punjab", phone: "+92 300 1234567", email: "lahore@formfield.pk" },
    { city: "Islamabad", address: "F-8 Markaz, Islamabad, ICT", phone: "+92 300 1234568", email: "islamabad@formfield.pk" },
    { city: "Rawalpindi", address: "Saddar, Rawalpindi, Punjab", phone: "+92 300 1234569", email: "rwp@formfield.pk" },
  ],
};

// ── Context ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "ff_site_content";

interface ContentContextType {
  content: SiteContent;
  updateContent: (patch: Partial<SiteContent>) => void;
  updateCompany: (patch: Partial<CompanyData>) => void;
  updateCeo: (patch: Partial<CeoData>) => void;
  setProjects: (projects: Project[]) => void;
  setTestimonials: (testimonials: Testimonial[]) => void;
  setFaqCategories: (cats: FaqCategory[]) => void;
  setOffices: (offices: Office[]) => void;
  resetToDefaults: () => void;
  exportData: () => void;
  importData: (json: string) => boolean;
}

const ContentContext = createContext<ContentContextType | null>(null);

function loadFromStorage(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONTENT;
    const parsed = JSON.parse(raw);
    
    // --- AUTO-FIX SCRIPT ---
    // Automatically fix any old broken unsplash or manus-storage image links in user's saved data
    if (parsed.projects && Array.isArray(parsed.projects)) {
      const defaultImgs = [DEFAULT_IMAGES.hero, DEFAULT_IMAGES.pool, DEFAULT_IMAGES.walkway, DEFAULT_IMAGES.detail];
      parsed.projects = parsed.projects.map((p: any, index: number) => {
        if (p.image && (p.image.includes('unsplash.com') || p.image.includes('manus-storage'))) {
          p.image = defaultImgs[index % defaultImgs.length];
        }
        return p;
      });
    }
    // CEO auto-fix: update old placeholder Khalid Ahmed to Shaukat Bhullar
    if (parsed.ceo && (parsed.ceo.name === "Khalid Ahmed" || !parsed.ceo.name)) {
      parsed.ceo.name = "Shaukat Bhullar";
      if (parsed.ceo.intro && parsed.ceo.intro.includes("Khalid")) {
        parsed.ceo.intro = parsed.ceo.intro.replace(/Khalid/g, "Shaukat Bhullar");
      }
    }
    // --- END AUTO-FIX ---

    return {
      ...DEFAULT_CONTENT,
      ...parsed,
      company: { ...DEFAULT_CONTENT.company, ...parsed.company },
      ceo: { ...DEFAULT_CONTENT.ceo, ...parsed.ceo },
    };
  } catch (err) {
    console.error("Failed to load from storage", err);
    return DEFAULT_CONTENT;
  }
}

async function saveToGlobal(data: SiteContent) {
  try {
    // Save to local storage for immediate offline/cache fallback
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    
    // Also push to the global Vercel KV via API
    await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        password: "formfield2026", // Admin token
        content: data 
      })
    });
  } catch (err) {
    console.error("Failed to save to global database:", err);
  }
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(loadFromStorage);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then(res => {
        const ct = res.headers.get("content-type");
        if (res.ok && ct && ct.includes("application/json")) {
          return res.json();
        }
        return null;
      })
      .then(json => {
        if (json && json.success && json.data) {
          const parsed = json.data;
          if (parsed.ceo && (parsed.ceo.name === "Khalid Ahmed" || !parsed.ceo.name)) {
            parsed.ceo.name = "Shaukat Bhullar";
            if (parsed.ceo.intro && parsed.ceo.intro.includes("Khalid")) {
              parsed.ceo.intro = parsed.ceo.intro.replace(/Khalid/g, "Shaukat Bhullar");
            }
          }
          const merged = {
            ...DEFAULT_CONTENT,
            ...parsed,
            company: { ...DEFAULT_CONTENT.company, ...parsed?.company },
            ceo: { ...DEFAULT_CONTENT.ceo, ...parsed?.ceo },
          };
          setContent(merged);
          // Sync cache
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        }
      })
      .catch(err => console.error("Could not fetch global content", err))
      .finally(() => setIsLoaded(true));
  }, []);

  const save = (updated: SiteContent) => {
    setContent(updated);
    saveToGlobal(updated);
  };

  const updateContent = (patch: Partial<SiteContent>) => save({ ...content, ...patch });
  const updateCompany = (patch: Partial<CompanyData>) => save({ ...content, company: { ...content.company, ...patch } });
  const updateCeo = (patch: Partial<CeoData>) => save({ ...content, ceo: { ...content.ceo, ...patch } });
  const setProjects = (projects: Project[]) => save({ ...content, projects });
  const setTestimonials = (testimonials: Testimonial[]) => save({ ...content, testimonials });
  const setFaqCategories = (faqCategories: FaqCategory[]) => save({ ...content, faqCategories });
  const setOffices = (offices: Office[]) => save({ ...content, offices });
  const resetToDefaults = () => { 
    localStorage.removeItem(STORAGE_KEY); 
    setContent(DEFAULT_CONTENT);
    saveToGlobal(DEFAULT_CONTENT);
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "formfield-content.json"; a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (json: string): boolean => {
    try {
      const parsed = JSON.parse(json);
      const merged = { ...DEFAULT_CONTENT, ...parsed, company: { ...DEFAULT_CONTENT.company, ...parsed.company }, ceo: { ...DEFAULT_CONTENT.ceo, ...parsed.ceo } };
      save(merged);
      return true;
    } catch { return false; }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, updateCompany, updateCeo, setProjects, setTestimonials, setFaqCategories, setOffices, resetToDefaults, exportData, importData }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be inside ContentProvider");
  return ctx;
}

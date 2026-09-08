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
    name: "Form/Field Structures",
    tagline: "Tensile architecture / Pakistan",
    heroHeading: "Shade becomes architecture when every curve has a reason.",
    heroSub: "Custom membrane structures for places that deserve more than an afterthought. Designed, engineered and installed as one considered whole.",
    phone: "+92 300 1234567",
    email: "hello@formfield.pk",
    whatsapp: "923001234567",
    workingHours: "Monday – Saturday, 9:00 am – 6:00 pm",
  },
  ceo: {
    name: "Khalid Ahmed",
    title: "Founder & Chief Executive",
    intro: "Khalid founded Form/Field in Lahore in 2016 after a decade working in structural engineering and architectural fabrication. His conviction was simple: Pakistan deserved tensile structures designed with the same rigour as the best international work — and that meant design, engineering and installation under one roof.",
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
    { id: "01", title: "The Arrival Canopy", type: "Commercial", city: "Lahore", system: "PVC membrane · Steel mast", image: DEFAULT_IMAGES.hero, year: "2023", area: "420 m²", description: "A welcoming entry canopy for a corporate campus in DHA Lahore. The asymmetric single-mast form anchors the main gate while allowing full vehicular clearance below." },
    { id: "02", title: "Pool House Membrane", type: "Residential", city: "Islamabad", system: "HDPE shade · Tension cable", image: DEFAULT_IMAGES.pool, year: "2023", area: "180 m²", description: "A lightweight HDPE membrane spans the pool and adjacent terrace of a private villa in F-7. The geometry follows the sun path — maximum shade from 10am to 4pm." },
    { id: "03", title: "Garden Link Walkway", type: "Hospitality", city: "Rawalpindi", system: "PTFE tensioned · Timber posts", image: DEFAULT_IMAGES.walkway, year: "2024", area: "95 m × 3.2 m", description: "A 95-metre covered walkway connecting the restaurant building to the garden pavilion of a boutique hotel. PTFE fabric lets in diffused daylight while blocking direct sun and rain." },
    { id: "04", title: "Corporate Parking Canopy", type: "Commercial", city: "Lahore", system: "Modular steel · Polycarbonate", image: DEFAULT_IMAGES.detail, year: "2024", area: "1,200 m²", description: "A modular canopy system covering 120 parking bays for a corporate office in Gulberg. Polycarbonate panels allow ambient light through while blocking UV." },
    { id: "05", title: "Rooftop Garden Shade", type: "Residential", city: "Islamabad", system: "Sail shade · Stainless steel", image: DEFAULT_IMAGES.hero, year: "2024", area: "340 m²", description: "Three overlapping sail shades create a layered canopy over the rooftop garden of a residential tower in Blue Area." },
    { id: "06", title: "Hotel Terrace Pergola", type: "Hospitality", city: "Karachi", system: "Retractable awning · Aluminium", image: DEFAULT_IMAGES.pool, year: "2025", area: "260 m²", description: "A motorised retractable fabric pergola over the sea-facing terrace of a boutique hotel in Clifton. Wind sensors auto-retract the fabric above 45 km/h." },
    { id: "07", title: "School Sports Canopy", type: "Institutional", city: "Lahore", system: "HDPE shade · Galvanised posts", image: DEFAULT_IMAGES.walkway, year: "2025", area: "800 m²", description: "A large free-standing HDPE shade structure covering the main sports ground of a private school in DHA. Engineered to withstand Lahore's summer storms." },
    { id: "08", title: "Shopping Mall Entry", type: "Commercial", city: "Islamabad", system: "PVC tensioned · Glass fins", image: DEFAULT_IMAGES.detail, year: "2025", area: "560 m²", description: "A dramatic tensile entry canopy for a new retail mall in Bahria Town. The doubly-curved PVC membrane is backlit at night, creating a luminous landmark." },
  ],
  testimonials: [
    { quote: "We'd used other shade contractors before. The difference with Form/Field was immediate — they came to site, asked questions nobody else had asked, and came back with something that genuinely fitted the space.", author: "Tariq Mahmood", designation: "Director, Gulberg Commercial Properties", project: "Corporate Canopy · Lahore 2024" },
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
    return {
      ...DEFAULT_CONTENT,
      ...parsed,
      company: { ...DEFAULT_CONTENT.company, ...parsed.company },
      ceo: { ...DEFAULT_CONTENT.ceo, ...parsed.ceo },
    };
  } catch {
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
    // Fetch global state on load
    fetch("/api/content")
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          const parsed = json.data;
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

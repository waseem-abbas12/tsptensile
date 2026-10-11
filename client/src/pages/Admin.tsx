import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent, DEFAULT_CONTENT, DEFAULT_CALCULATOR_CONFIG, type Project, type Testimonial, type FaqItem, type Office, type CalculatorConfig, type FabricRate } from "@/contexts/ContentContext";
import { Plus, Trash2, Save, Download, Upload, RotateCcw, LogOut, ChevronDown, ChevronUp, Eye, EyeOff, ShieldCheck, Calculator } from "lucide-react";
import { Link } from "wouter";

const ADMIN_PASSWORD = "formfield2026";

// ── Tiny helpers ──────────────────────────────────────────────────────────

function Field({ label, value, onChange, type = "text", rows }: { label: string; value: string; onChange: (v: string) => void; type?: string; rows?: number }) {
  return (
    <div className="adm-field">
      <label>{label}</label>
      {rows ? (
        <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} />
      )}
    </div>
  );
}

function SaveBar({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  return (
    <div className="adm-savebar">
      <button className="adm-btn adm-btn-primary" onClick={onSave}>
        <Save size={15} /> {saved ? "Saved ✓" : "Save Changes"}
      </button>
    </div>
  );
}

// ── Sections ──────────────────────────────────────────────────────────────

function CompanySection() {
  const { content, updateCompany } = useContent();
  const [local, setLocal] = useState({ ...content.company });
  const [saved, setSaved] = useState(false);

  const set = (k: keyof typeof local) => (v: string) => setLocal(p => ({ ...p, [k]: v }));
  const save = () => { updateCompany(local); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="adm-section">
      <h2>Company Information</h2>
      <div className="adm-grid-2">
        <Field label="Company Name" value={local.name} onChange={set("name")} />
        <Field label="Tagline (hero eyebrow)" value={local.tagline} onChange={set("tagline")} />
        <Field label="WhatsApp Number (digits only, e.g. 923024001063)" value={local.whatsapp} onChange={set("whatsapp")} />
        <Field label="Main Phone" value={local.phone} onChange={set("phone")} />
        <Field label="Email" value={local.email} onChange={set("email")} />
        <Field label="Working Hours" value={local.workingHours} onChange={set("workingHours")} />
      </div>
      <Field label="Hero Heading" value={local.heroHeading} onChange={set("heroHeading")} rows={2} />
      <Field label="Hero Subheading" value={local.heroSub} onChange={set("heroSub")} rows={3} />
      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

function CeoSection() {
  const { content, updateCeo } = useContent();
  const [local, setLocal] = useState({ ...content.ceo, quotes: [...content.ceo.quotes] });
  const [saved, setSaved] = useState(false);

  const set = (k: keyof typeof local) => (v: string) => setLocal(p => ({ ...p, [k]: v }));
  const setQuote = (i: number, v: string) => setLocal(p => { const q = [...p.quotes]; q[i] = v; return { ...p, quotes: q }; });
  const addQuote = () => setLocal(p => ({ ...p, quotes: [...p.quotes, ""] }));
  const removeQuote = (i: number) => setLocal(p => { const q = [...p.quotes]; q.splice(i, 1); return { ...p, quotes: q }; });
  const save = () => { updateCeo(local); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="adm-section">
      <h2>CEO Profile</h2>
      <div className="adm-grid-2">
        <Field label="CEO Name" value={local.name} onChange={set("name")} />
        <Field label="Title / Designation" value={local.title} onChange={set("title")} />
        <Field label="Years Experience (shown as stat)" value={local.years} onChange={set("years")} />
        <Field label="Projects Completed (shown as stat)" value={local.projects} onChange={set("projects")} />
        <Field label="Team Size (shown as stat)" value={local.teamSize} onChange={set("teamSize")} />
      </div>
      <Field label="Introduction Paragraph" value={local.intro} onChange={set("intro")} rows={5} />

      <div className="adm-subsection">
        <div className="adm-subsection-header">
          <h3>CEO Quotes</h3>
          <button className="adm-btn adm-btn-ghost" onClick={addQuote}><Plus size={14} /> Add Quote</button>
        </div>
        {local.quotes.map((q, i) => (
          <div key={i} className="adm-row-with-delete">
            <Field label={`Quote ${i + 1}`} value={q} onChange={v => setQuote(i, v)} rows={3} />
            <button className="adm-delete-btn" onClick={() => removeQuote(i)}><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

function ProjectsSection() {
  const { content, setProjects } = useContent();
  const [projects, setLocal] = useState<Project[]>(content.projects.map(p => ({ ...p })));
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const update = (id: string, k: keyof Project, v: string) => setLocal(ps => ps.map(p => p.id === id ? { ...p, [k]: v } : p));
  const remove = (id: string) => setLocal(ps => ps.filter(p => p.id !== id));
  const add = () => {
    const id = String(Date.now());
    setLocal(ps => [...ps, { id, title: "New Project", type: "Commercial", city: "Lahore", system: "", image: "/images/hero.jpg", year: "2025", area: "", description: "" }]);
    setExpanded(id);
  };
  const save = () => { setProjects(projects); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <h2>Projects ({projects.length})</h2>
        <button className="adm-btn adm-btn-ghost" onClick={add}><Plus size={14} /> Add Project</button>
      </div>
      <div className="adm-list">
        {projects.map((p) => (
          <div key={p.id} className="adm-list-item">
            <div className="adm-list-item-header" onClick={() => setExpanded(expanded === p.id ? null : p.id)}>
              <div>
                <strong>{p.title}</strong>
                <span className="adm-tag">{p.type}</span>
                <span className="adm-muted">{p.city} · {p.year}</span>
              </div>
              <div className="adm-list-actions">
                <button className="adm-delete-btn" onClick={e => { e.stopPropagation(); remove(p.id); }}><Trash2 size={14} /></button>
                {expanded === p.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
            <AnimatePresence>
              {expanded === p.id && (
                <motion.div className="adm-list-item-body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                  <div className="adm-grid-2">
                    <Field label="Title" value={p.title} onChange={v => update(p.id, "title", v)} />
                    <Field label="Type" value={p.type} onChange={v => update(p.id, "type", v)} />
                    <Field label="City" value={p.city} onChange={v => update(p.id, "city", v)} />
                    <Field label="Year" value={p.year} onChange={v => update(p.id, "year", v)} />
                    <Field label="Area / Size" value={p.area} onChange={v => update(p.id, "area", v)} />
                    <Field label="System (e.g. PVC membrane · Steel mast)" value={p.system} onChange={v => update(p.id, "system", v)} />
                  </div>
                  <Field label="Description" value={p.description} onChange={v => update(p.id, "description", v)} rows={3} />
                  <Field label="Image URL" value={p.image} onChange={v => update(p.id, "image", v)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

function TestimonialsSection() {
  const { content, setTestimonials } = useContent();
  const [items, setItems] = useState<Testimonial[]>(content.testimonials.map(t => ({ ...t })));
  const [saved, setSaved] = useState(false);

  const update = (i: number, k: keyof Testimonial, v: string) => setItems(ts => ts.map((t, idx) => idx === i ? { ...t, [k]: v } : t));
  const remove = (i: number) => setItems(ts => ts.filter((_, idx) => idx !== i));
  const add = () => setItems(ts => [...ts, { quote: "", author: "", designation: "", project: "" }]);
  const save = () => { setTestimonials(items); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <h2>Testimonials ({items.length})</h2>
        <button className="adm-btn adm-btn-ghost" onClick={add}><Plus size={14} /> Add Testimonial</button>
      </div>
      <div className="adm-list">
        {items.map((t, i) => (
          <div key={i} className="adm-list-item adm-list-item-open">
            <div className="adm-list-item-header">
              <strong>{t.author || `Testimonial ${i + 1}`}</strong>
              <button className="adm-delete-btn" onClick={() => remove(i)}><Trash2 size={14} /></button>
            </div>
            <div className="adm-list-item-body" style={{ height: "auto", opacity: 1 }}>
              <Field label="Quote (without quotes)" value={t.quote} onChange={v => update(i, "quote", v)} rows={3} />
              <div className="adm-grid-3">
                <Field label="Client Name" value={t.author} onChange={v => update(i, "author", v)} />
                <Field label="Designation" value={t.designation} onChange={v => update(i, "designation", v)} />
                <Field label="Project Info" value={t.project} onChange={v => update(i, "project", v)} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

function FaqSection() {
  const { content, setFaqCategories } = useContent();
  const [cats, setCats] = useState(content.faqCategories.map(c => ({ ...c, faqs: c.faqs.map(f => ({ ...f })) })));
  const [saved, setSaved] = useState(false);

  const updateQ = (ci: number, qi: number, k: keyof FaqItem, v: string) => setCats(cs => cs.map((c, i) => i === ci ? { ...c, faqs: c.faqs.map((f, j) => j === qi ? { ...f, [k]: v } : f) } : c));
  const addQ = (ci: number) => setCats(cs => cs.map((c, i) => i === ci ? { ...c, faqs: [...c.faqs, { question: "", answer: "" }] } : c));
  const removeQ = (ci: number, qi: number) => setCats(cs => cs.map((c, i) => i === ci ? { ...c, faqs: c.faqs.filter((_, j) => j !== qi) } : c));
  const save = () => { setFaqCategories(cats); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="adm-section">
      <h2>FAQ</h2>
      {cats.map((cat, ci) => (
        <div key={ci} className="adm-subsection">
          <div className="adm-subsection-header">
            <h3>{cat.name}</h3>
            <button className="adm-btn adm-btn-ghost" onClick={() => addQ(ci)}><Plus size={13} /> Add Question</button>
          </div>
          {cat.faqs.map((faq, qi) => (
            <div key={qi} className="adm-faq-item">
              <div className="adm-faq-num">{qi + 1}</div>
              <div className="adm-faq-body">
                <Field label="Question" value={faq.question} onChange={v => updateQ(ci, qi, "question", v)} />
                <Field label="Answer" value={faq.answer} onChange={v => updateQ(ci, qi, "answer", v)} rows={3} />
              </div>
              <button className="adm-delete-btn" onClick={() => removeQ(ci, qi)}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
      ))}
      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

function OfficesSection() {
  const { content, setOffices } = useContent();
  const [offices, setLocal] = useState<Office[]>(content.offices.map(o => ({ ...o })));
  const [saved, setSaved] = useState(false);

  const update = (i: number, k: keyof Office, v: string) => setLocal(os => os.map((o, j) => j === i ? { ...o, [k]: v } : o));
  const remove = (i: number) => setLocal(os => os.filter((_, j) => j !== i));
  const add = () => setLocal(os => [...os, { city: "", address: "", phone: "", email: "" }]);
  const save = () => { setOffices(offices); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <h2>Offices ({offices.length})</h2>
        <button className="adm-btn adm-btn-ghost" onClick={add}><Plus size={14} /> Add Office</button>
      </div>
      {offices.map((o, i) => (
        <div key={i} className="adm-office-card">
          <div className="adm-grid-2">
            <Field label="City" value={o.city} onChange={v => update(i, "city", v)} />
            <Field label="Address" value={o.address} onChange={v => update(i, "address", v)} />
            <Field label="Phone" value={o.phone} onChange={v => update(i, "phone", v)} />
            <Field label="Email" value={o.email} onChange={v => update(i, "email", v)} />
          </div>
          <button className="adm-delete-btn adm-delete-btn-top" onClick={() => remove(i)}><Trash2 size={14} /> Remove</button>
        </div>
      ))}
      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

function CalculatorSection() {
  const { content, updateCalculator } = useContent();
  const [local, setLocal] = useState<CalculatorConfig>(() => ({
    ...DEFAULT_CALCULATOR_CONFIG,
    ...(content.calculator || {}),
    fabrics: (content.calculator?.fabrics || DEFAULT_CALCULATOR_CONFIG.fabrics).map(f => ({ ...f })),
    structures: (content.calculator?.structures || DEFAULT_CALCULATOR_CONFIG.structures).map(s => ({ ...s })),
    steelFinishes: (content.calculator?.steelFinishes || DEFAULT_CALCULATOR_CONFIG.steelFinishes).map(st => ({ ...st })),
    cities: (content.calculator?.cities || DEFAULT_CALCULATOR_CONFIG.cities).map(c => ({ ...c })),
  }));
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateCalculator(local);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateFabricRate = (index: number, rate: number) => {
    setLocal(prev => {
      const copy = [...prev.fabrics];
      copy[index] = { ...copy[index], ratePerSqFt: rate };
      return { ...prev, fabrics: copy };
    });
  };

  const updateFabricField = (index: number, field: keyof FabricRate, val: any) => {
    setLocal(prev => {
      const copy = [...prev.fabrics];
      copy[index] = { ...copy[index], [field]: val };
      return { ...prev, fabrics: copy };
    });
  };

  const updateSteelAddon = (index: number, addon: number) => {
    setLocal(prev => {
      const copy = [...prev.steelFinishes];
      copy[index] = { ...copy[index], rateAddonPerSqFt: addon };
      return { ...prev, steelFinishes: copy };
    });
  };

  const updateCityMultiplier = (index: number, mult: number) => {
    setLocal(prev => {
      const copy = [...prev.cities];
      copy[index] = { ...copy[index], multiplier: mult };
      return { ...prev, cities: copy };
    });
  };

  const updateStructMultiplier = (index: number, mult: number) => {
    setLocal(prev => {
      const copy = [...prev.structures];
      copy[index] = { ...copy[index], multiplier: mult };
      return { ...prev, structures: copy };
    });
  };

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <h2>Estimation Calculator Settings &amp; Rates (تخمینہ ریٹس)</h2>
      </div>
      <p style={{ color: "#64748B", fontSize: "13px", marginTop: "-8px", marginBottom: "20px" }}>
        Control live pricing calculation per square foot for fabrics, steel finishes, structure models and Pakistani cities.
      </p>

      {/* Global Rules */}
      <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "10px", padding: "18px", marginBottom: "24px" }}>
        <h3 style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 14px", color: "var(--ink)" }}>Global Rules &amp; Minimum Charges</h3>
        <div className="adm-grid-2">
          <Field
            label="Minimum Order Price in PKR (e.g. 65000)"
            value={String(local.minOrderAmountPkr)}
            onChange={v => setLocal(p => ({ ...p, minOrderAmountPkr: Number(v) || 0 }))}
            type="number"
          />
          <Field
            label="Minimum Area in Sq. Ft (e.g. 120)"
            value={String(local.minOrderSqFt)}
            onChange={v => setLocal(p => ({ ...p, minOrderSqFt: Number(v) || 0 }))}
            type="number"
          />
          <Field
            label="WhatsApp Quotation Number (digits only, e.g. 923024001063)"
            value={local.whatsappRecipient}
            onChange={v => setLocal(p => ({ ...p, whatsappRecipient: v }))}
          />
        </div>
        <Field
          label="Estimate Disclaimer Note (shows at bottom of calculation)"
          value={local.disclaimer}
          onChange={v => setLocal(p => ({ ...p, disclaimer: v }))}
          rows={2}
        />
      </div>

      {/* Fabric Rates Table / Cards */}
      <div style={{ marginBottom: "28px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 12px", color: "var(--ink)" }}>
          Fabric Membrane Rates (فیبرک ریٹس فی مربع فٹ - PKR)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {local.fabrics.map((f, i) => (
            <div key={f.id} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "10px", padding: "16px", boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 160px 140px 140px", gap: "12px", alignItems: "center" }}>
                <div>
                  <strong style={{ fontSize: "13.5px", color: "var(--ink)" }}>{f.name}</strong>
                  <div style={{ fontSize: "11.5px", color: "#64748B" }}>Origin: {f.origin} · {f.gsm}</div>
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>
                    PKR / Sq. Ft:
                  </label>
                  <input
                    type="number"
                    value={f.ratePerSqFt}
                    onChange={e => updateFabricRate(i, Number(e.target.value) || 0)}
                    style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1.5px solid #2D6A68", fontWeight: 700, fontSize: "13.5px", color: "#2D6A68" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>
                    Warranty:
                  </label>
                  <input
                    type="text"
                    value={f.warranty}
                    onChange={e => updateFabricField(i, "warranty", e.target.value)}
                    style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "12px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>
                    Lifespan:
                  </label>
                  <input
                    type="text"
                    value={f.lifespan}
                    onChange={e => updateFabricField(i, "lifespan", e.target.value)}
                    style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "12px" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Steel Finish Addons */}
      <div style={{ marginBottom: "28px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 12px", color: "var(--ink)" }}>
          Steel Framework Add-on Rates (اسٹیل فریم ورک اضافی ریٹ - PKR)
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
          {local.steelFinishes.map((st, i) => (
            <div key={st.id} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "10px", padding: "14px" }}>
              <strong style={{ fontSize: "13px", color: "var(--ink)", display: "block", marginBottom: "2px" }}>{st.name}</strong>
              <div style={{ fontSize: "11.5px", color: "#64748B", marginBottom: "10px" }}>{st.desc}</div>
              <label style={{ fontSize: "11px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>
                Add-on PKR / Sq. Ft (0 for included):
              </label>
              <input
                type="number"
                value={st.rateAddonPerSqFt}
                onChange={e => updateSteelAddon(i, Number(e.target.value) || 0)}
                style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1px solid #CBD5E1", fontWeight: 700, fontSize: "13px" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Structure Multipliers */}
      <div style={{ marginBottom: "28px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 12px", color: "var(--ink)" }}>
          Structure Type Multipliers (سٹرکچر ماڈل فیکٹرز)
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "10px" }}>
          {local.structures.map((s, i) => (
            <div key={s.id} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "10px", padding: "12px 14px" }}>
              <strong style={{ fontSize: "12.5px", color: "var(--ink)", display: "block", marginBottom: "6px" }}>{s.name}</strong>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <label style={{ fontSize: "11px", color: "#475569", whiteSpace: "nowrap" }}>Multiplier:</label>
                <input
                  type="number"
                  step="0.05"
                  value={s.multiplier}
                  onChange={e => updateStructMultiplier(i, Number(e.target.value) || 1)}
                  style={{ width: "80px", padding: "4px 8px", borderRadius: "5px", border: "1px solid #CBD5E1", fontWeight: 600, fontSize: "12px" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* City Logistics Multipliers */}
      <div style={{ marginBottom: "28px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 12px", color: "var(--ink)" }}>
          City Logistics Multipliers (شہروں کے لاجسٹکس فیکٹرز)
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
          {local.cities.map((c, i) => (
            <div key={c.id} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "10px", padding: "12px 14px" }}>
              <strong style={{ fontSize: "12.5px", color: "var(--ink)", display: "block", marginBottom: "6px" }}>{c.name}</strong>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <label style={{ fontSize: "11px", color: "#475569", whiteSpace: "nowrap" }}>Factor:</label>
                <input
                  type="number"
                  step="0.01"
                  value={c.multiplier}
                  onChange={e => updateCityMultiplier(i, Number(e.target.value) || 1)}
                  style={{ width: "80px", padding: "4px 8px", borderRadius: "5px", border: "1px solid #CBD5E1", fontWeight: 600, fontSize: "12px" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

// ── Main Admin Panel ──────────────────────────────────────────────────────

const SECTIONS = [
  { id: "company", label: "🏢 Company Info" },
  { id: "ceo", label: "👤 CEO Profile" },
  { id: "calculator", label: "📐 Calculator Rates" },
  { id: "projects", label: "🏗️ Projects" },
  { id: "testimonials", label: "🗣️ Testimonials" },
  { id: "faq", label: "❓ FAQ" },
  { id: "offices", label: "📍 Offices" },
];

const SESSION_KEY = "tsp_admin_session_auth";
const SESSION_DURATION = 1000 * 60 * 60 * 2; // 2 hours

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => {
    try {
      // Clean up any legacy insecure permanent logins
      localStorage.removeItem("ff_admin");
      localStorage.removeItem("tsp_admin_auth");

      const saved = sessionStorage.getItem(SESSION_KEY);
      if (!saved) return false;
      const parsed = JSON.parse(saved);
      if (parsed.token === "tsp_auth_active" && Date.now() - parsed.timestamp < SESSION_DURATION) {
        return true;
      }
      sessionStorage.removeItem(SESSION_KEY);
      return false;
    } catch {
      return false;
    }
  });

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [active, setActive] = useState("company");
  const { resetToDefaults, exportData, importData } = useContent();
  const fileRef = useRef<HTMLInputElement>(null);

  // Countdown timer for brute-force lockout
  useEffect(() => {
    if (!lockoutUntil) return;
    const interval = setInterval(() => {
      const remaining = Math.ceil((lockoutUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockoutUntil(null);
        setCountdown(0);
        setFailedAttempts(0);
        setError("");
      } else {
        setCountdown(remaining);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  // Clean any old localStorage entries on mount and update document title & robot meta
  useEffect(() => {
    try {
      localStorage.removeItem("ff_admin");
      localStorage.removeItem("tsp_admin_auth");
    } catch {}

    document.title = authed ? "TSP Tensile - Admin Portal" : "Restricted Access";
    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.name = "robots";
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = "noindex, nofollow, noarchive";

    return () => {
      if (metaRobots) metaRobots.content = "index, follow";
    };
  }, [authed]);

  const login = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (lockoutUntil && Date.now() < lockoutUntil) return;

    const clean = password.trim();
    // Only the exact ADMIN_PASSWORD is accepted. No phone numbers or backdoors.
    if (clean === ADMIN_PASSWORD) {
      try {
        sessionStorage.setItem(
          SESSION_KEY,
          JSON.stringify({ token: "tsp_auth_active", timestamp: Date.now() })
        );
        localStorage.removeItem("ff_admin");
      } catch {}
      setAuthed(true);
      setError("");
      setFailedAttempts(0);
      setPassword("");
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 5) {
        const lockTime = Date.now() + 60 * 1000;
        setLockoutUntil(lockTime);
        setCountdown(60);
        setError("5 martaba galat password enter kiya gaya. Security lockout: 60 seconds intezar karein.");
      } else {
        setError(`Galat password! Sirf authorized admin login kar sakta hai (${5 - newAttempts} koshishein baqi).`);
      }
    }
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem("ff_admin");
      localStorage.removeItem("ff_admin");
    } catch {}
    setAuthed(false);
    setPassword("");
    setError("");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const ok = importData(ev.target?.result as string);
      alert(ok ? "✅ Content imported successfully!" : "❌ Invalid file. Please use a file exported from this panel.");
    };
    reader.readAsText(file);
  };

  if (!authed) {
    const isLocked = !!(lockoutUntil && countdown > 0);
    return (
      <div className="adm-login">
        <form className="adm-login-box" onSubmit={login}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: "#0F172A", display: "grid", placeItems: "center" }}>
              <svg width="22" height="22" viewBox="0 0 36 36" fill="none">
                <path d="M6 29 C12 18, 16 12, 18 5 C17 14, 13 23, 6 29 Z" fill="#F59E0B" />
                <path d="M30 29 C24 18, 20 12, 18 5 C19 14, 23 23, 30 29 Z" fill="#D97706" opacity="0.9" />
                <line x1="18" y1="4" x2="18" y2="30" stroke="#FFFFFF" strokeWidth="1.8" />
                <circle cx="18" cy="4" r="1.5" fill="#FBBF24" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "var(--ink)", letterSpacing: "0.04em" }}>TSP TENSILE</div>
              <div style={{ fontSize: "9.5px", color: "var(--teal)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Restricted Access</div>
            </div>
          </div>
          <h1>Security Verification</h1>
          <p>This portal is restricted to authorized company administrators only. Please enter your secret security code to proceed.</p>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={error ? "error" : ""}
              disabled={isLocked}
              autoFocus
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
              autoComplete="off"
              style={{ paddingRight: "46px" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: 0,
                color: "var(--ink-soft)",
                padding: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center"
              }}
              title={showPassword ? "Hide password" : "Show password"}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && <span className="adm-error" style={{ lineHeight: "1.4" }}>{error}</span>}
          <button
            type="submit"
            className="adm-btn adm-btn-primary"
            disabled={isLocked}
            style={{
              height: "46px",
              justifyContent: "center",
              fontSize: "15px",
              borderRadius: "4px",
              opacity: isLocked ? 0.6 : 1,
              cursor: isLocked ? "not-allowed" : "pointer"
            }}
          >
            {isLocked ? `Locked (${countdown}s)` : "Verify & Enter"}
          </button>
          <Link href="/" className="adm-back-link">← Return to Website</Link>
        </form>
      </div>
    );
  }

  return (
    <div className="adm-shell">
      {/* Mobile Top App Header */}
      <header className="adm-mobile-header">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(255,255,255,0.1)", display: "grid", placeItems: "center" }}>
            <svg width="18" height="18" viewBox="0 0 36 36" fill="none">
              <path d="M6 29 C12 18, 16 12, 18 5 C17 14, 13 23, 6 29 Z" fill="#F59E0B" />
              <path d="M30 29 C24 18, 20 12, 18 5 C19 14, 23 23, 30 29 Z" fill="#D97706" opacity="0.9" />
              <line x1="18" y1="4" x2="18" y2="30" stroke="#FFFFFF" strokeWidth="1.8" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: "14px", color: "white" }}>TSP Admin</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link href="/" className="adm-btn adm-btn-ghost" style={{ padding: "6px 12px", fontSize: "12px", color: "white", borderColor: "rgba(255,255,255,0.3)" }}>
            <Eye size={13} /> Site
          </Link>
          <button onClick={logout} className="adm-btn adm-btn-ghost" style={{ padding: "6px 12px", fontSize: "12px", color: "#fca5a5", borderColor: "rgba(252,165,165,0.3)" }}>
            <LogOut size={13} />
          </button>
        </div>
      </header>

      {/* Horizontal scrolling tab bar on mobile */}
      <div className="adm-mobile-tabs">
        {SECTIONS.map(s => (
          <button
            key={s.id}
            className={`adm-mobile-tab-btn ${active === s.id ? "active" : ""}`}
            onClick={() => setActive(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Desktop Sidebar */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar-top">
          <div className="adm-logo" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0 20px 20px" }}>
            <div style={{ width: 32, height: 32, borderRadius: 6, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", display: "grid", placeItems: "center", flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 29 C12 18, 16 12, 18 5 C17 14, 13 23, 6 29 Z" fill="#F59E0B" />
                <path d="M30 29 C24 18, 20 12, 18 5 C19 14, 23 23, 30 29 Z" fill="#D97706" opacity="0.9" />
                <path d="M8 28 C13 23, 23 23, 28 28 C22 25, 14 25, 8 28 Z" fill="#FFFFFF" opacity="0.95" />
                <line x1="18" y1="4" x2="18" y2="30" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="18" cy="4" r="1.5" fill="#FBBF24" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.06em", color: "#FFFFFF", lineHeight: 1.2 }}>TSP TENSILE</div>
              <div style={{ fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sage)", fontWeight: 600 }}>Admin Portal</div>
            </div>
          </div>
          <nav>
            {SECTIONS.map(s => (
              <button key={s.id} className={active === s.id ? "active" : ""} onClick={() => setActive(s.id)}>
                {s.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="adm-sidebar-bottom">
          <Link href="/" className="adm-sidebar-link"><Eye size={14} /> View Website</Link>
          <button className="adm-sidebar-link" onClick={exportData}><Download size={14} /> Export Data</button>
          <button className="adm-sidebar-link" onClick={() => fileRef.current?.click()}><Upload size={14} /> Import Data</button>
          <button className="adm-sidebar-link adm-danger" onClick={() => { if (confirm("Sab kuch reset ho jaayega. Sure ho?")) resetToDefaults(); }}><RotateCcw size={14} /> Reset to Default</button>
          <button className="adm-sidebar-link" onClick={logout}><LogOut size={14} /> Logout</button>
          <input ref={fileRef} type="file" accept=".json" style={{ display: "none" }} onChange={handleImport} />
        </div>
      </aside>

      {/* Main content */}
      <main className="adm-main">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            {active === "company" && <CompanySection />}
            {active === "ceo" && <CeoSection />}
            {active === "calculator" && <CalculatorSection />}
            {active === "projects" && <ProjectsSection />}
            {active === "testimonials" && <TestimonialsSection />}
            {active === "faq" && <FaqSection />}
            {active === "offices" && <OfficesSection />}
          </motion.div>
        </AnimatePresence>

        {/* Mobile quick actions at bottom of main content */}
        <div className="adm-mobile-actions" style={{ display: "none" }}>
          <button className="adm-btn adm-btn-ghost" onClick={exportData} style={{ fontSize: "12px" }}>
            <Download size={13} /> Export Backup
          </button>
          <button className="adm-btn adm-btn-ghost" onClick={() => fileRef.current?.click()} style={{ fontSize: "12px" }}>
            <Upload size={13} /> Restore Backup
          </button>
          <button className="adm-btn adm-btn-ghost" onClick={logout} style={{ fontSize: "12px", color: "#e53e3e", borderColor: "#fed7d7" }}>
            <LogOut size={13} /> Logout
          </button>
        </div>
      </main>
    </div>
  );
}

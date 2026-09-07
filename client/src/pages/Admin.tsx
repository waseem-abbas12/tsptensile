import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent, DEFAULT_CONTENT, type Project, type Testimonial, type FaqItem, type Office } from "@/contexts/ContentContext";
import { Plus, Trash2, Save, Download, Upload, RotateCcw, LogOut, ChevronDown, ChevronUp, Eye } from "lucide-react";
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
        <Field label="WhatsApp Number (digits only, e.g. 923001234567)" value={local.whatsapp} onChange={set("whatsapp")} />
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
    setLocal(ps => [...ps, { id, title: "New Project", type: "Commercial", city: "Lahore", system: "", image: "/manus-storage/tensile-hero_d649ec63.jpg", year: "2025", area: "", description: "" }]);
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

// ── Main Admin Panel ──────────────────────────────────────────────────────

const SECTIONS = [
  { id: "company", label: "🏢 Company Info" },
  { id: "ceo", label: "👤 CEO Profile" },
  { id: "projects", label: "🏗️ Projects" },
  { id: "testimonials", label: "🗣️ Testimonials" },
  { id: "faq", label: "❓ FAQ" },
  { id: "offices", label: "📍 Offices" },
];

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("ff_admin") === "1");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [active, setActive] = useState("company");
  const { resetToDefaults, exportData, importData } = useContent();
  const fileRef = useRef<HTMLInputElement>(null);

  const login = () => {
    if (password === ADMIN_PASSWORD) { sessionStorage.setItem("ff_admin", "1"); setAuthed(true); }
    else { setError(true); setTimeout(() => setError(false), 1500); }
  };

  const logout = () => { sessionStorage.removeItem("ff_admin"); setAuthed(false); };

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
    return (
      <div className="adm-login">
        <div className="adm-login-box">
          <h1>Admin Panel</h1>
          <p>Form/Field website content manager</p>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            className={error ? "error" : ""}
            autoFocus
          />
          {error && <span className="adm-error">Galat password hai</span>}
          <button className="adm-btn adm-btn-primary" onClick={login}>Login</button>
          <Link href="/" className="adm-back-link">← Website pe wapas jao</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="adm-shell">
      {/* Sidebar */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar-top">
          <div className="adm-logo">FF Admin</div>
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
            {active === "projects" && <ProjectsSection />}
            {active === "testimonials" && <TestimonialsSection />}
            {active === "faq" && <FaqSection />}
            {active === "offices" && <OfficesSection />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

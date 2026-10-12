import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useContent,
  DEFAULT_CONTENT,
  DEFAULT_CALCULATOR_CONFIG,
  DEFAULT_APP_SETTINGS,
  type Project,
  type Testimonial,
  type FaqItem,
  type Office,
  type CalculatorConfig,
  type FabricRate,
  type StructureTypeOption,
  type SteelFinishOption,
  type CityOption,
  type AppSettings
} from "@/contexts/ContentContext";
import {
  Plus,
  Trash2,
  Save,
  Download,
  Upload,
  RotateCcw,
  LogOut,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  ShieldCheck,
  Calculator,
  Smartphone,
  Layers,
  Building2,
  User,
  MessageSquareQuote,
  HelpCircle,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Sliders,
  DollarSign,
  Tag,
  Search,
  Image as ImageIcon
} from "lucide-react";
import { Link } from "wouter";

const ADMIN_PASSWORD = "formfield2026";

// Built-in high-resolution project image presets for 1-click selection
const IMAGE_PRESETS = [
  { label: "Hero Flagship", path: "/images/hero.jpg" },
  { label: "Commercial Canopy", path: "/images/commercial.jpg" },
  { label: "Walkway Corridor", path: "/images/walkway.jpg" },
  { label: "Luxury Cantilever Car Shade", path: "/images/luxury_car_parking.jpg" },
  { label: "Industrial Warehouse PEB", path: "/images/project_industrial_warehouse.jpg" },
  { label: "Sports Padel Arena", path: "/images/project_sports_arena_padel.jpg" },
  { label: "Residential Villa Porch", path: "/images/project_residence_porch.jpg" },
  { label: "EV Charging Canopy", path: "/images/project_ev_charging_canopy.jpg" },
  { label: "Engineering Joint Detail", path: "/images/detail.jpg" }
];

// ── Reusable Input Components ─────────────────────────────────────────────

function Field({
  label,
  value,
  onChange,
  type = "text",
  rows,
  placeholder,
  helper
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  rows?: number;
  placeholder?: string;
  helper?: string;
}) {
  return (
    <div className="adm-field">
      <label>{label}</label>
      {rows ? (
        <textarea
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {helper && <span style={{ fontSize: "11px", color: "#64748B", marginTop: "2px" }}>{helper}</span>}
    </div>
  );
}

function SaveBar({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  return (
    <div className="adm-savebar">
      <button
        type="button"
        className="adm-btn adm-btn-primary"
        onClick={onSave}
        style={{
          background: saved ? "#10B981" : "#2D6A68",
          boxShadow: "0 4px 14px rgba(45, 106, 104, 0.25)",
          borderRadius: "8px",
          padding: "11px 24px",
          fontSize: "14px",
          fontWeight: 700,
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          transition: "all 0.2s"
        }}
      >
        <Save size={16} /> {saved ? "Changes Saved to Global Database ✓" : "Save All Changes (ڈیٹا محفوظ کریں)"}
      </button>
    </div>
  );
}

// ── 1. Comprehensive Calculator Section (Full Customization) ──────────────

function CalculatorSection() {
  const { content, updateCalculator } = useContent();
  const [local, setLocal] = useState<CalculatorConfig>(() => ({
    ...DEFAULT_CALCULATOR_CONFIG,
    ...(content.calculator || {}),
    fabrics: (content.calculator?.fabrics || DEFAULT_CALCULATOR_CONFIG.fabrics).map((f) => ({ ...f })),
    structures: (content.calculator?.structures || DEFAULT_CALCULATOR_CONFIG.structures).map((s) => ({ ...s })),
    steelFinishes: (content.calculator?.steelFinishes || DEFAULT_CALCULATOR_CONFIG.steelFinishes).map((st) => ({ ...st })),
    cities: (content.calculator?.cities || DEFAULT_CALCULATOR_CONFIG.cities).map((c) => ({ ...c }))
  }));

  const [activeSubTab, setActiveSubTab] = useState<"fabrics" | "structures" | "steel" | "cities" | "rules">("fabrics");
  const [saved, setSaved] = useState(false);

  // ── Fabric Actions ──
  const addFabric = () => {
    const id = "fabric_" + Date.now();
    const newFabric: FabricRate = {
      id,
      name: "New Imported Tensile Membrane",
      origin: "Germany",
      gsm: "950 GSM",
      ratePerSqFt: 750,
      warranty: "15 Years",
      lifespan: "20–25 Years",
      desc: "High tenacity PVDF lacquered membrane for architectural tensile roofing.",
      recommended: false
    };
    setLocal((p) => ({ ...p, fabrics: [...p.fabrics, newFabric] }));
  };

  const updateFabric = (index: number, patch: Partial<FabricRate>) => {
    setLocal((p) => {
      const copy = [...p.fabrics];
      copy[index] = { ...copy[index], ...patch };
      return { ...p, fabrics: copy };
    });
  };

  const removeFabric = (index: number) => {
    if (local.fabrics.length <= 1) {
      alert("At least 1 fabric option is required for calculator operation.");
      return;
    }
    if (confirm("Are you sure you want to remove this fabric membrane?")) {
      setLocal((p) => {
        const copy = [...p.fabrics];
        copy.splice(index, 1);
        return { ...p, fabrics: copy };
      });
    }
  };

  // ── Structure Model Actions ──
  const addStructure = () => {
    const id = "struct_" + Date.now();
    const newStructure: StructureTypeOption = {
      id,
      name: "New Custom Tensile Structure Model",
      multiplier: 1.15,
      defaultLengthFt: 20,
      defaultWidthFt: 15,
      desc: "Turnkey architectural tensile canopy with custom columns and foundations."
    };
    setLocal((p) => ({ ...p, structures: [...p.structures, newStructure] }));
  };

  const updateStructure = (index: number, patch: Partial<StructureTypeOption>) => {
    setLocal((p) => {
      const copy = [...p.structures];
      copy[index] = { ...copy[index], ...patch };
      return { ...p, structures: copy };
    });
  };

  const removeStructure = (index: number) => {
    if (local.structures.length <= 1) {
      alert("At least 1 structure model is required.");
      return;
    }
    if (confirm("Remove this structure shape option?")) {
      setLocal((p) => {
        const copy = [...p.structures];
        copy.splice(index, 1);
        return { ...p, structures: copy };
      });
    }
  };

  // ── Steel Finish Actions ──
  const addSteelFinish = () => {
    const id = "steel_" + Date.now();
    const newFinish: SteelFinishOption = {
      id,
      name: "New Steel Framework Treatment",
      rateAddonPerSqFt: 150,
      desc: "Specialized anti-corrosion protective finish for extreme exterior longevity."
    };
    setLocal((p) => ({ ...p, steelFinishes: [...p.steelFinishes, newFinish] }));
  };

  const updateSteelFinish = (index: number, patch: Partial<SteelFinishOption>) => {
    setLocal((p) => {
      const copy = [...p.steelFinishes];
      copy[index] = { ...copy[index], ...patch };
      return { ...p, steelFinishes: copy };
    });
  };

  const removeSteelFinish = (index: number) => {
    if (local.steelFinishes.length <= 1) {
      alert("At least 1 steel finish option is required.");
      return;
    }
    if (confirm("Remove this steel finish?")) {
      setLocal((p) => {
        const copy = [...p.steelFinishes];
        copy.splice(index, 1);
        return { ...p, steelFinishes: copy };
      });
    }
  };

  // ── City Actions ──
  const addCity = () => {
    const id = "city_" + Date.now();
    const newCity: CityOption = {
      id,
      name: "New Pakistani City / District",
      multiplier: 1.05,
      desc: "Engineering team deployment, transport and turnkey laser survey coverage."
    };
    setLocal((p) => ({ ...p, cities: [...p.cities, newCity] }));
  };

  const updateCity = (index: number, patch: Partial<CityOption>) => {
    setLocal((p) => {
      const copy = [...p.cities];
      copy[index] = { ...copy[index], ...patch };
      return { ...p, cities: copy };
    });
  };

  const removeCity = (index: number) => {
    if (local.cities.length <= 1) {
      alert("At least 1 city is required.");
      return;
    }
    if (confirm("Remove this city option?")) {
      setLocal((p) => {
        const copy = [...p.cities];
        copy.splice(index, 1);
        return { ...p, cities: copy };
      });
    }
  };

  const save = () => {
    updateCalculator(local);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="adm-section">
      <div className="adm-section-header" style={{ alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <h2>Master Estimation Calculator Manager</h2>
          <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: "13.5px" }}>
            Add, edit, or delete fabrics, structure categories, steel finishes, and city rates. Synchronizes with both the Website and Mobile App.
          </p>
        </div>
        <Link
          href="/calculator"
          target="_blank"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "#ECFDF5",
            border: "1px solid #A7F3D0",
            color: "#065F46",
            padding: "8px 14px",
            borderRadius: "8px",
            fontSize: "12.5px",
            fontWeight: 700,
            textDecoration: "none"
          }}
        >
          <Eye size={14} /> Open Live Calculator ↗
        </Link>
      </div>

      {/* Sub Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          padding: "6px",
          background: "#E2E8F0",
          borderRadius: "12px",
          marginBottom: "24px"
        }}
      >
        <button
          type="button"
          onClick={() => setActiveSubTab("fabrics")}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
            background: activeSubTab === "fabrics" ? "#FFFFFF" : "transparent",
            color: activeSubTab === "fabrics" ? "#0F172A" : "#475569",
            boxShadow: activeSubTab === "fabrics" ? "0 2px 6px rgba(0,0,0,0.08)" : "none"
          }}
        >
          🧵 Fabrics &amp; Membranes ({local.fabrics.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("structures")}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
            background: activeSubTab === "structures" ? "#FFFFFF" : "transparent",
            color: activeSubTab === "structures" ? "#0F172A" : "#475569",
            boxShadow: activeSubTab === "structures" ? "0 2px 6px rgba(0,0,0,0.08)" : "none"
          }}
        >
          🏛️ Structure Models ({local.structures.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("steel")}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
            background: activeSubTab === "steel" ? "#FFFFFF" : "transparent",
            color: activeSubTab === "steel" ? "#0F172A" : "#475569",
            boxShadow: activeSubTab === "steel" ? "0 2px 6px rgba(0,0,0,0.08)" : "none"
          }}
        >
          🔩 Steel Finishes ({local.steelFinishes.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("cities")}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
            background: activeSubTab === "cities" ? "#FFFFFF" : "transparent",
            color: activeSubTab === "cities" ? "#0F172A" : "#475569",
            boxShadow: activeSubTab === "cities" ? "0 2px 6px rgba(0,0,0,0.08)" : "none"
          }}
        >
          📍 Cities &amp; Logistics ({local.cities.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("rules")}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
            background: activeSubTab === "rules" ? "#FFFFFF" : "transparent",
            color: activeSubTab === "rules" ? "#0F172A" : "#475569",
            boxShadow: activeSubTab === "rules" ? "0 2px 6px rgba(0,0,0,0.08)" : "none"
          }}
        >
          ⚙️ General Rules &amp; WhatsApp
        </button>
      </div>

      {/* ── Subtab 1: Fabrics ── */}
      {activeSubTab === "fabrics" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
              Fabric Membrane Options (فیبرک ریٹس فی مربع فٹ)
            </h3>
            <button
              type="button"
              onClick={addFabric}
              className="adm-btn adm-btn-primary"
              style={{ borderRadius: "8px", padding: "8px 16px", fontSize: "13px" }}
            >
              <Plus size={15} /> Add New Fabric Membrane
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {local.fabrics.map((f, i) => (
              <div
                key={f.id}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #CBD5E1",
                  borderRadius: "12px",
                  padding: "18px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  position: "relative"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", borderBottom: "1px solid #F1F5F9", paddingBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#0E2A38", color: "#FFFFFF", fontSize: "11px", fontWeight: 700, display: "grid", placeItems: "center" }}>
                      {i + 1}
                    </span>
                    <strong style={{ fontSize: "15px", color: "var(--ink)" }}>{f.name}</strong>
                    {f.recommended && (
                      <span style={{ background: "#FEF3C7", color: "#92400E", padding: "2px 8px", borderRadius: "100px", fontSize: "11px", fontWeight: 700 }}>
                        ⭐ Recommended
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFabric(i)}
                    className="adm-delete-btn"
                    style={{ borderRadius: "6px" }}
                    title="Delete fabric"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>

                <div className="adm-grid-2">
                  <Field label="Fabric Name (Display Title)" value={f.name} onChange={(v) => updateFabric(i, { name: v })} />
                  <Field
                    label="Rate (PKR per Square Foot)"
                    type="number"
                    value={String(f.ratePerSqFt)}
                    onChange={(v) => updateFabric(i, { ratePerSqFt: Number(v) || 0 })}
                  />
                  <Field label="Country of Origin" value={f.origin} onChange={(v) => updateFabric(i, { origin: v })} placeholder="e.g. Germany, France, South Korea" />
                  <Field label="Weight / Density (GSM)" value={f.gsm} onChange={(v) => updateFabric(i, { gsm: v })} placeholder="e.g. 900 GSM, 1050 GSM" />
                  <Field label="Warranty" value={f.warranty} onChange={(v) => updateFabric(i, { warranty: v })} placeholder="e.g. 15 Years" />
                  <Field label="Estimated Lifespan" value={f.lifespan} onChange={(v) => updateFabric(i, { lifespan: v })} placeholder="e.g. 20–25 Years" />
                </div>

                <Field label="Technical Description" value={f.desc} onChange={(v) => updateFabric(i, { desc: v })} rows={2} />

                <label style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600, color: "#334155", cursor: "pointer", marginTop: "4px" }}>
                  <input
                    type="checkbox"
                    checked={!!f.recommended}
                    onChange={(e) => updateFabric(i, { recommended: e.target.checked })}
                    style={{ width: "16px", height: "16px", cursor: "pointer" }}
                  />
                  <span>Mark as &quot;Recommended / Most Popular&quot; (سب سے زیادہ منتخب کردہ)</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Subtab 2: Structures ── */}
      {activeSubTab === "structures" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
              Structure Shape Models &amp; Categories (سٹرکچر ماڈلز)
            </h3>
            <button
              type="button"
              onClick={addStructure}
              className="adm-btn adm-btn-primary"
              style={{ borderRadius: "8px", padding: "8px 16px", fontSize: "13px" }}
            >
              <Plus size={15} /> Add New Structure Model
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {local.structures.map((s, i) => (
              <div
                key={s.id}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #CBD5E1",
                  borderRadius: "12px",
                  padding: "18px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", borderBottom: "1px solid #F1F5F9", paddingBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#2D6A68", color: "#FFFFFF", fontSize: "11px", fontWeight: 700, display: "grid", placeItems: "center" }}>
                      {i + 1}
                    </span>
                    <strong style={{ fontSize: "15px", color: "var(--ink)" }}>{s.name}</strong>
                    <span style={{ background: "#F1F5F9", color: "#475569", padding: "2px 8px", borderRadius: "100px", fontSize: "11px", fontWeight: 600 }}>
                      Multiplier: {s.multiplier}x
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeStructure(i)}
                    className="adm-delete-btn"
                    style={{ borderRadius: "6px" }}
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>

                <div className="adm-grid-2">
                  <Field label="Structure Name" value={s.name} onChange={(v) => updateStructure(i, { name: v })} />
                  <Field
                    label="Pricing Multiplier (1.0 = Base, 1.15 = +15%)"
                    type="number"
                    value={String(s.multiplier)}
                    onChange={(v) => updateStructure(i, { multiplier: Number(v) || 1 })}
                    helper="Complex shapes take more structural steel and fabrication labor"
                  />
                  <Field
                    label="Default Length (Feet)"
                    type="number"
                    value={String(s.defaultLengthFt)}
                    onChange={(v) => updateStructure(i, { defaultLengthFt: Number(v) || 18 })}
                  />
                  <Field
                    label="Default Width (Feet)"
                    type="number"
                    value={String(s.defaultWidthFt)}
                    onChange={(v) => updateStructure(i, { defaultWidthFt: Number(v) || 10 })}
                  />
                </div>
                <Field label="Description / Applications" value={s.desc} onChange={(v) => updateStructure(i, { desc: v })} rows={2} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Subtab 3: Steel Finishes ── */}
      {activeSubTab === "steel" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
              Steel Framework &amp; Coating Treatments (اسٹیل فریم اور کوٹنگز)
            </h3>
            <button
              type="button"
              onClick={addSteelFinish}
              className="adm-btn adm-btn-primary"
              style={{ borderRadius: "8px", padding: "8px 16px", fontSize: "13px" }}
            >
              <Plus size={15} /> Add New Steel Finish
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {local.steelFinishes.map((st, i) => (
              <div
                key={st.id}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #CBD5E1",
                  borderRadius: "12px",
                  padding: "18px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", borderBottom: "1px solid #F1F5F9", paddingBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#D97706", color: "#FFFFFF", fontSize: "11px", fontWeight: 700, display: "grid", placeItems: "center" }}>
                      {i + 1}
                    </span>
                    <strong style={{ fontSize: "15px", color: "var(--ink)" }}>{st.name}</strong>
                    <span style={{ background: st.rateAddonPerSqFt === 0 ? "#DCFCE7" : "#FEF3C7", color: st.rateAddonPerSqFt === 0 ? "#166534" : "#92400E", padding: "2px 8px", borderRadius: "100px", fontSize: "11px", fontWeight: 700 }}>
                      {st.rateAddonPerSqFt === 0 ? "Standard (Included)" : `+PKR ${st.rateAddonPerSqFt} / sq.ft`}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSteelFinish(i)}
                    className="adm-delete-btn"
                    style={{ borderRadius: "6px" }}
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>

                <div className="adm-grid-2">
                  <Field label="Steel Finish Name" value={st.name} onChange={(v) => updateSteelFinish(i, { name: v })} />
                  <Field
                    label="Rate Add-on in PKR / Sq. Ft (0 for included standard)"
                    type="number"
                    value={String(st.rateAddonPerSqFt)}
                    onChange={(v) => updateSteelFinish(i, { rateAddonPerSqFt: Number(v) || 0 })}
                  />
                </div>
                <Field label="Specification Description" value={st.desc} onChange={(v) => updateSteelFinish(i, { desc: v })} rows={2} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Subtab 4: Cities ── */}
      {activeSubTab === "cities" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
              Pakistani Cities &amp; Logistics Multipliers (شہر اور لاجسٹکس ریٹس)
            </h3>
            <button
              type="button"
              onClick={addCity}
              className="adm-btn adm-btn-primary"
              style={{ borderRadius: "8px", padding: "8px 16px", fontSize: "13px" }}
            >
              <Plus size={15} /> Add New City / Region
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {local.cities.map((c, i) => (
              <div
                key={c.id}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #CBD5E1",
                  borderRadius: "12px",
                  padding: "16px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <strong style={{ fontSize: "14px", color: "var(--ink)" }}>{c.name}</strong>
                  <button
                    type="button"
                    onClick={() => removeCity(i)}
                    className="adm-delete-btn"
                    style={{ borderRadius: "6px", padding: "4px 8px" }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <Field label="City Name" value={c.name} onChange={(v) => updateCity(i, { name: v })} />
                <Field
                  label="Logistics Multiplier (1.0 = Base, 1.05 = +5%)"
                  type="number"
                  value={String(c.multiplier)}
                  onChange={(v) => updateCity(i, { multiplier: Number(v) || 1 })}
                />
                <Field label="Coverage Description" value={c.desc} onChange={(v) => updateCity(i, { desc: v })} rows={2} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Subtab 5: General Rules ── */}
      {activeSubTab === "rules" && (
        <div style={{ background: "#FFFFFF", border: "1px solid #CBD5E1", borderRadius: "14px", padding: "24px" }}>
          <h3 style={{ margin: "0 0 18px", fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
            General Pricing Rules &amp; WhatsApp Consultation
          </h3>

          <div className="adm-grid-2">
            <Field
              label="Minimum Order Area (Square Feet)"
              type="number"
              value={String(local.minOrderSqFt)}
              onChange={(v) => setLocal((p) => ({ ...p, minOrderSqFt: Number(v) || 0 }))}
              helper="Orders below this threshold will default to minimum price"
            />
            <Field
              label="Minimum Order Price in PKR"
              type="number"
              value={String(local.minOrderAmountPkr)}
              onChange={(v) => setLocal((p) => ({ ...p, minOrderAmountPkr: Number(v) || 0 }))}
              helper="Base turnkey mobilization charge"
            />
            <Field
              label="WhatsApp Recipient Number (digits only, e.g. 923024001063)"
              value={local.whatsappRecipient}
              onChange={(v) => setLocal((p) => ({ ...p, whatsappRecipient: v }))}
              helper="Where customers send their instant quote summary"
            />
            <Field
              label="Promotional Discount Percentage (%)"
              type="number"
              value={String(local.discountPercent || 0)}
              onChange={(v) => setLocal((p) => ({ ...p, discountPercent: Number(v) || 0 }))}
              helper="Optional seasonal discount deducted from estimate"
            />
          </div>

          <Field
            label="Turnkey Calculation Disclaimer & Notes (Shows on generated estimate & PDF)"
            value={local.disclaimer}
            onChange={(v) => setLocal((p) => ({ ...p, disclaimer: v }))}
            rows={3}
          />
        </div>
      )}

      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

// ── 2. Mobile App & Top Announcement Center ───────────────────────────────

function AppSection() {
  const { content, updateAppSettings } = useContent();
  const [local, setLocal] = useState<AppSettings>(() => ({
    ...DEFAULT_APP_SETTINGS,
    ...(content.appSettings || {})
  }));
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateAppSettings(local);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h2>Mobile App &amp; Real-Time Announcement Desk</h2>
          <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: "13.5px" }}>
            Control top notification bars, app promotions, floating navigation bars, and direct APK/Store links across the entire website and mobile app.
          </p>
        </div>
        <Link
          href="/app"
          target="_blank"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "#EFF6FF",
            border: "1px solid #BFDBFE",
            color: "#1E40AF",
            padding: "8px 14px",
            borderRadius: "8px",
            fontSize: "12.5px",
            fontWeight: 700,
            textDecoration: "none"
          }}
        >
          <Smartphone size={14} /> Open Mobile App Page ↗
        </Link>
      </div>

      <div style={{ background: "#FFFFFF", border: "1px solid #CBD5E1", borderRadius: "14px", padding: "24px", marginBottom: "20px" }}>
        <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 700, color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
          <Sparkles size={18} style={{ color: "#D97706" }} />
          Top Announcement Banner (ویب سائٹ کے اوپر اہم نوٹس بار)
        </h3>

        <div style={{ marginBottom: "18px" }}>
          <label style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "14px", fontWeight: 700, color: "#0F172A", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={local.announcementEnabled}
              onChange={(e) => setLocal((p) => ({ ...p, announcementEnabled: e.target.checked }))}
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
            <span>Show Announcement Bar at top of Website &amp; Mobile App</span>
          </label>
        </div>

        <div className="adm-grid-2">
          <Field
            label="Announcement Badge Label"
            value={local.announcementBadge}
            onChange={(v) => setLocal((p) => ({ ...p, announcementBadge: v }))}
            placeholder="e.g. OFFICIAL APP, EID OFFER, 10% OFF"
          />
          <Field
            label="Banner Promotional Subtext"
            value={local.bannerDiscountText}
            onChange={(v) => setLocal((p) => ({ ...p, bannerDiscountText: v }))}
            placeholder="e.g. Get Free 3D Concept Renders on Mobile App"
          />
        </div>

        <Field
          label="Urdu Announcement Text (اردو نوٹس)"
          value={local.announcementTextUrdu}
          onChange={(v) => setLocal((p) => ({ ...p, announcementTextUrdu: v }))}
          rows={2}
        />

        <Field
          label="English Announcement Text (متبادل انگریزی ٹیکسٹ)"
          value={local.announcementTextEn}
          onChange={(v) => setLocal((p) => ({ ...p, announcementTextEn: v }))}
          rows={2}
        />
      </div>

      <div style={{ background: "#FFFFFF", border: "1px solid #CBD5E1", borderRadius: "14px", padding: "24px", marginBottom: "20px" }}>
        <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 700, color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
          <Smartphone size={18} style={{ color: "#2563EB" }} />
          Mobile Navigation &amp; Store Links
        </h3>

        <div style={{ marginBottom: "18px" }}>
          <label style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "14px", fontWeight: 700, color: "#0F172A", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={local.showAppFloatingBanner}
              onChange={(e) => setLocal((p) => ({ ...p, showAppFloatingBanner: e.target.checked }))}
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
            <span>Enable Floating Bottom App Bar on Mobile Screens (موبائل نیچے نیویگیشن بار)</span>
          </label>
        </div>

        <div className="adm-grid-2">
          <Field
            label="Direct APK Download URL (Optional external file link)"
            value={local.appDirectApkUrl || ""}
            onChange={(v) => setLocal((p) => ({ ...p, appDirectApkUrl: v }))}
            placeholder="e.g. https://tsptensile.com/downloads/tsp-app.apk"
          />
          <Field
            label="Google Play Store Link (Optional)"
            value={local.appPlayStoreUrl || ""}
            onChange={(v) => setLocal((p) => ({ ...p, appPlayStoreUrl: v }))}
            placeholder="e.g. https://play.google.com/store/apps/details?id=..."
          />
        </div>
      </div>

      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

// ── 3. Projects Portfolio Section (with 1-Click Image Presets) ─────────────

function ProjectsSection() {
  const { content, setProjects } = useContent();
  const [projects, setLocal] = useState<Project[]>(content.projects.map((p) => ({ ...p })));
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [saved, setSaved] = useState(false);

  const update = (id: string, k: keyof Project, v: string) =>
    setLocal((ps) => ps.map((p) => (p.id === id ? { ...p, [k]: v } : p)));

  const remove = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setLocal((ps) => ps.filter((p) => p.id !== id));
    }
  };

  const add = () => {
    const id = "proj_" + Date.now();
    setLocal((ps) => [
      {
        id,
        title: "New Architectural Tensile Project",
        type: "Car Parking",
        city: "Lahore",
        system: "German Mehler PVDF 900 GSM + Heavy Steel Mast",
        image: "/images/luxury_car_parking.jpg",
        year: "2025",
        area: "1,200 sq.ft",
        description: "Custom turnkey cantilever tensile shade engineered for high-wind deflection and thermal comfort."
      },
      ...ps
    ]);
    setExpanded(id);
  };

  const save = () => {
    setProjects(projects);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h2>Projects Portfolio Manager ({projects.length})</h2>
          <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: "13.5px" }}>
            Add, edit, or remove completed architectural tensile projects shown on the website and mobile app.
          </p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={add} style={{ borderRadius: "8px" }}>
          <Plus size={15} /> Add New Project
        </button>
      </div>

      {/* Search Input */}
      <div style={{ position: "relative", marginBottom: "16px" }}>
        <Search size={16} style={{ position: "absolute", left: "14px", top: "12px", color: "#94A3B8" }} />
        <input
          type="text"
          placeholder="Search projects by title, city (Lahore, Islamabad...), or type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px 10px 38px",
            borderRadius: "10px",
            border: "1px solid #CBD5E1",
            fontSize: "13.5px"
          }}
        />
      </div>

      <div className="adm-list">
        {filtered.map((p) => (
          <div key={p.id} className="adm-list-item" style={{ borderRadius: "10px", overflow: "hidden" }}>
            <div
              className="adm-list-item-header"
              onClick={() => setExpanded(expanded === p.id ? null : p.id)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <img
                  src={p.image}
                  alt=""
                  style={{ width: "42px", height: "42px", objectFit: "cover", borderRadius: "6px", border: "1px solid #E2E8F0" }}
                  onError={(e) => { (e.target as HTMLImageElement).src = "/images/hero.jpg"; }}
                />
                <div>
                  <strong>{p.title}</strong>
                  <span className="adm-tag">{p.type}</span>
                  <span className="adm-muted">{p.city} · {p.year}</span>
                </div>
              </div>
              <div className="adm-list-actions">
                <button
                  type="button"
                  className="adm-delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(p.id);
                  }}
                >
                  <Trash2 size={14} />
                </button>
                {expanded === p.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>

            <AnimatePresence>
              {expanded === p.id && (
                <motion.div
                  className="adm-list-item-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ borderTop: "1px solid #F1F5F9", paddingTop: "16px" }}
                >
                  <div className="adm-grid-2">
                    <Field label="Project Title" value={p.title} onChange={(v) => update(p.id, "title", v)} />
                    <Field label="Category / Type (e.g. Car Parking, Commercial, Walkway)" value={p.type} onChange={(v) => update(p.id, "type", v)} />
                    <Field label="City" value={p.city} onChange={(v) => update(p.id, "city", v)} />
                    <Field label="Year Completed" value={p.year} onChange={(v) => update(p.id, "year", v)} />
                    <Field label="Covered Area (Sq. Ft)" value={p.area} onChange={(v) => update(p.id, "area", v)} />
                    <Field label="Structural Specification / System" value={p.system} onChange={(v) => update(p.id, "system", v)} />
                  </div>

                  <Field label="Description" value={p.description} onChange={(v) => update(p.id, "description", v)} rows={3} />

                  <div style={{ marginTop: "12px" }}>
                    <Field label="Image URL or Path" value={p.image} onChange={(v) => update(p.id, "image", v)} />
                    <div style={{ marginTop: "6px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        Quick Presets (Click to set):
                      </span>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "6px" }}>
                        {IMAGE_PRESETS.map((preset) => (
                          <button
                            key={preset.path}
                            type="button"
                            onClick={() => update(p.id, "image", preset.path)}
                            style={{
                              background: p.image === preset.path ? "#2D6A68" : "#F1F5F9",
                              color: p.image === preset.path ? "#FFFFFF" : "#334155",
                              border: "none",
                              borderRadius: "6px",
                              padding: "4px 8px",
                              fontSize: "11px",
                              fontWeight: 600,
                              cursor: "pointer"
                            }}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
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

// ── 4. Company Info Section ───────────────────────────────────────────────

function CompanySection() {
  const { content, updateCompany } = useContent();
  const [local, setLocal] = useState({ ...content.company });
  const [saved, setSaved] = useState(false);

  const set = (k: keyof typeof local) => (v: string) => setLocal((p) => ({ ...p, [k]: v }));
  const save = () => {
    updateCompany(local);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h2>Company Information &amp; Contact Desk</h2>
          <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: "13.5px" }}>
            Controls company branding, contact numbers, email, working hours, and website hero headlines.
          </p>
        </div>
      </div>

      <div style={{ background: "#FFFFFF", border: "1px solid #CBD5E1", borderRadius: "14px", padding: "24px" }}>
        <div className="adm-grid-2">
          <Field label="Company Name" value={local.name} onChange={set("name")} />
          <Field label="Tagline (Hero Eyebrow)" value={local.tagline} onChange={set("tagline")} />
          <Field
            label="WhatsApp Number (digits only, e.g. 923024001063)"
            value={local.whatsapp}
            onChange={set("whatsapp")}
            helper="Synchronizes Header, Footer, Floating Buttons, Calculator, and App!"
          />
          <Field label="Main Phone" value={local.phone} onChange={set("phone")} />
          <Field label="Email Address" value={local.email} onChange={set("email")} />
          <Field label="Working Hours" value={local.workingHours} onChange={set("workingHours")} />
        </div>

        <Field label="Hero Main Heading" value={local.heroHeading} onChange={set("heroHeading")} rows={2} />
        <Field label="Hero Subheading / Lead Paragraph" value={local.heroSub} onChange={set("heroSub")} rows={3} />
      </div>

      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

// ── 5. CEO Profile Section ────────────────────────────────────────────────

function CeoSection() {
  const { content, updateCeo } = useContent();
  const [local, setLocal] = useState({ ...content.ceo, quotes: [...content.ceo.quotes] });
  const [saved, setSaved] = useState(false);

  const set = (k: keyof typeof local) => (v: string) => setLocal((p) => ({ ...p, [k]: v }));
  const setQuote = (i: number, v: string) =>
    setLocal((p) => {
      const q = [...p.quotes];
      q[i] = v;
      return { ...p, quotes: q };
    });
  const addQuote = () => setLocal((p) => ({ ...p, quotes: [...p.quotes, ""] }));
  const removeQuote = (i: number) =>
    setLocal((p) => {
      const q = [...p.quotes];
      q.splice(i, 1);
      return { ...p, quotes: q };
    });
  const save = () => {
    updateCeo(local);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h2>CEO Profile &amp; Leadership</h2>
          <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: "13.5px" }}>
            Founder credentials, years in engineering, project metrics, and architectural quotes.
          </p>
        </div>
      </div>

      <div style={{ background: "#FFFFFF", border: "1px solid #CBD5E1", borderRadius: "14px", padding: "24px" }}>
        <div className="adm-grid-2">
          <Field label="CEO Name" value={local.name} onChange={set("name")} />
          <Field label="Title / Designation" value={local.title} onChange={set("title")} />
          <Field label="Years of Experience (Stat)" value={local.years} onChange={set("years")} />
          <Field label="Projects Completed (Stat)" value={local.projects} onChange={set("projects")} />
          <Field label="Team Size (Stat)" value={local.teamSize} onChange={set("teamSize")} />
        </div>
        <Field label="Executive Biography" value={local.intro} onChange={set("intro")} rows={5} />

        <div className="adm-subsection" style={{ marginTop: "20px", borderRadius: "10px" }}>
          <div className="adm-subsection-header">
            <h3>Featured Quotes</h3>
            <button className="adm-btn adm-btn-ghost" onClick={addQuote}>
              <Plus size={14} /> Add Quote
            </button>
          </div>
          {local.quotes.map((q, i) => (
            <div key={i} className="adm-row-with-delete">
              <Field label={`Quote #${i + 1}`} value={q} onChange={(v) => setQuote(i, v)} rows={3} />
              <button className="adm-delete-btn" onClick={() => removeQuote(i)}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

// ── 6. Testimonials Section ───────────────────────────────────────────────

function TestimonialsSection() {
  const { content, setTestimonials } = useContent();
  const [items, setItems] = useState<Testimonial[]>(content.testimonials.map((t) => ({ ...t })));
  const [saved, setSaved] = useState(false);

  const update = (i: number, k: keyof Testimonial, v: string) =>
    setItems((ts) => ts.map((t, idx) => (idx === i ? { ...t, [k]: v } : t)));
  const remove = (i: number) => {
    if (confirm("Delete this client review?")) {
      setItems((ts) => ts.filter((_, idx) => idx !== i));
    }
  };
  const add = () => setItems((ts) => [...ts, { quote: "", author: "Valued Client", designation: "Commercial Client", project: "Tensile Project" }]);
  const save = () => {
    setTestimonials(items);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h2>Client Reviews &amp; Testimonials ({items.length})</h2>
          <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: "13.5px" }}>
            Add, update, or remove real client feedback and verified architectural reviews.
          </p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={add} style={{ borderRadius: "8px" }}>
          <Plus size={14} /> Add Testimonial
        </button>
      </div>

      <div className="adm-list">
        {items.map((t, i) => (
          <div key={i} className="adm-list-item adm-list-item-open" style={{ borderRadius: "10px" }}>
            <div className="adm-list-item-header">
              <strong>{t.author || `Testimonial #${i + 1}`}</strong>
              <button className="adm-delete-btn" onClick={() => remove(i)}>
                <Trash2 size={14} /> Remove
              </button>
            </div>
            <div className="adm-list-item-body" style={{ height: "auto", opacity: 1 }}>
              <Field label="Quote Text" value={t.quote} onChange={(v) => update(i, "quote", v)} rows={3} />
              <div className="adm-grid-3">
                <Field label="Client Name" value={t.author} onChange={(v) => update(i, "author", v)} />
                <Field label="Designation / Organization" value={t.designation} onChange={(v) => update(i, "designation", v)} />
                <Field label="Project Info" value={t.project} onChange={(v) => update(i, "project", v)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

// ── 7. FAQ Knowledge Base Section ─────────────────────────────────────────

function FaqSection() {
  const { content, setFaqCategories } = useContent();
  const [cats, setCats] = useState(
    content.faqCategories.map((c) => ({ ...c, faqs: c.faqs.map((f) => ({ ...f })) }))
  );
  const [saved, setSaved] = useState(false);

  const updateCategoryName = (ci: number, name: string) =>
    setCats((cs) => cs.map((c, i) => (i === ci ? { ...c, name } : c)));

  const addCategory = () =>
    setCats((cs) => [...cs, { name: "New Category", faqs: [{ question: "Sample Question?", answer: "Sample Answer." }] }]);

  const removeCategory = (ci: number) => {
    if (confirm("Remove this FAQ category and all its questions?")) {
      setCats((cs) => cs.filter((_, i) => i !== ci));
    }
  };

  const updateQ = (ci: number, qi: number, k: keyof FaqItem, v: string) =>
    setCats((cs) =>
      cs.map((c, i) =>
        i === ci ? { ...c, faqs: c.faqs.map((f, j) => (j === qi ? { ...f, [k]: v } : f)) } : c
      )
    );

  const addQ = (ci: number) =>
    setCats((cs) =>
      cs.map((c, i) => (i === ci ? { ...c, faqs: [...c.faqs, { question: "", answer: "" }] } : c))
    );

  const removeQ = (ci: number, qi: number) =>
    setCats((cs) =>
      cs.map((c, i) => (i === ci ? { ...c, faqs: c.faqs.filter((_, j) => j !== qi) } : c))
    );

  const save = () => {
    setFaqCategories(cats);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h2>FAQ Knowledge Base Manager</h2>
          <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: "13.5px" }}>
            Add and manage frequently asked questions about tensile fabric longevity, wind loads, and pricing.
          </p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={addCategory} style={{ borderRadius: "8px" }}>
          <Plus size={14} /> Add Category
        </button>
      </div>

      {cats.map((cat, ci) => (
        <div key={ci} className="adm-subsection" style={{ borderRadius: "12px", border: "1px solid #CBD5E1" }}>
          <div className="adm-subsection-header" style={{ borderBottom: "1px solid #F1F5F9", paddingBottom: "12px" }}>
            <div style={{ flex: 1, marginRight: "16px" }}>
              <Field label="Category Title" value={cat.name} onChange={(v) => updateCategoryName(ci, v)} />
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button type="button" className="adm-btn adm-btn-ghost" onClick={() => addQ(ci)} style={{ borderRadius: "6px" }}>
                <Plus size={13} /> Add Question
              </button>
              <button type="button" className="adm-delete-btn" onClick={() => removeCategory(ci)} style={{ borderRadius: "6px" }}>
                <Trash2 size={13} /> Delete Category
              </button>
            </div>
          </div>

          {cat.faqs.map((faq, qi) => (
            <div key={qi} className="adm-faq-item">
              <div className="adm-faq-num">{qi + 1}</div>
              <div className="adm-faq-body">
                <Field label="Question" value={faq.question} onChange={(v) => updateQ(ci, qi, "question", v)} />
                <Field label="Answer" value={faq.answer} onChange={(v) => updateQ(ci, qi, "answer", v)} rows={3} />
              </div>
              <button type="button" className="adm-delete-btn" onClick={() => removeQ(ci, qi)} style={{ borderRadius: "6px" }}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      ))}

      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

// ── 8. Offices Section ────────────────────────────────────────────────────

function OfficesSection() {
  const { content, setOffices } = useContent();
  const [offices, setLocal] = useState<Office[]>(content.offices.map((o) => ({ ...o })));
  const [saved, setSaved] = useState(false);

  const update = (i: number, k: keyof Office, v: string) =>
    setLocal((os) => os.map((o, j) => (j === i ? { ...o, [k]: v } : o)));

  const remove = (i: number) => {
    if (confirm("Delete this office branch?")) {
      setLocal((os) => os.filter((_, j) => j !== i));
    }
  };

  const add = () =>
    setLocal((os) => [...os, { city: "New Branch", address: "Office Address", phone: "0302 4001063", email: "info@tsptensile.pk" }]);

  const save = () => {
    setOffices(offices);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h2>Regional Offices &amp; Engineering Desks ({offices.length})</h2>
          <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: "13.5px" }}>
            Add, update, or remove physical office addresses in Lahore, Islamabad, Karachi, Peshawar, etc.
          </p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={add} style={{ borderRadius: "8px" }}>
          <Plus size={14} /> Add Office Branch
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
        {offices.map((o, i) => (
          <div key={i} className="adm-office-card" style={{ borderRadius: "12px", border: "1px solid #CBD5E1" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <strong style={{ fontSize: "15px", color: "var(--ink)" }}>{o.city || `Office #${i + 1}`}</strong>
              <button type="button" className="adm-delete-btn" onClick={() => remove(i)} style={{ borderRadius: "6px" }}>
                <Trash2 size={14} /> Remove
              </button>
            </div>
            <Field label="City" value={o.city} onChange={(v) => update(i, "city", v)} />
            <Field label="Address" value={o.address} onChange={(v) => update(i, "address", v)} rows={2} />
            <Field label="Phone" value={o.phone} onChange={(v) => update(i, "phone", v)} />
            <Field label="Email" value={o.email} onChange={(v) => update(i, "email", v)} />
          </div>
        ))}
      </div>

      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

// ── Master Admin Navigation Sections ──────────────────────────────────────

const SECTIONS = [
  { id: "calculator", label: "📐 Calculator & Pricing", badge: "Live" },
  { id: "app", label: "📱 Mobile App & Sync", badge: "PWA" },
  { id: "projects", label: "🏗️ Projects Portfolio" },
  { id: "company", label: "🏢 Company Information" },
  { id: "ceo", label: "👤 CEO Profile" },
  { id: "testimonials", label: "🗣️ Client Reviews" },
  { id: "faq", label: "❓ FAQ Knowledgebase" },
  { id: "offices", label: "📍 Offices & Desks" }
];

const SESSION_KEY = "tsp_admin_session_auth";
const SESSION_DURATION = 1000 * 60 * 60 * 3; // 3 hours

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => {
    try {
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
  const [active, setActive] = useState("calculator");

  const { resetToDefaults, exportData, importData } = useContent();
  const fileRef = useRef<HTMLInputElement>(null);

  // Countdown timer for brute-force protection
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

  useEffect(() => {
    document.title = authed ? "TSP Tensile - Master Admin Portal" : "Restricted Access";
  }, [authed]);

  const login = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (lockoutUntil && Date.now() < lockoutUntil) return;

    const clean = password.trim();
    if (clean === ADMIN_PASSWORD) {
      try {
        sessionStorage.setItem(
          SESSION_KEY,
          JSON.stringify({ token: "tsp_auth_active", timestamp: Date.now() })
        );
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
        setError("5 unsuccessful attempts. Security lockout active for 60 seconds.");
      } else {
        setError(`Incorrect password! Only authorized administrators are permitted (${5 - newAttempts} attempts left).`);
      }
    }
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {}
    setAuthed(false);
    setPassword("");
    setError("");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const ok = importData(ev.target?.result as string);
      alert(ok ? "✅ Content imported successfully into cloud & local store!" : "❌ Invalid backup JSON file.");
    };
    reader.readAsText(file);
  };

  // ── Login Gate ──
  if (!authed) {
    const isLocked = !!(lockoutUntil && countdown > 0);
    return (
      <div className="adm-login">
        <form className="adm-login-box" onSubmit={login}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "#0E2A38", display: "grid", placeItems: "center" }}>
              <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
                <path d="M6 29 C12 18, 16 12, 18 5 C17 14, 13 23, 6 29 Z" fill="#F59E0B" />
                <path d="M30 29 C24 18, 20 12, 18 5 C19 14, 23 23, 30 29 Z" fill="#D97706" opacity="0.9" />
                <line x1="18" y1="4" x2="18" y2="30" stroke="#FFFFFF" strokeWidth="1.8" />
                <circle cx="18" cy="4" r="1.5" fill="#FBBF24" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: "16px", fontWeight: 800, color: "var(--ink)", letterSpacing: "0.04em" }}>TSP TENSILE</div>
              <div style={{ fontSize: "10px", color: "var(--teal)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Master Admin Portal</div>
            </div>
          </div>

          <h1>Security Verification</h1>
          <p>Enter administrative credentials to manage Website, Mobile App, and Calculator rates.</p>

          <div style={{ position: "relative", marginBottom: "12px" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLocked}
              autoFocus
              style={{
                width: "100%",
                padding: "12px 42px 12px 14px",
                border: "1px solid var(--line)",
                borderRadius: "6px",
                fontSize: "15px"
              }}
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
                border: "none",
                color: "#64748B",
                cursor: "pointer"
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <div style={{ color: "#DC2626", background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "6px", padding: "8px 12px", fontSize: "12.5px", marginBottom: "12px" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="adm-btn adm-btn-primary"
            disabled={isLocked}
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "12px",
              fontSize: "14.5px",
              opacity: isLocked ? 0.6 : 1,
              cursor: isLocked ? "not-allowed" : "pointer"
            }}
          >
            {isLocked ? `Locked (${countdown}s)` : "Authenticate & Open"}
          </button>

          <Link href="/" className="adm-back-link">← Return to Website</Link>
        </form>
      </div>
    );
  }

  // ── Authenticated Master Admin Dashboard ──
  return (
    <div className="adm-shell">
      {/* Mobile Top App Header */}
      <header className="adm-mobile-header">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: 30, height: 30, borderRadius: 6, background: "rgba(255,255,255,0.12)", display: "grid", placeItems: "center" }}>
            <svg width="20" height="20" viewBox="0 0 36 36" fill="none">
              <path d="M6 29 C12 18, 16 12, 18 5 C17 14, 13 23, 6 29 Z" fill="#F59E0B" />
              <path d="M30 29 C24 18, 20 12, 18 5 C19 14, 23 23, 30 29 Z" fill="#D97706" opacity="0.9" />
              <line x1="18" y1="4" x2="18" y2="30" stroke="#FFFFFF" strokeWidth="1.8" />
            </svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: "14.5px", color: "#FFFFFF" }}>TSP Master Admin</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link href="/" className="adm-btn adm-btn-ghost" style={{ padding: "6px 10px", fontSize: "11px", color: "white", borderColor: "rgba(255,255,255,0.3)" }}>
            <Eye size={12} /> Site
          </Link>
          <button onClick={logout} className="adm-btn adm-btn-ghost" style={{ padding: "6px 10px", fontSize: "11px", color: "#FCA5A5", borderColor: "rgba(252,165,165,0.3)" }}>
            <LogOut size={12} />
          </button>
        </div>
      </header>

      {/* Horizontal scrolling tab bar on mobile */}
      <div className="adm-mobile-tabs">
        {SECTIONS.map((s) => (
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
            <div style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", display: "grid", placeItems: "center", flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 36 36" fill="none">
                <path d="M6 29 C12 18, 16 12, 18 5 C17 14, 13 23, 6 29 Z" fill="#F59E0B" />
                <path d="M30 29 C24 18, 20 12, 18 5 C19 14, 23 23, 30 29 Z" fill="#D97706" opacity="0.9" />
                <line x1="18" y1="4" x2="18" y2="30" stroke="#FFFFFF" strokeWidth="1.8" />
                <circle cx="18" cy="4" r="1.5" fill="#FBBF24" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "0.06em", color: "#FFFFFF", lineHeight: 1.2 }}>TSP TENSILE</div>
              <div style={{ fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sage)", fontWeight: 700 }}>Master Admin Portal</div>
            </div>
          </div>

          <nav>
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={active === s.id ? "active" : ""}
                onClick={() => setActive(s.id)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <span>{s.label}</span>
                {s.badge && (
                  <span style={{ fontSize: "9px", background: "#F59E0B", color: "#0F172A", padding: "1px 6px", borderRadius: "100px", fontWeight: 800 }}>
                    {s.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="adm-sidebar-bottom">
          <div style={{ padding: "0 20px 10px", fontSize: "11px", color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
            <span>Cloud Database: Synced ✓</span>
          </div>
          <Link href="/" target="_blank" className="adm-sidebar-link"><Eye size={14} /> View Website ↗</Link>
          <Link href="/app" target="_blank" className="adm-sidebar-link"><Smartphone size={14} /> View Mobile App ↗</Link>
          <button className="adm-sidebar-link" onClick={exportData}><Download size={14} /> Export Backup (.json)</button>
          <button className="adm-sidebar-link" onClick={() => fileRef.current?.click()}><Upload size={14} /> Restore Backup</button>
          <button
            className="adm-sidebar-link adm-danger"
            onClick={() => {
              if (confirm("Reset everything back to factory default? Warning: All custom edits will be reverted!")) {
                resetToDefaults();
              }
            }}
          >
            <RotateCcw size={14} /> Reset Defaults
          </button>
          <button className="adm-sidebar-link" onClick={logout}><LogOut size={14} /> Logout</button>
          <input ref={fileRef} type="file" accept=".json" style={{ display: "none" }} onChange={handleImport} />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="adm-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {active === "calculator" && <CalculatorSection />}
            {active === "app" && <AppSection />}
            {active === "projects" && <ProjectsSection />}
            {active === "company" && <CompanySection />}
            {active === "ceo" && <CeoSection />}
            {active === "testimonials" && <TestimonialsSection />}
            {active === "faq" && <FaqSection />}
            {active === "offices" && <OfficesSection />}
          </motion.div>
        </AnimatePresence>

        {/* Mobile Quick Action Buttons */}
        <div className="adm-mobile-actions" style={{ display: "none" }}>
          <button className="adm-btn adm-btn-ghost" onClick={exportData} style={{ fontSize: "12px" }}>
            <Download size={13} /> Export JSON Backup
          </button>
          <button className="adm-btn adm-btn-ghost" onClick={() => fileRef.current?.click()} style={{ fontSize: "12px" }}>
            <Upload size={13} /> Restore Backup File
          </button>
          <button className="adm-btn adm-btn-ghost" onClick={logout} style={{ fontSize: "12px", color: "#e53e3e", borderColor: "#fed7d7" }}>
            <LogOut size={13} /> Logout
          </button>
        </div>
      </main>
    </div>
  );
}

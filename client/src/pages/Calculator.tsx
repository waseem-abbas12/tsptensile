import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Calculator,
  Car,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  MapPin,
  MessageCircle,
  Printer,
  ArrowRight,
  Info,
  Clock,
  Layers,
  ChevronRight,
  Smartphone,
  Download
} from "lucide-react";
import { useContent, DEFAULT_CALCULATOR_CONFIG } from "@/contexts/ContentContext";
import { useSEO } from "@/hooks/useSEO";
import { DownloadAppModal } from "@/components/DownloadAppModal";

export default function CalculatorPage() {
  const { content } = useContent();
  const calcConfig = content?.calculator || DEFAULT_CALCULATOR_CONFIG;

  useSEO({
    title: "Tensile Structure & Car Parking Shade Cost Calculator Pakistan | TSP Tensile",
    description: "Calculate instant estimated turnkey cost for cantilever car parking shades, tensile fabric roofs and canopies in Lahore, Islamabad, Karachi. Real-time PKR rates.",
    path: "/calculator"
  });

  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  // Selections
  const [selectedStructureId, setSelectedStructureId] = useState(calcConfig.structures[0]?.id || "cantilever_car");
  const [parkingBays, setParkingBays] = useState<number>(2);
  const [isCustomDimensions, setIsCustomDimensions] = useState(false);
  const [lengthFt, setLengthFt] = useState<number>(20);
  const [widthFt, setWidthFt] = useState<number>(18);
  const [selectedFabricId, setSelectedFabricId] = useState(calcConfig.fabrics[0]?.id || "german_pvdf_900");
  const [selectedSteelFinishId, setSelectedSteelFinishId] = useState(calcConfig.steelFinishes[0]?.id || "ms_powder_coated");
  const [selectedCityId, setSelectedCityId] = useState(calcConfig.cities[0]?.id || "lahore");

  // Selected Objects
  const currentStructure = useMemo(
    () => calcConfig.structures.find((s) => s.id === selectedStructureId) || calcConfig.structures[0],
    [calcConfig.structures, selectedStructureId]
  );

  const currentFabric = useMemo(
    () => calcConfig.fabrics.find((f) => f.id === selectedFabricId) || calcConfig.fabrics[0],
    [calcConfig.fabrics, selectedFabricId]
  );

  const currentSteelFinish = useMemo(
    () => calcConfig.steelFinishes.find((st) => st.id === selectedSteelFinishId) || calcConfig.steelFinishes[0],
    [calcConfig.steelFinishes, selectedSteelFinishId]
  );

  const currentCity = useMemo(
    () => calcConfig.cities.find((c) => c.id === selectedCityId) || calcConfig.cities[0],
    [calcConfig.cities, selectedCityId]
  );

  // Handle Bay count change
  const handleBayChange = (bays: number) => {
    setParkingBays(bays);
    setIsCustomDimensions(false);
    if (bays === 1) {
      setLengthFt(10);
      setWidthFt(18);
    } else if (bays === 2) {
      setLengthFt(20);
      setWidthFt(18);
    } else if (bays === 3) {
      setLengthFt(30);
      setWidthFt(18);
    } else if (bays === 4) {
      setLengthFt(40);
      setWidthFt(18);
    }
  };

  // Calculations
  const areaSqFt = Math.max(1, Math.round(lengthFt * widthFt));
  const areaSqM = Math.round(areaSqFt * 0.0929 * 10) / 10;

  const baseFabricRate = currentFabric?.ratePerSqFt || 680;
  const steelAddon = currentSteelFinish?.rateAddonPerSqFt || 0;
  const structMultiplier = currentStructure?.multiplier || 1.0;
  const cityMultiplier = currentCity?.multiplier || 1.0;

  const turnkeyRatePerSqFt = (baseFabricRate + steelAddon) * structMultiplier * cityMultiplier;

  const calculatedRawLow = areaSqFt * turnkeyRatePerSqFt * 0.95;
  const calculatedRawHigh = areaSqFt * turnkeyRatePerSqFt * 1.06;

  const minCharge = calcConfig.minOrderAmountPkr || 65000;
  const estimateLow = Math.max(minCharge, Math.round(calculatedRawLow / 1000) * 1000);
  const estimateHigh = Math.max(minCharge, Math.round(calculatedRawHigh / 1000) * 1000);
  const avgSqFtPrice = Math.round((estimateLow + estimateHigh) / (2 * areaSqFt));

  // WhatsApp Message
  const whatsappNumber = (calcConfig.whatsappRecipient || content?.company?.whatsapp || "923024001063").replace(/[^0-9]/g, "");
  const whatsappText = encodeURIComponent(
    `*TSP Tensile Structure Estimation Inquiry*\n` +
    `-----------------------------------------\n` +
    `• Structure: ${currentStructure?.name || "Tensile Structure"}\n` +
    `• Dimensions: ${lengthFt} ft × ${widthFt} ft (${areaSqFt} sq.ft / ${areaSqM} m²)\n` +
    (selectedStructureId === "cantilever_car" && !isCustomDimensions ? `• Car Capacity: ${parkingBays} Cars\n` : "") +
    `• Fabric Membrane: ${currentFabric?.name || "PVDF Fabric"}\n` +
    `• Steel Framework: ${currentSteelFinish?.name || "Structural Steel"}\n` +
    `• Project City: ${currentCity?.name || "Pakistan"}\n` +
    `• Estimated Turnkey Cost: PKR ${estimateLow.toLocaleString()} – PKR ${estimateHigh.toLocaleString()}\n` +
    `• Estimated Rate: PKR ${avgSqFtPrice.toLocaleString()} / sq.ft\n` +
    `• Fabric Warranty: ${currentFabric?.warranty || "15 Years"}\n` +
    `-----------------------------------------\n` +
    `Assalam-o-Alaikum TSP Tensile, I generated this estimate on your website calculator and would like to schedule a free laser site measurement and get an official quotation.`
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="calculator-page" style={{ background: "var(--paper)", minHeight: "100vh", paddingBottom: "90px" }}>
      {/* ── Page Hero ── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0E2A38 0%, #173E52 60%, #1A475E 100%)",
          color: "#FFFFFF",
          padding: "130px 0 65px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "820px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(245, 158, 11, 0.2)", border: "1px solid rgba(245, 158, 11, 0.4)", padding: "5px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, color: "#FDE68A", marginBottom: "16px" }}>
              <Calculator size={14} /> LIVE PRICE ESTIMATION TOOL · پاکستان ریئل ٹائم تخمینہ کیلکولیٹر
            </div>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontFamily: "var(--serif)", fontWeight: 500, lineHeight: 1.15, margin: "0 0 16px", color: "#FFFFFF" }}>
              Tensile Structure Cost &amp; Car Parking Shade Calculator
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.85)", lineHeight: 1.65, margin: "0 0 24px", maxWidth: "700px" }}>
              Get instant transparent turnkey estimates for cantilever car parking shades, conical gazebos, walkway canopies, and architectural tensile membrane roofs in Pakistan.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
              <button
                type="button"
                onClick={() => setDownloadModalOpen(true)}
                className="button"
                style={{
                  background: "#F59E0B",
                  color: "#0F172A",
                  fontWeight: 700,
                  fontSize: "13px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  borderRadius: "100px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Smartphone size={16} />
                <span>Download Mobile App (موبائل ایپ)</span>
              </button>

              <span style={{ fontSize: "12.5px", color: "var(--sage)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <CheckCircle2 size={14} /> Free Site Laser Measurement &amp; 3D Design Included
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Interactive Calculator Grid ── */}
      <section className="container" style={{ marginTop: "-30px", position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "32px", alignItems: "start" }} className="calculator-layout-grid">
          {/* ── Left Column: Configurator Form ── */}
          <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "32px", boxShadow: "0 10px 40px rgba(0,0,0,0.06)", border: "1px solid var(--line)" }}>
            {/* Step 1: Structure Type */}
            <div style={{ marginBottom: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "14px" }}>
                <label style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#0E2A38", color: "#FFFFFF", display: "grid", placeItems: "center", fontSize: "12px", fontWeight: 800 }}>1</span>
                  Select Structure Type (سٹرکچر کا ماڈل)
                </label>
                <span style={{ fontSize: "12px", color: "var(--ink-soft)" }}>Choose architectural style</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "10px" }}>
                {calcConfig.structures.map((struct) => {
                  const isSelected = struct.id === selectedStructureId;
                  return (
                    <div
                      key={struct.id}
                      onClick={() => {
                        setSelectedStructureId(struct.id);
                        if (struct.id === "cantilever_car") {
                          handleBayChange(2);
                        } else {
                          setLengthFt(struct.defaultLengthFt);
                          setWidthFt(struct.defaultWidthFt);
                        }
                      }}
                      style={{
                        padding: "14px 16px",
                        borderRadius: "10px",
                        border: isSelected ? "2px solid #2D6A68" : "1px solid var(--line)",
                        background: isSelected ? "rgba(45, 106, 104, 0.05)" : "#FFFFFF",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div style={{ fontSize: "13.5px", fontWeight: 700, color: isSelected ? "#2D6A68" : "var(--ink)", marginBottom: "4px" }}>
                        {struct.name}
                      </div>
                      <div style={{ fontSize: "11.5px", color: "var(--ink-soft)", lineHeight: 1.4 }}>
                        {struct.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Dimensions / Car Bays */}
            <div style={{ marginBottom: "32px", paddingBottom: "28px", borderBottom: "1px solid var(--line)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "14px" }}>
                <label style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#0E2A38", color: "#FFFFFF", display: "grid", placeItems: "center", fontSize: "12px", fontWeight: 800 }}>2</span>
                  Dimensions &amp; Area (پیمائش اور رقبہ)
                </label>
                <div style={{ fontSize: "12.5px", fontWeight: 600, color: "#2D6A68" }}>
                  {areaSqFt} Sq. Ft ({areaSqM} m²)
                </div>
              </div>

              {/* Quick Car Bay Presets for Cantilever Parking */}
              {selectedStructureId === "cantilever_car" && (
                <div style={{ marginBottom: "18px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink-soft)", display: "block", marginBottom: "8px" }}>
                    Quick Car Parking Presets (گاڑیوں کی گنجائش):
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {[
                      { bays: 1, label: "1 Car Bay", dim: "10 × 18 ft (180 sq.ft)" },
                      { bays: 2, label: "2 Car Bays", dim: "20 × 18 ft (360 sq.ft)" },
                      { bays: 3, label: "3 Car Bays", dim: "30 × 18 ft (540 sq.ft)" },
                      { bays: 4, label: "4 Car Bays", dim: "40 × 18 ft (720 sq.ft)" },
                    ].map((item) => (
                      <button
                        key={item.bays}
                        type="button"
                        onClick={() => handleBayChange(item.bays)}
                        style={{
                          padding: "8px 14px",
                          borderRadius: "8px",
                          border: !isCustomDimensions && parkingBays === item.bays ? "2px solid #2D6A68" : "1px solid var(--line)",
                          background: !isCustomDimensions && parkingBays === item.bays ? "rgba(45, 106, 104, 0.08)" : "#FFFFFF",
                          color: !isCustomDimensions && parkingBays === item.bays ? "#2D6A68" : "var(--ink)",
                          fontSize: "12.5px",
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Car size={14} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setIsCustomDimensions(true)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "8px",
                        border: isCustomDimensions ? "2px solid #2D6A68" : "1px dashed var(--line)",
                        background: isCustomDimensions ? "rgba(45, 106, 104, 0.08)" : "#FFFFFF",
                        color: isCustomDimensions ? "#2D6A68" : "var(--ink)",
                        fontSize: "12.5px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Custom Size
                    </button>
                  </div>
                </div>
              )}

              {/* Sliders / Numerical Inputs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", fontWeight: 600, marginBottom: "6px" }}>
                    <span>Length (لمبائی):</span>
                    <strong style={{ color: "#2D6A68" }}>{lengthFt} Feet</strong>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="100"
                    step="1"
                    value={lengthFt}
                    onChange={(e) => {
                      setLengthFt(Number(e.target.value));
                      setIsCustomDimensions(true);
                    }}
                    style={{ width: "100%", accentColor: "#2D6A68", cursor: "pointer" }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", fontWeight: 600, marginBottom: "6px" }}>
                    <span>Width / Depth (چوڑائی):</span>
                    <strong style={{ color: "#2D6A68" }}>{widthFt} Feet</strong>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="50"
                    step="1"
                    value={widthFt}
                    onChange={(e) => {
                      setWidthFt(Number(e.target.value));
                      setIsCustomDimensions(true);
                    }}
                    style={{ width: "100%", accentColor: "#2D6A68", cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Fabric Membrane Selection */}
            <div style={{ marginBottom: "32px", paddingBottom: "28px", borderBottom: "1px solid var(--line)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "14px" }}>
                <label style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#0E2A38", color: "#FFFFFF", display: "grid", placeItems: "center", fontSize: "12px", fontWeight: 800 }}>3</span>
                  Fabric Membrane (فیبرک کا انتخاب)
                </label>
                <span style={{ fontSize: "12px", color: "var(--ink-soft)" }}>German &amp; Imported specs</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {calcConfig.fabrics.map((fabric) => {
                  const isSelected = fabric.id === selectedFabricId;
                  return (
                    <div
                      key={fabric.id}
                      onClick={() => setSelectedFabricId(fabric.id)}
                      style={{
                        padding: "14px 18px",
                        borderRadius: "10px",
                        border: isSelected ? "2px solid #2D6A68" : "1px solid var(--line)",
                        background: isSelected ? "rgba(45, 106, 104, 0.05)" : "#FFFFFF",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "12px",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div style={{ flex: "1 1 300px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                          <span style={{ fontSize: "14px", fontWeight: 700, color: isSelected ? "#2D6A68" : "var(--ink)" }}>
                            {fabric.name}
                          </span>
                          {fabric.recommended && (
                            <span style={{ background: "#F59E0B", color: "#0F172A", fontSize: "10px", fontWeight: 800, padding: "2px 7px", borderRadius: "100px" }}>
                              TOP CHOICE
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--ink-soft)", lineHeight: 1.4 }}>
                          {fabric.desc}
                        </div>
                        <div style={{ display: "flex", gap: "12px", marginTop: "6px", fontSize: "11px", color: "#64748B" }}>
                          <span>🛡️ <strong>{fabric.warranty}</strong> Warranty</span>
                          <span>⏳ <strong>{fabric.lifespan}</strong> Lifespan</span>
                          <span>📍 Origin: {fabric.origin}</span>
                        </div>
                      </div>

                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: "15px", fontWeight: 700, color: "#2D6A68" }}>
                          PKR {fabric.ratePerSqFt}
                        </div>
                        <div style={{ fontSize: "10.5px", color: "var(--ink-soft)" }}>
                          per sq.ft base
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Steel Framework Finish */}
            <div style={{ marginBottom: "32px", paddingBottom: "28px", borderBottom: "1px solid var(--line)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "14px" }}>
                <label style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#0E2A38", color: "#FFFFFF", display: "grid", placeItems: "center", fontSize: "12px", fontWeight: 800 }}>4</span>
                  Steel Structure Finish (اسٹیل فریم ورک)
                </label>
                <span style={{ fontSize: "12px", color: "var(--ink-soft)" }}>Corrosion protection</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}>
                {calcConfig.steelFinishes.map((finish) => {
                  const isSelected = finish.id === selectedSteelFinishId;
                  return (
                    <div
                      key={finish.id}
                      onClick={() => setSelectedSteelFinishId(finish.id)}
                      style={{
                        padding: "12px 16px",
                        borderRadius: "10px",
                        border: isSelected ? "2px solid #2D6A68" : "1px solid var(--line)",
                        background: isSelected ? "rgba(45, 106, 104, 0.05)" : "#FFFFFF",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: isSelected ? "#2D6A68" : "var(--ink)" }}>
                          {finish.name}
                        </div>
                        <div style={{ fontSize: "11.5px", color: "var(--ink-soft)" }}>
                          {finish.desc}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0, paddingLeft: "12px" }}>
                        <span style={{ fontSize: "12px", fontWeight: 700, color: finish.rateAddonPerSqFt > 0 ? "var(--terra)" : "var(--teal)" }}>
                          {finish.rateAddonPerSqFt === 0 ? "Included" : `+PKR ${finish.rateAddonPerSqFt}/sq.ft`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 5: City Location */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "14px" }}>
                <label style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#0E2A38", color: "#FFFFFF", display: "grid", placeItems: "center", fontSize: "12px", fontWeight: 800 }}>5</span>
                  Project City / Location (شہر کا انتخاب)
                </label>
                <span style={{ fontSize: "12px", color: "var(--ink-soft)" }}>On-site deployment</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "8px" }}>
                {calcConfig.cities.map((city) => {
                  const isSelected = city.id === selectedCityId;
                  return (
                    <div
                      key={city.id}
                      onClick={() => setSelectedCityId(city.id)}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: isSelected ? "2px solid #2D6A68" : "1px solid var(--line)",
                        background: isSelected ? "rgba(45, 106, 104, 0.08)" : "#FFFFFF",
                        color: isSelected ? "#2D6A68" : "var(--ink)",
                        fontSize: "12.5px",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <MapPin size={14} style={{ color: isSelected ? "#2D6A68" : "var(--terra)", flexShrink: 0 }} />
                      <span>{city.name.split("(")[0].trim()}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right Column: Live Turnkey Price Quotation Card ── */}
          <div style={{ position: "sticky", top: "100px" }}>
            <div
              style={{
                background: "linear-gradient(145deg, #0E2A38 0%, #153A4E 100%)",
                color: "#FFFFFF",
                borderRadius: "18px",
                padding: "32px 28px",
                boxShadow: "0 20px 50px rgba(14, 42, 56, 0.25)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#FDE68A" }}>
                  TURNKEY ESTIMATE · کل تخمینہ
                </span>
                <span style={{ background: "rgba(255, 255, 255, 0.12)", padding: "4px 10px", borderRadius: "100px", fontSize: "11px", color: "#E2E8F0" }}>
                  {currentCity?.name.split("(")[0].trim()}
                </span>
              </div>

              {/* Big Price Display */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "clamp(26px, 3.2vw, 36px)", fontWeight: 700, fontFamily: "var(--serif)", color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                  PKR {estimateLow.toLocaleString()} <span style={{ fontSize: "20px", fontWeight: 400, opacity: 0.7 }}>–</span> {estimateHigh.toLocaleString()}
                </div>
                <div style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.75)", marginTop: "6px" }}>
                  Approx. Turnkey Rate: <strong>PKR {avgSqFtPrice.toLocaleString()} / sq.ft</strong>
                </div>
              </div>

              {/* Specification Snapshot */}
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.2)",
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "24px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "9px",
                  fontSize: "12.5px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#94A3B8" }}>Structure:</span>
                  <span style={{ fontWeight: 600, color: "#FFFFFF", textAlign: "right" }}>{currentStructure?.name.split("(")[0].trim()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#94A3B8" }}>Area / Size:</span>
                  <span style={{ fontWeight: 600, color: "#FFFFFF" }}>{lengthFt} × {widthFt} ft ({areaSqFt} sq.ft)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#94A3B8" }}>Fabric Membrane:</span>
                  <span style={{ fontWeight: 600, color: "#FDE68A", textAlign: "right" }}>{currentFabric?.name}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#94A3B8" }}>Steel Finish:</span>
                  <span style={{ fontWeight: 600, color: "#FFFFFF", textAlign: "right" }}>{currentSteelFinish?.name.split("+")[0].trim()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#94A3B8" }}>Official Warranty:</span>
                  <span style={{ fontWeight: 700, color: "#10B981" }}>{currentFabric?.warranty}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#94A3B8" }}>Fabrication &amp; Rigging:</span>
                  <span style={{ fontWeight: 600, color: "#FFFFFF" }}>7 – 12 Days</span>
                </div>
              </div>

              {/* Scope of Work Inclusions */}
              <div style={{ marginBottom: "26px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94A3B8", display: "block", marginBottom: "8px" }}>
                  All-Inclusive Turnkey Scope:
                </span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "11.5px", color: "#E2E8F0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <CheckCircle2 size={13} style={{ color: "#10B981", flexShrink: 0 }} /> In-house CNC steel cutting
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <CheckCircle2 size={13} style={{ color: "#10B981", flexShrink: 0 }} /> Hot-air high-frequency welds
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <CheckCircle2 size={13} style={{ color: "#10B981", flexShrink: 0 }} /> Chemical base anchor bolts
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <CheckCircle2 size={13} style={{ color: "#10B981", flexShrink: 0 }} /> On-site tensioning &amp; rigging
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {/* WhatsApp Direct Official Quotation */}
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#25D366",
                    color: "#FFFFFF",
                    padding: "14px 20px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    textDecoration: "none",
                    boxShadow: "0 8px 24px rgba(37, 211, 102, 0.35)",
                    transition: "transform 0.15s ease",
                  }}
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp پر تخمینہ بھیجیں (Get Quote on WhatsApp)</span>
                </a>

                {/* Print / Save PDF Quotation */}
                <button
                  type="button"
                  onClick={handlePrint}
                  style={{
                    background: "rgba(255, 255, 255, 0.12)",
                    color: "#FFFFFF",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    padding: "11px 18px",
                    borderRadius: "12px",
                    fontWeight: 600,
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  <Printer size={15} />
                  <span>Print / Save Quotation PDF</span>
                </button>
              </div>

              {/* Disclaimer */}
              <p style={{ margin: "16px 0 0", fontSize: "11px", color: "rgba(255, 255, 255, 0.55)", lineHeight: 1.5, textAlign: "center" }}>
                {calcConfig.disclaimer || "Calculated prices are estimated turnkey rates. Final exact quote is confirmed after on-site laser survey."}
              </p>
            </div>

            {/* Mobile App Callout Box */}
            <div
              style={{
                marginTop: "16px",
                background: "#FFFFFF",
                borderRadius: "14px",
                padding: "16px 20px",
                border: "1px solid var(--line)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Smartphone size={22} style={{ color: "#2D6A68" }} />
                <div>
                  <strong style={{ fontSize: "13px", color: "var(--ink)", display: "block" }}>
                    TSP Tensile Mobile App
                  </strong>
                  <span style={{ fontSize: "11.5px", color: "var(--ink-soft)" }}>
                    Calculate offline estimates on your phone
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDownloadModalOpen(true)}
                style={{
                  background: "#0E2A38",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 14px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  flexShrink: 0,
                }}
              >
                <Download size={13} />
                <span>Install</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ on Tensile Structure Pricing in Pakistan ── */}
      <section className="container" style={{ marginTop: "70px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontFamily: "var(--serif)", textAlign: "center", margin: "0 0 10px" }}>
            Frequently Asked Questions About Tensile Shade Pricing
          </h2>
          <p style={{ textAlign: "center", color: "var(--ink-soft)", fontSize: "14px", margin: "0 0 32px" }}>
            Understand what goes into architectural fabric structure and parking shade costs in Pakistan.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ background: "#FFFFFF", padding: "20px 24px", borderRadius: "12px", border: "1px solid var(--line)" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 8px", color: "var(--ink)" }}>
                What is included in the estimated price?
              </h3>
              <p style={{ margin: 0, fontSize: "13.5px", color: "var(--ink-soft)", lineHeight: 1.6 }}>
                Our turnkey quotes include full structural 3D design, shop drawings, CNC steel pipe cutting, fabrication, dual-coat anti-rust paint or powder coating, imported high-frequency welded fabric membrane, anchor hardware, high-tensile stainless steel stay cables, on-site crane deployment, and professional hydraulic tensioning.
              </p>
            </div>

            <div style={{ background: "#FFFFFF", padding: "20px 24px", borderRadius: "12px", border: "1px solid var(--line)" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 8px", color: "var(--ink)" }}>
                How do German PVDF fabrics compare to local fabrics?
              </h3>
              <p style={{ margin: 0, fontSize: "13.5px", color: "var(--ink-soft)", lineHeight: 1.6 }}>
                German Mehler Valmex and French Serge Ferrari PVDF membranes feature a dual-sided titanium dioxide lacquer that repels dust, airborne pollution, and fungal growth. They carry official 15 to 20-year international manufacturer warranties and maintain their brilliant ivory tension for decades without sagging or tearing under storm winds.
              </p>
            </div>

            <div style={{ background: "#FFFFFF", padding: "20px 24px", borderRadius: "12px", border: "1px solid var(--line)" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 8px", color: "var(--ink)" }}>
                Do you charge for on-site laser measurement in Lahore, Islamabad, or Karachi?
              </h3>
              <p style={{ margin: 0, fontSize: "13.5px", color: "var(--ink-soft)", lineHeight: 1.6 }}>
                No. Our structural engineering survey across Lahore, Islamabad, Rawalpindi, and Karachi is 100% complimentary. An engineer visits your residence or commercial facility with a laser distance meter to inspect soil, column tie-ins, and clearance dimensions before hand-over of the final guaranteed proposal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download App Modal */}
      <DownloadAppModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />
    </div>
  );
}

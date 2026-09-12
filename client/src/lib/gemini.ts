// Gemini AI Site Crawler & Assistant Integration
import type { SiteContent } from "@/contexts/ContentContext";

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

/**
 * Crawls and compiles complete site knowledge A to Z
 */
export function buildSiteKnowledgeBase(content?: SiteContent): string {
  const company = content?.company;
  const ceo = content?.ceo;
  const projects = content?.projects || [];
  const faqs = content?.faqCategories || [];
  const offices = content?.offices || [];

  return `
=== COMPLETE ARCHITECTURAL SITE KNOWLEDGE (A to Z) ===

COMPANY PROFILE:
- Name: ${company?.name || "Form/Field Structures (TSP Tensile)"}
- Tagline: ${company?.tagline || "Tensile Architecture / Pakistan"}
- Philosophy: "Shade becomes architecture when every curve has a reason." Custom membrane structures designed, engineered and installed under one roof.
- Phone: ${company?.phone || "+92 300 1234567"}
- Email: ${company?.email || "hello@formfield.pk"}
- WhatsApp: ${company?.whatsapp || "923001234567"}
- Working Hours: ${company?.workingHours || "Monday – Saturday, 9:00 am – 6:00 pm"}
- Offices: ${offices.map((o) => `${o.city} (${o.address}, Ph: ${o.phone})`).join("; ") || "Lahore (DHA Phase 5), Islamabad (F-8 Markaz), Rawalpindi (Saddar)"}

LEADERSHIP & TEAM:
- CEO & Founder: ${ceo?.name || "Shaukat Bhullar"} (${ceo?.title || "Founder & Chief Executive"})
- Experience: ${ceo?.years || "9+"} years leading the firm, ${ceo?.projects || "120+"} completed projects, team of ${ceo?.teamSize || "24"} in-house architects, engineers, fabricators, and riggers.
- Background: ${ceo?.intro || "Founded in Lahore in 2016 after a decade in structural engineering and architectural fabrication."}

CORE SOLUTIONS & FABRIC ENGINEERING:
1. PVC-coated Polyester:
   - Tensile Strength: 2,800 N/5cm, Lifespan: 20–25 years, Fire Class: B1, Weight: 900–1,050 g/m²
   - Best for: Commercial car parking canopies, institutional covers, walkways, fully waterproof.
2. HDPE Shade Cloth (High-Density Polyethylene):
   - Tensile Strength: 480 N/5cm, Lifespan: 5–8 years, Fire Class: E, Weight: 180–330 g/m²
   - Best for: Residential villas, swimming pool shade, garden sails, breathable shade with up to 95% UV blockage.
3. PTFE / Glass Fibre (Teflon-coated Glass):
   - Tensile Strength: 5,200 N/5cm, Lifespan: 30+ years, Fire Class: A1 (non-combustible)
   - Best for: Landmark architecture, airports, stadiums, luxury hotels, supreme self-cleaning with rainfall.
4. ETFE Foil (Ethylene Tetrafluoroethylene):
   - Tensile Strength: 3,900 N/5cm, Lifespan: 40+ years, Fire Class: B1, Light transmission up to 95%
   - Best for: Botanical domes, atrium skylights, transparent / cushion roofs.
5. Retractable Awning & Pergola Systems:
   - Motorised aluminium frameworks with wind sensors that auto-retract above 45 km/h.

PORTFOLIO OF COMPLETED PROJECTS:
${projects.map((p, i) => `${i + 1}. "${p.title}" in ${p.city} - Type: ${p.type}, System: ${p.system}, Area: ${p.area || "N/A"}, Year: ${p.year}. Description: ${p.description}`).join("\n")}

FREQUENTLY ASKED QUESTIONS & POLICIES:
${faqs.map((cat) => `Category: ${cat.name}\n` + cat.faqs.map((f: any) => `- Q: ${f.question || f[0]}\n  A: ${f.answer || f[1]}`).join("\n")).join("\n\n")}

QUOTATION & INSTALLATION PROCESS:
- Step 1: Client submits project details (city, area/dimensions, intended use, photos) via contact form or WhatsApp.
- Step 2: Preliminary estimate provided within 1–2 working days.
- Step 3: Site visit and structural evaluation for complex projects.
- Step 4: Detailed structural design, membrane pattern cutting & engineering drawing sign-off (3–5 days).
- Step 5: In-house fabrication & tensioned on-site installation (2–3 days for residential, 1–2 weeks for commercial).
- Warranty: 5–10 years on HDPE, 10–20 years on PVC, full structural warranty on cables, masts, and anchors.
=== END OF SITE KNOWLEDGE ===
`;
}

/**
 * Sends a query to Google Gemini or responds via smart local context
 */
export async function askGemini(
  query: string,
  _history: ChatMessage[],
  siteContent?: SiteContent
): Promise<string> {
  const apiKey =
    (typeof window !== "undefined" && localStorage.getItem("ff_gemini_api_key")) ||
    (import.meta as any).env?.VITE_GEMINI_API_KEY ||
    "";

  const knowledge = buildSiteKnowledgeBase(siteContent);

  const systemPrompt = `You are the official Senior AI Architectural Consultant for "${siteContent?.company?.name || "Form/Field Structures (TSP Tensile)"}", Pakistan's leading tensile architecture and fabric shade engineering company.
You have complete, exhaustive A to Z knowledge of all company projects, materials (PVC, PTFE, HDPE, ETFE), engineering calculations, pricing procedures, warranty policies, offices, and leadership.

Guidelines:
1. Always be polite, professional, and knowledgeable like an elite structural architect and design consultant.
2. Answer in the same language the user asks:
   - If user asks in Roman Urdu (e.g. "car parking shade ka rate kya h?"), reply in fluent, natural Roman Urdu.
   - If user asks in Urdu script, reply in Urdu.
   - If user asks in English, reply in crisp architectural English.
3. Help visitors calculate or estimate requirements, explain difference between PVC vs HDPE vs PTFE, guide them on how to get a quote or book a site visit in Lahore, Islamabad, Rawalpindi or across Pakistan.
4. Reference real projects from your knowledge base when giving examples.
5. Provide the company's WhatsApp (+92 300 1234567) or phone for direct quote inquiries.

Here is the complete site data you must draw from:
${knowledge}`;

  if (apiKey) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const contents = [
        {
          role: "user",
          parts: [{ text: systemPrompt + "\n\nUser Question: " + query }],
        },
      ];

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      });

      if (res.ok) {
        const data = await res.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) return candidate;
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to smart local model:", err);
    }
  }

  // Smart Context-Aware Local Knowledge Fallback (works instantly without API key)
  return generateLocalSmartResponse(query, siteContent);
}

function generateLocalSmartResponse(query: string, content?: SiteContent): string {
  const q = query.toLowerCase();
  const company = content?.company?.name || "Form/Field Structures (TSP Tensile)";
  const phone = content?.company?.phone || "+92 300 1234567";

  if (
    q.includes("rate") ||
    q.includes("price") ||
    q.includes("cost") ||
    q.includes("kitna") ||
    q.includes("qimat") ||
    q.includes("kharcha")
  ) {
    return `**Tensile Structure & Car Parking Shade Rates (اندازہ لاگت):**

Tensile structures کا ریٹ ایریا (Square Feet / Meters)، ڈیزائن کی پیچیدگی، اور فیبرک کی قسم پر منحصر ہوتا ہے:
- **HDPE Shade Cloth:** تقریباً PKR 250 – 450 فی مربع فٹ (مناسب قیمت، دھوپ سے 95% بچاؤ، رہائشی کار پارکنگ اور سوئمنگ پول کے لیے بہترین)۔
- **PVC Membrane (Waterproof):** تقریباً PKR 650 – 1,200 فی مربع فٹ (100% واٹر پروف، کمرشل کار پارکنگ، ہوٹلز اور ہاسپٹلٹی کے لیے، 20+ سال لائف)۔
- **PTFE / Premium Membrane:** پریمیم اور بڑے میگا پروجیکٹس کے لیے کسٹم کوٹیشن۔

🎯 **فوری درست کوٹیشن کے لیے:** آپ اپنی جگہ کی پیمائش یا تصاویر ہمارے واٹس ایپ **${phone}** پر بھیج سکتے ہیں، ہماری انجینئرنگ ٹیم 24 گھنٹے میں تخمینہ فراہم کر دے گی!`;
  }

  if (
    q.includes("material") ||
    q.includes("fabric") ||
    q.includes("pvc") ||
    q.includes("hdpe") ||
    q.includes("ptfe")
  ) {
    return `**ہمارے استعمال کردہ ٹاپ کلاس ٹینسل فیبرکس (Materials):**

1. **PVC-coated Polyester:** سب سے زیادہ مقبول اور پائیدار میمبرین۔ واٹر پروف، خودکار بارش سے صفائی (Self-cleaning)، اور 20–25 سال لائف۔
2. **HDPE Shade Cloth:** ہلکا پھلکا، ہوا دار (breathable)، اور یو وی ریزسٹنٹ۔ 5–8 سال وارنٹی، گھروں اور سوئمنگ پول کے لیے آئیڈیل۔
3. **PTFE Glass Fibre:** انتہائی پریمیم، نان کمبسٹیبل (آگ سے محفوظ)، 30+ سال لائف۔
4. **ETFE Foil:** 95% شفاف شیشے جیسی میمبرین جو گرین ہاؤس اور جدید اسکائی لائٹس میں لگائی جاتی ہے۔

آپ کے پروجیکٹ کے لیے کون سا میٹریل موزوں ہے، یہ جاننے کے لیے بتائیے کہ آپ رہائشی مقصد کے لیے بنا رہے ہیں یا کمرشل؟`;
  }

  if (
    q.includes("office") ||
    q.includes("address") ||
    q.includes("location") ||
    q.includes("kaha") ||
    q.includes("lahore") ||
    q.includes("islamabad")
  ) {
    return `**ہمارے دفاتر اور سروس ایریاز:**

ہم پاکستان بھر میں سروس فراہم کرتے ہیں، اور ہمارے اہم دفاتر یہاں موجود ہیں:
- 📍 **Lahore:** DHA Phase 5, Lahore, Punjab
- 📍 **Islamabad:** F-8 Markaz, Islamabad, ICT
- 📍 **Rawalpindi:** Saddar, Rawalpindi

📞 ہیلپ لائن: **${phone}** | ✉️ ای میل: **${content?.company?.email || "hello@formfield.pk"}**`;
  }

  if (
    q.includes("ceo") ||
    q.includes("owner") ||
    q.includes("founder") ||
    q.includes("malik")
  ) {
    const ceo = content?.ceo;
    return `**قیادت اور بانی (Leadership):**

ہماری کمپنی کے بانی اور چیف ایگزیکٹو **${ceo?.name || "Shaukat Bhullar"}** ہیں، جن کے پاس اسٹرکچرل انجینئرنگ اور ٹینسل فیبریکیشن کا 9+ سال سے زائد کا تجربہ ہے اور انہوں نے پاکستان بھر میں 120+ سے زائد کامیاب پراجیکٹس مکمل کیے ہیں۔`;
  }

  if (
    q.includes("project") ||
    q.includes("kaam") ||
    q.includes("portfolio")
  ) {
    const projects = content?.projects || [];
    const pNames = projects
      .slice(0, 4)
      .map((p) => `• **${p.title}** (${p.city} - ${p.system})`)
      .join("\n");
    return `**ہمارے حالیہ نمایاں پراجیکٹس:**

${pNames}

مزید تمام پروجیکٹس کی تفصیلی گیلری دیکھنے کے لیے آپ ویب سائٹ کا **Projects** پیج وزٹ کر سکتے ہیں!`;
  }

  return `خوش آمدید! میں **${company}** کا آفیشل AI آرکیٹیکچرل اسسٹنٹ ہوں۔ 

میں آپ کی سائٹ کا تمام ڈیٹا (A to Z) جانتا ہوں، بشمول:
1. کار پارکنگ اور ٹینسل شیڈز کی اقسام اور فیبرکس (PVC, HDPE, PTFE)
2. تخمینہ قیمت (Rate Estimation) اور کوٹیشن کا طریقہ کار
3. ہمارے مکمل شدہ پروجیکٹس (لاہور، اسلام آباد، کراچی، وغیرہ)
4. انجینئرنگ اسٹرکچر، وارنٹی اور لائف ٹائم ڈیٹیلز

بتائیے میں آپ کے پراجیکٹ کے لیے کیا مدد کر سکتا ہوں؟`;
}

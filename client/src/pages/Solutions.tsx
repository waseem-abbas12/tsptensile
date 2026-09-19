import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { useScrollAnimation, staggerContainer, fadeUp, slideInLeft, slideInRight } from "@/hooks/useScrollAnimation";
import { TensileCanvas } from "@/components/TensileCanvas";
import { useSEO } from "@/hooks/useSEO";
import { ZoomableImage } from "@/components/ZoomableImage";

const images = {
  hero: "/images/hero.jpg",
  pool: "/images/commercial.jpg",
  walkway: "/images/walkway.jpg",
  detail: "/images/detail.jpg",
};

const solutions = [
  {
    id: "01",
    slug: "cantilever",
    name: "Cantilever Car Parking Shades",
    tagline: "Pakistan's #1 Zero Front-Column Vehicle Protection",
    desc: "Engineered specifically for luxury residences, corporate office parks, and commercial plazas in Lahore, Islamabad, and Karachi. Cantilevered rear-support engineering leaves the entire vehicle entrance completely open — zero front poles to hit, zero door denting, and effortless multi-car maneuvering.",
    benefits: [
      "100% obstruction-free front entrance (rear cantilevered posts)",
      "German Mehler / Serge Ferrari 900 GSM PVDF fabric",
      "Calculated for 140 km/h wind shear & extreme monsoon downpours",
      "DHA Lahore, Bahria Town & CDA municipal guideline compliant",
      "Price: PKR 450 - 1,150 / sq. ft installed"
    ],
    image: "/images/hero.jpg",
    applications: ["Executive corporate parking", "DHA & Bahria luxury villas", "Commercial plaza car bays", "EV charging terminal stations"],
  },
  {
    id: "02",
    slug: "tensile-roofs",
    name: "Tensile Membrane Roofs & Canopies",
    tagline: "Architectural Grandeur With Zero Center Columns",
    desc: "Hyperbolic paraboloid, conic, and barrel vault architectural tensile fabric structures designed to cover vast expanses without intrusive interior columns. Ideal for stadiums, banquet courtyards, school assemblies, and corporate atriums across Pakistan.",
    benefits: [
      "Vast clear-span coverage up to 60+ meters with zero intermediate pillars",
      "Translucent membrane diffuses natural daylight while blocking 100% UV",
      "15 to 25-year structural design lifespan with Grade 316 stainless rigging",
      "Self-cleaning PVDF/PTFE lacquer coating rinses clean with rain",
      "Price: PKR 650 - 1,450 / sq. ft"
    ],
    image: "/images/hero_flagship.jpg",
    applications: ["Wedding marquee lawns & banquets", "School & university courtyards", "Hospitality & resort atriums", "Sports stadium grandstands"],
  },
  {
    id: "03",
    slug: "pool-shades",
    name: "Swimming Pool Tensile Canopies",
    tagline: "Thermal Relief, UV Defense & Privacy for Aquatic Spaces",
    desc: "Pakistan’s summer temperatures frequently exceed +45°C, turning swimming pools into heat traps and causing intense chemical evaporation. Our custom pool tensile membranes lower water temperature by up to 8°C while providing complete privacy and aesthetic beauty.",
    benefits: [
      "Reduces pool water temperature by 5°C to 8°C during peak summer",
      "Stops rapid chlorine evaporation caused by direct UV radiation",
      "Corrosion-proof marine epoxy painted steel framing (pool chemical resistant)",
      "High architectural sail shapes that elevate luxury farmhouses & clubs",
      "Price: PKR 500 - 1,200 / sq. ft"
    ],
    image: "/images/hero_luxury.jpg",
    applications: ["DHA & Golf club swimming pools", "Private farmhouse aquatic retreats", "Hotel & gym wellness centers", "Children splash pads & shallow pools"],
  },
  {
    id: "04",
    slug: "walkways",
    name: "Covered Walkway & Entrance Canopies",
    tagline: "Weather-Protected All-Season Pedestrian Concourse",
    desc: "Continuous linear tensile walkways connecting corporate campus buildings, hospital corridors, university paths, and retail plazas. Designed with internal rainwater routing and integrated LED illumination channels.",
    benefits: [
      "Total rain, hail, and intense sun protection for pedestrian traffic",
      "Integrated concealed guttering and rainwater drainage pipes",
      "Modular design for rapid installation with minimal on-site disruption",
      "Pre-engineered connection points for security cameras & ambient lighting",
      "Price: PKR 400 - 950 / sq. ft"
    ],
    image: "/images/hero_canopy.jpg",
    applications: ["Hospital & medical campus corridors", "University pedestrian pathways", "Airport & transit interchange terminals", "Shopping mall external walkways"],
  },
  {
    id: "05",
    slug: "padel-courts",
    name: "Padel & Tennis Court Enclosures",
    tagline: "Year-Round All-Weather Sporting Performance",
    desc: "Padel is Pakistan's fastest-growing sport, but extreme heat and monsoon rains halt play for months. Our high-clearance arched tensile structures provide full weatherproofing, wind baffling, and non-glare diffused illumination for 24/7 court rental.",
    benefits: [
      "8-12 meter apex clearance fulfilling international FIP tournament standards",
      "Diffused daylight eliminates blinding sun glare for competitive athletes",
      "Open or semi-enclosed sides allow natural cross-ventilation",
      "Increases monthly club court rental bookings by over 300%",
      "Price: Custom turnkey quotation per court"
    ],
    image: "/images/commercial.jpg",
    applications: ["Padel clubs in Lahore & Islamabad", "Tennis & badminton facilities", "Futsal & cricket turf enclosures", "Gymnasium outdoor workout zones"],
  },
  {
    id: "06",
    slug: "rooftop",
    name: "Rooftop Tensile Pergolas & Gazebos",
    tagline: "Transform Underutilized Roofs Into Luxury Living Spaces",
    desc: "Turn scorching concrete rooftops into sheltered open-air lounges, rooftop dining cafes, and barbecue terraces. Lightweight tensile membrane engineering delivers dramatic shade without overloading building structural slabs.",
    benefits: [
      "Lightweight membrane adds only a fraction of concrete or tile roof weight",
      "Engineered high-wind base plates anchor safely into existing RCC columns",
      "Provides substantial thermal insulation, reducing AC costs for the floor below",
      "Modern curved aesthetic that increases commercial property rental value",
      "Price: PKR 450 - 1,050 / sq. ft"
    ],
    image: "/images/walkway.jpg",
    applications: ["Rooftop cafes & restaurants", "Residential terrace gardens", "Penthouse entertainment decks", "Corporate rooftop break areas"],
  },
  {
    id: "07",
    slug: "industrial-sheds",
    name: "Industrial, Factory & Warehouse Sheds",
    tagline: "Pre-Engineered Heavy Duty Steel & Fabric Industrial Buildings",
    desc: "Heavy-duty structural steel and tensile fabric roofing systems engineered for factories, manufacturing workshops, dairy farms, poultry sheds, and logistic warehouses across Lahore, Faisalabad, Gujranwala, and Karachi. High clear-span clearance with thermal insulation.",
    benefits: [
      "Long-span column-free space for heavy forklifts, machinery, and production lines",
      "Galvanized & anti-rust MS steel framing engineered for heavy monsoon & wind loads",
      "Heatproof insulated sandwich panel & high-strength PVC tensile membrane options",
      "Fast prefabricated erection — reduces build time by over 50% compared to concrete",
      "Turnkey civil foundation, anchor bolting, and fabrication with structural warranty"
    ],
    image: "/images/detail.jpg",
    applications: ["Factory production floors", "Logistics & distribution warehouses", "Dairy & livestock farm sheds", "Agricultural equipment storage & workshops"],
  },
  {
    id: "08",
    slug: "marquee-event-shades",
    name: "Marquee, Shadi Hall & Gazebo Canopies",
    tagline: "Grand Clear-Span Event Arenas & Luxury Outdoor Gazebos",
    desc: "Aesthetic architectural tensile structures and heavy-duty steel truss marquees for marriage lawns, shadi halls, convention centers, and resort courtyards. Designed for dramatic atmospheric interior lighting and complete weatherproofing.",
    benefits: [
      "Expansive clear span accommodating 500 to 3,000+ banquet guests without middle pillars",
      "100% waterproof and flame-retardant Class B1/M2 European PVDF fabrics",
      "Compatible with central air conditioning ducting and grand chandelier suspension",
      "Custom dome, hyperbolic, conical, and modern arch configurations",
      "Fast seasonal installation or permanent year-round commercial operation"
    ],
    image: "/images/hero_flagship.jpg",
    applications: ["Wedding lawns & banquet halls in Lahore & Islamabad", "Corporate expo centers", "Luxury farmhouse outdoor gazebos", "Stadium & sports arena grandstands"],
  },
];

function SolutionBlock({ sol, idx }: { sol: typeof solutions[0]; idx: number }) {
  const { ref, isInView } = useScrollAnimation({ amount: 0.15 });
  const isEven = idx % 2 === 0;

  return (
    <section className={`solution-full${isEven ? "" : " solution-full-reverse"}`} id={sol.slug} ref={ref}>
      <motion.div className="solution-full-image" variants={isEven ? slideInLeft : slideInRight} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        <ZoomableImage
          src={sol.image}
          alt={sol.name}
          caption={`${sol.name} — ${sol.tagline}`}
          badgeText={sol.id}
          zoomScale={2.4}
          showExpandBtn={true}
          style={{ width: "100%", height: "100%", minHeight: "380px" }}
        />
      </motion.div>
      <motion.div className="solution-full-copy" variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        <motion.p className="eyebrow" variants={fadeUp}>{sol.tagline}</motion.p>
        <motion.h2 variants={fadeUp}>{sol.name}</motion.h2>
        <motion.p variants={fadeUp}>{sol.desc}</motion.p>
        <motion.ul className="solution-benefits" variants={fadeUp}>
          {sol.benefits.map((b) => (
            <li key={b}><CheckCircle size={16} />{b}</li>
          ))}
        </motion.ul>
        <motion.div variants={fadeUp}>
          <p className="solution-applications-label">Common Deployments</p>
          <div className="solution-applications">
            {sol.applications.map((a) => <span key={a}>{a}</span>)}
          </div>
        </motion.div>
        <motion.div variants={fadeUp} style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: 28 }}>
          <Link href="/contact" className="button button-solid" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            Book Free Site Survey <ArrowUpRight size={17} />
          </Link>
          <a
            href={`https://wa.me/923024001063?text=${encodeURIComponent(`Hi TSP Tensile, I am interested in ${sol.name}. Can you share designs and a price quote?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-outline"
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            WhatsApp Estimate ↗
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function SolutionsPage() {
  useSEO({
    title: "Car Parking Shades, Industrial Sheds & Tensile Roofs | TSP Tensile",
    description: "Explore cantilever car parking shades, industrial factory & warehouse sheds, marquee banquet canopies, and swimming pool tensile covers in Pakistan. Call 0302 4001063.",
    path: "/solutions",
    keywords: "cantilever car parking shades, industrial factory shed, warehouse steel structure, tensile fabric roofs, marquee shadi hall canopies, swimming pool shades pakistan",
    breadcrumbs: [
      { name: "Shade Solutions", url: "/solutions" }
    ]
  });

  return (
    <div className="inner-page">
      <section className="page-hero" style={{ background: "var(--ink)" }}>
        <div className="tensile-canvas-wrap"><TensileCanvas /></div>
        <div className="container page-hero-content">
          <motion.p className="eyebrow" style={{ color: "var(--sage)" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Turnkey Commercial &amp; Residential Shade Systems
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}>
            Commercial Tensile Fabric &amp; Cantilever Shade Systems in Pakistan
          </motion.h1>
          <motion.p className="page-hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            From single-vehicle cantilever parking sheds in DHA Lahore and Bahria Town to 50,000 sq ft industrial membrane roofs in Karachi, explore our specialized architectural tensile shade products built for Pakistan's climate.
          </motion.p>
        </div>
      </section>

      {solutions.map((sol, i) => <SolutionBlock key={sol.id} sol={sol} idx={i} />)}
    </div>
  );
}

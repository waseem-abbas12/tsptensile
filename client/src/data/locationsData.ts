export interface CityPricing {
  material: string;
  priceRange: string;
  durability: string;
  warranty: string;
  bestFor: string;
}

export interface CityProject {
  title: string;
  type: string;
  area: string;
  location: string;
  image: string;
  description: string;
}

export interface CityFaq {
  question: string;
  answer: string;
}

export interface CityData {
  slug: string;
  name: string;
  region: string;
  h1: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  heroSub: string;
  phone: string;
  whatsapp: string;
  address: string;
  serviceAreas: string[];
  stats: {
    projects: string;
    experience: string;
    warranty: string;
    rating: string;
  };
  pricingGuide: CityPricing[];
  localProjects: CityProject[];
  climateChallenge: string;
  whyChoosePoints: { title: string; desc: string }[];
  faqs: CityFaq[];
}

export const CITIES_DATA: Record<string, CityData> = {
  lahore: {
    slug: "lahore",
    name: "Lahore",
    region: "Punjab",
    h1: "Car Parking Shades & Tensile Fabric Structures in Lahore",
    tagline: "Premier Tensile Membrane Architecture & Cantilever Shades / Lahore",
    metaTitle: "Car Parking Shades Lahore | Tensile Fabric Structures & Sheds Pakistan",
    metaDescription: "Manufacturer & installer of cantilever car parking shades and tensile membrane structures in Lahore. Serving DHA, Bahria Town, Gulberg & Model Town. Free site visit. Call 0302 4001063.",
    heroSub: "Custom engineered cantilever car parking shades, swimming pool canopies, entrance walkways and tensile membrane roofs built for Lahore's 48°C extreme summer heat. DHA and Bahria Town approved structural standards.",
    phone: "0302 4001063",
    whatsapp: "923024001063",
    address: "DHA Phase 5 Commercial, Lahore, Punjab",
    serviceAreas: [
      "DHA Lahore (Phase 1–9 & Raya)",
      "Bahria Town Lahore",
      "Gulberg & Main Boulevard",
      "Model Town & Garden Town",
      "Johar Town & Faisal Town",
      "Lake City & Valencia Town",
      "Wapda Town & State Life",
      "Cavalry Ground & Cantt",
      "Raiwind Road & Pine Avenue",
      "Sundar Industrial Estate"
    ],
    stats: {
      projects: "85+",
      experience: "18+ Years",
      warranty: "15 Years",
      rating: "4.9 / 5.0"
    },
    pricingGuide: [
      {
        material: "Australian HDPE Commercial Shade Cloth",
        priceRange: "PKR 350 – 550 / sq ft",
        durability: "7–10 Years",
        warranty: "5 Years",
        bestFor: "Residential car porch, swimming pool side, garden sunshade"
      },
      {
        material: "German Mehler PVC Fabric (900 GSM)",
        priceRange: "PKR 750 – 1,150 / sq ft",
        durability: "15–20 Years",
        warranty: "10 Years",
        bestFor: "Cantilever parking bays, DHA residences, commercial drop-offs"
      },
      {
        material: "French Serge Ferrari PVDF Membrane",
        priceRange: "PKR 1,200 – 1,850 / sq ft",
        durability: "25+ Years",
        warranty: "15 Years",
        bestFor: "Executive plazas, sports arenas, architectural conic canopies"
      },
      {
        material: "PTFE Glass Fibre Architectural Membrane",
        priceRange: "PKR 2,200 – 3,500 / sq ft",
        durability: "30+ Years",
        warranty: "20 Years",
        bestFor: "Institutional landmarks, stadiums, airport-grade terminals"
      }
    ],
    localProjects: [
      {
        title: "Executive Cantilever Parking Bays",
        type: "Commercial Parking",
        area: "850 m²",
        location: "DHA Phase 5, Lahore",
        image: "/images/hero.jpg",
        description: "Zero front-column heavy steel cantilever shade structure accommodating 24 executive vehicles with German PVDF fabric and marine-grade rigging."
      },
      {
        title: "Emporium Plaza Tensile Entrance Canopy",
        type: "Commercial Entrance",
        area: "420 m²",
        location: "Johar Town, Lahore",
        image: "/images/project_cantilever_parking.jpg",
        description: "Hyperbolic paraboloid tensile membrane entrance canopy welcoming visitors with diffused natural daylight and 100% waterproof monsoon shelter."
      },
      {
        title: "Luxury Residence Pool Shade Canopy",
        type: "Residential Pool",
        area: "210 m²",
        location: "Bahria Town, Lahore",
        image: "/images/luxury_pool.jpg",
        description: "Custom curved sail shade providing 95% UV blockage and 12°C ambient cooling over private heated pool."
      }
    ],
    climateChallenge: "Lahore experiences scorching summers exceeding 48°C, heavy monsoon cloudbursts, and high dust pollution. Standard metal or polycarbonate sheds heat up like ovens and crack under thermal expansion. Our tensile membrane structures reflect 85% of solar radiation, drop ambient temperatures by 10–15°C, and are 100% rustproofed with hot-dip galvanized steel frames.",
    whyChoosePoints: [
      {
        title: "DHA & Bahria Town Bylaws Compliance",
        desc: "We design cantilever canopies that strictly respect setback limits, height restrictions, and aesthetic covenants of Lahore's premier housing authorities."
      },
      {
        title: "Zero Front Obstruction Cantilever",
        desc: "Park cars effortlessly with no cumbersome front pillars in your driveway or parking bays."
      },
      {
        title: "Certified 140 km/h Wind Engineering",
        desc: "Structural calculations verified by professional engineers to withstand severe summer and monsoon dust storms (aandhi)."
      },
      {
        title: "Free On-Site Survey Across Lahore",
        desc: "Our engineering technician visits your site within 24 hours for accurate laser measurements and 3D design proposals."
      }
    ],
    faqs: [
      {
        question: "How much does a car parking shade cost in Lahore?",
        answer: "The price of car parking shades in Lahore ranges from PKR 350 to PKR 1,150 per square foot depending on fabric quality (HDPE shade net vs. German Mehler PVC) and structural steel design (cantilever arch vs. post-supported). A standard 2-car cantilever shade typically costs between PKR 140,000 to PKR 260,000 complete with fabrication, foundation, and installation."
      },
      {
        question: "Does DHA Lahore allow cantilever car parking shades outside the house?",
        answer: "Yes, DHA Lahore allows cantilever shades inside your boundary wall and approved porch areas. Our team ensures the shade structure adheres to DHA setback guidelines, height limits, and aesthetic standards without risking inspection notices."
      },
      {
        question: "How long does fabrication and installation take in Lahore?",
        answer: "Standard residential cantilever parking shades in Lahore are fabricated in our workshop within 5 to 7 days, and on-site assembly is completed in just 1 day to minimize any disruption to your home or office."
      },
      {
        question: "How does tensile fabric compare with fiberglass or corrugated sheets in Lahore?",
        answer: "Fiberglass and metal sheets trap heat, rattle loudly in rain, discolor, and become brittle in Lahore's UV sunlight within 2–3 years. Tensile PVDF fabrics reflect radiant heat, reduce temperature underneath by up to 15°C, are virtually silent during rain, and carry a 10–15 year lifespan."
      }
    ]
  },

  islamabad: {
    slug: "islamabad",
    name: "Islamabad",
    region: "Federal Capital",
    h1: "Tensile Shades & Car Parking Canopies in Islamabad",
    tagline: "Architectural Membrane Structures & Parking Sheds / Islamabad",
    metaTitle: "Car Parking Shades Islamabad | Tensile Structures Manufacturer",
    metaDescription: "Top manufacturer of cantilever car parking shades and tensile fabric structures in Islamabad. Serving Blue Area, F-Sectors, DHA Islamabad & Bahria Town. Call 0302 4001063.",
    heroSub: "Engineered tensile membrane roofs, cantilever car parking canopies, entrance walkways and rooftop pergolas designed for the architectural elegance and weather conditions of Islamabad and the Capital Territory.",
    phone: "0302 4001063",
    whatsapp: "923024001063",
    address: "F-8 Markaz, Islamabad, ICT",
    serviceAreas: [
      "Blue Area Commercial Hub",
      "Sectors F-6, F-7, F-8, F-10, F-11",
      "Sectors E-7, E-11, G-10, G-11, G-13",
      "DHA Islamabad (Phase 1, 2, 5 & Valley)",
      "Bahria Town Islamabad / Enclave",
      "Gulberg Greens Islamabad",
      "Chak Shahzad & Park Road Villas",
      "Bani Gala & Rawal Enclave",
      "H-8 / H-9 Institutional Zones",
      "I-8, I-9, I-10 Industrial Sectors"
    ],
    stats: {
      projects: "45+",
      experience: "18+ Years",
      warranty: "15 Years",
      rating: "5.0 / 5.0"
    },
    pricingGuide: [
      {
        material: "Australian HDPE Commercial Shade Cloth",
        priceRange: "PKR 380 – 580 / sq ft",
        durability: "7–10 Years",
        warranty: "5 Years",
        bestFor: "Residential driveway shade, garden canopy, school play zones"
      },
      {
        material: "German Mehler PVC Fabric (900 GSM)",
        priceRange: "PKR 780 – 1,200 / sq ft",
        durability: "15–20 Years",
        warranty: "10 Years",
        bestFor: "Cantilever parking bays, embassy villas, corporate plazas"
      },
      {
        material: "French Serge Ferrari PVDF Membrane",
        priceRange: "PKR 1,250 – 1,900 / sq ft",
        durability: "25+ Years",
        warranty: "15 Years",
        bestFor: "Luxury villas in F-sectors & Chak Shahzad, institutional buildings"
      },
      {
        material: "Architectural Polycarbonate Canopies",
        priceRange: "PKR 850 – 1,400 / sq ft",
        durability: "12–15 Years",
        warranty: "8 Years",
        bestFor: "Waterproof walkways, security check posts, modern car porches"
      }
    ],
    localProjects: [
      {
        title: "Arch Cantilever Driveway Canopy",
        type: "Residential Driveway",
        area: "340 m²",
        location: "Sector F-7/2, Islamabad",
        image: "/images/project_villa_driveway.jpg",
        description: "Seamless arched cantilever shade sheltering luxury executive vehicles with zero front obstruction and built-in concealed LED downlights."
      },
      {
        title: "Pakistan Radio Broadcaster Tensile Canopies",
        type: "Government Landmark",
        area: "980 m²",
        location: "Constitution Avenue, Islamabad",
        image: "/images/project_radio_pakistan.jpg",
        description: "Flagship institutional conical tensile membrane structure sheltering public walkways and executive parking bays with 15-year weatherproofing."
      },
      {
        title: "Gulberg Greens Luxury Farmhouse Canopy",
        type: "Farmhouse Shade",
        area: "520 m²",
        location: "Gulberg Greens, Islamabad",
        image: "/images/luxury_car_parking.jpg",
        description: "Curved architectural membrane canopy sheltering multiple 4x4 vehicles with thermal heat barrier against Margalla sun glare."
      }
    ],
    climateChallenge: "Islamabad experiences heavy winter rains, occasional severe hailstorms, intense summer sun, and gusty winds descending from the Margalla Hills. Our tensile fabric structures are computer-modeled for dynamic wind pressures and reinforced with 316 marine-grade stainless steel rigging to prevent sagging or ponding during torrential rainfall.",
    whyChoosePoints: [
      {
        title: "CDA & Environmental Design Compliant",
        desc: "Clean minimal aesthetic designed to complement Islamabad's green architectural master plan and Capital Development Authority standards."
      },
      {
        title: "Hailstorm & Snow Rated Tension Systems",
        desc: "Fabric tensioned to high pretension thresholds so sudden hail and heavy rainfall sheet off effortlessly without pooling."
      },
      {
        title: "Premium European Fabrics",
        desc: "Only authentic German Mehler and French Serge Ferrari PVDF membranes used for superior color retention and fire-retardancy."
      },
      {
        title: "Capital VIP & Institutional Experience",
        desc: "Trusted by government departments, diplomatic facilities, PAF, and prominent corporate headquarters in Islamabad."
      }
    ],
    faqs: [
      {
        question: "Do you offer car parking shade fabrication in Islamabad?",
        answer: "Yes, TSP Tensile has an active installation footprint and representative office in F-8 Markaz Islamabad. We offer free on-site survey and laser measurement across all F, G, E, and H sectors, Blue Area, DHA Islamabad, and Bahria Town."
      },
      {
        question: "Can tensile shades withstand hailstorms in Islamabad?",
        answer: "Yes. Our high-tensile PVDF membranes have a tensile strength of over 3,000 N/5cm and are tensioned on heavy-gauge tubular steel arches. Unlike brittle fiberglass or plastic sheets which crack during hailstorms, architectural tensile fabric easily absorbs impact without tearing."
      },
      {
        question: "What is the warranty period for tensile structures in Islamabad?",
        answer: "We provide an official 10 to 15-year warranty on German PVC/PVDF fabrics and a lifetime structural engineering warranty on all steel fabrication and welding connections."
      }
    ]
  },

  rawalpindi: {
    slug: "rawalpindi",
    name: "Rawalpindi",
    region: "Punjab",
    h1: "Car Parking Sheds & Tensile Structures in Rawalpindi",
    tagline: "Heavy-Duty Cantilever Sheds & Tensile Membrane Roofing / Rawalpindi",
    metaTitle: "Car Parking Sheds Rawalpindi | Tensile Structure Fabricator",
    metaDescription: "Best car parking shades & cantilever sheds in Rawalpindi & Bahria Town. Low cost per sq ft, 15-year warranty, free on-site survey. Call 0302 4001063.",
    heroSub: "Heavy-duty cantilever car parking sheds, residential porch canopies, commercial shopfront shades, and industrial warehouse tensile roofs across Rawalpindi Cantt, Saddar, and Bahria Town Phase 1–8.",
    phone: "0302 4001063",
    whatsapp: "923024001063",
    address: "Saddar Commercial, Rawalpindi, Punjab",
    serviceAreas: [
      "Bahria Town Rawalpindi (Phase 1–8)",
      "DHA Rawalpindi (Phase 1 & Phase 2)",
      "Rawalpindi Cantt & Mall Road",
      "Saddar Commercial District",
      "Chaklala Scheme 3 & Askari Villas",
      "Satellite Town & Commercial Market",
      "Peshawar Road & Westridge",
      "Adyala Road Residential Societies",
      "Morgah & Top City Rawalpindi",
      "Rawat Industrial Zone"
    ],
    stats: {
      projects: "50+",
      experience: "18+ Years",
      warranty: "15 Years",
      rating: "4.9 / 5.0"
    },
    pricingGuide: [
      {
        material: "Heavy Commercial HDPE Shade Net",
        priceRange: "PKR 350 – 520 / sq ft",
        durability: "7–10 Years",
        warranty: "5 Years",
        bestFor: "Home car porch, school playground, commercial parking lot"
      },
      {
        material: "Waterproof PVC Tensile Fabric (850 GSM)",
        priceRange: "PKR 750 – 1,100 / sq ft",
        durability: "15–20 Years",
        warranty: "10 Years",
        bestFor: "Cantilever parking bays, Bahria Town & DHA porches"
      },
      {
        material: "Architectural Curved PVDF Membrane",
        priceRange: "PKR 1,200 – 1,750 / sq ft",
        durability: "25+ Years",
        warranty: "15 Years",
        bestFor: "Commercial plazas, luxury villas, car showrooms"
      }
    ],
    localProjects: [
      {
        title: "Bahria Town Phase 7 Villa Cantilever Shade",
        type: "Residential Porch",
        area: "180 m²",
        location: "Bahria Town Phase 7, Rawalpindi",
        image: "/images/project_residence_porch.jpg",
        description: "Cantilever double-car shade with zero front pillars allowing easy parking of luxury SUVs with maximum driveway clearance."
      },
      {
        title: "Askari Residential Gate Tensile Canopy",
        type: "Community Security Gate",
        area: "260 m²",
        location: "Chaklala, Rawalpindi",
        image: "/images/project_residential_gate.jpg",
        description: "Architectural tensile entrance canopy sheltering security barriers and visiting vehicles with 100% monsoon weatherproofing."
      },
      {
        title: "Rawat Industrial Warehouse Canopy",
        type: "Industrial Logistics",
        area: "750 m²",
        location: "Rawat Industrial Estate, Rawalpindi",
        image: "/images/project_industrial_warehouse.jpg",
        description: "High-clearance tensile canopy for freight loading bays with heavy wind-load structural steel framework."
      }
    ],
    climateChallenge: "Rawalpindi faces harsh monsoon showers, sudden summer dust squalls, and severe sun intensity that damages vehicle paint and upholstery. Our heavy-gauge steel structures are powder-coated or hot-dip galvanized with zero rust risk, guaranteed for decades of reliable shade.",
    whyChoosePoints: [
      {
        title: "Local Workshop & Fast Installation",
        desc: "Rapid turnaround times with direct on-site delivery and professional installation crew operating right in Rawalpindi."
      },
      {
        title: "Specialized Bahria Town & Askari Designs",
        desc: "Proven track record with over 40 successful installations across Bahria Town Phase 1–8 and Askari housing schemes."
      },
      {
        title: "Cost-Effective Factory Direct Rates",
        desc: "Direct manufacturer pricing without middlemen or third-party agent markups."
      },
      {
        title: "Corrosion-Resistant Steel Framing",
        desc: "All hollow structural sections (HSS) sandblasted and coated with epoxy primer and polyurethane automotive finish."
      }
    ],
    faqs: [
      {
        question: "Can you install car parking shades in Bahria Town Phase 8 Rawalpindi?",
        answer: "Yes, we have completed dozens of installations across Bahria Town Phase 1 through Phase 8, Safari Valley, and DHA Rawalpindi. We provide free site measurement visits throughout Rawalpindi."
      },
      {
        question: "How much does a 2-car parking shade cost in Rawalpindi?",
        answer: "A standard 2-car cantilever shade (approx 360 to 400 sq ft) typically costs between PKR 150,000 and PKR 280,000 depending on whether you choose high-density HDPE shade net or heavy-duty German waterproof PVC."
      },
      {
        question: "Do you provide repair and fabric replacement for existing shades in Rawalpindi?",
        answer: "Yes! If you have an existing steel frame with damaged, torn, or faded cloth, we can inspect, re-tension, and install brand-new PVC or HDPE fabric at very economical rates."
      }
    ]
  },

  karachi: {
    slug: "karachi",
    name: "Karachi",
    region: "Sindh",
    h1: "Tensile Membrane Structures & Parking Shades in Karachi",
    tagline: "Marine-Grade Coastal Tensile Architecture & Parking Sheds / Karachi",
    metaTitle: "Car Parking Shades Karachi | Coastal Marine Tensile Structures",
    metaDescription: "Anti-rust marine grade 316 tensile fabric structures & car parking shades in Karachi. DHA, Clifton, Bahria Karachi. 15-year warranty. Call 0302 4001063.",
    heroSub: "Coastal marine-grade tensile membrane structures, cantilever car parking canopies, rooftop restaurant pergolas, and industrial shades engineered to withstand Karachi's humid salt-air corrosion and high summer UV radiation.",
    phone: "0302 4001063",
    whatsapp: "923024001063",
    address: "DHA Phase 6 Commercial, Karachi, Sindh",
    serviceAreas: [
      "DHA Karachi (Phase 1–8 & Creek Vista)",
      "Clifton (Blocks 1–9 & Sea View)",
      "Bahria Town Karachi",
      "Korangi Industrial Area",
      "SITE Industrial Area",
      "PECHS & Tariq Road",
      "Gulshan-e-Iqbal & Gulistan-e-Johar",
      "North Nazimabad & Federal B Area",
      "Port Qasim Industrial Corridor",
      "Hawkesbay & Beach Resorts"
    ],
    stats: {
      projects: "30+",
      experience: "18+ Years",
      warranty: "15 Years",
      rating: "4.9 / 5.0"
    },
    pricingGuide: [
      {
        material: "German Mehler Marine PVDF (Anti-Fungal)",
        priceRange: "PKR 850 – 1,350 / sq ft",
        durability: "15–20 Years",
        warranty: "10 Years",
        bestFor: "DHA & Clifton coastal villas, commercial parking, hotel drops"
      },
      {
        material: "French Serge Ferrari Marine Grade Fabric",
        priceRange: "PKR 1,350 – 2,100 / sq ft",
        durability: "25+ Years",
        warranty: "15 Years",
        bestFor: "Luxury beachfront residences, yacht clubs, corporate towers"
      },
      {
        material: "Australian UV Commercial HDPE Cloth",
        priceRange: "PKR 380 – 600 / sq ft",
        durability: "7–10 Years",
        warranty: "5 Years",
        bestFor: "Air-permeable rooftop shades, schools, sports courts"
      }
    ],
    localProjects: [
      {
        title: "Clifton Beachfront Residence Tensile Roof",
        type: "Coastal Residence",
        area: "380 m²",
        location: "Clifton Block 2, Karachi",
        image: "/images/hero_luxury.jpg",
        description: "Marine-grade 316 stainless steel rigging and PVDF anti-fungal membrane engineered to resist saline sea breeze and tropical heat."
      },
      {
        title: "Korangi Industrial Factory Loading Canopy",
        type: "Industrial Logistics",
        area: "1,150 m²",
        location: "Korangi Industrial Area, Karachi",
        image: "/images/project_factory_canopy.jpg",
        description: "Heavy-duty commercial tensile canopy protecting transport loading bays from extreme coastal monsoon rains and heat."
      },
      {
        title: "Bahria Town Karachi Villa Car Canopy",
        type: "Residential Driveway",
        area: "240 m²",
        location: "Bahria Town Karachi, Precinct 1",
        image: "/images/project_cantilever_parking.jpg",
        description: "Double cantilever car parking canopy keeping luxury vehicles sheltered with 100% UV block and zero front columns."
      }
    ],
    climateChallenge: "Karachi's coastal environment is notoriously corrosive: high humidity, salt spray from the Arabian Sea, and year-round UV exposure destroy mild steel and ordinary paint within 18 months. We exclusively use marine-grade stainless steel cables (AISI 316), hot-dip galvanizing, and anti-microbial PVDF fabrics that resist mold, salt crust, and discoloration.",
    whyChoosePoints: [
      {
        title: "Marine-Grade 316 Hardware",
        desc: "All turnbuckles, shackles, cable clamps and perimeter fittings crafted from 316 stainless steel to eliminate coastal rust."
      },
      {
        title: "Anti-Fungal PVDF Membrane Coating",
        desc: "Specialized biocides in the fabric prevent mildew and algae growth in Karachi's humid marine climate."
      },
      {
        title: "High Wind Gust Rating",
        desc: "Engineered to withstand coastal storm squalls and Arabian Sea tropical cyclone wind speeds up to 150 km/h."
      },
      {
        title: "Nationwide Turnkey Execution",
        desc: "Precision prefabricated in our central facility and installed by our certified engineering riggers on site in Karachi."
      }
    ],
    faqs: [
      {
        question: "Why do regular parking sheds rust so quickly in Karachi?",
        answer: "Standard mild steel and electro-plated bolts react aggressively with Karachi's airborne sea salts. TSP Tensile solves this with certified hot-dip galvanizing (minimum 85 microns zinc coating) and 316 marine-grade stainless steel rigging that guarantees zero rust for decades."
      },
      {
        question: "Do you install tensile shades in Bahria Town Karachi and DHA Phase 8?",
        answer: "Yes, we regularly execute projects in DHA Phase 1 through 8, Clifton, Bahria Town Karachi, and industrial areas like Korangi and SITE. We dispatch our installation team directly for turnkey execution."
      },
      {
        question: "Can tensile structures be installed on rooftops in Karachi?",
        answer: "Yes! Lightweight tensile structures are ideal for rooftops and terraces of restaurants, penthouses, and corporate offices because they add minimal dead weight to the building while providing dramatic shade and wind protection."
      }
    ]
  }
};

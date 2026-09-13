interface ClientLogo {
  name: string;
  category: string;
  color: string;
  textColor?: string;
  logo?: string;
  abbr?: string;
}

// ── SVG logos for major recognizable brands ───────────────────────────────
const LOGO_SVGS: Record<string, JSX.Element> = {
  KFC: (
    <svg viewBox="0 0 60 60" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="10" fill="#E4002B"/>
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle"
        fill="white" fontSize="20" fontWeight="900" fontFamily="Arial Black, Arial, sans-serif">KFC</text>
    </svg>
  ),
  NESTLE: (
    <svg viewBox="0 0 70 40" width="70" height="40" xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle"
        fill="#009688" fontSize="18" fontWeight="800" fontFamily="Georgia, serif" letterSpacing="1">Nestlé</text>
    </svg>
  ),
  PAF: (
    <svg viewBox="0 0 60 60" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="10" fill="#003580"/>
      <polygon points="30,10 50,36 30,30 10,36" fill="#C5A028"/>
      <text x="50%" y="80%" dominantBaseline="middle" textAnchor="middle"
        fill="white" fontSize="11" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="2">PAF</text>
    </svg>
  ),
  HEC: (
    <svg viewBox="0 0 60 60" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="10" fill="#006633"/>
      <text x="50%" y="42%" dominantBaseline="middle" textAnchor="middle"
        fill="white" fontSize="16" fontWeight="800" fontFamily="Arial, sans-serif">HEC</text>
      <text x="50%" y="68%" dominantBaseline="middle" textAnchor="middle"
        fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="Arial, sans-serif">PAKISTAN</text>
    </svg>
  ),
  BEACONHOUSE: (
    <svg viewBox="0 0 80 40" width="80" height="40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="20" r="10" fill="#CC0000"/>
      <circle cx="12" cy="20" r="5" fill="white"/>
      <circle cx="12" cy="20" r="2" fill="#CC0000"/>
      <text x="28" y="50%" dominantBaseline="middle" textAnchor="start"
        fill="#CC0000" fontSize="13" fontWeight="800" fontFamily="Arial, sans-serif">BEACONHOUSE</text>
    </svg>
  ),
  ECS: (
    <svg viewBox="0 0 60 60" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="10" fill="#111827"/>
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle"
        fill="#FFD700" fontSize="20" fontWeight="900" fontFamily="Arial Black, sans-serif">ECS</text>
    </svg>
  ),
  DHA: (
    <svg viewBox="0 0 60 60" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="10" fill="#1C3557"/>
      <path d="M30 8 L46 16 L46 36 C46 46 38 52 30 54 C22 52 14 46 14 36 L14 16 Z"
        fill="none" stroke="#C5A028" strokeWidth="2.5"/>
      <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle"
        fill="white" fontSize="14" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="1">DHA</text>
    </svg>
  ),
  BAHRIA: (
    <svg viewBox="0 0 70 40" width="70" height="40" xmlns="http://www.w3.org/2000/svg">
      <text x="2" y="52%" dominantBaseline="middle" textAnchor="start"
        fill="#003366" fontSize="13" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="0.5">BAHRIA TOWN</text>
    </svg>
  ),
  EMPORIUM: (
    <svg viewBox="0 0 60 60" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="10" fill="#1A1A2E"/>
      <rect x="27" y="12" width="6" height="28" fill="#D4AF37"/>
      <rect x="18" y="28" width="24" height="6" fill="#D4AF37"/>
      <text x="50%" y="84%" dominantBaseline="middle" textAnchor="middle"
        fill="#D4AF37" fontSize="6.5" fontFamily="Arial, sans-serif" letterSpacing="0.5">EMPORIUM</text>
    </svg>
  ),
  FAISAL: (
    <svg viewBox="0 0 60 60" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="10" fill="#C0392B"/>
      <text x="50%" y="40%" dominantBaseline="middle" textAnchor="middle"
        fill="white" fontSize="11" fontWeight="800" fontFamily="Arial, sans-serif">FAISAL</text>
      <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle"
        fill="rgba(255,255,255,0.85)" fontSize="9" fontFamily="Arial, sans-serif">MOTORS</text>
    </svg>
  ),
  RANGERS: (
    <svg viewBox="0 0 60 60" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="10" fill="#1A3A1A"/>
      <polygon points="30,10 33.5,21 45,21 36,28 39,39 30,32 21,39 24,28 15,21 26.5,21"
        fill="#FFD700"/>
      <text x="50%" y="82%" dominantBaseline="middle" textAnchor="middle"
        fill="white" fontSize="7" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="0.5">RANGERS</text>
    </svg>
  ),
  HAMID: (
    <svg viewBox="0 0 60 60" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="10" fill="#006699"/>
      <rect x="27" y="16" width="6" height="22" rx="2" fill="white"/>
      <rect x="16" y="27" width="28" height="6" rx="2" fill="white"/>
    </svg>
  ),
  NAWAI: (
    <svg viewBox="0 0 70 40" width="70" height="40" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="4" width="70" height="32" rx="4" fill="#8B0000"/>
      <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle"
        fill="white" fontSize="10" fontWeight="700" fontFamily="Georgia, serif" letterSpacing="0.3">NAWA-I-WAQAT</text>
    </svg>
  ),
  GOVERNOR: (
    <svg viewBox="0 0 60 60" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="10" fill="#1A237E"/>
      {/* Crescent and star simplified */}
      <circle cx="28" cy="28" r="12" fill="white" opacity="0.9"/>
      <circle cx="32" cy="26" r="9" fill="#1A237E"/>
      <polygon points="42,16 44,22 50,22 45,26 47,32 42,28 37,32 39,26 34,22 40,22"
        fill="white"/>
    </svg>
  ),
  RADIO: (
    <svg viewBox="0 0 60 60" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="10" fill="#B71C1C"/>
      {/* Radio waves */}
      <circle cx="30" cy="38" r="4" fill="white"/>
      <path d="M20 32 Q30 20 40 32" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M13 26 Q30 10 47 26" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
      <text x="50%" y="82%" dominantBaseline="middle" textAnchor="middle"
        fill="white" fontSize="6" fontFamily="Arial, sans-serif" letterSpacing="0.5">PAKISTAN RADIO</text>
    </svg>
  ),
};

const CLIENTS: ClientLogo[] = [
  // Housing Societies & Residential
  { name: "DHA LAHORE",      category: "Housing Society",         color: "#1C3557", logo: "DHA" },
  { name: "BAHRIA TOWN",     category: "Housing Society",         color: "#003366", logo: "BAHRIA" },
  { name: "BAHRIA ORCHARD",  category: "Housing Society",         color: "#004080", abbr: "BO" },
  { name: "PARK VIEW",       category: "Housing Society",         color: "#2E7D32", abbr: "PV" },
  { name: "VALENCIA",        category: "Residential Project",      color: "#6A1550", abbr: "VAL" },
  { name: "CENTRAL PARK",    category: "Housing Society",         color: "#1B5E20", abbr: "CP" },
  { name: "SOAN GARDEN",     category: "Islamabad",               color: "#1A5276", abbr: "SG" },
  { name: "JAN MANDER",      category: "Housing Society",         color: "#4A235A", abbr: "JM" },
  { name: "ENGINEER TOWN",   category: "Housing Society",         color: "#263238", abbr: "ET" },
  // Corporate & Commercial
  { name: "NESTLÉ",          category: "Corporate",               color: "#E8F5E9", logo: "NESTLE" },
  { name: "KFC",             category: "Commercial",              color: "#E4002B", logo: "KFC" },
  { name: "ECS",             category: "Retail",                  color: "#111827", logo: "ECS" },
  { name: "EMPORIUM TOWER",  category: "Commercial",              color: "#1A1A2E", logo: "EMPORIUM" },
  { name: "FAISAL MOTORS",   category: "Automotive",              color: "#C0392B", logo: "FAISAL" },
  { name: "DAMANA GROUP",    category: "Corporate",               color: "#7B3F00", abbr: "DG" },
  { name: "SIALKO PAK",      category: "Sports Industrial",       color: "#0D47A1", abbr: "SP" },
  { name: "NAWA-I-WAQAT",   category: "Media",                   color: "#8B0000", logo: "NAWAI" },
  { name: "MIMCO",           category: "Corporate",               color: "#455A64", abbr: "MIM" },
  { name: "GREEN APPAREL",   category: "Industrial",              color: "#2E7D32", abbr: "GA" },
  { name: "CHEMTEC",         category: "Industrial",              color: "#4A148C", abbr: "CHE" },
  { name: "CELLSOLE ENERGY", category: "Energy",                  color: "#F57F17", abbr: "CE" },
  { name: "RIZWAN TARGET",   category: "Commercial",              color: "#B71C1C", abbr: "RT" },
  { name: "MATLIC SOLUTIONS",category: "Technology",              color: "#0277BD", abbr: "ML" },
  { name: "SERVICE CO.",     category: "Commercial",              color: "#37474F", abbr: "SVC" },
  // Government & Defence
  { name: "PAF",             category: "Pakistan Air Force",      color: "#003580", logo: "PAF" },
  { name: "GOVERNOR HOUSE",  category: "Government",              color: "#1A237E", logo: "GOVERNOR" },
  { name: "PAKISTAN RADIO",  category: "Government",              color: "#B71C1C", logo: "RADIO" },
  { name: "HEC / UET",       category: "Public Sector",           color: "#006633", logo: "HEC" },
  { name: "RANGERS RISE",    category: "Defence",                 color: "#1A3A1A", logo: "RANGERS" },
  // Healthcare
  { name: "HAMID LATIF",     category: "Hospital",                color: "#006699", logo: "HAMID" },
  { name: "UMAR HOSPITAL",   category: "Healthcare",              color: "#00695C", abbr: "UH" },
  // Educational
  { name: "BEACONHOUSE/BNU", category: "Education",               color: "#FFF5F5", logo: "BEACONHOUSE" },
  { name: "NSSE",            category: "School of Eminence",      color: "#006064", abbr: "NSS" },
];

function LogoMark({ client }: { client: ClientLogo }) {
  if (client.logo && LOGO_SVGS[client.logo]) {
    return (
      <div className="client-logo-svg-wrap">
        {LOGO_SVGS[client.logo]}
      </div>
    );
  }
  return (
    <div className="client-logo-mark" style={{ background: client.color }}>
      <span className="client-logo-initials" style={{ color: client.textColor || "#fff" }}>
        {client.abbr || client.name.slice(0, 2)}
      </span>
    </div>
  );
}

export function ClientLogosMarquee() {
  const repeated = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section className="client-logos-section" aria-label="Our Clients & Partners">
      <div className="container">
        <div className="client-logos-header">
          <span className="client-logos-eyebrow">
            TRUSTED BY 30+ LEADING DEVELOPERS · CORPORATIONS · GOVERNMENT &amp; DEFENCE
          </span>
        </div>
      </div>
      <div className="client-logos-track-wrap">
        <div className="client-logos-track">
          {repeated.map((client, idx) => (
            <div key={idx} className="client-logo-item">
              <LogoMark client={client} />
              <div className="client-logo-meta">
                <strong className="client-logo-name">{client.name}</strong>
                <span className="client-logo-cat">{client.category}</span>
              </div>
              <span className="client-logo-divider">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

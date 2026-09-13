import type { JSX } from "react";

interface ClientLogo {
  name: string;
  category: string;
  color: string;
  textColor?: string;
  logo: string;
}

// ── Authentic Vector Logos for All 33 Clients & Partners ──────────────────────
const LOGO_SVGS: Record<string, JSX.Element> = {
  // 1. DHA Lahore (Defence Housing Authority)
  DHA: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dhaShield" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A"/>
          <stop offset="100%" stopColor="#0F172A"/>
        </linearGradient>
      </defs>
      <path d="M30 4 L52 14 L52 36 C52 48 42 55 30 58 C18 55 8 48 8 36 L8 14 Z" fill="url(#dhaShield)" stroke="#D4AF37" strokeWidth="2.5"/>
      <path d="M30 9 L48 18 L48 35 C48 45 40 50 30 53 C20 50 12 45 12 35 L12 18 Z" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6"/>
      {/* Crossed Sabres */}
      <line x1="20" y1="40" x2="40" y2="24" stroke="#D4AF37" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="40" y1="40" x2="20" y2="24" stroke="#D4AF37" strokeWidth="2.2" strokeLinecap="round"/>
      {/* Crescent and Star */}
      <circle cx="30" cy="21" r="5" fill="#D4AF37"/>
      <circle cx="32" cy="20" r="4.2" fill="#1E3A8A"/>
      <polygon points="34,17 35,19 37,19 35.5,20.5 36,22.5 34,21.5 32,22.5 32.5,20.5 31,19 33,19" fill="#D4AF37"/>
      {/* DHA Banner Text */}
      <rect x="17" y="42" width="26" height="9" rx="3" fill="#D4AF37"/>
      <text x="30" y="48.5" dominantBaseline="middle" textAnchor="middle" fill="#0F172A" fontSize="7.5" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="0.8">DHA</text>
    </svg>
  ),

  // 2. Bahria Town
  BAHRIA: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="28" fill="#002B49" stroke="#C5A028" strokeWidth="2"/>
      <circle cx="30" cy="30" r="24.5" fill="none" stroke="#C5A028" strokeWidth="0.8" strokeDasharray="2 1.5"/>
      {/* Crown at top */}
      <polygon points="23,19 25,14 30,17 35,14 37,19" fill="#F59E0B"/>
      {/* Winged Crest Shield */}
      <path d="M22 23 C22 23 20 20 15 22 C12 24 13 28 17 29 C20 30 22 28 22 28" fill="none" stroke="#D4AF37" strokeWidth="1.6"/>
      <path d="M38 23 C38 23 40 20 45 22 C48 24 47 28 43 29 C40 30 38 28 38 28" fill="none" stroke="#D4AF37" strokeWidth="1.6"/>
      <path d="M25 24 L35 24 L35 34 C35 38 30 41 30 41 C30 41 25 38 25 34 Z" fill="#C5A028"/>
      {/* Monogram inside shield */}
      <text x="30" y="32" dominantBaseline="middle" textAnchor="middle" fill="#002B49" fontSize="7" fontWeight="900" fontFamily="Georgia, serif">BT</text>
      {/* Ribbon typography */}
      <text x="30" y="49" dominantBaseline="middle" textAnchor="middle" fill="#F8FAFC" fontSize="5.5" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="0.6">BAHRIA TOWN</text>
    </svg>
  ),

  // 3. Bahria Orchard
  BAHRIA_ORCHARD: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="14" fill="#0F4C2E"/>
      <rect x="2" y="2" width="56" height="56" rx="12" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.7"/>
      {/* Orchard Tree */}
      <circle cx="30" cy="23" r="13" fill="#15803D" opacity="0.6"/>
      <circle cx="25" cy="22" r="9" fill="#16A34A"/>
      <circle cx="35" cy="22" r="9" fill="#16A34A"/>
      <circle cx="30" cy="18" r="10" fill="#22C55E"/>
      {/* Golden fruits on tree */}
      <circle cx="26" cy="17" r="2.2" fill="#FBBF24"/>
      <circle cx="34" cy="17" r="2.2" fill="#FBBF24"/>
      <circle cx="30" cy="23" r="2.2" fill="#FBBF24"/>
      <circle cx="23" cy="23" r="1.8" fill="#FBBF24"/>
      <circle cx="37" cy="23" r="1.8" fill="#FBBF24"/>
      {/* Tree Trunk & Earth */}
      <path d="M28 28 L28 39 L32 39 L32 28 Z" fill="#D4AF37"/>
      <path d="M21 40 Q30 37 39 40" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Label */}
      <text x="30" y="49" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="6.2" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="0.5">ORCHARD</text>
    </svg>
  ),

  // 4. Park View City
  PARK_VIEW: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pvGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#064E3B"/>
          <stop offset="100%" stopColor="#022C22"/>
        </linearGradient>
      </defs>
      <rect width="60" height="60" rx="14" fill="url(#pvGrad)"/>
      <rect x="2" y="2" width="56" height="56" rx="12" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
      {/* Diamond faceted PV mark */}
      <polygon points="30,8 48,22 30,36 12,22" fill="none" stroke="#D4AF37" strokeWidth="2"/>
      <path d="M22 28 L22 16 L27 16 C30 16 32 18 32 20.5 C32 23 30 25 27 25 L22 25" fill="none" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M27 22 L33 32 L39 16" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="30" y="44" dominantBaseline="middle" textAnchor="middle" fill="#D4AF37" fontSize="6.5" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="1">PARK VIEW</text>
      <text x="30" y="52" dominantBaseline="middle" textAnchor="middle" fill="#F8FAFC" fontSize="5.5" fontWeight="600" fontFamily="Arial, sans-serif" letterSpacing="1.2">CITY</text>
    </svg>
  ),

  // 5. Valencia Town
  VALENCIA: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="14" fill="#581C87"/>
      <rect x="2" y="2" width="56" height="56" rx="12" fill="none" stroke="#FDE047" strokeWidth="1.2" strokeOpacity="0.8"/>
      {/* Valencia Landmark Triumphal Arch Gate */}
      <path d="M14 41 L14 18 L46 18 L46 41" fill="none" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M22 41 L22 26 C22 20 38 20 38 26 L38 41" fill="none" stroke="#FDE047" strokeWidth="2.2"/>
      {/* Arch pediment & dentils */}
      <polygon points="12,18 30,11 48,18" fill="#FDE047"/>
      <line x1="16" y1="18" x2="44" y2="18" stroke="#581C87" strokeWidth="1.5"/>
      <circle cx="30" cy="15" r="1.8" fill="#581C87"/>
      {/* Text */}
      <text x="30" y="50" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="6.8" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="0.8">VALENCIA</text>
    </svg>
  ),

  // 6. Central Park Housing
  CENTRAL_PARK: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="28" fill="#14532D" stroke="#86EFAC" strokeWidth="2"/>
      {/* Park Canopy Rays */}
      <path d="M30 14 L30 8 M20 17 L15 13 M40 17 L45 13" stroke="#FDE047" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Central Majestic Tree */}
      <path d="M30 16 C22 16 17 21 17 27 C17 31 20 34 24 35 L26 42 L34 42 L36 35 C40 34 43 31 43 27 C43 21 38 16 30 16 Z" fill="#22C55E"/>
      <path d="M27 34 L27 42 M33 34 L33 42" stroke="#D4AF37" strokeWidth="1.5"/>
      {/* Curving Ribbon */}
      <rect x="12" y="44" width="36" height="9" rx="3" fill="#FBBF24"/>
      <text x="30" y="50" dominantBaseline="middle" textAnchor="middle" fill="#14532D" fontSize="5.8" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="0.4">CENTRAL PARK</text>
    </svg>
  ),

  // 7. Soan Garden Islamabad
  SOAN_GARDEN: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="14" fill="#0C4A6E"/>
      {/* Margalla Hills backdrop */}
      <polygon points="8,34 24,18 38,34" fill="#0284C7" opacity="0.7"/>
      <polygon points="26,34 40,20 54,34" fill="#0369A1" opacity="0.9"/>
      {/* Sun rising */}
      <circle cx="30" cy="18" r="4.5" fill="#FBBF24"/>
      {/* River Soan waves */}
      <path d="M10 38 Q20 34 30 38 T50 38" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 43 Q20 39 30 43 T50 43" fill="none" stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Typography */}
      <text x="30" y="52" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="6.2" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="0.6">SOAN GARDEN</text>
    </svg>
  ),

  // 8. Jan Mander
  JAN_MANDER: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="14" fill="#4C1D95"/>
      <rect x="2" y="2" width="56" height="56" rx="12" fill="none" stroke="#FDE047" strokeWidth="1.2" strokeOpacity="0.8"/>
      {/* Monument dome arch */}
      <path d="M22 40 L22 26 C22 17 38 17 38 26 L38 40" fill="none" stroke="#FDE047" strokeWidth="2.5"/>
      <path d="M30 12 C28 15 32 15 30 12" fill="#FDE047"/>
      <circle cx="30" cy="12" r="2.5" fill="#FDE047"/>
      <line x1="30" y1="14" x2="30" y2="18" stroke="#FDE047" strokeWidth="1.8"/>
      <line x1="16" y1="40" x2="44" y2="40" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round"/>
      <text x="30" y="49.5" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="0.8">JAN MANDER</text>
    </svg>
  ),

  // 9. Engineer Town
  ENGINEER_TOWN: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="14" fill="#1E293B"/>
      {/* Engineering Cogwheel / Gear */}
      <circle cx="30" cy="24" r="14" fill="#334155" stroke="#F59E0B" strokeWidth="2"/>
      <circle cx="30" cy="24" r="7" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5"/>
      {/* Gear teeth */}
      <rect x="28" y="7" width="4" height="5" rx="1" fill="#F59E0B"/>
      <rect x="28" y="36" width="4" height="5" rx="1" fill="#F59E0B"/>
      <rect x="13" y="22" width="5" height="4" rx="1" fill="#F59E0B"/>
      <rect x="42" y="22" width="5" height="4" rx="1" fill="#F59E0B"/>
      {/* Compass legs */}
      <line x1="30" y1="18" x2="24" y2="32" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
      <line x1="30" y1="18" x2="36" y2="32" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="30" cy="18" r="2" fill="#F59E0B"/>
      <text x="30" y="46" dominantBaseline="middle" textAnchor="middle" fill="#F59E0B" fontSize="6" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="0.6">ENGINEER</text>
      <text x="30" y="53" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="5.2" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="0.8">TOWN</text>
    </svg>
  ),

  // 10. Nestlé
  NESTLE: (
    <svg viewBox="0 0 76 44" width="76" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="76" height="44" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1"/>
      {/* Nest with bird icon */}
      <g transform="translate(6, 10)">
        {/* Oak branch & nest */}
        <path d="M2 18 Q12 15 22 18 Q12 21 2 18 Z" fill="#92400E"/>
        {/* Mother bird */}
        <path d="M6 16 C6 11 11 9 14 11 C15 7 19 8 19 12 C20 14 18 16 16 17 Z" fill="#0284C7"/>
        <circle cx="16" cy="10" r="1.5" fill="#FFFFFF"/>
        <polygon points="18,10 21,11 18,12" fill="#F59E0B"/>
        {/* Little fledglings */}
        <circle cx="10" cy="15" r="2" fill="#38BDF8"/>
        <circle cx="8" cy="16" r="1.8" fill="#38BDF8"/>
      </g>
      {/* Nestlé signature typography */}
      <text x="31" y="24" dominantBaseline="middle" textAnchor="start" fill="#005CA9" fontSize="15" fontWeight="800" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="-0.3">
        Nestlé
      </text>
      <line x1="33" y1="14" x2="68" y2="14" stroke="#005CA9" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),

  // 11. KFC
  KFC: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      {/* Red container */}
      <rect width="60" height="60" rx="12" fill="#E4002B"/>
      {/* Signature 3 white vertical stripes */}
      <rect x="8" y="0" width="10" height="60" fill="#FFFFFF"/>
      <rect x="25" y="0" width="10" height="60" fill="#FFFFFF"/>
      <rect x="42" y="0" width="10" height="60" fill="#FFFFFF"/>
      {/* Red banner across center */}
      <rect x="0" y="16" width="60" height="28" fill="#E4002B"/>
      {/* KFC Bold Typography */}
      <text x="30" y="32" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="900" fontFamily="Arial Black, Arial, sans-serif" fontStyle="italic" letterSpacing="0.5">
        KFC
      </text>
      {/* Colonel Black Bowtie symbol */}
      <polygon points="26,48 34,48 30,51" fill="#000000"/>
      <polygon points="26,54 34,54 30,51" fill="#000000"/>
      <line x1="28" y1="51" x2="25" y2="57" stroke="#000000" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="32" y1="51" x2="35" y2="57" stroke="#000000" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),

  // 12. ECS (Ehsan Chappal Store)
  ECS: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill="#111827"/>
      <rect x="3" y="3" width="54" height="54" rx="9" fill="none" stroke="#D4AF37" strokeWidth="1.2"/>
      {/* Luxury Royal Crown */}
      <polygon points="20,18 24,13 30,16 36,13 40,18" fill="#D4AF37"/>
      <circle cx="24" cy="12.5" r="1.2" fill="#D4AF37"/>
      <circle cx="30" cy="15" r="1.2" fill="#D4AF37"/>
      <circle cx="36" cy="12.5" r="1.2" fill="#D4AF37"/>
      {/* ECS Brandmark */}
      <text x="30" y="34" dominantBaseline="middle" textAnchor="middle" fill="#FBBF24" fontSize="17" fontWeight="900" fontFamily="Georgia, serif" letterSpacing="1.5">
        ECS
      </text>
      <line x1="18" y1="42" x2="42" y2="42" stroke="#D4AF37" strokeWidth="0.8"/>
      <text x="30" y="48" dominantBaseline="middle" textAnchor="middle" fill="#9CA3AF" fontSize="5" fontWeight="600" fontFamily="Arial, sans-serif" letterSpacing="1.5">
        EST. 1954
      </text>
    </svg>
  ),

  // 13. Emporium Mall / Nishat
  EMPORIUM: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill="#18181B"/>
      {/* 3D Faceted Diamond Geometric Mark */}
      <polygon points="30,8 48,22 30,36 12,22" fill="#D4AF37" opacity="0.9"/>
      <polygon points="30,8 30,36 12,22" fill="#F59E0B"/>
      <polygon points="30,8 48,22 30,22" fill="#FDE047" opacity="0.7"/>
      <polygon points="30,36 12,22 30,22" fill="#B45309" opacity="0.8"/>
      {/* Letter 'E' stylized monogram */}
      <path d="M26 15 L35 15 M26 22 L33 22 M26 29 L35 29 M26 15 L26 29" stroke="#18181B" strokeWidth="2.2" strokeLinecap="round"/>
      <text x="30" y="47" dominantBaseline="middle" textAnchor="middle" fill="#D4AF37" fontSize="6.5" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="1">
        EMPORIUM
      </text>
      <text x="30" y="53" dominantBaseline="middle" textAnchor="middle" fill="#71717A" fontSize="4.8" fontWeight="600" fontFamily="Arial, sans-serif" letterSpacing="1">
        NISHAT GROUP
      </text>
    </svg>
  ),

  // 14. Faisal Motors
  FAISAL: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill="#991B1B"/>
      {/* Automotive Speed Wings / Dual Chevrons */}
      <path d="M12 20 L30 11 L48 20 L48 25 L30 16 L12 25 Z" fill="#F8FAFC"/>
      <path d="M16 26 L30 19 L44 26 L44 31 L30 24 L16 31 Z" fill="#FCA5A5"/>
      {/* Typography */}
      <text x="30" y="42" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="Arial Black, Arial, sans-serif" letterSpacing="0.8">
        FAISAL
      </text>
      <text x="30" y="51" dominantBaseline="middle" textAnchor="middle" fill="#FCA5A5" fontSize="6.5" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="1.2">
        MOTORS
      </text>
    </svg>
  ),

  // 15. Damana Group
  DAMANA: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill="#78350F"/>
      <rect x="2" y="2" width="56" height="56" rx="10" fill="none" stroke="#FDE047" strokeWidth="1" strokeOpacity="0.6"/>
      {/* Interlocking Hexagons */}
      <polygon points="30,10 42,17 42,31 30,38 18,31 18,17" fill="none" stroke="#FDE047" strokeWidth="2"/>
      <polygon points="30,15 38,20 38,29 30,34 22,29 22,20" fill="#F59E0B" opacity="0.5"/>
      <text x="30" y="25" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="900" fontFamily="Georgia, serif">
        DG
      </text>
      <text x="30" y="46" dominantBaseline="middle" textAnchor="middle" fill="#FDE047" fontSize="6.2" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="0.8">
        DAMANA
      </text>
      <text x="30" y="52.5" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="600" fontFamily="Arial, sans-serif" letterSpacing="1">
        GROUP
      </text>
    </svg>
  ),

  // 16. Sialko Pak
  SIALKO: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill="#1E3A8A"/>
      {/* Athletic Football / Globe Pattern */}
      <circle cx="30" cy="22" r="13" fill="#FFFFFF"/>
      <polygon points="30,15 34,18 32,23 28,23 26,18" fill="#1E3A8A"/>
      <line x1="30" y1="15" x2="30" y2="10" stroke="#1E3A8A" strokeWidth="1.5"/>
      <line x1="34" y1="18" x2="39" y2="16" stroke="#1E3A8A" strokeWidth="1.5"/>
      <line x1="32" y1="23" x2="36" y2="28" stroke="#1E3A8A" strokeWidth="1.5"/>
      <line x1="28" y1="23" x2="24" y2="28" stroke="#1E3A8A" strokeWidth="1.5"/>
      <line x1="26" y1="18" x2="21" y2="16" stroke="#1E3A8A" strokeWidth="1.5"/>
      {/* Sialko Typography */}
      <text x="30" y="43" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="900" fontFamily="Arial Black, sans-serif" letterSpacing="0.6">
        SIALKO
      </text>
      <text x="30" y="51" dominantBaseline="middle" textAnchor="middle" fill="#93C5FD" fontSize="5.5" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="1">
        SPORTS PAK
      </text>
    </svg>
  ),

  // 17. Nawa-i-Waqt
  NAWAI: (
    <svg viewBox="0 0 74 44" width="74" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="74" height="44" rx="8" fill="#7F1D1D"/>
      <rect x="2" y="2" width="70" height="40" rx="6" fill="none" stroke="#FBBF24" strokeWidth="1"/>
      {/* Traditional Urdu News Banner with Quill */}
      <circle cx="16" cy="22" r="9" fill="#991B1B" stroke="#FBBF24" strokeWidth="1.2"/>
      <path d="M12 25 L16 16 L20 25 L16 22 Z" fill="#FBBF24"/>
      <circle cx="16" cy="18" r="1.5" fill="#FFFFFF"/>
      <text x="29" y="19" dominantBaseline="middle" textAnchor="start" fill="#FBBF24" fontSize="8" fontWeight="800" fontFamily="Georgia, serif">
        نوائے وقت
      </text>
      <text x="29" y="29" dominantBaseline="middle" textAnchor="start" fill="#FFFFFF" fontSize="6.5" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="0.5">
        NAWA-I-WAQT
      </text>
    </svg>
  ),

  // 18. Mimco
  MIMCO: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill="#334155"/>
      {/* Heavy Engineering Steel I-Beam */}
      <path d="M16 14 L44 14 L44 20 L34 20 L34 28 L44 28 L44 34 L16 34 L16 28 L26 28 L26 20 L16 20 Z" fill="#F97316"/>
      <line x1="16" y1="14" x2="44" y2="14" stroke="#FFFFFF" strokeWidth="1"/>
      <line x1="16" y1="34" x2="44" y2="34" stroke="#FFFFFF" strokeWidth="1"/>
      <text x="30" y="44" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="900" fontFamily="Arial Black, sans-serif" letterSpacing="0.8">
        MIMCO
      </text>
      <text x="30" y="52" dominantBaseline="middle" textAnchor="middle" fill="#CBD5E1" fontSize="5" fontWeight="600" fontFamily="Arial, sans-serif" letterSpacing="0.8">
        INDUSTRIES
      </text>
    </svg>
  ),

  // 19. Green Apparel
  GREEN_APPAREL: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill="#14532D"/>
      {/* Textile Weave + Eco Leaf */}
      <path d="M30 11 C20 11 16 22 21 29 C24 33 29 35 30 35 C31 35 36 33 39 29 C44 22 40 11 30 11 Z" fill="#22C55E"/>
      <line x1="30" y1="13" x2="30" y2="34" stroke="#14532D" strokeWidth="1.8"/>
      <path d="M26 20 Q30 22 34 20" stroke="#14532D" strokeWidth="1.5" fill="none"/>
      <path d="M24 25 Q30 27 36 25" stroke="#14532D" strokeWidth="1.5" fill="none"/>
      <text x="30" y="44" dominantBaseline="middle" textAnchor="middle" fill="#86EFAC" fontSize="6.5" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="0.6">
        GREEN
      </text>
      <text x="30" y="52" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="0.8">
        APPAREL
      </text>
    </svg>
  ),

  // 20. Chemtec
  CHEMTEC: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill="#3B0764"/>
      {/* Chemistry Laboratory Flask & Benzene Ring */}
      <polygon points="30,12 39,17 39,27 30,32 21,27 21,17" fill="none" stroke="#38BDF8" strokeWidth="2"/>
      <circle cx="30" cy="22" r="4" fill="none" stroke="#FDE047" strokeWidth="1.5"/>
      <circle cx="30" cy="22" r="1.5" fill="#38BDF8"/>
      <text x="30" y="43" dominantBaseline="middle" textAnchor="middle" fill="#38BDF8" fontSize="7.5" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="0.6">
        CHEMTEC
      </text>
      <text x="30" y="51" dominantBaseline="middle" textAnchor="middle" fill="#E9D5FF" fontSize="5" fontWeight="600" fontFamily="Arial, sans-serif" letterSpacing="0.8">
        PAKISTAN
      </text>
    </svg>
  ),

  // 21. Cellsole Energy
  CELLSOLE: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill="#7C2D12"/>
      {/* Solar Cell Grid with Sun Rays */}
      <circle cx="30" cy="22" r="13" fill="#EA580C"/>
      <line x1="30" y1="6" x2="30" y2="38" stroke="#FEF08A" strokeWidth="1.2"/>
      <line x1="14" y1="22" x2="46" y2="22" stroke="#FEF08A" strokeWidth="1.2"/>
      <line x1="19" y1="11" x2="41" y2="33" stroke="#FEF08A" strokeWidth="1.2"/>
      <line x1="19" y1="33" x2="41" y2="11" stroke="#FEF08A" strokeWidth="1.2"/>
      <circle cx="30" cy="22" r="5" fill="#FACC15"/>
      <text x="30" y="44" dominantBaseline="middle" textAnchor="middle" fill="#FDE047" fontSize="6.5" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="0.6">
        CELLSOLE
      </text>
      <text x="30" y="52" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="5.2" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="1">
        ENERGY
      </text>
    </svg>
  ),

  // 22. Rizwan Target
  RIZWAN_TARGET: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill="#7F1D1D"/>
      {/* Concentric Precision Target Rings */}
      <circle cx="30" cy="22" r="14" fill="#DC2626"/>
      <circle cx="30" cy="22" r="10.5" fill="#FFFFFF"/>
      <circle cx="30" cy="22" r="7" fill="#DC2626"/>
      <circle cx="30" cy="22" r="3.5" fill="#FFFFFF"/>
      <circle cx="30" cy="22" r="1.5" fill="#991B1B"/>
      {/* Speed Crosshairs */}
      <line x1="30" y1="5" x2="30" y2="39" stroke="#FDE047" strokeWidth="1.2"/>
      <line x1="13" y1="22" x2="47" y2="22" stroke="#FDE047" strokeWidth="1.2"/>
      <text x="30" y="44" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="0.6">
        RIZWAN
      </text>
      <text x="30" y="52" dominantBaseline="middle" textAnchor="middle" fill="#FCA5A5" fontSize="5.5" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="1.2">
        TARGET
      </text>
    </svg>
  ),

  // 23. Matlic Solutions
  MATLIC: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill="#0C4A6E"/>
      {/* IT Network Nodes & Digital Isometric Cube */}
      <polygon points="30,10 44,18 30,26 16,18" fill="#0284C7"/>
      <polygon points="16,18 30,26 30,38 16,30" fill="#0369A1"/>
      <polygon points="44,18 30,26 30,38 44,30" fill="#075985"/>
      <circle cx="30" cy="10" r="2" fill="#38BDF8"/>
      <circle cx="44" cy="18" r="2" fill="#38BDF8"/>
      <circle cx="16" cy="18" r="2" fill="#38BDF8"/>
      <circle cx="30" cy="38" r="2" fill="#38BDF8"/>
      <text x="30" y="45" dominantBaseline="middle" textAnchor="middle" fill="#38BDF8" fontSize="6.5" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="0.8">
        MATLIC
      </text>
      <text x="30" y="52" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="600" fontFamily="Arial, sans-serif" letterSpacing="0.8">
        SOLUTIONS
      </text>
    </svg>
  ),

  // 24. Service Co. (Servis)
  SERVIS: (
    <svg viewBox="0 0 68 44" width="68" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="68" height="44" rx="8" fill="#1E3A8A"/>
      {/* Servis Signature Wings / Red Ribbon */}
      <path d="M8 22 L22 10 L30 10 L16 22 L30 34 L22 34 Z" fill="#DC2626"/>
      <text x="33" y="24" dominantBaseline="middle" textAnchor="start" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="Arial Black, sans-serif" fontStyle="italic" letterSpacing="0.8">
        Servis
      </text>
    </svg>
  ),

  // 25. PAF (Pakistan Air Force)
  PAF: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      {/* Official PAF Roundel */}
      <circle cx="30" cy="30" r="28" fill="#003580" stroke="#C5A028" strokeWidth="2"/>
      <circle cx="30" cy="30" r="24" fill="#01411C"/>
      <circle cx="30" cy="30" r="17" fill="#FFFFFF"/>
      <circle cx="30" cy="30" r="11" fill="#01411C"/>
      {/* National Crescent & Star */}
      <circle cx="30" cy="30" r="7.5" fill="#FFFFFF"/>
      <circle cx="32" cy="28.5" r="6.2" fill="#01411C"/>
      <polygon points="34,26 34.8,28 37,28 35.2,29.2 35.8,31.2 34,30 32.2,31.2 32.8,29.2 31,28 33.2,28" fill="#FFFFFF"/>
      {/* Eagle Crown at Top */}
      <polygon points="30,4 34,10 30,8 26,10" fill="#FBBF24"/>
      {/* Text Arc */}
      <rect x="18" y="47" width="24" height="8" rx="2" fill="#003580"/>
      <text x="30" y="52" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="900" fontFamily="Arial Black, sans-serif" letterSpacing="1.2">
        PAF
      </text>
    </svg>
  ),

  // 26. Governor House (State Emblem of Pakistan)
  GOVERNOR: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill="#1E1B4B"/>
      {/* Crescent & Star atop */}
      <circle cx="30" cy="14" r="5" fill="#FBBF24"/>
      <circle cx="31.8" cy="13" r="4.2" fill="#1E1B4B"/>
      <polygon points="33,11 33.6,12.5 35.2,12.5 33.9,13.4 34.4,14.9 33,14 31.6,14.9 32.1,13.4 30.8,12.5 32.4,12.5" fill="#FBBF24"/>
      {/* Quartered Shield */}
      <path d="M22 19 L38 19 L38 29 C38 35 30 38 30 38 C30 38 22 35 22 29 Z" fill="#047857" stroke="#FBBF24" strokeWidth="1.5"/>
      <line x1="30" y1="19" x2="30" y2="38" stroke="#FBBF24" strokeWidth="1"/>
      <line x1="22" y1="28" x2="38" y2="28" stroke="#FBBF24" strokeWidth="1"/>
      {/* Jasmine Floral Wreath */}
      <path d="M16 23 C14 32 20 42 30 43 C40 42 46 32 44 23" fill="none" stroke="#FBBF24" strokeWidth="1.5"/>
      <text x="30" y="51" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="800" fontFamily="Georgia, serif" letterSpacing="0.8">
        GOVERNOR
      </text>
    </svg>
  ),

  // 27. Pakistan Radio (Radio Pakistan / PBC)
  RADIO: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill="#991B1B"/>
      {/* Radio Transmission Mast */}
      <line x1="30" y1="8" x2="30" y2="36" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
      <polygon points="25,36 35,36 30,12" fill="none" stroke="#FFFFFF" strokeWidth="1.2"/>
      <line x1="26" y1="30" x2="34" y2="30" stroke="#FFFFFF" strokeWidth="1"/>
      <line x1="27" y1="24" x2="33" y2="24" stroke="#FFFFFF" strokeWidth="1"/>
      <line x1="28" y1="18" x2="32" y2="18" stroke="#FFFFFF" strokeWidth="1"/>
      {/* Broadcast Radio Waves */}
      <path d="M22 14 Q30 8 38 14" fill="none" stroke="#FDE047" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M16 10 Q30 0 44 10" fill="none" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" opacity="0.75"/>
      <circle cx="30" cy="8" r="2.2" fill="#FDE047"/>
      <text x="30" y="44" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="6.2" fontWeight="900" fontFamily="Arial Black, sans-serif" letterSpacing="0.5">
        RADIO PAKISTAN
      </text>
      <text x="30" y="52" dominantBaseline="middle" textAnchor="middle" fill="#FCA5A5" fontSize="5" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="1">
        BROADCASTING
      </text>
    </svg>
  ),

  // 28. HEC / UET
  HEC: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill="#065F46"/>
      {/* Laurel Wreath */}
      <circle cx="30" cy="22" r="14" fill="none" stroke="#FDE047" strokeWidth="1.5" strokeDasharray="3 1.5"/>
      {/* Open Academic Book */}
      <path d="M22 28 Q30 25 30 21 Q30 25 38 28 L38 18 Q30 15 30 19 Q30 15 22 18 Z" fill="#FFFFFF"/>
      <line x1="30" y1="19" x2="30" y2="28" stroke="#065F46" strokeWidth="1.5"/>
      {/* Torch of Knowledge */}
      <line x1="30" y1="11" x2="30" y2="18" stroke="#FDE047" strokeWidth="2"/>
      <circle cx="30" cy="10" r="2.2" fill="#EF4444"/>
      <text x="30" y="42" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="1">
        HEC
      </text>
      <text x="30" y="51" dominantBaseline="middle" textAnchor="middle" fill="#A7F3D0" fontSize="5.5" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="1">
        PAKISTAN
      </text>
    </svg>
  ),

  // 29. Pakistan Rangers
  RANGERS: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill="#143419"/>
      {/* Rangers Shield */}
      <path d="M16 10 L44 10 L44 32 C44 42 30 46 30 46 C30 46 16 42 16 32 Z" fill="#1E3A1E" stroke="#FBBF24" strokeWidth="2"/>
      {/* Crossed Sabres / Swords */}
      <line x1="22" y1="34" x2="38" y2="18" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="38" y1="34" x2="22" y2="18" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round"/>
      {/* Center 5-Point Star */}
      <polygon points="30,16 32,21 37,21 33,24 35,29 30,26 25,29 27,24 23,21 28,21" fill="#FBBF24"/>
      {/* Banner */}
      <rect x="12" y="47" width="36" height="9" rx="2" fill="#991B1B"/>
      <text x="30" y="52.5" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="5.8" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="0.8">
        RANGERS
      </text>
    </svg>
  ),

  // 30. Hamid Latif Hospital
  HAMID: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill="#0369A1"/>
      {/* Medical Red / White Cross */}
      <rect x="25" y="10" width="10" height="26" rx="2" fill="#FFFFFF"/>
      <rect x="17" y="18" width="26" height="10" rx="2" fill="#FFFFFF"/>
      {/* Healing Pulse Line */}
      <path d="M14 23 L23 23 L26 15 L29 31 L32 20 L35 23 L46 23" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="30" y="44" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="0.6">
        HAMID LATIF
      </text>
      <text x="30" y="52" dominantBaseline="middle" textAnchor="middle" fill="#BAE6FD" fontSize="5.2" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="0.8">
        HOSPITAL
      </text>
    </svg>
  ),

  // 31. Umar Hospital
  UMAR: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill="#0F766E"/>
      {/* Medical Cross & Caring Crescent */}
      <circle cx="30" cy="22" r="14" fill="#134E4A"/>
      <rect x="27" y="14" width="6" height="16" rx="2" fill="#EF4444"/>
      <rect x="22" y="19" width="16" height="6" rx="2" fill="#EF4444"/>
      {/* Caring Hands / Leaf Curve */}
      <path d="M18 28 C20 34 26 36 30 36 C34 36 40 34 42 28" fill="none" stroke="#5EEAD4" strokeWidth="2" strokeLinecap="round"/>
      <text x="30" y="44" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="6.8" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="0.6">
        UMAR
      </text>
      <text x="30" y="52" dominantBaseline="middle" textAnchor="middle" fill="#99F6E4" fontSize="5.2" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="0.8">
        HOSPITAL
      </text>
    </svg>
  ),

  // 32. Beaconhouse / BNU
  BEACONHOUSE: (
    <svg viewBox="0 0 76 44" width="76" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="76" height="44" rx="8" fill="#FFFFFF" stroke="#FEE2E2" strokeWidth="1.2"/>
      {/* Official Iconic Concentric Red Circles */}
      <circle cx="16" cy="22" r="11" fill="#DC2626"/>
      <circle cx="16" cy="22" r="7.5" fill="#FFFFFF"/>
      <circle cx="16" cy="22" r="4.5" fill="#DC2626"/>
      <circle cx="16" cy="22" r="2" fill="#FFFFFF"/>
      {/* Beaconhouse typography */}
      <text x="32" y="19" dominantBaseline="middle" textAnchor="start" fill="#DC2626" fontSize="7.2" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="0.6">
        BEACONHOUSE
      </text>
      <text x="32" y="28" dominantBaseline="middle" textAnchor="start" fill="#7F1D1D" fontSize="5.8" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="0.8">
        SCHOOL SYSTEM
      </text>
    </svg>
  ),

  // 33. NSSE (School of Eminence)
  NSSE: (
    <svg viewBox="0 0 60 60" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill="#155E75"/>
      {/* Heraldic Shield with Open Book & Star */}
      <path d="M18 10 L42 10 L42 28 C42 37 30 42 30 42 C30 42 18 37 18 28 Z" fill="#083344" stroke="#FBBF24" strokeWidth="1.8"/>
      {/* Open Book */}
      <path d="M22 26 Q30 23 30 19 Q30 23 38 26 L38 20 Q30 17 30 20 Q30 17 22 20 Z" fill="#FFFFFF"/>
      {/* Star above */}
      <polygon points="30,12 31.5,15 35,15 32,17 33.5,20 30,18 26.5,20 28,17 25,15 28.5,15" fill="#FBBF24"/>
      <text x="30" y="49" dominantBaseline="middle" textAnchor="middle" fill="#FBBF24" fontSize="7" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="1">
        NSSE
      </text>
    </svg>
  ),
};

const CLIENTS: ClientLogo[] = [
  // Housing Societies & Residential
  { name: "DHA LAHORE",      category: "Housing Society",    color: "#1C3557", logo: "DHA" },
  { name: "BAHRIA TOWN",     category: "Housing Society",    color: "#003366", logo: "BAHRIA" },
  { name: "BAHRIA ORCHARD",  category: "Housing Society",    color: "#0F4C2E", logo: "BAHRIA_ORCHARD" },
  { name: "PARK VIEW",       category: "Housing Society",    color: "#064E3B", logo: "PARK_VIEW" },
  { name: "VALENCIA",        category: "Residential Project", color: "#581C87", logo: "VALENCIA" },
  { name: "CENTRAL PARK",    category: "Housing Society",    color: "#14532D", logo: "CENTRAL_PARK" },
  { name: "SOAN GARDEN",     category: "Islamabad",          color: "#0C4A6E", logo: "SOAN_GARDEN" },
  { name: "JAN MANDER",      category: "Housing Society",    color: "#4C1D95", logo: "JAN_MANDER" },
  { name: "ENGINEER TOWN",   category: "Housing Society",    color: "#1E293B", logo: "ENGINEER_TOWN" },

  // Corporate & Commercial
  { name: "NESTLÉ",          category: "Corporate",          color: "#FFFFFF", logo: "NESTLE" },
  { name: "KFC",             category: "Commercial",         color: "#E4002B", logo: "KFC" },
  { name: "ECS",             category: "Retail",             color: "#111827", logo: "ECS" },
  { name: "EMPORIUM TOWER",  category: "Commercial",         color: "#18181B", logo: "EMPORIUM" },
  { name: "FAISAL MOTORS",   category: "Automotive",         color: "#991B1B", logo: "FAISAL" },
  { name: "DAMANA GROUP",    category: "Corporate",          color: "#78350F", logo: "DAMANA" },
  { name: "SIALKO PAK",      category: "Sports Industrial",  color: "#1E3A8A", logo: "SIALKO" },
  { name: "NAWA-I-WAQAT",   category: "Media",              color: "#7F1D1D", logo: "NAWAI" },
  { name: "MIMCO",           category: "Industrial",         color: "#334155", logo: "MIMCO" },
  { name: "GREEN APPAREL",   category: "Industrial",         color: "#14532D", logo: "GREEN_APPAREL" },
  { name: "CHEMTEC",         category: "Industrial",         color: "#3B0764", logo: "CHEMTEC" },
  { name: "CELLSOLE ENERGY", category: "Energy",             color: "#7C2D12", logo: "CELLSOLE" },
  { name: "RIZWAN TARGET",   category: "Commercial",         color: "#7F1D1D", logo: "RIZWAN_TARGET" },
  { name: "MATLIC SOLUTIONS",category: "Technology",         color: "#0C4A6E", logo: "MATLIC" },
  { name: "SERVICE CO.",     category: "Commercial",         color: "#1E3A8A", logo: "SERVIS" },

  // Government & Defence
  { name: "PAF",             category: "Pakistan Air Force", color: "#003580", logo: "PAF" },
  { name: "GOVERNOR HOUSE",  category: "Government",         color: "#1E1B4B", logo: "GOVERNOR" },
  { name: "PAKISTAN RADIO",  category: "Government",         color: "#991B1B", logo: "RADIO" },
  { name: "HEC / UET",       category: "Public Sector",      color: "#065F46", logo: "HEC" },
  { name: "RANGERS RISE",    category: "Defence",            color: "#143419", logo: "RANGERS" },

  // Healthcare
  { name: "HAMID LATIF",     category: "Hospital",           color: "#0369A1", logo: "HAMID" },
  { name: "UMAR HOSPITAL",   category: "Healthcare",         color: "#0F766E", logo: "UMAR" },

  // Educational
  { name: "BEACONHOUSE/BNU", category: "Education",          color: "#FFFFFF", logo: "BEACONHOUSE" },
  { name: "NSSE",            category: "School of Eminence", color: "#155E75", logo: "NSSE" },
];

function LogoMark({ client }: { client: ClientLogo }) {
  const svg = LOGO_SVGS[client.logo];
  if (svg) {
    return (
      <div className="client-logo-svg-wrap" title={client.name}>
        {svg}
      </div>
    );
  }
  return (
    <div className="client-logo-mark" style={{ background: client.color }}>
      <span className="client-logo-initials" style={{ color: client.textColor || "#fff" }}>
        {client.name.slice(0, 2)}
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

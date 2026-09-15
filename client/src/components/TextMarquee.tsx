interface MarqueeItem {
  text: string;
  highlight?: boolean;
}

const defaultItems: MarqueeItem[] = [
  { text: "CANTILEVER CAR PARKING SHADES", highlight: true },
  { text: "LAHORE · DHA & BAHRIA TOWN" },
  { text: "TENSILE MEMBRANE STRUCTURES" },
  { text: "ISLAMABAD & RAWALPINDI" },
  { text: "SWIMMING POOL SHADES" },
  { text: "KARACHI COASTAL SPECS" },
  { text: "GERMAN MEHLER PVDF FABRIC", highlight: true },
  { text: "PADEL COURT ENCLOSURES" },
  { text: "ZERO FRONT COLUMN PARKING" },
  { text: "15-YEAR WEATHER WARRANTY" },
  { text: "WHATSAPP 0302 4001063", highlight: true },
];

export function TextMarquee({ items = defaultItems }: { items?: MarqueeItem[] }) {
  // We duplicate items to create a seamless infinite loop
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <section className="text-marquee-section" aria-label="Services and capabilities marquee">
      <div className="text-marquee-track">
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="text-marquee-item">
            <svg
              className="text-marquee-star"
              width="24"
              height="24"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M30 0L38.1027 21.8973L60 30L38.1027 38.1027L30 60L21.8973 38.1027L0 30L21.8973 21.8973L30 0Z"
                fill="#EA1826"
              />
            </svg>
            <span className={`text-marquee-label ${item.highlight ? "highlight" : ""}`}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

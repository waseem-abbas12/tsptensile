interface ClientLogo {
  name: string;
  category: string;
}

const CLIENTS: ClientLogo[] = [
  { name: "DHA LAHORE", category: "Residential & Commercial" },
  { name: "EMPORIUM MALL", category: "Commercial Canopy" },
  { name: "GOURMET", category: "Industrial Facility" },
  { name: "PACKAGES MALL", category: "Public Infrastructure" },
  { name: "NESTLE PAKISTAN", category: "Corporate Campus" },
  { name: "PCL", category: "Industrial Shade" },
  { name: "HAMEED LATIF", category: "Hospital Canopy" },
  { name: "RLMC", category: "Institutional Arena" },
];

export function ClientLogosMarquee() {
  const repeated = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section className="client-logos-section" aria-label="Corporate and Commercial Clients">
      <div className="container">
        <div className="client-logos-header">
          <span className="client-logos-eyebrow">TRUSTED BY LEADING DEVELOPERS & CORPORATIONS</span>
        </div>
      </div>
      <div className="client-logos-track-wrap">
        <div className="client-logos-track">
          {repeated.map((client, idx) => (
            <div key={idx} className="client-logo-item">
              <div className="client-logo-mark">
                <span className="client-logo-initials">{client.name.slice(0, 2)}</span>
              </div>
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

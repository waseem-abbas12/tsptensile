interface ClientLogo {
  name: string;
  category: string;
}

const CLIENTS: ClientLogo[] = [
  // Housing Societies & Residential
  { name: "DHA LAHORE", category: "Housing Society" },
  { name: "BAHRIA TOWN", category: "Housing Society" },
  { name: "BAHRIA ORCHARD", category: "Housing Society" },
  { name: "PARK VIEW", category: "Housing Society" },
  { name: "VALENCIA", category: "Residential Project" },
  { name: "CENTRAL PARK", category: "Housing Society" },
  { name: "SOAN GARDEN", category: "Residential – Islamabad" },
  // Corporate & Commercial
  { name: "NESTLÉ", category: "Corporate – Sheikhupura" },
  { name: "KFC", category: "Commercial" },
  { name: "ECS", category: "Commercial" },
  { name: "EMPORIUM TOWER", category: "Commercial" },
  { name: "FAISAL MOTORS", category: "Commercial" },
  { name: "DAMANA GROUP", category: "Corporate" },
  { name: "SIALKO PAK SPORTS", category: "Industrial" },
  { name: "NAWA-I-WAQAT", category: "Commercial" },
  // Government & Defence
  { name: "PAF", category: "Pakistan Air Force" },
  { name: "GOVERNOR HOUSE", category: "Government" },
  { name: "PAKISTAN RADIO", category: "Government – Islamabad" },
  { name: "HEC / UET", category: "Public Sector" },
  { name: "RANGERS RISE", category: "Defence" },
  // Healthcare
  { name: "HAMID LATIF HOSPITAL", category: "Healthcare" },
  { name: "UMAR HOSPITAL", category: "Healthcare" },
  // Educational
  { name: "BEACONHOUSE / BNU", category: "Educational" },
  { name: "NSSE", category: "Nawaz Sharif School of Eminence" },
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

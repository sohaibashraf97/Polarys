const companies = [
  { name: "Salesforce", value: "$25bn" },
  { name: "HubSpot", value: "$30bn" },
  { name: "Stripe", value: "$55bn" },
  { name: "Notion", value: "$10bn" },
  { name: "Figma", value: "$12bn" },
  { name: "Slack", value: "$27bn" },
  { name: "Canva", value: "$8bn" },
  { name: "Airtable", value: "$1.5bn" },
];

function LogoRow({
  direction,
}: {
  direction: "left" | "right";
}) {
  const items = [...companies, ...companies];

  return (
    <div className="overflow-hidden py-3">
      <div
        className={`flex gap-8 w-max ${
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        }`}
      >
        {items.map((company, i) => (
          <div
            key={`${company.name}-${i}`}
            className="flex items-center gap-3 bg-surface border border-border rounded-none px-5 py-2.5 shadow-sm whitespace-nowrap"
          >
            <div className="w-8 h-8 rounded-none bg-surface-light flex items-center justify-center text-xs font-bold text-muted">
              {company.name.charAt(0)}
            </div>
            <span className="text-sm font-medium text-secondary">
              {company.name}
            </span>
            <span className="text-xs font-semibold text-accent bg-accent-light px-2 py-0.5 rounded-none">
              {company.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section className="py-10 bg-surface">
      <p className="text-center text-xs font-semibold text-muted uppercase tracking-widest mb-4">
        Trusted by leaders at
      </p>
      <LogoRow direction="left" />
      <LogoRow direction="right" />
    </section>
  );
}

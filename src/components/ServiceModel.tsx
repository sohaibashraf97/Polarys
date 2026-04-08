import { Check } from "lucide-react";

const models = [
  {
    title: "Done For You",
    subtitle: "We handle everything",
    audience: [
      "$100k+/mo agencies",
      "$30k+/mo coaches & consultants",
      "Investor-backed SaaS founders",
    ],
    highlight: true,
  },
  {
    title: "Done With You",
    subtitle: "Coaching & guidance",
    audience: [
      "Growing agencies",
      "Coaches & consultants",
      "Early-stage startups",
      "Founders & CEOs",
    ],
    highlight: false,
  },
];

export default function ServiceModel() {
  return (
    <section id="coaching" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Choose Your <span className="highlight">Model</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Whether you want us to run it all or teach you the system — we have
            a path for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {models.map((model) => (
            <div
              key={model.title}
              className={`rounded-none p-8 border-2 ${
                model.highlight
                  ? "border-accent bg-accent-light shadow-lg shadow-accent/10"
                  : "border-border bg-surface"
              }`}
            >
              {model.highlight && (
                <span className="text-xs font-bold bg-accent text-white px-3 py-1 rounded-none">
                  Most Popular
                </span>
              )}
              <h3
                className={`text-2xl font-extrabold ${model.highlight ? "mt-4" : ""} mb-1`}
              >
                {model.title}
              </h3>
              <p className="text-sm text-muted mb-6">{model.subtitle}</p>

              <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">
                Ideal for
              </p>
              <ul className="space-y-3">
                {model.audience.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-secondary"
                  >
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#book-call"
                className={`mt-8 block text-center font-semibold text-sm px-6 py-3 rounded-none transition-colors ${
                  model.highlight
                    ? "bg-accent hover:bg-accent-dark text-white"
                    : "bg-surface-light hover:bg-border text-secondary"
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

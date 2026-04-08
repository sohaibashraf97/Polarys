const steps = [
  {
    day: "Day 1",
    title: "Kickoff Alignment Call",
    description:
      "We align on goals, positioning, and target audience to build a tailored strategy.",
  },
  {
    day: "Day 2",
    title: "Account & Competitor Audits",
    description:
      "Deep dive into your profile, competitors, and market to find untapped opportunities.",
  },
  {
    day: "Day 3",
    title: "Positioning & Messaging",
    description:
      "Refine your personal brand messaging to resonate with your ideal clients.",
  },
  {
    day: "Day 4",
    title: "Live Profile Updates",
    description:
      "We optimize your LinkedIn profile — headline, about section, featured, and banner.",
  },
  {
    day: "Day 5-6",
    title: "First Content Published",
    description:
      "Your first batch of content goes live — posts, carousels, or video tailored to your voice.",
  },
  {
    day: "Day 7",
    title: "Outreach Campaign Launch",
    description:
      "Personalized outreach begins — connecting with ideal prospects at scale.",
  },
];

export default function First7Days() {
  return (
    <section className="py-20 px-4 bg-surface">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Your First <span className="highlight">7 Days</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Here is exactly what happens when you get started.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.day}
              className="bg-surface-light rounded-none p-6 border border-border relative"
            >
              <div className="absolute -top-3 left-6 bg-accent text-white text-xs font-bold px-3 py-1 rounded-none">
                {step.day}
              </div>
              <div className="mt-3">
                <div className="w-10 h-10 bg-background rounded-none flex items-center justify-center mb-4 text-lg font-bold text-muted">
                  {i + 1}
                </div>
                <h3 className="text-base font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

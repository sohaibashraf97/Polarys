import Image from "next/image";

const clients = [
  {
    name: "Entropy Health",
    logo: "/clients_png/entropyhealth.png",
  },
  {
    name: "Gryd Energy",
    logo: "/clients_png/grydenergy.png",
  },
  {
    name: "HEX",
    logo: "/clients_png/hex.png",
  },
  {
    name: "Milkstraw AI",
    logo: "/clients_png/milkstraw.png",
  },
];

export default function Clients() {
  return (
    <section id="clients" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Trusted by <span className="highlight">Innovative Teams</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            We help high-growth companies turn founder-led LinkedIn into a
            reliable revenue channel.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {clients.map((client) => (
            <div
              key={client.name}
              className="card-hover bg-surface border border-border p-6 sm:p-7 min-h-[130px] flex items-center justify-center"
            >
              <Image
                src={client.logo}
                alt={`${client.name} logo`}
                width={220}
                height={90}
                className="h-12 sm:h-14 w-auto object-contain opacity-90"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

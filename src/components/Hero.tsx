import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero pt-28 pb-16 md:pt-36 md:pb-24 px-4 relative overflow-hidden">
      {/* Decorative logo outline */}
      <Image
        src="/logo-outline.svg"
        alt=""
        aria-hidden="true"
        width={418}
        height={421}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[40vw] max-w-[980px] h-auto opacity-10 pointer-events-none select-none z-[1]"
        priority
      />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          We turn your LinkedIn
          <br />
          into a <span className="highlight">consistent revenue</span> machine.
        </h1>

        {/* Social proof bar */}
        <div className="mt-10 mb-12">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-5 px-4 py-3 sm:px-6">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted text-center sm:text-left">
                Trusted by founders backed by
              </span>
              <div className="flex items-center gap-3">
                <Image
                  src="/backed_by/Y_Combinator_logo.svg.png"
                  alt="Y Combinator"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
                <Image
                  src="/backed_by/speedinvest_logo.png"
                  alt="Speedinvest"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
                <Image
                  src="/backed_by/a16z_logo.jpg"
                  alt="a16z"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
                <Image
                  src="/backed_by/softbank.png"
                  alt="SoftBank"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>
            </div>

            <div className="h-px w-full max-w-md bg-border/70" />

            <div className="flex flex-wrap items-start justify-center gap-8 sm:gap-12">
              <div className="flex items-start gap-3 text-left leading-none">
                <p className="text-5xl sm:text-6xl font-extrabold tracking-tight text-foreground">
                  <span className="text-accent">+</span>40
                </p>
                <p className="pt-1 text-[0.95rem] sm:text-lg font-bold uppercase tracking-[0.08em] text-foreground leading-[0.95]">
                  TRUSTED
                  <br />
                  FOUNDERS
                </p>
              </div>
              <div className="flex items-start gap-3 text-left leading-none">
                <p className="text-5xl sm:text-6xl font-extrabold tracking-tight text-foreground">
                  <span className="text-accent">+</span>$50M
                </p>
                <p className="pt-1 text-[0.95rem] sm:text-lg font-bold uppercase tracking-[0.08em] text-foreground leading-[0.95]">
                  PIPELINE
                  <br />
                  GENERATED
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

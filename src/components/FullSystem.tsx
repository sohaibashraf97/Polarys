"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useDialKit } from "dialkit";

const ROTATIONS = [-3.5, 1.8, -1.2, 2.8, -2.4];
const Y_OFFSETS = [12, -6, 18, -10, 8];

const services = [
  {
    number: 1,
    title: "Founder Interviews",
    description:
      "We interview founders monthly to extract unique insights, stories, and perspectives that fuel authentic content.",
  },
  {
    number: 2,
    title: "Content Planning & Publishing",
    description:
      "Strategic content planning, copywriting, design, and scheduling — all done for you on a weekly cadence.",
  },
  {
    number: 3,
    title: "DM Management & Appointment Setting",
    description:
      "We manage your LinkedIn inbox, qualify leads, and book calls directly onto your calendar.",
  },
  {
    number: 4,
    title: "Targeted LinkedIn Ads",
    description:
      "Low-cost, high-impact LinkedIn ad campaigns that boost your best content to ideal prospects.",
  },
  {
    number: 5,
    title: "Hyper-Personalized Outreach",
    description:
      "Scaled outbound campaigns that feel personal — targeting decision makers with tailored messaging.",
  },
];

export default function FullSystem() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const params = useDialKit("Sticky Notes", {
    card: {
      width: [260, 120, 500],
      height: [260, 120, 600],
      gap: [20, 4, 80],
      cornerRadius: [13, 0, 40],
    },
    gradient: {
      intensity: [0.18, 0, 0.6],
      posX: [100, 0, 100],
      posY: [0, 0, 100],
    },
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const { width, height, gap, cornerRadius } = params.card;
  const { intensity, posX, posY } = params.gradient;

  return (
    <section ref={sectionRef} id="agency" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            The <span className="highlight">Full System</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Everything you need to turn LinkedIn into a predictable, profitable
            channel — without lifting a finger.
          </p>
        </div>

        {/*
          Outer div: overflow hidden + mask creates the edge fade.
          Inner div: actually scrolls, scrollbar hidden via .no-scrollbar.
        */}
        <div
          style={{
            overflow: "hidden",
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div
            className="no-scrollbar"
            style={{ overflowX: "auto", paddingBottom: "1.5rem" }}
          >
            <div
              className="sticky-note-board"
              style={{
                gap: `${gap}px`,
                flexWrap: "nowrap",
                width: "max-content",
                margin: "0 auto",
              }}
            >
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className={`sticky-note ${isVisible ? "is-visible" : ""}`}
                  style={
                    {
                      "--note-rotation": `${ROTATIONS[index]}deg`,
                      "--note-y-offset": `${Y_OFFSETS[index]}px`,
                      "--note-delay": `${index * 120}ms`,
                      width: `${width}px`,
                      height: `${height}px`,
                      minHeight: "unset",
                      borderRadius: `${cornerRadius}px`,
                      background: `
                        linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%),
                        radial-gradient(ellipse at ${posX}% ${posY}%, rgba(1,120,250,${intensity}), transparent 62%),
                        #131313
                      `,
                    } as CSSProperties
                  }
                >
                  <h3
                    className="font-bold mb-2"
                    style={{ fontSize: 14, display: "flex", alignItems: "baseline", gap: "0.35em" }}
                  >
                    <span style={{ color: "#0178FA", fontVariantNumeric: "tabular-nums" }}>
                      #{service.number}
                    </span>
                    {service.title}
                  </h3>
                  <p className="text-muted" style={{ fontSize: 12.5, lineHeight: 1.65 }}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

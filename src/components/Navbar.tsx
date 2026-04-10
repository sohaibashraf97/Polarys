"use client";

import { useDialKit } from "dialkit";
import Image from "next/image";

function hexToRgb(hex: string) {
  const cleaned = hex.replace("#", "");
  const normalized = cleaned.length === 3
    ? cleaned.split("").map((char) => char + char).join("")
    : cleaned;

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return { r: 255, g: 255, b: 255 };
  }

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

export default function Navbar() {
  const logoParams = { logoHeight: 23, offsetX: 8, offsetY: -1 };
  const gridParams = useDialKit("Navbar Grid", {
    gridColor: { type: "color", default: "#a6a6a6" },
    rowMinorOpacity: [0.05, 0, 0.4],
    rowMajorOpacity: [0.15, 0, 1],
    colMinorOpacity: [0.03, 0, 0.4],
    colMajorOpacity: [0.13, 0, 1],
  });
  const { r, g, b } = hexToRgb(gridParams.gridColor);

  return (
    <>
      {/* SVG filter for ASCII pixelation backdrop */}
      <svg
        aria-hidden="true"
        style={{ position: "fixed", width: 0, height: 0, overflow: "hidden", top: 0, left: 0 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id="ascii-pixelate"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feFlood x="2" y="3" height="1" width="1" />
            <feComposite width="5" height="8" />
            <feTile result="a" />
            <feComposite in="SourceGraphic" in2="a" operator="in" />
            <feMorphology operator="dilate" radius="2 3" />
          </filter>
        </defs>
      </svg>

      <header
        className="fixed top-0 left-0 right-0 z-50 border-b border-border overflow-hidden"
        style={{
          backdropFilter: "url(#ascii-pixelate)",
          WebkitBackdropFilter: "url(#ascii-pixelate)",
          background: "rgba(12, 12, 12, 0.88)",
        }}
      >
        {/* Character-cell grid overlay — horizontal rows + vertical columns at ASCII proportions */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: [
              `repeating-linear-gradient(0deg, transparent 0px, transparent 7px, rgba(${r},${g},${b},${gridParams.rowMinorOpacity}) 7px, rgba(${r},${g},${b},${gridParams.rowMajorOpacity}) 8px)`,
              `repeating-linear-gradient(90deg, transparent 0px, transparent 4px, rgba(${r},${g},${b},${gridParams.colMinorOpacity}) 4px, rgba(${r},${g},${b},${gridParams.colMajorOpacity}) 5px)`,
            ].join(", "),
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <Image
              src="/logo_png.png"
              alt="Polarys"
              width={120}
              height={40}
              style={{ height: logoParams.logoHeight, width: "auto", transform: `translate(${logoParams.offsetX}px, ${logoParams.offsetY}px)` }}
            />
          </a>

          <div className="ml-auto flex items-center gap-9">
            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center justify-end gap-6">
              <a href="#system" className="text-sm text-muted-foreground hover:text-foreground transition-colors" style={{ fontFamily: "var(--font-martian-mono), monospace" }}>Our System</a>
              <a href="#clients" className="text-sm text-muted-foreground hover:text-foreground transition-colors" style={{ fontFamily: "var(--font-martian-mono), monospace" }}>Clients</a>
              <a href="#timeline" className="text-sm text-muted-foreground hover:text-foreground transition-colors" style={{ fontFamily: "var(--font-martian-mono), monospace" }}>Your Timeline</a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors" style={{ fontFamily: "var(--font-martian-mono), monospace" }}>Pricing</a>
            </nav>

            {/* Book Call */}
            <a
              href="https://calendly.com/sohaib-polarys/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#0178FA",
                color: "#EDEDED",
                fontFamily: "var(--font-martian-mono), monospace",
                fontWeight: 700,
                fontSize: 12,
                padding: "7px 12px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Book Call
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

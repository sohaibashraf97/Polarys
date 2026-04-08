"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Image
            src="/logo_png.png"
            alt="Polarys"
            width={120}
            height={40}
            className="h-5 w-auto"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#book-call"
            className="bg-accent hover:bg-accent-dark text-white font-semibold text-sm px-5 py-2.5 rounded-none transition-colors"
          >
            Book Call
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-secondary"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-t border-border px-4 pb-4">
          <a
            href="#book-call"
            className="block mt-2 text-center bg-accent text-white font-semibold text-sm px-5 py-2.5 rounded-none"
            onClick={() => setOpen(false)}
          >
            Book Call
          </a>
        </div>
      )}
    </header>
  );
}

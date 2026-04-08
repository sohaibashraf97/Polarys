import Image from "next/image";

const footerLinks = [
  { label: "Home", href: "#" },
  { label: "Agency", href: "#agency" },
  { label: "Coaching", href: "#coaching" },
  { label: "YouTube", href: "#" },
  { label: "Blog", href: "#" },
];

const socialLinks = [
  { label: "YouTube", href: "#", handle: "@mediaengine" },
  { label: "LinkedIn", href: "#", handle: "@amanghathaura" },
  { label: "LinkedIn", href: "#", handle: "@paolorpoli" },
];

export default function Footer() {
  return (
    <footer className="bg-black/40 border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Logo & links */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo_png.png"
                alt="Polarys"
                width={120}
                height={40}
                className="h-5 w-auto"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-2">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                {link.label}:{" "}
                <span className="text-secondary">{link.handle}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted">
            &copy; Polarys 2025
          </p>
        </div>
      </div>
    </footer>
  );
}

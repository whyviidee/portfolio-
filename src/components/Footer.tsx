"use client";

import { Github, Linkedin, Instagram } from "lucide-react";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Github, href: "https://github.com/whyviidee", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/whyviidee", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/deejay.dago", label: "Instagram" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <a href="/" className="text-sm font-semibold tracking-widest uppercase text-amber-400">
              YD
            </a>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Full-stack developer & DJ.
              <br />
              From Mozambique to the world.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-gray-600 uppercase tracking-widest mb-1">Navigate</span>
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-gray-400 hover:text-white transition-colors text-left"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Socials */}
          <div>
            <span className="text-xs text-gray-600 uppercase tracking-widest mb-3 block">Connect</span>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 border border-white/5 rounded-full text-gray-500 hover:text-white hover:border-white/20 transition-all duration-300"
                  aria-label={s.label}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
            <div className="mt-4">
              <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 border border-amber-400/20 text-amber-400 rounded-full">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
                </span>
                Available for hire
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Yuri Dagot
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xs text-gray-600 hover:text-amber-400 transition-colors"
          >
            Back to top &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
}

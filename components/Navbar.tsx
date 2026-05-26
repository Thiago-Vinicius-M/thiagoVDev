"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Hero", href: "#hero" },
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
];

const SECTION_IDS = ["hero", "sobre", "projetos", "contato"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-[rgba(10,10,10,0.88)] border-[var(--border)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6 h-14 flex items-center justify-center">
        <nav aria-label="Navegação principal" className="flex items-center gap-6 md:gap-8">
          {NAV_LINKS.map(({ label, href }) => {
            const sectionId = href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={href}
                href={href}
                className={`text-xs md:text-sm font-medium tracking-wide transition-colors duration-200 ${
                  isActive
                    ? "text-[var(--green)]"
                    : "text-[var(--text-muted)] hover:text-white"
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>
      </div>
    </nav>
  );
}

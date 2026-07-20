import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const TOKENS = {
  paper: "#FAFAF7",
  ink: "#1C2B45",
  blue: "#2F5EA8",
  line: "#DAE0E9",
  muted: "#66728A",
};

function IconMenu({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IconClose({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const NAV_LINKS = [
  { name: "Home", to: "/" },
  { name: "Projects", to: "/projects" },
  { name: "About", to: "/about" },
  { name: "Skills", to: "/skill" },
  { name: "Services", to: "/services" },
  { name: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu on route change so it doesn't stay open
  // after navigating.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <header
        className="fixed left-0 top-0 z-50 w-full transition-all duration-300"
        style={{
          backgroundColor: scrolled ? `${TOKENS.paper}E6` : TOKENS.paper,
          backdropFilter: scrolled ? "blur(8px)" : "none",
          borderBottom: `1px solid ${scrolled ? TOKENS.line : "transparent"}`,
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          {/* Logo mark */}
          <Link to="/" className="group flex select-none items-center gap-2.5">
            <span
              className="flex h-9 w-9 items-center justify-center font-mono text-sm font-bold text-white transition-transform duration-300 group-hover:-rotate-6"
              style={{ backgroundColor: TOKENS.ink }}
            >
              A.
            </span>
            <span className="text-[19px] font-bold tracking-tight" style={{ color: TOKENS.ink }}>
              Anupam
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.name}
                  to={item.to}
                  className="relative px-4 py-2 text-sm font-medium transition-colors"
                  style={{ color: isActive ? TOKENS.ink : TOKENS.muted }}
                >
                  {item.name}
                  {isActive && (
                    <span
                      className="absolute left-4 right-4 -bottom-0.5 h-[2px]"
                      style={{ backgroundColor: TOKENS.blue }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link to='/resume'
              className="px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: TOKENS.ink }}
            >
              Resume
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-11 w-11 items-center justify-center lg:hidden"
            style={{ border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className="fixed left-0 top-[73px] z-40 w-full px-5 lg:hidden transition-all duration-300 ease-out"
        style={{
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0px)" : "translateY(-12px)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <div
          className="relative bg-white p-5"
          style={{ border: `1px solid ${TOKENS.line}` }}
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((item, i) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.name}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3.5 text-base font-medium transition-colors"
                  style={{
                    color: TOKENS.ink,
                    backgroundColor: isActive ? "#F4F6FA" : "transparent",
                  }}
                >
                  <span className="font-mono text-xs font-semibold" style={{ color: TOKENS.blue }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.name}
                </Link>
              );
            })}

            <button
              className="mt-4 py-3.5 font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: TOKENS.ink }}
            >
              Resume
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

const TOKENS = {
  paper: "#FAFAF7",
  ink: "#1C2B45",
  blue: "#2F5EA8",
  amber: "#C9812E",
  green: "#3E8E5B",
  line: "#DAE0E9",
  muted: "#66728A",
};

const FALLBACK_STATS = [
  { value: "20+", label: "Projects" },
  { value: "MERN", label: "Stack" },
  { value: "1+", label: "Year exp" },
];

function CornerMarks() {
  const base = "absolute w-3 h-3 pointer-events-none";
  const stroke = { borderColor: TOKENS.blue };
  return (
    <>
      <span className={`${base} top-0 left-0 border-t-2 border-l-2`} style={stroke} />
      <span className={`${base} top-0 right-0 border-t-2 border-r-2`} style={stroke} />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2`} style={stroke} />
      <span className={`${base} bottom-0 right-0 border-b-2 border-r-2`} style={stroke} />
    </>
  );
}

function Reveal({ children, delay = 0, className = "" }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={`transition-all duration-700 ease-out ${className}`}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0px)" : "translateY(16px)" }}
    >
      {children}
    </div>
  );
}

export default function Hero() {
  // Start with fallback values so the readout is never empty while the
  // request is in flight — swapped for live numbers once they arrive.
  const [stats, setStats] = useState(FALLBACK_STATS);

  useEffect(() => {
    let cancelled = false;

    const fetchExperience = async () => {
      try {
        const res = await API.get("/dashboard");
        const projectCount = res.data?.projectCount;
        const totalExperience = res.data?.totalExperience;

        if (!cancelled) {
          setStats([
            { value: projectCount != null ? `${projectCount}+` : "20+", label: "Projects" },
            { value: "MERN", label: "Stack" },
            { value: totalExperience != null ? `${totalExperience}+` : "1+", label: "Year exp" },
          ]);
        }
      } catch (error) {
        console.log(error);
        // keep FALLBACK_STATS on failure — never leave the readout blank
      }
    };

    fetchExperience();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden px-6 py-28"
      style={{
        backgroundColor: TOKENS.paper,
        backgroundImage: `linear-gradient(${TOKENS.line} 1px, transparent 1px), linear-gradient(90deg, ${TOKENS.line} 1px, transparent 1px)`,
        backgroundSize: "44px 44px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <div>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2" style={{ backgroundColor: TOKENS.blue }} />
              <p className="font-mono text-xs tracking-[0.3em]" style={{ color: TOKENS.blue }}>
                PROFILE — SYS.00 / HERO
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1
              className="mt-6 text-[42px] sm:text-5xl font-bold leading-[1.12]"
              style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
            >
              I engineer scalable{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10">full-stack systems</span>
                <svg
                  viewBox="0 0 300 16"
                  preserveAspectRatio="none"
                  className="absolute inset-x-0 -bottom-2 z-0 h-[10px] w-full"
                >
                  <line x1="4" y1="4" x2="296" y2="4" stroke={TOKENS.blue} strokeWidth="2" />
                  <line x1="4" y1="0" x2="4" y2="8" stroke={TOKENS.blue} strokeWidth="2" />
                  <line x1="296" y1="0" x2="296" y2="8" stroke={TOKENS.blue} strokeWidth="2" />
                </svg>
              </span>{" "}
              that ship, and keep shipping.
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 max-w-md text-lg leading-7" style={{ color: TOKENS.muted }}>
              MERN stack developer focused on building modern SaaS products,
              APIs, dashboards and real-world scalable applications.
            </p>
          </Reveal>

          {/* CTA BUTTONS */}
          <Reveal delay={260} className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="cursor-pointer px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: TOKENS.ink }}
            >
              View projects
            </Link>

            <Link
              to="/contact"
              className="cursor-pointer px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-slate-50"
              style={{ color: TOKENS.ink, border: `1px solid ${TOKENS.line}` }}
            >
              Contact me
            </Link>
          </Reveal>

          {/* small readout */}
          <Reveal delay={340} className="mt-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: TOKENS.muted }}>
                LIVE READOUT
              </span>
              <span className="h-px w-16" style={{ backgroundColor: TOKENS.line }} />
            </div>
            <div className="flex gap-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1 font-mono text-[10px] tracking-widest" style={{ color: TOKENS.muted }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* RIGHT VISUAL CARD */}
        <Reveal delay={200} className="relative justify-self-center">
          <div
            className="relative w-full max-w-sm bg-white p-8 transition-transform duration-300 hover:-translate-y-1"
            style={{ border: `1px solid ${TOKENS.line}` }}
          >
            <CornerMarks />

            {/* header badge */}
            <div
              className="flex items-center justify-between pb-4"
              style={{ borderBottom: `1px dashed ${TOKENS.line}` }}
            >
              <p className="font-mono text-[11px]" style={{ color: TOKENS.muted }}>
                dev.profile.json
              </p>
              <span
                className="font-mono text-[10px] tracking-widest px-2.5 py-1"
                style={{ color: TOKENS.blue, border: `1px solid ${TOKENS.blue}` }}
              >
                LIVE
              </span>
            </div>

            {/* code block */}
            <pre
              className="mt-5 whitespace-pre-wrap font-mono text-[13px] leading-6"
              style={{ color: TOKENS.ink }}
            >
              {`{
  "name": "Anupam",
  "role": "MERN Stack Developer",
  "stack": [
    "MongoDB",
    "Express",
    "React",
    "Node"
  ],
  "focus": "SaaS & web apps",
  "goal": "Build scalable products"
}`}
            </pre>

            {/* footer index */}
            <div
              className="mt-7 pt-4 flex items-center justify-between"
              style={{ borderTop: `1px dashed ${TOKENS.line}` }}
            >
              <span className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.blue }}>
                SYS.00
              </span>
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5" style={{ backgroundColor: TOKENS.line }} />
                <span className="h-2.5 w-2.5" style={{ backgroundColor: TOKENS.line }} />
                <span className="h-2.5 w-2.5" style={{ backgroundColor: TOKENS.blue }} />
              </div>
            </div>
          </div>

          {/* floating stamp */}
          <div
            className="absolute -top-4 -right-3 select-none"
            style={{ transform: "rotate(-5deg)" }}
          >
            <span
              className="flex items-center gap-2 font-mono text-[10px] tracking-widest px-3 py-1.5 bg-white"
              style={{ color: TOKENS.blue, border: `1.5px dashed ${TOKENS.blue}` }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ backgroundColor: TOKENS.green }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: TOKENS.green }} />
              </span>
              AVAILABLE FOR FREELANCE
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
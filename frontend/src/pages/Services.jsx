import { useEffect, useRef, useState } from "react";

const TOKENS = {
  paper: "#FAFAF7",
  ink: "#1C2B45",
  blue: "#2F5EA8",
  amber: "#C9812E",
  green: "#3E8E5B",
  line: "#DAE0E9",
  muted: "#66728A",
};

function IconArrow({ size = 15, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconCheck({ size = 13, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconDash({ size = 13, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

const SERVICES = [
  {
    id: "SVC.01",
    title: "Full Stack Development",
    desc: "Complete MERN applications with a scalable backend and a modern, production-ready frontend.",
    features: ["React / Next UI", "Node + Express APIs", "MongoDB / SQL design"],
    scope: "3–8 weeks",
    highlight: true,
  },
  {
    id: "SVC.02",
    title: "Frontend Engineering",
    desc: "Performance-tuned UI systems that are responsive, accessible, and built to be extended.",
    features: ["React UI development", "Tailwind & animation", "Reusable component systems"],
    scope: "1–4 weeks",
  },
  {
    id: "SVC.03",
    title: "Backend Development",
    desc: "Secure, RESTful APIs with proper authentication and a data model that won't fall over.",
    features: ["JWT auth systems", "REST API design", "Database architecture"],
    scope: "2–5 weeks",
  },
];

const MODELS = [
  {
    name: "Fixed Scope",
    desc: "Defined deliverables, defined price.",
    rows: [true, true, false, false],
  },
  {
    name: "Retainer",
    desc: "Ongoing monthly capacity.",
    rows: [true, true, true, true],
  },
  {
    name: "Hourly",
    desc: "Pay only for time spent.",
    rows: [false, true, true, false],
  },
];
const MODEL_ROWS = ["Fixed price", "Weekly updates", "Priority response", "Long-term support"];

const PIPELINE = [
  { step: "01", title: "Discover", desc: "Scope the problem, the users, and what \"done\" actually looks like." },
  { step: "02", title: "Design", desc: "Data models and interfaces sketched before a line of code is final." },
  { step: "03", title: "Build", desc: "Ship in reviewable increments — never one giant black-box drop." },
  { step: "04", title: "Ship & support", desc: "Deploy, monitor, and stay on hand for the first real-world bugs." },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

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

function ServiceCard({ s, index }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className="relative bg-white p-7 sm:p-8 flex flex-col transition-all duration-700 ease-out"
      style={{
        border: `1px solid ${s.highlight ? TOKENS.blue : TOKENS.line}`,
        borderWidth: s.highlight ? "1.5px" : "1px",
        transitionDelay: `${index * 90}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(24px)",
      }}
    >
      <CornerMarks />

      {s.highlight && (
        <div className="absolute -top-3 left-7 select-none" style={{ transform: "rotate(-3deg)" }}>
          <span
            className="font-mono text-[10px] tracking-[0.2em] px-3 py-1 bg-white"
            style={{ color: TOKENS.blue, border: `1.5px dashed ${TOKENS.blue}` }}
          >
            MOST REQUESTED
          </span>
        </div>
      )}

      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.blue }}>
          {s.id}
        </span>
        <span className="h-px flex-1" style={{ backgroundColor: TOKENS.line }} />
      </div>

      <h3
        className="mt-4 text-xl sm:text-2xl font-bold leading-snug"
        style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {s.title}
      </h3>

      <p className="mt-3 leading-7 flex-1" style={{ color: TOKENS.muted }}>
        {s.desc}
      </p>

      <div className="mt-6 flex flex-col gap-2.5">
        {s.features.map((f) => (
          <div key={f} className="flex items-center gap-2.5 text-sm" style={{ color: TOKENS.ink }}>
            <IconCheck style={{ color: TOKENS.blue }} />
            {f}
          </div>
        ))}
      </div>

      <div
        className="mt-6 pt-5 flex items-center justify-between"
        style={{ borderTop: `1px dashed ${TOKENS.line}` }}
      >
        <div>
          <p className="font-mono text-[9px] tracking-widest" style={{ color: TOKENS.muted }}>
            TYPICAL SCOPE
          </p>
          <p className="mt-1 font-mono text-xs font-semibold" style={{ color: TOKENS.ink }}>
            {s.scope}
          </p>
        </div>
        <button
          className="group flex items-center gap-1.5 text-sm font-semibold"
          style={{ color: TOKENS.blue }}
        >
          Get started
          <IconArrow className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section
      className="relative py-24 sm:py-32 px-6"
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

      <div className="relative max-w-5xl mx-auto">

        {/* header */}
        <div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2" style={{ backgroundColor: TOKENS.blue }} />
            <p className="font-mono text-xs tracking-[0.3em]" style={{ color: TOKENS.blue }}>
              SERVICE CATALOG — SYS.02
            </p>
          </div>

          <h2
            className="mt-5 text-4xl sm:text-5xl font-bold leading-[1.05]"
            style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            What I can build
            <br />
            for you.
          </h2>

          <p className="mt-5 max-w-lg leading-7" style={{ color: TOKENS.muted }}>
            End-to-end development, scoped clearly and shipped in the open —
            focused on performance, scalability, and clean systems.
          </p>
        </div>

        {/* services grid */}
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} s={s} index={i} />
          ))}
        </div>

        {/* capacity gauge */}
        <div className="relative mt-10 bg-white p-8 sm:p-10" style={{ border: `1px solid ${TOKENS.line}` }}>
          <CornerMarks />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: TOKENS.muted }}>
                CURRENT CAPACITY
              </span>
              <span className="h-px w-16" style={{ backgroundColor: TOKENS.line }} />
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ backgroundColor: TOKENS.green }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: TOKENS.green }} />
              </span>
              <span className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.green }}>
                1 SLOT OPEN THIS MONTH
              </span>
            </div>
          </div>

          <div className="mt-6 h-3 flex gap-[3px]">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex-1 relative" style={{ backgroundColor: TOKENS.line }}>
                {i < 2 && <div className="absolute inset-0" style={{ backgroundColor: TOKENS.blue }} />}
              </div>
            ))}
          </div>
          <p className="mt-3 font-mono text-[11px]" style={{ color: TOKENS.muted }}>
            2 of 3 engagement slots booked — new projects start next cycle.
          </p>
        </div>

        {/* engagement models */}
        <div className="relative mt-10 bg-white p-8 sm:p-10 overflow-x-auto" style={{ border: `1px solid ${TOKENS.line}` }}>
          <CornerMarks />
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: TOKENS.muted }}>
              ENGAGEMENT MODELS
            </span>
            <span className="h-px flex-1" style={{ backgroundColor: TOKENS.line }} />
          </div>

          <div className="mt-7 min-w-[520px]">
            <div className="grid grid-cols-4 gap-4 pb-4" style={{ borderBottom: `1px solid ${TOKENS.line}` }}>
              <span />
              {MODELS.map((m) => (
                <div key={m.name}>
                  <p className="font-bold" style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
                    {m.name}
                  </p>
                  <p className="mt-1 text-xs" style={{ color: TOKENS.muted }}>
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>

            {MODEL_ROWS.map((row, ri) => (
              <div
                key={row}
                className="grid grid-cols-4 gap-4 py-4 items-center"
                style={{ borderBottom: `1px dashed ${TOKENS.line}` }}
              >
                <span className="font-mono text-xs" style={{ color: TOKENS.muted }}>
                  {row}
                </span>
                {MODELS.map((m) => (
                  <span key={m.name}>
                    {m.rows[ri] ? (
                      <IconCheck size={15} style={{ color: TOKENS.blue }} />
                    ) : (
                      <IconDash size={15} style={{ color: TOKENS.line }} />
                    )}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* build pipeline */}
        <div className="relative mt-10 bg-white p-8 sm:p-10" style={{ border: `1px solid ${TOKENS.line}` }}>
          <CornerMarks />
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: TOKENS.muted }}>
              BUILD PIPELINE
            </span>
            <span className="h-px flex-1" style={{ backgroundColor: TOKENS.line }} />
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PIPELINE.map((p) => (
              <div key={p.step} className="relative">
                <span className="font-mono text-xs font-semibold" style={{ color: TOKENS.blue }}>
                  {p.step}
                </span>
                <h4
                  className="mt-2 text-base font-bold"
                  style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {p.title}
                </h4>
                <p className="mt-1.5 text-sm leading-6" style={{ color: TOKENS.muted }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* final CTA */}
        <div className="relative mt-10 p-10 sm:p-14 overflow-hidden" style={{ backgroundColor: TOKENS.ink }}>
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em]" style={{ color: TOKENS.amber }}>
                CUSTOM SCOPE
              </p>
              <h3
                className="mt-4 text-2xl sm:text-3xl font-bold text-white max-w-md leading-snug"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Need something that doesn&apos;t fit the catalog?
              </h3>
            </div>
            <a
              href="#contact"
              className="shrink-0 flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: "white", color: TOKENS.ink }}
            >
              Contact me
              <IconArrow size={15} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
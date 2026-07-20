import { useEffect, useRef, useState } from "react";

const TOKENS = {
  paper: "#FAFAF7",
  ink: "#1C2B45",
  blue: "#2F5EA8",
  amber: "#C9812E",
  line: "#DAE0E9",
  muted: "#66728A",
};

const STOPS = [
  {
    role: "MERN Stack Developer",
    company: "Freelance / personal projects",
    duration: "2024 — Present",
    desc: "Built multiple full-stack applications including ecommerce, hospital management, and dashboards using the MERN stack.",
    current: true,
  },
  {
    role: "Frontend Developer",
    company: "Self learning & practice",
    duration: "2023 — 2024",
    desc: "Focused on React, Tailwind CSS and UI development by building responsive and modern web interfaces.",
    current: false,
  },
  {
    role: "Web Development Journey",
    company: "Learning phase",
    duration: "2022 — 2023",
    desc: "Started learning HTML, CSS, JavaScript and core programming fundamentals.",
    current: false,
  },
];

/* Responsive geometry — smaller stops/gaps/road-height on narrow
   screens so the route still reads clearly instead of just shrinking. */
function useRouteGeometry() {
  const [dims, setDims] = useState({ stopWidth: 300, gap: 56, roadHeight: 176, wave: [58, 118, 58] });

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setDims({ stopWidth: 240, gap: 32, roadHeight: 140, wave: [44, 96, 44] });
      } else if (w < 768) {
        setDims({ stopWidth: 260, gap: 40, roadHeight: 156, wave: [50, 106, 50] });
      } else {
        setDims({ stopWidth: 300, gap: 56, roadHeight: 176, wave: [58, 118, 58] });
      }
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return dims;
}

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
      { threshold: 0.1 }
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

function StopCard({ stop, index, width }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        width,
        border: `1px solid ${stop.current ? TOKENS.blue : TOKENS.line}`,
        borderWidth: stop.current ? "1.5px" : "1px",
        transitionDelay: `${index * 100}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(20px)",
      }}
      className="relative shrink-0 bg-white p-6 transition-all duration-700 ease-out hover:-translate-y-1"
    >
      <CornerMarks />

      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.blue }}>
          STOP {String(index + 1).padStart(2, "0")}
        </span>
        {stop.current && (
          <span
            className="font-mono text-[9px] tracking-widest px-2 py-1"
            style={{ color: TOKENS.blue, border: `1.5px dashed ${TOKENS.blue}` }}
          >
            YOU ARE HERE
          </span>
        )}
      </div>

      <h3
        className="mt-3 text-lg font-bold leading-snug"
        style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {stop.role}
      </h3>

      <p className="mt-1 text-sm font-medium" style={{ color: TOKENS.blue }}>
        {stop.company}
      </p>

      <p className="mt-1 font-mono text-[11px]" style={{ color: TOKENS.muted }}>
        {stop.duration}
      </p>

      <p className="mt-3 text-sm leading-relaxed" style={{ color: TOKENS.muted }}>
        {stop.desc}
      </p>
    </div>
  );
}

export default function Experience() {
  const { stopWidth, gap, roadHeight, wave } = useRouteGeometry();
  const span = stopWidth + gap;

  const points = STOPS.map((_, i) => ({
    x: i * span + stopWidth / 2,
    y: wave[i % wave.length],
  }));

  const roadPath = points.reduce((d, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const c1x = prev.x + (p.x - prev.x) / 2;
    const c2x = p.x - (p.x - prev.x) / 2;
    return `${d} C ${c1x} ${prev.y}, ${c2x} ${p.y}, ${p.x} ${p.y}`;
  }, "");

  const totalWidth = STOPS.length * span - gap;

  useEffect(()=>{
    
  })

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
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-2 w-2" style={{ backgroundColor: TOKENS.blue }} />
            <p className="font-mono text-xs tracking-[0.3em]" style={{ color: TOKENS.blue }}>
              SURVEY ROUTE — SYS.04
            </p>
          </div>

          <h2
            className="mt-5 text-4xl sm:text-5xl font-bold leading-[1.1]"
            style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            My professional
            <br />
            journey.
          </h2>

          <p className="mt-5 max-w-lg mx-auto leading-7" style={{ color: TOKENS.muted }}>
            Trace the route below — drag or scroll sideways to follow it.
          </p>
        </div>

        {/* route map */}
        <div className="relative mt-16">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-14"
            style={{ background: `linear-gradient(to right, ${TOKENS.paper}, transparent)` }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-14"
            style={{ background: `linear-gradient(to left, ${TOKENS.paper}, transparent)` }}
          />

          <div className="overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="relative mx-auto" style={{ width: totalWidth, minWidth: totalWidth }}>

              {/* the route */}
              <svg
                viewBox={`0 0 ${totalWidth} ${roadHeight}`}
                width={totalWidth}
                height={roadHeight}
                className="block"
              >
                <path
                  d={roadPath}
                  fill="none"
                  stroke={TOKENS.ink}
                  strokeOpacity="0.2"
                  strokeWidth="2"
                  strokeDasharray="2 12"
                  strokeLinecap="round"
                />
                {points.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={STOPS[i].current ? 9 : 7}
                    fill={STOPS[i].current ? TOKENS.blue : "#fff"}
                    stroke={TOKENS.ink}
                    strokeWidth="2"
                  />
                ))}
              </svg>

              {/* pulse over the current stop */}
              <span
                className="absolute flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{ left: points[0].x, top: points[0].y }}
              >
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-40"
                  style={{ backgroundColor: TOKENS.blue }}
                />
              </span>

              {/* stop cards, positioned under each route point */}
              <div className="flex items-start" style={{ gap }}>
                {STOPS.map((stop, i) => (
                  <StopCard key={stop.role} stop={stop} index={i} width={stopWidth} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
import { useEffect, useRef, useState } from "react";
import { useCountUp } from "react-countup";
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

/* Uses the hook form instead of <CountUp /> — avoids the "Element type
   is invalid" crash some bundlers hit with react-countup's default
   export. The hook just writes into a ref, no component resolution. */
function AnimatedNumber({ end, suffix, start: shouldStart }) {
  const ref = useRef(null);
  const { start } = useCountUp({ ref, end, duration: 2, suffix, startOnMount: false });
  useEffect(() => {
    if (shouldStart) start();
  }, [shouldStart, start]);
  return <span ref={ref} />;
}

function IconFolder({ size = 20, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d="M3 6.5a1.5 1.5 0 011.5-1.5h4.4a1.5 1.5 0 011.2.6l1.2 1.6a1.5 1.5 0 001.2.6h6a1.5 1.5 0 011.5 1.5v9a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 18.2V6.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function IconCode({ size = 20, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d="M9 6L3 12l6 6M15 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconAward({ size = 20, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <circle cx="12" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 13.2L7 21l5-2.5L17 21l-1.5-7.8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function IconZap({ size = 20, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
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
      { threshold: 0.3 }
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

function StatCard({ item, index }) {
  const [ref, visible] = useReveal();
  const Icon = item.icon;
  const isStatus = item.value === null;

  return (
    <div
      ref={ref}
      className="group relative bg-white p-7 transition-all duration-700 ease-out hover:-translate-y-1"
      style={{
        border: `1px solid ${TOKENS.line}`,
        transitionDelay: `${index * 90}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(24px)",
      }}
    >
      <CornerMarks />

      <div className="flex items-center justify-between">
        <span
          className="flex items-center justify-center w-11 h-11"
          style={{ border: `1px solid ${TOKENS.line}`, color: TOKENS.blue }}
        >
          <Icon size={18} />
        </span>
        <span className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.muted }}>
          {item.id}
        </span>
      </div>

      <h3
        className="mt-7 text-4xl sm:text-5xl font-bold"
        style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {isStatus ? (
          <span className="inline-flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ backgroundColor: TOKENS.green }}
              />
              <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: TOKENS.green }} />
            </span>
            {item.display}
          </span>
        ) : (
          <AnimatedNumber end={item.value} suffix={item.suffix} start={visible} />
        )}
      </h3>

      <p className="mt-3 text-lg font-semibold" style={{ color: TOKENS.ink }}>
        {item.title}
      </p>
      <p className="mt-2 text-sm leading-6" style={{ color: TOKENS.muted }}>
        {item.subtitle}
      </p>

      <div
        className="mt-6 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
        style={{ backgroundColor: TOKENS.blue }}
      />
    </div>
  );
}

export default function stats() {
  const [stats, setstats] = useState([]);

  useEffect(() => {
    const fetchstats = async () => {
      try {
        const res = await API.get("/dashboard");
        console.log(res.data);

        setstats([
          {
            id: "STAT.01",
            title: "Projects built",
            value: res.data.projectCount,
            suffix: "+",
            icon: IconFolder,
            subtitle: "Real-world, full-stack applications.",
          },
          {
            id: "STAT.02",
            title: "Technologies",
            value: res.data.skillCount,
            suffix: "+",
            icon: IconCode,
            subtitle: "MERN plus the modern tooling around it.",
          },
          {
            id: "STAT.03",
            title: "Experience",
            value: res.data.
              totalExperience,
            suffix: "+",
            icon: IconAward,
            subtitle: "Years of continuous, hands-on learning.",
          },
          {
            id: "STAT.04",
            title: "Status",
            value: null,
            display: "Available",
            icon: IconZap,
            subtitle: "Open for internships and full-time roles.",
          },
        ]);


      } catch (error) {
        console.log(error);
      }
    };

    fetchstats();
  }, []);

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

      <div className="relative max-w-6xl mx-auto">

        {/* header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-2 w-2" style={{ backgroundColor: TOKENS.blue }} />
            <p className="font-mono text-xs tracking-[0.3em]" style={{ color: TOKENS.blue }}>
              SNAPSHOT — SYS.01
            </p>
          </div>

          <h2
            className="mt-5 text-4xl sm:text-5xl font-bold leading-[1.1]"
            style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            My work,
            <br />
            in numbers.
          </h2>

          <p className="mt-5 max-w-xl mx-auto leading-7" style={{ color: TOKENS.muted }}>
            A quick readout of the development journey so far — no
            padded metrics, just what&apos;s actually been shipped.
          </p>
        </div>

        {/* grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, i) => (
            <StatCard key={item._id} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
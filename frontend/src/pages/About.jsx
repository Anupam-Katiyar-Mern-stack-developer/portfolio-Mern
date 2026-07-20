import { useEffect, useRef, useState } from "react";
import API from "../api/axios";

const TOKENS = {
  paper: "#FAFAF7",
  ink: "#1C2B45",
  blue: "#2F5EA8",
  amber: "#C9812E",
  line: "#DAE0E9",
  muted: "#66728A",
};

function IconCode({ size = 20, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d="M9 6L3 12l6 6M15 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCpu({ size = 20, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <rect x="6" y="6" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconLayers({ size = 20, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M3 13l9 5 9-5M3 8l0 5M21 8l0 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTrend({ size = 20, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d="M3 17l6-6 4 4 8-8M21 7v5M21 7h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CAPABILITIES = [
  {
    id: "CAP.01",
    icon: IconCode,
    title: "Clean Architecture",
    desc: "I structure code in scalable modules, not random components thrown together.",
  },
  {
    id: "CAP.02",
    icon: IconCpu,
    title: "Problem-Solving Mindset",
    desc: "I break complex systems into simple, logical flows before writing a line of code.",
  },
  {
    id: "CAP.03",
    icon: IconLayers,
    title: "Full-Stack Thinking",
    desc: "I don't think frontend and backend separately — I think in terms of the whole product.",
  },
  {
    id: "CAP.04",
    icon: IconTrend,
    title: "Growth Focused",
    desc: "Every project ships with an eye on performance, UX, and long-term scalability.",
  },
];




const REVISIONS = [
  {
    tag: "REV.01",
    year: "Year 1",
    title: "Started the MERN stack",
    desc: "Learned React, Node and Mongo from the ground up — broke a lot of things on purpose.",
  },
  {
    tag: "REV.02",
    year: "Year 1",
    title: "Shipped first full-stack app",
    desc: "Auth, database, deployment — the whole loop, end to end, for the first time.",
  },
  {
    tag: "REV.03",
    year: "Year 2",
    title: "Hospital Management System",
    desc: "First production-grade system: admin roles, booking flow, real data modelling.",
  },
  {
    tag: "REV.04",
    year: "Now",
    title: "Refining system design",
    desc: "Focused on architecture, performance and writing code that scales past the demo.",
  },
];

const getSkillPercentage = (level) => {
  switch (level) {
    case "Beginner":
      return 25;

    case "Intermediate":
      return 60;

    case "Advanced":
      return 85;

    case "Professional":
      return 100;

    default:
      return 0;
  }
};

function Gauge({ name, level }) {
  const ticks = Array.from({ length: 20 });
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium" style={{ color: TOKENS.ink }}>
          {name}
        </span>
        <span className="font-mono text-[11px]" style={{ color: TOKENS.blue }}>
          {level}
        </span>
      </div>
      <div className="relative mt-2 h-2.5 flex items-center gap-[2px]">
        {ticks.map((_, i) => {
          const filled =
            i < Math.round((getSkillPercentage(level) / 100) * ticks.length);
          return (
            <span
              key={i}
              className="flex-1 h-full"
              style={{
                backgroundColor: filled ? TOKENS.blue : TOKENS.line,
                opacity: filled ? 1 : 0.7,
              }}
            />
          );
        })}
      </div>
    </div>
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

function CapabilityCard({ item, index }) {
  const [ref, visible] = useReveal();
  const Icon = item.icon;
  return (
    <div
      ref={ref}
      className="relative bg-white p-7 sm:p-8 transition-all duration-700 ease-out"
      style={{
        border: `1px solid ${TOKENS.line}`,
        transitionDelay: `${index * 90}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(24px)",
      }}
    >
      <CornerMarks />

      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.blue }}>
          {item.id}
        </span>
        <span className="h-px flex-1" style={{ backgroundColor: TOKENS.line }} />
      </div>

      <div className="mt-5 flex items-center gap-3.5">
        <span
          className="flex items-center justify-center w-10 h-10 shrink-0"
          style={{ border: `1px solid ${TOKENS.line}`, color: TOKENS.blue }}
        >
          <Icon size={18} />
        </span>
        <h3
          className="text-lg sm:text-xl font-bold leading-snug"
          style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {item.title}
        </h3>
      </div>

      <p className="mt-4 leading-7" style={{ color: TOKENS.muted }}>
        {item.desc}
      </p>
    </div>
  );
}

export default function About() {

  const [skills, setSkills] = useState([]);
  const [readout, setReadout] = useState([]);


  const fetchDashboard = async () => {
  try {
    const { data } = await API.get("/dashboard");

    setReadout([
      {
        value: `${data.projectCount}+`,
        label: "Projects shipped",
      },
      {
        value: `${data.skillCount}+`,
        label: "Tools in the stack",
      },
      {
        value: `${data.totalExperience}+`,
        label: "Years building",
      },
      {
        value: "MERN",
        label: "Core speciality",
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

  const fetchSkills = async () => {
    try {

      const { data } = await API.get("/skills/");

      setSkills(data.skills);

      console.log(data.skills);

    } catch (error) {
      console.log(error);
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }

    acc[skill.category].push(skill);

    return acc;
  }, {});

  useEffect(() => {
    fetchSkills();
    fetchDashboard();
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

      <div className="relative max-w-4xl mx-auto">

        {/* header */}
        <div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2" style={{ backgroundColor: TOKENS.blue }} />
            <p className="font-mono text-xs tracking-[0.3em]" style={{ color: TOKENS.blue }}>
              OPERATOR PROFILE — SYS.00
            </p>
          </div>

          <h2
            className="mt-5 text-4xl sm:text-5xl font-bold leading-[1.05]"
            style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            I build systems,
            <br />
            not just websites.
          </h2>

          <p className="mt-5 max-w-lg leading-7" style={{ color: TOKENS.muted }}>
            MERN stack developer focused on scalable architecture, clean UI
            systems, and real-world product thinking.
          </p>
        </div>

        {/* profile dossier */}
        <div
          className="relative mt-16 grid md:grid-cols-[220px_1fr] gap-0 bg-white"
          style={{ border: `1px solid ${TOKENS.line}` }}
        >
          <CornerMarks />

          {/* ID panel */}
          <div
            className="flex flex-col items-center justify-center gap-4 p-8"
            style={{ borderBottom: `1px dashed ${TOKENS.line}` }}
          >
            <div
              className="w-24 h-24 flex items-center justify-center relative"
              style={{
                border: `1px solid ${TOKENS.line}`,
                backgroundImage: `repeating-linear-gradient(45deg, ${TOKENS.line} 0, ${TOKENS.line} 1px, transparent 1px, transparent 8px)`,
              }}
            >
              <span
                className="text-xl font-bold bg-white px-2"
                style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {"</>"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ backgroundColor: TOKENS.blue }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: TOKENS.blue }}
                />
              </span>
              <span className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.blue }}>
                AVAILABLE FOR WORK
              </span>
            </div>
          </div>

          {/* spec list + bio */}
          <div className="p-8 sm:p-10">
            <div className="grid sm:grid-cols-3 gap-4 pb-6" style={{ borderBottom: `1px dashed ${TOKENS.line}` }}>
              <div>
                <p className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.muted }}>ROLE</p>
                <p className="mt-1 text-sm font-semibold" style={{ color: TOKENS.ink }}>MERN Stack Developer</p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.muted }}>BASED IN</p>
                <p className="mt-1 text-sm font-semibold" style={{ color: TOKENS.ink }}>India</p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.muted }}>FOCUS</p>
                <p className="mt-1 text-sm font-semibold" style={{ color: TOKENS.ink }}>Scalable web systems</p>
              </div>
            </div>

            <p className="mt-6 leading-7" style={{ color: TOKENS.muted }}>
              I started out just wanting to make things that work on the web —
              somewhere along the way that turned into caring a lot about how
              things are built, not just that they run. Now most of what I do
              is design and ship full-stack systems: real data models, real
              auth, real edge cases, not just polished demos.
            </p>
          </div>
        </div>

        {/* capability grid */}
        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          {CAPABILITIES.map((item, i) => (
            <CapabilityCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* stack gauges */}
        <div
          className="relative mt-10 bg-white p-8 sm:p-10"
          style={{ border: `1px solid ${TOKENS.line}` }}
        >
          <CornerMarks />
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: TOKENS.muted }}>
              STACK CALIBRATION
            </span>
            <span className="h-px flex-1" style={{ backgroundColor: TOKENS.line }} />
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-x-10 gap-y-10">
            {Object.entries(groupedSkills).map(([group, items]) => (
              <div key={group}>
                <p
                  className="font-mono text-[10px] tracking-widest mb-5"
                  style={{ color: TOKENS.blue }}
                >
                  {group.toUpperCase()}
                </p>

                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <Gauge
                      key={item._id}
                      name={item.name}
                      level={item.level}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* journey / revision log */}
        <div
          className="relative mt-10 bg-white p-8 sm:p-10"
          style={{ border: `1px solid ${TOKENS.line}` }}
        >
          <CornerMarks />
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: TOKENS.muted }}>
              REVISION LOG
            </span>
            <span className="h-px flex-1" style={{ backgroundColor: TOKENS.line }} />
          </div>

          <div className="mt-8 relative pl-6">
            <span
              className="absolute left-[5px] top-2 bottom-2 w-px"
              style={{ backgroundColor: TOKENS.line }}
            />
            <div className="flex flex-col gap-9">
              {REVISIONS.map((rev) => (
                <div key={rev.tag} className="relative">
                  <span
                    className="absolute -left-6 top-1.5 w-[10px] h-[10px] rounded-full"
                    style={{ backgroundColor: TOKENS.paper, border: `2px solid ${TOKENS.blue}` }}
                  />
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-[11px] tracking-widest" style={{ color: TOKENS.blue }}>
                      {rev.tag}
                    </span>
                    <span className="font-mono text-[10px]" style={{ color: TOKENS.muted }}>
                      {rev.year}
                    </span>
                  </div>
                  <h4
                    className="mt-1.5 text-lg font-bold"
                    style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {rev.title}
                  </h4>
                  <p className="mt-1 max-w-lg leading-6" style={{ color: TOKENS.muted }}>
                    {rev.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* readout bar */}
        <div
          className="relative mt-10 bg-white"
          style={{ border: `1px solid ${TOKENS.line}` }}
        >
          <CornerMarks />
          <div className="flex items-center gap-3 px-7 sm:px-9 pt-6">
            <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: TOKENS.muted }}>
              LIVE READOUT
            </span>
            <span className="h-px flex-1" style={{ backgroundColor: TOKENS.line }} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4">
            {readout.map((stat, i) => (
              <div
                key={stat.label}
                className="px-7 sm:px-9 py-8"
                style={{
                  borderTop: `1px dashed ${TOKENS.line}`,
                  borderLeft: i !== 0 ? `1px dashed ${TOKENS.line}` : "none",
                  marginTop: "1.25rem",
                }}
              >
                <h4
                  className="text-3xl font-bold"
                  style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {stat.value}
                </h4>
                <p className="mt-1.5 font-mono text-[11px] tracking-wide" style={{ color: TOKENS.muted }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
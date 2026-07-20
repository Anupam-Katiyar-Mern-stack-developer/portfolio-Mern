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



const CATEGORIES = [
  {
    group: "FRONTEND",
    items: [
      { name: "React", level: 92 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Redux", level: 80 },
      { name: "Next.js", level: 76 },
    ],
  },
  {
    group: "BACKEND",
    items: [
      { name: "Node.js", level: 88 },
      { name: "Express", level: 86 },
      { name: "REST APIs", level: 85 },
      { name: "JWT / Auth", level: 82 },
    ],
  },
  {
    group: "DATABASE",
    items: [
      { name: "MongoDB", level: 84 },
      { name: "Mongoose", level: 82 },
      { name: "MySQL", level: 62 },
    ],
  },
  {
    group: "TOOLS & DEVOPS",
    items: [
      { name: "Git & GitHub", level: 90 },
      { name: "Postman", level: 85 },
      { name: "Vercel / Render", level: 80 },
      { name: "Docker", level: 55 },
    ],
  },
];

const LEARNING = ["TypeScript", "System Design", "Next.js App Router", "Docker in production"];

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

const getSkillPercentage = (level) => {
  switch (level) {
    case "Beginner":
      return 30;

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

function CategoryPanel({ cat, index }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className="relative bg-white p-7 sm:p-8 transition-all duration-700 ease-out"
      style={{
        border: `1px solid ${TOKENS.line}`,
        transitionDelay: `${index * 80}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(24px)",
      }}
    >
      <CornerMarks />
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.blue }}>
          {cat.group}
        </span>
        <span className="h-px flex-1" style={{ backgroundColor: TOKENS.line }} />
        <span className="font-mono text-[10px]" style={{ color: TOKENS.muted }}>
          {String(cat.items.length).padStart(2, "0")} ITEMS
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {cat.items.map((item) => (
          <Gauge key={item.name} name={item.name} level={item.level} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [coreSkills, setCoreSkills] = useState([]);

  const fetchSkills = async () => {
    try {

      const { data } = await API.get("/skills");

      setSkills(data.skills);

      // sirf names ke liye
      setCoreSkills(data.skills.map((item) => item.name));

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const groupedSkills = skills.reduce((acc, skill) => {

    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }

    acc[skill.category].push(skill);

    return acc;

  }, {});

 
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
              SKILL SPECIFICATION — SYS.03
            </p>
          </div>

          <h2
            className="mt-5 text-4xl sm:text-5xl font-bold leading-[1.05]"
            style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            The stack,
            <br />
            catalogued.
          </h2>

          <p className="mt-5 max-w-lg leading-7" style={{ color: TOKENS.muted }}>
            Every tool below has shipped in a real project — no filler
            badges, just what I actually reach for.
          </p>
        </div>

        {/* core stack strip */}
        <div className="relative mt-14 bg-white p-7 sm:p-8" style={{ border: `1px solid ${TOKENS.line}` }}>
          <CornerMarks />
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: TOKENS.muted }}>
              PRIMARY COMPONENTS
            </span>
            <span className="h-px flex-1" style={{ backgroundColor: TOKENS.line }} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {coreSkills.map((c, i) => (
              <span
                key={c}
                className="font-mono text-xs px-4 py-2.5"
                style={{
                  color: TOKENS.ink,
                  border: `1px solid ${TOKENS.line}`,
                  backgroundColor: TOKENS.paper,
                }}
              >
                <span style={{ color: TOKENS.blue }}>{String(i + 1).padStart(2, "0")}</span> {c}
              </span>
            ))}
          </div>
        </div>

        {/* category gauges */}
        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          {Object.entries(groupedSkills).map(([group, items], i) => (

            <CategoryPanel
              key={group}
              cat={{
                group,
                items
              }}
              index={i}
            />

          ))}
        </div>

        {/* currently learning */}
        <div className="relative mt-10 bg-white p-8 sm:p-10" style={{ border: `1px solid ${TOKENS.line}` }}>
          <CornerMarks />
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: TOKENS.amber }}>
              IN TESTING — CURRENTLY LEARNING
            </span>
            <span className="h-px flex-1" style={{ backgroundColor: TOKENS.line }} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {LEARNING.map((skill) => (
              <span
                key={skill}
                className="font-mono text-xs px-4 py-2.5"
                style={{ color: TOKENS.amber, border: `1.5px dashed ${TOKENS.amber}` }}
              >
                {skill}
              </span>
            ))}
          </div>

          <p className="mt-5 text-sm leading-6 max-w-lg" style={{ color: TOKENS.muted }}>
            Not counted in the gauges above — these are actively being
            worked into real projects, not just read about.
          </p>
        </div>

        {/* legend */}
        <div className="mt-8 flex flex-wrap items-center gap-6 px-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3" style={{ backgroundColor: TOKENS.blue }} />
            <span className="font-mono text-[10px] tracking-wide" style={{ color: TOKENS.muted }}>
              SHIPPED IN PRODUCTION
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3" style={{ border: `1.5px dashed ${TOKENS.amber}` }} />
            <span className="font-mono text-[10px] tracking-wide" style={{ color: TOKENS.muted }}>
              IN ACTIVE TESTING
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
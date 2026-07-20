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

const PILLARS = [
  {
    id: "PIL.01",
    tag: "RE",
    title: "React frontend",
    desc: "Modern UI development using React, Tailwind CSS and component-based architecture.",
  },
  {
    id: "PIL.02",
    tag: "BE",
    title: "Node + Express backend",
    desc: "Secure REST APIs, authentication, and server-side logic for scalable applications.",
  },
  {
    id: "PIL.03",
    tag: "DB",
    title: "MongoDB database",
    desc: "Efficient NoSQL database design for flexible and scalable data handling.",
  },
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

function PillarCard({ item, index }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className="group relative bg-white p-8 transition-all duration-700 ease-out hover:-translate-y-1"
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
          className="flex h-11 w-11 items-center justify-center font-mono text-sm font-bold text-white transition-colors duration-300"
          style={{ backgroundColor: TOKENS.ink }}
        >
          {item.tag}
        </span>
        <span className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.blue }}>
          {item.id}
        </span>
      </div>

      <h3
        className="mt-5 text-xl font-bold"
        style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {item.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed" style={{ color: TOKENS.muted }}>
        {item.desc}
      </p>

      <div
        className="mt-6 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
        style={{ backgroundColor: TOKENS.blue }}
      />
    </div>
  );
}

export default function About() {

const [Stats, setStats] = useState([
  { value: "Full", label: "MERN Stack" },
  { value: "0", label: "Projects" },
  { value: "REST", label: "API Expert" },
  { value: "Clean", label: "Architecture" },
]);

 const projectsCount = async () => {
  try {
    const { data } = await API.get("/dashboard");

    setStats((prev) =>
      prev.map((item) =>
        item.label === "Projects"
          ? { ...item, value: data.projectCount }
          : item
      )
    );
  } catch (err) {
    console.log(err);
  }
}

  useEffect(() => {
    projectsCount();
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

      <div className="relative max-w-5xl mx-auto">

        {/* header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-2 w-2" style={{ backgroundColor: TOKENS.blue }} />
            <p className="font-mono text-xs tracking-[0.3em]" style={{ color: TOKENS.blue }}>
              MERN STACK DEVELOPER — SYS.00
            </p>
          </div>

          <h2
            className="mt-5 text-4xl sm:text-5xl font-bold leading-[1.1]"
            style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Building scalable
            <br />
            full-stack web applications.
          </h2>

          <p className="mt-5 max-w-xl mx-auto leading-7" style={{ color: TOKENS.muted }}>
            I design and develop complete web solutions using MongoDB,
            Express, React and Node.js — focused on performance,
            scalability and clean UI.
          </p>
        </div>

        {/* pillars grid */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {PILLARS.map((item, i) => (
            <PillarCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* stat strip */}
        <div
          className="relative mt-10 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#DAE0E9] bg-white"
          style={{ border: `1px solid ${TOKENS.line}` }}
        >
          <CornerMarks />
          {Stats.map((stat) => (
            <div key={stat.label} className="px-6 py-8 text-center">
              <p
                className="text-3xl font-bold"
                style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {stat.value}
              </p>
              <p className="mt-1.5 font-mono text-[11px] tracking-wide" style={{ color: TOKENS.muted }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
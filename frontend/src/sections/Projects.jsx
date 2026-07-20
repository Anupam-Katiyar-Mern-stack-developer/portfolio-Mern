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

function IconArrow({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PROJECTS = [

  {
    id: "PRJ.02",
    title: "Modern Ecommerce Platform",
    image: "/projects/ecommerce.png",
    description:
      "Scalable ecommerce system with cart, wishlist, payments, authentication and an admin dashboard.",
    tech: ["React", "Redux", "Node.js", "MongoDB"],
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

function ProjectRow({ project, index }) {
  const [ref, visible] = useReveal();
  const flipped = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="grid items-center gap-12 lg:grid-cols-2 transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(32px)",
      }}
    >
      {/* IMAGE */}
      <div className={flipped ? "lg:order-2" : ""}>
        <div
          className="group relative overflow-hidden bg-white transition-colors duration-300"
          style={{ border: `1px solid ${TOKENS.line}` }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = TOKENS.blue)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = TOKENS.line)}
        >
          <CornerMarks />
          <img
            src={project.image}
            alt={project.title}
            className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className={flipped ? "lg:order-1" : ""}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-widest" style={{ color: TOKENS.blue }}>
            {project._id}
          </span>
          <span className="h-px w-16" style={{ backgroundColor: TOKENS.line }} />
        </div>

        <h3
          className="mt-4 text-3xl sm:text-4xl font-bold leading-tight"
          style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {project.title}
        </h3>

        <p className="mt-5 leading-7" style={{ color: TOKENS.muted }}>
          {project.description}
        </p>

        {/* TECH STACK */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          {project.tech.map((item) => (
            <span
              key={item}
              className="px-4 py-1.5 font-mono text-xs transition-colors duration-200"
              style={{ color: TOKENS.ink, border: `1px solid ${TOKENS.line}` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = TOKENS.ink;
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = TOKENS.ink;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = TOKENS.ink;
                e.currentTarget.style.borderColor = TOKENS.line;
              }}
            >
              {item}
            </span>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="mt-9 flex items-center gap-6">
          <button  onClick={() => window.open(project.liveLink, "_blank")}
            className="px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: TOKENS.ink }}
          >
            Live demo
          </button>

          <button 
           onClick={() => window.open(project.githubLink, "_blank")}
          className="group flex items-center gap-2 text-sm font-semibold" style={{ color: TOKENS.ink }}>
            View code
            <IconArrow className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);

 useEffect(() => {
  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");

      const formatted = res.data.projects.map((item) => ({
        ...item,
        tech: Array.isArray(item.technologies)
          ? item.technologies
          : [],
      }));

      setProjects(formatted);
    } catch (err) {
      console.log(err);
    }
  };

  fetchProjects();
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
              FEATURED WORK — SYS.05
            </p>
          </div>

          <h2
            className="mt-5 text-4xl sm:text-5xl font-bold leading-[1.1]"
            style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Selected projects.
          </h2>

          <p className="mt-5 max-w-xl mx-auto leading-7" style={{ color: TOKENS.muted }}>
            Real-world MERN stack applications built with modern
            architecture and clean UI systems.
          </p>
        </div>

        {/* project list */}
        <div className="mt-20 flex flex-col gap-24">
          {projects.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
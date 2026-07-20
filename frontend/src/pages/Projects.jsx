import { useEffect, useRef, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function ArrowUpRight({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GithubMark({ size = 16, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.16.69-3.83-1.34-3.83-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 015.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.79.55 4.51-1.51 7.77-5.76 7.77-10.78C23.25 5.48 18.27.5 12 .5z" />
    </svg>
  );
}

function ComponentMark({ size = 13, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d="M12 2l3.5 3.5L12 9 8.5 5.5 12 2zM12 15l3.5 3.5L12 22l-3.5-3.5L12 15zM2 12l3.5-3.5L9 12l-3.5 3.5L2 12zM15 12l3.5-3.5L22 12l-3.5 3.5L15 12z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

const TOKENS = {
  paper: "#FAFAF7",
  ink: "#1C2B45",
  blue: "#2F5EA8",
  amber: "#C9812E",
  line: "#DAE0E9",
  muted: "#66728A",
};



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

function ProjectCard({ project, index, onClick }) {
  const [ref, visible] = useReveal();
  return (
    <div
    onClick={onClick}
      ref={ref}
      className="relative bg-white p-7 sm:p-9 transition-all duration-700 ease-out cursor-pointer"
      style={{
        border: `1px solid ${TOKENS.line}`,
        transitionDelay: `${index * 90}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(28px)",
      }}
    >
      <CornerMarks />

      {/* stamp */}
      <div
        className="absolute -top-3 right-6 sm:right-9 select-none"
        style={{ transform: "rotate(-6deg)" }}
      >
        <span
          className="font-mono text-[10px] tracking-[0.25em] px-3 py-1 bg-white"
          style={{
            color: project.status === "SHIPPED" ? TOKENS.blue : TOKENS.amber,
            border: `1.5px dashed ${project.status === "SHIPPED" ? TOKENS.blue : TOKENS.amber}`,
          }}
        >
          {project.status}
        </span>
      </div>

      {/* header row */}
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs tracking-widest" style={{ color: TOKENS.blue }}>
          {project.id}
        </span>
        <span className="h-px flex-1" style={{ backgroundColor: TOKENS.line }} />
        <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: TOKENS.muted }}>
          {project.class}
        </span>
      </div>

      {/* title */}
      <h3
        className="mt-4 text-[28px] sm:text-3xl font-bold leading-tight"
        style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {project.title}
      </h3>

      {/* desc */}
      <p className="mt-3 max-w-xl leading-7" style={{ color: TOKENS.muted }}>
        {project.desc}
      </p>

      {/* parts list — dotted spec line */}
      <div className="mt-7">
        <div className="flex items-center gap-2 mb-3">
          <ComponentMark size={13} style={{ color: TOKENS.blue }} />
          <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: TOKENS.muted }}>
            COMPONENTS
          </span>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {project.parts.map((p, i) => (
            <span
              key={p}
              className="font-mono text-xs"
              style={{ color: TOKENS.ink }}
            >
              <span style={{ color: TOKENS.blue }}>{String(i + 1).padStart(2, "0")}</span>{" "}
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* actions */}
      <div
        className="mt-8 pt-6 flex flex-wrap items-center gap-4"
        style={{ borderTop: `1px dashed ${TOKENS.line}` }}
      >
        <a href={project.liveLink}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
          style={{ backgroundColor: TOKENS.ink }}
        >
          View live build
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        <a
          href={project.githubLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-slate-50"
          style={{ color: TOKENS.ink, border: `1px solid ${TOKENS.line}` }}
        >
          <GithubMark size={15} />
          Source
        </a>
      </div>
    </div>
  );
}

export default function Projects() {

  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");

      setProjects(
        res.data.projects.map((item) => ({
          id: item._id,
          class: item.category || "MERN PROJECT",
          title: item.title,
          desc: item.description, // yaha bhi description use karo
          parts: item.technologies || [],
          status: item.status,
          liveLink: item.liveLink,
          githubLink: item.githubLink,
        }))
      );



      console.log(res.data.projects);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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

      <div className="relative max-w-4xl mx-auto">
        {/* header */}
        <div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2" style={{ backgroundColor: TOKENS.blue }} />
            <p
              className="font-mono text-xs tracking-[0.3em]"
              style={{ color: TOKENS.blue }}
            >
              BUILD LOG — SELECTED SYSTEMS
            </p>
          </div>

          <h2
            className="mt-5 text-4xl sm:text-5xl font-bold leading-[1.05]"
            style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Three systems,
            <br />
            documented like blueprints.
          </h2>

          <p className="mt-5 max-w-lg leading-7" style={{ color: TOKENS.muted }}>
            Every build below shipped end-to-end on the MERN stack —
            spec&apos;d, wired, and running.
          </p>
        </div>

        {/* project list */}
        <div className="mt-16 flex flex-col gap-10">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => navigate(`/projects/${project.id}`)}
            />
          ))}
        </div>

        {/* CTA — work order panel */}
        <div
          className="relative mt-16 p-10 sm:p-14 overflow-hidden"
          style={{ backgroundColor: TOKENS.ink }}
        >
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
                OPEN FOR WORK ORDERS
              </p>
              <h3
                className="mt-4 text-2xl sm:text-3xl font-bold text-white max-w-md leading-snug"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Need a system like these built for your business?
              </h3>
            </div>
            <button
              className="shrink-0 flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: "white", color: TOKENS.ink }}
            >
              Start the brief
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
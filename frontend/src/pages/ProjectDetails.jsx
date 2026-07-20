import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const TOKENS = {
  paper: "#FAFAF7",
  ink: "#1C2B45",
  blue: "#2F5EA8",
  amber: "#C9812E",
  line: "#DAE0E9",
  muted: "#66728A",
  red: "#B4453C",
};

function IconArrow({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconGithub({ size = 15, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.16.69-3.83-1.34-3.83-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 015.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.79.55 4.51-1.51 7.77-5.76 7.77-10.78C23.25 5.48 18.27.5 12 .5z" />
    </svg>
  );
}
function IconImageOff({ size = 22, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d="M3 3l18 18M8.5 5H18a2 2 0 012 2v9.5M17 17H6a2 2 0 01-2-2V7c0-.4.1-.77.28-1.1M9.5 9.5a1.8 1.8 0 102.6 2.6M4 15l4-4 3 3 2-2 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Normalizes a technologies/features list that may arrive in several
 * broken shapes from the backend, e.g.:
 *   ["react"]                       -> fine, already an array
 *   ["react, node, mongo"]          -> one comma-joined string in an array
 *   ['["react","node"]']            -> a JSON-stringified array, itself
 *                                       wrapped in an array (the case seen
 *                                       in the debug output)
 * Flattens all of these into a clean string array.
 */
function normalizeList(value) {
  if (!value) return [];
  const raw = Array.isArray(value) ? value : [value];

  const flattened = raw.flatMap((item) => {
    if (typeof item !== "string") return [];
    const trimmed = item.trim();

    // Looks like a JSON-stringified array — try to parse it.
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // fall through to comma-split below
      }
    }

    // Otherwise treat it as a comma-separated string.
    return trimmed.split(",");
  });

  return flattened
    .map((s) => String(s).replace(/["[\]]/g, "").trim())
    .filter(Boolean);
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

function StoryBlock({ label, title, body }) {
  const [ref, visible] = useReveal();
  if (!body) return null;
  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0px)" : "translateY(20px)" }}
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.blue }}>
          {label}
        </span>
        <span className="h-px flex-1" style={{ backgroundColor: TOKENS.line }} />
      </div>
      <div className="mt-4">
        {title && (
          <h2
            className="text-2xl font-bold"
            style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {title}
          </h2>
        )}
        <p className="mt-3 leading-7" style={{ color: TOKENS.muted }}>
          {body}
        </p>
      </div>
    </div>
  );
}

function PageShell({ children }) {
  return (
    <section
      className="relative min-h-screen"
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
      <div className="relative max-w-6xl mx-auto px-6 py-24 sm:py-32">{children}</div>
    </section>
  );
}

/**
 * Project image with a real loading/error lifecycle:
 *  - shows a shimmer placeholder while the image loads
 *  - if the URL 404s / fails to load, shows a clear "image unavailable"
 *    state instead of a blank box or a browser broken-image icon
 */
function ProjectImage({ src, alt }) {
  const [imgState, setImgState] = useState("loading"); // loading | loaded | error

  if (!src) return null;

  return (
    <div
      className="relative mt-16 overflow-hidden bg-white"
      style={{ border: `1px solid ${TOKENS.line}` }}
    >
      <CornerMarks />

      <div className="relative w-full aspect-video">
        {imgState !== "error" && (
          <img
            src={src}
            alt={alt}
            onLoad={() => setImgState("loaded")}
            onError={() => setImgState("error")}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 hover:scale-105"
            style={{ opacity: imgState === "loaded" ? 1 : 0 }}
          />
        )}

        {imgState === "loading" && (
          <div
            className="absolute inset-0 animate-pulse"
            style={{ backgroundColor: "#F0F2F6" }}
          />
        )}

        {imgState === "error" && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ backgroundColor: "#F0F2F6", color: TOKENS.muted }}
          >
            <IconImageOff size={26} />
            <p className="font-mono text-[10px] tracking-widest">IMAGE UNAVAILABLE</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setProject(null);

    if (!id) {
      console.log("ProjectDetails: no `id` param found — check your route's :param name matches useParams() here.");
      setStatus("error");
      return;
    }

    const fetchProject = async () => {
      try {
        const { data } = await API.get(`/projects/${id}`);
        const incoming = data?.project ?? data;

        console.log(data);

        if (!incoming || !incoming._id) {
          console.log("Response didn't contain a valid project object:", data);
          if (!cancelled) setStatus("error");
          return;
        }

        if (!cancelled) {
          setProject(incoming);
          setStatus("ready");
        }
      } catch (error) {
        console.log("Failed to fetch project:", error?.response?.data || error.message);
        if (!cancelled) setStatus("error");
      }
    };

    fetchProject();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === "loading") {
    return (
      <PageShell>
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <span className="h-2 w-2 animate-pulse" style={{ backgroundColor: TOKENS.blue }} />
          <p className="mt-4 font-mono text-xs tracking-[0.3em]" style={{ color: TOKENS.muted }}>
            LOADING CASE FILE...
          </p>
        </div>
      </PageShell>
    );
  }

  if (status === "error" || !project) {
    return (
      <PageShell>
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <p className="font-mono text-xs tracking-[0.3em]" style={{ color: TOKENS.red }}>
            CASE FILE NOT FOUND
          </p>
          <p className="mt-3 max-w-sm" style={{ color: TOKENS.muted }}>
            This project couldn&apos;t be loaded. It may have been removed or
            the link is out of date.
          </p>
          <a
            href="/projects"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white"
            style={{ backgroundColor: TOKENS.ink }}
          >
            Back to projects
            <IconArrow size={14} />
          </a>
        </div>
      </PageShell>
    );
  }

  // Clean up malformed technologies/features (handles the double-encoded
  // '["react"]' case seen from the API, plain comma strings, or already
  // well-formed arrays — all normalize to a flat string array here).
  const technologies = normalizeList(project.technologies);
  const features = normalizeList(project.features);
  const hasStack = technologies.length > 0;
  const hasFeatures = features.length > 0;

  return (
    <PageShell>

      {/* HERO */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-3">
          <span className="h-2 w-2" style={{ backgroundColor: TOKENS.blue }} />
          <p className="font-mono text-xs tracking-[0.3em]" style={{ color: TOKENS.blue }}>
            CASE FILE — {project._id ? project._id.slice(-6).toUpperCase() : "———"}
          </p>
          {project.category && (
            <>
              <span className="h-1 w-1 rounded-full" style={{ backgroundColor: TOKENS.line }} />
              <p className="font-mono text-xs tracking-[0.3em]" style={{ color: TOKENS.muted }}>
                {project.category.toUpperCase()}
              </p>
            </>
          )}
        </div>

        <h1
          className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
          style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {project.title}
        </h1>

        <p className="mt-6 text-lg leading-8" style={{ color: TOKENS.muted }}>
          {project.description}
        </p>
      </div>

      {/* IMAGE — now with a real loaded/error state instead of an <img>
          that silently renders nothing on failure */}
      <ProjectImage src={project.image} alt={project.title} />

      {/* CONTENT GRID */}
      <div className="mt-24 grid lg:grid-cols-3 gap-14">

        <div className="lg:col-span-2 flex flex-col gap-14">
          <StoryBlock label="PROBLEM" body={project.problem} />
          <StoryBlock label="INSIGHT" body={project.insight} />
          <StoryBlock label="SOLUTION" body={project.solution} />

          {hasFeatures && (
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.blue }}>
                  KEY FEATURES
                </span>
                <span className="h-px flex-1" style={{ backgroundColor: TOKENS.line }} />
              </div>
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                {features.map((feature, i) => (
                  <div
                    key={feature + i}
                    className="relative bg-white p-5 transition-colors hover:bg-slate-50"
                    style={{ border: `1px solid ${TOKENS.line}` }}
                  >
                    <CornerMarks />
                    <p className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.blue }}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 font-semibold text-sm" style={{ color: TOKENS.ink }}>
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT STICKY PANEL */}
        <div className="lg:sticky top-24 h-fit flex flex-col gap-5">

          {project.role && (
            <div className="relative bg-white p-6" style={{ border: `1px solid ${TOKENS.line}` }}>
              <CornerMarks />
              <p className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.muted }}>
                ROLE
              </p>
              <p className="mt-1.5 font-semibold" style={{ color: TOKENS.ink }}>
                {project.role}
              </p>
            </div>
          )}

          {hasStack && (
            <div className="relative bg-white p-6" style={{ border: `1px solid ${TOKENS.line}` }}>
              <CornerMarks />
              <p className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.muted }}>
                TECH STACK
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1.5"
                    style={{ color: TOKENS.ink, border: `1px solid ${TOKENS.line}` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.impact && (
            <div className="relative p-6" style={{ backgroundColor: TOKENS.ink }}>
              <p className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.amber }}>
                IMPACT
              </p>
              <p className="mt-1.5 font-semibold text-white leading-6">
                {project.impact}
              </p>
            </div>
          )}

          {(project.liveLink || project.githubLink) && (
            <div className="flex flex-wrap gap-3">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: TOKENS.ink }}
                >
                  Live demo
                  <IconArrow size={14} />
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold transition-colors hover:bg-slate-50"
                  style={{ color: TOKENS.ink, border: `1px solid ${TOKENS.line}` }}
                >
                  <IconGithub size={14} />
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </div>

    </PageShell>
  );
}
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

function IconLayout({ size = 22, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <rect x="3" y="4" width="18" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 9h18M9 9v11" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
function IconServer({ size = 22, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <rect x="3" y="4" width="18" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="14" width="18" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="7" cy="7" r="0.8" fill="currentColor" />
      <circle cx="7" cy="17" r="0.8" fill="currentColor" />
    </svg>
  );
}
function IconCode({ size = 22, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d="M9 6L3 12l6 6M15 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconDatabase({ size = 22, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <ellipse cx="12" cy="5.5" rx="8" ry="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 5.5V18.5C4 20.15 7.58 21.5 12 21.5C16.42 21.5 20 20.15 20 18.5V5.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 12C4 13.65 7.58 15 12 15C16.42 15 20 13.65 20 12" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
function IconSmartphone({ size = 22, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <rect x="6" y="2" width="12" height="20" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M11 18h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IconCloud({ size = 22, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d="M6.5 18a4.5 4.5 0 01-.4-8.98A6 6 0 0117.9 9.1 4 4 0 0117.5 18h-11z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

const SERVICES = [
  { id: "01", title: "Frontend development", desc: "Modern, responsive UI using React and Tailwind CSS, with pixel-perfect design systems.", icon: IconLayout },
  { id: "02", title: "Backend development", desc: "Secure and scalable REST APIs using Node.js and Express, with proper authentication systems.", icon: IconServer },
  { id: "03", title: "Full stack apps", desc: "End-to-end MERN applications with authentication, dashboards and real-world features.", icon: IconCode },
  { id: "04", title: "Database design", desc: "Optimized MongoDB and MySQL schemas for scalable and efficient data handling.", icon: IconDatabase },
  { id: "05", title: "Responsive design", desc: "Mobile-first UI ensuring a perfect experience across every device and screen size.", icon: IconSmartphone },
  { id: "06", title: "Deployment", desc: "Production deployment using Vercel, Netlify and Render, with CI/CD workflows.", icon: IconCloud },
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

function ServiceCard({ item, index }) {
  const [ref, visible] = useReveal();
  const Icon = item.icon;
  return (
    <div
      ref={ref}
      className="group relative bg-white p-8 transition-all duration-700 ease-out hover:-translate-y-1"
      style={{
        border: `1px solid ${TOKENS.line}`,
        transitionDelay: `${index * 80}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(24px)",
      }}
    >
      <CornerMarks />

      <div className="flex items-center justify-between">
        <span
          className="flex h-14 w-14 items-center justify-center transition-colors duration-300"
          style={{ border: `1px solid ${TOKENS.line}`, color: TOKENS.blue }}
        >
          <Icon size={22} />
        </span>
        <span className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.muted }}>
          SVC.{item.id}
        </span>
      </div>

      <h3
        className="mt-6 text-xl font-bold"
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

export default function Services() {

  const [projects, setProjects] = useState(0);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/dashboard");
      console.log(res.data)
      setProjects(res.data.projectCount);

    } catch (error) {
      console.log(error);
    }
  }

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

      <div className="relative max-w-6xl mx-auto">

        {/* header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-2 w-2" style={{ backgroundColor: TOKENS.blue }} />
            <p className="font-mono text-xs tracking-[0.3em]" style={{ color: TOKENS.blue }}>
              SERVICE MENU — SYS.02
            </p>
          </div>

          <h2
            className="mt-5 text-4xl sm:text-5xl font-bold leading-[1.1]"
            style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            What I build.
          </h2>

          <p className="mt-5 max-w-xl mx-auto leading-7" style={{ color: TOKENS.muted }}>
            End-to-end MERN stack solutions focused on performance,
            scalability and clean UI systems.
          </p>
        </div>

        {/* grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((item, i) => (
            <ServiceCard key={item.id} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
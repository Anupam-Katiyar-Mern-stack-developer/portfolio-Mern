import { useEffect, useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import {Link} from "react-router-dom";
import API from "../api/axios"

const TOKENS = {
  paper: "#FAFAF7",
  ink: "#1C2B45",
  blue: "#2F5EA8",
  amber: "#C9812E",
  line: "#DAE0E9",
  muted: "#66728A",
};

function IconGithub({ size = 17, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.16.69-3.83-1.34-3.83-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 015.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.79.55 4.51-1.51 7.77-5.76 7.77-10.78C23.25 5.48 18.27.5 12 .5z" />
    </svg>
  );
}
function IconLinkedin({ size = 17, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M4.98 3.5a2.5 2.5 0 11-.02 5.01A2.5 2.5 0 014.98 3.5zM.5 8.98h4.9V23H.5V8.98zM8.9 8.98h4.7v1.92h.07c.65-1.23 2.24-2.53 4.6-2.53 4.92 0 5.83 3.24 5.83 7.46V23h-4.9v-6.35c0-1.51-.03-3.46-2.11-3.46-2.11 0-2.44 1.65-2.44 3.35V23H8.9V8.98z" />
    </svg>
  );
}
function IconX({ size = 15, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M18.9 2H22l-7.6 8.7L23.3 22h-6.9l-5.4-6.6L4.8 22H1.7l8.1-9.3L1 2h7.1l4.9 6.1L18.9 2zm-1.2 18h1.9L6.4 4H4.4l13.3 16z" />
    </svg>
  );
}

const SOCIALS = [
  { icon: IconGithub, label: "GitHub" },
  { icon: IconLinkedin, label: "LinkedIn" },
  { icon: IconX, label: "X" },
];

const NAV_LINKS = [
  {name:"Home" ,path:"/"},
  {name:"About" ,path:"/about"},
  {name:"Projects" ,path:"/projects"},
  ];

// Fallback list shown while the DB call is loading, or if it fails.
const FALLBACK_PROJECTS = [
  { _id: "f1", title: "Frontend" },
  { _id: "f2", title: "Backend" },
  { _id: "f3", title: "Full stack" },
  { _id: "f4", title: "Deployment" },
];

// Contact details — swap these for your real ones.
const CONTACT = {
  address: "Kanpur, Uttar Pradesh, India",
  phone: "+91 9555529109",
  email: "anupamkatiyar934@gmail.com",
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

export default function Footer() {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const fetchProjects=async()=>{
    try{
      const project=await API.get("/projects/");
      setProjects(project.data.projects);
      setLoadingProjects(false);
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    fetchProjects();

  }, []);

  return (
    <footer
      className="relative px-4 sm:px-6 py-14 sm:py-20"
      style={{
        backgroundColor: TOKENS.paper,
        borderTop: `1px solid ${TOKENS.line}`,
        backgroundImage: `linear-gradient(${TOKENS.line} 1px, transparent 1px), linear-gradient(90deg, ${TOKENS.line} 1px, transparent 1px)`,
        backgroundSize: "44px 44px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="relative max-w-6xl mx-auto">

        {/* index strip */}
        <div className="flex items-center gap-3 mb-10 sm:mb-12">
          <span className="h-2 w-2" style={{ backgroundColor: TOKENS.blue }} />
          <p className="font-mono text-xs tracking-[0.3em]" style={{ color: TOKENS.blue }}>
            SYS.END — FOOTER
          </p>
        </div>

        {/* top grid */}
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-9 w-9 items-center justify-center font-mono text-sm font-bold text-white"
                style={{ backgroundColor: TOKENS.ink }}
              >
                A.
              </span>
              <span
                className="text-xl font-bold"
                style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Anupam
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed" style={{ color: TOKENS.muted }}>
              MERN stack developer focused on building modern, scalable
              and high-performance web applications.
            </p>

            {/* socials */}
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center transition-colors duration-200 hover:bg-slate-50"
                    style={{ border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = TOKENS.blue)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = TOKENS.line)}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* NAV LINKS */}
          {/* NAV LINKS */}
<div>
  <p
    className="font-mono text-[10px] tracking-widest"
    style={{ color: TOKENS.muted }}
  >
    NAVIGATION
  </p>

  <ul className="mt-5 space-y-3 text-sm">
    {NAV_LINKS.map((item) => (
      <li key={item.name}>
        <Link
          to={item.path}
          className="w-fit inline-block transition-colors"
          style={{ color: TOKENS.muted }}
          onMouseEnter={(e) => (e.currentTarget.style.color = TOKENS.blue)}
          onMouseLeave={(e) => (e.currentTarget.style.color = TOKENS.muted)}
        >
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
</div>

          {/* PROJECT LINKS (from MongoDB) */}
          <div>
            <p className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.muted }}>
              PROJECTS
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {loadingProjects && (
                <li className="animate-pulse" style={{ color: TOKENS.line }}>
                  Loading…
                </li>
              )}
              {!loadingProjects &&
                projects.map((p) => (
                  <li key={p._id || p.id || p.title}>
                    <a
                      href={p.link || p.url || "#"}
                      target={p.link || p.url ? "_blank" : undefined}
                      rel={p.link || p.url ? "noreferrer" : undefined}
                      className="w-fit inline-block transition-colors"
                      style={{ color: TOKENS.muted }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = TOKENS.blue)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = TOKENS.muted)}
                    >
                      {p.title || p.name}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          {/* CTA BOX with contact details */}
          <div className="relative bg-white p-6" style={{ border: `1px solid ${TOKENS.line}` }}>
            <CornerMarks />
            <h3
              className="text-lg font-bold"
              style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Let&apos;s work together
            </h3>

            <p className="mt-3 text-sm leading-6" style={{ color: TOKENS.muted }}>
              Open for internships, freelance and full-time roles.
            </p>

            {/* contact info */}
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-2.5" style={{ color: TOKENS.muted }}>
                <MapPin size={16} style={{ color: TOKENS.blue, marginTop: 2, flexShrink: 0 }} />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-center gap-2.5" style={{ color: TOKENS.muted }}>
                <Phone size={16} style={{ color: TOKENS.blue, flexShrink: 0 }} />
                <a
                  href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
                  className="transition-colors"
                  style={{ color: TOKENS.muted }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = TOKENS.blue)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = TOKENS.muted)}
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5" style={{ color: TOKENS.muted }}>
                <Mail size={16} style={{ color: TOKENS.blue, flexShrink: 0 }} />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="transition-colors break-all"
                  style={{ color: TOKENS.muted }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = TOKENS.blue)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = TOKENS.muted)}
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>

            <a
              href="#contact"
              className="mt-6 block w-full text-center py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: TOKENS.ink }}
            >
              Contact me
            </a>
          </div>
        </div>

        {/* divider */}
        <div className="my-10" style={{ borderTop: `1px dashed ${TOKENS.line}` }} />

        {/* bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-center md:text-left md:flex-row">
          <p className="font-mono text-xs" style={{ color: TOKENS.muted }}>
            © {new Date().getFullYear()} Anupam. All rights reserved.
          </p>
          <p className="font-mono text-xs" style={{ color: TOKENS.line }}>
            Built with React + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
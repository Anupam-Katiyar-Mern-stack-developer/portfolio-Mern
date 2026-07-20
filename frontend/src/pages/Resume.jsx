import { useEffect, useRef, useState } from "react";
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

function IconDownload({ size = 16, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d="M12 3v13m0 0l-5-5m5 5l5-5M4 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconArrow({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const EXPERIENCE = [
  {
    id: "EXP.01",
    role: "MERN Developer",
    org: "Personal Projects",
    desc: "Built multiple full-stack applications with authentication, dashboards and APIs.",
  },
  {
    id: "EXP.02",
    role: "Frontend Developer",
    org: "UI Engineering",
    desc: "Focused on responsive UI systems using React and Tailwind CSS.",
  },
];

const SKILLS = ["React", "Node.js", "Express", "MongoDB", "Tailwind", "JavaScript"];

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

function SectionHeader({ label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.blue }}>
        {label}
      </span>
      <span className="h-px flex-1" style={{ backgroundColor: TOKENS.line }} />
    </div>
  );
}

function ExperienceRow({ item, index }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className="relative bg-white p-6 transition-all duration-700 ease-out"
      style={{
        border: `1px solid ${TOKENS.line}`,
        transitionDelay: `${index * 90}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(20px)",
      }}
    >
      <CornerMarks />
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.blue }}>
          {item.id}
        </span>
        <span className="h-px flex-1" style={{ backgroundColor: TOKENS.line }} />
      </div>
      <p className="mt-3 text-sm font-semibold" style={{ color: TOKENS.blue }}>
        {item.role}
      </p>
      <p className="mt-1 font-bold" style={{ color: TOKENS.ink }}>
        {item.org}
      </p>
      <p className="mt-2 text-sm leading-6" style={{ color: TOKENS.muted }}>
        {item.desc}
      </p>
    </div>
  );
}

export default function Resume() {
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [totalExperience, setTotalExperience] = useState(0);

  const handleDownloadResume = async () => {
    try {
      const response = await API.get("/resume/download", {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Anupam_Resume.pdf");

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDashboard = async () => {
    try {
      const { data } = await API.get("/dashboard");

      setSkills(data.skills);
      setExperiences(data.experiences);
      setTotalExperience(data.totalExperience);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
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

      <div className="relative max-w-5xl mx-auto">

        {/* header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-2 w-2" style={{ backgroundColor: TOKENS.blue }} />
            <p className="font-mono text-xs tracking-[0.3em]" style={{ color: TOKENS.blue }}>
              PERSONNEL FILE — SYS.07
            </p>
          </div>

          <h1
            className="mt-5 text-4xl sm:text-5xl font-bold leading-[1.1]"
            style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            My professional profile.
          </h1>

          <p className="mt-5 max-w-xl mx-auto leading-7" style={{ color: TOKENS.muted }}>
            MERN stack developer focused on building scalable web
            applications and clean UI systems.
          </p>

          <button
            onClick={handleDownloadResume}
            className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: TOKENS.ink }}
          >
            <IconDownload size={15} />
            Download Resume
          </button>
        </div>

        {/* grid */}
        <div className="mt-16 grid lg:grid-cols-3 gap-6">

          {/* LEFT — summary / experience / education */}
          <div className="lg:col-span-2 flex flex-col gap-10">

            {/* summary */}
            <div className="relative bg-white p-7 sm:p-8" style={{ border: `1px solid ${TOKENS.line}` }}>
              <CornerMarks />
              <SectionHeader label="PROFILE SUMMARY" />
              <p className="mt-4 leading-7" style={{ color: TOKENS.muted }}>
                I&apos;m a MERN stack developer passionate about building
                scalable backend systems and modern frontend UI with React
                and Tailwind. I focus on performance, clean architecture
                and user experience.
              </p>
            </div>

            {/* experience */}
            <div>
              <div className="mb-5">
                <SectionHeader label="EXPERIENCE" />
              </div>
              <div className="flex flex-col gap-5">
                {experiences.map((item, i) => (
                  <ExperienceRow
                    key={item._id}
                    item={{
                      id: `EXP.${String(i + 1).padStart(2, "0")}`,
                      role: item.position,
                      org: item.company,
                      desc: item.description,
                    }}
                    index={i}
                  />
                ))}
              </div>
            </div>

            {/* education */}
            <div>
              <div className="mb-5">
                <SectionHeader label="EDUCATION" />
              </div>
              <div className="relative bg-white p-6" style={{ border: `1px solid ${TOKENS.line}` }}>
                <CornerMarks />
                <p className="font-bold" style={{ color: TOKENS.ink }}>
                  Computer Science / IT
                </p>
                <p className="mt-2 text-sm leading-6" style={{ color: TOKENS.muted }}>
                  Currently pursuing graduation with a focus on web
                  development.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — skills / contact / status */}
          <div className="flex flex-col gap-6">

            {/* skills */}
            <div className="relative bg-white p-6" style={{ border: `1px solid ${TOKENS.line}` }}>
              <CornerMarks />
              <p className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.muted }}>
                SKILLS
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
  <span
    key={skill._id}
    className="font-mono text-xs px-3 py-1.5"
    style={{
      color: TOKENS.ink,
      border: `1px solid ${TOKENS.line}`,
    }}
  >
    {skill.name}
  </span>
))}
              </div>
            </div>

            {/* contact */}
            <div className="relative p-6" style={{ backgroundColor: TOKENS.ink }}>
              <p className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.amber }}>
                CONTACT
              </p>
              <p className="mt-2 text-sm text-white/80">
                anupamkatiyar934@gmail.com
              </p>
              <p className="mt-1 text-sm text-white/80">
                +91 9555529109
              </p>
            </div>

            {/* status */}
            <div className="relative bg-white p-6" style={{ border: `1px solid ${TOKENS.line}` }}>
              <CornerMarks />
              <p className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.muted }}>
                STATUS
              </p>
              <div className="mt-2 flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                    style={{ backgroundColor: TOKENS.green }}
                  />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: TOKENS.green }} />
                </span>
                <p className="font-semibold" style={{ color: TOKENS.ink }}>
                  Open for opportunities
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* final CTA */}
        <div className="relative mt-16 p-10 sm:p-14 overflow-hidden text-center" style={{ backgroundColor: TOKENS.ink }}>
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative">
            <p className="font-mono text-[10px] tracking-[0.3em]" style={{ color: TOKENS.amber }}>
              OPEN CHANNEL
            </p>
            <h2
              className="mt-4 text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Let&apos;s work together.
            </h2>
            <p className="mt-4 text-white/70">
              Open for internships, freelance and full-time roles.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: "white", color: TOKENS.ink }}
            >
              Contact me
              <IconArrow size={15} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
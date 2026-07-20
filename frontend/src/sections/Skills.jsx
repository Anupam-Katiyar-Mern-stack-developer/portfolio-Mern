import { useEffect, useRef, useState } from "react";
import { FaReact, FaNodeJs, FaGithub, FaGitAlt } from "react-icons/fa";
import {
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiJavascript,
  SiRedux,
  SiSocketdotio,
  SiPostman,
  SiMysql,
  SiCloudinary,
} from "react-icons/si";

import { skillIcons } from "../utils/skillIcons";
import API from "../api/axios";

const TOKENS = {
  paper: "#FAFAF7",
  ink: "#1C2B45",
  blue: "#2F5EA8",
  amber: "#C9812E",
  line: "#DAE0E9",
  muted: "#66728A",
};

/* Brand marks keep their own recognized colors — everything around
   them (borders, tiles, panel chrome) follows the site's tokens. */

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

function GroupPanel({ group, index }) {
  const [ref, visible] = useReveal();
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
          {group.id}
        </span>
        <span className="h-px flex-1" style={{ backgroundColor: TOKENS.line }} />
        <span className="font-mono text-[10px]" style={{ color: TOKENS.muted }}>
          {String(group.skills.length).padStart(2, "0")} ITEMS
        </span>
      </div>

      <h3
        className="mt-4 text-2xl font-bold"
        style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {group.title}
      </h3>

      <div className="mt-7 grid grid-cols-2 gap-4">
        {group.skills.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center p-5 transition-colors duration-200"
            style={{ border: `1px solid ${TOKENS.line}` }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = TOKENS.blue)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = TOKENS.line)}
          >
            {item.Icon ? (
              <item.Icon className="text-3xl text-sky-500" />
            ) : (
              <span className="text-3xl">⚡</span>
            )}
            <p className="mt-3 text-sm font-semibold" style={{ color: TOKENS.ink }}>
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {

    const fetchSkill = async () => {
      try {
        const res = await API.get("/skills");

        const grouped = res.data.skills.reduce((acc, skill) => {
          const category = skill.category;

          if (!acc[category]) {
            acc[category] = {
              id: `CAT.${Object.keys(acc).length + 1}`,
              title: category,
              skills: [],
            };
          }

          acc[category].skills.push({
            ...skill,
            Icon: skillIcons[skill.name.toLowerCase().trim()],
          });

          return acc;
        }, {});

        setSkills(Object.values(grouped));
      } catch (error) {
        console.log(error);
      }
    };

    fetchSkill();

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
              TECH STACK — SYS.03
            </p>
          </div>

          <h2
            className="mt-5 text-4xl sm:text-5xl font-bold leading-[1.1]"
            style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Technologies I
            <br />
            work with.
          </h2>

          <p className="mt-5 max-w-xl mx-auto leading-7" style={{ color: TOKENS.muted }}>
            MERN stack developer focused on scalable architecture and
            clean UI systems.
          </p>
        </div>

        {/* grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {skills.map((group, i) => (
            <GroupPanel key={group.id} group={group} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
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

/* ---------- inline icons (no external icon dependency) ---------- */

function IconMail({ size = 18, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 6.5l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconPhone({ size = 18, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function IconPin({ size = 18, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d="M12 22s7-6.6 7-12a7 7 0 10-14 0c0 5.4 7 12 7 12z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
function IconSend({ size = 16, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconGithub({ size = 16, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.16.69-3.83-1.34-3.83-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 015.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.79.55 4.51-1.51 7.77-5.76 7.77-10.78C23.25 5.48 18.27.5 12 .5z" />
    </svg>
  );
}
function IconLinkedin({ size = 16, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M4.98 3.5a2.5 2.5 0 11-.02 5.01A2.5 2.5 0 014.98 3.5zM.5 8.98h4.9V23H.5V8.98zM8.9 8.98h4.7v1.92h.07c.65-1.23 2.24-2.53 4.6-2.53 4.92 0 5.83 3.24 5.83 7.46V23h-4.9v-6.35c0-1.51-.03-3.46-2.11-3.46-2.11 0-2.44 1.65-2.44 3.35V23H8.9V8.98z" />
    </svg>
  );
}
function IconX({ size = 16, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M18.9 2H22l-7.6 8.7L23.3 22h-6.9l-5.4-6.6L4.8 22H1.7l8.1-9.3L1 2h7.1l4.9 6.1L18.9 2zm-1.2 18h1.9L6.4 4H4.4l13.3 16z" />
    </svg>
  );
}

/* ---------- data ---------- */

const READOUT = [
  { value: "24h", label: "Response time" },
  { value: "OPEN", label: "Availability" },
  { value: "MERN", label: "Stack focus" },
  { value: "REMOTE", label: "Work mode" },
];

const CHANNELS = [
  { icon: IconMail, label: "EMAIL", value: "anupamkatiyar934@gmail.com", href: "mailto:anupamkatiyar934@gmail.com" },
  { icon: IconPhone, label: "PHONE", value: "+91 9555529109", href: "tel:+919555529109" },
  { icon: IconPin, label: "LOCATION", value: "India — Remote", href: null },
];

const SOCIALS = [
  { label: "GitHub", icon: IconGithub, href: "#" },
  { label: "LinkedIn", icon: IconLinkedin, href: "#" },
  { label: "X", icon: IconX, href: "#" },
];

const WEEK = [
  { day: "MON", status: "open" },
  { day: "TUE", status: "open" },
  { day: "WED", status: "booked" },
  { day: "THU", status: "open" },
  { day: "FRI", status: "open" },
  { day: "SAT", status: "booked" },
  { day: "SUN", status: "booked" },
];

const PROTOCOL = [
  { step: "01", title: "Message received", desc: "Your brief lands straight in my inbox — no forms lost in a CRM." },
  { step: "02", title: "Reviewed within 24h", desc: "I read the scope properly and note down any open questions." },
  { step: "03", title: "Reply with next steps", desc: "You get a clear timeline, approach, and how we'd kick off." },
];

/* ---------- shared bits ---------- */

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

function Field({
  label,
  placeholder,
  type = "text",
  area = false,
  name,
  value,
  onChange,
  required = false,
}) {
  const shared = {
    className:
      "w-full mt-2 px-4 py-3 bg-white text-sm outline-none transition-colors placeholder:text-slate-400",
    style: { border: `1px solid ${TOKENS.line}`, color: TOKENS.ink },
    placeholder,
    name,
    value,
    onChange,
    required,
    onFocus: (e) => (e.target.style.borderColor = TOKENS.blue),
    onBlur: (e) => (e.target.style.borderColor = TOKENS.line),
  };
  return (
    <div>
      <label className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.muted }}>
        {label}
      </label>
      {area ? <textarea rows="5" {...shared} /> : <input type={type} {...shared} />}
    </div>
  );
}

/* ---------- page ---------- */

export default function Contact() {
  const [formRef, formVisible] = useReveal();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("sending");

    try {
      const res = await API.post("/messages/", formData);

      setStatus("sent");
      alert(res.data.message || "Message sent successfully");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setStatus("idle"), 2500);
    } catch (err) {
      console.log(err);
      setStatus("error");
      alert(err.response?.data?.message || "Something went wrong");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

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
              OPEN CHANNEL — TRANSMIT A BRIEF
            </p>
          </div>

          <h2
            className="mt-5 text-4xl sm:text-5xl font-bold leading-[1.05]"
            style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Let&apos;s build something
            <br />
            that actually ships.
          </h2>

          <p className="mt-5 max-w-lg leading-7" style={{ color: TOKENS.muted }}>
            Open for internships, freelance projects and full-time roles.
            Send the brief below — I read every message myself.
          </p>
        </div>

        {/* readout bar */}
        <div className="relative mt-14 bg-white" style={{ border: `1px solid ${TOKENS.line}` }}>
          <CornerMarks />
          <div className="grid grid-cols-2 md:grid-cols-4">
            {READOUT.map((stat, i) => (
              <div
                key={stat.label}
                className="px-7 sm:px-9 py-7"
                style={{ borderLeft: i !== 0 ? `1px dashed ${TOKENS.line}` : "none" }}
              >
                <h4
                  className="text-2xl font-bold"
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

        {/* main grid */}
        <div className="mt-10 grid lg:grid-cols-2 gap-6">

          {/* left column */}
          <div className="flex flex-col gap-6">

            {CHANNELS.map((c) => {
              const Icon = c.icon;
              const Wrapper = c.href ? "a" : "div";
              return (
                <Wrapper
                  key={c.label}
                  href={c.href || undefined}
                  className="relative flex items-center gap-4 bg-white p-6 transition-colors hover:bg-slate-50"
                  style={{ border: `1px solid ${TOKENS.line}` }}
                >
                  <CornerMarks />
                  <span
                    className="flex items-center justify-center w-11 h-11 shrink-0"
                    style={{ border: `1px solid ${TOKENS.line}`, color: TOKENS.blue }}
                  >
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.muted }}>
                      {c.label}
                    </p>
                    <p className="mt-0.5 font-semibold" style={{ color: TOKENS.ink }}>
                      {c.value}
                    </p>
                  </div>
                </Wrapper>
              );
            })}

            {/* availability panel */}
            <div className="relative bg-white p-6" style={{ border: `1px solid ${TOKENS.line}` }}>
              <CornerMarks />
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                    style={{ backgroundColor: TOKENS.green }}
                  />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: TOKENS.green }} />
                </span>
                <p className="font-semibold" style={{ color: TOKENS.ink }}>
                  Available for work
                </p>
              </div>
              <p className="mt-2 text-sm leading-6" style={{ color: TOKENS.muted }}>
                Currently accepting new projects and opportunities.
              </p>

              <div className="mt-5 grid grid-cols-7 gap-1.5">
                {WEEK.map((d) => (
                  <div key={d.day} className="flex flex-col items-center gap-1.5">
                    <span className="font-mono text-[9px] tracking-wide" style={{ color: TOKENS.muted }}>
                      {d.day}
                    </span>
                    <span
                      className="w-full h-6"
                      style={{
                        backgroundColor: d.status === "open" ? TOKENS.blue : TOKENS.line,
                        opacity: d.status === "open" ? 1 : 0.8,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* socials */}
            <div className="flex gap-3">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white text-sm font-medium transition-colors hover:bg-slate-50"
                    style={{ border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }}
                  >
                    <Icon size={15} />
                    {s.label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* right column — form */}
          <div
            ref={formRef}
            className="relative bg-white p-8 sm:p-10 transition-all duration-700 ease-out"
            style={{
              border: `1px solid ${TOKENS.line}`,
              opacity: formVisible ? 1 : 0,
              transform: formVisible ? "translateY(0px)" : "translateY(24px)",
            }}
          >
            <CornerMarks />

            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: TOKENS.muted }}>
                PROJECT INTAKE FORM
              </span>
              <span className="h-px flex-1" style={{ backgroundColor: TOKENS.line }} />
            </div>

            <h3
              className="mt-4 text-2xl font-bold"
              style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Send a message
            </h3>
            <p className="mt-1.5 text-sm" style={{ color: TOKENS.muted }}>
              I usually reply within a few hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
              <Field
                label="YOUR NAME"
                placeholder="Jordan Lee"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Field
                label="YOUR EMAIL"
                placeholder="jordan@company.com"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Field
                label="SUBJECT"
                placeholder="What's this about?"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <Field
                label="PROJECT BRIEF"
                placeholder="Tell me what you're building..."
                area
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-2 w-full flex items-center justify-center gap-2 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: TOKENS.ink }}
              >
                <IconSend size={15} />
                {status === "sending" ? "Sending..." : status === "sent" ? "Sent ✓" : "Transmit message"}
              </button>
            </form>
          </div>
        </div>

        {/* response protocol */}
        <div className="relative mt-10 bg-white p-8 sm:p-10" style={{ border: `1px solid ${TOKENS.line}` }}>
          <CornerMarks />
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: TOKENS.muted }}>
              RESPONSE PROTOCOL
            </span>
            <span className="h-px flex-1" style={{ backgroundColor: TOKENS.line }} />
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-8">
            {PROTOCOL.map((p, i) => (
              <div key={p.step} className="relative">
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-xs font-semibold"
                    style={{ color: TOKENS.blue }}
                  >
                    {p.step}
                  </span>
                  <span className="h-px flex-1" style={{ backgroundColor: TOKENS.line }} />
                </div>
                <h4
                  className="mt-3 text-base font-bold"
                  style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {p.title}
                </h4>
                <p className="mt-1.5 text-sm leading-6" style={{ color: TOKENS.muted }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* final CTA */}
        <div className="relative mt-10 p-10 sm:p-14 overflow-hidden" style={{ backgroundColor: TOKENS.ink }}>
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
                READY WHEN YOU ARE
              </p>
              <h3
                className="mt-4 text-2xl sm:text-3xl font-bold text-white max-w-md leading-snug"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Want a full-stack developer on your team?
              </h3>
            </div>
            <a
              href="#contact"
              className="shrink-0 flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: "white", color: TOKENS.ink }}
            >
              Hire me
              <IconSend size={15} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
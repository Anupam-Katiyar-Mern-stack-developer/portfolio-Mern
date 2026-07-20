import { useState } from "react";
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
function IconArrow({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconCheck({ size = 16, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
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

const INFO_CARDS = [
  { icon: IconMail, label: "EMAIL", value: "anupamkatiyar934@gmail.com" },
  { icon: IconPhone, label: "PHONE", value: "+91 9555529109" },
  { icon: IconPin, label: "LOCATION", value: "India — remote friendly" },
];

const EMPTY_FORM = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      await API.post("/messages/", form);
      setSent(true);
      setForm(EMPTY_FORM);
    } catch (err) {
      console.log(err);
      setError("Something went wrong — try again in a moment.");
    } finally {
      setSending(false);
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
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-2 w-2" style={{ backgroundColor: TOKENS.blue }} />
            <p className="font-mono text-xs tracking-[0.3em]" style={{ color: TOKENS.blue }}>
              OPEN CHANNEL — SYS.06
            </p>
          </div>

          <h2
            className="mt-5 text-4xl sm:text-5xl font-bold leading-[1.1]"
            style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Let&apos;s build something
            <br />
            together.
          </h2>

          <p className="mt-5 max-w-xl mx-auto leading-7" style={{ color: TOKENS.muted }}>
            I&apos;m open for internships, freelance work and full-time
            opportunities.
          </p>
        </div>

        {/* grid */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">

          {/* LEFT — info cards */}
          <div className="flex flex-col gap-5">
            {INFO_CARDS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
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
                      {item.label}
                    </p>
                    <p className="mt-0.5 font-semibold" style={{ color: TOKENS.ink }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* availability */}
            <div className="relative bg-white p-6" style={{ border: `1px solid ${TOKENS.line}` }}>
              <CornerMarks />
              <div className="flex items-center gap-4">
                <span
                  className="flex items-center justify-center w-11 h-11 shrink-0"
                  style={{ border: `1px solid ${TOKENS.line}`, color: TOKENS.green }}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                      style={{ backgroundColor: TOKENS.green }}
                    />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: TOKENS.green }} />
                  </span>
                </span>
                <div>
                  <p className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.muted }}>
                    AVAILABILITY
                  </p>
                  <p className="mt-0.5 font-bold" style={{ color: TOKENS.ink }}>
                    Open for work
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — form */}
          <form
            onSubmit={handleSubmit}
            className="relative bg-white p-8 sm:p-10"
            style={{ border: `1px solid ${TOKENS.line}` }}
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
              I usually respond within 24 hours.
            </p>

            <div className="mt-7 flex flex-col gap-5">
              <div>
                <label className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.muted }}>
                  YOUR NAME
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jordan Lee"
                  required
                  className="w-full mt-2 px-4 py-3 bg-white text-sm outline-none transition-colors placeholder:text-slate-400"
                  style={{ border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }}
                  onFocus={(e) => (e.target.style.borderColor = TOKENS.blue)}
                  onBlur={(e) => (e.target.style.borderColor = TOKENS.line)}
                />
              </div>

              <div>
                <label className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.muted }}>
                  YOUR EMAIL
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jordan@company.com"
                  required
                  className="w-full mt-2 px-4 py-3 bg-white text-sm outline-none transition-colors placeholder:text-slate-400"
                  style={{ border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }}
                  onFocus={(e) => (e.target.style.borderColor = TOKENS.blue)}
                  onBlur={(e) => (e.target.style.borderColor = TOKENS.line)}
                />
              </div>

              <div>
                <label className="font-mono text-[10px] tracking-widest" style={{ color: TOKENS.muted }}>
                  PROJECT BRIEF
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me what you're building..."
                  required
                  className="w-full mt-2 px-4 py-3 bg-white text-sm outline-none resize-none transition-colors placeholder:text-slate-400"
                  style={{ border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }}
                  onFocus={(e) => (e.target.style.borderColor = TOKENS.blue)}
                  onBlur={(e) => (e.target.style.borderColor = TOKENS.line)}
                />
              </div>
            </div>

            {error && (
              <p className="mt-4 font-mono text-xs" style={{ color: "#B4453C" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="mt-7 w-full flex items-center justify-center gap-2 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: sent ? TOKENS.green : TOKENS.ink }}
            >
              {sent ? (
                <>
                  <IconCheck size={15} />
                  Message sent
                </>
              ) : (
                <>
                  {sending ? "Sending..." : "Send message"}
                  {!sending && <IconArrow size={15} />}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
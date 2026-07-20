import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/axios";

const getInitials = (name = "") =>
  name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("") || "?";

const avatarPalette = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100 text-pink-700",
  "bg-amber-100 text-amber-700",
  "bg-emerald-100 text-emerald-700",
  "bg-cyan-100 text-cyan-700",
];
const avatarColor = (name = "") => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return avatarPalette[Math.abs(hash) % avatarPalette.length];
};

// Backend field names vary project to project — read whichever exists
// instead of breaking when "text" or "date" isn't the actual key.
const getText = (msg) =>
  msg.text ?? msg.message ?? msg.content ?? msg.body ?? "";

const getDateRaw = (msg) =>
  msg.date ?? msg.createdAt ?? msg.created_at ?? msg.updatedAt ?? null;

const formatDate = (raw) => {
  if (!raw) return "Unknown date";
  const d = new Date(raw);
  if (isNaN(d.getTime())) return String(raw);

  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = d.toDateString() === yesterday.toDateString();

  const time = d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  if (isToday) return `Today, ${time}`;
  if (isYesterday) return `Yesterday, ${time}`;

  return d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
};

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");
  const [activeMsg, setActiveMsg] = useState(null);
  const [readIds, setReadIds] = useState(new Set());

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await API.get("/messages");
        setMessages(res.data.messages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, []);

  const handleDelete = async (id, e) => {
    e?.stopPropagation();
    setDeletingId(id);
    try {
      await API.delete(`/messages/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      if (activeMsg?._id === id) setActiveMsg(null);
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingId(null);
    }
  };

  const openMessage = (msg) => {
    setActiveMsg(msg);
    setReadIds((prev) => new Set(prev).add(msg._id));
  };

  const filtered = useMemo(() => {
    if (!Array.isArray(messages)) return [];
    const q = search.trim().toLowerCase();
    if (!q) return messages;
    return messages.filter(
      (m) =>
        m.name?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q) ||
        getText(m).toLowerCase().includes(q)
    );
  }, [messages, search]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Messages
          </h1>
          <p className="text-gray-500 mt-1">
            All user messages appear here
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!loading && messages.length > 0 && (
            <span className="text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-sm whitespace-nowrap">
              {messages.length} message{messages.length > 1 ? "s" : ""}
            </span>
          )}

          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="pl-9 pr-4 py-2 text-sm rounded-full border border-gray-200 bg-white shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 w-56 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="max-w-6xl mx-auto flex flex-col gap-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 animate-pulse flex items-center gap-4"
            >
              <div className="w-11 h-11 rounded-full bg-gray-200 shrink-0" />
              <div className="flex-1">
                <div className="h-3.5 w-32 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-2/3 bg-gray-100 rounded" />
              </div>
              <div className="h-3 w-16 bg-gray-100 rounded shrink-0" />
            </div>
          ))}
        </div>
      )}

      {/* Message List */}
      {!loading && (
        <div className="max-w-6xl mx-auto flex flex-col gap-3">
          <AnimatePresence>
            {filtered.map((msg) => {
              const isUnread = !readIds.has(msg._id);
              const text = getText(msg);

              return (
                <motion.div
                  key={msg._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => openMessage(msg)}
                  className={`group bg-white rounded-xl shadow-sm border p-4 flex items-center gap-4 cursor-pointer hover:shadow-md hover:border-blue-200 transition-all
                    ${isUnread ? "border-l-4 border-l-blue-500 border-gray-100" : "border-gray-100"}`}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center font-semibold text-sm ${avatarColor(msg.name)}`}>
                      {getInitials(msg.name)}
                    </div>
                    {isUnread && (
                      <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
                    )}
                  </div>

                  {/* Name, email, snippet */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className={`text-sm truncate ${isUnread ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>
                        {msg.name || "Unknown sender"}
                      </h2>
                      <span className="text-xs text-gray-400 truncate">{msg.email}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate mt-0.5">
                      {text || <span className="italic text-gray-300">No message content</span>}
                    </p>
                  </div>

                  {/* Date + delete */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {formatDate(getDateRaw(msg))}
                    </span>
                    <button
                      disabled={deletingId === msg._id}
                      onClick={(e) => handleDelete(msg._id, e)}
                      className="text-xs text-red-400 hover:text-red-600 font-medium opacity-0 group-hover:opacity-100 disabled:opacity-40 transition-all"
                    >
                      {deletingId === msg._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filtered.length === 0 && messages.length > 0 && (
            <div className="text-center text-gray-400 py-16">
              No messages match "{search}"
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!loading && messages.length === 0 && (
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center text-gray-400 mt-20">
          <span className="text-5xl mb-3">📭</span>
          <p className="text-gray-500 font-medium">No messages found</p>
          <p className="text-sm text-gray-400 mt-1">
            New messages from users will show up here
          </p>
        </div>
      )}

      {/* Full message modal */}
      <AnimatePresence>
        {activeMsg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
            onClick={() => setActiveMsg(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold shrink-0 ${avatarColor(activeMsg.name)}`}>
                    {getInitials(activeMsg.name)}
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-bold text-gray-900 truncate">{activeMsg.name || "Unknown sender"}</h2>
                    <a href={`mailto:${activeMsg.email}`} className="text-sm text-blue-600 hover:underline truncate block">
                      {activeMsg.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => setActiveMsg(null)}
                  className="text-gray-400 hover:text-gray-600 shrink-0"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-xs text-gray-400 mb-4">{formatDate(getDateRaw(activeMsg))}</p>

              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap max-h-[50vh] overflow-y-auto">
                {getText(activeMsg) || "No message content"}
              </div>

              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={(e) => handleDelete(activeMsg._id, e)}
                  className="text-sm text-red-500 hover:text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
                <a
                  href={`mailto:${activeMsg.email}`}
                  className="text-sm bg-blue-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Reply
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
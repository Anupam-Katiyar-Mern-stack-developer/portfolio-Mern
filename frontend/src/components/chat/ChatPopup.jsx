import { useEffect, useRef, useState } from "react";
import axios from "axios";
import socket from "../../socket/socket";

const ChatPopup = ({ close }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const [visitorName, setVisitorName] = useState(
        localStorage.getItem("visitorName") || ""
    );

    const [showNameBox, setShowNameBox] = useState(
        !localStorage.getItem("visitorName")
    );

    const [typing, setTyping] = useState(false);

    const bottomRef = useRef(null);

    const roomId =
        localStorage.getItem("roomId") ||
        crypto.randomUUID();

    useEffect(() => {
        localStorage.setItem("roomId", roomId);
    }, []);

    // -------------------------
    // Join Room
    // -------------------------

    useEffect(() => {
        if (!visitorName) return;

        socket.emit("join-room", {
            roomId,
            visitorName,
        });

        loadMessages();
    }, [visitorName]);

    // -------------------------
    // Load Messages
    // -------------------------

    const loadMessages = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/chat/${roomId}`
            );

            setMessages(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // -------------------------
    // Receive Message
    // -------------------------

    useEffect(() => {
        socket.on("receive-message", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off("receive-message");
        };
    }, []);

    // -------------------------
    // Typing
    // -------------------------

    useEffect(() => {
        socket.on("typing", () => {
            setTyping(true);
        });

        socket.on("stop-typing", () => {
            setTyping(false);
        });

        return () => {
            socket.off("typing");
            socket.off("stop-typing");
        };
    }, []);

    // -------------------------
    // Auto Scroll
    // -------------------------

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    // -------------------------
    // Save Visitor Name
    // -------------------------

    const startChat = () => {
        if (!visitorName.trim()) return;

        localStorage.setItem(
            "visitorName",
            visitorName
        );

        setShowNameBox(false);
    };

    // -------------------------
    // Send Message
    // -------------------------

    const sendMessage = () => {
        if (!message.trim()) return;

        socket.emit("send-message", {
            roomId,
            sender: "visitor",
            message,
        });

        socket.emit("stop-typing", {
            roomId,
        });

        setMessage("");
    };

    const handleTyping = (e) => {
        setMessage(e.target.value);

        socket.emit("typing", {
            roomId,
            sender: "visitor",
        });
    };

    return (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] h-[550px] bg-white rounded-3xl shadow-2xl border overflow-hidden flex flex-col">

            {/* =======================
            Header
      ======================= */}

            <div className="bg-blue-600 text-white p-5 flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
                        {visitorName.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg">
                            {visitorName || "Guest"}
                        </h2>

                        <p className="text-xs text-blue-100">
                            🟢 Online
                        </p>
                    </div>

                </div>

                <button
                    onClick={close}
                    className="text-2xl hover:rotate-90 duration-300"
                >
                    ×
                </button>

            </div>

            {/* =======================
            Name Screen
      ======================= */}

            {showNameBox ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6">

                    <h3 className="text-xl font-semibold mb-2">
                        Welcome 👋
                    </h3>

                    <p className="text-gray-500 text-center mb-6">
                        Enter your name to start chatting.
                    </p>

                    <input
                        type="text"
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />

                    <button
                        onClick={startChat}
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold duration-300"
                    >
                        Start Chat
                    </button>

                </div>
            ) : (
                <>
                    {/* =======================
                Messages
          ======================= */}

                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">

                        {messages.length === 0 && (
                            <div className="text-center text-gray-400 mt-10">
                                Start the conversation 👋
                            </div>
                        )}

                        {messages.map((item) => (
                            <div
                                key={item._id}
                                className={`flex mb-3 ${item.sender === "visitor"
                                    ? "justify-end"
                                    : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${item.sender === "visitor"
                                        ? "bg-blue-600 text-white"
                                        : "bg-white border"
                                        }`}
                                >
                                    <p>{item.message}</p>

                                    <span className="text-[10px] opacity-70 block mt-1">
                                        {new Date(item.createdAt).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {typing && (
                            <div className="text-xs text-gray-500 italic">
                                Admin is typing...
                            </div>
                        )}

                        <div ref={bottomRef}></div>

                    </div>

                    {/* =======================
                Input
          ======================= */}

                    <div className="border-t bg-white p-3 flex gap-2">

                        <input
                            type="text"
                            value={message}
                            onChange={handleTyping}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                            placeholder="Type your message..."
                            className="flex-1 border rounded-xl px-4 py-3 outline-none"
                        />

                        <button
                            onClick={sendMessage}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl duration-300"
                        >
                            Send
                        </button>

                    </div>
                </>
            )}
        </div>

    );
};

export default ChatPopup;


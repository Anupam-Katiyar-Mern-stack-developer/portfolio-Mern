import { useEffect, useState, useRef } from "react";
import socket from "../../socket/socket";
import API from "../../api/axios";

const getInitials = (name = "") =>
    name
        .trim()
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0]?.toUpperCase())
        .join("") || "V";

// deterministic soft color for avatar background, based on name
const avatarPalette = [
    "bg-blue-100 text-blue-700",
    "bg-indigo-100 text-indigo-700",
    "bg-sky-100 text-sky-700",
    "bg-cyan-100 text-cyan-700",
    "bg-violet-100 text-violet-700",
];
const avatarColor = (name = "") => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return avatarPalette[Math.abs(hash) % avatarPalette.length];
};

const Chat = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [typing, setTyping] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    const getRooms = async () => {
        try {
            const res = await API.get("/chat/rooms");

            setRooms(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        socket.on("room-updated", () => {

            getRooms();

        });

        return () => {

            socket.off("room-updated");

        };

    }, []);

    const getMessages = async (roomId) => {
        try {
            const res = await API.get(`/chat/${roomId}`);

            setMessages(res.data);

        } catch (err) {
            console.log(err);
        }
    };

    const openRoom = (room) => {
        setSelectedRoom(room);
        getMessages(room.roomId);
        socket.emit("join-room", {
            roomId: room.roomId
        });
        socket.emit("seen", {

            roomId: room.roomId

        });
    }

    useEffect(() => {
        socket.on("receive-message", (msg) => {
            if (selectedRoom?.roomId === msg.roomId) {
                setMessages(prev => [...prev, msg]);
            }
            getRooms();
        });
        return () => {
            socket.off("receive-message");
        }
    }, [selectedRoom]);

    useEffect(() => {
        socket.on("message-seen", () => {
            if (selectedRoom) {
                getMessages(selectedRoom.roomId);
            }
        });

        return () => {
            socket.off("message-seen");
        };
    }, [selectedRoom]);

    useEffect(() => {
        getRooms();

        socket.on("room-updated", getRooms);

        return () => {
            socket.off("room-updated", getRooms);
        };
    }, []);

    // typing...

    useEffect(() => {

        socket.on("typing", (sender) => {

            if (sender === "visitor") {

                setTyping(true);

            }

        });

        socket.on("stop-typing", () => {

            setTyping(false);

        });

        return () => {

            socket.off("typing");
            socket.off("stop-typing");

        };

    }, []);

    // send message

    const sendMessage = () => {
        if (!message.trim()) return;

        socket.emit("send-message", {
            roomId: selectedRoom.roomId,
            sender: "admin",
            message,
        });

        socket.emit("stop-typing", {
            roomId: selectedRoom.roomId,
        });

        setTyping(false);
        setMessage("");
    };

    return (
        <div className="flex h-[calc(100vh-80px)] bg-gray-100 rounded-xl overflow-hidden shadow-lg border border-gray-200">

            {/* ===========================
            LEFT SIDEBAR
    ============================ */}

            <div className="w-[330px] bg-white border-r border-gray-100 flex flex-col">

                <div className="px-5 py-5 border-b border-gray-100">

                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                        Live Chat
                    </h2>

                    <p className="text-gray-400 text-sm mt-0.5">
                        {rooms.length > 0 ? `${rooms.length} visitor${rooms.length > 1 ? "s" : ""}` : "Visitors"}
                    </p>

                </div>

                <div className="flex-1 overflow-y-auto">

                    {rooms.length === 0 && (

                        <div className="flex flex-col items-center justify-center mt-16 px-6 text-center">

                            <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                                <span className="text-2xl">💬</span>
                            </div>

                            <p className="text-gray-400 text-sm">
                                No visitors yet
                            </p>

                        </div>

                    )}

                    {rooms.map((room) => (

                        <div
                            key={room._id}
                            onClick={() => openRoom(room)}
                            className={`cursor-pointer px-5 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors duration-150

            ${selectedRoom?.roomId === room.roomId
                                    ? "bg-blue-50/70 border-l-2 border-l-blue-600"
                                    : "border-l-2 border-l-transparent"
                                }

            `}
                        >

                            <div className="flex items-center gap-3">

                                <div className="relative shrink-0">

                                    <div className={`w-11 h-11 rounded-full flex items-center justify-center font-semibold text-sm ${avatarColor(room.visitorName)}`}>
                                        {getInitials(room.visitorName)}
                                    </div>

                                    <span
                                        className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white

                  ${room.online
                                                ? "bg-green-500"
                                                : "bg-gray-300"
                                            }

                  `}
                                    />

                                </div>

                                <div className="flex-1 min-w-0">

                                    <div className="flex items-center justify-between gap-2">

                                        <h3 className="font-semibold text-gray-900 text-sm truncate">

                                            {room.visitorName}

                                        </h3>

                                        {room.unread > 0 && (

                                            <span className="bg-blue-600 text-white rounded-full text-[11px] font-medium min-w-[18px] h-[18px] px-1.5 flex items-center justify-center shrink-0">

                                                {room.unread}

                                            </span>

                                        )}

                                    </div>

                                    <p className="text-sm text-gray-500 truncate mt-0.5">

                                        {room.lastMessage || "Start conversation"}

                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>



            {/* ===========================
            CHAT WINDOW
    ============================ */}

            <div className="flex-1 flex flex-col bg-white">

                {!selectedRoom ? (

                    <div className="flex-1 flex flex-col items-center justify-center text-gray-300">

                        <span className="text-5xl mb-3">💬</span>

                        <p className="text-gray-400 text-lg font-medium">

                            Select a visitor to start chatting

                        </p>

                    </div>

                ) : (

                    <>

                        {/* Header */}

                        <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-3">

                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${avatarColor(selectedRoom.visitorName)}`}>
                                {getInitials(selectedRoom.visitorName)}
                            </div>

                            <div>

                                <h2 className="font-bold text-gray-900 text-base">

                                    {selectedRoom.visitorName}

                                </h2>

                                <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">

                                    <span className={`w-1.5 h-1.5 rounded-full ${selectedRoom.online ? "bg-green-500" : "bg-gray-300"}`} />

                                    {selectedRoom.online ? "Online" : "Offline"}

                                </p>

                            </div>

                        </div>



                        {/* Messages */}

                        <div className="flex-1 overflow-y-auto px-6 py-5 bg-gray-50/60">

                            {messages.map((item) => (

                                <div
                                    key={item._id}
                                    className={`mb-3 flex

                ${item.sender === "admin"
                                            ? "justify-end"
                                            : "justify-start"
                                        }

                `}
                                >

                                    <div
                                        className={`max-w-[60%] rounded-2xl px-4 py-2.5 shadow-sm

                  ${item.sender === "admin"

                                                ? "bg-blue-600 text-white rounded-br-md"

                                                : "bg-white border border-gray-100 text-gray-800 rounded-bl-md"

                                            }

                  `}
                                    >

                                        <p className="text-sm leading-relaxed break-words">

                                            {item.message}

                                        </p>

                                        <span className={`text-[11px] mt-1 block text-right ${item.sender === "admin" ? "text-blue-100" : "text-gray-400"}`}>

                                            {new Date(item.createdAt).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}

                                        </span>

                                    </div>

                                </div>

                            ))}

                            {typing && (

                                <div className="flex justify-start mb-3">

                                    <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm flex items-center gap-1">

                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />

                                    </div>

                                </div>

                            )}

                            <div ref={bottomRef}></div>

                        </div>



                        {/* Input */}

                        <div className="border-t border-gray-100 p-4 flex gap-3 bg-white">

                            <input
                                value={message}
                                onChange={(e) => {

                                    setMessage(e.target.value);

                                    if (e.target.value.trim()) {

                                        socket.emit("typing", {
                                            roomId: selectedRoom.roomId,
                                            sender: "admin",
                                        });

                                    } else {

                                        socket.emit("stop-typing", {
                                            roomId: selectedRoom.roomId,
                                        });

                                    }

                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        sendMessage();
                                    }
                                }}
                                placeholder="Type message..."
                                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-150"
                            />

                            <button
                                onClick={sendMessage}
                                disabled={!message.trim()}
                                className="bg-blue-600 text-white px-6 rounded-xl hover:bg-blue-700 duration-300 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-sm"
                            >

                                Send

                            </button>

                        </div>

                    </>

                )}

            </div>

        </div>
    );
};

export default Chat;
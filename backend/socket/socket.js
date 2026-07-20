import Chat from "../models/Chat.js";
import ChatRoom from "../models/ChatRoom.js";

const onlineUsers = new Map();

const socketHandler = async (io) => {
  io.on("connection", (socket) => {
    console.log("connected :", socket.id);

    // join room

    socket.on("join-room", async ({ roomId, visitorName = "Guest" }) => {
      socket.join(roomId);

      onlineUsers.set(roomId, socket.id);

      let room = await ChatRoom.findOne({ roomId });

      if (!room) {
        room = await ChatRoom.create({
          roomId,
          visitorName,
        });
      }

      room.online = true;
      await room.save();

      io.emit("user-online", roomId);
      io.emit("room-updated");

    });

    socket.on("send-message", async (data) => {
      const { roomId, sender, message } = data;

      const chat = await Chat.create({
        roomId,
        sender,
        message,
      });

      await ChatRoom.findOneAndUpdate(
        { roomId },
        {
          lastMessage: message,
          lastMessageTime: new Date(),
          $inc: sender === "visitor" ? { unread: 1 } : {},
        },
      );

      io.to(roomId).emit("receive-message", chat);
      io.emit("room-updated");
    });

    // typing

    socket.on("typing", ({ roomId, sender }) => {
      socket.to(roomId).emit("typing", sender);
    });

    socket.on("stop-typing", ({ roomId }) => {
      socket.to(roomId).emit("stop-typing");
    });

    // seen

    socket.on("seen", async ({ roomId }) => {
      await Chat.updateMany(
        {
          roomId,
          sender: "visitor",
        },
        {
          seen: true,
          status: "seen",
        },
      );

      await ChatRoom.findOneAndUpdate(
        { roomId },
        {
          unread: 0,
        },
      );
      io.to(roomId).emit("message-seen");
    });

    // disconnect

    socket.on("disconnect", async () => {
      console.log("disconnected :", socket.id);

      for (const [roomId, id] of onlineUsers.entries()) {
        if (id === socket.id) {
          onlineUsers.delete(roomId);

          await ChatRoom.findOneAndUpdate(
            { roomId },
            {
              online: false,
            },
          );
          io.emit("user-offline", roomId);
          io.emit("room-updated");
          break;
        }
      }
    });
  });
};

export default socketHandler;

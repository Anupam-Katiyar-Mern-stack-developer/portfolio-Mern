import Chat from "../models/Chat.js";
import ChatRoom from "../models/ChatRoom.js";

export const getRooms = async (req, res) => {
  try {
    const rooms = await ChatRoom.find().sort({
      lastMessageTime: -1,
    });

    res.json(rooms);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;

    const messages = await Chat.find({
      roomId,
    }).sort({
      createdAt: 1,
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createRoom = async (req, res) => {
  try {
    const { roomId, visitorName } = req.body;

    let room = await ChatRoom.findOne({
      roomId,
    });

    if (!room) {
      room = await ChatRoom.create({
        roomId,
        visitorName,
      });
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const markSeen = async (req, res) => {
  try {
    const { roomId } = req.params;

    await Chat.updateMany(
      {
        roomId,
        sender: "visitor",
      },
      {
        seen: true,
        status: "seen",
      }
    );

    await ChatRoom.findOneAndUpdate(
      { roomId },
      {
        unread: 0,
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
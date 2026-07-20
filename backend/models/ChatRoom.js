import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
    },

    visitorName: {
      type: String,
      default: "Guest",
    },

    online: {
      type: Boolean,
      default: false,
    },

    unread: {
      type: Number,
      default: 0,
    },

    lastMessage: {
      type: String,
      default: "",
    },

    lastMessageTime: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ChatRoom", chatRoomSchema);
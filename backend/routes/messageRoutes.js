import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  sendMessage,
  getMessages,
  getMessage,
  markAsRead,
  deleteMessage,
  updateStatus,
  getUnreadCount,
} from "../controllers/messageController.js";

const router = express.Router();

// Portfolio
router.post("/", sendMessage);

// Admin
router.get("/", protect, getMessages);

router.get("/:id", protect, getMessage);

router.put("/:id/read", protect, markAsRead);
router.put("/:id", updateStatus);

router.delete("/:id", protect, deleteMessage);

router.get("/unread-count", getUnreadCount);

export default router;
import express from "express";

import {
  getRooms,
  getMessages,
  createRoom,
  markSeen,
} from "../controllers/chatController.js";

const router = express.Router();

router.get("/rooms", getRooms);

router.get("/:roomId", getMessages);

router.post("/room", createRoom);

router.put("/seen/:roomId", markSeen);

export default router;
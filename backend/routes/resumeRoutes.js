import express from "express";
import upload from "../middleware/upload.js";

import {
  getResume,
  createResume,
  deleteResume,
  downloadResume,
} from "../controllers/resumeController.js";

const router = express.Router();

router.get("/", getResume);

// Create + Update (Replace Resume)
router.post("/", upload.single("resume"), createResume);

router.delete("/", deleteResume);

router.get("/download", downloadResume);

router.post("/download", downloadResume);

export default router;
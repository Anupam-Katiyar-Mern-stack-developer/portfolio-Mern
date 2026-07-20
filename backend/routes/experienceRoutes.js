import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createExperience,
  getExperiences,
  getExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";

const router = express.Router();

router.get("/", getExperiences);

router.get("/:id", getExperience);

router.post("/", protect, createExperience);

router.put("/:id", protect, updateExperience);

router.delete("/:id", protect, deleteExperience);

export default router;
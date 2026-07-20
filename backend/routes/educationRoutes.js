import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createEducation,
  getEducations,
  getEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/educationController.js";

const router = express.Router();

router.get("/", getEducations);

router.get("/:id", getEducation);

router.post("/", protect, createEducation);

router.put("/:id", protect, updateEducation);

router.delete("/:id", protect, deleteEducation);

export default router;
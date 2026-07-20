import express from "express";
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProject);

router.post("/", protect, upload.single("image"), createProject);

router.put("/:id", protect, upload.single("image"), updateProject);

router.delete("/:id", protect, deleteProject);

export default router;

import express from "express";
import {
  createSkill,
  getSkills,
  getSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getSkills);

router.get("/:id", getSkill);

router.post("/",createSkill);

router.put("/update/:id", protect, updateSkill);

router.delete("/delete/:id", deleteSkill);

export default router;
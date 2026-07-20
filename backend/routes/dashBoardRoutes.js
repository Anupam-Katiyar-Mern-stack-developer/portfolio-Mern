import express from "express";
import { getDashboard,updateStatus } from "../controllers/dashBoardController.js";

const router = express.Router();

router.get("/", getDashboard);
router.put("/:id", updateStatus);

export default router;
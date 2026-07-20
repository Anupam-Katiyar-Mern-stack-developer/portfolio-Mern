import express from "express";
import { login, logout } from "../controllers/authController.js";
import protect from '../middleware/authMiddleware.js'

const router = express.Router();

router.post("/login", login);

router.post("/logout", logout);
router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    admin: req.admin,
  });
});

export default router;

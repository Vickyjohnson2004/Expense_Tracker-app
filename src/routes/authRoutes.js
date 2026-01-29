import express from "express";
import {
  registerUser,
  loginUser,
  verifyToken,
  logoutUser,
} from "../controllers/authController.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Verify token
router.get("/verify", verifyToken);

// Logout
router.post("/logout", logoutUser);

export default router;

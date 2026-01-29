import express from "express";
import {
  createTransaction,
  getTransactionsByUser,
  getUserBalance,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

// Create transaction
router.post("/", createTransaction);

// Get all transactions for a user
router.get("/user/:userId", getTransactionsByUser);

// Get user balance
router.get("/balance/:userId", getUserBalance);

// Get single transaction
router.get("/:id", getTransactionById);

// Update transaction
router.put("/:id", updateTransaction);

// Delete transaction
router.delete("/:id", deleteTransaction);

export default router;

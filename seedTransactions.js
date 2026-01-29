import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Transaction from "./src/models/transactionModel.js";

const MONGO_URI = process.env.MONGODB_URL;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing. Check your .env file");
  process.exit(1);
}

const seed = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");

    await mongoose.connect(MONGO_URI);

    console.log("✅ MongoDB connected");

    await Transaction.insertMany([
      {
        userId: "user_38nSCkR73NUCqkq2PBMsc65xu7D",
        title: "Salary",
        amount: 250000,
        type: "credit",
      },
      {
        userId: "user_38nSCkR73NUCqkq2PBMsc65xu7D",
        title: "Groceries",
        amount: 18000,
        type: "debit",
      },
    ]);

    console.log("✅ Transactions seeded successfully");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seed();

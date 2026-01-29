// Core / Third-party imports
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Config
dotenv.config();

// Custom imports
import connectDB from "./config/DataBase.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

// Initialize app
const app = express();

// CORS Configuration for production
const corsOptions = {
  origin: [
    "http://localhost:3000", // if you test with a web frontend
    "http://localhost:8081", // Expo web bundler
    "http://172.16.100.197:8081", // Expo Go on device
    "http://localhost:19000", // Expo dev tools
    "http://172.16.100.197:19000", // Expo dev tools on device
    "exp://localhost:19000", // Expo deep link
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(rateLimiter);

// Connect to database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

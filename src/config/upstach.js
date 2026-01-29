import { Redis } from "@upstash/redis";
import pkg from "@upstash/ratelimit"; // CommonJS import
const { Ratelimit } = pkg; // destructure correctly
import "dotenv/config";

// Create Redis client from env
const redis = Redis.fromEnv();

// Configure limiter
const limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "60s"), // 100 requests per 60s
  analytics: true,
  prefix: "expense-tracker",
});

export default limiter;

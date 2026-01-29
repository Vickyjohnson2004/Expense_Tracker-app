import limiter from "../config/upstach.js";

const rateLimiter = async (req, res, next) => {
  try {
    const result = await limiter.limit(req.ip);
    if (!result.success) {
      return res.status(429).json({ error: "Too many requests" });
    }
    next();
  } catch (error) {
    next(error);
    console.error("Rate Limiter Error:", error);
  }
};
export default rateLimiter;

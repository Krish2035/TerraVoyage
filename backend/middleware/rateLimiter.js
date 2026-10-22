import rateLimit from 'express-rate-limit';
import { config } from '../config/index.js';

// Rate Limiting Middleware (Pillar 1)
export const apiRateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    error: 'Too Many Requests',
    message: 'Rate limit quota exceeded. Please retry after some time.',
    retryAfterMinutes: Math.ceil(config.rateLimit.windowMs / 60000),
  },
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  }
});

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from './config/index.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';
import { tracingMiddleware } from './middleware/tracing.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import apiRouter from './routes/index.js';

export const app = express();

// Trust reverse proxies (ALB, Nginx, Cloudflare) (Pillars 3, 4)
app.set('trust proxy', 1);

// Security Headers via Helmet (Pillars 74, 77)
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// Cross-Origin Resource Sharing (Pillar 76)
app.use(cors({
  origin: config.corsOrigin === '*' ? true : config.corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id', 'Cache-Control']
}));

// Gzip / Brotli Compression (Pillar 4)
app.use(compression());

// Body Parsers with payload size limits to prevent memory exhaustion (Pillars 41, 75)
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Tracing, Request ID and Latency Measurement (Pillars 60, 91-94)
app.use(tracingMiddleware);

// Rate Limiting (Pillar 1)
app.use('/api', apiRateLimiter);

// Root informational welcome route
app.get('/', (req, res) => {
  res.json({
    name: 'Tourism & Global Explorer API',
    version: '1.0.0',
    documentation: '/api/v1',
    endpoints: {
      countries: '/api/v1/countries',
      attractions: '/api/v1/attractions/:id',
      health: '/api/v1/health'
    },
    standards: 'Built following 112 Production Engineering Architecture Parameters'
  });
});

// Mount API routes
app.use('/api/v1', apiRouter);
// Convenience alias for /api/countries and /api/health
app.use('/api', apiRouter);

// 404 & Centralized Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

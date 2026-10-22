import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  
  // PostgreSQL Database Configuration (Pillars 25, 28, 81)
  db: {
    connectionString: process.env.DATABASE_URL || '',
    host: process.env.PGHOST || '127.0.0.1',
    port: parseInt(process.env.PGPORT || '5432', 10),
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'tourism_db',
    max: parseInt(process.env.PGMAX || '10', 10), // Max connections in pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 3000, // Fail fast timeout (Pillar 11)
  },

  // Cache Configuration (Pillars 2, 50)
  cacheTTLMs: 60 * 1000, // 60 seconds L1 in-memory cache

  // Rate Limiter Configuration (Pillar 1)
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Max requests per window
    standardHeaders: true,
    legacyHeaders: false,
  }
};

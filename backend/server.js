import http from 'http';
import { app } from './app.js';
import { config } from './config/index.js';
import { initDb } from './model/db.js';

const server = http.createServer(app);

async function startServer() {
  console.log('='.repeat(60));
  console.log('🚀 Initializing Tourism & World Explorer Platform');
  console.log(`📐 Architecture Pillars: Active (112 Production Parameters)`);
  console.log('='.repeat(60));

  // Initialize Database with circuit breaker & schema migration
  await initDb();

  server.listen(config.port, () => {
    console.log(`[Server] Live on http://localhost:${config.port}`);
    console.log(`[Server] API v1: http://localhost:${config.port}/api/v1/countries`);
    console.log(`[Server] Health Check: http://localhost:${config.port}/api/v1/health`);
  });
}

// Graceful Shutdown handling (Pillars 85, 109)
function handleShutdown(signal) {
  console.log(`[Server] Received ${signal}. Commencing graceful drain...`);
  server.close(() => {
    console.log('[Server] Closed remaining connections. Exiting process cleanly.');
    process.exit(0);
  });

  // Force shutdown after 10s if stuck
  setTimeout(() => {
    console.error('[Server] Could not close connections in time, forcefully shutting down.');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

startServer().catch(err => {
  console.error('[Server] Fatal startup exception:', err);
  process.exit(1);
});

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

  // Bind server immediately to 0.0.0.0 so Render detects open port instantly (Pillars 85, 10)
  server.listen(config.port, '0.0.0.0', () => {
    console.log(`[Server] Live on http://0.0.0.0:${config.port}`);
    console.log(`[Server] API v1: http://0.0.0.0:${config.port}/api/v1/countries`);
    console.log(`[Server] Health Check: http://0.0.0.0:${config.port}/api/v1/health`);
  });

  // Initialize Database in background without blocking port listener
  initDb().catch(err => {
    console.error('[Database Init Warning]:', err.message);
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

import os from 'os';
import { getDbStatus } from '../model/db.js';
import { cacheService } from '../services/cache.service.js';

export const HealthController = {
  // GET /api/health (Pillars 56, 57, 61)
  getHealth(req, res) {
    const memory = process.memoryUsage();
    const dbStatus = getDbStatus();
    const cacheStats = cacheService.getStats();

    const health = {
      status: 'UP',
      service: 'tourism-backend-api',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      system: {
        platform: os.platform(),
        arch: os.arch(),
        nodeVersion: process.version,
        cpuCount: os.cpus().length,
        freeMemoryMb: Math.round(os.freemem() / (1024 * 1024)),
      },
      processMemory: {
        rssMb: Math.round(memory.rss / (1024 * 1024)),
        heapTotalMb: Math.round(memory.heapTotal / (1024 * 1024)),
        heapUsedMb: Math.round(memory.heapUsed / (1024 * 1024)),
      },
      database: dbStatus,
      cache: cacheStats,
      architectureStandards: {
        totalTargetParameters: 112,
        activePillars: [
          'Rate Limiting (Pillar 1)',
          'Tiered L1/L2 Caching (Pillar 2, 50)',
          'Gzip/Brotli Compression (Pillar 4)',
          'Circuit Breakers & Graceful Fallback (Pillar 10)',
          'Query & Socket Timeouts (Pillar 11)',
          'Connection Pooling (Pillar 28)',
          'Composite Indexing (Pillar 25)',
          'Health Probes & Liveness (Pillar 56, 57)',
          'Structured Logging (Pillar 59)',
          'Security Headers via Helmet (Pillar 74)',
          'CORS Isolation (Pillar 76)',
          'SQL Injection Prevention (Pillar 78)',
          'P99 Response Time Tracking (Pillar 91-94)',
          'Semantic API Versioning (Pillar 102)'
        ]
      }
    };

    return res.status(200).json(health);
  }
};

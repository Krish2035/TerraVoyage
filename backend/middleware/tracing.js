import crypto from 'crypto';

// Request Tracing & Latency Middleware (Pillars 60, 91-94)
export function tracingMiddleware(req, res, next) {
  // Generate unique trace ID
  const requestId = req.headers['x-request-id'] || crypto.randomUUID();
  req.id = requestId;
  res.setHeader('X-Request-Id', requestId);

  // Response Time Tracker
  const start = process.hrtime();

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const responseTimeMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
    
    // Set response header before completion if writable
    if (!res.headersSent) {
      res.setHeader('X-Response-Time', `${responseTimeMs}ms`);
    }

    // Structured JSON Logging (Pillar 59)
    const logEntry = {
      timestamp: new Date().toISOString(),
      requestId,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      durationMs: parseFloat(responseTimeMs),
      userAgent: req.get('user-agent') || 'unknown',
      ip: req.ip || req.connection.remoteAddress
    };

    if (process.env.NODE_ENV !== 'test') {
      console.log(`[HTTP] ${logEntry.method} ${logEntry.url} ${logEntry.status} - ${logEntry.durationMs}ms (req_id=${logEntry.requestId})`);
    }
  });

  next();
}

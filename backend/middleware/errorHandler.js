// Centralized Error Handling Middleware (Pillar 59)
export function errorHandler(err, req, res, next) {
  const statusCode = err.status || err.statusCode || 500;
  
  const errorResponse = {
    success: false,
    requestId: req.id || 'unknown',
    error: err.name || 'InternalServerError',
    message: err.message || 'An unexpected error occurred processing your request',
    timestamp: new Date().toISOString()
  };

  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  console.error(`[Error] [${req.id || 'no-id'}] ${statusCode} - ${err.message}`);
  if (statusCode === 500 && err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json(errorResponse);
}

// 404 Route Not Found Handler
export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    requestId: req.id || 'unknown',
    error: 'NotFound',
    message: `Resource not found at endpoint: ${req.method} ${req.originalUrl}`,
  });
}

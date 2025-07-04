const winston = require('winston');
const { format } = require('logform');
const { combine, timestamp, printf } = format;

// Create logger
const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    printf(({ level, message, timestamp, ...meta }) => {
      return `${timestamp} [${level.toUpperCase()}] ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Request logger middleware
const requestLogger = (req, res, next) => {
  // Add request ID
  req.id = crypto.randomBytes(16).toString('hex');
  
  // Log request details
  logger.info('Request received', {
    id: req.id,
    method: req.method,
    path: req.path,
    ip: req.ip,
    user: req.user ? req.user.id : 'anonymous'
  });

  // Log request body for POST/PUT requests
  if (req.method === 'POST' || req.method === 'PUT') {
    logger.debug('Request body', {
      id: req.id,
      body: req.body
    });
  }

  // Add start time for response time calculation
  req.startTime = Date.now();

  // Log response
  const originalEnd = res.end;
  res.end = function(chunk, encoding) {
    const responseTime = Date.now() - req.startTime;
    logger.info('Response sent', {
      id: req.id,
      status: res.statusCode,
      responseTime
    });
    
    // Restore original end method
    res.end = originalEnd;
    res.end(chunk, encoding);
  };

  next();
};

// Error logger middleware
const errorLogger = (err, req, res, next) => {
  logger.error('Error occurred', {
    id: req.id,
    error: {
      message: err.message,
      stack: err.stack,
      code: err.code,
      status: err.status
    },
    method: req.method,
    path: req.path,
    ip: req.ip,
    user: req.user ? req.user.id : 'anonymous'
  });

  next(err);
};

module.exports = {
  requestLogger,
  errorLogger
};

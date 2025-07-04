const winston = require('winston');
const { format } = require('winston');

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: 'error.log', 
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    new winston.transports.File({ 
      filename: 'combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
}

const errorHandler = (err, req, res, next) => {
  // Categorize error type
  const errorType = categorizeError(err);
  const errorRateLimit = new Map();
  
  // Rate limiting for errors
  const shouldRateLimitError = (error) => {
    const errorKey = `${error.name}-${error.message}`;
    const currentTime = Date.now();
    const limit = 5; // max 5 errors of same type per minute
    const windowMs = 60 * 1000; // 1 minute
    
    if (!errorRateLimit.has(errorKey)) {
      errorRateLimit.set(errorKey, { count: 1, lastError: currentTime });
      return false;
    }
    
    const errorData = errorRateLimit.get(errorKey);
    if (currentTime - errorData.lastError > windowMs) {
      errorRateLimit.set(errorKey, { count: 1, lastError: currentTime });
      return false;
    }
    
    errorData.count++;
    errorRateLimit.set(errorKey, errorData);
    return errorData.count > limit;
  };

  // Get structured error response
  const getErrorResponse = (error) => {
    const baseResponse = {
      success: false,
      timestamp: new Date().toISOString(),
      requestId: req.id || 'unknown',
      errorType: errorType,
      code: getErrorCode(error),
      message: getErrorMessage(error)
    };

    // Add additional details for specific error types
    if (error.name === 'ValidationError') {
      return {
        ...baseResponse,
        details: {
          validationErrors: Object.values(error.errors).map(e => e.message)
        }
      };
    }

    return baseResponse;
  };

  // Get error status code
  const getErrorStatus = (error) => {
    switch (errorType) {
      case 'validation': return 400;
      case 'authentication': return 401;
      case 'authorization': return 403;
      case 'not_found': return 404;
      case 'rate_limit': return 429;
      default: return 500;
    }
  };

  // Categorize error
  const categorizeError = (error) => {
    if (error.name === 'ValidationError') return 'validation';
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') return 'authentication';
    if (error.name === 'UnauthorizedError') return 'authorization';
    if (error.name === 'NotFoundError') return 'not_found';
    return 'unknown';
  };

  // Get error code
  const getErrorCode = (error) => {
    const baseCode = error.name.toUpperCase();
    if (error.code) return error.code;
    return baseCode;
  };

  // Get error message
  const getErrorMessage = (error) => {
    if (error.message) return error.message;
    return 'An unexpected error occurred';
  };

  // Log error with structured format
  logger.error('Error:', {
    ...getErrorResponse(err),
    context: {
      method: req.method,
      path: req.path,
      user: req.user?.email,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    }
  });

  // Handle rate limiting for errors
  if (shouldRateLimitError(err)) {
    return res.status(429).json({
      success: false,
      message: 'Too many errors, please try again later',
      code: 'RATE_LIMIT_EXCEEDED'
    });
  }

  // Handle specific errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      ...getErrorResponse(err),
      details: {
        validationErrors: Object.values(err.errors).map(e => e.message)
      }
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      ...getErrorResponse(err),
      message: 'Invalid token',
      code: 'INVALID_TOKEN'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      ...getErrorResponse(err),
      message: 'Token expired',
      code: 'TOKEN_EXPIRED'
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      ...getErrorResponse(err),
      message: 'Invalid ID',
      code: 'INVALID_ID',
      details: { id: err.value }
    });
  }

  if (err.code === 11000) { // MongoDB duplicate key error
    return res.status(400).json({
      ...getErrorResponse(err),
      message: 'Duplicate entry',
      code: 'DUPLICATE_ENTRY',
      details: { field: err.keyPattern }
    });
  }

  if (err.name === 'MongoError') {
    return res.status(500).json({
      success: false,
      message: 'Database error',
      code: 'DATABASE_ERROR'
    });
  }

  // Handle custom application errors
  if (err.code) {
    return res.status(err.status || 400).json({
      success: false,
      message: err.message,
      code: err.code,
      details: err.details
    });
  }

  // Default error handler
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    code: 'INTERNAL_ERROR'
  });
};

module.exports = {
  errorHandler,
  categorizeError,
  getErrorCode,
  getErrorMessage
};

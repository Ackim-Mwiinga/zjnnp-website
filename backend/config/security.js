const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const csrf = require('csurf');
const { apiLimiter, uploadLimiter } = require('../middleware/rateLimiter');
const { createClient } = require('redis');
const { promisify } = require('util');

// Initialize Redis client for rate limiting
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});
await redisClient.connect();
const redisGetAsync = promisify(redisClient.get).bind(redisClient);

// Security configuration
const securityConfig = {
  helmet: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://*.cloudflare.com"],
        fontSrc: ["'self'", "https:", "data:"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'", "data:", "https:"],
        frameSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: true,
        blockAllMixedContent: true
      }
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: true,
    dnsPrefetchControl: true,
    expectCt: {
      maxAge: 86400,
      enforce: true,
      reportUri: process.env.REPORT_URI
    },
    frameguard: { action: 'deny' },
    hidePoweredBy: true,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    },
    ieNoOpen: true,
    noCache: true,
    noSniff: true,
    referrerPolicy: 'strict-origin-when-cross-origin',
    xssFilter: true
  },

  csrf: {
    value: function(req) {
      return req.cookies.csrfToken;
    },
    cookie: {
      key: 'csrfToken',
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    }
  },

  rateLimit: {
    api: {
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: 'Too many requests from this IP, please try again later.',
      standardHeaders: true,
      legacyHeaders: false
    },
    upload: {
      windowMs: 1 * 60 * 1000,
      max: 5,
      message: 'Too many file uploads from this IP, please try again later.',
      standardHeaders: true,
      legacyHeaders: false
    },
    login: {
      windowMs: 15 * 60 * 1000,
      max: 5,
      message: 'Too many failed login attempts from this IP, please try again later.',
      standardHeaders: true,
      legacyHeaders: false
    }
  }
};

module.exports = securityConfig;,
    ieNoOpen: true,
    noCache: true,
    noSniff: true,
    originAgentCluster: true,
    referrerPolicy: 'strict-origin-when-cross-origin',
    xssFilter: true
  },

  // Rate limiting configuration
  rateLimit: {
    // API rate limiting
    api: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each user to 100 requests per windowMs
      message: {
        success: false,
        message: 'Too many requests from this user. Please try again later.',
        code: 'RATE_LIMIT_EXCEEDED'
      },
      standardHeaders: true,
      legacyHeaders: false,
      skip: (req) => {
        // Skip rate limiting for API keys
        return req.headers['x-api-key'];
      },
      handler: async (req, res, next) => {
        const user = req.user;
        if (user && user.role === 'admin') {
          // Admins have higher rate limits
          return next();
        }
        next();
      }
    },
    
    // Upload rate limiting
    upload: {
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 50, // limit each user to 50 uploads per hour
      message: {
        success: false,
        message: 'Too many file upload attempts. Please try again later.',
        code: 'RATE_LIMIT_EXCEEDED'
      },
      standardHeaders: true,
      legacyHeaders: false,
      skip: (req) => {
        // Skip rate limiting for certain paths
        return req.path.startsWith('/api/auth') || req.path.startsWith('/api/docs');
      }
    }
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    expiresIn: '15m',
    refreshExpiresIn: '7d',
    blacklistedTokens: []
  },

  // File upload security
  fileUpload: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    antivirus: {
      enabled: true,
      provider: 'clamav',
      timeout: 30000
    }
  },

  // Database security
  database: {
    connectionPool: {
      min: 2,
      max: 10,
      idleTimeoutMillis: 30000,
      acquireTimeoutMillis: 30000
    },
    queryTimeout: 30000,
    maxRetries: 3,
    retryDelay: 1000
  },

  // Logging configuration
  logging: {
    level: 'info',
    format: 'combined',
    file: {
      maxSize: 10485760, // 10MB
      maxFiles: 10,
      compress: true
    },
    errorTracking: {
      enabled: true,
      provider: 'sentry',
      dsn: process.env.SENTRY_DSN
    }
  },

  // Monitoring
  monitoring: {
    metrics: {
      enabled: true,
      provider: 'prometheus',
      port: 9090
    },
    healthCheck: {
      enabled: true,
      interval: 60000,
      endpoints: ['/', '/api/health']
    }
  }
};

module.exports = securityConfig;

import jwt from "jsonwebtoken";
import { isTokenBlacklisted } from '../utils/blacklist.js';
import { verifyToken } from '../utils/jwt.js';

const rateLimit = require('express-rate-limit');

// Rate limiting for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per windowMs
  message: 'Too many login attempts from this IP, please try again later.'
});

export const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "No token, access denied",
      error: 'No authentication token provided'
    });
  }

  if (isTokenBlacklisted(token)) {
    return res.status(401).json({ 
      success: false,
      message: 'Not authorized, token blacklisted',
      error: 'Token has been revoked'
    });
  }

  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ 
      success: false,
      message: "Invalid token",
      error: 'Invalid authentication token'
    });
  }

  if (decoded.expired) {
    return res.status(401).json({ 
      success: false,
      message: "Token expired",
      error: 'Authentication token has expired'
    });
  }

  req.user = decoded;
  next();
};

export const authenticateWithRefresh = (req, res, next) => {
  const refreshToken = req.body.refreshToken || req.query.refreshToken;
  
  if (!refreshToken) {
    return res.status(401).json({ 
      success: false,
      message: "No refresh token provided",
      error: 'Refresh token is required'
    });
  }

  const decoded = verifyRefreshToken(refreshToken);
  
  if (!decoded) {
    return res.status(401).json({ 
      success: false,
      message: "Invalid refresh token",
      error: 'Invalid refresh token'
    });
  }

  if (decoded.expired) {
    return res.status(401).json({ 
      success: false,
      message: "Refresh token expired",
      error: 'Refresh token has expired'
    });
  }

  req.user = decoded;
  next();
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
        error: 'User does not have required role'
      });
    }
    next();
  };
};

export const loginRateLimiter = loginLimiter;

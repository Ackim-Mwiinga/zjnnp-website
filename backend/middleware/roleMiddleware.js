const { 
  ROLES, 
  ROLE_HIERARCHY, 
  PERMISSIONS, 
  USER_ROLES, 
  ROLE_INHERITANCE, 
  hasRole, 
  hasPermission 
} = require('../constants/roles');

/**
 * Middleware to authorize a user based on their role
 * @param {string} requiredRole - The minimum role required to access the route
 * @returns {Function} Express middleware function
 */
const authorize = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      // Check if user has the required role or higher
      if (!hasRole(user, requiredRole)) {
        return res.status(403).json({
          success: false,
          message: 'Insufficient permissions. Required role: ' + requiredRole
        });
      }

      next();
    } catch (error) {
      console.error('Authorization error:', error);
      next(error);
    }
  };
};

/**
 * Middleware to check if user has specific permission
 * @param {string} permission - The permission to check
 * @returns {Function} Express middleware function
 */
const checkPermission = (permission) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      if (!hasPermission(req.user, permission)) {
        return res.status(403).json({
          success: false,
          message: `Insufficient permissions. Required permission: ${permission}`
        });
      }

      next();
    } catch (error) {
      console.error('Permission check error:', error);
      next(error);
    }
  };
};

module.exports = {
  ROLES,
  USER_ROLES,
  authorize,
  checkPermission,
  hasRole,
  hasPermission
};

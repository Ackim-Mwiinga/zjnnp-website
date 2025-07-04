const mongoose = require('mongoose');
const UserActivity = require('../models/UserActivity');

const logActivity = async (req, res, next) => {
  try {
    if (req.user) {
      const activity = new UserActivity({
        user: req.user._id,
        action: req.method,
        route: req.path,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      });

      await activity.save();
    }
    next();
  } catch (error) {
    console.error('Error logging activity:', error);
    next();
  }
};

module.exports = {
  logActivity
};

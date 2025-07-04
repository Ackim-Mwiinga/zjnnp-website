const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');
const analyticsService = require('../services/analyticsService');

// Protect all routes
router.use(protect);

// Role-based access
router.use(roleCheck(['editor', 'admin']));

// Dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    const stats = await analyticsService.getDashboardStats();
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Article status statistics
router.get('/article-stats', async (req, res) => {
  try {
    const stats = await analyticsService.getArticleStats();
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User activity
router.get('/activity', async (req, res) => {
  try {
    const activity = await analyticsService.getUserActivity(req.user._id);
    res.json({ activity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

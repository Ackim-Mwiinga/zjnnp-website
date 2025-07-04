const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const notificationService = require('../services/notificationService');

// Protect all routes
router.use(protect);

// Get notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await notificationService.getNotifications(req.user._id);
    res.json({ notifications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark notification as read
router.put('/:id/read', async (req, res) => {
  try {
    const notification = await notificationService.markAsRead(req.params.id, req.user._id);
    res.json({ notification });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

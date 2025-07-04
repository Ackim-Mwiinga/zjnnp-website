const express = require('express');
const router = express.Router();
const waitlistController = require('../controllers/waitlistController');
const verifyJWT = require('../middleware/verifyJWT');

// Add to waitlist (public)
router.post('/', waitlistController.addWaitlistEntry);

// Get all waitlist entries (chief editor dashboard, protected)
router.get('/', verifyJWT, waitlistController.getAllWaitlistEntries);

module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { loginLimiter, registerLimiter } = require('../middleware/rateLimiter');

// Public routes
router.post('/register', registerLimiter, authController.register);
router.post('/login', loginLimiter, authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

// Protected routes
router.use(protect);
router.post('/logout', authController.logout);
router.get('/profile', authController.getProfileStatus);
router.post('/complete-profile', authController.completeProfile); // New endpoint for profile completion
router.put('/author-profile', authController.updateAuthorProfile);

module.exports = router;

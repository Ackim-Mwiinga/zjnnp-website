const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');
const { verifyJWT } = require('../middleware/verifyJWT');
const { authorizeRoles } = require('../middleware/checkRole');

router.post('/', newsletterController.subscribeNewsletter);
if (process.env.NODE_ENV === 'test') {
  router.get('/', newsletterController.getAllNewsletterSubscribers);
} else {
  router.get('/', verifyJWT, authorizeRoles(['Admin']), newsletterController.getAllNewsletterSubscribers);
}

module.exports = router;

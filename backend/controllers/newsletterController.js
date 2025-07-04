const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const errorHandler = require('../utils/errorHandler');
const checkRole = require('../middleware/checkRole');

// Subscribe to newsletter
exports.subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if email already exists
    const existingSubscriber = await NewsletterSubscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    // Create new subscriber
    const newSubscriber = new NewsletterSubscriber({ email });
    await newSubscriber.save();

    res.status(201).json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Get all newsletter subscribers (Admin only)
exports.getAllNewsletterSubscribers = async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.roles.includes('Admin')) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Get all subscribers
    const subscribers = await NewsletterSubscriber.find();

    res.status(200).json(subscribers);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const WaitlistEntry = require('../models/WaitlistEntry');

// Add a new waitlist entry
exports.addWaitlistEntry = async (req, res) => {
  try {
    const { name, email, institution, motivation } = req.body;
    const entry = new WaitlistEntry({ name, email, institution, motivation });
    await entry.save();
    res.status(201).json({ message: 'Waitlist entry submitted', entry });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit waitlist entry', error: error.message });
  }
};

// Get all waitlist entries (for chief editor dashboard)
exports.getAllWaitlistEntries = async (req, res) => {
  try {
    const entries = await WaitlistEntry.find();
    res.status(200).json({ entries });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch waitlist entries', error: error.message });
  }
};

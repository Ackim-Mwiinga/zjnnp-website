const mongoose = require('mongoose');

const WaitlistEntrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  institution: { type: String },
  motivation: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WaitlistEntry', WaitlistEntrySchema);

const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  files: { type: String }, // Path to uploaded image
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Case', CaseSchema);

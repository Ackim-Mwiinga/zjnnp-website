const mongoose = require('mongoose');

const ReviewerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  affiliation: String,
  expertise: String,
}, { timestamps: true });

module.exports = mongoose.model('Reviewer', ReviewerSchema);

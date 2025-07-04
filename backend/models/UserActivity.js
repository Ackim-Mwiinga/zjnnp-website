const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    required: true
  },
  route: {
    type: String,
    required: true
  },
  ipAddress: String,
  userAgent: String,
  metadata: {
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
    submissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

activitySchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('UserActivity', activitySchema);

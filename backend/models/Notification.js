const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: [
      'article-submitted',
      'article-reviewed',
      'article-approved',
      'article-rejected',
      'article-published',
      'review-assigned',
      'review-reminder',
      'profile-completed',
      'role-changed'
    ],
    required: true
  },
  message: String,
  data: {
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
    oldRole: String,
    newRole: String
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

notificationSchema.index({ recipient: 1, type: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);

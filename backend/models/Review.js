const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  submission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission',
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: {
    type: String,
    required: true
  },
  detailedComments: {
    methodology: String,
    results: String,
    discussion: String,
    writingQuality: String,
    ethicalConcerns: String
  },
  recommendation: {
    type: String,
    enum: ['accept', 'minor-revision', 'major-revision', 'reject'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'overdue', 'withdrawn'],
    default: 'pending'
  },
  rating: {
    methodology: { type: Number, min: 1, max: 5 },
    results: { type: Number, min: 1, max: 5 },
    discussion: { type: Number, min: 1, max: 5 },
    writingQuality: { type: Number, min: 1, max: 5 },
    overall: { type: Number, min: 1, max: 5 }
  },
  dueDate: Date,
  completedAt: Date,
  revisionRequired: Boolean,
  revisionComments: String,
  reviewerNotes: String,
  attachments: [{
    filename: String,
    path: String,
    mimetype: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);

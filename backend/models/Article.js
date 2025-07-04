const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [{
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fullName: String,
    affiliation: String
  }],
  manuscriptDetails: {
    abstract: { type: String, required: true },
    keywords: [String],
    references: [String],
    wordCount: Number,
    pageCount: Number
  },
  status: {
    type: String,
    enum: ['submitted', 'assigned', 'under_review', 'needs_revision', 'approved', 'rejected', 'published'],
    default: 'submitted'
  },
  reviewHistory: [{
    reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: String,
    rating: Number,
    reviewedAt: { type: Date, default: Date.now }
  }],
  submittedAt: { type: Date, default: Date.now },
  publishedDate: Date,
  rejectionReason: String,
  revisionRequired: Boolean,
  revisionComments: String,
  topics: [String],
  featured: Boolean
});

module.exports = mongoose.model('Article', articleSchema);

const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  authorInfo: {
    fullName: String,
    title: String,
    gender: String,
    dob: Date,
    primaryEmail: String,
    orcid: String,
    affiliation: String,
  },
  manuscriptDetails: {
    type: String,
    title: String,
    abstract: String,
    manuscriptType: String,
    keywords: [String],
    content: String,
  },
  status: {
    type: String,
    enum: ['submitted', 'under_review', 'reviewed', 'accepted', 'rejected', 'needs_revision'],
    default: 'submitted'
  },
  assignedReviewers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  submissionDate: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  authors: [{
    name: String,
    orcid: String,
    contribution: [String],
  }],
  ethicsConsent: {
    ethicsApproval: Boolean,
    ethicsDocumentUrl: String,
    informedConsent: Boolean,
    patientConsentStatement: String,
  },
  files: {
    manuscriptUrl: String,
    figuresUrls: [String],
    supplementaryUrls: [String],
    coverLetterUrl: String,
  },
  status: { type: String, default: 'pending' }, // pending, reviewed, accepted, rejected
  submittedAt: { type: Date, default: Date.now },
  reviews: [
    {
      reviewerId: mongoose.Schema.Types.ObjectId, // link to User or Reviewer model
      comments: String,
      recommendation: { type: String, enum: ['accept', 'minor revisions', 'major revisions', 'reject'] },
      submittedAt: Date,
      status: { type: String, enum: ['pending', 'submitted'], default: 'pending' }
    }
  ],
  assignedReviewers: [mongoose.Schema.Types.ObjectId], // reviewers assigned to this submission
});

module.exports = mongoose.model('Submission', SubmissionSchema);

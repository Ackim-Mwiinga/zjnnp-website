const mongoose = require('mongoose');

const PeerReviewerApplicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  title: {
    type: String,
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  primaryEmail: {
    type: String,
    required: true,
    unique: true
  },
  alternativeEmail: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  position: {
    type: String,
    required: true
  },
  institution: {
    type: String,
    required: true
  },
  department: {
    type: String,
  },
  country: {
    type: String,
    required: true
  },
  degrees: {
    type: String,
    required: true
  },
  orcid: {
    type: String,
    required: true
  },
  scopusId: {
    type: String,
  },
  researchGate: {
    type: String,
  },
  expertise: {
    type: String,
  },
  reviewingExperience: {
    type: String,
  },
  statementOfInterest: {
    type: String,
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PeerReviewerApplication', PeerReviewerApplicationSchema);

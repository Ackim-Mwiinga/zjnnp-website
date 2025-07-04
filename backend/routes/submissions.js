const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const Article = require('../models/Article');
const Reviewer = require('../models/Reviewer');

// Create a submission
router.post('/', async (req, res) => {
  try {
    const submission = new Submission(req.body);
    await submission.save();
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get submissions by status
router.get('/', async (req, res) => {
  const status = req.query.status || 'pending';
  try {
    const submissions = await Submission.find({ status });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get submission by ID
router.get('/:id', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) return res.status(404).json({ error: 'Submission not found' });
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Assign reviewers to a submission
router.patch('/:id/assign-reviewers', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) return res.status(404).json({ error: 'Submission not found' });

    const { assignedReviewers } = req.body;
    submission.assignedReviewers = assignedReviewers;
    await submission.save();

    res.json({ message: 'Reviewers assigned successfully', submission });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all reviews for a submission
router.get('/:id/reviews', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id).populate('reviews.reviewerId');
    if (!submission) return res.status(404).json({ error: 'Submission not found' });

    res.json(submission.reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve a submission and create an article
router.patch('/:id/approve', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) return res.status(404).json({ error: 'Submission not found' });

    submission.status = 'approved';
    await submission.save();

    const article = new Article({
      authorInfo: submission.authorInfo,
      manuscriptDetails: submission.manuscriptDetails,
      authors: submission.authors,
      ethicsConsent: submission.ethicsConsent,
      files: submission.files,
      publishedAt: new Date(),
      updatedAt: new Date(),
    });
    await article.save();

    res.json({ message: 'Submission approved and article created', article });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reject a submission
router.patch('/:id/reject', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) return res.status(404).json({ error: 'Submission not found' });

    submission.status = 'rejected';
    submission.rejectionReason = req.body.rejectionReason || '';
    await submission.save();

    res.json({ message: 'Submission rejected' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

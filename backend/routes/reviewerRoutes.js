const express = require('express');
const router = express.Router();
const Reviewer = require('../models/Reviewer');

// Get all reviewers
router.get('/', async (req, res) => {
  try {
    const reviewers = await Reviewer.find();
    res.json(reviewers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new reviewer
router.post('/', async (req, res) => {
  try {
    const reviewer = new Reviewer(req.body);
    await reviewer.save();
    res.status(201).json(reviewer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

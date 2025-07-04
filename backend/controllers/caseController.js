const Case = require('../models/Case');
const path = require('path');
const fs = require('fs');

// Create a new case (Picture Prognosis)
exports.createCase = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user._id;
    let filePath = '';
    if (req.file) {
      filePath = req.file.path;
    }
    const newCase = new Case({
      title,
      description,
      files: filePath,
      user: userId
    });
    await newCase.save();
    res.status(201).json({ message: 'Case submitted successfully', case: newCase });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit case', error: error.message });
  }
};

// Get all cases (for chief editor dashboard)
exports.getAllCases = async (req, res) => {
  try {
    const cases = await Case.find().populate('user', 'fullName email');
    res.status(200).json({ cases });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cases', error: error.message });
  }
};

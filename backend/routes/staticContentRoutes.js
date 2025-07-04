const express = require('express');
const router = express.Router();
const StaticContent = require('../models/StaticContent');
const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');

// Create a new static content
router.post('/', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const { title, content, contentType } = req.body;

    const newStaticContent = new StaticContent({
      title,
      content,
      contentType
    });

    await newStaticContent.save();

    res.status(201).json({ message: 'Static content created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all static content
router.get('/', async (req, res) => {
  try {
    const staticContent = await StaticContent.find();
    res.status(200).json(staticContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get static content by ID
router.get('/:id', async (req, res) => {
  try {
    const staticContent = await StaticContent.findById(req.params.id);
    if (!staticContent) {
      return res.status(404).json({ message: 'Static content not found' });
    }
    res.status(200).json(staticContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update static content by ID
router.put('/:id', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const { title, content, contentType } = req.body;

    const updatedStaticContent = await StaticContent.findByIdAndUpdate(req.params.id, {
      title,
      content,
      contentType
    });

    if (!updatedStaticContent) {
      return res.status(404).json({ message: 'Static content not found' });
    }

    res.status(200).json({ message: 'Static content updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete static content by ID
router.delete('/:id', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const deletedStaticContent = await StaticContent.findByIdAndDelete(req.params.id);

    if (!deletedStaticContent) {
      return res.status(404).json({ message: 'Static content not found' });
    }

    res.status(200).json({ message: 'Static content deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

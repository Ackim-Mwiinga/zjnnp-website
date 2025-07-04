const express = require('express');
const router = express.Router();
const EditorialBoard = require('../models/EditorialBoard');
const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');

// Create a new editorial board member
router.post('/', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const { name, role, bio, image } = req.body;

    const newEditorialBoardMember = new EditorialBoard({
      name,
      role,
      bio,
      image
    });

    await newEditorialBoardMember.save();

    res.status(201).json({ message: 'Editorial board member created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all editorial board members
router.get('/', async (req, res) => {
  try {
    const editorialBoardMembers = await EditorialBoard.find();
    res.status(200).json(editorialBoardMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get editorial board member by ID
router.get('/:id', async (req, res) => {
  try {
    const editorialBoardMember = await EditorialBoard.findById(req.params.id);
    if (!editorialBoardMember) {
      return res.status(404).json({ message: 'Editorial board member not found' });
    }
    res.status(200).json(editorialBoardMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update editorial board member by ID
router.put('/:id', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const { name, role, bio, image } = req.body;

    const updatedEditorialBoardMember = await EditorialBoard.findByIdAndUpdate(req.params.id, {
      name,
      role,
      bio,
      image
    });

    if (!updatedEditorialBoardMember) {
      return res.status(404).json({ message: 'Editorial board member not found' });
    }

    res.status(200).json({ message: 'Editorial board member updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete editorial board member by ID
router.delete('/:id', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const deletedEditorialBoardMember = await EditorialBoard.findByIdAndDelete(req.params.id);

    if (!deletedEditorialBoardMember) {
      return res.status(404).json({ message: 'Editorial board member not found' });
    }

    res.status(200).json({ message: 'Editorial board member deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

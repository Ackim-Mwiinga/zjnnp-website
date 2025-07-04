const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      passwordHash,
      role
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Create and sign a JWT token
    const token = jwt.sign(
      { 
        userId: savedUser._id,
        role: savedUser.role
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.status(201).json({ 
      message: 'User registered successfully',
      token,
      user: {
        id: savedUser._id,
        email: savedUser.email,
        role: savedUser.role,
        isProfileComplete: savedUser.isProfileComplete
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user role
router.put('/me/role', async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.user.id; // Assuming we have user from auth middleware

    // Validate role
    if (!['author', 'reviewer', 'editor', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Update user role
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { role } },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ 
      message: 'Role updated successfully',
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isProfileComplete: user.isProfileComplete
      }
    });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and sign a JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.json({ 
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isProfileComplete: user.isProfileComplete
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

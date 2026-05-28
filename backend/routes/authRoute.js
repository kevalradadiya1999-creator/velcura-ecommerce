const express = require('express');
const router = express.Router();
const db = require('../db');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone number are required' });
    }

    // Check if user already exists
    const exists = await db.getUserByEmailOrPhone(email, phone);
    if (exists) {
      return res.status(200).json({ 
        message: 'Welcome back! User already registered.', 
        user: exists 
      });
    }

    const newUser = await db.saveUser({
      name,
      email,
      phone
    });

    console.log('--- NEW USER REGISTERED ---');
    console.log(JSON.stringify(newUser, null, 2));

    res.status(201).json({ 
      message: 'User registered successfully', 
      user: newUser 
    });
  } catch (error) {
    console.error('Error in user registration:', error);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ error: 'Email or phone number is required' });
    }

    // Look up by email or phone
    const user = await db.getUserByEmailOrPhone(email, phone);

    if (!user) {
      return res.status(404).json({ error: 'User not found. Please register first.' });
    }

    console.log('--- USER LOGGED IN ---');
    console.log(JSON.stringify(user, null, 2));

    res.status(200).json({ 
      message: 'Login successful', 
      user 
    });
  } catch (error) {
    console.error('Error in user login:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

// Get all users (admin/debugging)
router.get('/users', async (req, res) => {
  try {
    const users = await db.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

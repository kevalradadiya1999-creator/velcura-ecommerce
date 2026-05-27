const express = require('express');
const router = express.Router();

// In-memory user database
const users = [];

// Register a new user
router.post('/register', (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone number are required' });
    }

    // Check if user already exists
    const exists = users.find(u => u.email === email || u.phone === phone);
    if (exists) {
      return res.status(200).json({ 
        message: 'Welcome back! User already registered.', 
        user: exists 
      });
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      phone,
      createdAt: new Date()
    };

    users.push(newUser);

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
router.post('/login', (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ error: 'Email or phone number is required' });
    }

    // Look up by email or phone
    const user = users.find(u => (email && u.email === email) || (phone && u.phone === phone));

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
router.get('/users', (req, res) => {
  res.status(200).json(users);
});

module.exports = router;

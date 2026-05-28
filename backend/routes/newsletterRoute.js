const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
  try {
    const { email, source } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email address is required' });
    }

    const newNewsletter = await db.saveNewsletter({ email, source: source || 'footer' });

    console.log('--- NEW NEWSLETTER SIGNUP ---');
    console.log(JSON.stringify(newNewsletter, null, 2));

    res.status(201).json({ message: 'Newsletter subscription successful', newsletter: newNewsletter });
  } catch (error) {
    console.error('Error in newsletter signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all newsletter signups (admin)
router.get('/', async (req, res) => {
  try {
    const signups = await db.getAllNewsletters();
    res.json(signups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

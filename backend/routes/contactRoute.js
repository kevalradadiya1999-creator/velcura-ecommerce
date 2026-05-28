const express = require('express');
const router = express.Router();
const db = require('../db');
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save to database
    const newContact = await db.saveContact({ name, email, subject, message });

    console.log('--- NEW CONTACT SUBMISSION ---');
    console.log(JSON.stringify(newContact, null, 2));

    // Optional Nodemailer notification
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'velcura60@gmail.com',
          subject: `New Contact Form Submission: ${subject}`,
          text: `You have received a new message from your website contact form.
          
Name: ${name}
Email: ${email}
Subject: ${subject}
Message:
${message}`
        };

        await transporter.sendMail(mailOptions);
        console.log('Notification email sent successfully!');
      } catch (mailErr) {
        console.error('Nodemailer failed to send email notification:', mailErr);
      }
    }

    res.status(201).json({ message: 'Contact form submitted successfully', contact: newContact });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all contact submissions (admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await db.getAllContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { sendSignInNotification } = require('../utils/emailService');

// Admin login/sign-in endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Get admin credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL || 'smkoushikk@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Simple authentication (in production, use JWT and hash passwords)
    if (email === adminEmail && password === adminPassword) {
      // Send sign-in notification email
      try {
        await sendSignInNotification(email);
      } catch (emailError) {
        console.error('Failed to send sign-in notification email:', emailError);
        // Don't fail the login if email fails
      }

      res.json({
        success: true,
        message: 'Login successful',
        user: {
          email: email,
          isAdmin: true
        }
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Check authentication status (for frontend)
router.get('/check', (req, res) => {
  res.json({
    authenticated: false,
    message: 'Use POST /api/auth/login to authenticate'
  });
});

module.exports = router;


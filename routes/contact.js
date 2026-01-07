const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configure email service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send contact message
router.post('/send-message', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'admin@maadhuri.shop',
      subject: `New Contact Message: ${subject}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    // Confirmation email to customer
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We received your message - Maadhuri Shop',
      html: `
        <h3>Thank You for Contacting Maadhuri Shop</h3>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you shortly.</p>
        <p>Order Details:</p>
        <ul>
          <li><strong>Subject:</strong> ${subject}</li>
          <li><strong>Received on:</strong> ${new Date().toLocaleString()}</li>
        </ul>
        <p>Best regards,<br>Maadhuri Shop Team</p>
      `
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(customerMailOptions);

    res.json({
      success: true,
      message: 'Message sent successfully. We will contact you soon.'
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // In production, save to database
    // await Newsletter.findOrCreate({ email });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Maadhuri Shop Newsletter',
      html: `
        <h3>Welcome to Maadhuri Shop!</h3>
        <p>Thank you for subscribing to our newsletter.</p>
        <p>You will now receive updates about:</p>
        <ul>
          <li>New product launches</li>
          <li>Special offers and discounts</li>
          <li>Weekly recipes and cooking tips</li>
          <li>Exclusive deals for subscribers</li>
        </ul>
        <p>Best regards,<br>Maadhuri Shop Team</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Thank you for subscribing!'
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

module.exports = router;


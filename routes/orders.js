const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { sendOrderConfirmationToCustomer, sendOrderNotificationToAdmin } = require('../utils/emailService');

// Create order
router.post('/', async (req, res) => {
  try {
    let { customerName, customerEmail, customerPhone, shippingAddress, items, totalAmount } = req.body;

    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone || !items || items.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Handle address format - support both string and object
    if (typeof shippingAddress === 'string') {
      // Parse simple address string (format: "Street, City, State, Pincode")
      const addressParts = shippingAddress.split(',').map(part => part.trim());
      shippingAddress = {
        street: addressParts[0] || '',
        city: addressParts[1] || '',
        state: addressParts[2] || '',
        pincode: addressParts[3] || '',
        country: 'India'
      };
    } else if (!shippingAddress || typeof shippingAddress !== 'object') {
      return res.status(400).json({ error: 'Invalid shipping address format' });
    }

    // Generate WhatsApp message
    const itemsList = items.map(item => 
      `${item.productName} x${item.quantity} (${item.unit}) - ₹${item.quantity * item.price}`
    ).join('\n');

    const whatsappMessage = `
*New Order from Maadhuri Shop*
Name: ${customerName}
Phone: ${customerPhone}
Email: ${customerEmail}

*Shipping Address:*
${shippingAddress.street}
${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pincode}

*Items Ordered:*
${itemsList}

*Total Amount: ₹${totalAmount}*

Please confirm this order.
    `.trim();

    const order = new Order({
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
      totalAmount,
      totalItems: items.length,
      whatsappMessage
    });

    const savedOrder = await order.save();

    // Send emails asynchronously (don't block response)
    Promise.all([
      sendOrderConfirmationToCustomer(savedOrder),
      sendOrderNotificationToAdmin(savedOrder)
    ]).catch(err => {
      console.error('Error sending order emails:', err);
      // Don't fail the order if emails fail
    });

    res.status(201).json({
      success: true,
      orderId: savedOrder.orderId,
      order: savedOrder,
      whatsappLink: `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all orders (Admin)
router.get('/', async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single order
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status (Admin)
router.put('/:orderId', async (req, res) => {
  try {
    const { status, notes } = req.body;

    // First find the order to get existing notes
    const existingOrder = await Order.findOne({ orderId: req.params.orderId });
    
    if (!existingOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the order
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { 
        status: status || existingOrder.status,
        notes: notes !== undefined ? notes : existingOrder.notes,
        updatedAt: new Date()
      },
      { new: true }
    );

    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get orders by customer email
router.get('/customer/:email', async (req, res) => {
  try {
    const orders = await Order.find({ customerEmail: req.params.email }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order statistics (Admin)
router.get('/stats/dashboard', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const ordersThisMonth = await Order.countDocuments({
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    });

    res.json({
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      ordersThisMonth,
      averageOrderValue: totalRevenue[0]?.total / totalOrders || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


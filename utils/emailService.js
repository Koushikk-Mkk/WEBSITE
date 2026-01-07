const nodemailer = require('nodemailer');

// Configure email service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email service configuration error:', error);
  } else {
    console.log('✓ Email service is ready to send messages');
  }
});

/**
 * Send sign-in notification email to admin
 */
async function sendSignInNotification(email) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'smkoushikk@gmail.com';
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: '🔐 Admin Sign-In Notification - Maadhuri Shop',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5530;">🔐 Admin Sign-In Alert</h2>
          <p>Hello,</p>
          <p>This is to notify you that someone has successfully signed in to the admin panel.</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Sign-In Details:</strong></p>
            <ul>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Time:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</li>
              <li><strong>IP Address:</strong> Check server logs for details</li>
            </ul>
          </div>
          <p>If this was not you, please secure your account immediately.</p>
          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            Best regards,<br>
            Maadhuri Shop System
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✓ Sign-in notification sent to ${adminEmail}`);
    return true;
  } catch (error) {
    console.error('Error sending sign-in notification:', error);
    return false;
  }
}

/**
 * Send order confirmation email to customer
 */
async function sendOrderConfirmationToCustomer(order) {
  try {
    const itemsList = order.items.map(item => 
      `<tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.productName}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity} ${item.unit}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.price}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.quantity * item.price}</td>
      </tr>`
    ).join('');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: order.customerEmail,
      subject: `✅ Order Confirmation - ${order.orderId} - Maadhuri Shop`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5530;">✅ Order Confirmed!</h2>
          <p>Dear ${order.customerName},</p>
          <p>Thank you for your order! We have received your order and it is being processed.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2c5530;">Order Details</h3>
            <p><strong>Order ID:</strong> ${order.orderId}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</p>
            <p><strong>Status:</strong> <span style="color: #ff6b00; font-weight: bold;">${order.status.toUpperCase()}</span></p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #2c5530;">Shipping Address</h3>
            <p>
              ${order.shippingAddress.street}<br>
              ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.pincode}<br>
              ${order.shippingAddress.country}
            </p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #2c5530;">Order Items</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #2c5530; color: white;">
                  <th style="padding: 10px; text-align: left;">Product</th>
                  <th style="padding: 10px; text-align: center;">Quantity</th>
                  <th style="padding: 10px; text-align: right;">Price</th>
                  <th style="padding: 10px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold; border-top: 2px solid #2c5530;">Total Amount:</td>
                  <td style="padding: 10px; text-align: right; font-weight: bold; font-size: 18px; color: #2c5530; border-top: 2px solid #2c5530;">₹${order.totalAmount}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <p>We will notify you once your order is shipped. You can track your order status using the Order ID: <strong>${order.orderId}</strong></p>
          
          <p style="margin-top: 30px;">If you have any questions, please contact us.</p>
          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            Best regards,<br>
            Maadhuri Shop Team
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✓ Order confirmation sent to customer: ${order.customerEmail}`);
    return true;
  } catch (error) {
    console.error('Error sending order confirmation to customer:', error);
    return false;
  }
}

/**
 * Send order notification email to admin
 */
async function sendOrderNotificationToAdmin(order) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'smkoushikk@gmail.com';
    const itemsList = order.items.map(item => 
      `<tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.productName}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity} ${item.unit}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.price}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.quantity * item.price}</td>
      </tr>`
    ).join('');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: `🛒 New Order Received - ${order.orderId} - Maadhuri Shop`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5530;">🛒 New Order Received!</h2>
          <p>Hello Admin,</p>
          <p>A new order has been placed on Maadhuri Shop. Please review and process it.</p>
          
          <div style="background-color: #fff3cd; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <h3 style="margin-top: 0; color: #856404;">Order Summary</h3>
            <p><strong>Order ID:</strong> ${order.orderId}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</p>
            <p><strong>Status:</strong> <span style="color: #ff6b00; font-weight: bold;">${order.status.toUpperCase()}</span></p>
            <p><strong>Total Amount:</strong> <span style="font-size: 20px; color: #2c5530; font-weight: bold;">₹${order.totalAmount}</span></p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #2c5530;">Customer Information</h3>
            <p><strong>Name:</strong> ${order.customerName}</p>
            <p><strong>Email:</strong> ${order.customerEmail}</p>
            <p><strong>Phone:</strong> ${order.customerPhone}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #2c5530;">Shipping Address</h3>
            <p>
              ${order.shippingAddress.street}<br>
              ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.pincode}<br>
              ${order.shippingAddress.country}
            </p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #2c5530;">Order Items</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #2c5530; color: white;">
                  <th style="padding: 10px; text-align: left;">Product</th>
                  <th style="padding: 10px; text-align: center;">Quantity</th>
                  <th style="padding: 10px; text-align: right;">Price</th>
                  <th style="padding: 10px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold; border-top: 2px solid #2c5530;">Total Amount:</td>
                  <td style="padding: 10px; text-align: right; font-weight: bold; font-size: 18px; color: #2c5530; border-top: 2px solid #2c5530;">₹${order.totalAmount}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            This is an automated notification from Maadhuri Shop system.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✓ Order notification sent to admin: ${adminEmail}`);
    return true;
  } catch (error) {
    console.error('Error sending order notification to admin:', error);
    return false;
  }
}

module.exports = {
  transporter,
  sendSignInNotification,
  sendOrderConfirmationToCustomer,
  sendOrderNotificationToAdmin
};


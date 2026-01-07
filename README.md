# Maadhuri Shop - Full Stack E-Commerce Platform

Complete backend solution for your Maadhuri Shop e-commerce platform built with **Node.js, Express, React, and MongoDB**.

## 📁 Project Structure

```
maadhuri-shop-backend/
├── models/
│   ├── Product.js          # Product schema and model
│   └── Order.js            # Order schema and model
├── routes/
│   ├── products.js         # Product endpoints
│   ├── orders.js           # Order management endpoints
│   ├── cart.js             # Cart handling endpoints
│   └── contact.js          # Contact & email endpoints
├── server.js               # Main server file
├── package.json            # Dependencies
├── .env.example            # Environment variables template
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account or local MongoDB
- Gmail account (for email notifications)
- Hostinger domain & hosting

### Installation

1. **Clone and Setup**
```bash
cd maadhuri-shop-backend
npm install
```

2. **Configure Environment Variables**
```bash
cp .env.example .env
```

Edit `.env` with your values:
```
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_app_specific_password
NODE_ENV=production
```

3. **Run Locally**
```bash
npm run dev
```

## 📊 Database Models

### Product Schema
- Product name, category, description
- Price, quantity, unit
- Stock status, rating, reviews
- Timestamps

### Order Schema
- Unique order ID (auto-generated)
- Customer details (name, email, phone)
- Shipping address
- Items array with quantities
- Order status tracking
- WhatsApp message generation

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products (with filtering, sorting)
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get by category
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `GET /api/products/featured/all` - Get featured products

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (Admin, with filters)
- `GET /api/orders/:orderId` - Get single order
- `PUT /api/orders/:orderId` - Update order status (Admin)
- `GET /api/orders/customer/:email` - Get customer orders
- `GET /api/orders/stats/dashboard` - Dashboard statistics (Admin)

### Cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart
- `POST /api/cart/update` - Update quantity
- `POST /api/cart/clear` - Clear cart

### Contact
- `POST /api/contact/send-message` - Send contact form message
- `POST /api/contact/subscribe` - Newsletter subscription

## 🌐 Deployment on Hostinger

### Step 1: Prepare for Production
```bash
npm install --production
```

### Step 2: Upload to Hostinger
1. Connect via FTP or File Manager
2. Upload all backend files to your domain folder
3. Ensure `.env` is configured with production values

### Step 3: Set Up Node.js
1. In Hostinger Control Panel → Select Node.js
2. Set Entry Point: `server.js`
3. Set Port: `5000` (or configure in .env)
4. Click "Create"

### Step 4: Configure MongoDB Atlas
1. Create cluster on MongoDB Atlas
2. Get connection string
3. Add IP address to whitelist in MongoDB Atlas
4. Set `MONGODB_URI` in .env

### Step 5: Configure SSL & Domain
1. Enable SSL in Hostinger
2. Point domain DNS to Hostinger
3. Wait for DNS propagation

### Step 6: Set Up Reverse Proxy
If Hostinger requires, configure nginx reverse proxy:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔗 Frontend Integration

### React Frontend Connection
```javascript
// In your React app
const API_BASE_URL = 'https://yourdomain.com/api';

// Fetch products
fetch(`${API_BASE_URL}/products`)
  .then(res => res.json())
  .then(data => console.log(data));

// Create order
fetch(`${API_BASE_URL}/orders`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+919876543210',
    shippingAddress: {...},
    items: [...],
    totalAmount: 5000
  })
})
.then(res => res.json())
.then(data => {
  console.log('Order created:', data.orderId);
  // Redirect to WhatsApp with order details
  window.open(data.whatsappLink);
});
```

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-factor authentication
2. Generate App Password (not regular password)
3. Use App Password in `.env`

## 🛡️ Security Features
- CORS protection
- Input validation
- Error handling
- Environment variables for sensitive data
- Rate limiting ready
- HELMET for HTTP headers

## 📱 WhatsApp Integration
Orders automatically generate WhatsApp message with:
- Customer details
- Order items with quantities
- Total amount
- Shipping address
- Direct WhatsApp link for confirmation

## 🔄 Order Workflow
1. Customer adds items to cart
2. Customer fills checkout form
3. Order created in MongoDB
4. WhatsApp message generated
5. Customer contacts via WhatsApp
6. Admin updates order status
7. Customer receives updates via email

## 📊 Admin Dashboard Features
- View all orders
- Filter by status/date
- Update order status
- View order statistics
- Track revenue and orders

## 🐛 Troubleshooting

**MongoDB Connection Error**
- Check connection string
- Verify IP whitelist in MongoDB Atlas
- Ensure MONGODB_URI format is correct

**Email Not Sending**
- Verify Gmail credentials
- Check App Password (not regular password)
- Allow less secure apps in Gmail settings
- Check EMAIL_USER and EMAIL_PASSWORD in .env

**CORS Issues**
- Add frontend domain to CORS_ORIGIN in .env
- Use proper headers in frontend requests

## 📝 Sample Product Data

```javascript
{
  "name": "Organic Turmeric Powder",
  "category": "Spices",
  "description": "100% pure turmeric powder from traditional farmers",
  "price": 250,
  "quantity": 500,
  "unit": "gm",
  "inStock": true,
  "rating": 4.5,
  "reviews": 120
}
```

## 🚀 Next Steps

1. **Upload backend to Hostinger**
2. **Configure environment variables**
3. **Set up MongoDB Atlas connection**
4. **Configure email service**
5. **Create React frontend to connect to API**
6. **Test order creation and WhatsApp integration**
7. **Deploy frontend**
8. **Set up monitoring and logging**

## 📞 Support
For issues or questions, contact: admin@maadhuri.shop

---

**Built with ❤️ for Maadhuri Shop**

# Maadhuri Shop - Complete Backend Implementation Guide

## 📚 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [File Structure](#file-structure)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [API Documentation](#api-documentation)
7. [Frontend Integration](#frontend-integration)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Maadhuri Shop** is a full-stack e-commerce platform for selling organic Indian products (spices, grains, oils, etc.).

### Key Features
✅ Product catalog with filtering and search
✅ Shopping cart management
✅ Order creation with auto-generated order IDs
✅ WhatsApp integration for order confirmation
✅ Email notifications
✅ Admin dashboard for order management
✅ Product management (CRUD operations)
✅ Customer order history tracking

### Tech Stack
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Frontend**: React (provided separately)
- **Email**: Nodemailer (Gmail)
- **Hosting**: Hostinger

---

## Architecture

```
┌─────────────────┐
│   React App     │
│   (Frontend)    │
└────────┬────────┘
         │ HTTP/HTTPS API Calls
         ↓
┌─────────────────────────────────────┐
│     Express.js Server (5000)        │
│  ┌─────────────────────────────────┐│
│  │  Routes                         ││
│  │  - /api/products                ││
│  │  - /api/orders                  ││
│  │  - /api/cart                    ││
│  │  - /api/contact                 ││
│  └─────────────────────────────────┘│
└──────────┬──────────────────────────┘
           │
    ┌──────┼──────┬──────────┐
    ↓      ↓      ↓          ↓
┌────────┐ │ ┌─────────┐ ┌────────┐
│MongoDB │ │ │Nodemailer  │ │WhatsApp│
│(Data)  │ │ │(Emails) │ │API    │
└────────┘ │ └─────────┘ └────────┘
    ↑      │
    └──────┘
```

---

## File Structure

```
maadhuri-shop-backend/
│
├── server.js                          # Main Express server
├── package.json                       # Dependencies
├── .env                               # Environment variables (confidential)
├── .env.example                       # Environment template
│
├── models/                            # Mongoose Schemas
│   ├── Product.js                     # Product model
│   └── Order.js                       # Order model
│
├── routes/                            # API Routes
│   ├── products.js                    # Product endpoints
│   ├── orders.js                      # Order endpoints
│   ├── cart.js                        # Cart endpoints
│   └── contact.js                     # Contact & email endpoints
│
├── config/                            # Configuration (optional)
│   └── database.js                    # Database connection
│
├── middleware/                        # Custom middleware (optional)
│   ├── auth.js                        # Authentication
│   └── errorHandler.js                # Error handling
│
├── public/                            # Static files (if any)
│   └── index.html                     # Frontend (optional)
│
├── docs/                              # Documentation
│   ├── README.md                      # Project overview
│   ├── API.md                         # API documentation
│   ├── DEPLOYMENT.md                  # Deployment guide
│   └── SETUP.md                       # Setup instructions
│
└── scripts/                           # Utility scripts
    ├── seed-db.js                     # Seed database with sample data
    └── setup.sh                       # Initial setup script
```

---

## Installation

### Local Setup (Development)

#### 1. Install Node.js
Download from https://nodejs.org (v14 or higher)

#### 2. Create Project Directory
```bash
mkdir maadhuri-shop-backend
cd maadhuri-shop-backend
```

#### 3. Initialize NPM
```bash
npm init -y
```

#### 4. Install Dependencies
```bash
npm install express mongoose cors dotenv nodemailer validator helmet express-rate-limit
npm install --save-dev nodemon
```

#### 5. Copy All Files
Copy the following files into your project:
- server.js
- models/Product.js
- models/Order.js
- routes/products.js
- routes/orders.js
- routes/cart.js
- routes/contact.js

#### 6. Create .env File
```bash
cp .env.example .env
# Edit .env with your configuration
```

#### 7. Start Server
```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

---

## Configuration

### Environment Variables (.env)

```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/maadhuri-shop

# Email
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password (not regular password!)
ADMIN_EMAIL=admin@maadhuri.shop

# Frontend
CORS_ORIGIN=http://localhost:3000
API_BASE_URL=http://localhost:5000

# WhatsApp
WHATSAPP_PHONE_NUMBER=919876543210
```

### MongoDB Connection String

**Local Development:**
```
mongodb://localhost:27017/maadhuri-shop
```

**MongoDB Atlas (Cloud):**
```
mongodb+srv://username:password@cluster.mongodb.net/maadhuri-shop?retryWrites=true&w=majority
```

### Gmail Setup for Emails

1. Enable 2-Factor Authentication on Google Account
2. Generate App Password:
   - Go to myaccount.google.com/security
   - Find "App passwords"
   - Select Mail + Windows
   - Copy 16-character password
3. Use this password in EMAIL_PASSWORD (NOT your real Gmail password!)

---

## API Documentation

### Base URL
```
http://localhost:5000/api
https://yourdomain.com/api
```

### 1. Products API

#### Get All Products
```
GET /products
Query Parameters:
  - category: Spices, Grains, Oils, etc.
  - search: Product name or description
  - minPrice: Minimum price
  - maxPrice: Maximum price
  - sort: price-asc, price-desc, newest, rating

Example: GET /products?category=Spices&sort=price-asc
```

Response:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Organic Turmeric",
    "category": "Spices",
    "description": "Pure turmeric",
    "price": 250,
    "quantity": 500,
    "unit": "gm",
    "inStock": true,
    "rating": 4.5,
    "reviews": 120
  }
]
```

#### Get Single Product
```
GET /products/:id

Example: GET /products/507f1f77bcf86cd799439011
```

#### Get Products by Category
```
GET /products/category/:category

Example: GET /products/category/Spices
```

#### Get Featured Products
```
GET /products/featured/all
```

#### Create Product (Admin)
```
POST /products
Body:
{
  "name": "Product Name",
  "category": "Spices",
  "description": "Description",
  "price": 250,
  "quantity": 500,
  "unit": "gm",
  "inStock": true,
  "rating": 4.5,
  "reviews": 0
}
```

#### Update Product (Admin)
```
PUT /products/:id
Body: Same as create
```

#### Delete Product (Admin)
```
DELETE /products/:id
```

---

### 2. Orders API

#### Create Order
```
POST /orders
Body:
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+919876543210",
  "shippingAddress": {
    "street": "123 Market Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "country": "India"
  },
  "items": [
    {
      "productId": "507f...",
      "productName": "Turmeric",
      "quantity": 2,
      "price": 250,
      "unit": "gm"
    }
  ],
  "totalAmount": 500
}

Response:
{
  "success": true,
  "orderId": "ORD-123456ABC",
  "order": {...},
  "whatsappLink": "https://wa.me/919876543210?text=..."
}
```

#### Get All Orders (Admin)
```
GET /orders
Query Parameters:
  - status: pending, confirmed, processing, shipped, delivered, cancelled
  - startDate: YYYY-MM-DD
  - endDate: YYYY-MM-DD

Example: GET /orders?status=pending&startDate=2024-01-01
```

#### Get Single Order
```
GET /orders/:orderId

Example: GET /orders/ORD-123456ABC
```

#### Get Customer Orders
```
GET /orders/customer/:email

Example: GET /orders/customer/john@example.com
```

#### Update Order Status (Admin)
```
PUT /orders/:orderId
Body:
{
  "status": "confirmed",
  "notes": "Order confirmed and ready for shipment"
}

Status values: pending, confirmed, processing, shipped, delivered, cancelled
```

#### Get Dashboard Statistics (Admin)
```
GET /orders/stats/dashboard

Response:
{
  "totalOrders": 150,
  "totalRevenue": 75000,
  "ordersThisMonth": 45,
  "averageOrderValue": 500
}
```

---

### 3. Cart API

#### Add to Cart
```
POST /cart/add
Body:
{
  "productId": "507f...",
  "productName": "Turmeric",
  "quantity": 2,
  "price": 250,
  "unit": "gm"
}

Response:
{
  "success": true,
  "item": {
    "productId": "507f...",
    "productName": "Turmeric",
    "quantity": 2,
    "price": 250,
    "unit": "gm",
    "subtotal": 500
  }
}
```

#### Remove from Cart
```
POST /cart/remove
Body:
{
  "productId": "507f..."
}
```

#### Update Cart Item
```
POST /cart/update
Body:
{
  "productId": "507f...",
  "quantity": 3
}
```

#### Clear Cart
```
POST /cart/clear
```

---

### 4. Contact API

#### Send Contact Message
```
POST /contact/send-message
Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "subject": "Order Inquiry",
  "message": "I have a question about turmeric quality"
}

Response:
{
  "success": true,
  "message": "Message sent successfully"
}
```

#### Subscribe to Newsletter
```
POST /contact/subscribe
Body:
{
  "email": "john@example.com"
}

Response:
{
  "success": true,
  "message": "Thank you for subscribing!"
}
```

---

### Error Responses

All errors follow this format:
```json
{
  "error": "Error message",
  "message": "Detailed error (development only)"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

---

## Frontend Integration

### React Example

#### 1. Install Dependencies
```bash
npm install axios
```

#### 2. Create API Service
```javascript
// services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL
});

export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  getByCategory: (category) => api.get(`/products/category/${category}`)
};

export const orderAPI = {
  create: (data) => api.post('/orders', data),
  getById: (orderId) => api.get(`/orders/${orderId}`),
  getByEmail: (email) => api.get(`/orders/customer/${email}`)
};

export default api;
```

#### 3. Use in Components
```javascript
import { productAPI, orderAPI } from './services/api';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productAPI.getAll()
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    // Render products
  );
}
```

#### 4. Environment Variables
Create `.env` in React project:
```
REACT_APP_API_URL=https://yourdomain.com/api
```

---

## Deployment

### For Hostinger Deployment
See `HOSTINGER-DEPLOYMENT.md` for complete step-by-step guide.

Quick Summary:
1. Create MongoDB Atlas cluster
2. Set up Gmail App Password
3. Upload files to Hostinger
4. Configure Node.js application
5. Set environment variables
6. Enable SSL
7. Test endpoints

---

## Troubleshooting

### MongoDB Connection Issues
```
Error: connect ECONNREFUSED 127.0.0.1:27017

Solution:
1. Ensure MongoDB is running (mongod)
2. Check MONGODB_URI in .env
3. For MongoDB Atlas, verify:
   - Username/password correct
   - IP whitelist includes your machine
   - Connection string format correct
```

### Email Not Sending
```
Error: Invalid login

Solution:
1. Use App Password (not regular password)
2. Enable 2-Factor Authentication
3. Check EMAIL_USER and EMAIL_PASSWORD
4. Test connection in isolation
```

### CORS Errors
```
Error: Access to XMLHttpRequest blocked by CORS policy

Solution:
1. Check CORS_ORIGIN includes frontend domain
2. Add https:// prefix
3. Restart server after changing .env
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000

Solution:
1. Change PORT in .env (e.g., 5001, 5002)
2. Or kill process: lsof -ti:5000 | xargs kill -9
3. Or find process using port and close it
```

### Database Errors

**Duplicate Key Error**
```
Solution: Clear collection or use unique ID
db.products.deleteMany({})
```

**Validation Error**
```
Solution: Ensure all required fields are provided
Check schema in models/Product.js
```

---

## Security Best Practices

✅ Never commit .env to Git
✅ Use strong database passwords
✅ Enable HTTPS in production
✅ Validate and sanitize all inputs
✅ Use environment variables for secrets
✅ Implement rate limiting
✅ Regular database backups
✅ Monitor server logs
✅ Update dependencies regularly

---

## Performance Tips

1. **Database Indexing**
   ```javascript
   // Add indexes to frequently queried fields
   productSchema.index({ category: 1 });
   orderSchema.index({ customerEmail: 1 });
   ```

2. **Caching**
   ```javascript
   // Cache featured products (TODO: implement Redis)
   ```

3. **Pagination**
   ```javascript
   // GET /products?page=1&limit=10
   ```

4. **Compression**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

---

## Future Enhancements

- [ ] User authentication and login
- [ ] Payment gateway integration (Razorpay, Stripe)
- [ ] Inventory management
- [ ] Admin dashboard UI
- [ ] Email receipts with PDF
- [ ] SMS notifications
- [ ] Reviews and ratings system
- [ ] Wishlist functionality
- [ ] Coupon/discount codes
- [ ] Analytics and reporting

---

## Support & Contact

For issues or questions:
- Email: admin@maadhuri.shop
- GitHub: [your-repo]
- Documentation: README.md

---

**Last Updated:** December 2024
**Version:** 1.0.0

# 🌾 Maadhuri Shop Backend - Quick Start Checklist

## ✅ What You Have Received

### Core Backend Files
- ✅ **server.js** - Main Express server
- ✅ **models/Product.js** - Product database schema
- ✅ **models/Order.js** - Order database schema
- ✅ **routes/products.js** - Product API endpoints
- ✅ **routes/orders.js** - Order management APIs
- ✅ **routes/cart.js** - Shopping cart APIs
- ✅ **routes/contact.js** - Contact & email APIs

### Configuration & Documentation
- ✅ **package.json** - All npm dependencies
- ✅ **.env.example** - Environment variables template
- ✅ **README.md** - Project overview
- ✅ **HOSTINGER-DEPLOYMENT.md** - Complete Hostinger deployment guide
- ✅ **COMPLETE-GUIDE.md** - Full technical documentation
- ✅ **React-Services.js** - Frontend integration examples
- ✅ **setup.sh** - Automated local setup script

---

## 🚀 Quick Start (5 Steps)

### Step 1: Local Development Setup (5 minutes)

```bash
# Navigate to your project folder
cd maadhuri-shop-backend

# Copy environment template
cp .env.example .env

# Install dependencies
npm install

# Start development server
npm run dev
```

**Result**: Backend running on `http://localhost:5000`

### Step 2: Configure MongoDB (10 minutes)

**Option A: MongoDB Atlas (Cloud) - Recommended**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string: `mongodb+srv://user:pass@cluster...`
4. Update `.env`:
   ```
   MONGODB_URI=your_connection_string_here
   ```

**Option B: Local MongoDB (Development)**
```
MONGODB_URI=mongodb://localhost:27017/maadhuri-shop
```

### Step 3: Setup Gmail for Emails (5 minutes)

1. Go to myaccount.google.com
2. Enable 2-Factor Authentication
3. Generate App Password (get 16-char password)
4. Update `.env`:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_16_char_app_password
   ```

### Step 4: Test Backend (2 minutes)

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Should return: {"status":"OK","timestamp":"..."}

# Get products (will be empty initially)
curl http://localhost:5000/api/products
```

### Step 5: Connect Frontend (5 minutes)

Update your React app's `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Or in your API service:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

---

## 📦 API Endpoints Summary

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get by category
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create new order → Generates WhatsApp link
- `GET /api/orders` - Get all orders
- `GET /api/orders/:orderId` - Get single order
- `PUT /api/orders/:orderId` - Update order status
- `GET /api/orders/customer/:email` - Get customer's orders

### Cart
- `POST /api/cart/add` - Add to cart
- `POST /api/cart/remove` - Remove from cart
- `POST /api/cart/update` - Update quantity
- `POST /api/cart/clear` - Clear cart

### Contact
- `POST /api/contact/send-message` - Send contact form
- `POST /api/contact/subscribe` - Newsletter subscription

---

## 🌐 Deployment to Hostinger (30 minutes)

### Complete Step-by-Step Guide

**See:** `HOSTINGER-DEPLOYMENT.md` (attached document)

Quick Overview:
1. Create MongoDB Atlas cluster (free tier)
2. Set up FTP/SSH access to Hostinger
3. Upload backend files
4. Create Node.js application in Hostinger Control Panel
5. Configure environment variables
6. Enable SSL certificate
7. Test endpoints
8. Update React app to use production domain

---

## 📝 Directory Structure

```
maadhuri-shop-backend/
├── server.js                    # Main server
├── package.json                 # Dependencies
├── .env                         # Configuration (NEVER commit!)
├── .env.example                 # Template
│
├── models/
│   ├── Product.js              # Product schema
│   └── Order.js                # Order schema
│
├── routes/
│   ├── products.js             # Product endpoints
│   ├── orders.js               # Order endpoints
│   ├── cart.js                 # Cart endpoints
│   └── contact.js              # Contact endpoints
│
└── docs/
    ├── README.md               # Overview
    ├── HOSTINGER-DEPLOYMENT.md # Deploy guide
    ├── COMPLETE-GUIDE.md       # Tech docs
    └── QUICK-START.md          # This file
```

---

## 🔗 Sample Frontend Integration

### Fetch Products
```javascript
fetch('http://localhost:5000/api/products')
  .then(res => res.json())
  .then(products => console.log(products));
```

### Create Order
```javascript
const orderData = {
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  customerPhone: '+919876543210',
  shippingAddress: {
    street: '123 Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001'
  },
  items: [
    { productId: '...', productName: 'Turmeric', quantity: 2, price: 250, unit: 'gm' }
  ],
  totalAmount: 500
};

fetch('http://localhost:5000/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(orderData)
})
.then(res => res.json())
.then(data => {
  console.log('Order ID:', data.orderId);
  // Redirect to WhatsApp
  window.open(data.whatsappLink);
});
```

---

## 🎯 Order Flow

```
1. Customer adds products to cart
         ↓
2. Customer fills checkout form
         ↓
3. POST /api/orders
         ↓
4. Order created in MongoDB
   - Unique order ID generated
   - Email sent to customer & admin
   - WhatsApp message created
         ↓
5. WhatsApp link generated
   - Customer clicks & messages
   - WhatsApp opens with order details
         ↓
6. Admin receives order
   - Reviews details
   - Confirms via WhatsApp
   - Updates order status
         ↓
7. Customer receives updates via email
   - Order confirmation
   - Shipping details
   - Delivery updates
```

---

## 🔐 Security Checklist

- [ ] .env file is in .gitignore (never commit)
- [ ] Use strong MongoDB password
- [ ] Use Gmail App Password (not regular password)
- [ ] Enable HTTPS in production
- [ ] Set CORS_ORIGIN to your domain
- [ ] Keep dependencies updated (`npm audit`)
- [ ] Regular MongoDB backups
- [ ] Monitor error logs

---

## 🐛 Troubleshooting

### "MongoDB Connection Failed"
```
Check:
1. Is MongoDB running? (mongod command)
2. Connection string correct?
3. IP whitelist (for MongoDB Atlas)?
```

### "Email not sending"
```
Check:
1. Using App Password? (not regular Gmail password)
2. 2-Factor auth enabled?
3. EMAIL_USER and EMAIL_PASSWORD correct?
```

### "CORS Error"
```
Check:
1. CORS_ORIGIN includes your domain?
2. Has https:// prefix?
3. Restarted server after .env change?
```

### "Port 5000 already in use"
```
Solution:
npm install -g http-server
# Or change PORT in .env to 5001, 5002, etc.
```

---

## 📞 Support

### Documentation Files (Read in Order)
1. **README.md** - Overview & quick start
2. **HOSTINGER-DEPLOYMENT.md** - Deploy to Hostinger
3. **COMPLETE-GUIDE.md** - Full technical docs
4. **React-Services.js** - Frontend code examples

### Common Resources
- Express.js: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- Mongoose: https://mongoosejs.com
- Nodemailer: https://nodemailer.com

---

## ✨ What's Included

### ✅ Complete Backend
- Express.js server with all routes
- MongoDB models with validation
- Email notifications (Nodemailer)
- WhatsApp order message generation
- Error handling & CORS setup

### ✅ Admin Features
- Manage all products
- Track all orders
- Update order status
- View dashboard statistics
- Filter & search orders

### ✅ Customer Features
- Browse products by category
- Search products
- Shopping cart management
- Create orders
- Track order history
- Contact forms & subscriptions

### ✅ Documentation
- API documentation
- Deployment guide
- Setup instructions
- React integration examples
- Troubleshooting guide

---

## 🎯 Next Steps (In Order)

### Week 1: Local Development
1. ✅ Install dependencies
2. ✅ Configure MongoDB locally
3. ✅ Test all API endpoints
4. ✅ Connect React frontend
5. ✅ Test complete order flow

### Week 2: Production Setup
1. ✅ Create MongoDB Atlas cluster
2. ✅ Set up Hostinger account
3. ✅ Follow HOSTINGER-DEPLOYMENT.md
4. ✅ Test production environment
5. ✅ Go live!

---

## 🎉 Success Checklist

- [ ] Backend server runs locally
- [ ] MongoDB connected and storing data
- [ ] Email notifications working
- [ ] Products can be created/viewed
- [ ] Orders can be created
- [ ] WhatsApp link generates correctly
- [ ] Frontend can communicate with backend
- [ ] Deployed to Hostinger
- [ ] Domain pointing to backend
- [ ] SSL certificate active

---

## 💡 Pro Tips

1. **Use Postman** to test API endpoints before frontend
2. **Check server logs** when things break (`npm run dev` shows all logs)
3. **Test locally first** before deploying to Hostinger
4. **Keep .env in .gitignore** - never commit passwords!
5. **Regular database backups** - MongoDB Atlas has automatic backups
6. **Monitor error logs** in Hostinger control panel

---

## 📊 Technology Summary

| Component | Technology | Version |
|-----------|-----------|---------|
| Server | Node.js + Express | 14+, 4.18+ |
| Database | MongoDB | 4.0+ |
| ORM | Mongoose | 7.0+ |
| Email | Nodemailer | 6.9+ |
| Frontend | React | 17+ |
| Hosting | Hostinger | Node.js support |

---

## 🚀 Ready to Launch?

1. **Local Testing Done?** → Move to Hostinger
2. **All APIs Working?** → Deploy to production
3. **Frontend Connected?** → Go live!
4. **Getting Orders?** → 🎉 Success!

---

**Built with ❤️ for Maadhuri Shop**

For any questions, refer to the detailed guides:
- HOSTINGER-DEPLOYMENT.md
- COMPLETE-GUIDE.md
- README.md

Good luck! 🌾✨

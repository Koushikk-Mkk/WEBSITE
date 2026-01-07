# 🎯 MAADHURI SHOP - BACKEND SETUP CHEAT SHEET

## 📋 One-Page Quick Reference

### 🚀 Installation (Copy & Paste)

```bash
# Step 1: Install dependencies
npm install

# Step 2: Copy environment template
cp .env.example .env

# Step 3: Start development server
npm run dev

# Step 4: Test in another terminal
curl http://localhost:5000/api/health
```

**Expected Output:** `{"status":"OK","timestamp":"..."}`

---

## ⚙️ .env Configuration (What to Change)

```env
# 1. MongoDB - Get from MongoDB Atlas
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/maadhuri-shop

# 2. Email - Gmail App Password (NOT regular password!)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx

# 3. WhatsApp - Your business number
WHATSAPP_PHONE_NUMBER=919876543210

# 4. Frontend Origin - Where your React app is
CORS_ORIGIN=http://localhost:3000

# 5. API Base URL - Where API is hosted
API_BASE_URL=http://localhost:5000
```

---

## 🌐 API Endpoints Cheat Sheet

### Products
```bash
# Get all products
GET http://localhost:5000/api/products

# Get by category
GET http://localhost:5000/api/products/category/Spices

# Get featured
GET http://localhost:5000/api/products/featured/all

# Create product (with body)
POST http://localhost:5000/api/products
```

### Orders
```bash
# Create order
POST http://localhost:5000/api/orders

# Get all orders
GET http://localhost:5000/api/orders

# Get single order
GET http://localhost:5000/api/orders/ORD-123456ABC

# Update order status
PUT http://localhost:5000/api/orders/ORD-123456ABC
```

### Cart
```bash
# Add to cart
POST http://localhost:5000/api/cart/add

# Remove from cart
POST http://localhost:5000/api/cart/remove

# Update quantity
POST http://localhost:5000/api/cart/update
```

---

## 🔗 Frontend Connection (Copy to Your React App)

```javascript
// services/api.js
const API_BASE_URL = 'http://localhost:5000/api';

// Get products
fetch(`${API_BASE_URL}/products`)
  .then(r => r.json())
  .then(data => console.log(data));

// Create order
fetch(`${API_BASE_URL}/orders`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customerName: 'John',
    customerEmail: 'john@example.com',
    customerPhone: '+919876543210',
    shippingAddress: {
      street: '123 Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    },
    items: [{
      productId: '...',
      productName: 'Turmeric',
      quantity: 2,
      price: 250,
      unit: 'gm'
    }],
    totalAmount: 500
  })
})
.then(r => r.json())
.then(data => window.open(data.whatsappLink)); // Open WhatsApp!
```

---

## 📁 File Structure at a Glance

```
maadhuri-shop-backend/
├── server.js (main file)
├── package.json (dependencies)
├── .env (YOUR CONFIG - KEEP SECRET!)
├── .env.example (template)
│
├── models/
│   ├── Product.js
│   └── Order.js
│
├── routes/
│   ├── products.js
│   ├── orders.js
│   ├── cart.js
│   └── contact.js
│
└── docs/
    ├── QUICK-START.md ← Read this first!
    ├── HOSTINGER-DEPLOYMENT.md ← For production
    ├── COMPLETE-GUIDE.md
    └── README.md
```

---

## 🐛 Common Issues & Quick Fixes

| Problem | Quick Fix |
|---------|-----------|
| **MongoDB not connecting** | Check MONGODB_URI, ensure IP whitelist in Atlas |
| **Email not sending** | Use Gmail App Password (not regular), enable 2FA |
| **CORS errors** | Update CORS_ORIGIN in .env, restart with `npm run dev` |
| **Port 5000 in use** | Change PORT to 5001 in .env or `kill -9 $(lsof -ti:5000)` |
| **Node not found** | Install Node.js from nodejs.org |
| **npm modules missing** | Run `npm install` again |

---

## 🧪 Test Commands (Copy & Paste)

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Create Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Turmeric","category":"Spices","description":"Pure","price":250,"quantity":500,"unit":"gm","inStock":true,"rating":4.5,"reviews":0}'
```

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName":"John",
    "customerEmail":"john@example.com",
    "customerPhone":"+919876543210",
    "shippingAddress":{"street":"123 St","city":"Mumbai","state":"MH","pincode":"400001"},
    "items":[{"productId":"abc","productName":"Turmeric","quantity":2,"price":250,"unit":"gm"}],
    "totalAmount":500
  }'
```

---

## 📱 WhatsApp Order Setup

### What Happens:
1. Customer creates order → POST /api/orders
2. Server creates WhatsApp message with order details
3. Response includes `whatsappLink` 
4. Click link → WhatsApp opens with pre-filled message
5. Customer hits Send → You get order on WhatsApp!

### Your WhatsApp Number:
Edit in `.env`:
```
WHATSAPP_PHONE_NUMBER=919876543210
```
(Replace with your actual WhatsApp-enabled number)

---

## 📊 Database Setup Steps

### Option 1: MongoDB Atlas (Recommended)
```
1. Go to mongodb.com/cloud/atlas
2. Create account
3. Create cluster (free tier)
4. Create database user
5. Whitelist your IP (0.0.0.0/0 for Hostinger)
6. Copy connection string
7. Paste in MONGODB_URI in .env
```

### Option 2: Local MongoDB
```
MONGODB_URI=mongodb://localhost:27017/maadhuri-shop
```

---

## 📧 Email Setup (Gmail)

### Steps:
1. Go to myaccount.google.com
2. Click **Security** (left sidebar)
3. Enable **2-Step Verification**
4. Go back to Security, find **App passwords**
5. Select **Mail** + **Windows Computer**
6. Copy 16-character password
7. Paste in `.env` as `EMAIL_PASSWORD`

---

## 🌐 Hostinger Deployment Quick Steps

1. **Create MongoDB Atlas cluster** (see Database Setup)
2. **Get Node.js on Hostinger** (Control Panel → Node.js)
3. **Upload files** via FTP
4. **Create .env** on server
5. **Install deps** with `npm install`
6. **Start app** in Node.js control panel
7. **Test** on yourdomain.com:5000
8. **Enable SSL** (Let's Encrypt)
9. **Go live!** 🎉

See `HOSTINGER-DEPLOYMENT.md` for detailed steps

---

## 📚 Documentation Priority

```
MUST READ:
1. INDEX.md (you are here)
2. QUICK-START.md
3. README.md

BEFORE DEPLOYMENT:
4. HOSTINGER-DEPLOYMENT.md

AS REFERENCE:
5. COMPLETE-GUIDE.md
6. PACKAGE-SUMMARY.md

FOR FRONTEND:
7. React-Services.js
```

---

## ✅ Pre-Launch Checklist

- [ ] `npm install` completed
- [ ] .env file configured
- [ ] `npm run dev` runs without errors
- [ ] `curl http://localhost:5000/api/health` works
- [ ] MongoDB connected (check logs)
- [ ] Email tested (test contact form)
- [ ] Frontend API calls work
- [ ] Order flow complete (product → cart → order → WhatsApp)
- [ ] Ready for Hostinger deployment

---

## 🚀 Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Hostinger account with Node.js
- [ ] Files uploaded via FTP
- [ ] .env configured on server
- [ ] `npm install` on server
- [ ] Node.js app started
- [ ] Domain pointed to server
- [ ] SSL certificate active
- [ ] APIs tested on production domain
- [ ] Frontend updated to production API URL
- [ ] Go live! 🎉

---

## 💡 Pro Tips

1. **Use Postman** to test APIs (postman.com)
2. **Check logs** when something fails (`npm run dev` output)
3. **MongoDB Atlas** has free tier + auto-backups
4. **Gmail App Password** is more secure than regular password
5. **.env is NEVER committed** to git (.gitignore handles this)
6. **Restart server** after editing .env file
7. **Keep dependencies updated** with `npm update`
8. **Regular backups** of MongoDB

---

## 🎯 Success Indicators

✅ **Working:**
- Server runs: `npm run dev`
- Health endpoint: GET /api/health
- Get products: GET /api/products
- Create order: POST /api/orders
- WhatsApp link generates
- Emails send successfully

✅ **Ready to Deploy:**
- Frontend connects to backend
- All APIs tested locally
- .env properly configured
- MongoDB has test data
- Email notifications working

✅ **Go Live:**
- Hostinger Node.js app running
- Domain active
- SSL enabled
- Production tests pass
- Orders coming in! 🎊

---

## 📞 When Things Break

### Server won't start?
```bash
npm run dev
# Check error output - usually .env or MongoDB issue
```

### APIs return 500 errors?
```
Check: MongoDB connected? Email config correct? .env has all values?
```

### Frontend can't reach backend?
```
Check: CORS_ORIGIN in .env? API_BASE_URL in frontend? Port 5000 open?
```

### Email not sending?
```
Check: Using App Password (not regular)? 2FA enabled? Credentials correct?
```

---

## 🎁 Quick Command Reference

```bash
# Start development
npm run dev

# Install/reinstall packages
npm install

# Check Node version
node --version

# Check npm version
npm --version

# Test API endpoint
curl http://localhost:5000/api/health

# View running processes on port 5000
lsof -ti:5000

# Kill process on port 5000
kill -9 $(lsof -ti:5000)

# Copy .env template
cp .env.example .env
```

---

## 📊 Technology Stack

```
┌─────────────┐
│   React     │ (Frontend)
└──────┬──────┘
       │ API Calls
       ↓
┌──────────────────┐
│ Express.js/Node  │ (This Backend)
└──────┬───────────┘
       │
   ┌───┴────────┐
   ↓            ↓
MongoDB       Gmail/Nodemailer
```

---

## 💰 Cost Breakdown

- **MongoDB Atlas:** Free tier (perfect for starting)
- **Gmail:** Free (with App Password)
- **Hostinger:** ~₹99/month (has Node.js support)
- **Domain:** ₹200-500/year (depending on registrar)
- **Total:** Very affordable! ✅

---

## 🎉 You're Ready!

Everything you need is in this package:
- ✅ Complete backend code
- ✅ All documentation
- ✅ Setup scripts
- ✅ Integration examples

**Start with:** `QUICK-START.md`
**Deploy with:** `HOSTINGER-DEPLOYMENT.md`
**Reference with:** `COMPLETE-GUIDE.md`

**Time to go live: ~2 hours**

Good luck with Maadhuri Shop! 🌾✨

---

**Last Updated:** December 2024
**Status:** ✅ Production Ready
**Version:** 1.0.0

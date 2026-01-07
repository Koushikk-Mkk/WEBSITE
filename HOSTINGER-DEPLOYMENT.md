# Maadhuri Shop - Hostinger Deployment Guide

Complete step-by-step guide to deploy your backend on Hostinger with your domain.

## 📋 Prerequisites

- [x] Hostinger account with domain
- [x] Node.js backend code (all files provided)
- [x] MongoDB Atlas account (free tier available)
- [x] Gmail account with App Password
- [x] FTP/SSH access to Hostinger

## 🔧 Part 1: MongoDB Setup

### Step 1: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create account or sign in
3. Create new project (name it "Maadhuri Shop")
4. Click "Build a Database"
5. Choose "Free" tier
6. Select region closest to India (e.g., Mumbai)
7. Create cluster (wait 5-10 minutes)

### Step 2: Set Up Database Access

1. Go to **Database Access**
2. Click **Add New Database User**
3. Create username: `maadhuri_user`
4. Generate strong password (save this!)
5. Set role to **Atlas Admin**
6. Click **Add User**

### Step 3: Configure IP Whitelist

1. Go to **Network Access**
2. Click **Add IP Address**
3. Choose **Allow Access from Anywhere** (for Hostinger)
   - Click **0.0.0.0/0**
   - Confirm
4. Now Hostinger can connect to MongoDB

### Step 4: Get Connection String

1. Go to **Clusters** → **Connect**
2. Choose **Drivers** → **Node.js**
3. Copy connection string
4. Example: `mongodb+srv://maadhuri_user:PASSWORD@cluster.mongodb.net/maadhuri-shop?retryWrites=true&w=majority`
5. Replace `PASSWORD` with your database user password

## 📧 Part 2: Gmail App Password Setup

### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account](https://myaccount.google.com)
2. Click **Security** (left sidebar)
3. Enable **2-Step Verification** (if not already enabled)
4. Complete verification process

### Step 2: Generate App Password

1. Go to **App passwords** (appears after 2FA is enabled)
2. Select **Mail** and **Windows Computer** (or relevant)
3. Google generates 16-character password
4. Copy this password (it's your EMAIL_PASSWORD in .env)

### Step 3: Keep Gmail Account Details

- EMAIL_USER = your_email@gmail.com
- EMAIL_PASSWORD = the 16-char app password

## 🚀 Part 3: Hostinger Setup

### Step 1: Add Node.js Application

1. Log in to Hostinger Control Panel
2. Go to **Hosting** → **Your Domain**
3. Click **Manage** or **cPanel**
4. Find **Node.js** app manager (or **Node.js Applications**)
5. Click **Create Application**
6. Configure:
   - **Name**: maadhuri-shop
   - **Node version**: 14.x or higher
   - **Application root**: public_html/maadhuri-backend
   - **Application startup file**: server.js
   - **Port**: 5000
7. Click **Create**

### Step 2: Upload Files via FTP

1. Connect to Hostinger via FTP using:
   - Host: your_ftp_host (from Hostinger)
   - Username: your_ftp_user
   - Password: your_ftp_password
   - Port: 21

2. Navigate to `/public_html`

3. Create folder: `maadhuri-backend`

4. Upload all these files:
   ```
   server.js
   package.json
   models/
   ├── Product.js
   ├── Order.js
   routes/
   ├── products.js
   ├── orders.js
   ├── cart.js
   ├── contact.js
   ```

### Step 3: Create .env File

1. In FTP, navigate to `maadhuri-backend` folder
2. Create new file: `.env`
3. Paste and edit this content:

```
# Production Settings
NODE_ENV=production
PORT=5000

# MongoDB
MONGODB_URI=mongodb+srv://maadhuri_user:YOUR_PASSWORD@cluster.mongodb.net/maadhuri-shop?retryWrites=true&w=majority

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_char_app_password
ADMIN_EMAIL=admin@yourdomain.com

# Domain
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
API_BASE_URL=https://yourdomain.com/api

# WhatsApp (update with your business phone)
WHATSAPP_PHONE_NUMBER=919876543210
```

## 💻 Part 4: Install Dependencies

### Option A: Via SSH (Recommended)

1. Go to Hostinger → **SSH Access** (in cPanel)
2. Get SSH credentials
3. Connect using terminal:
   ```bash
   ssh user@hostinger_server
   ```

4. Navigate and install:
   ```bash
   cd public_html/maadhuri-backend
   npm install
   ```

### Option B: Via Hostinger Control Panel

1. In **Node.js Applications**
2. Select your app
3. Go to **Install Dependencies**
4. Hostinger automatically runs `npm install`

## 🔗 Part 5: Configure Domain

### Step 1: Point Domain to Hostinger

1. Go to your domain registrar (Hostinger/GoDaddy/etc)
2. Update **Name Servers** to Hostinger's nameservers
3. Wait 24-48 hours for DNS propagation

### Step 2: Enable SSL Certificate

1. In Hostinger cPanel → **SSL/TLS**
2. Install **Let's Encrypt** (free) or AutoSSL
3. SSL automatically covers `yourdomain.com` and `www.yourdomain.com`

### Step 3: Create Subdomain for API (Optional)

1. In cPanel → **Addon Domains** or **Subdomains**
2. Create `api.yourdomain.com`
3. Point to same application folder
4. Update CORS_ORIGIN in .env to include this subdomain

## 🚀 Part 6: Start Node.js Application

1. Go to **Node.js Applications** in Hostinger control panel
2. Find your "maadhuri-shop" application
3. Click **Start** (or it should auto-start)
4. Status should show **Running**
5. Note the URL provided (usually `yourdomain.com:5000`)

## ✅ Part 7: Test Your Backend

### Test 1: Health Check
```bash
curl https://yourdomain.com:5000/api/health
# Should return: {"status":"OK","timestamp":"2024-..."}
```

### Test 2: Get Products (Empty at first)
```bash
curl https://yourdomain.com:5000/api/products
# Should return: []
```

### Test 3: Create a Test Product

Use Postman or CURL:

```bash
curl -X POST https://yourdomain.com:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Organic Turmeric",
    "category": "Spices",
    "description": "Pure turmeric powder",
    "price": 250,
    "quantity": 500,
    "unit": "gm",
    "inStock": true,
    "rating": 4.5,
    "reviews": 50
  }'
```

## 🎯 Part 8: Update Frontend

In your React app, update the API URL:

### .env file in React project:
```
REACT_APP_API_URL=https://yourdomain.com/api
```

### Or in services:
```javascript
const API_BASE_URL = 'https://yourdomain.com/api';
```

## 🔍 Part 9: Monitor & Troubleshoot

### View Logs in Hostinger

1. Go to **Node.js Applications**
2. Select your app
3. Click **View Logs**
4. Check for errors

### Common Issues

#### Port Already in Use
- Change PORT in .env to 5001, 5002, etc.

#### MongoDB Connection Failed
- Verify MONGODB_URI in .env
- Check if IP is whitelisted in MongoDB Atlas
- Test connection string locally first

#### Email Not Sending
- Verify EMAIL_USER and EMAIL_PASSWORD
- Check if Gmail allows less secure apps
- Try generating new App Password

#### CORS Errors
- Update CORS_ORIGIN in .env with your frontend domain
- Make sure to include `https://`

#### 502 Bad Gateway
- Restart Node.js application
- Check if port is correct (5000)
- Check error logs

## 📦 Part 10: Admin Dashboard Setup

Create basic admin panel to manage products and orders:

### Admin Panel URL
`https://yourdomain.com/admin`

### Sample Admin Features
- Add/edit/delete products
- View all orders
- Update order status
- Generate reports

### Create Protected Route (Example)
```javascript
// routes/admin.js
router.use('/api/admin', authenticate); // Protect with auth

router.get('/orders', async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});
```

## 🔒 Security Checklist

- [ ] .env file is NOT uploaded to GitHub
- [ ] MONGODB_URI uses strong password
- [ ] Email credentials are App Password, not main password
- [ ] SSL certificate is active
- [ ] CORS is restricted to your domain
- [ ] Node.js runs on port 5000 (not 80/443 directly)
- [ ] Regular backups of MongoDB database
- [ ] Monitor server logs regularly

## 📞 Support Resources

- **Hostinger Support**: https://support.hostinger.com
- **MongoDB Atlas Docs**: https://docs.mongodb.com/atlas
- **Express.js Docs**: https://expressjs.com
- **Node.js Docs**: https://nodejs.org/docs

## 🎉 Success Indicators

✅ Backend running on `https://yourdomain.com:5000`
✅ MongoDB storing products and orders
✅ Emails being sent for orders
✅ WhatsApp links generating correctly
✅ Frontend can connect to backend API
✅ Orders can be created and tracked

## Next Steps

1. Build React frontend (or use your existing HTML)
2. Integrate with backend APIs
3. Test order flow end-to-end
4. Set up monitoring and alerts
5. Create admin dashboard
6. Go live! 🎊

---

**Questions? Contact Hostinger Support or check the README.md**

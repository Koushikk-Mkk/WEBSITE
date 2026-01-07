# 🚀 Hostinger Deployment - Quick Start Guide

## ✅ What You Need

1. **Hostinger account** with domain
2. **MongoDB Atlas** (free) - Already set up ✅
3. **Backend files** - All included ✅
4. **Frontend** - `index.html` ✅

---

## 📦 What to Upload to Hostinger

### Backend Files (Upload ALL of these):
```
✅ server.js
✅ package.json
✅ package-lock.json
✅ models/ (entire folder)
✅ routes/ (entire folder)
✅ utils/ (entire folder)
✅ .env (create this with your values)
```

### Frontend Files (Upload to public_html or separate folder):
```
✅ index.html
```

**DO NOT upload:**
- ❌ node_modules/ (will be installed on Hostinger)
- ❌ .md files (documentation, not needed)
- ❌ .sh files (setup scripts)

---

## 🔧 Step-by-Step Deployment

### Step 1: Prepare .env File

Create `.env` file with these values:

```env
NODE_ENV=production
PORT=5000

# Your MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://smkoushikk_db_user:YOUR_PASSWORD@website.q6crihc.mongodb.net/maadhuri-shop?retryWrites=true&w=majority

# Email (Gmail App Password)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_char_app_password
ADMIN_EMAIL=smkoushikk@gmail.com

# WhatsApp
WHATSAPP_PHONE_NUMBER=919442661998

# CORS - Your domain
CORS_ORIGIN=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com
```

**Replace:**
- `YOUR_PASSWORD` with your MongoDB password
- `yourdomain.com` with your actual Hostinger domain

---

### Step 2: Upload Files to Hostinger

#### Option A: Via File Manager (Easiest)

1. Log in to **Hostinger Control Panel**
2. Go to **File Manager**
3. Navigate to your domain folder (usually `public_html`)
4. Create folder: `backend` (or `api`)
5. Upload all backend files to `backend/` folder:
   - `server.js`
   - `package.json`
   - `package-lock.json`
   - `models/` folder
   - `routes/` folder
   - `utils/` folder
   - `.env` file
6. Upload `index.html` to `public_html/` (root)

#### Option B: Via FTP

1. Use FileZilla or similar FTP client
2. Connect to Hostinger FTP
3. Upload backend files to `backend/` folder
4. Upload `index.html` to root

---

### Step 3: Set Up Node.js Application

1. In Hostinger Control Panel → **Node.js Applications**
2. Click **"Create Application"**
3. Configure:
   - **Name**: `maadhuri-shop-backend`
   - **Node.js Version**: `18.x` or `20.x` (latest)
   - **Application Root**: `/backend` (or wherever you uploaded)
   - **Application URL**: `yourdomain.com` (or subdomain like `api.yourdomain.com`)
   - **Application Startup File**: `server.js`
   - **Port**: `5000` (or leave default)
4. Click **"Create"**

---

### Step 4: Install Dependencies

1. In **Node.js Applications** → Select your app
2. Click **"Install Dependencies"**
3. Wait for `npm install` to complete (2-5 minutes)

**OR via SSH:**
```bash
cd backend
npm install --production
```

---

### Step 5: Set Environment Variables

1. In **Node.js Applications** → Your app → **Environment Variables**
2. Add each variable from your `.env` file:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `MONGODB_URI` = `your_connection_string`
   - `EMAIL_USER` = `your_email@gmail.com`
   - `EMAIL_PASSWORD` = `your_app_password`
   - `ADMIN_EMAIL` = `smkoushikk@gmail.com`
   - `WHATSAPP_PHONE_NUMBER` = `919442661998`
   - `CORS_ORIGIN` = `https://yourdomain.com`
   - `FRONTEND_URL` = `https://yourdomain.com`

3. Click **"Save"**

---

### Step 6: Start the Application

1. In **Node.js Applications** → Your app
2. Click **"Start"** (or it may auto-start)
3. Status should show **"Running"**
4. Note the URL (e.g., `yourdomain.com:5000` or `api.yourdomain.com`)

---

### Step 7: Update Frontend (index.html)

Open `index.html` and update the API URL:

**Find this line (around line 1693):**
```javascript
: (window.API_BASE_URL || 'YOUR_BACKEND_URL/api');
```

**Replace with your backend URL:**
```javascript
: (window.API_BASE_URL || 'https://yourdomain.com/api');
// OR if using subdomain:
: (window.API_BASE_URL || 'https://api.yourdomain.com/api');
```

**Upload updated `index.html` to Hostinger**

---

### Step 8: Test Everything

1. **Test Backend:**
   - Open: `https://yourdomain.com/api/health`
   - Should return: `{"status":"OK","timestamp":"..."}`

2. **Test Frontend:**
   - Open: `https://yourdomain.com`
   - Website should load
   - Products should load from backend

3. **Test API:**
   - Open browser console (F12)
   - Check for any errors
   - Try adding product to cart

---

## 🔒 Important Security Notes

- ✅ Never commit `.env` file to Git
- ✅ Use strong MongoDB password
- ✅ Use Gmail App Password (not regular password)
- ✅ Enable SSL/HTTPS on Hostinger
- ✅ Keep MongoDB Atlas IP whitelist updated

---

## 🐛 Troubleshooting

### Backend not starting?
- Check Node.js version (use 18.x or 20.x)
- Check `server.js` is in correct folder
- Check environment variables are set
- View logs in Hostinger → Node.js Applications → Logs

### MongoDB connection error?
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas Network Access allows `0.0.0.0/0`
- Check password is correct (URL-encode special characters)

### CORS errors?
- Update `CORS_ORIGIN` in environment variables
- Make sure it matches your frontend domain exactly
- Restart Node.js application

### Port issues?
- Hostinger may assign different port
- Check assigned port in Node.js Applications dashboard
- Update frontend API URL if port is different

---

## 📋 Checklist

- [ ] MongoDB Atlas cluster created
- [ ] MongoDB connection string ready
- [ ] Backend files uploaded to Hostinger
- [ ] Node.js application created
- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables set
- [ ] Application started
- [ ] Backend health check works (`/api/health`)
- [ ] Frontend `index.html` updated with backend URL
- [ ] Frontend uploaded to Hostinger
- [ ] Website loads and connects to backend
- [ ] SSL/HTTPS enabled

---

## 🎉 You're Done!

Your website should now be live at:
- **Frontend**: `https://yourdomain.com`
- **Backend API**: `https://yourdomain.com/api`

---

**Need help?** Check `HOSTINGER-DEPLOYMENT.md` for detailed instructions.



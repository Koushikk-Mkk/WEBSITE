# Deployment Notes - Email Notifications & API Setup

## ✅ Changes Made

### 1. Email Notifications Implemented
- **Sign-in notifications**: When admin signs in, email notification is sent to `smkoushikk@gmail.com`
- **Order notifications**: When a customer places an order:
  - Admin receives order notification at `smkoushikk@gmail.com`
  - Customer receives order confirmation email

### 2. Backend API Endpoints Added
- **POST /api/auth/login** - Admin login with email notification
- All existing order endpoints now send emails automatically

### 3. Frontend Updates
- Login form now calls backend API
- Order checkout now calls backend API
- API_BASE_URL configuration added (auto-detects localhost vs production)

## 📧 Email Configuration

### Required Environment Variables (.env file)
```env
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_gmail_app_password  # 16-character Gmail App Password
ADMIN_EMAIL=smkoushikk@gmail.com
ADMIN_PASSWORD=your_admin_password
```

### Gmail App Password Setup
1. Go to https://myaccount.google.com/security
2. Enable 2-Factor Authentication (if not already enabled)
3. Go to "App passwords"
4. Generate new app password for "Mail"
5. Copy the 16-character password
6. Use this as EMAIL_PASSWORD in .env (NOT your regular Gmail password)

## 🚀 Deployment Checklist

### Backend Deployment
1. ✅ Upload all files to your server (Hostinger, Render, Railway, etc.)
2. ✅ Install dependencies: `npm install`
3. ✅ Create `.env` file with all required variables
4. ✅ Set up MongoDB (MongoDB Atlas recommended)
5. ✅ Configure Gmail App Password
6. ✅ Start server: `npm start`

### Frontend Deployment (GitHub Pages)
1. ✅ Upload `index.html` to GitHub Pages
2. ✅ Update `API_BASE_URL` in index.html (line ~2817) to point to your backend API URL
   - Example: `const API_BASE_URL = 'https://yourdomain.com/api';`
   - Or set `window.API_BASE_URL` before the script loads

### Important Notes
- GitHub Pages only serves static files (HTML, CSS, JS)
- Backend must be hosted separately (cannot run on GitHub Pages)
- Backend options: Hostinger, Render, Railway, Heroku, AWS, etc.
- Make sure CORS is configured to allow your GitHub Pages domain

## 🔧 API Configuration

### Local Development
```javascript
// Automatically uses http://localhost:5000/api
```

### Production
```javascript
// Set in index.html before script execution
window.API_BASE_URL = 'https://your-backend-api.com/api';
// Or update the API_BASE_URL constant directly
```

## 📝 Testing

### Test Sign-in Notification
1. Start backend server
2. Open frontend
3. Click "Admin" and login
4. Check email at smkoushikk@gmail.com for sign-in notification

### Test Order Notification
1. Add products to cart
2. Fill checkout form
3. Place order
4. Check:
   - Customer email for order confirmation
   - smkoushikk@gmail.com for order notification

## ⚠️ Important Security Notes
- Never commit `.env` file to GitHub
- Use Gmail App Password, NOT regular password
- Change ADMIN_PASSWORD from default
- Keep EMAIL_USER and EMAIL_PASSWORD secure
- Use HTTPS in production

## 🐛 Troubleshooting

### Emails not sending
- Check EMAIL_USER and EMAIL_PASSWORD in .env
- Verify Gmail App Password is correct (16 characters, no spaces)
- Check server logs for email errors
- Verify 2FA is enabled on Gmail account

### API calls failing
- Check CORS settings in server.js
- Verify API_BASE_URL is correct
- Check backend server is running
- Check browser console for errors

### Login not working
- Verify ADMIN_EMAIL and ADMIN_PASSWORD in .env
- Check backend API is accessible
- Check browser console for API errors
- Fallback: Frontend has client-side login as backup

## 📞 Support

If you encounter issues:
1. Check server logs
2. Check browser console
3. Verify all environment variables are set correctly
4. Test API endpoints directly (using Postman or curl)
5. Verify MongoDB connection
6. Verify Gmail App Password is correct


# 🧪 Testing Guide - Email & Product Updates

## 📧 Part 1: Testing Email Functionality

Your website sends **3 types of emails**:
1. **Admin Sign-In Notification** - Sent to admin when admin logs in
2. **Order Confirmation to Customer** - Sent to customer when order is placed
3. **Order Notification to Admin** - Sent to admin when new order is placed

---

### ✅ Test 1: Admin Sign-In Email

**What to test:** When admin logs in, you should receive an email notification.

**Steps:**
1. Make sure backend is running
2. Open your website (`index.html` or deployed URL)
3. Click **"Admin"** button (top right)
4. Enter admin credentials:
   - Email: `smkoushikk@gmail.com` (or your ADMIN_EMAIL)
   - Password: Your admin password
5. Click **"Sign In"**

**Expected Result:**
- ✅ You should receive an email at `smkoushikk@gmail.com` (or your ADMIN_EMAIL)
- ✅ Email subject: `🔐 Admin Sign-In Notification - Maadhuri Shop`
- ✅ Email contains sign-in time and details

**Check Backend Logs:**
Look for this in your terminal:
```
✓ Sign-in notification sent to smkoushikk@gmail.com
```

**If email doesn't arrive:**
- Check backend terminal for errors
- Verify `EMAIL_USER` and `EMAIL_PASSWORD` in `.env` are correct
- Check spam/junk folder
- Verify Gmail App Password is correct (16 characters, no spaces)

---

### ✅ Test 2: Order Confirmation Email to Customer

**What to test:** When a customer places an order, they receive a confirmation email.

**Steps:**
1. Open your website
2. Add products to cart
3. Click **"Cart"** icon
4. Click **"Checkout"**
5. Fill in customer details:
   - Name: `Test Customer`
   - Email: **Use your real email** (to receive test email)
   - Phone: `919876543210`
   - Address: Fill all fields
6. Click **"Place Order"**

**Expected Result:**
- ✅ Customer receives email at the email address they entered
- ✅ Email subject: `✅ Order Confirmation - ORD-XXXXXX - Maadhuri Shop`
- ✅ Email contains:
  - Order ID
  - Order items with quantities
  - Total amount
  - Shipping address

**Check Backend Logs:**
Look for:
```
✓ Order confirmation sent to customer: customer@email.com
```

**If email doesn't arrive:**
- Check the email address you entered (check for typos)
- Check spam/junk folder
- Verify backend logs show email was sent
- Check `EMAIL_USER` and `EMAIL_PASSWORD` in `.env`

---

### ✅ Test 3: Order Notification Email to Admin

**What to test:** When a customer places an order, admin receives a notification email.

**Steps:**
1. Place an order (same as Test 2)
2. Use any customer email (doesn't have to be real)

**Expected Result:**
- ✅ Admin receives email at `smkoushikk@gmail.com` (or your ADMIN_EMAIL)
- ✅ Email subject: `🛒 New Order Received - ORD-XXXXXX - Maadhuri Shop`
- ✅ Email contains:
  - Order ID
  - Customer details (name, email, phone)
  - Order items
  - Total amount
  - Shipping address

**Check Backend Logs:**
Look for:
```
✓ Order notification sent to admin: smkoushikk@gmail.com
```

**If email doesn't arrive:**
- Check spam/junk folder
- Verify `ADMIN_EMAIL` in `.env` is correct
- Check backend logs for errors

---

## 🔄 Part 2: Testing Product Updates Across Devices

Your website has **automatic product polling** that checks for updates every **5 seconds**.

**How it works:**
- Frontend polls the API every 5 seconds
- Compares current products with new products
- Updates the UI automatically if products changed
- Works on all devices connected to the same backend

---

### ✅ Test 4: Product Update Sync Across Devices

**What to test:** When you update a product on one device, it should appear on all other devices within 5 seconds.

**Setup:**
1. **Device 1** (Admin laptop/computer):
   - Open website
   - Log in as admin
   - Keep this tab open

2. **Device 2** (Your phone or another browser):
   - Open the same website URL
   - Keep this tab open (don't need to be logged in)

**Test Steps:**

**Method 1: Add New Product**
1. On **Device 1** (Admin):
   - Click **"Admin"** → **"Add Product"**
   - Fill in product details:
     - Name: `Test Product Sync`
     - Category: `Spices`
     - Price: `100`
     - Description: `Testing sync`
     - Image: Any URL
   - Click **"Save Product"**

2. Watch **Device 2** (Phone/Other browser):
   - Within **5 seconds**, the new product should appear automatically
   - No refresh needed!

**Method 2: Update Existing Product**
1. On **Device 1** (Admin):
   - Find any product
   - Click **"Edit"**
   - Change the price (e.g., from `100` to `150`)
   - Click **"Update Product"**

2. Watch **Device 2**:
   - Within **5 seconds**, the price should update automatically
   - Product card should show new price

**Method 3: Delete Product**
1. On **Device 1** (Admin):
   - Click **"Delete"** on any product
   - Confirm deletion

2. Watch **Device 2**:
   - Within **5 seconds**, the product should disappear from the list

---

### ✅ Test 5: Verify Polling is Working

**Check Browser Console:**
1. Open website on any device
2. Press **F12** (or right-click → Inspect)
3. Go to **Console** tab
4. You should see API calls every 5 seconds:
   ```
   GET http://localhost:5000/api/products 200 OK
   ```
   (Or your backend URL if deployed)

**If you see errors:**
- Check backend is running
- Check API URL is correct in `index.html`
- Check network tab for failed requests

---

### ✅ Test 6: Multiple Devices Test

**Test with 3+ devices simultaneously:**

1. **Device 1:** Admin laptop (add/edit products)
2. **Device 2:** Your phone (view products)
3. **Device 3:** Another browser/device (view products)

**Steps:**
1. Open website on all 3 devices
2. On **Device 1**, add a new product
3. Watch **Device 2** and **Device 3**
4. Both should show the new product within 5 seconds

**Expected Result:**
- ✅ All devices show the same products
- ✅ Updates appear on all devices within 5 seconds
- ✅ No manual refresh needed

---

## 🔍 How to Verify Everything is Working

### Check Email Configuration

**Backend Terminal Should Show:**
```
✓ Email service is ready to send messages
```

If you see:
```
Email service configuration error: Error: Missing credentials
```
→ Your email credentials are wrong. Fix `.env` file.

---

### Check Product Polling

**Browser Console Should Show:**
- Network requests to `/api/products` every 5 seconds
- No errors in console
- Products loading successfully

**If polling stops:**
- Check browser console for errors
- Check backend is still running
- Refresh the page (polling restarts automatically)

---

## 🐛 Troubleshooting

### Emails Not Sending?

1. **Check `.env` file:**
   ```env
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_16_char_app_password  # NO SPACES!
   ADMIN_EMAIL=smkoushikk@gmail.com
   ```

2. **Verify Gmail App Password:**
   - Must be 16 characters
   - No spaces (remove spaces if copied with spaces)
   - Must be App Password, not regular password

3. **Check Backend Logs:**
   - Look for email errors in terminal
   - Check if email service is ready

4. **Test Email Service:**
   - Backend should show: `✓ Email service is ready to send messages`
   - If not, check credentials

---

### Product Updates Not Syncing?

1. **Check Backend is Running:**
   - Backend must be running for API to work
   - Test: Open `http://localhost:5000/api/products` in browser

2. **Check API URL:**
   - In `index.html`, verify `API_BASE_URL` is correct
   - Should be `http://localhost:5000/api` for local testing
   - Or your deployed backend URL for production

3. **Check Polling Interval:**
   - Default is 5 seconds
   - Check browser console for API calls every 5 seconds

4. **Check Network:**
   - All devices must be on same network (for local testing)
   - Or all devices must access same deployed backend (for production)

5. **Clear Browser Cache:**
   - Sometimes old data is cached
   - Hard refresh: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)

---

## 📋 Quick Test Checklist

### Email Tests:
- [ ] Admin sign-in sends email to admin
- [ ] Order placement sends email to customer
- [ ] Order placement sends email to admin
- [ ] All emails arrive within 1-2 minutes
- [ ] Email content is correct (order details, etc.)

### Product Sync Tests:
- [ ] New product appears on all devices within 5 seconds
- [ ] Product update appears on all devices within 5 seconds
- [ ] Product deletion appears on all devices within 5 seconds
- [ ] No manual refresh needed
- [ ] Browser console shows polling requests every 5 seconds

---

## 🎯 Production Testing

When deployed to Hostinger:

1. **Test Emails:**
   - Use real email addresses
   - Check spam folders
   - Verify emails arrive within 1-2 minutes

2. **Test Product Sync:**
   - Open website on phone
   - Open website on laptop
   - Update product on laptop
   - Verify it appears on phone within 5 seconds

3. **Test from Different Networks:**
   - Test from home network
   - Test from mobile data
   - Both should sync correctly (since backend is on internet)

---

## 💡 Tips

1. **Email Testing:**
   - Use your real email for customer test orders
   - Check spam folder if emails don't arrive
   - Gmail may delay emails by 1-2 minutes (normal)

2. **Product Sync Testing:**
   - Keep browser console open to see polling
   - Test with 2-3 devices simultaneously
   - Wait 5-10 seconds after making changes

3. **Backend Logs:**
   - Keep backend terminal visible
   - Watch for email confirmation messages
   - Check for any errors

---

**That's it! Follow these tests to verify everything is working correctly.** 🎉



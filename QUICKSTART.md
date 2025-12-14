# 🚀 OTT4YOU - QUICK START GUIDE

Get your OTT marketplace running in 10 minutes!

## ✅ What You Have

✅ Complete Next.js application  
✅ Modern UI with glassmorphism design  
✅ Google OAuth authentication  
✅ Razorpay payment integration  
✅ MongoDB database models  
✅ Admin panel  
✅ 6 OTT products with AI-generated logos  

## 📝 What You Need

### 1. **Google OAuth Client Secret**

You already have the Client ID: `567980162876-7p5glka7pjrr0k5e9tpi7f85lod25or3.apps.googleusercontent.com`

**To get the secret:**
1. Open your Google Cloud Console
2. Go to the client secret file you have open: `client_secret_567980162876...json`
3. Look for the field: `"client_secret": "..."`
4. Copy that value

### 2. **Razorpay Test Keys** (FREE)

1. Sign up at: https://dashboard.razorpay.com/signup
2. No credit card required for test mode
3. Go to: Settings → API Keys → Generate Test Keys
4. Copy both Key ID and Key Secret

**Free Forever:** ✅ Unlimited test transactions

### 3. **MongoDB Atlas** (FREE)

1. Sign up at: https://www.mongodb.com/cloud/atlas/register
2. Create M0 (FREE) cluster
3. Click "Connect" → "Connect your application"
4. Copy connection string
5. Replace `<password>` with your password
6. Add `/ott4you` at the end

**Example:** `mongodb+srv://user:pass@cluster.mongodb.net/ott4you?retryWrites=true&w=majority`

**Free Forever:** ✅ 512MB storage, no time limit

### 4. **NextAuth Secret**

**Windows PowerShell:**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

Copy the output.

## 🎬 Setup Steps

### Step 1: Navigate to Project
```bash
cd C:\Users\devas\.gemini\antigravity\scratch\ott4you
```

### Step 2: Install Dependencies
```bash
npm install
```
⏱️ Takes 2-3 minutes

### Step 3: Create Environment File

Create `.env.local` file in the project root with:

```env
# MongoDB Atlas
MONGODB_URI=your_mongodb_connection_string_here

# NextAuth
NEXTAUTH_SECRET=your_generated_secret_here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=567980162876-7p5glka7pjrr0k5e9tpi7f85lod25or3.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here

# Admin
ADMIN_EMAILS=devashishhswami@gmail.com
```

###Step 4: Add Google OAuth Redirect URL

1. Go to Google Cloud Console
2. Find your OAuth client
3. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Save

### Step 5: Run Development Server
```bash
npm run dev
```

🎉 Server starts at: http://localhost:3000

### Step 6: Seed Database

Open browser:  
http://localhost:3000/api/seed

You should see: `Successfully seeded 6 products`

### Step 7: Test!

1. **Homepage:** http://localhost:3000
   - See all 6 OTT products with logos
   - Sign in with Google

2. **Admin Panel:** http://localhost:3000/admin
   - Sign in with `devashishhswami@gmail.com`
   - Access admin features

3. **Test Purchase:**
   - Select any product
   - Choose 1, 3, or 6 months
   - Click "Subscribe Now"
   - Use test card: `4111 1111 1111 1111`
   - Any CVV, any future expiry

4. **Dashboard:** http://localhost:3000/dashboard
   - View your purchase history

## 🚀 Deploy to Production

### GitHub
```bash
git init
git add .
git commit -m "OTT4YOU marketplace"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

### Vercel
1. Go to https://vercel.com
2. Import GitHub repo
3. Add all environment variables from `.env.local`
4. **Change `NEXTAUTH_URL` to**: `https://your-app.vercel.app`
5. Deploy

### Update Google OAuth
Add production redirect URI:  
`https://your-app.vercel.app/api/auth/callback/google`

## 🎯 Features Overview

### User Features
- ✅ Google Sign-In
- ✅ Browse 6 OTT platforms
- ✅ Choose 1/3/6 month subscriptions
- ✅ Secure Razorpay payments
- ✅ Purchase history dashboard
- ✅ Total spending tracker

### Admin Features
- ✅ Statistics dashboard (revenue, orders, users)
- ✅ Product management (create, edit, delete)
- ✅ Order management with filters
- ✅ User management with stats
- ✅ Maintenance mode toggle
- ✅ Custom maintenance message

### Available Products
1. **Prime Video** - ₹299/799/1499
2. **Spotify** - ₹119/329/599
3. **YouTube Premium** - ₹149/399/749
4. **JioHotstar** - ₹299/799/1499
5. **Jio Saavn** - ₹99/279/499
6. **SonyLIV** - ₹299/699/1299

## 💰 Total Cost

| Service | Cost |
|---------|------|
| Vercel Hosting | **FREE** |
| MongoDB Atlas | **FREE** |
| Razorpay Test Mode | **FREE** |
| Google OAuth | **FREE** |
| **TOTAL** | **₹0/month** |

## 🆘 Troubleshooting

### "Module not found" errors
```bash
npm install
```

### Can't connect to MongoDB
- Check connection string format
- Ensure IP is whitelisted in Atlas
- Check password is correct

### Google Sign-In fails
- Verify redirect URI is added
- Check Client ID and Secret
- Ensure NEXTAUTH_URL is correct

### Payment not working
- Verify Razorpay keys are test keys
- Use test card: `4111 1111 1111 1111`
- Check console for errors

### Seed fails
- Ensure MongoDB is connected
- Check if products already exist
- Delete all products and try again

## 📚 Documentation

- **Full README:** [README.md](file:///C:/Users/devas/.gemini/antigravity/scratch/ott4you/README.md)
- **Complete Walkthrough:** Check artifacts folder
- **Implementation Plan:** Detailed architecture docs

## ✨ Next Steps

1. ✅ Install Node.js (if needed)
2. ✅ Get all credentials (Google, Razorpay, MongoDB)
3. ✅ Create `.env.local`
4. ✅ Run `npm install`
5. ✅ Run `npm run dev`
6. ✅ Visit `/api/seed`
7. ✅ Test everything
8. ✅ Deploy to Vercel
9. ✅ Push to GitHub

## 🎉 You're Ready!

Your OTT marketplace is complete and ready to use. All free services, no hidden costs!

**Questions?** Email: devashishhswami@gmail.com

---

**Built with ❤️ using Next.js, MongoDB, and Razorpay**

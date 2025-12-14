# OTT4YOU 🎬

A premium OTT subscription marketplace built with Next.js, MongoDB, and Razorpay. Buy subscriptions for Prime Video, Spotify, YouTube Premium, JioHotstar, Jio Saavn, and SonyLIV at the best prices!

![OTT4YOU Banner](https://img.shields.io/badge/OTT4YOU-Premium%20Subscriptions-8b5cf6?style=for-the-badge)

## ✨ Features

### User Features
- 🔐 **Google OAuth Authentication** - Secure sign-in with Google
- 🛒 **Product Catalog** - Browse all OTT platforms with beautiful cards
- 💳 **Razorpay Integration** - Secure payment processing
- 📊 **User Dashboard** - View purchase history and total spending
- 🎨 **Modern UI** - Glassmorphism design with smooth animations
- 📱 **Responsive Design** - Works perfectly on all devices

### Admin Features
- 👨‍💼 **Admin Panel** - Comprehensive admin dashboard
- 📦 **Product Management** - Create, edit, delete products
- 🛒 **Order Management** - View all orders and filter by status
- 👥 **User Management** - View all users and their statistics
- 🔧 **Maintenance Mode** - Toggle site-wide maintenance mode
- 📈 **Analytics** - Revenue, orders, and user statistics

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js v5 with Google OAuth
- **Payment**: Razorpay
- **Styling**: Vanilla CSS with modern design system
- **Deployment**: Vercel
- **Database Hosting**: MongoDB Atlas

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- MongoDB Atlas account (free tier)
- Google Cloud Console account (for OAuth)
- Razorpay account (free test mode)
- Vercel account (for deployment)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ott4you
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string

# NextAuth Configuration
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=567980162876-7p5glka7pjrr0k5e9tpi7f85lod25or3.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Admin Configuration
ADMIN_EMAILS=devashishhswami@gmail.com
```

### 4. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free M0 cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Add `/ott4you` at the end: `mongodb+srv://username:password@cluster.mongodb.net/ott4you?retryWrites=true&w=majority`

**Free Tier Limits:**
- ✅ 512 MB storage
- ✅ Shared RAM
- ✅ **Lifetime free** - No time limit!

### 5. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Application type: "Web application"
6. Add authorized redirect URIs:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://ott4you.vercel.app/api/auth/callback/google` (replace with your Vercel URL)
7. Copy Client ID and Client Secret to `.env.local`

### 6. Razorpay Setup

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up for free (no credit card required for test mode)
3. Go to Settings → API Keys
4. Generate Test Keys (Key ID & Key Secret)
5. Copy to `.env.local`

**Free Test Mode:**
- ✅ **Unlimited testing** - No expiration
- ✅ Test payments with test cards
- ✅ No actual money processed
- ℹ️ Activate live mode when ready to accept real payments (requires KYC)

### 7. Generate NextAuth Secret

```bash
# On macOS/Linux
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

Add the generated string to `NEXTAUTH_SECRET` in `.env.local`

### 8. Seed Database

Start the development server and visit:

```bash
npm run dev
```

Then navigate to: `http://localhost:3000/api/seed`

This will populate your database with sample products for all 6 OTT platforms.

## 🌐 Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - Add all variables from `.env.local`
   - **Important**: Update `NEXTAUTH_URL` to your Vercel URL:
     ```
     NEXTAUTH_URL=https://ott4you.vercel.app
     ```

5. Click "Deploy"

**Vercel Free Tier:**
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ **Free forever** for personal projects!

### 3. Update Google OAuth Redirect URI

After deployment, add your Vercel URL to Google Cloud Console:

1. Go to Google Cloud Console → Credentials
2. Edit your OAuth client
3. Add authorized redirect URI:
   ```
   https://your-app.vercel.app/api/auth/callback/google
   ```
4. Save

## 📱 Usage

### For Users

1. **Sign In**: Click "Sign in with Google"
2. **Browse Products**: View all OTT subscriptions on the homepage
3. **Select Duration**: Choose 1, 3, or 6 months
4. **Purchase**: Click "Subscribe Now" and complete payment
5. **Dashboard**: View your purchase history

### For Admin

1. **Access Admin Panel**: Sign in with admin email (`devashishhswami@gmail.com`)
2. **Manage Products**: Create, edit, or delete products
3. **View Orders**: See all purchases with filtering options
4. **Manage Users**: View user statistics and purchase history
5. **Maintenance Mode**: Toggle site-wide maintenance when needed

## 🎯 API Endpoints

### Public Endpoints
- `GET /api/products` - Get all active products
- `GET /api/products/[id]` - Get single product
- `GET /api/seed` - Seed database with initial products

### Authenticated Endpoints
- `POST /api/payment/create` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment and create order
- `GET /api/orders` - Get user orders (or all for admin)

### Admin Endpoints
- `POST /api/products` - Create product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product
- `GET /api/admin/settings` - Get settings
- `PUT /api/admin/settings` - Update settings (maintenance mode)

## 🎨 Design Features

- **Glassmorphism**: Modern glass effect cards
- **Gradient Backgrounds**: Vibrant purple-blue gradients
- **Smooth Animations**: Fade-in, slide-in, and hover effects
- **Dark Theme**: Eye-friendly dark mode by default
- **Responsive**: Mobile-first design approach
- **Custom Scrollbar**: Styled scrollbar matching theme

## 🔒 Security Features

- Server-side authentication with NextAuth.js
- Payment signature verification
- Admin role-based access control
- Environment variables for sensitive data
- HTTPS in production (Vercel)

## 📊 Admin Statistics

The admin panel shows:
- Total revenue from all completed orders
- Total number of orders
- Total registered users
- Total active products
- Recent orders table
- User purchase statistics

## 🛡️ Testing Payments

Use these Razorpay test cards in test mode:

**Successful Payment:**
- Card: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

**Failed Payment:**
- Card: `4000 0000 0000 0002`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues or questions:
- Create an issue on GitHub
- Email: devashishhswami@gmail.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for free hosting
- MongoDB Atlas for free database
- Razorpay for payment processing
- Google for OAuth authentication

---

**Made with ❤️ by OTT4YOU Team**

## 🚀 Quick Start Summary

```bash
# 1. Install dependencies
npm install

# 2. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# 3. Run development server
npm run dev

# 4. Seed database
# Visit http://localhost:3000/api/seed

# 5. Access application
# User site: http://localhost:3000
# Admin panel: http://localhost:3000/admin

# 6. Build for production
npm run build

# 7. Deploy to Vercel
# Push to GitHub and import on Vercel
```

🎉 **Your OTT marketplace is ready!**

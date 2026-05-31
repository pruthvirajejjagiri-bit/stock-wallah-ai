# Stock Wallah AI

**AI-Powered Trading & Market Intelligence Platform**

Learn. Practice. Master. Stock Market Trading.

---

## 🚀 Quick Start

- **Download:** Google Play Store (Coming Soon)
- **First Trade:** Start with ₹10 Lakhs virtual capital
- **AI Assistant:** Real-time chat support powered by Claude
- **Learn:** 50+ educational articles & guides

---

## ✨ Features

### 📊 Paper Trading
- ₹10,00,000 virtual capital (no real money)
- Practice trading in real market conditions
- Track P&L, win rate, and performance metrics

### 📈 Real-Time Market Data
- NSE & BSE stock prices (1-2 second delay)
- Technical indicators (RSI, MACD, Bollinger Bands)
- Volume analysis & momentum signals

### 🤖 AI Chatbot
- 24/7 support powered by Claude AI
- Market analysis & trading insights
- Educational Q&A assistance

### 📰 News & Sentiment
- 50+ global news sources aggregated
- AI sentiment analysis (bullish/bearish)
- Market impact assessment

### 🔍 Smart Screener
- Filter stocks by technical indicators
- Customizable screening criteria
- Results with AI-generated insights

### 💳 Premium Plans
- Free tier: Basic features
- ₹10/day: Advanced indicators
- ₹299/month: Full screener + AI analysis
- ₹2,499/month: Everything + priority support

---

## 🏗️ Architecture

```
Frontend (React Native)
    ↓
Backend (Express.js)
    ↓
Database (PostgreSQL - Supabase)
    ↓
External APIs (Claude AI, Market Data)
    ↓
Cloud Infrastructure (Google Cloud Run)
```

### Technology Stack

| Component | Technology |
|-----------|-----------|
| Mobile | React Native |
| Backend | Node.js + Express.js |
| Database | PostgreSQL (Supabase) |
| AI | Claude API (Anthropic) |
| Hosting | Google Cloud Run |
| Storage | Google Cloud Storage |
| Auth | Gmail OAuth + OTP |
| Payment | Google Play Billing + Apple IAP |

---

## 📱 Installation

### Prerequisites
- Node.js 16+
- npm or yarn
- Git
- Claude API key
- Google Cloud account
- Supabase account

### Clone Repository
```bash
git clone https://github.com/stockwallah-ai/stock-wallah-ai.git
cd stock-wallah-ai
```

### Install Dependencies
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ../mobile && npm install
```

### Environment Setup
```bash
# Create .env file in root
cp .env.example .env

# Add your credentials:
CLAUDE_API_KEY=your_key_here
SUPABASE_URL=your_url_here
SUPABASE_KEY=your_key_here
GOOGLE_CLOUD_KEY=your_key_here
```

---

## 🔐 Security & Compliance

✅ **SEBI-Compliant** (Educational platform, not investment advisor)
✅ **Encrypted** (AES-256-GCM for sensitive data)
✅ **Secure Auth** (OAuth 2.0 + OTP + Biometric)
✅ **Privacy** (GDPR-compliant, no data selling)
✅ **Terms** (Strict liability disclaimers)

See [LEGAL_COMPLIANCE/](./LEGAL_COMPLIANCE/) for full documentation.

---

## 📂 Folder Structure

```
stock-wallah-ai/
├── README.md (this file)
├── LAUNCH_NOW.md (quick launch guide)
├── START_HERE.md (getting started)
├── INDEX.md (complete file index)
│
├── APPLICATION/
│   └── PLATFORM_OVERVIEW.md
│
├── DOCUMENTATION/
│   ├── ARCHITECTURE.md
│   ├── AUTH_AND_SECURITY_GUIDE.md
│   ├── DESIGN_SYSTEM.md
│   └── ADVANCED_NEWS_SYSTEM.md
│
├── LEGAL_COMPLIANCE/
│   ├── SEBI_COMPLIANCE_FRAMEWORK.md
│   ├── FEATURE_RISK_ASSESSMENT.md
│   ├── STRICT_TERMS_OF_SERVICE.md
│   └── PRIVACY_POLICY_GDPR.md
│
├── DEPLOYMENT/
│   ├── COMPLETE_PRODUCTION_DEPLOYMENT.md
│   └── FINAL_MARKET_LAUNCH_CHECKLIST.md
│
├── GUIDES/
│   ├── YOUR_INTERVENTION_COMPLETE_GUIDE.md
│   ├── ALL_LINKS_AND_URLS.md
│   ├── 5_CLICK_LAUNCH.md
│   ├── FULLY_AI_AUTOMATION.md
│   ├── ZERO_COST_LAUNCH_STRATEGY.md
│   ├── REVENUE_ESTIMATION.md
│   └── LOGO_BRAND_GUIDE.md
│
├── backend/ (Node.js/Express API)
├── frontend/ (React web app)
├── mobile/ (React Native iOS/Android)
├── database/ (PostgreSQL schemas)
└── docs/ (Additional documentation)
```

---

## 🚀 Deployment

### Option 1: Google Cloud Run (Recommended)
```bash
# Backend deployment
gcloud run deploy stock-wallah-api \
  --source . \
  --platform managed \
  --region asia-south1
```

### Option 2: Vercel / Netlify
Suitable for frontend only. Backend must run on cloud platform.

See [DEPLOYMENT/COMPLETE_PRODUCTION_DEPLOYMENT.md](./DEPLOYMENT/COMPLETE_PRODUCTION_DEPLOYMENT.md) for details.

---

## 📊 Business Model

### Revenue Streams
1. **In-app subscriptions** (₹10, ₹299, ₹2,499 tiers)
2. **Premium features** (Advanced screener, AI insights)
3. **Affiliate program** (Broker partnerships)
4. **Educational content** (Courses, webinars - future)

### Financial Projections (Year 1)
- **Conservative:** ₹420K revenue, ₹180K profit
- **Realistic:** ₹2.28M revenue, ₹1.2M profit
- **Optimistic:** ₹5M revenue, ₹4M profit

See [GUIDES/REVENUE_ESTIMATION.md](./GUIDES/REVENUE_ESTIMATION.md)

---

## 🤖 AI Integration

### Claude API Usage
- **Support Chatbot:** Answer 80% of user questions
- **News Analysis:** Sentiment + market impact
- **Screener Insights:** AI analysis of results
- **Content Generation:** Blog posts, social media
- **Bug Detection:** Automated error analysis

**Monthly Cost:** ₹5,000-10,000 (scales with users)

See [GUIDES/FULLY_AI_AUTOMATION.md](./GUIDES/FULLY_AI_AUTOMATION.md)

---

## 📋 Launch Checklist

- ✅ All accounts created (Google Play, Cloud, Claude API, GitHub, Supabase)
- ✅ Infrastructure deployed
- ⏳ Google Play verification (24-48 hours)
- ⏳ Build APK
- ⏳ Submit to Play Store
- ⏳ App goes LIVE

See [DEPLOYMENT/FINAL_MARKET_LAUNCH_CHECKLIST.md](./DEPLOYMENT/FINAL_MARKET_LAUNCH_CHECKLIST.md)

---

## 🎯 Success Metrics

### Year 1 Targets
- **Downloads:** 50,000
- **Active Users:** 10,000
- **Monthly Revenue:** ₹385,000 (Month 12)
- **Retention:** 85%+
- **Rating:** 4.5+ stars

See [GUIDES/REVENUE_ESTIMATION.md](./GUIDES/REVENUE_ESTIMATION.md)

---

## 📞 Support

- **Email:** support@stockwallah.ai
- **Chat:** In-app AI chatbot (24/7)
- **Issues:** GitHub Issues
- **Discord:** [Coming Soon]

---

## 📜 License

© 2026 Stock Wallah AI. All rights reserved.

**Disclaimer:** Stock Wallah AI is an educational platform, NOT an investment advisor. Users are responsible for their own trading decisions. We are not liable for any trading losses.

See [LEGAL_COMPLIANCE/STRICT_TERMS_OF_SERVICE.md](./LEGAL_COMPLIANCE/STRICT_TERMS_OF_SERVICE.md)

---

## 🚀 Ready to Launch?

👉 **START HERE:** [START_HERE.md](./START_HERE.md)

👉 **QUICK LAUNCH:** [5_CLICK_LAUNCH.md](./GUIDES/5_CLICK_LAUNCH.md)

👉 **FULL GUIDE:** [YOUR_INTERVENTION_COMPLETE_GUIDE.md](./GUIDES/YOUR_INTERVENTION_COMPLETE_GUIDE.md)

---

**Built with ❤️ by Stock Wallah AI**

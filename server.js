'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const DISCLAIMER =
  'Education and virtual simulation only. Not investment advice. No buy/sell calls or guaranteed profits.';

app.use(cors());
app.use(express.json({ limit: '8mb' }));

const indices = [
  { symbol: 'NIFTY 50', price: 23547.75, changePct: -1.5, mood: 'Weak' },
  { symbol: 'SENSEX', price: 74775.74, changePct: -1.44, mood: 'Weak' },
  { symbol: 'BANK NIFTY', price: 51832.6, changePct: -0.42, mood: 'Neutral' },
  { symbol: 'FIN NIFTY', price: 23410.55, changePct: 0.29, mood: 'Stable' },
  { symbol: 'INDIA VIX', price: 16.42, changePct: 8.17, mood: 'Volatile' }
];

const lessons = [
  { id: 'l1', title: 'Stock kya hota hai?', level: 'Beginner', xp: 20, minutes: 4 },
  { id: 'l2', title: 'NIFTY aur SENSEX simple explanation', level: 'Beginner', xp: 20, minutes: 5 },
  { id: 'l3', title: 'Risk management basics', level: 'Beginner', xp: 25, minutes: 6 },
  { id: 'l4', title: 'Candlestick basics', level: 'Intermediate', xp: 30, minutes: 7 },
  { id: 'l5', title: 'Option chain education', level: 'Intermediate', xp: 35, minutes: 8 }
];

const news = [
  { id: 'n1', title: 'Market opens cautious as volatility rises', sentiment: 'NEUTRAL', source: 'Demo feed' },
  { id: 'n2', title: 'Banking sector remains in focus for learners', sentiment: 'NEUTRAL', source: 'Demo feed' },
  { id: 'n3', title: 'Education note: understand risk before real investing', sentiment: 'RISK NOTE', source: 'Demo feed' }
];

const safeLabels = [
  'AI Insight',
  'Screener Match',
  'Educational View',
  'Market Observation',
  'Risk Note',
  'Watchlist Idea',
  'Learning Signal'
];

const disabledFlags = [
  'buyRecommendations',
  'sellRecommendations',
  'personalizedStockAdvice',
  'paidTradingCalls',
  'intradayCalls',
  'optionsCalls',
  'targetPriceRecommendation',
  'stopLossRecommendation',
  'portfolioAdvisory'
];

app.get('/', (_req, res) => {
  res.json({
    app: 'Stock Wallah AI Backend',
    status: 'ok',
    message: 'Use /health, /api/indices, /api/lessons, /api/news, or /api/legal/disclaimer.',
    disclaimer: DISCLAIMER
  });
});

app.get('/health', (_req, res) => {
  res.json({
    app: 'Stock Wallah AI Backend',
    status: 'ok',
    mode: process.env.APP_MODE || 'demo',
    disclaimer: DISCLAIMER
  });
});

app.get('/api/indices', (_req, res) => {
  res.json({
    success: true,
    items: indices,
    disclaimer: DISCLAIMER
  });
});

app.get('/api/lessons', (_req, res) => {
  res.json({
    success: true,
    items: lessons,
    disclaimer: DISCLAIMER
  });
});

app.get('/api/news', (_req, res) => {
  res.json({
    success: true,
    items: news,
    disclaimer: DISCLAIMER
  });
});

app.get('/api/legal/disclaimer', (_req, res) => {
  res.json({
    success: true,
    disclaimer:
      'Stock Wallah AI is for education, information, and virtual simulation only. We do not provide investment advice, buy/sell calls, trading tips, portfolio advisory, or guaranteed profits. We are not responsible for real-world financial losses.',
    shortDisclaimer: 'For education and virtual practice only. Not investment advice.',
    safeLabels,
    disabledFlags
  });
});

app.post('/api/auth/register-profile', (req, res) => {
  const { fullName, email, mobile, acceptedRisk } = req.body || {};

  if (!fullName || !email || !mobile) {
    return res.status(400).json({
      success: false,
      error: 'Full name, email, and mobile are required.'
    });
  }

  if (!acceptedRisk) {
    return res.status(400).json({
      success: false,
      error: 'Risk disclaimer acceptance is required.'
    });
  }

  res.json({
    success: true,
    user: {
      id: 'demo-user-1',
      fullName,
      email: email.toLowerCase(),
      mobile,
      isPro: false
    }
  });
});

app.post('/api/ai/ask', (req, res) => {
  const question = (req.body?.question || '').trim();

  res.json({
    success: true,
    label: 'Educational View',
    answer:
      question.length > 0
        ? `Stock Wallah AI educational answer: ${question}. Learn the concept, check risk, and avoid real-money decisions without professional guidance.`
        : 'Ask a market learning question to get an educational answer.',
    disclaimer: DISCLAIMER
  });
});

app.post('/api/ai/chart-analysis', (_req, res) => {
  res.json({
    success: true,
    label: 'AI Insight',
    trendStrength: 'Moderate',
    sentiment: 'Neutral',
    keyLevels: ['Support zone', 'Resistance zone'],
    disclaimer: DISCLAIMER
  });
});

app.post('/api/subscription/check-trial-eligibility', (req, res) => {
  const { email, deviceId } = req.body || {};

  if (!email || !deviceId) {
    return res.status(400).json({
      success: false,
      error: 'email and deviceId are required'
    });
  }

  res.json({
    success: true,
    eligible: true,
    reason: null
  });
});

app.get('/api/subscription/status', (_req, res) => {
  res.json({
    success: true,
    isPro: false,
    subscription: null
  });
});

app.listen(PORT, () => {
  console.log(`Stock Wallah AI backend running on port ${PORT}`);
});

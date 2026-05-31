require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const app = express();

app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Stock Wallah AI Backend'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Stock Wallah AI API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      trading: '/api/trading',
      portfolio: '/api/portfolio',
      screener: '/api/screener',
      news: '/api/news',
      chat: '/api/chat'
    }
  });
});

// Auth routes
app.post('/api/auth/login', (req, res) => {
  res.json({ message: 'Login endpoint', status: 'pending_implementation' });
});

app.post('/api/auth/register', (req, res) => {
  res.json({ message: 'Register endpoint', status: 'pending_implementation' });
});

// Trading routes
app.get('/api/trading/stocks', (req, res) => {
  res.json({ message: 'Get stocks list', status: 'pending_implementation' });
});

app.post('/api/trading/buy', (req, res) => {
  res.json({ message: 'Buy stock', status: 'pending_implementation' });
});

app.post('/api/trading/sell', (req, res) => {
  res.json({ message: 'Sell stock', status: 'pending_implementation' });
});

// Portfolio routes
app.get('/api/portfolio/positions', (req, res) => {
  res.json({ message: 'Get positions', status: 'pending_implementation' });
});

app.get('/api/portfolio/performance', (req, res) => {
  res.json({ message: 'Get performance', status: 'pending_implementation' });
});

// Screener routes
app.get('/api/screener/results', (req, res) => {
  res.json({ message: 'Get screener results', status: 'pending_implementation' });
});

// News routes
app.get('/api/news/latest', (req, res) => {
  res.json({ message: 'Get latest news', status: 'pending_implementation' });
});

// Chat/AI routes
app.post('/api/chat/message', (req, res) => {
  res.json({ message: 'Chat with AI', status: 'pending_implementation' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.path });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Stock Wallah Backend running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

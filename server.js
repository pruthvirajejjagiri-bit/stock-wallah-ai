/**
 * BullEdge — Production Backend Server
 * NSE India Proxy Bridge + News Aggregator + Supabase Sync
 * Node.js / Express
 */

'use strict';

const express        = require('express');
const axios          = require('axios');
const cors           = require('cors');
const cron           = require('node-cron');
const { createClient } = require('@supabase/supabase-js');
const moment         = require('moment-timezone');

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── Environment ─────────────────────────────────────────────────────────────
const SUPABASE_URL    = process.env.SUPABASE_URL;
const SUPABASE_KEY    = process.env.SUPABASE_SERVICE_KEY;   // service-role key (server-side only)
const NEWSDATA_KEY    = process.env.NEWSDATA_API_KEY;       // newsdata.io API key
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '*').split(',');

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('[BOOT] SUPABASE_URL and SUPABASE_SERVICE_KEY are required');
  process.exit(1);
}

// ─── Supabase client (service role — never exposed to client) ─────────────────
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false }
});

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({ origin: ALLOWED_ORIGINS }));
app.use(express.json());
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ─── NSE Session Manager ─────────────────────────────────────────────────────
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64; rv:125.0) Gecko/20100101 Firefox/125.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
];

const NSE_BASE     = 'https://www.nseindia.com';
const NSE_API_BASE = 'https://www.nseindia.com/api';

let nseSession = {
  cookies:     '',
  userAgent:   USER_AGENTS[0],
  initialized: false,
  lastInit:    0,
};

/**
 * Rotate user-agent and re-initialize NSE session by hitting the homepage
 * to capture Set-Cookie headers. NSE requires a valid session before API calls.
 */
async function initNSESession() {
  const now      = Date.now();
  const SESSION_TTL = 9 * 60 * 1000; // re-init every 9 minutes

  if (nseSession.initialized && (now - nseSession.lastInit) < SESSION_TTL) return;

  nseSession.userAgent = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
  nseSession.initialized = false;

  console.log('[NSE] Initializing session handshake…');

  const headers = {
    'User-Agent':      nseSession.userAgent,
    'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-IN,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection':      'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest':  'document',
    'Sec-Fetch-Mode':  'navigate',
    'Sec-Fetch-Site':  'none',
    'Sec-Fetch-User':  '?1',
    'Cache-Control':   'max-age=0',
    'DNT':             '1',
  };

  try {
    const resp = await axios.get(NSE_BASE, { headers, timeout: 15000, maxRedirects: 5 });
    const setCookies = resp.headers['set-cookie'] || [];
    nseSession.cookies     = setCookies.map(c => c.split(';')[0]).join('; ');
    nseSession.initialized = true;
    nseSession.lastInit    = Date.now();
    console.log('[NSE] Session established. Cookies captured:', nseSession.cookies.slice(0, 80) + '…');
  } catch (err) {
    console.error('[NSE] Session init failed:', err.message);
    throw new Error('NSE session initialization failed');
  }
}

/**
 * Make an authenticated request to NSE API endpoints.
 * Automatically refreshes session if expired.
 */
async function nseGet(endpoint) {
  await initNSESession();

  const url     = `${NSE_API_BASE}${endpoint}`;
  const headers = {
    'User-Agent':      nseSession.userAgent,
    'Accept':          'application/json, text/plain, */*',
    'Accept-Language': 'en-IN,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection':      'keep-alive',
    'Referer':         `${NSE_BASE}/option-chain`,
    'Cookie':          nseSession.cookies,
    'Sec-Fetch-Dest':  'empty',
    'Sec-Fetch-Mode':  'cors',
    'Sec-Fetch-Site':  'same-origin',
    'X-Requested-With': 'XMLHttpRequest',
    'DNT': '1',
  };

  try {
    const resp = await axios.get(url, { headers, timeout: 12000 });
    // Capture any new cookies to refresh session
    const newCookies = resp.headers['set-cookie'] || [];
    if (newCookies.length > 0) {
      const fresh  = newCookies.map(c => c.split(';')[0]).join('; ');
      nseSession.cookies = fresh || nseSession.cookies;
    }
    return resp.data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      // Force re-init on auth failure
      nseSession.initialized = false;
      await initNSESession();
    }
    throw err;
  }
}

// ─── Sentiment Engine ─────────────────────────────────────────────────────────
const BULLISH_KEYWORDS  = ['surge', 'rally', 'jump', 'gain', 'profit', 'bullish', 'high', 'record', 'boom', 'upgrade', 'beat', 'outperform', 'rise', 'positive', 'growth', 'strong'];
const BEARISH_KEYWORDS  = ['crash', 'fall', 'drop', 'loss', 'bearish', 'low', 'decline', 'downgrade', 'miss', 'underperform', 'plunge', 'slump', 'weak', 'cut', 'risk', 'probe', 'penalty', 'fine'];

function analyzeSentiment(text = '') {
  const lower = text.toLowerCase();
  let bull = 0;
  let bear = 0;
  BULLISH_KEYWORDS.forEach(w => { if (lower.includes(w)) bull++; });
  BEARISH_KEYWORDS.forEach(w => { if (lower.includes(w)) bear++; });
  if (bull > bear) return 'BULLISH';
  if (bear > bull) return 'BEARISH';
  return 'NEUTRAL';
}

// ─── API Routes ───────────────────────────────────────────────────────────────

/** Health check */
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString(), nseSession: nseSession.initialized });
});

/**
 * GET /api/option-chain?symbol=NIFTY
 * Fetches live option chain data from NSE and returns it directly.
 * Valid symbols: NIFTY, BANKNIFTY, FINNIFTY, MIDCPNIFTY, SENSEX
 */
app.get('/api/option-chain', async (req, res) => {
  const symbol = (req.query.symbol || 'NIFTY').toUpperCase();
  const VALID  = new Set(['NIFTY', 'BANKNIFTY', 'FINNIFTY', 'MIDCPNIFTY', 'SENSEX']);
  if (!VALID.has(symbol)) return res.status(400).json({ error: 'Invalid symbol' });

  try {
    const data = await nseGet(`/option-chain-indices?symbol=${symbol}`);
    res.json({ success: true, symbol, data });
  } catch (err) {
    console.error('[OC]', err.message);
    res.status(502).json({ error: 'Failed to fetch option chain', message: err.message });
  }
});

/**
 * GET /api/market-status
 * Returns top-level indices summary.
 */
app.get('/api/market-status', async (req, res) => {
  try {
    const data = await nseGet('/marketStatus');
    res.json({ success: true, data });
  } catch (err) {
    console.error('[MS]', err.message);
    res.status(502).json({ error: 'Failed to fetch market status', message: err.message });
  }
});

/**
 * GET /api/equity-derivatives?symbol=RELIANCE
 * Stock option chain for individual equity.
 */
app.get('/api/equity-derivatives', async (req, res) => {
  const symbol = (req.query.symbol || '').toUpperCase();
  if (!symbol) return res.status(400).json({ error: 'symbol is required' });

  try {
    const data = await nseGet(`/option-chain-equities?symbol=${symbol}`);
    res.json({ success: true, symbol, data });
  } catch (err) {
    console.error('[ED]', err.message);
    res.status(502).json({ error: 'Failed to fetch equity derivatives', message: err.message });
  }
});

/**
 * GET /api/news
 * Returns processed news from Supabase cache.
 */
app.get('/api/news', async (req, res) => {
  const limit    = Math.min(parseInt(req.query.limit || '20'), 50);
  const sentiment = req.query.sentiment; // BULLISH | BEARISH | NEUTRAL

  let query = supabase
    .from('live_news_feed')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (sentiment) query = query.eq('sentiment_tag', sentiment.toUpperCase());

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, count: data.length, items: data });
});

/**
 * GET /api/indices
 * Returns market index data from Supabase.
 */
app.get('/api/indices', async (_req, res) => {
  const { data, error } = await supabase
    .from('market_indexes')
    .select('*')
    .order('index_name');
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data });
});

// ─── Market Hours Guard ───────────────────────────────────────────────────────
function isMarketOpen() {
  const now = moment().tz('Asia/Kolkata');
  const day = now.day(); // 0=Sun, 6=Sat
  if (day === 0 || day === 6) return false;
  const hhmm = now.hours() * 60 + now.minutes();
  return hhmm >= 9 * 60 + 15 && hhmm <= 15 * 60 + 30;
}

// ─── Live Index Sync (runs every 60s during market hours) ────────────────────
async function syncMarketIndexes() {
  if (!isMarketOpen()) return;
  console.log('[SYNC] Syncing market indexes…');

  try {
    const data = await nseGet('/marketStatus');
    const markets = data?.marketState || [];

    const rows = markets
      .filter(m => ['NIFTY 50', 'NIFTY BANK', 'SENSEX'].includes(m.index))
      .map(m => ({
        index_name:        m.index,
        last_traded_price: m.last,
        change_value:      m.variation,
        change_percentage: m.percentChange,
        updated_at:        new Date().toISOString(),
      }));

    if (rows.length === 0) return;

    const { error } = await supabase
      .from('market_indexes')
      .upsert(rows, { onConflict: 'index_name' });

    if (error) console.error('[SYNC] Index upsert error:', error.message);
    else console.log(`[SYNC] Indexes updated: ${rows.map(r => r.index_name).join(', ')}`);
  } catch (err) {
    console.error('[SYNC] Index sync failed:', err.message);
  }
}

// ─── Option Chain Sync (runs every 2 min during market hours) ────────────────
async function syncOptionChain(symbol = 'NIFTY') {
  if (!isMarketOpen()) return;
  console.log(`[SYNC] Syncing option chain for ${symbol}…`);

  try {
    const raw = await nseGet(`/option-chain-indices?symbol=${symbol}`);
    const records = raw?.records?.data || [];
    const expiry  = raw?.records?.expiryDates?.[0] || '';

    const rows = records
      .filter(r => r.strikePrice && (r.CE || r.PE))
      .map(r => ({
        symbol,
        strike_price:       r.strikePrice,
        expiry_date:        expiry,
        call_ltp:           r.CE?.lastPrice     ?? null,
        put_ltp:            r.PE?.lastPrice     ?? null,
        call_oi:            r.CE?.openInterest  ?? null,
        put_oi:             r.PE?.openInterest  ?? null,
        call_change_oi:     r.CE?.changeinOpenInterest ?? null,
        put_change_oi:      r.PE?.changeinOpenInterest ?? null,
        implied_volatility: r.CE?.impliedVolatility ?? r.PE?.impliedVolatility ?? null,
        updated_at:         new Date().toISOString(),
      }));

    if (rows.length === 0) return;

    // Batch upsert in chunks of 100
    for (let i = 0; i < rows.length; i += 100) {
      const chunk = rows.slice(i, i + 100);
      const { error } = await supabase
        .from('nse_option_chain')
        .upsert(chunk, { onConflict: 'symbol,strike_price,expiry_date' });
      if (error) console.error('[SYNC] OC upsert error:', error.message);
    }
    console.log(`[SYNC] Option chain updated: ${rows.length} strikes for ${symbol}`);
  } catch (err) {
    console.error(`[SYNC] OC sync failed (${symbol}):`, err.message);
  }
}

// ─── News Aggregator (runs every 15 min) ─────────────────────────────────────
async function syncNews() {
  if (!NEWSDATA_KEY) { console.warn('[NEWS] NEWSDATA_API_KEY not set, skipping.'); return; }
  console.log('[NEWS] Fetching latest Indian financial news…');

  const url = `https://newsdata.io/api/1/news?apikey=${NEWSDATA_KEY}&country=in&category=business&language=en&size=20`;

  try {
    const resp  = await axios.get(url, { timeout: 12000 });
    const items = resp.data?.results || [];

    const rows = items.map(item => {
      const text = `${item.title || ''} ${item.description || ''}`;
      return {
        title:        item.title       || '',
        summary:      item.description || '',
        news_source:  item.source_id   || '',
        source_url:   item.link        || '',
        image_url:    item.image_url   || null,
        sentiment_tag: analyzeSentiment(text),
        published_at: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
      };
    }).filter(r => r.title);

    if (rows.length === 0) return;

    const { error } = await supabase
      .from('live_news_feed')
      .upsert(rows, { onConflict: 'source_url', ignoreDuplicates: true });

    if (error) console.error('[NEWS] Upsert error:', error.message);
    else console.log(`[NEWS] ${rows.length} articles synced. Sentiments: ${rows.map(r=>r.sentiment_tag).join(', ')}`);
  } catch (err) {
    console.error('[NEWS] Fetch failed:', err.message);
  }
}

// ─── Cron Schedules ───────────────────────────────────────────────────────────
// Every 60 seconds Mon-Fri during market hours (cron runs every min; guard inside fn)
cron.schedule('* * * * 1-5', () => { syncMarketIndexes(); });

// Every 2 minutes Mon-Fri
cron.schedule('*/2 * * * 1-5', () => {
  syncOptionChain('NIFTY');
  syncOptionChain('BANKNIFTY');
});

// Every 15 minutes all days for news
cron.schedule('*/15 * * * *', () => { syncNews(); });

// ─── Bootstrap ────────────────────────────────────────────────────────────────
app.listen(PORT, async () => {
  console.log(`[BOOT] BullEdge server listening on port ${PORT}`);
  // Warm up NSE session on startup
  try { await initNSESession(); } catch (e) { console.warn('[BOOT] Warm-up session failed:', e.message); }
  // Immediate first sync
  syncMarketIndexes();
  syncOptionChain('NIFTY');
  syncOptionChain('BANKNIFTY');
  syncNews();
});

module.exports = app;

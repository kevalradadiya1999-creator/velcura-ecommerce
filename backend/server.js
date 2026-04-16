const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const paymentRoutes = require('./routes/paymentRoute');
const orderRoutes = require('./routes/orderRoute');

dotenv.config();

const app = express();

// ── Security: Helmet HTTP headers ──────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false, // disabled to allow Razorpay inline scripts
  crossOriginEmbedderPolicy: false,
}));

// ── CORS ────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'https://velcurahygiene.in',
  'https://www.velcurahygiene.in',
  'https://velcurahygiene.com',
  'https://www.velcurahygiene.com',
  'https://velcurahygine.in',
  'https://www.velcurahygine.in',
  'https://velcura.vercel.app',
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(express.json({ limit: '10kb' })); // Limit payload size

// ── Rate limiting on all /api/payment routes ────────────────────────────────
const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});
app.use('/api/payment', paymentLimiter);

// General API rate limit
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', generalLimiter);

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);

// Static sitemap endpoint
app.get('/api/sitemap.xml', (req, res) => {
  const staticRoutes = ['/', '/shop', '/about', '/faq', '/contact', '/export', '/ingredients'];
  const productSlugs = ['oil-balance', 'hydraglow', 'calm-skin'];
  const base = 'https://velcurahygiene.in';

  const urls = [
    ...staticRoutes.map(r => `<url><loc>${base}${r}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`),
    ...productSlugs.map(s => `<url><loc>${base}/product/${s}</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>`),
  ].join('\n  ');

  res.set('Content-Type', 'application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${urls}\n</urlset>`);
});

// Base route
app.get('/', (req, res) => {
  res.send('Velcura API is running...');
});

// Uptime monitoring (prevents cold starts)
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

// ── 404 handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Velcura API running on port ${PORT}`);
});

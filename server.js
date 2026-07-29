const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config/config');
const { apiLimiter } = require('./middlewares/rateLimit');

const app = express();

// Basic Security Hardening & CORS
app.disable('x-powered-by');
app.set('trust proxy', 1); // Respect proxy headers (like Vercel/Cloudflare)
app.use(cors());
app.use(express.json({ limit: '20kb' })); // Restrict payload size for DDoS protection

// Register Rate Limit Middleware globally on APIs
app.use('/api/', apiLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ ok: true, env: config.nodeEnv });
});

// --- SERVE STATIC FRONTEND SITE ---
// Serves homepage and subpages directly from root directory
app.use(express.static(path.join(__dirname, '.'), {
  extensions: ['html', 'htm'], // allow clean URLs
  index: 'index.html'
}));

// Fallback path routing for single-page style or error page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'), (err) => {
    if (err) res.status(404).json({ error: 'Page not found.' });
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]:', err);
  return res.status(500).json({ error: 'Internal server error.' });
});

// Listen on configured port only when executed directly (local/VPS hosting)
if (require.main === module) {
  app.listen(config.port, () => {
    console.log(`====================================================`);
    console.log(`Blissful Blinds Server listening on port ${config.port}`);
    console.log(`Environment: ${config.nodeEnv}`);
    console.log(`====================================================`);
  });
}

module.exports = app;

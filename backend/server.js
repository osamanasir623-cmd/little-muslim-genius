import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { connectDB } from './src/config/db.js';
import authRoutes     from './src/routes/auth.js';
import profileRoutes  from './src/routes/profiles.js';
import progressRoutes from './src/routes/progress.js';
import paymentRoutes  from './src/routes/payments.js';
import userRoutes     from './src/routes/user.js';
import adminRoutes    from './src/routes/admin.js';
import contentRoutes  from './src/routes/content.js';
import puzzleRoutes   from './src/routes/puzzles.js';
import { seedDaysIfEmpty } from './src/seeds/contentSeed.js';
import { seedPuzzlesIfEmpty } from './src/seeds/puzzleSeed.js';
import { errorHandler, notFound } from './src/middleware/errorHandler.js';

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Connect to MongoDB + auto-seed ───────────────────────────────
connectDB().then(() => Promise.all([seedDaysIfEmpty(), seedPuzzlesIfEmpty()])).catch(console.error);

// ── Security headers ─────────────────────────────────────────────
app.use(helmet());

// ── CORS ─────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'https://littlemuslimgenius.com',
  'https://www.littlemuslimgenius.com',
];
app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (curl, mobile apps)
    if (!origin) return cb(null, true);
    // Allow any localhost port in development
    if (origin.startsWith('http://localhost:')) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));

// ── Stripe webhook MUST read raw body before JSON parse ──────────
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

// ── Body parsers ─────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// ── Global rate limit ────────────────────────────────────────────
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
}));

// Stricter limit for auth endpoints
app.use('/api/auth/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: 'Too many auth attempts, please wait 15 minutes.' },
}));

// ── Health check ─────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// ── Routes ───────────────────────────────────────────────────────
app.use('/api/auth',     authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/user',     userRoutes);
app.use('/api/admin',    adminRoutes);
app.use('/api/content',  contentRoutes);
app.use('/api/puzzles',  puzzleRoutes);

// ── 404 + error handler ──────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// Skip listen() on Vercel — it exports `app` as a serverless handler
if (!process.env.VERCEL) {
  const server = app.listen(PORT, () => {
    console.log(`\n🌟 Little Muslim Genius API running on port ${PORT}`);
    console.log(`   Environment : ${process.env.NODE_ENV || 'development'}`);
    console.log(`   Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌ Port ${PORT} is already in use. Kill it with:\n   npx kill-port ${PORT}\nor in PowerShell:\n   Get-NetTCPConnection -LocalPort ${PORT} | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }\n`);
    } else {
      console.error('Server error:', err);
    }
    process.exit(1);
  });
}

export default app;

import prisma from './prisma.js';

export async function connectDB(retries = 8, delayMs = 3000) {
  for (let i = 1; i <= retries; i++) {
    try {
      await prisma.$connect();
      console.log('✅ PostgreSQL (Neon) connected via Prisma');
      return;
    } catch (err) {
      if (i === retries) {
        console.error('❌ Database connection failed after all retries:', err.message);
        // Don't exit — let the server run so health check still responds
        // Individual requests will fail gracefully via error handler
        return;
      }
      console.log(`⏳ DB not ready (attempt ${i}/${retries}), retrying in ${delayMs / 1000}s… (Neon is waking up)`);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
}

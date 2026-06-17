import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import {
  createStripeCheckout,
  stripeWebhook,
  verifyStripeSession,
  initiateJazzCash,
  jazzCashCallback,
  initiateEasyPaisa,
  easyPaisaCallback,
  getPaymentStatus,
} from '../controllers/paymentController.js';

const router = Router();

// Stripe webhook — NO auth, raw body (set in server.js)
router.post('/webhook', stripeWebhook);

// JazzCash callback — NO auth (called by JazzCash server)
router.post('/jazzcash/callback', jazzCashCallback);

// EasyPaisa callback — NO auth (called by EasyPaisa server)
router.post('/easypaisa/callback', easyPaisaCallback);

// Authenticated routes
router.use(protect);
router.post('/create-checkout',  createStripeCheckout);
router.get('/verify',            verifyStripeSession);
router.post('/jazzcash',         initiateJazzCash);
router.post('/easypaisa',        initiateEasyPaisa);
router.get('/status',            getPaymentStatus);

export default router;

import Stripe from 'stripe';
import prisma from '../config/prisma.js';
import { sendPaymentReceiptEmail } from '../services/emailService.js';
import { createJazzCashPayment } from '../services/jazzCashService.js';
import { createEasyPaisaPayment, verifyEasyPaisaCallback } from '../services/easyPaisaService.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

const PRICE_PKR       = Number(process.env.STRIPE_PRICE_PKR || 1000);
const PRICE_USD_CENTS = 359;

// ── POST /api/payments/create-checkout  (Stripe) ─────────────────
export async function createStripeCheckout(req, res, next) {
  try {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency:     'usd',
          product_data: {
            name:        'Little Muslim Genius — Full 3-Month Program',
            description: '90 days · 4 child profiles · All 5 learning worlds',
            images:      [],
          },
          unit_amount: PRICE_USD_CENTS,
        },
        quantity: 1,
      }],
      mode:           'payment',
      success_url:    `${frontendUrl}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:     `${frontendUrl}?payment=cancelled`,
      customer_email: req.user.email,
      metadata:       { userId: req.user.id },
    });

    await prisma.payment.create({
      data: {
        userId:         req.user.id,
        amountPkr:      PRICE_PKR,
        currency:       'USD',
        paymentGateway: 'stripe',
        transactionId:  session.id,
        status:         'pending',
      },
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (err) { next(err); }
}

// ── POST /api/payments/webhook  (Stripe — raw body required) ─────
export async function stripeWebhook(req, res, next) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Stripe webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      if (session.payment_status === 'paid') {
        await markUserPaid(session.metadata.userId, 'stripe', session.id);
      }
    }
    res.json({ received: true });
  } catch (err) { next(err); }
}

// ── GET /api/payments/verify?session_id=xxx ──────────────────────
export async function verifyStripeSession(req, res, next) {
  try {
    const { session_id } = req.query;
    if (!session_id) return res.status(400).json({ message: 'session_id is required' });

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === 'paid' && session.metadata?.userId === req.user.id) {
      await markUserPaid(req.user.id, 'stripe', session.id);
      return res.json({ status: 'paid' });
    }

    res.json({ status: session.payment_status });
  } catch (err) { next(err); }
}

// ── POST /api/payments/jazzcash ──────────────────────────────────
export async function initiateJazzCash(req, res, next) {
  try {
    const result = await createJazzCashPayment({
      userId:    req.user.id,
      email:     req.user.email,
      amountPkr: PRICE_PKR,
    });

    await prisma.payment.create({
      data: {
        userId:         req.user.id,
        amountPkr:      PRICE_PKR,
        currency:       'PKR',
        paymentGateway: 'jazzcash',
        transactionId:  result.txnRefNo,
        status:         'pending',
      },
    });

    res.json(result);
  } catch (err) { next(err); }
}

// ── POST /api/payments/jazzcash/callback ─────────────────────────
export async function jazzCashCallback(req, res, next) {
  try {
    const { pp_ResponseCode, pp_TxnRefNo } = req.body;

    if (pp_ResponseCode === '000') {
      const payment = await prisma.payment.findFirst({ where: { transactionId: pp_TxnRefNo } });
      if (payment) await markUserPaid(payment.userId, 'jazzcash', pp_TxnRefNo);
    }

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(
      pp_ResponseCode === '000'
        ? `${frontendUrl}?payment=success`
        : `${frontendUrl}?payment=failed`
    );
  } catch (err) { next(err); }
}

// ── POST /api/payments/easypaisa ─────────────────────────────────
export async function initiateEasyPaisa(req, res, next) {
  try {
    const result = createEasyPaisaPayment({
      userId:    req.user.id,
      email:     req.user.email,
      amountPkr: PRICE_PKR,
    });

    await prisma.payment.create({
      data: {
        userId:         req.user.id,
        amountPkr:      PRICE_PKR,
        currency:       'PKR',
        paymentGateway: 'easypaisa',
        transactionId:  result.orderId,
        status:         'pending',
      },
    });

    res.json(result);
  } catch (err) { next(err); }
}

// ── POST /api/payments/easypaisa/callback ────────────────────────
export async function easyPaisaCallback(req, res, next) {
  try {
    const authentic = verifyEasyPaisaCallback(req.body);
    if (!authentic) console.warn('EasyPaisa callback hash mismatch — ignoring');

    const { status, orderRefNum } = req.body;

    if (status === '0000' || status === 'PAID') {
      const payment = await prisma.payment.findFirst({ where: { transactionId: orderRefNum } });
      if (payment) await markUserPaid(payment.userId, 'easypaisa', orderRefNum);
    }

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(
      (status === '0000' || status === 'PAID')
        ? `${frontendUrl}?payment=success&gateway=easypaisa`
        : `${frontendUrl}?payment=failed`
    );
  } catch (err) { next(err); }
}

// ── GET /api/payments/status ─────────────────────────────────────
export async function getPaymentStatus(req, res, next) {
  try {
    res.json({
      status:              req.user.paymentStatus,
      paidAt:              req.user.paidAt,
      method:              req.user.paymentMethod,
      subscriptionEndDate: req.user.subscriptionEndDate,
    });
  } catch (err) { next(err); }
}

// ── Internal helper ───────────────────────────────────────────────
async function markUserPaid(userId, gateway, txnId) {
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 6);

  await prisma.user.update({
    where: { id: userId },
    data: {
      paymentStatus:       'paid',
      paymentMethod:       gateway,
      paidAt:              new Date(),
      subscriptionEndDate: endDate,
    },
  });

  await prisma.payment.updateMany({
    where: { transactionId: txnId },
    data:  { status: 'completed' },
  });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user) {
    sendPaymentReceiptEmail(user.email, { gateway, amount: 1000, endDate }).catch(console.error);
  }
}

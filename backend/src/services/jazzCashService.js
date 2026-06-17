import crypto from 'crypto';

// JazzCash merchant payment integration.
// Docs: https://sandbox.jazzcash.com.pk/
// Requires a JazzCash merchant account — apply at https://www.jazzcash.com.pk/corporate/
//
// Sandbox endpoint: https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/
// Production endpoint: https://payments.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/

const JAZZCASH_BASE_URL = process.env.JAZZCASH_SANDBOX === 'true'
  ? 'https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/'
  : 'https://payments.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/';

function formatDateTime(date = new Date()) {
  return date.toISOString().replace(/[-:T]/g, '').slice(0, 14);
}

function buildHMAC(params, salt) {
  // JazzCash requires params sorted alphabetically, joined with &, then HMAC-SHA256 with salt
  const sorted = Object.keys(params)
    .filter((k) => params[k] !== '')
    .sort()
    .map((k) => `${params[k]}`)
    .join('&');
  const str = `${salt}&${sorted}`;
  return crypto.createHmac('sha256', salt).update(str).digest('hex');
}

export async function createJazzCashPayment({ userId, email, amountPkr }) {
  const merchantId   = process.env.JAZZCASH_MERCHANT_ID;
  const password     = process.env.JAZZCASH_PASSWORD;
  const integritySalt = process.env.JAZZCASH_INTEGRITY_SALT;

  if (!merchantId || !password || !integritySalt) {
    throw new Error('JazzCash credentials not configured. Set JAZZCASH_MERCHANT_ID, JAZZCASH_PASSWORD, JAZZCASH_INTEGRITY_SALT in .env');
  }

  const txnRefNo   = `T${Date.now()}_${userId.slice(-6)}`;
  const dateTime   = formatDateTime();
  const expiryDate = formatDateTime(new Date(Date.now() + 30 * 60 * 1000));
  const amount     = (amountPkr * 100).toString(); // JazzCash uses paisa

  const params = {
    pp_Version:        '1.1',
    pp_TxnType:        'MWALLET',
    pp_Language:       'EN',
    pp_MerchantID:     merchantId,
    pp_Password:       password,
    pp_TxnRefNo:       txnRefNo,
    pp_Amount:         amount,
    pp_TxnCurrency:    'PKR',
    pp_TxnDateTime:    dateTime,
    pp_BillReference:  `LMG_${userId}`,
    pp_Description:    'Little Muslim Genius — 3 Month Program',
    pp_TxnExpiryDateTime: expiryDate,
    pp_ReturnURL:      `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/payments/jazzcash/callback`,
    pp_MobileNumber:   '',
    pp_CNIC:           '',
  };

  params.pp_SecureHash = buildHMAC(params, integritySalt);

  return {
    txnRefNo,
    redirectUrl: JAZZCASH_BASE_URL,
    formData: params, // POST this form to JazzCash
  };
}

import crypto from 'crypto';

const GATEWAY_URL = 'https://easypay.easypaisa.com.pk/tansaction/';

/**
 * EasyPaisa Easy Pay integration (Web Checkout / OTC).
 * Docs: https://easypaisa.com.pk/merchant-solutions
 *
 * Required env vars:
 *   EASYPAISA_STORE_ID   – Merchant store ID
 *   EASYPAISA_HASH_KEY   – Merchant secret hash key
 *   FRONTEND_URL         – For redirect after payment
 */
export function createEasyPaisaPayment({ userId, email, amountPkr }) {
  const storeId   = process.env.EASYPAISA_STORE_ID;
  const hashKey   = process.env.EASYPAISA_HASH_KEY;
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

  if (!storeId || !hashKey) {
    throw new Error('EasyPaisa credentials not configured. Set EASYPAISA_STORE_ID and EASYPAISA_HASH_KEY.');
  }

  // Order reference: unique per transaction
  const orderId       = `LMG-EP-${Date.now()}-${userId.toString().slice(-6)}`;
  const amountFormatted = Number(amountPkr).toFixed(2); // e.g. "1000.00"

  const postBackUrl   = `${frontendUrl.replace('localhost:5173', 'localhost:5000')}/api/payments/easypaisa/callback`;
  const redirectUrl   = `${frontendUrl}?payment=success&gateway=easypaisa`;

  // EasyPaisa hash: AES-128-ECB with the hashKey (16-byte key, PKCS5 padding)
  const hashString = [
    amountFormatted,
    'PKR',
    '',         // email — optional
    orderId,
    postBackUrl,
    '',         // payment method (blank = any)
    redirectUrl,
    storeId,
    '',         // token (blank for one-time)
    'S',        // transaction type: S = Sale
  ].join('&');

  const key    = Buffer.from(hashKey.padEnd(16, '0').slice(0, 16), 'utf8');
  const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
  cipher.setAutoPadding(true);
  const hash   = Buffer.concat([cipher.update(hashString, 'utf8'), cipher.final()]).toString('base64');

  const formData = {
    storeId,
    orderId,
    transactionAmount: amountFormatted,
    mobileAccountNo:   '',
    emailAddress:      email || '',
    transactionType:   'InitialRequest',
    tokenExpiry:       '',
    bankIdentificationNumber: '',
    encryptedHashRequest: hash,
    paymentMethod:     'InitialRequest',
    postBackURL:       postBackUrl,
    redirectURL:       redirectUrl,
  };

  return { orderId, redirectUrl: GATEWAY_URL, formData };
}

/**
 * Verify EasyPaisa callback by re-computing the AES hash on the response fields.
 * Returns true if the response is authentic.
 */
export function verifyEasyPaisaCallback(body) {
  try {
    const hashKey = process.env.EASYPAISA_HASH_KEY;
    if (!hashKey) return false;

    const {
      amount, currency, orderRefNum, paymentMethod,
      status, transactionDateTime, transactionId, encryptedHashRequest,
    } = body;

    const hashString = [amount, currency, orderRefNum, paymentMethod, status, transactionDateTime, transactionId].join('&');
    const key    = Buffer.from(hashKey.padEnd(16, '0').slice(0, 16), 'utf8');
    const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
    cipher.setAutoPadding(true);
    const expected = Buffer.concat([cipher.update(hashString, 'utf8'), cipher.final()]).toString('base64');

    return expected === encryptedHashRequest;
  } catch {
    return false;
  }
}

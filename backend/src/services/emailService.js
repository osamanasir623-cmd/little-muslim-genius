import nodemailer from 'nodemailer';

// Works with SendGrid, Mailgun, Gmail, or any SMTP provider.
// Set SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS in .env
function createTransport() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST   || 'smtp.ethereal.email',
    port:   Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const FROM = `"${process.env.EMAIL_FROM_NAME || 'Little Muslim Genius'}" <${process.env.EMAIL_FROM || 'noreply@littlemuslimgenius.com'}>`;

async function send({ to, subject, html }) {
  if (!process.env.SMTP_USER) {
    console.log(`📧 [Email skipped — SMTP not configured]\n   To: ${to}\n   Subject: ${subject}`);
    return;
  }
  const transport = createTransport();
  await transport.sendMail({ from: FROM, to, subject, html });
}

// ── Welcome email ─────────────────────────────────────────────────
export async function sendWelcomeEmail(email) {
  await send({
    to:      email,
    subject: '🌟 Welcome to Little Muslim Genius!',
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px">
        <h1 style="color:#2a1a6b">Assalamu Alaikum! 🌙</h1>
        <p>Welcome to <strong>Little Muslim Genius</strong> — where your children learn Islamic values and modern technology through play.</p>
        <h3>What's included:</h3>
        <ul>
          <li>📖 Quran, Hadith & Islamic learning — every single day</li>
          <li>💡 Computers, AI & Data Science — as games</li>
          <li>🌟 4 child profiles with age-based difficulty</li>
          <li>⭐ Stars, badges, tasbih beads & city builder rewards</li>
        </ul>
        <p>The first 3 days are completely <strong>free</strong>. After that, unlock the full 3-month journey for just Rs. 1,000.</p>
        <p style="color:#666;font-size:0.9em">JazakAllah Khair for choosing us for your children's summer learning. 🤲</p>
      </div>
    `,
  });
}

// ── Password reset email ──────────────────────────────────────────
export async function sendPasswordResetEmail(email, resetUrl) {
  await send({
    to:      email,
    subject: '🔑 Reset your Little Muslim Genius password',
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px">
        <h2 style="color:#2a1a6b">Password Reset Request</h2>
        <p>Someone requested a password reset for your account. If this was you, click below:</p>
        <a href="${resetUrl}"
           style="display:inline-block;background:linear-gradient(135deg,#4ff0d4,#2bc7e8);color:#1a1144;
                  padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:700;margin:12px 0">
          Reset My Password
        </a>
        <p style="color:#666;font-size:0.85em">This link expires in 30 minutes. If you didn't request this, ignore this email.</p>
      </div>
    `,
  });
}

// ── Payment receipt email ─────────────────────────────────────────
export async function sendPaymentReceiptEmail(email, { gateway, amount, endDate }) {
  await send({
    to:      email,
    subject: '✅ Payment confirmed — Little Muslim Genius',
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px">
        <h2 style="color:#2a1a6b">JazakAllah Khair! 🎉</h2>
        <p>Your payment was successful. You now have full access to the complete 3-month program.</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0">
          <tr><td style="padding:8px;color:#666">Amount paid</td><td style="padding:8px;font-weight:700">Rs. ${amount} PKR</td></tr>
          <tr><td style="padding:8px;color:#666">Payment method</td><td style="padding:8px;font-weight:700;text-transform:capitalize">${gateway}</td></tr>
          <tr><td style="padding:8px;color:#666">Access valid until</td><td style="padding:8px;font-weight:700">${new Date(endDate).toLocaleDateString()}</td></tr>
        </table>
        <p>Your children can now enjoy all 90 days of Islamic + STEM learning through play. May Allah put barakah in their learning. 🤲</p>
      </div>
    `,
  });
}

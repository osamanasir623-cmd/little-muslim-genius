import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { Mascot, Confetti, Screen, chime } from '../components/ui.jsx';
import api from '../services/api.js';

const METHODS = [
  { key: 'jazzcash',  label: 'JazzCash 📱',     grad: 'linear-gradient(135deg, #d00000, #ff2222)', note: 'Mobile wallet' },
  { key: 'easypaisa', label: 'EasyPaisa 📲',    grad: 'linear-gradient(135deg, #007a3a, #00c65a)', note: 'Mobile wallet' },
  { key: 'stripe',    label: 'Card / Stripe 💳', grad: 'linear-gradient(135deg, #4b44d4, #635bff)', note: 'Visa · Mastercard · AMEX' },
];

const FEATURES = {
  en: [
    '✅ 90 days of Islamic + STEM games',
    '✅ 4 child profiles with age-based difficulty',
    '✅ All 5 learning worlds',
    '✅ Parent analytics dashboard',
    '✅ Progress saved forever to the cloud',
    '✅ Bilingual English + Urdu throughout',
  ],
  ur: [
    '✅ اسلامی + STEM کھیلوں کے 90 دن',
    '✅ عمر کے مطابق مشکل کے ساتھ 4 بچوں کے پروفائل',
    '✅ تمام 5 سیکھنے کی دنیائیں',
    '✅ والدین کا تجزیاتی ڈیش بورڈ',
    '✅ ترقی ہمیشہ کے لیے کلاؤڈ میں محفوظ',
    '✅ مکمل دو لسانی انگریزی + اردو',
  ],
};

function submitJazzCashForm(redirectUrl, formData) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = redirectUrl;
  for (const [key, value] of Object.entries(formData)) {
    const input = document.createElement('input');
    input.type  = 'hidden';
    input.name  = key;
    input.value = value;
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
}

export default function Payment({ onSuccess, onBack }) {
  const { t, lang, markPaid, state } = useApp();
  // If payment was already verified (e.g. Stripe redirect came back), show success immediately
  const [paid,    setPaid]    = useState(state.payment?.status === 'paid');
  const [method,  setMethod]  = useState(state.payment?.method ?? null);
  const [loading, setLoading] = useState(false);
  const [err,     setErr]     = useState('');

  const pay = async (m) => {
    if (loading || paid) return;
    setMethod(m);
    setErr('');

    setLoading(true);
    try {
      if (m === 'stripe') {
        const { data } = await api.post('/payments/create-checkout');
        window.location.href = data.url;
        return;
      }

      if (m === 'jazzcash') {
        const { data } = await api.post('/payments/jazzcash');
        submitJazzCashForm(data.redirectUrl, data.formData);
        return;
      }

      if (m === 'easypaisa') {
        const { data } = await api.post('/payments/easypaisa');
        submitJazzCashForm(data.redirectUrl, data.formData);
        return;
      }
    } catch (e) {
      setLoading(false);
      setErr(e.response?.data?.message || 'Could not connect to payment gateway. Please try again.');
    }
  };

  if (paid) {
    return (
      <Screen>
        <Confetti count={100} />
        <div className="center mt2" style={{ paddingBottom: 40 }}>
          <div className="row" style={{ justifyContent: 'center' }}>
            <Mascot id="noor"  cheer size="4rem" />
            <Mascot id="zappy" cheer size="4rem" />
            <Mascot id="fikri" cheer size="4rem" />
            <Mascot id="ullu"  cheer size="4rem" />
          </div>
          <h1 className="h-title mt2" style={{ fontSize: '2.2rem' }}>
            {t('paymentSuccess')} 🎉
          </h1>
          <p style={{ fontSize: '1.15rem' }}>{t('fullUnlocked')}</p>
          <div className="card mt2" style={{ textAlign: 'left' }}>
            {(FEATURES[lang] ?? FEATURES.en).map((f, i) => (
              <div key={i} style={{ padding: '6px 0', fontWeight: 600 }}>{f}</div>
            ))}
          </div>
          <button className="btn block mt2" style={{ fontSize: '1.2rem' }} onClick={onSuccess}>
            {t('startLearning')}
          </button>
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <div className="between">
        <button className="chip" style={{ cursor: 'pointer' }} onClick={onBack}>
          ↩ {t('backToMap')}
        </button>
      </div>

      <div className="center mt">
        <Mascot id="noor" size="3rem" />
        <h2 className="h-title mt">{t('unlockFull')}</h2>
        <p className="muted">{t('freeTrialNote')}</p>
      </div>

      {/* Price card */}
      <div className="panel mt2" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--ink)' }}>
          🇵🇰 Rs. 1,000
        </div>
        <div style={{ color: 'var(--ink)', opacity: 0.6, fontSize: '0.95rem' }}>
          ≈ $3.50 USD · One-time payment · Not a subscription
        </div>
        <div className="col mt2" style={{ gap: 6, textAlign: 'left' }}>
          {(FEATURES[lang] ?? FEATURES.en).map((f, i) => (
            <div key={i} style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink)' }}>{f}</div>
          ))}
        </div>
      </div>

      {/* Payment method buttons */}
      <div className="col mt2">
        <p className="center" style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 6 }}>
          {t('choosePay')}
        </p>
        {err && (
          <p style={{ color: '#ff5d8f', fontWeight: 600, textAlign: 'center', marginBottom: 8 }}>{err}</p>
        )}
        {METHODS.map((m) => (
          <button
            key={m.key}
            onClick={() => pay(m.key)}
            disabled={loading}
            style={{
              width: '100%', padding: '18px 24px', borderRadius: '999px',
              background: m.grad, color: '#fff',
              fontSize: '1.2rem', fontWeight: 700,
              boxShadow: '0 8px 0 rgba(0,0,0,0.18)',
              border: 'none', cursor: 'pointer',
              fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              opacity: loading && method !== m.key ? 0.55 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            <span>
              {loading && method === m.key ? t('processingPayment') : m.label}
            </span>
            <span style={{ fontSize: '0.85rem', opacity: 0.85 }}>{m.note}</span>
          </button>
        ))}
        <p className="center muted" style={{ fontSize: '0.82rem' }}>{t('secureNote')}</p>
      </div>
    </Screen>
  );
}

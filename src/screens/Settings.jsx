import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { Mascot, Screen } from '../components/ui.jsx';
import api from '../services/api.js';

export default function Settings({ onBack }) {
  const { t, lang, state, setLanguage, toggleMute } = useApp();
  const [tab, setTab]           = useState('account');
  const [oldPw, setOldPw]       = useState('');
  const [newPw, setNewPw]       = useState('');
  const [confirm, setConfirm]   = useState('');
  const [pwMsg, setPwMsg]       = useState('');
  const [pwErr, setPwErr]       = useState('');
  const [pwLoading, setPwLoading] = useState(false);
  const [billing, setBilling]   = useState(null);
  const [billLoading, setBillLoading] = useState(false);

  const changePassword = async (e) => {
    e.preventDefault();
    setPwErr(''); setPwMsg('');
    if (newPw.length < 8) { setPwErr('Password must be at least 8 characters.'); return; }
    if (newPw !== confirm) { setPwErr('New passwords do not match.'); return; }
    setPwLoading(true);
    try {
      await api.put('/user/settings', { currentPassword: oldPw, newPassword: newPw });
      setPwMsg('Password changed successfully!');
      setOldPw(''); setNewPw(''); setConfirm('');
    } catch (err) {
      setPwErr(err.response?.data?.message || 'Could not change password. Check your current password.');
    } finally {
      setPwLoading(false);
    }
  };

  const loadBilling = async () => {
    if (billing || billLoading) return;
    setBillLoading(true);
    try {
      const { data } = await api.get('/payments/status');
      setBilling(data);
    } catch {
      setBilling({ error: true });
    } finally {
      setBillLoading(false);
    }
  };

  const INPUT = {
    width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.15)',
    fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.75)', color: '#222',
  };

  const TAB_BTN = (key, label) => (
    <button
      key={key}
      onClick={() => { setTab(key); if (key === 'billing') loadBilling(); }}
      style={{
        flex: 1, padding: '10px 6px', border: 'none', borderRadius: 12, fontFamily: 'inherit',
        fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer',
        background: tab === key ? 'var(--grad-teal)' : 'rgba(255,255,255,0.18)',
        color: tab === key ? 'var(--ink)' : 'rgba(255,255,255,0.75)',
        transition: 'all 0.2s',
      }}
    >{label}</button>
  );

  return (
    <Screen>
      <div className="between" style={{ marginBottom: 16 }}>
        <button className="chip" style={{ cursor: 'pointer' }} onClick={onBack}>↩ {lang === 'ur' ? 'واپس' : 'Back'}</button>
        <div className="row" style={{ gap: 6 }}>
          <Mascot id="noor" size="1.8rem" />
          <strong style={{ fontSize: '1.1rem', color: 'var(--ink)' }}>{lang === 'ur' ? 'ترتیبات' : 'Settings'}</strong>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {TAB_BTN('account', lang === 'ur' ? 'اکاؤنٹ' : 'Account')}
        {TAB_BTN('app',     lang === 'ur' ? 'ایپ' : 'App')}
        {TAB_BTN('billing', lang === 'ur' ? 'ادائیگی' : 'Billing')}
      </div>

      {/* ── Account tab ── */}
      {tab === 'account' && (
        <div>
          <div className="panel" style={{ marginBottom: 16 }}>
            <p style={{ margin: '0 0 4px', fontWeight: 700, color: 'var(--ink)', fontSize: '1rem' }}>
              {lang === 'ur' ? '📧 ای میل' : '📧 Email'}
            </p>
            <p style={{ margin: 0, color: 'var(--ink)', opacity: 0.65, fontSize: '0.95rem' }}>
              {state.account?.email ?? '—'}
            </p>
          </div>

          <div className="panel">
            <p style={{ margin: '0 0 14px', fontWeight: 700, color: 'var(--ink)', fontSize: '1rem' }}>
              🔒 {lang === 'ur' ? 'پاسورڈ تبدیل کریں' : 'Change Password'}
            </p>
            <form onSubmit={changePassword} className="col" style={{ gap: 10 }}>
              <input type="password" placeholder={lang === 'ur' ? 'موجودہ پاسورڈ' : 'Current password'}
                value={oldPw} onChange={(e) => setOldPw(e.target.value)} style={INPUT} required />
              <input type="password" placeholder={lang === 'ur' ? 'نیا پاسورڈ (کم از کم 8)' : 'New password (min 8 chars)'}
                value={newPw} onChange={(e) => setNewPw(e.target.value)} style={INPUT} required />
              <input type="password" placeholder={lang === 'ur' ? 'نیا پاسورڈ دوبارہ' : 'Confirm new password'}
                value={confirm} onChange={(e) => setConfirm(e.target.value)} style={INPUT} required />

              {pwErr && <p style={{ color: '#ff5d8f', margin: 0, fontWeight: 600, fontSize: '0.9rem' }}>{pwErr}</p>}
              {pwMsg && <p style={{ color: '#4ff0d4', margin: 0, fontWeight: 600, fontSize: '0.9rem' }}>✅ {pwMsg}</p>}

              <button type="submit" className="btn teal block" disabled={pwLoading}>
                {pwLoading ? '…' : (lang === 'ur' ? 'پاسورڈ تبدیل کریں' : 'Update Password')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── App tab ── */}
      {tab === 'app' && (
        <div className="col" style={{ gap: 14 }}>
          <div className="panel">
            <div className="between">
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: 'var(--ink)' }}>
                  🌐 {lang === 'ur' ? 'زبان' : 'Language'}
                </p>
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--ink)', opacity: 0.6 }}>
                  {lang === 'ur' ? 'English / اردو' : 'English / اردو'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className={`btn ${lang === 'en' ? 'teal' : 'ghost'}`}
                  onClick={() => setLanguage('en')} style={{ padding: '8px 16px', fontSize: '0.9rem' }}>EN</button>
                <button className={`btn ${lang === 'ur' ? 'teal' : 'ghost'}`}
                  onClick={() => setLanguage('ur')} style={{ padding: '8px 16px', fontSize: '0.9rem' }}>اردو</button>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="between">
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: 'var(--ink)' }}>
                  {state.muted ? '🔇' : '🔊'} {lang === 'ur' ? 'آواز' : 'Sound'}
                </p>
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--ink)', opacity: 0.6 }}>
                  {state.muted
                    ? (lang === 'ur' ? 'خاموش' : 'Muted')
                    : (lang === 'ur' ? 'آن' : 'On')}
                </p>
              </div>
              <button className={`btn ${state.muted ? 'coral' : 'lime'}`}
                onClick={toggleMute} style={{ padding: '8px 18px', fontSize: '0.9rem' }}>
                {state.muted ? (lang === 'ur' ? 'آن کریں' : 'Unmute') : (lang === 'ur' ? 'بند کریں' : 'Mute')}
              </button>
            </div>
          </div>

          <div className="panel" style={{ opacity: 0.6 }}>
            <p style={{ margin: 0, fontWeight: 700, color: 'var(--ink)' }}>📱 {lang === 'ur' ? 'ورژن' : 'App Version'}</p>
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--ink)' }}>Little Muslim Genius v1.0</p>
          </div>
        </div>
      )}

      {/* ── Billing tab ── */}
      {tab === 'billing' && (
        <div className="col" style={{ gap: 14 }}>
          {billLoading && (
            <div className="center mt2"><span style={{ fontSize: '2rem' }}>⏳</span></div>
          )}

          {billing && !billing.error && (
            <>
              <div className="panel">
                <p style={{ margin: '0 0 4px', fontWeight: 700, color: 'var(--ink)' }}>
                  {lang === 'ur' ? 'ادائیگی کی حالت' : 'Payment Status'}
                </p>
                <p style={{ margin: 0, fontWeight: 800, fontSize: '1.2rem',
                  color: billing.status === 'paid' ? '#4ff0d4' : '#ff5d8f' }}>
                  {billing.status === 'paid'
                    ? (lang === 'ur' ? '✅ ادا شدہ' : '✅ Paid')
                    : (lang === 'ur' ? '⚠️ ادا نہیں' : '⚠️ Not paid')}
                </p>
              </div>

              {billing.status === 'paid' && (
                <>
                  <div className="panel">
                    <p style={{ margin: '0 0 4px', fontWeight: 700, color: 'var(--ink)' }}>
                      {lang === 'ur' ? 'ادائیگی کا طریقہ' : 'Payment Method'}
                    </p>
                    <p style={{ margin: 0, color: 'var(--ink)', opacity: 0.75 }}>
                      {billing.method || '—'}
                    </p>
                  </div>
                  <div className="panel">
                    <p style={{ margin: '0 0 4px', fontWeight: 700, color: 'var(--ink)' }}>
                      {lang === 'ur' ? 'رسائی کی آخری تاریخ' : 'Access Expires'}
                    </p>
                    <p style={{ margin: 0, color: 'var(--ink)', opacity: 0.75 }}>
                      {billing.subscriptionEndDate
                        ? new Date(billing.subscriptionEndDate).toLocaleDateString()
                        : '—'}
                    </p>
                  </div>
                </>
              )}

              {billing.status !== 'paid' && (
                <button className="btn block" style={{ background: 'var(--grad-gold)', color: 'var(--ink)' }}
                  onClick={onBack}>
                  {lang === 'ur' ? '🎁 ابھی انلاک کریں' : '🎁 Unlock Full Program'}
                </button>
              )}
            </>
          )}

          {billing?.error && (
            <p style={{ color: '#ff5d8f', textAlign: 'center' }}>
              {lang === 'ur' ? 'لوڈ نہیں ہو سکا۔ دوبارہ کوشش کریں۔' : 'Could not load billing info. Please try again.'}
            </p>
          )}
        </div>
      )}
    </Screen>
  );
}

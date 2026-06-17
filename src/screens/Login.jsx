import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { Mascot, LangToggle, Screen } from '../components/ui.jsx';

export default function Login() {
  const { t, signup, login, forgotPassword } = useApp();
  const [mode,    setMode]    = useState('signup'); // 'signup' | 'login' | 'forgot' | 'forgot-sent'
  const [email,   setEmail]   = useState('');
  const [pw,      setPw]      = useState('');
  const [err,     setErr]     = useState('');
  const [loading, setLoading] = useState(false);

  const validEmail = /\S+@\S+\.\S+/.test(email);
  const valid      = validEmail && (mode === 'forgot' || pw.length >= 8);

  const submit = async () => {
    if (!valid || loading) return;
    setErr('');
    setLoading(true);
    try {
      if (mode === 'forgot') {
        await forgotPassword(email);
        setMode('forgot-sent');
        return;
      }
      if (mode === 'signup') {
        await signup(email, pw);
      } else {
        await login(email, pw);
      }
    } catch (e) {
      setErr(e.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === 'Enter') submit(); };

  if (mode === 'forgot-sent') {
    return (
      <Screen>
        <div className="center mt2">
          <div style={{ fontSize: '3rem' }}>📧</div>
          <h2 style={{ color: 'var(--ink)' }}>Check your email!</h2>
          <p className="muted">If that address has an account, a reset link was sent. It expires in 30 minutes.</p>
          <button className="btn ghost mt" onClick={() => setMode('login')}>
            ← Back to Login
          </button>
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <div className="between">
        <span />
        <LangToggle />
      </div>

      <div className="center mt2">
        <div className="row" style={{ justifyContent: 'center' }}>
          <Mascot id="noor"  size="3.2rem" />
          <Mascot id="zappy" size="3.2rem" />
          <Mascot id="fikri" size="3.2rem" />
          <Mascot id="ullu"  size="3.2rem" />
        </div>
        <h1 className="h-title mt">{t('appName')}</h1>
        <p className="muted">{t('tagline')}</p>
      </div>

      {/* ── Sign Up / Log In tabs ──────────────────────────────── */}
      {mode !== 'forgot' && (
        <div style={{
          display: 'flex',
          background: 'rgba(0,0,0,0.08)',
          borderRadius: 18,
          padding: 5,
          marginTop: 24,
          gap: 4,
        }}>
          <button
            onClick={() => { setMode('signup'); setErr(''); }}
            style={{
              flex: 1, padding: '13px 0', borderRadius: 14,
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontWeight: 800, fontSize: '0.97rem',
              background: mode === 'signup' ? '#f97316' : 'transparent',
              color: mode === 'signup' ? '#fff' : 'var(--ink)',
              transition: 'all 0.18s',
              boxShadow: mode === 'signup' ? '0 3px 10px rgba(249,115,22,0.4)' : 'none',
            }}
          >
            ✨ Sign Up
          </button>
          <button
            onClick={() => { setMode('login'); setErr(''); }}
            style={{
              flex: 1, padding: '13px 0', borderRadius: 14,
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontWeight: 800, fontSize: '0.97rem',
              background: mode === 'login' ? '#6366f1' : 'transparent',
              color: mode === 'login' ? '#fff' : 'var(--ink)',
              transition: 'all 0.18s',
              boxShadow: mode === 'login' ? '0 3px 10px rgba(99,102,241,0.4)' : 'none',
            }}
          >
            🔑 Log In
          </button>
        </div>
      )}

      <div className="panel mt2">
        <label className="label">{t('email')}</label>
        <input
          className="field" type="email" value={email} autoComplete="email"
          onChange={(e) => { setEmail(e.target.value); setErr(''); }}
          onKeyDown={handleKey}
          placeholder="parent@email.com"
        />

        {mode !== 'forgot' && (
          <div className="mt">
            <label className="label">{t('password')}</label>
            <input
              className="field" type="password" value={pw}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              onChange={(e) => { setPw(e.target.value); setErr(''); }}
              onKeyDown={handleKey}
              placeholder="8+ characters"
            />
          </div>
        )}

        {err && <p style={{ color: '#ef4444', fontWeight: 700, marginTop: 10, fontSize: '0.9rem' }}>{err}</p>}

        <button
          className="btn block mt"
          onClick={submit}
          disabled={!valid || loading}
          style={{ opacity: (!valid || loading) ? 0.7 : 1 }}
        >
          {loading ? '⏳ Please wait…' :
           mode === 'signup' ? '✨ Create Account' :
           mode === 'forgot' ? '📧 Send Reset Link' :
           '🔑 Log In'}
        </button>

        {mode === 'login' && (
          <>
            <button
              className="btn ghost block"
              style={{ marginTop: 8, fontSize: '0.88rem' }}
              onClick={() => { setMode('forgot'); setErr(''); }}
            >
              Forgot password?
            </button>
          </>
        )}

        {mode === 'forgot' && (
          <>
            <button className="btn ghost block mt" onClick={() => { setMode('login'); setErr(''); }}>
              ← Back to Login
            </button>
          </>
        )}
      </div>

      <p className="center muted mt2" style={{ fontSize: '0.85rem' }}>{t('trialNote')}</p>
      <p className="center muted"     style={{ fontSize: '0.8rem'  }}>{t('demoNote')}</p>
    </Screen>
  );
}

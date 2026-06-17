import { useEffect, useState } from 'react';
import { useApp } from './context/AppContext.jsx';
import { Sky } from './components/ui.jsx';
import Login          from './screens/Login.jsx';
import ProfilePicker  from './screens/ProfilePicker.jsx';
import DayMap         from './screens/DayMap.jsx';
import Rewards        from './screens/Rewards.jsx';
import Payment        from './screens/Payment.jsx';
import Dashboard        from './screens/Dashboard.jsx';
import ManageProfiles   from './screens/ManageProfiles.jsx';
import Settings         from './screens/Settings.jsx';
import Admin            from './screens/Admin.jsx';
import AdventureSession from './adventure/AdventureSession.jsx';

export default function App() {
  const {
    state, lang,
    currentProfile, selectProfile,
    bootstrapped, verifyStripePayment, markPaid,
  } = useApp();

  const [screen,    setScreen]    = useState('map');
  const [activeDay, setActiveDay] = useState(1);

  // Sync <html dir> for Urdu RTL
  useEffect(() => {
    document.documentElement.dir  = lang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // After bootstrap, check URL for Stripe/JazzCash payment redirect
  useEffect(() => {
    if (!bootstrapped) return;
    const params     = new URLSearchParams(window.location.search);
    const payStatus  = params.get('payment');
    if (payStatus !== 'success') return;

    // Clean the URL immediately so reloads don't re-trigger
    window.history.replaceState({}, '', window.location.pathname);

    const sessionId = params.get('session_id');
    if (sessionId) {
      // Stripe redirect: verify with backend (belt-and-suspenders over webhook)
      verifyStripePayment(sessionId).catch(() => {});
    } else {
      // JazzCash/EasyPaisa: server-side callback already marked user paid
      markPaid(params.get('gateway') || 'jazzcash');
    }
    setScreen('payment'); // Payment.jsx reads payment.status and shows success UI
  }, [bootstrapped]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Loading spinner while JWT is being validated ─────────────────
  if (!bootstrapped) {
    return (
      <>
        <Sky />
        <div className="app-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem' }}>🌙</div>
            <p style={{ fontWeight: 700, color: 'var(--ink)', marginTop: 12 }}>Loading…</p>
          </div>
        </div>
      </>
    );
  }

  // ── 1. Not logged in ─────────────────────────────────────────────
  if (!state.account) {
    return (
      <>
        <Sky />
        <div className="app-shell"><Login /></div>
      </>
    );
  }

  // ── 2. No profile selected ───────────────────────────────────────
  if (!currentProfile) {
    let body;
    if (screen === 'dashboard') {
      body = <Dashboard onBack={() => setScreen('map')} />;
    } else if (screen === 'manageProfiles') {
      body = <ManageProfiles onBack={() => setScreen('map')} />;
    } else if (screen === 'settings') {
      body = <Settings onBack={() => setScreen('map')} />;
    } else if (screen === 'admin') {
      body = <Admin onBack={() => setScreen('map')} />;
    } else {
      body = (
        <ProfilePicker
          onDashboard={() => setScreen('dashboard')}
          onManageProfiles={() => setScreen('manageProfiles')}
          onSettings={() => setScreen('settings')}
          onAdmin={() => setScreen('admin')}
        />
      );
    }
    return (
      <>
        <Sky />
        <div className="app-shell">{body}</div>
      </>
    );
  }

  // ── 3. Profile selected — main app screens ───────────────────────
  let body;

  if (screen === 'payment') {
    body = (
      <Payment
        onSuccess={() => setScreen('map')}
        onBack={() => setScreen('map')}
      />
    );
  } else if (screen === 'session') {
    body = (
      <AdventureSession
        dayNumber={activeDay}
        onBack={() => setScreen('map')}
      />
    );
  } else if (screen === 'rewards') {
    body = <Rewards onContinue={() => setScreen('map')} />;
  } else if (screen === 'settings') {
    body = <Settings onBack={() => setScreen('map')} />;
  } else if (screen === 'admin') {
    body = <Admin onBack={() => setScreen('map')} />;
  } else {
    body = (
      <DayMap
        onOpenDay={(d) => { setActiveDay(d); setScreen('session'); }}
        onPaymentRequired={() => setScreen('payment')}
        onSettings={() => setScreen('settings')}
        onBack={() => { selectProfile(null); setScreen('map'); }}
      />
    );
  }

  return (
    <>
      <Sky />
      <div className="app-shell">{body}</div>
    </>
  );
}

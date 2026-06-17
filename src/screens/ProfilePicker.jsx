import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { LangToggle, MuteToggle, Mascot, Screen } from '../components/ui.jsx';

const TIERS = {
  3: { en: 'Little Star',   ur: 'ننھا ستارہ',   icon: '🐣' },
  6: { en: 'Moon Explorer', ur: 'چاند کا مسافر', icon: '🌙' },
  7: { en: 'Space Scholar', ur: 'خلائی عالم',    icon: '🚀' },
};
const tierFor = (age) => TIERS[age] || (age <= 4 ? TIERS[3] : age >= 7 ? TIERS[7] : TIERS[6]);

const AGES = [3, 4, 5, 6, 7, 8, 9, 10];

export default function ProfilePicker({ onDashboard, onManageProfiles, onSettings, onAdmin }) {
  const { t, lang, state, selectProfile, logout, progressFor, createProfile, AVATARS } = useApp();

  const [showAdd,   setShowAdd]   = useState(false);
  const [newName,   setNewName]   = useState('');
  const [newAge,    setNewAge]    = useState(6);
  const [newAvatar, setNewAvatar] = useState('🐣');
  const [saving,    setSaving]    = useState(false);
  const [err,       setErr]       = useState('');

  const noProfiles = state.profiles.length === 0;
  const canAdd     = state.profiles.length < 4;

  const handleAdd = async () => {
    if (!newName.trim()) { setErr('Please enter your child\'s name'); return; }
    setSaving(true);
    setErr('');
    try {
      await createProfile({ name: newName.trim(), age: newAge, avatar: newAvatar });
      setNewName('');
      setNewAge(6);
      setNewAvatar('🐣');
      setShowAdd(false);
    } catch (e) {
      setErr(e.response?.data?.message || 'Could not save profile. Try again.');
    } finally {
      setSaving(false);
    }
  };

  // ── Add profile form ─────────────────────────────────────────────
  const AddForm = () => (
    <div className="panel" style={{ marginTop: 16 }}>
      <p style={{ margin: '0 0 14px', fontWeight: 800, fontSize: '1.05rem', color: 'var(--ink)' }}>
        👶 {noProfiles ? 'Add your first child' : 'Add another child'}
      </p>

      {/* Avatar picker */}
      <p className="label" style={{ color: 'var(--ink)', marginBottom: 8 }}>Pick an avatar</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {AVATARS.map((a) => (
          <button key={a} onClick={() => setNewAvatar(a)} style={{
            fontSize: '1.8rem', borderRadius: 14, padding: '6px 10px',
            border: newAvatar === a ? '3px solid #f97316' : '2px solid rgba(0,0,0,0.12)',
            background: newAvatar === a ? 'rgba(249,115,22,0.12)' : 'transparent',
            cursor: 'pointer',
          }}>
            {a}
          </button>
        ))}
      </div>

      {/* Name */}
      <label className="label" style={{ color: 'var(--ink)' }}>Child's name</label>
      <input
        className="field"
        value={newName}
        maxLength={20}
        placeholder="e.g. Ahmed, Sara, Zaid…"
        onChange={(e) => { setNewName(e.target.value); setErr(''); }}
        autoFocus
      />

      {/* Age */}
      <div className="mt">
        <label className="label" style={{ color: 'var(--ink)' }}>Age</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
          {AGES.map((a) => (
            <button key={a} onClick={() => setNewAge(a)} style={{
              padding: '8px 16px', borderRadius: 99, fontWeight: 700, fontSize: '1rem',
              border: newAge === a ? '2.5px solid #f97316' : '2px solid rgba(0,0,0,0.12)',
              background: newAge === a ? '#f97316' : 'rgba(0,0,0,0.04)',
              color: newAge === a ? '#fff' : 'var(--ink)',
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
              {a}
            </button>
          ))}
        </div>
      </div>

      {err && <p style={{ color: '#ef4444', fontWeight: 600, marginTop: 10, fontSize: '0.9rem' }}>{err}</p>}

      <div className="row mt" style={{ gap: 10 }}>
        <button
          className="btn block"
          style={{ flex: 2, opacity: saving ? 0.7 : 1 }}
          onClick={handleAdd}
          disabled={saving}
        >
          {saving ? 'Saving…' : `Save ${newAvatar} ${newName || 'Profile'}`}
        </button>
        {!noProfiles && (
          <button className="btn ghost" style={{ flex: 1, color: 'var(--ink)' }}
            onClick={() => { setShowAdd(false); setErr(''); }}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );

  // ── No profiles yet — full onboarding ───────────────────────────
  if (noProfiles) {
    return (
      <Screen>
        <div className="between">
          <button className="chip" style={{ cursor: 'pointer' }} onClick={logout}>↩ {t('logout')}</button>
          <LangToggle />
        </div>
        <div className="center mt2">
          <Mascot id="noor" cheer />
          <h2 className="h-title mt">Welcome! Let's set up your child's profile</h2>
          <p className="muted">Enter your child's name, pick an avatar, and choose their age to get started.</p>
        </div>
        <AddForm />
      </Screen>
    );
  }

  // ── Has profiles ─────────────────────────────────────────────────
  return (
    <Screen>
      {/* top bar */}
      <div className="between">
        <button className="chip" style={{ cursor: 'pointer' }} onClick={logout}>
          ↩ {t('logout')}
        </button>
        <div className="row">
          <MuteToggle />
          <LangToggle />
          {onSettings && (
            <button className="chip" style={{ cursor: 'pointer', fontSize: '1.1rem' }} onClick={onSettings}>⚙️</button>
          )}
          {onAdmin && state.account?.isAdmin && (
            <button className="chip" style={{ cursor: 'pointer', fontSize: '1.1rem', background: 'rgba(255,93,143,0.25)' }} onClick={onAdmin}>🛡️</button>
          )}
        </div>
      </div>

      {/* title */}
      <div className="center mt2">
        <Mascot id="noor" cheer />
        <h2 className="h-title mt">{t('whosLearning')}</h2>
      </div>

      {/* profile tiles */}
      <div className="grid2 mt2">
        {state.profiles.map((p, i) => {
          const tier = tierFor(p.age);
          const pr   = progressFor(p.id);
          return (
            <button key={p.id} className="card pop"
              style={{ animationDelay: `${i * 70}ms`, textAlign: 'center', cursor: 'pointer', color: '#fff' }}
              onClick={() => selectProfile(p.id)}>
              <div style={{ fontSize: '3rem', animation: 'bob 2.6s ease-in-out infinite' }}>
                {p.avatar}
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.2rem', marginTop: 4 }}>{p.name}</div>
              <div className="chip" style={{ marginTop: 8 }}>
                {tier.icon} {lang === 'ur' ? tier.ur : tier.en}
              </div>
              <div className="muted" style={{ marginTop: 8, fontSize: '0.88rem' }}>
                {t('age')} {p.age} · {t('day')} {pr.day}
              </div>
              {(pr.loginStreak ?? 0) > 1 && (
                <div style={{ marginTop: 4, fontSize: '0.82rem' }}>🔥 {pr.loginStreak} {t('streak')}</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Add child button */}
      {canAdd && !showAdd && (
        <button
          className="btn ghost block mt2"
          style={{ color: 'var(--ink)', border: '2px dashed rgba(0,0,0,0.2)', fontSize: '1rem', fontWeight: 700 }}
          onClick={() => setShowAdd(true)}
        >
          ➕ Add another child ({state.profiles.length}/4)
        </button>
      )}

      {showAdd && <AddForm />}

      {/* parent actions */}
      <div className="row mt2" style={{ justifyContent: 'center', gap: 10 }}>
        <button className="btn teal" style={{ fontSize: '0.95rem', padding: '12px 18px' }} onClick={onDashboard}>
          📊 {t('viewDashboard')}
        </button>
        <button className="btn ghost" style={{ fontSize: '0.95rem', padding: '12px 18px' }} onClick={onManageProfiles}>
          ⚙️ {t('manageProfiles')}
        </button>
      </div>

      <p className="center muted mt2" style={{ fontSize: '0.8rem' }}>{t('trialNote')}</p>
    </Screen>
  );
}

import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { Screen } from '../components/ui.jsx';

export default function ManageProfiles({ onBack }) {
  const { t, lang, state, updateProfile, AVATARS } = useApp();
  const [editing, setEditing] = useState(null);  // profile id
  const [name, setName]       = useState('');
  const [age, setAge]         = useState(6);
  const [avatar, setAvatar]   = useState('🐣');

  const startEdit = (p) => {
    setEditing(p.id);
    setName(p.name);
    setAge(p.age);
    setAvatar(p.avatar);
  };

  const save = () => {
    if (!name.trim()) return;
    updateProfile(editing, { name: name.trim(), age: Math.min(12, Math.max(3, Number(age))), avatar });
    setEditing(null);
  };

  return (
    <Screen>
      <div className="between">
        <button className="chip" style={{ cursor: 'pointer' }} onClick={onBack}>↩ {t('whosLearning')}</button>
        <h3 style={{ margin: 0 }}>{t('manageProfiles')}</h3>
      </div>

      <div className="col mt2">
        {state.profiles.map((p) =>
          editing === p.id ? (
            /* ── edit form ──────────────────────────────────────── */
            <div key={p.id} className="panel">
              <p style={{ margin: '0 0 12px', fontWeight: 700, color: 'var(--ink)' }}>
                {t('editProfile')}
              </p>

              {/* avatar picker */}
              <p className="label" style={{ color: 'var(--ink)', marginBottom: 8 }}>{t('pickAvatar')}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                {AVATARS.map((a) => (
                  <button key={a}
                    onClick={() => setAvatar(a)}
                    style={{
                      fontSize: '1.7rem', borderRadius: 14, padding: '6px 10px',
                      border: avatar === a ? '3px solid var(--gold-2)' : '2px solid rgba(0,0,0,0.1)',
                      background: avatar === a ? 'rgba(255,216,107,0.2)' : 'transparent',
                      cursor: 'pointer',
                    }}>
                    {a}
                  </button>
                ))}
              </div>

              {/* name */}
              <label className="label" style={{ color: 'var(--ink)' }}>{t('name')}</label>
              <input
                className="field"
                value={name}
                maxLength={20}
                onChange={(e) => setName(e.target.value)}
              />

              {/* age */}
              <div className="mt">
                <label className="label" style={{ color: 'var(--ink)' }}>{t('age')} (3–12)</label>
                <input
                  className="field"
                  type="number" min={3} max={12}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="row mt">
                <button className="btn lime" style={{ flex: 1 }} onClick={save}>
                  {t('saveProfile')} ✓
                </button>
                <button className="btn ghost" style={{ flex: 1, color: 'var(--ink)' }}
                  onClick={() => setEditing(null)}>
                  {t('cancelEdit')}
                </button>
              </div>
            </div>
          ) : (
            /* ── profile tile ──────────────────────────────────── */
            <div key={p.id} className="card between" style={{ alignItems: 'center' }}>
              <div className="row">
                <span style={{ fontSize: '2.4rem' }}>{p.avatar}</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.15rem' }}>{p.name}</div>
                  <div className="muted" style={{ fontSize: '0.88rem' }}>{t('age')} {p.age}</div>
                </div>
              </div>
              <button className="btn teal"
                style={{ padding: '10px 18px', fontSize: '0.95rem', minHeight: 'unset' }}
                onClick={() => startEdit(p)}>
                ✏️ {t('editProfile')}
              </button>
            </div>
          )
        )}
      </div>
    </Screen>
  );
}

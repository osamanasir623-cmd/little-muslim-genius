import { useApp } from '../context/AppContext.jsx';
import { Mascot, Screen } from '../components/ui.jsx';

const WORLD_COLORS = {
  light:   'var(--gold-1)',
  compute: 'var(--teal-1)',
  ai:      'var(--coral-1)',
  data:    'var(--lime-1)',
};

function StatPill({ icon, value, label, color }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: 18,
      padding: '12px 16px',
      textAlign: 'center',
      flex: 1,
    }}>
      <div style={{ fontSize: '1.6rem' }}>{icon}</div>
      <div style={{ fontWeight: 800, fontSize: '1.4rem', color: color ?? 'var(--gold-1)' }}>{value}</div>
      <div style={{ fontSize: '0.78rem', opacity: 0.75 }}>{label}</div>
    </div>
  );
}

function ProgressBar({ pct, color }) {
  return (
    <div style={{ height: 10, borderRadius: 99, background: 'rgba(0,0,0,0.12)', overflow: 'hidden', marginTop: 8 }}>
      <div style={{
        height: '100%', width: `${pct}%`,
        background: color ?? 'var(--grad-teal)',
        borderRadius: 99,
        transition: 'width 0.6s cubic-bezier(.4,0,.2,1)',
        boxShadow: '0 0 8px rgba(79,240,212,0.5)',
      }} />
    </div>
  );
}

export default function Dashboard({ onBack }) {
  const { t, lang, state, progressFor, logout, days } = useApp();
  const TOTAL_DAYS = days.length || 90;

  return (
    <Screen>
      {/* header */}
      <div className="between">
        <button className="chip" style={{ cursor: 'pointer' }} onClick={onBack}>↩ {t('whosLearning')}</button>
        <button className="chip" style={{ cursor: 'pointer' }} onClick={logout}>↩ {t('logout')}</button>
      </div>

      <div className="center mt">
        <Mascot id="fikri" size="3rem" />
        <h2 className="h-title mt">{t('dashboard')}</h2>
        <p className="muted" style={{ fontSize: '0.9rem' }}>{state.account?.email}</p>
      </div>

      {/* Payment status banner */}
      <div className="card mt2" style={{
        background: state.payment?.status === 'paid'
          ? 'rgba(111, 209, 60, 0.2)'
          : 'rgba(255, 216, 107, 0.15)',
        border: '1px solid rgba(255,255,255,0.2)',
      }}>
        <div className="between">
          <span style={{ fontWeight: 700, fontSize: '1rem' }}>
            {state.payment?.status === 'paid' ? t('fullAccess') : t('trialStatus')}
          </span>
          {state.payment?.method && (
            <span className="chip" style={{ fontSize: '0.8rem' }}>{state.payment.method}</span>
          )}
        </div>
        {state.payment?.paidAt && (
          <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: 4 }}>
            Paid: {new Date(state.payment.paidAt).toLocaleDateString()}
          </div>
        )}
      </div>

      {/* Per-child cards */}
      <div className="col mt2">
        {state.profiles.map((profile) => {
          const pr = progressFor(profile.id);
          const pct = TOTAL_DAYS > 0
            ? Math.round((pr.completedDays.length / TOTAL_DAYS) * 100)
            : 0;

          return (
            <div key={profile.id} className="panel">
              {/* child header */}
              <div className="between">
                <div className="row">
                  <span style={{ fontSize: '2.2rem' }}>{profile.avatar}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--ink)' }}>{profile.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--ink)', opacity: 0.6 }}>
                      {t('age')} {profile.age}
                    </div>
                  </div>
                </div>
                <div style={{
                  fontWeight: 800, fontSize: '1.3rem',
                  color: pct >= 50 ? 'var(--lime-2)' : 'var(--ink)',
                }}>
                  {pct}%
                </div>
              </div>

              {/* progress bar */}
              <ProgressBar pct={pct} />

              {/* stats row */}
              <div className="row mt" style={{ gap: 8 }}>
                <StatPill icon="⭐" value={pr.stars}  label={t('stars')}  color="var(--gold-1)" />
                <StatPill icon="📿" value={pr.beads}  label={t('beads')}  color="var(--teal-1)" />
                <StatPill icon="🏅" value={pr.badges} label={t('badges')} color="var(--coral-1)" />
              </div>

              {/* streak + sticker row */}
              <div className="row mt" style={{ gap: 8, justifyContent: 'center' }}>
                <span className="chip" style={{ fontSize: '0.9rem' }}>
                  🔥 {pr.loginStreak ?? 0} {t('streak')}
                </span>
                <span className="chip" style={{ fontSize: '0.9rem' }}>
                  🎨 {pr.stickers ?? 0} {t('stickers')}
                </span>
                <span className="chip" style={{ fontSize: '0.9rem' }}>
                  📅 {t('day')} {pr.day}/{TOTAL_DAYS}
                </span>
              </div>

              {/* completed days mini-dots */}
              {pr.completedDays.length > 0 && (
                <div className="row mt" style={{ flexWrap: 'wrap', gap: 5 }}>
                  {Array.from({ length: TOTAL_DAYS }, (_, i) => {
                    const d = i + 1;
                    return (
                      <span key={d} style={{
                        width: 28, height: 28, borderRadius: '50%', display: 'grid', placeItems: 'center',
                        fontSize: '0.7rem', fontWeight: 700,
                        background: pr.completedDays.includes(d)
                          ? 'var(--grad-lime)'
                          : 'rgba(0,0,0,0.08)',
                        color: pr.completedDays.includes(d) ? 'var(--ink)' : 'rgba(0,0,0,0.35)',
                      }}>
                        {d}
                      </span>
                    );
                  })}
                </div>
              )}

              {pr.completedDays.length === 0 && (
                <p style={{ fontSize: '0.85rem', opacity: 0.5, marginTop: 10, color: 'var(--ink)' }}>
                  {t('noActivity')}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <p className="center muted mt2" style={{ fontSize: '0.8rem' }}>
        {t('analyticsNote')}
      </p>
      <p className="center muted" style={{ fontSize: '0.8rem' }}>
        💾 {t('demoNote')}
      </p>
    </Screen>
  );
}

import { useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { Confetti, Mascot, Screen, chime } from '../components/ui.jsx';

// Each badge earned constructs one building in the child's Islamic city
const CITY_BUILDINGS = [
  { icon: '🏠', en: 'Home',         ur: 'گھر' },
  { icon: '🌴', en: 'Garden',       ur: 'باغ' },
  { icon: '🕌', en: 'Masjid',       ur: 'مسجد' },
  { icon: '🏫', en: 'School',       ur: 'مدرسہ' },
  { icon: '🛖', en: 'Village Hut',  ur: 'گاؤں کا گھر' },
  { icon: '⭐', en: 'Star Tower',   ur: 'ستارہ مینار' },
  { icon: '🌙', en: 'Moon Palace',  ur: 'چاند محل' },
];

export default function Rewards({ onContinue }) {
  const { t, lang, currentProfile, progressFor, state } = useApp();
  const pr = progressFor(currentProfile.id);

  useEffect(() => { chime('win', state.muted); }, []);

  const earnedBuildings = useMemo(
    () => CITY_BUILDINGS.slice(0, Math.min(pr.badges, CITY_BUILDINGS.length)),
    [pr.badges]
  );
  const nextBuilding = CITY_BUILDINGS[earnedBuildings.length] ?? null;

  return (
    <Screen>
      <Confetti count={80} />

      <div className="center mt2" style={{ paddingBottom: 40 }}>
        {/* cheering mascots */}
        <div className="row" style={{ justifyContent: 'center', gap: 4 }}>
          <Mascot id="noor"  cheer />
          <Mascot id="zappy" cheer />
          <Mascot id="fikri" cheer />
          <Mascot id="ullu"  cheer />
        </div>

        <h1 className="h-title mt2" style={{ fontSize: '2rem' }}>
          {t('youEarned')} 🎉
        </h1>

        {/* Stars / Beads / Badges */}
        <div className="panel mt2">
          <div className="grid2" style={{ gap: 12 }}>
            <div className="card center pop" style={{ padding: '18px 10px' }}>
              <div style={{ fontSize: '2.6rem' }}>⭐</div>
              <div style={{ fontWeight: 800, fontSize: '1.8rem', color: 'var(--gold-1)' }}>{pr.stars}</div>
              <div className="muted" style={{ fontSize: '0.88rem' }}>{t('stars')}</div>
            </div>
            <div className="card center pop" style={{ padding: '18px 10px', animationDelay: '80ms' }}>
              <div style={{ fontSize: '2.6rem' }}>📿</div>
              <div style={{ fontWeight: 800, fontSize: '1.8rem', color: 'var(--teal-1)' }}>{pr.beads}</div>
              <div className="muted" style={{ fontSize: '0.88rem' }}>{t('beads')}</div>
            </div>
          </div>

          <div className="card center pop mt" style={{ padding: '18px 10px', animationDelay: '160ms' }}>
            <div style={{ fontSize: '2.6rem' }}>🏅</div>
            <div style={{ fontWeight: 800, fontSize: '1.8rem', color: 'var(--coral-1)' }}>{pr.badges}</div>
            <div className="muted" style={{ fontSize: '0.88rem' }}>{t('badges')}</div>
          </div>

          {/* streak sticker */}
          {(pr.stickers ?? 0) > 0 && (
            <div className="card center pop mt" style={{ padding: '14px 10px', animationDelay: '240ms' }}>
              <div style={{ fontSize: '2.2rem' }}>🎨</div>
              <div style={{ fontWeight: 800, fontSize: '1.5rem' }}>{pr.stickers}</div>
              <div className="muted" style={{ fontSize: '0.88rem' }}>{t('stickers')}</div>
            </div>
          )}
        </div>

        {/* ── Islamic City Builder ───────────────────────────────── */}
        {pr.badges > 0 && (
          <div className="panel mt2 pop" style={{ animationDelay: '300ms' }}>
            <div className="between" style={{ marginBottom: 10 }}>
              <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--ink)' }}>
                🏙️ {t('yourCity')}
              </span>
              <span className="chip" style={{ fontSize: '0.8rem', background: 'rgba(0,0,0,0.07)', color: 'var(--ink)' }}>
                {earnedBuildings.length}/{CITY_BUILDINGS.length}
              </span>
            </div>

            {/* city grid */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 10,
              justifyContent: 'center', marginBottom: 10,
            }}>
              {CITY_BUILDINGS.map((b, i) => {
                const built = i < earnedBuildings.length;
                return (
                  <div key={i} style={{
                    textAlign: 'center', opacity: built ? 1 : 0.25,
                    filter: built ? 'none' : 'grayscale(1)',
                    transform: built ? 'scale(1)' : 'scale(0.85)',
                    transition: 'all 0.3s',
                  }}>
                    <div style={{ fontSize: '2.4rem' }}>{b.icon}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--ink)', fontWeight: 600, marginTop: 2 }}>
                      {lang === 'ur' ? b.ur : b.en}
                    </div>
                  </div>
                );
              })}
            </div>

            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--ink)', opacity: 0.65, textAlign: 'center' }}>
              {t('cityGrows')}
            </p>

            {nextBuilding && (
              <p style={{ margin: '8px 0 0', fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink)', textAlign: 'center' }}>
                {t('nextBuilding')} {nextBuilding.icon} {lang === 'ur' ? nextBuilding.ur : nextBuilding.en}
              </p>
            )}
          </div>
        )}

        {/* ── Cartoon Episode Unlocks ─────────────────────────────── */}
        {(() => {
          const unlocked = Math.floor((pr.completedDays ?? []).length / 3);
          if (unlocked === 0) return null;
          const EPISODES = [
            { icon: '🌍', title: { en: 'The Story of Adam ﷺ', ur: 'حضرت آدم ؑ کی کہانی' } },
            { icon: '🚢', title: { en: 'Nuh ﷺ and the Ark', ur: 'نوح ؑ کی کشتی' } },
            { icon: '🔥', title: { en: 'Ibrahim ﷺ in the Fire', ur: 'ابراہیم ؑ اور آگ' } },
            { icon: '🐋', title: { en: 'Yunus ﷺ and the Whale', ur: 'یونس ؑ اور مچھلی' } },
            { icon: '🌙', title: { en: 'The Night of Power', ur: 'لیلۃ القدر' } },
            { icon: '🕌', title: { en: 'The First Masjid', ur: 'پہلی مسجد' } },
            { icon: '🌟', title: { en: 'The Birth of the Prophet ﷺ', ur: 'نبی کریم ﷺ کی ولادت' } },
            { icon: '🦅', title: { en: 'The Year of the Elephant', ur: 'عام الفیل' } },
            { icon: '📖', title: { en: 'The First Revelation', ur: 'پہلی وحی' } },
            { icon: '🏆', title: { en: 'You are the Champion!', ur: 'تم چیمپئن ہو!' } },
          ];
          const available = EPISODES.slice(0, Math.min(unlocked, EPISODES.length));
          return (
            <div className="panel mt2 pop" style={{ animationDelay: '400ms' }}>
              <p style={{ margin: '0 0 10px', fontWeight: 800, fontSize: '1.05rem', color: 'var(--ink)' }}>
                🎬 {lang === 'ur' ? 'ان لاک کہانیاں' : 'Unlocked Stories'} ({unlocked}/{EPISODES.length})
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {available.map((ep, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.18)', borderRadius: 14,
                    padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <span style={{ fontSize: '1.6rem' }}>{ep.icon}</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)' }}>
                      {lang === 'ur' ? ep.title.ur : ep.title.en}
                    </span>
                  </div>
                ))}
              </div>
              <p style={{ margin: '10px 0 0', fontSize: '0.78rem', color: 'var(--ink)', opacity: 0.6 }}>
                {lang === 'ur' ? 'ہر 3 دن مکمل کرنے پر نئی کہانی ان لاک ہوتی ہے!' : 'Complete every 3 days to unlock a new story!'}
              </p>
            </div>
          );
        })()}

        <button className="btn block mt2" style={{ fontSize: '1.1rem' }} onClick={onContinue}>
          {t('comeBack')} ➜
        </button>
      </div>
    </Screen>
  );
}

import { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { GAMES } from '../games/index.jsx';
import { ProgressRing, MuteToggle, LangToggle, Screen, chime } from '../components/ui.jsx';

// Set to 60 for production. Change to e.g. 1 for quick testing.
const SESSION_MINUTES = 60;

export default function Session({ dayNumber, onFinish, onBack }) {
  const { t, lang, currentProfile, addRewards, saveTimerState, getTimerState, clearTimerState, state, days } = useApp();
  const day = days.find((d) => d.dayNumber === dayNumber) ?? days[dayNumber - 1];

  if (!day) {
    return (
      <Screen>
        <div className="center mt2">
          <span style={{ fontSize: '3rem', animation: 'bob 1s ease-in-out infinite' }}>⏳</span>
          <p style={{ color: 'var(--ink)', marginTop: 16 }}>Loading…</p>
          <button className="btn ghost block mt2" onClick={onBack}>↩ Back</button>
        </div>
      </Screen>
    );
  }
  const total = SESSION_MINUTES * 60;

  // Restore timer from where child left off, or start fresh
  const savedSeconds = getTimerState(currentProfile.id, dayNumber);
  const [secondsLeft, setSecondsLeft] = useState(savedSeconds !== null ? savedSeconds : total);
  const [running, setRunning]         = useState(false);
  const [idx, setIdx]                 = useState(0);
  const [doneGames, setDoneGames]     = useState([]);

  // Keep a ref so the cleanup effect captures the latest value
  const secondsRef = useRef(secondsLeft);
  useEffect(() => { secondsRef.current = secondsLeft; }, [secondsLeft]);

  // Countdown
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [running]);

  // Auto-save timer every 30 s and on unmount (handles tab close / navigation)
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      saveTimerState(currentProfile.id, dayNumber, secondsRef.current);
    }, 30_000);
    return () => {
      clearInterval(id);
      saveTimerState(currentProfile.id, dayNumber, secondsRef.current);
    };
  }, [running, currentProfile.id, dayNumber, saveTimerState]);

  const allDone  = doneGames.length >= day.games.length;
  const canFinish = allDone && secondsLeft === 0;
  const mm       = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss       = String(secondsLeft % 60).padStart(2, '0');
  const progress = 1 - secondsLeft / total;

  const handleGameDone = (rewards) => {
    if (doneGames.includes(idx)) return;
    setDoneGames((d) => [...d, idx]);
    addRewards(currentProfile.id, rewards);
  };

  const handleNext = () => {
    chime('tap', state.muted);
    setIdx((i) => (i + 1) % day.games.length);
  };

  const finish = () => {
    chime('win', state.muted);
    clearTimerState(currentProfile.id, dayNumber);
    onFinish(dayNumber);
  };

  // ── Pre-start screen ───────────────────────────────────────────────
  if (!running) {
    const hasResume = savedSeconds !== null && savedSeconds < total;
    return (
      <Screen>
        <div className="center mt2">
          <h2 className="h-title">{t('day')} {dayNumber}</h2>
          <p className="muted">{lang === 'ur' ? day.title.ur : day.title.en}</p>

          <div className="panel mt2 center">
            <p style={{ marginTop: 0 }}>{t('todaysMix')}:</p>
            <div className="row" style={{ justifyContent: 'center', fontSize: '2rem', gap: 10 }}>
              {day.games.map((g, i) => <span key={i}>{iconFor(g.type)}</span>)}
            </div>
            {hasResume && (
              <div className="chip mt" style={{ justifyContent: 'center', background: 'rgba(79,240,212,0.18)' }}>
                ⏱️ {lang === 'ur' ? 'آپ کا سیشن جاری ہے' : 'Session in progress'} — {Math.floor(savedSeconds / 60)}m left
              </div>
            )}
            <p className="muted" style={{ fontSize: '0.85rem', marginTop: 12 }}>{t('parentNote')}</p>
          </div>

          <button className="btn block mt2" onClick={() => { chime('tap', state.muted); setRunning(true); }}>
            ▶ {hasResume ? (lang === 'ur' ? 'جاری رکھیں' : 'Continue') : t('beginToday')}
          </button>
          <button className="btn ghost block mt" onClick={onBack}>↩ {t('backToMap')}</button>
        </div>
      </Screen>
    );
  }

  const GameComp = GAMES[day.games[idx]?.type];

  // ── Active session ─────────────────────────────────────────────────
  return (
    <Screen>
      <div className="between">
        <button className="chip" style={{ cursor: 'pointer' }} onClick={onBack}>↩</button>
        <div className="row"><MuteToggle /><LangToggle /></div>
      </div>

      {/* Timer ring */}
      <div className="center mt" style={{ display: 'grid', placeItems: 'center' }}>
        <ProgressRing progress={progress}>
          <div>
            <div className="muted" style={{ fontSize: '0.72rem' }}>{t('timeLeft')}</div>
            <div className="ring-time">{mm}:{ss}</div>
          </div>
        </ProgressRing>

        {/* game-step dots */}
        <div className="row mt" style={{ justifyContent: 'center', gap: 10 }}>
          {day.games.map((_, i) => (
            <span key={i} style={{
              width: 14, height: 14, borderRadius: '50%',
              background: doneGames.includes(i)
                ? 'var(--lime-1)'
                : i === idx
                ? 'var(--gold-1)'
                : 'rgba(255,255,255,0.22)',
              boxShadow: i === idx ? '0 0 8px var(--gold-1)' : 'none',
            }} />
          ))}
        </div>
      </div>

      {/* Active game */}
      <div className="mt2">
        {GameComp
          ? <GameComp key={idx} game={day.games[idx]} onDone={handleGameDone} />
          : <p className="center muted">Unknown game type: {day.games[idx]?.type}</p>
        }
      </div>

      {/* Prev / Next / Finish */}
      <div className="between mt2">
        <button className="btn ghost" disabled={idx === 0} onClick={() => setIdx((i) => i - 1)}>‹</button>

        {canFinish ? (
          <button className="btn lime" onClick={finish}>
            {t('finishDay')} 🎉
          </button>
        ) : idx < day.games.length - 1 ? (
          <button className="btn teal" onClick={handleNext}>
            {t('next')} ›
          </button>
        ) : (
          <button className="btn teal" onClick={handleNext}>
            {allDone
              ? (lang === 'ur' ? 'دوبارہ 🔄' : 'Keep going 🔄')
              : `${t('next')} ›`}
          </button>
        )}
      </div>

      {/* Timer-not-done hint */}
      {allDone && secondsLeft > 0 && (
        <p className="center muted" style={{ fontSize: '0.8rem', marginTop: 8 }}>
          {lang === 'ur'
            ? 'شاباش! وقت ختم ہونے تک مشق جاری رکھیں ⏱️'
            : 'Great job! Keep practising until time is up ⏱️'}
        </p>
      )}
    </Screen>
  );
}

function iconFor(type) {
  return {
    quranStar:      '📖',
    hadithStory:    '🕌',
    namesMatch:     '✨',
    binary:         '💡',
    quiz:           '🧠',
    fivePillars:    '🏛️',
    robotChef:      '⚡',
    dataSort:       '📊',
    patternFinder:  '🔍',
    prophetJourney: '📿',
    mannersSort:    '🤝',
    inputOutput:    '⌨️',
    commandRobot:   '🤖',
    aiOrHuman:      '👁️',
    goodBadAI:      '⚖️',
    makeChart:      '📈',
    buildBrain:     '🧬',
    trainNetwork:   '🎓',
    layersGame:     '🗂️',
    isThisACat:     '🔎',
    learningRace:   '🏁',
    designAI:       '🛠️',
  }[type] || '🎮';
}

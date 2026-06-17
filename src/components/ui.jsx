import { useEffect, useMemo, useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { useSpeech } from '../hooks/useSpeech.js';
import { MASCOTS } from '../data/content.js';

/* ---------- Living background: stars, clouds, moon ---------- */
export function Sky() {
  const stars = useMemo(
    () => Array.from({ length: 26 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 8 + Math.random() * 12,
      delay: Math.random() * 3,
    })), []);
  const clouds = useMemo(
    () => Array.from({ length: 3 }, (_, i) => ({
      id: i, top: 12 + i * 26, dur: 40 + i * 18, delay: i * 8,
    })), []);
  return (
    <>
      <div className="sky" aria-hidden="true">
        {stars.map((s) => (
          <span key={s.id} className="star"
            style={{ top: `${s.top}%`, left: `${s.left}%`, fontSize: `${s.size}px`, animationDelay: `${s.delay}s` }}>✦</span>
        ))}
        {clouds.map((c) => (
          <span key={c.id} className="cloud"
            style={{ top: `${c.top}%`, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}>☁️</span>
        ))}
      </div>
      <span className="moon" aria-hidden="true">🌙</span>
    </>
  );
}

/* ---------- Mascot guide ---------- */
export function Mascot({ id = 'noor', cheer = false, size = '3.4rem' }) {
  const m = MASCOTS[id] || MASCOTS.noor;
  return <span className={`mascot ${cheer ? 'cheer' : ''}`} style={{ fontSize: size }} aria-hidden="true">{m.emoji}</span>;
}

/* ---------- Confetti burst ---------- */
export function Confetti({ count = 60 }) {
  const colors = ['#ffd86b', '#4ff0d4', '#ff5d8f', '#b6f36b', '#7fc8ff', '#ffa3e0'];
  const pieces = useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      bg: colors[i % colors.length],
      dur: 2 + Math.random() * 2,
      delay: Math.random() * 0.6,
    })), [count]);
  return (
    <div aria-hidden="true">
      {pieces.map((p) => (
        <span key={p.id} className="confetti-piece"
          style={{ left: `${p.left}vw`, background: p.bg, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }} />
      ))}
    </div>
  );
}

/* ---------- Listen button (Web Speech, picks language) ---------- */
export function ListenButton({ en, ur, lang, label }) {
  const { t } = useApp();
  const speak = useSpeech();
  const text = lang === 'ur' ? (ur ?? en) : (en ?? ur);
  return (
    <button className="btn teal" style={{ fontSize: '1rem', padding: '12px 18px' }}
      onClick={() => speak(text, lang)} aria-label={`${label ?? t('listen')}`}>
      🔊 {label ?? t('listen')}
    </button>
  );
}

/* ---------- Language toggle ---------- */
export function LangToggle() {
  const { lang, setLanguage } = useApp();
  return (
    <div className="row" role="group" aria-label="Language">
      <button className={`chip ${lang === 'en' ? 'on' : ''}`} style={chip(lang === 'en')} onClick={() => setLanguage('en')}>🇬🇧 EN</button>
      <button className={`chip ${lang === 'ur' ? 'on' : ''}`} style={chip(lang === 'ur')} onClick={() => setLanguage('ur')}>🇵🇰 اردو</button>
    </div>
  );
}
const chip = (on) => ({
  cursor: 'pointer',
  background: on ? 'var(--grad-gold)' : 'rgba(255,255,255,0.16)',
  color: on ? 'var(--ink)' : 'var(--paper)',
});

/* ---------- Mute toggle ---------- */
export function MuteToggle() {
  const { state, toggleMute } = useApp();
  return (
    <button className="chip" style={{ cursor: 'pointer' }} onClick={toggleMute}
      aria-label={state.muted ? 'Unmute' : 'Mute'}>
      {state.muted ? '🔇' : '🔊'}
    </button>
  );
}

/* ---------- Animated progress ring (timer) ---------- */
export function ProgressRing({ progress = 0, children }) {
  const r = 64, c = 2 * Math.PI * r;
  const off = c * (1 - Math.min(1, Math.max(0, progress)));
  return (
    <div className="ring-wrap">
      <svg width="150" height="150" style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id="ringg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4ff0d4" />
            <stop offset="1" stopColor="#ffd86b" />
          </linearGradient>
        </defs>
        <circle cx="75" cy="75" r={r} stroke="rgba(255,255,255,0.16)" strokeWidth="12" fill="none" />
        <circle cx="75" cy="75" r={r} stroke="url(#ringg)" strokeWidth="12" fill="none"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
          style={{ transition: 'stroke-dashoffset 0.9s linear', filter: 'drop-shadow(0 0 8px rgba(79,240,212,0.8))' }} />
      </svg>
      <div className="ring-label">{children}</div>
    </div>
  );
}

/* ---------- tiny WebAudio chime for taps/wins ---------- */
let audioCtx = null;
export function chime(kind = 'tap', muted = false) {
  if (muted) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const now = audioCtx.currentTime;
    const notes = kind === 'win' ? [523, 659, 784, 1047] : kind === 'correct' ? [660, 880] : [880];
    notes.forEach((f, i) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, now + i * 0.09);
      g.gain.exponentialRampToValueAtTime(0.18, now + i * 0.09 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.09 + 0.22);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(now + i * 0.09); o.stop(now + i * 0.09 + 0.24);
    });
  } catch { /* no audio */ }
}

/* ---------- mount-fade wrapper ---------- */
export function Screen({ children }) {
  const [, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return <div className="enter">{children}</div>;
}

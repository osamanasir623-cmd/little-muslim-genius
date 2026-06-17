import { useState, useCallback, useEffect, useRef } from 'react';
import GoalRush   from './games/GoalRush.jsx';
import StarBlast  from './games/StarBlast.jsx';
import MemoryFlip from './games/MemoryFlip.jsx';
import BubblePop  from './games/BubblePop.jsx';
import { useApp } from '../context/AppContext.jsx';
import { getDayContent } from '../data/dayContent.js';

// ── World themes ──────────────────────────────────────────────────────────────
const WORLDS = [
  { range:[1,18],  icon:'🕌', bg:'linear-gradient(160deg,#0ea5e9 0%,#38bdf8 35%,#4ade80 70%,#16a34a 100%)',
    cardBg:'#065f46', altBg:'#047857', accent:'#86efac', gold:'#fbbf24' },
  { range:[19,36], icon:'💻', bg:'linear-gradient(160deg,#6366f1 0%,#818cf8 35%,#38bdf8 70%,#0ea5e9 100%)',
    cardBg:'#1e1b4b', altBg:'#312e81', accent:'#a5f3fc', gold:'#4ade80' },
  { range:[37,54], icon:'🔬', bg:'linear-gradient(160deg,#c026d3 0%,#a855f7 35%,#818cf8 70%,#6366f1 100%)',
    cardBg:'#4c1d95', altBg:'#6d28d9', accent:'#f0abfc', gold:'#e879f9' },
  { range:[55,72], icon:'🌍', bg:'linear-gradient(160deg,#f97316 0%,#fb923c 35%,#fbbf24 70%,#facc15 100%)',
    cardBg:'#92400e', altBg:'#b45309', accent:'#fde68a', gold:'#fbbf24' },
  { range:[73,90], icon:'🌟', bg:'linear-gradient(160deg,#4f46e5 0%,#7c3aed 25%,#c026d3 60%,#f97316 100%)',
    cardBg:'#2d1b69', altBg:'#3b1d80', accent:'#ffd700', gold:'#ffd700' },
];
function getWorld(day) { return WORLDS.find(w => day >= w.range[0] && day <= w.range[1]) || WORLDS[0]; }

const LEVEL_LABELS = { 1: '⭐ Easy', 2: '⭐⭐ Medium', 3: '⭐⭐⭐ Hard' };
const GAME_ICONS   = { GoalRush:'⚽', StarBlast:'💫', BubblePop:'🫧', MemoryFlip:'🃏' };
const SESSION_SECS = 60 * 60;

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;

// ── Must be at module level so canvas games never remount on parent re-render ──
function GameComponent({ gameType, level, onWin, cardSetIdx }) {
  if (gameType === 'GoalRush')   return <GoalRush   onWin={onWin} level={level} />;
  if (gameType === 'StarBlast')  return <StarBlast  onWin={onWin} level={level} />;
  if (gameType === 'BubblePop')  return <BubblePop  onWin={onWin} level={level} />;
  if (gameType === 'MemoryFlip') return <MemoryFlip onWin={onWin} level={level} setIndex={cardSetIdx} />;
  return null;
}

export default function AdventureSession({ onBack, dayNumber = 1 }) {
  const { currentProfile, completeDay, addRewards, lang } = useApp();
  const world   = getWorld(dayNumber);
  const content = getDayContent(dayNumber);

  const SAVE_KEY      = `lmg_session_${currentProfile?.id}_day${dayNumber}`;
  const saved         = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
  const startTopicIdx = Math.min(saved?.topicIdx ?? 0, 3);

  // ── State ──────────────────────────────────────────────────────────────────
  const [phase,     setPhase]     = useState(startTopicIdx > 0 ? 'topic-intro' : 'warmup');
  const [topicIdx,  setTopicIdx]  = useState(startTopicIdx);
  const [gameLevel, setGameLevel] = useState(1);
  const [quizIdx,   setQuizIdx]   = useState(0);
  const [finalIdx,  setFinalIdx]  = useState(0);
  const [selected,  setSelected]  = useState(null);
  const [correct,   setCorrect]   = useState(saved?.correctCount ?? 0);
  const [timeLeft,  setTimeLeft]  = useState(SESSION_SECS);
  const [dayDone,   setDayDone]   = useState(false);

  // ── Stable refs (for zero-dep useCallback — prevents canvas RAF restart) ──
  const gameLevelRef      = useRef(1);
  const topicIdxRef       = useRef(startTopicIdx);
  const addRewardsRef     = useRef(addRewards);
  const profileRef        = useRef(currentProfile);

  useEffect(() => { addRewardsRef.current   = addRewards;      }, [addRewards]);
  useEffect(() => { profileRef.current      = currentProfile;  }, [currentProfile]);
  useEffect(() => { gameLevelRef.current    = gameLevel;       }, [gameLevel]);
  useEffect(() => { topicIdxRef.current     = topicIdx;        }, [topicIdx]);

  // ── 60-minute countdown ────────────────────────────────────────────────────
  useEffect(() => {
    if (phase === 'timesup' || phase === 'celebrate') return;
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(id); setPhase('timesup'); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  // ── Save progress when phase becomes timesup ───────────────────────────────
  useEffect(() => {
    if (phase !== 'timesup') return;
    const tIdx = topicIdxRef.current;
    if (tIdx < 4) localStorage.setItem(SAVE_KEY, JSON.stringify({ topicIdx: tIdx, correctCount: correct }));
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const saveProgress = useCallback((tIdx, c) => {
    if (tIdx >= 4) { localStorage.removeItem(SAVE_KEY); return; }
    localStorage.setItem(SAVE_KEY, JSON.stringify({ topicIdx: tIdx, correctCount: c }));
  }, [SAVE_KEY]);

  // ── handleGameWin: zero deps — stable forever, so GoalRush RAF never restarts
  const handleGameWin = useCallback(() => {
    const id = profileRef.current?.id;
    if (id) addRewardsRef.current(id, { stars: 1, beads: 1 });
    const lvl = gameLevelRef.current;
    if (lvl < 3) {
      gameLevelRef.current = lvl + 1;
      setGameLevel(lvl + 1);
    } else {
      gameLevelRef.current = 1;
      setGameLevel(1);
      setQuizIdx(0);
      setPhase('topic-quiz');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Derived data ───────────────────────────────────────────────────────────
  const currentTopic  = content.topics[topicIdx]      ?? content.topics[0];
  const currentQ      = currentTopic.questions[quizIdx] ?? currentTopic.questions[0];
  const currentFinalQ = content.finalQuiz[finalIdx]   ?? content.finalQuiz[0];

  // ── Answer topic quiz ──────────────────────────────────────────────────────
  const handleAnswer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === currentQ.correct) {
      setCorrect(c => c + 1);
      const id = profileRef.current?.id;
      if (id) addRewardsRef.current(id, { stars: 2, beads: 2 });
    }
  };

  // ── After topic quiz — next question or next topic ─────────────────────────
  const handleQuizNext = () => {
    if (quizIdx < 1) {
      setQuizIdx(1); setSelected(null); setPhase('topic-quiz');
    } else {
      const nextTopic = topicIdxRef.current + 1;
      if (nextTopic < content.topics.length) {
        topicIdxRef.current  = nextTopic;
        gameLevelRef.current = 1;
        setTopicIdx(nextTopic); setQuizIdx(0); setSelected(null);
        setGameLevel(1); setPhase('topic-intro');
        saveProgress(nextTopic, correct);
      } else {
        setFinalIdx(0); setSelected(null); setPhase('final-quiz');
        saveProgress(4, correct);
      }
    }
  };

  // ── Answer final quiz ──────────────────────────────────────────────────────
  const handleFinalAnswer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === currentFinalQ.correct) {
      setCorrect(c => c + 1);
      const id = profileRef.current?.id;
      if (id) addRewardsRef.current(id, { stars: 3, beads: 3 });
    }
  };

  // ── After final quiz ───────────────────────────────────────────────────────
  const handleFinalNext = () => {
    if (finalIdx < content.finalQuiz.length - 1) {
      setFinalIdx(f => f + 1); setSelected(null); setPhase('final-quiz');
    } else {
      const id = profileRef.current?.id;
      if (id && !dayDone) {
        completeDay(id, dayNumber);
        addRewardsRef.current(id, { stars: 10, beads: 20 });
        setDayDone(true);
      }
      setPhase('celebrate');
    }
  };

  // ── Shared layout helpers ──────────────────────────────────────────────────
  const shellStyle = {
    margin: '-18px -18px -40px', minHeight: '100vh',
    background: world.bg, padding: '0 0 60px',
  };
  const timeColor = timeLeft < 300 ? '#f87171' : timeLeft < 600 ? '#fbbf24' : '#4ade80';

  const TopBar = ({ label }) => (
    <div style={{
      background: 'rgba(0,0,0,0.45)', padding: '10px 14px',
      display: 'flex', alignItems: 'center', gap: 10,
      borderBottom: `2px solid ${world.accent}44`,
      position: 'sticky', top: 0, zIndex: 10,
    }}>
      <button onClick={onBack} style={{
        background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.35)',
        borderRadius: 60, color: '#fff', padding: '7px 14px',
        cursor: 'pointer', fontFamily: 'inherit', fontWeight: 800, fontSize: '0.82rem', flexShrink: 0,
      }}>← Map</button>
      <p style={{ flex: 1, margin: 0, fontSize: '0.65rem', color: world.accent, fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {world.icon} Day {dayNumber} · {label}
      </p>
      <div style={{
        background: 'rgba(0,0,0,0.35)', border: `2px solid ${timeColor}`,
        borderRadius: 60, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0,
      }}>
        <span style={{ fontSize: '0.85rem' }}>⏱️</span>
        <span style={{ color: timeColor, fontWeight: 900, fontSize: '0.9rem', fontVariantNumeric: 'tabular-nums' }}>
          {fmt(timeLeft)}
        </span>
      </div>
    </div>
  );

  // TopBar is a local variable, not a component — safe to define in render
  // because it does NOT contain canvas games (no hooks, no canvas)

  const TopicDots = () => (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '10px 0 2px' }}>
      {content.topics.map((t, i) => {
        const done = i < topicIdx || phase === 'final-quiz' || phase === 'celebrate';
        const curr = i === topicIdx && phase !== 'final-quiz' && phase !== 'celebrate';
        return (
          <div key={i} style={{
            width: 38, height: 38, borderRadius: '50%', fontSize: '1rem',
            background: done ? 'linear-gradient(135deg,#22c55e,#16a34a)' : curr ? world.altBg : 'rgba(0,0,0,0.3)',
            border: `2.5px solid ${done ? '#4ade80' : curr ? world.accent : 'rgba(255,255,255,0.2)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: curr ? `0 0 14px ${world.accent}99` : 'none',
            transition: 'all 0.3s',
          }}>{done ? '✅' : t.icon}</div>
        );
      })}
    </div>
  );

  // ══════════════════════════ WARMUP ═══════════════════════════════════════
  if (phase === 'warmup') {
    return (
      <div style={shellStyle}>
        <TopBar label="Warmup" />
        <div style={{ padding: '28px 18px', display: 'flex', flexDirection: 'column', gap: 20, textAlign: 'center' }}>
          <div style={{ fontSize: '4.5rem', animation: 'bob 1.2s ease-in-out infinite' }}>{world.icon}</div>
          <h1 style={{ margin: 0, color: world.gold, fontSize: '1.6rem', fontWeight: 900, textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>
            {lang === 'ur' ? content.title.ur : content.title.en}
          </h1>

          <div style={{ background: world.cardBg, border: `2px solid ${world.accent}55`, borderRadius: 22, padding: '20px 18px' }}>
            <p style={{ margin: '0 0 8px', color: world.gold, fontWeight: 900, fontSize: '0.88rem' }}>💡 Did You Know?</p>
            <p style={{ margin: 0, color: '#fff', fontWeight: 700, fontSize: '1rem', lineHeight: 1.7 }}>
              {lang === 'ur' ? content.warmupFact.ur : content.warmupFact.en}
            </p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 18, padding: '16px' }}>
            <p style={{ margin: '0 0 12px', color: world.accent, fontWeight: 900, fontSize: '0.78rem', letterSpacing: 1.2, textTransform: 'uppercase' }}>
              Today's 4 Topics
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {content.topics.map((t, i) => (
                <div key={i} style={{
                  background: world.altBg, borderRadius: 12, padding: '10px 12px',
                  display: 'flex', alignItems: 'center', gap: 8,
                  border: `1px solid ${world.accent}33`,
                }}>
                  <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{t.icon}</span>
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.75rem', textAlign: 'left', lineHeight: 1.3 }}>
                    {lang === 'ur' ? t.title.ur : t.title.en}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => setPhase('topic-intro')} style={{
            padding: '18px', fontSize: '1.2rem', fontWeight: 900,
            background: `linear-gradient(135deg,${world.gold},${world.accent})`,
            border: 'none', borderRadius: 60, color: '#000',
            cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: `0 8px 28px ${world.gold}66`,
            animation: 'bob 0.8s ease-in-out infinite',
          }}>
            🚀 Let's Start Learning!
          </button>
        </div>
      </div>
    );
  }

  // ══════════════════════════ TOPIC INTRO ═══════════════════════════════════
  if (phase === 'topic-intro') {
    const t = currentTopic;
    return (
      <div style={shellStyle}>
        <TopBar label={`Topic ${topicIdx + 1} / 4`} />
        <TopicDots />
        <div style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', animation: 'bob 1.5s ease-in-out infinite', marginBottom: 8 }}>{t.icon}</div>
            <h2 style={{ margin: '0 0 4px', color: world.gold, fontSize: '1.4rem', fontWeight: 900 }}>
              {lang === 'ur' ? t.title.ur : t.title.en}
            </h2>
            <p style={{ margin: 0, color: world.accent, fontSize: '0.75rem', fontWeight: 800 }}>
              Topic {topicIdx + 1} of 4 · 3 Games + 2 Questions
            </p>
          </div>

          <div style={{ background: world.cardBg, border: `2px solid ${world.accent}55`, borderRadius: 22, padding: '20px 18px' }}>
            <p style={{ margin: '0 0 10px', color: world.gold, fontWeight: 900, fontSize: '0.82rem', letterSpacing: 1, textTransform: 'uppercase' }}>
              📚 Learn First!
            </p>
            <p style={{ margin: 0, color: '#fff', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.75 }}>
              {lang === 'ur' ? t.intro.ur : t.intro.en}
            </p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 18, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
              background: world.altBg, border: `2.5px solid ${world.accent}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem',
            }}>{GAME_ICONS[t.gameType] || '🎮'}</div>
            <div>
              <p style={{ margin: '0 0 3px', color: world.accent, fontWeight: 900, fontSize: '0.78rem' }}>
                YOUR GAME TODAY
              </p>
              <p style={{ margin: '0 0 2px', color: '#fff', fontWeight: 900, fontSize: '0.95rem' }}>
                {t.gameType.replace(/([A-Z])/g, ' $1').trim()}
              </p>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontWeight: 700, fontSize: '0.75rem' }}>
                Play Easy → Medium → Hard!
              </p>
            </div>
          </div>

          <button onClick={() => setPhase('game')} style={{
            padding: '18px', fontSize: '1.1rem', fontWeight: 900,
            background: `linear-gradient(135deg,${world.gold},${world.accent})`,
            border: 'none', borderRadius: 60, color: '#000',
            cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: `0 6px 24px ${world.gold}66`,
            animation: 'bob 0.8s ease-in-out infinite',
          }}>
            ⭐ Play Level 1 — Easy!
          </button>
        </div>
      </div>
    );
  }

  // ══════════════════════════ GAME ══════════════════════════════════════════
  if (phase === 'game') {
    const t = currentTopic;
    return (
      <div style={shellStyle}>
        <TopBar label={`Topic ${topicIdx + 1} · ${LEVEL_LABELS[gameLevel]}`} />
        <TopicDots />

        <div style={{
          background: world.cardBg, borderBottom: `3px solid ${world.accent}`,
          padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            background: world.altBg, border: `2px solid ${world.accent}`,
            borderRadius: 60, padding: '5px 14px',
            color: world.gold, fontWeight: 900, fontSize: '0.8rem', flexShrink: 0,
          }}>{LEVEL_LABELS[gameLevel]}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, color: '#fff', fontWeight: 900, fontSize: '0.88rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {t.icon} {lang === 'ur' ? t.title.ur : t.title.en}
            </p>
            <p style={{ margin: 0, color: world.accent, fontWeight: 700, fontSize: '0.7rem' }}>
              Level {gameLevel}/3 — win to advance!
            </p>
          </div>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            {[1, 2, 3].map(l => (
              <div key={l} style={{
                width: 13, height: 13, borderRadius: '50%',
                background: l < gameLevel ? '#22c55e' : l === gameLevel ? world.gold : 'rgba(255,255,255,0.2)',
              }} />
            ))}
          </div>
        </div>

        <div style={{ padding: '12px 16px 0' }}>
          {/* key = topicIdx-gameLevel ensures remount only when level/topic changes */}
          <GameComponent
            key={`${topicIdx}-${gameLevel}`}
            gameType={t.gameType}
            level={gameLevel}
            onWin={handleGameWin}
            cardSetIdx={topicIdx % 2}
          />
        </div>
      </div>
    );
  }

  // ══════════════════════════ TOPIC QUIZ ════════════════════════════════════
  if (phase === 'topic-quiz') {
    const isAnswered = selected !== null;
    const qText      = lang === 'ur' ? currentQ.q.ur : currentQ.q.en;
    const factText   = lang === 'ur' ? currentQ.fact.ur : currentQ.fact.en;
    const isCorrect  = selected === currentQ.correct;

    return (
      <div style={shellStyle}>
        <TopBar label={`Topic ${topicIdx + 1} Quiz`} />
        <TopicDots />
        <div style={{ padding: '18px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '2rem' }}>{currentTopic.icon}</span>
            <div>
              <p style={{ margin: 0, color: world.gold, fontWeight: 900, fontSize: '0.88rem' }}>
                {lang === 'ur' ? currentTopic.title.ur : currentTopic.title.en}
              </p>
              <p style={{ margin: 0, color: world.accent, fontWeight: 700, fontSize: '0.7rem' }}>
                Question {quizIdx + 1} of 2 — all 3 levels won! 🎉
              </p>
            </div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.35)', border: `2.5px solid ${world.accent}66`, borderRadius: 20, padding: '18px 18px' }}>
            <p style={{ margin: 0, color: '#fff', fontWeight: 900, fontSize: '1.1rem', lineHeight: 1.6 }}>
              {qText}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {currentQ.options.map((opt, i) => {
              const cor = i === currentQ.correct;
              const cho = i === selected;
              return (
                <button key={i} onClick={() => handleAnswer(i)} disabled={isAnswered} style={{
                  padding: '14px 18px', borderRadius: 16, textAlign: 'left',
                  border: !isAnswered ? '2px solid rgba(255,255,255,0.3)' : cor ? '3px solid #4ade80' : cho ? '3px solid #f87171' : '2px solid rgba(255,255,255,0.12)',
                  background: !isAnswered ? 'rgba(255,255,255,0.12)' : cor ? 'rgba(74,222,128,0.22)' : cho ? 'rgba(248,113,113,0.22)' : 'rgba(255,255,255,0.05)',
                  color: isAnswered && cor ? '#4ade80' : cho && !cor ? '#f87171' : '#fff',
                  fontWeight: 800, fontSize: '0.97rem', fontFamily: 'inherit',
                  cursor: !isAnswered ? 'pointer' : 'default', transition: 'all 0.2s',
                }}>
                  {isAnswered && cor && '✅ '}
                  {cho && !cor && '❌ '}
                  {opt}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <>
              <div style={{
                background: isCorrect ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)',
                border: `2px solid ${isCorrect ? '#4ade8066' : '#f8717166'}`,
                borderRadius: 18, padding: '14px 16px', textAlign: 'center',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 4 }}>{isCorrect ? '🌟' : '💪'}</div>
                <p style={{ margin: '0 0 4px', color: isCorrect ? '#4ade80' : '#fb923c', fontWeight: 900, fontSize: '1rem' }}>
                  {isCorrect ? 'Correct! Amazing!' : 'Good try! Keep going!'}
                </p>
              </div>

              <div style={{ background: world.cardBg, border: `2px solid ${world.accent}55`, borderRadius: 18, padding: '14px 16px' }}>
                <p style={{ margin: '0 0 6px', color: world.gold, fontWeight: 900, fontSize: '0.82rem' }}>💡 Did you know?</p>
                <p style={{ margin: 0, color: '#fff', fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.65 }}>{factText}</p>
              </div>

              <button onClick={handleQuizNext} style={{
                padding: '16px', fontSize: '1rem', fontWeight: 900,
                background: `linear-gradient(135deg,${world.gold},${world.accent})`,
                border: 'none', borderRadius: 60, color: '#000',
                cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: `0 6px 24px ${world.gold}66`,
              }}>
                {quizIdx < 1
                  ? '▶ Question 2'
                  : topicIdx < content.topics.length - 1
                    ? `🎯 Topic ${topicIdx + 2}!`
                    : '🏆 Final Quiz!'}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // ══════════════════════════ FINAL QUIZ ════════════════════════════════════
  if (phase === 'final-quiz') {
    const isAnswered = selected !== null;
    const qText      = lang === 'ur' ? currentFinalQ.q.ur : currentFinalQ.q.en;
    const factText   = lang === 'ur' ? currentFinalQ.fact.ur : currentFinalQ.fact.en;
    const isCorrect  = selected === currentFinalQ.correct;
    const isLast     = finalIdx >= content.finalQuiz.length - 1;

    return (
      <div style={shellStyle}>
        <TopBar label={`Final Quiz · ${finalIdx + 1}/${content.finalQuiz.length}`} />
        <div style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 6 }}>🏆</div>
            <h3 style={{ margin: '0 0 4px', color: world.gold, fontSize: '1.2rem', fontWeight: 900 }}>
              Final Review!
            </h3>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontWeight: 700, fontSize: '0.8rem' }}>
              All 4 topics done — show what you learned!
            </p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.35)', border: `2.5px solid ${world.gold}66`, borderRadius: 20, padding: '18px 18px' }}>
            <p style={{ margin: '0 0 8px', color: world.gold, fontWeight: 900, fontSize: '0.72rem', letterSpacing: 1, textTransform: 'uppercase' }}>
              🎯 Q{finalIdx + 1} of {content.finalQuiz.length}
            </p>
            <p style={{ margin: 0, color: '#fff', fontWeight: 900, fontSize: '1.1rem', lineHeight: 1.6 }}>{qText}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {currentFinalQ.options.map((opt, i) => {
              const cor = i === currentFinalQ.correct;
              const cho = i === selected;
              return (
                <button key={i} onClick={() => handleFinalAnswer(i)} disabled={isAnswered} style={{
                  padding: '14px 18px', borderRadius: 16, textAlign: 'left',
                  border: !isAnswered ? '2px solid rgba(255,255,255,0.3)' : cor ? '3px solid #4ade80' : cho ? '3px solid #f87171' : '2px solid rgba(255,255,255,0.12)',
                  background: !isAnswered ? 'rgba(255,255,255,0.12)' : cor ? 'rgba(74,222,128,0.22)' : cho ? 'rgba(248,113,113,0.22)' : 'rgba(255,255,255,0.05)',
                  color: isAnswered && cor ? '#4ade80' : cho && !cor ? '#f87171' : '#fff',
                  fontWeight: 800, fontSize: '0.97rem', fontFamily: 'inherit',
                  cursor: !isAnswered ? 'pointer' : 'default', transition: 'all 0.2s',
                }}>
                  {isAnswered && cor && '✅ '}
                  {cho && !cor && '❌ '}
                  {opt}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <>
              <div style={{ background: world.cardBg, border: `2px solid ${world.accent}55`, borderRadius: 18, padding: '14px 16px' }}>
                <p style={{ margin: '0 0 6px', color: world.gold, fontWeight: 900, fontSize: '0.82rem' }}>
                  {isCorrect ? '✅ Correct! Did you know?' : '💡 Actually...'}
                </p>
                <p style={{ margin: 0, color: '#fff', fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.65 }}>{factText}</p>
              </div>
              <button onClick={handleFinalNext} style={{
                padding: '16px', fontSize: '1rem', fontWeight: 900,
                background: `linear-gradient(135deg,${world.gold},${world.accent})`,
                border: 'none', borderRadius: 60, color: '#000',
                cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: `0 6px 24px ${world.gold}66`,
              }}>
                {isLast ? '🎊 See My Results!' : '▶ Next Question'}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // ══════════════════════════ TIMESUP ═══════════════════════════════════════
  if (phase === 'timesup') {
    const totalQ   = content.topics.length * 2 + content.finalQuiz.length;
    const topicsDone = topicIdxRef.current;
    return (
      <div style={shellStyle}>
        <div style={{ padding: '40px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', animation: 'bob 1.5s ease-in-out infinite' }}>⏰</div>
          <h2 style={{ color: world.gold, margin: 0, fontSize: '1.6rem', fontWeight: 900, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            Great Session! Time's Up!
          </h2>
          <p style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', lineHeight: 1.6, maxWidth: 300, margin: 0 }}>
            You completed <span style={{ color: world.gold, fontWeight: 900 }}>{topicsDone} of 4 topics</span> today! 🎉
          </p>

          <div style={{ background: world.cardBg, border: `2.5px solid ${world.accent}`, borderRadius: 20, padding: '18px 20px', maxWidth: 300, width: '100%' }}>
            <p style={{ margin: '0 0 6px', color: world.gold, fontWeight: 900, fontSize: '0.95rem' }}>💾 Progress Saved!</p>
            <p style={{ margin: 0, color: '#fff', fontWeight: 700, fontSize: '0.88rem', lineHeight: 1.5 }}>
              {topicsDone < 4
                ? `You'll continue from Topic ${topicsDone + 1} next time. No repeating!`
                : 'All topics done! The final quiz awaits next time!'}
            </p>
          </div>

          <div style={{ background: world.altBg, border: `2px solid ${world.gold}`, borderRadius: 60, padding: '8px 22px' }}>
            <span style={{ color: world.gold, fontWeight: 900 }}>⭐ {correct} correct answers today!</span>
          </div>

          <button onClick={onBack} style={{
            padding: '18px 36px', fontSize: '1.1rem', fontWeight: 900,
            background: `linear-gradient(135deg,${world.gold},${world.accent})`,
            border: 'none', borderRadius: 60, color: '#000',
            cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: `0 6px 24px ${world.gold}66`,
          }}>
            🗺️ Back to Map
          </button>
        </div>
      </div>
    );
  }

  // ══════════════════════════ CELEBRATE ═════════════════════════════════════
  if (phase === 'celebrate') {
    const totalQ  = content.topics.length * 2 + content.finalQuiz.length;
    const pct     = Math.round((correct / totalQ) * 100);
    const medal   = pct === 100 ? '🥇' : pct >= 75 ? '🥈' : pct >= 50 ? '🥉' : '🌟';
    return (
      <div style={shellStyle}>
        <div style={{ padding: '28px 18px', display: 'flex', flexDirection: 'column', gap: 20, textAlign: 'center' }}>
          <div style={{ fontSize: '5rem', animation: 'cheer 0.8s ease-in-out infinite' }}>{medal}</div>
          <h2 style={{ color: world.gold, margin: 0, fontSize: '1.7rem', fontWeight: 900, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            Day {dayNumber} Complete! 🎊
          </h2>

          <div style={{ background: 'rgba(0,0,0,0.3)', border: `3px solid ${world.gold}`, borderRadius: 24, padding: '24px 20px' }}>
            <p style={{ margin: '0 0 6px', color: 'rgba(255,255,255,0.7)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: 1 }}>FINAL SCORE</p>
            <p style={{ margin: 0, color: world.gold, fontWeight: 900, fontSize: '3.2rem', lineHeight: 1 }}>
              {correct}<span style={{ fontSize: '1.6rem', color: 'rgba(255,255,255,0.55)' }}>/{totalQ}</span>
            </p>
            <p style={{ margin: '8px 0 0', color: world.accent, fontWeight: 800, fontSize: '1rem' }}>
              {pct}% correct · {pct === 100 ? 'PERFECT! 🌟' : pct >= 75 ? 'Great job! 👍' : pct >= 50 ? 'Good effort! 💪' : 'Keep practising! 💪'}
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
            {[
              { icon: '⭐', label: `+${correct * 5 + 10} Stars`,  color: world.gold   },
              { icon: '📿', label: `+${correct * 3 + 20} Beads`,  color: world.accent },
              { icon: '🏅', label: '+1 Badge',                     color: '#f9a8d4'    },
            ].map((r, i) => (
              <div key={i} style={{ background: world.altBg, border: `2px solid ${r.color}`, borderRadius: 16, padding: '10px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: '1.5rem' }}>{r.icon}</span>
                <span style={{ color: r.color, fontWeight: 900, fontSize: '0.8rem' }}>{r.label}</span>
              </div>
            ))}
          </div>

          {/* Topic completion summary */}
          <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 18, padding: '14px 16px' }}>
            <p style={{ margin: '0 0 10px', color: world.accent, fontWeight: 900, fontSize: '0.78rem', letterSpacing: 1, textTransform: 'uppercase' }}>Topics Mastered Today</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
              {content.topics.map((t, i) => (
                <div key={i} style={{
                  background: world.altBg, borderRadius: 12, padding: '8px 12px',
                  display: 'flex', alignItems: 'center', gap: 6,
                  border: `1px solid ${world.accent}44`,
                }}>
                  <span style={{ fontSize: '1.1rem' }}>{t.icon}</span>
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.72rem' }}>
                    {lang === 'ur' ? t.title.ur : t.title.en}
                  </span>
                  <span style={{ color: '#4ade80' }}>✓</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={onBack} style={{
            padding: '18px', fontSize: '1.1rem', fontWeight: 900,
            background: `linear-gradient(135deg,${world.gold},${world.accent})`,
            border: 'none', borderRadius: 60, color: '#000',
            cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: `0 6px 24px ${world.gold}66`,
          }}>
            🗺️ Back to Map — Next Day Unlocked! 🎉
          </button>
        </div>
      </div>
    );
  }

  return null;
}

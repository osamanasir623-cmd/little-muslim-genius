import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { ListenButton, Mascot, chime } from '../components/ui.jsx';
import { WORLDS } from '../data/content.js';

// ── Shared ──────────────────────────────────────────────────────────────────

function Frame({ world, children }) {
  const w = WORLDS[world] || WORLDS.light;
  const { lang } = useApp();
  return (
    <div className="panel pop">
      <div className="row" style={{ marginBottom: 12 }}>
        <Mascot id={w.guide} size="2.4rem" />
        <strong style={{ fontSize: '1.1rem' }}>{lang === 'ur' ? w.ur : w.en}</strong>
      </div>
      {children}
    </div>
  );
}

function useAge() {
  const { currentProfile } = useApp();
  return currentProfile?.age ?? 6;
}

// Static style for CommandRobot arrow buttons
const ARROW_BTN = {
  width: 46, height: 46, borderRadius: 10,
  background: 'rgba(255,255,255,0.18)',
  border: '2px solid rgba(255,255,255,0.3)',
  fontSize: '1.4rem', cursor: 'pointer', fontFamily: 'inherit',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};

const CMD_DIRS = {
  up:    { delta: [-1, 0], icon: '⬆️' },
  down:  { delta: [ 1, 0], icon: '⬇️' },
  left:  { delta: [ 0,-1], icon: '⬅️' },
  right: { delta: [ 0, 1], icon: '➡️' },
};

// ── 1. Quran Star ────────────────────────────────────────────────────────────
function QuranStar({ game, onDone }) {
  const { t, lang, state } = useApp();
  const age = useAge();
  const [confirmed, setConfirmed] = useState(false);
  return (
    <Frame world={game.world}>
      <p className="center muted" style={{ marginTop: 0 }}>
        {lang === 'ur' ? game.label.ur : game.label.en}
      </p>
      <p className="quran center">{game.arabic}</p>
      <p className="center" style={{ fontSize: age <= 4 ? '1.2rem' : '1.05rem' }}>
        {lang === 'ur' ? <span className="urdu">{game.ur}</span> : game.en}
      </p>
      <div className="row center" style={{ justifyContent: 'center', marginTop: 10 }}>
        <ListenButton en={game.arabic} ur={game.arabic} lang="ur" label="🔊 آیت" />
        <ListenButton en={game.en} ur={game.ur} lang={lang} />
      </div>
      <p className="center muted mt">{t('tapToRepeat')}</p>
      <button className="btn block lime mt" disabled={confirmed}
        style={{ fontSize: age <= 4 ? '1.2rem' : '1rem', padding: age <= 4 ? '20px' : undefined }}
        onClick={() => { setConfirmed(true); chime('win', state.muted); onDone({ stars: 1, beads: 1 }); }}>
        {confirmed ? t('correct') + ' ⭐' : t('repeated')}
      </button>
      {age <= 4 && (
        <p className="center muted" style={{ fontSize: '0.82rem', marginTop: 8 }}>
          {lang === 'ur' ? 'والدین کے ساتھ دہرائیں 🤲' : 'Repeat with a parent 🤲'}
        </p>
      )}
    </Frame>
  );
}

// ── 2. Hadith Story ──────────────────────────────────────────────────────────
function HadithStory({ game, onDone }) {
  const { t, lang, state } = useApp();
  const [confirmed, setConfirmed] = useState(false);
  return (
    <Frame world={game.world}>
      <p className="center" style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--coral-2)', marginTop: 0 }}>
        {t('prophetSaid')}
      </p>
      {game.arabic && (
        <p className="quran center" style={{ fontSize: '1.55rem', lineHeight: 2.2 }}>{game.arabic}</p>
      )}
      <div className="card mt" style={{ padding: '14px 18px' }}>
        <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.7 }}>
          {lang === 'ur' ? <span className="urdu">{game.ur}</span> : game.en}
        </p>
      </div>
      <div className="row mt" style={{ justifyContent: 'center' }}>
        <ListenButton en={game.en} ur={game.ur} lang={lang} />
      </div>
      <button className="btn block coral mt" disabled={confirmed}
        onClick={() => { setConfirmed(true); chime('correct', state.muted); onDone({ stars: 1, beads: 2 }); }}>
        {confirmed ? t('correct') + ' 📿' : t('iLearnedThis')}
      </button>
    </Frame>
  );
}

// ── 3. Names of Allah Matching ───────────────────────────────────────────────
// Age ≤ 4: 2 pairs · Age 5+: all pairs
function NamesMatch({ game, onDone }) {
  const { t, lang, state } = useApp();
  const age = useAge();
  const numPairs = age <= 4 ? Math.min(2, game.pairs.length) : game.pairs.length;
  const pairs    = useMemo(() => game.pairs.slice(0, numPairs), [numPairs]);
  const meanings = useMemo(() => [...pairs].sort(() => Math.random() - 0.5), [pairs]);
  const [picked, setPicked]   = useState(null);
  const [matched, setMatched] = useState([]);

  const tryMatch = (m) => {
    if (!picked) return;
    if (picked.ar === m.ar) {
      const next = [...matched, m.ar];
      setMatched(next); setPicked(null); chime('correct', state.muted);
      if (next.length === pairs.length) { chime('win', state.muted); onDone({ stars: 1, beads: 1 }); }
    } else { chime('tap', state.muted); setPicked(null); }
  };

  return (
    <Frame world={game.world}>
      <p className="center muted" style={{ marginTop: 0 }}>{t('matchPairs')}</p>
      <div className="grid2">
        <div className="col">
          {pairs.map((p) => {
            const done = matched.includes(p.ar);
            return (
              <button key={p.ar} className="btn"
                style={{ opacity: done ? 0.4 : 1, outline: picked?.ar === p.ar ? '3px solid var(--teal-1)' : 'none' }}
                disabled={done} onClick={() => setPicked(p)}>
                <span className="quran" style={{ fontSize: '1.4rem', lineHeight: 1 }}>{p.ar}</span>
              </button>
            );
          })}
        </div>
        <div className="col">
          {meanings.map((m) => {
            const done = matched.includes(m.ar);
            return (
              <button key={m.ar} className="btn teal" style={{ opacity: done ? 0.4 : 1, fontSize: '1rem' }}
                disabled={done} onClick={() => tryMatch(m)}>
                {lang === 'ur' ? <span className="urdu">{m.ur}</span> : m.en}
              </button>
            );
          })}
        </div>
      </div>
      {matched.length === pairs.length && (
        <p className="center mt" style={{ fontWeight: 700 }}>{t('correct')} 🎉 {t('mashaAllah')}</p>
      )}
    </Frame>
  );
}

// ── 4. Binary Lights ──────────────────────────────────────────────────────────
// Age ≤ 4: 3 bits (max 7) · Age 5+: 4 bits (max 15)
function BinaryLights({ game, onDone }) {
  const { t, lang, state } = useApp();
  const age     = useAge();
  const numBits = age <= 4 ? 3 : 4;
  const weights = numBits === 3 ? [4, 2, 1] : [8, 4, 2, 1];
  const maxVal  = weights.reduce((a, b) => a + b, 0);
  const target  = Math.min(game.target ?? 5, maxVal);
  const [bits, setBits] = useState(() => Array(numBits).fill(0));
  const value = bits.reduce((sum, b, i) => sum + b * weights[i], 0);
  const win   = value === target;

  const flip = (i) => {
    if (win) return;
    const next = bits.map((b, j) => (j === i ? (b ? 0 : 1) : b));
    setBits(next);
    const v = next.reduce((s, b, k) => s + b * weights[k], 0);
    chime(v === target ? 'win' : 'tap', state.muted);
    if (v === target) onDone({ stars: 1 });
  };

  return (
    <Frame world={game.world}>
      <p className="center muted" style={{ marginTop: 0 }}>{t('lightsOn')}</p>
      <p className="center" style={{ fontSize: '1.2rem' }}>
        {t('target')}: <strong style={{ fontSize: '1.8rem', color: 'var(--gold-1)' }}>{target}</strong>
      </p>
      <div className="row" style={{ justifyContent: 'center', gap: 10 }}>
        {bits.map((b, i) => (
          <button key={i} onClick={() => flip(i)} style={{
            width: age <= 4 ? 76 : 66, height: age <= 4 ? 76 : 66,
            borderRadius: 18, fontSize: '1.6rem',
            background: b ? 'var(--grad-gold)' : 'rgba(255,255,255,0.14)',
            color: b ? 'var(--ink)' : '#fff',
            boxShadow: b ? '0 0 18px rgba(255,216,107,0.7)' : 'none',
            border: '2px solid rgba(255,255,255,0.25)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
          }}>
            <span>{b ? '💡' : '⚫'}</span>
            <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>{weights[i]}</span>
          </button>
        ))}
      </div>
      <p className="center mt" style={{ fontSize: '1.4rem', fontWeight: 800 }}>= {value} {win && '✅'}</p>
      {win && <p className="center" style={{ fontWeight: 700 }}>{t('correct')} ⚡ {lang === 'ur' ? 'بائنری سیکھ لی!' : 'Binary cracked!'}</p>}
    </Frame>
  );
}

// ── 5. Quiz ───────────────────────────────────────────────────────────────────
// Age ≤ 4: 2 options (1 correct + 1 wrong) · Age 5+: all options
function Quiz({ game, onDone }) {
  const { t, lang, state } = useApp();
  const age = useAge();
  const options = useMemo(() => {
    if (age <= 4) {
      const correct = game.options.find((o) => o.correct);
      const wrong   = game.options.find((o) => !o.correct);
      if (correct && wrong) return [correct, wrong].sort(() => Math.random() - 0.5);
    }
    return game.options;
  }, [age, game.options]);
  const [answered, setAnswered] = useState(null);
  const q = game.question;

  return (
    <Frame world={game.world}>
      <div className="between" style={{ alignItems: 'flex-start' }}>
        <p style={{ fontSize: age <= 4 ? '1.3rem' : '1.15rem', fontWeight: 700, marginTop: 0, flex: 1 }}>
          {lang === 'ur' ? <span className="urdu">{q.ur}</span> : q.en}
        </p>
        <ListenButton en={q.en} ur={q.ur} lang={lang} />
      </div>
      <div className="col mt">
        {options.map((o, i) => {
          const isPicked    = answered === i;
          const showResult  = answered !== null;
          const btnClass    = !showResult ? '' : o.correct ? 'lime' : isPicked ? 'coral' : '';
          return (
            <button key={i} className={`btn ${btnClass}`}
              style={{
                opacity: showResult && !o.correct && !isPicked ? 0.5 : 1,
                fontSize: age <= 4 ? '1.2rem' : '1.05rem',
                padding: age <= 4 ? '18px 16px' : undefined,
              }}
              disabled={answered !== null}
              onClick={() => {
                setAnswered(i);
                if (o.correct) { chime('win', state.muted); onDone({ stars: 1 }); }
                else chime('tap', state.muted);
              }}>
              {lang === 'ur' ? <span className="urdu">{o.ur}</span> : o.en}
              {showResult && o.correct && ' ✅'}
              {isPicked && !o.correct && ' ❌'}
            </button>
          );
        })}
      </div>
      {answered !== null && (
        <p className="center mt" style={{ fontWeight: 700 }}>
          {options[answered].correct ? t('correct') : t('tryAgain')}
        </p>
      )}
    </Frame>
  );
}

// ── 6. Five Pillars ───────────────────────────────────────────────────────────
function FivePillars({ game, onDone }) {
  const { t, lang, state } = useApp();
  const shuffled = useMemo(() => [...game.pillars].sort(() => Math.random() - 0.5), []);
  const [tapped, setTapped] = useState([]);
  const [wrong,  setWrong]  = useState(null);
  const done = tapped.length === game.pillars.length;

  const tap = (p) => {
    if (tapped.includes(p.key)) return;
    if (p.num === tapped.length + 1) {
      const next = [...tapped, p.key]; setTapped(next); setWrong(null);
      chime(next.length === game.pillars.length ? 'win' : 'correct', state.muted);
      if (next.length === game.pillars.length) onDone({ stars: 2, beads: 2 });
    } else {
      setWrong(p.key); chime('tap', state.muted);
      setTimeout(() => setWrong(null), 600);
    }
  };

  return (
    <Frame world={game.world}>
      <p className="center muted" style={{ marginTop: 0 }}>
        {lang === 'ur' ? 'اسلام کے پانچ ستون — ترتیب سے ٹیپ کریں (1→5)' : 'Tap the 5 pillars of Islam in order (1→5)'}
      </p>
      {tapped.length > 0 && (
        <div className="row mt" style={{ flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
          {tapped.map((key, i) => {
            const p = game.pillars.find((x) => x.key === key);
            return (
              <span key={key} className="chip" style={{ background: 'var(--grad-lime)', color: 'var(--ink)', fontSize: '1.1rem' }}>
                {i + 1}. {p.icon}
              </span>
            );
          })}
        </div>
      )}
      <div className="col mt">
        {shuffled.map((p) => {
          const isDone  = tapped.includes(p.key);
          const isWrong = wrong === p.key;
          return (
            <button key={p.key}
              className={`btn ${isDone ? 'lime' : isWrong ? 'coral' : ''}`}
              style={{
                opacity: isDone ? 0.55 : 1,
                background: isDone ? 'var(--grad-lime)' : isWrong ? 'var(--grad-coral)' : 'rgba(255,255,255,0.14)',
                color: isDone ? 'var(--ink)' : '#fff',
                border: '2px solid rgba(255,255,255,0.2)', fontSize: '1rem',
              }}
              disabled={isDone} onClick={() => tap(p)}>
              {p.icon} {lang === 'ur' ? <span className="urdu">{p.ur}</span> : p.en}
              {isDone && ' ✅'}
            </button>
          );
        })}
      </div>
      {done && <p className="center mt" style={{ fontWeight: 700, fontSize: '1.2rem' }}>{t('correct')} 🎉 {t('mashaAllah')}</p>}
    </Frame>
  );
}

// ── 7. Robot Chef ─────────────────────────────────────────────────────────────
// Age ≤ 4: max 3 steps
function RobotChef({ game, onDone }) {
  const { t, lang, state } = useApp();
  const age   = useAge();
  const steps = useMemo(() => {
    const s = [...game.steps];
    return age <= 4 ? s.slice(0, Math.min(3, s.length)) : s;
  }, [age, game.steps]);
  const shuffled = useMemo(() => [...steps].sort(() => Math.random() - 0.5), [steps]);
  const [sequence, setSequence] = useState([]);
  const [wrong, setWrong]       = useState(null);
  const done = sequence.length === steps.length;

  const tap = (step) => {
    if (step.order === sequence.length + 1) {
      const next = [...sequence, step]; setSequence(next); setWrong(null);
      chime(next.length === steps.length ? 'win' : 'correct', state.muted);
      if (next.length === steps.length) onDone({ stars: 1 });
    } else {
      setWrong(step.order); chime('tap', state.muted);
      setTimeout(() => setWrong(null), 600);
    }
  };

  const remaining = shuffled.filter((s) => !sequence.find((x) => x.order === s.order));

  return (
    <Frame world={game.world}>
      <p className="center muted" style={{ marginTop: 0 }}>
        {lang === 'ur' ? (game.task?.ur ?? 'ترتیب سے ہدایات دیں!') : (game.task?.en ?? 'Tap the steps in the right order!')}
      </p>
      {sequence.length > 0 && (
        <div className="row mt" style={{ flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {sequence.map((s, i) => (
            <span key={s.order} className="chip" style={{ background: 'var(--grad-teal)', color: 'var(--ink)', fontSize: '1.3rem' }}>
              {i + 1}. {s.icon}
            </span>
          ))}
        </div>
      )}
      <div className="col mt">
        {remaining.map((s) => (
          <button key={s.order} className="btn"
            style={{
              background: wrong === s.order ? 'var(--grad-coral)' : 'rgba(255,255,255,0.14)',
              color: '#fff', fontSize: age <= 4 ? '1.2rem' : '1.05rem',
              border: '2px solid rgba(255,255,255,0.2)',
            }}
            onClick={() => tap(s)}>
            {s.icon} {lang === 'ur' ? <span className="urdu">{s.ur}</span> : s.en}
          </button>
        ))}
      </div>
      {done && <p className="center mt" style={{ fontWeight: 700 }}>{t('correct')} ⚡ {lang === 'ur' ? 'شاباش روبوٹ!' : 'The robot did it!'}</p>}
    </Frame>
  );
}

// ── 8. Data Sort ──────────────────────────────────────────────────────────────
// Age ≤ 4: first 3 items · Age 5+: all items
function DataSort({ game, onDone }) {
  const { t, lang, state } = useApp();
  const age   = useAge();
  const items = useMemo(() => age <= 4 ? game.items.slice(0, 3) : game.items, [age, game.items]);
  const shuffled = useMemo(() => [...items].sort(() => Math.random() - 0.5), [items]);
  const [sorted, setSorted] = useState([]);
  const [wrong, setWrong]   = useState(null);
  const done = sorted.length === items.length;

  const tap = (item) => {
    const remaining = shuffled.filter((i) => !sorted.find((s) => s.val === i.val));
    const minVal = Math.min(...remaining.map((i) => i.val));
    if (item.val === minVal) {
      const next = [...sorted, item]; setSorted(next); setWrong(null);
      chime(next.length === items.length ? 'win' : 'correct', state.muted);
      if (next.length === items.length) onDone({ stars: 1 });
    } else {
      setWrong(item.val); chime('tap', state.muted);
      setTimeout(() => setWrong(null), 600);
    }
  };

  const remaining = shuffled.filter((i) => !sorted.find((s) => s.val === i.val));

  return (
    <Frame world={game.world}>
      <p className="center muted" style={{ marginTop: 0 }}>
        {lang === 'ur' ? (game.label?.ur ?? 'چھوٹے سے بڑے کی طرف ٹیپ کریں!') : (game.label?.en ?? 'Tap from smallest to largest!')}
      </p>
      {sorted.length > 0 && (
        <div className="row mt" style={{ flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {sorted.map((s) => (
            <span key={s.val} className="chip" style={{ background: 'var(--grad-teal)', color: 'var(--ink)', fontSize: '1.2rem' }}>
              {s.icon} {s.val}
            </span>
          ))}
          {!done && <span style={{ opacity: 0.4, fontSize: '1.4rem', alignSelf: 'center' }}>→ ?</span>}
        </div>
      )}
      <div className="grid2 mt">
        {remaining.map((item) => (
          <button key={item.val} className="btn"
            style={{
              background: wrong === item.val ? 'var(--grad-coral)' : 'rgba(255,255,255,0.14)',
              color: '#fff', fontSize: '1rem', flexDirection: 'column', gap: 4,
              border: '2px solid rgba(255,255,255,0.2)',
            }}
            onClick={() => tap(item)}>
            <span style={{ fontSize: '2rem' }}>{item.icon}</span>
            <span>{item.val} {lang === 'ur' ? <span className="urdu">{item.ur}</span> : item.en}</span>
          </button>
        ))}
      </div>
      {done && <p className="center mt" style={{ fontWeight: 700 }}>{t('correct')} 🦉 {lang === 'ur' ? 'ڈیٹا مرتب!' : 'Data sorted!'}</p>}
    </Frame>
  );
}

// ── 9. Pattern Finder ─────────────────────────────────────────────────────────
function PatternFinder({ game, onDone }) {
  const { t, lang, state } = useApp();
  const [answered, setAnswered] = useState(null);
  return (
    <Frame world={game.world}>
      <p className="center muted" style={{ marginTop: 0 }}>
        {lang === 'ur' ? 'نمونہ مکمل کریں — آگے کیا آئے گا؟' : 'Complete the pattern — what comes next?'}
      </p>
      <div className="row mt" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: 8 }}>
        {game.pattern.map((item, i) => (
          <span key={i} style={{
            fontSize: '2.2rem',
            background: item === '?' ? 'rgba(255,255,255,0.15)' : 'transparent',
            borderRadius: 14, padding: '4px 10px',
            border: item === '?' ? '2px dashed rgba(255,255,255,0.5)' : 'none',
          }}>
            {item === '?' ? '❓' : item}
          </span>
        ))}
      </div>
      <div className="row mt2" style={{ justifyContent: 'center', gap: 20 }}>
        {game.options.map((o, i) => {
          const isPicked   = answered === i;
          const showResult = answered !== null;
          return (
            <button key={i}
              style={{
                fontSize: '2.6rem', borderRadius: 18, padding: '14px 22px',
                background: !showResult ? 'rgba(255,255,255,0.14)'
                  : o.correct ? 'var(--grad-lime)'
                  : isPicked ? 'var(--grad-coral)'
                  : 'rgba(255,255,255,0.14)',
                border: '2px solid rgba(255,255,255,0.25)',
                transform: isPicked && o.correct ? 'scale(1.18)' : 'scale(1)',
                transition: 'all 0.2s', cursor: 'pointer', fontFamily: 'inherit',
              }}
              disabled={answered !== null}
              onClick={() => {
                setAnswered(i);
                chime(o.correct ? 'win' : 'tap', state.muted);
                if (o.correct) onDone({ stars: 1 });
              }}>
              {o.icon}
            </button>
          );
        })}
      </div>
      {answered !== null && (
        <p className="center mt" style={{ fontWeight: 700 }}>
          {game.options[answered].correct ? `${t('correct')} 🎉` : t('tryAgain')}
        </p>
      )}
    </Frame>
  );
}

// ── 10. Prophet Journey ───────────────────────────────────────────────────────
function ProphetJourney({ game, onDone }) {
  const { lang, state } = useApp();
  const [panelIdx, setPanelIdx]   = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const panel  = game.panels[panelIdx];
  const isLast = panelIdx === game.panels.length - 1;

  return (
    <Frame world="light">
      <p className="center" style={{ fontWeight: 700, color: 'var(--coral-2)', marginTop: 0 }}>
        {lang === 'ur' ? 'سیرت النبی ﷺ' : 'Story of the Prophet ﷺ'}
      </p>
      <div className="row" style={{ justifyContent: 'center', gap: 8, marginBottom: 16 }}>
        {game.panels.map((_, i) => (
          <span key={i} style={{
            width: 10, height: 10, borderRadius: '50%',
            background: i <= panelIdx ? 'var(--gold-1)' : 'rgba(255,255,255,0.2)',
            transition: 'background 0.3s',
          }} />
        ))}
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: 8 }}>{panel.icon}</div>
        <h3 style={{ fontWeight: 800, margin: '0 0 10px', color: 'var(--gold-1)' }}>
          {lang === 'ur' ? panel.title.ur : panel.title.en}
        </h3>
        <p style={{ lineHeight: 1.75, fontSize: '1.02rem', margin: 0 }}>
          {lang === 'ur' ? <span className="urdu">{panel.text.ur}</span> : panel.text.en}
        </p>
        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}>
          <ListenButton en={panel.text.en} ur={panel.text.ur} lang={lang} />
        </div>
      </div>
      {!isLast ? (
        <button className="btn block mt"
          onClick={() => { chime('tap', state.muted); setPanelIdx((p) => p + 1); }}>
          {lang === 'ur' ? 'آگے →' : 'Next →'}
        </button>
      ) : (
        <button className="btn block lime mt" disabled={confirmed}
          onClick={() => { setConfirmed(true); chime('win', state.muted); onDone({ stars: 2, beads: 3 }); }}>
          {confirmed
            ? (lang === 'ur' ? 'شاباش! 📿' : 'Well done! 📿')
            : (lang === 'ur' ? 'میں نے یہ سیکھا ✓' : 'I learned this ✓')}
        </button>
      )}
    </Frame>
  );
}

// ── 11. Manners Sort ──────────────────────────────────────────────────────────
function MannersSort({ game, onDone }) {
  const { lang, state } = useApp();
  const [current, setCurrent] = useState(0);
  const [wrong, setWrong]     = useState(false);
  const [done, setDone]       = useState(false);
  const item = game.items[current];

  const tap = (isGood) => {
    if (done || wrong) return;
    if (isGood === item.good) {
      chime('correct', state.muted);
      const next = current + 1;
      if (next >= game.items.length) { setDone(true); chime('win', state.muted); onDone({ stars: 1, beads: 1 }); }
      else setCurrent(next);
    } else {
      setWrong(true); chime('tap', state.muted);
      setTimeout(() => setWrong(false), 700);
    }
  };

  return (
    <Frame world="light">
      <p className="center" style={{ fontWeight: 700, marginTop: 0 }}>
        {lang === 'ur' ? 'یہ اچھی عادت ہے؟' : 'Is this a good manner?'}
      </p>
      <div style={{ textAlign: 'center', marginBottom: 8, opacity: 0.6, fontSize: '0.88rem' }}>
        {current + 1} / {game.items.length}
      </div>
      {!done ? (
        <>
          <div style={{
            background: wrong ? 'rgba(255,80,80,0.25)' : 'rgba(255,255,255,0.12)',
            borderRadius: 16, padding: '20px 16px', textAlign: 'center',
            transition: 'background 0.3s', marginBottom: 16,
          }}>
            <div style={{ fontSize: '3rem' }}>{item.icon}</div>
            <p style={{ fontWeight: 700, fontSize: '1.1rem', margin: '10px 0 0' }}>
              {lang === 'ur' ? <span className="urdu">{item.ur}</span> : item.en}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn lime" style={{ flex: 1 }} disabled={wrong} onClick={() => tap(true)}>
              ✅ {lang === 'ur' ? 'اچھی عادت' : 'Good Manner'}
            </button>
            <button className="btn coral" style={{ flex: 1 }} disabled={wrong} onClick={() => tap(false)}>
              ❌ {lang === 'ur' ? 'نہیں' : 'Not Good'}
            </button>
          </div>
        </>
      ) : (
        <p className="center" style={{ fontWeight: 700, fontSize: '1.2rem', marginTop: 16 }}>
          {lang === 'ur' ? 'شاباش! 🤝 اچھی عادتیں!' : 'Well done! 🤝 Great manners!'}
        </p>
      )}
    </Frame>
  );
}

// ── 12. Input / Output ────────────────────────────────────────────────────────
function InputOutput({ game, onDone }) {
  const { lang, state } = useApp();
  const [current, setCurrent] = useState(0);
  const [wrong, setWrong]     = useState(false);
  const [done, setDone]       = useState(false);
  const item = game.items[current];

  const tap = (isInput) => {
    if (done || wrong) return;
    if (isInput === item.isInput) {
      chime('correct', state.muted);
      const next = current + 1;
      if (next >= game.items.length) { setDone(true); chime('win', state.muted); onDone({ stars: 1 }); }
      else setCurrent(next);
    } else {
      setWrong(true); chime('tap', state.muted);
      setTimeout(() => setWrong(false), 700);
    }
  };

  return (
    <Frame world="compute">
      <p className="center" style={{ fontWeight: 700, marginTop: 0 }}>
        {lang === 'ur' ? 'یہ INPUT ہے یا OUTPUT؟' : 'Is this INPUT or OUTPUT?'}
      </p>
      <div style={{ textAlign: 'center', marginBottom: 8, opacity: 0.6, fontSize: '0.88rem' }}>
        {current + 1} / {game.items.length}
      </div>
      {!done ? (
        <>
          <div style={{
            background: wrong ? 'rgba(255,80,80,0.25)' : 'rgba(255,255,255,0.12)',
            borderRadius: 16, padding: '24px 16px', textAlign: 'center',
            transition: 'background 0.3s', marginBottom: 16,
          }}>
            <div style={{ fontSize: '3.5rem' }}>{item.icon}</div>
            <p style={{ fontWeight: 700, fontSize: '1.25rem', margin: '10px 0 0' }}>
              {lang === 'ur' ? <span className="urdu">{item.ur}</span> : item.en}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn teal" style={{ flex: 1, fontSize: '1.1rem' }} disabled={wrong} onClick={() => tap(true)}>
              ⬇️ INPUT
            </button>
            <button className="btn coral" style={{ flex: 1, fontSize: '1.1rem' }} disabled={wrong} onClick={() => tap(false)}>
              ⬆️ OUTPUT
            </button>
          </div>
          <p className="center muted" style={{ fontSize: '0.78rem', marginTop: 8 }}>
            {lang === 'ur'
              ? 'INPUT = کمپیوٹر میں جاتا ہے · OUTPUT = کمپیوٹر سے آتا ہے'
              : 'INPUT = goes into computer · OUTPUT = comes out of computer'}
          </p>
        </>
      ) : (
        <p className="center" style={{ fontWeight: 700, fontSize: '1.2rem', marginTop: 16 }}>
          {lang === 'ur' ? 'شاباش! ⚡ ٹیک ماہر!' : 'Well done! ⚡ Tech expert!'}
        </p>
      )}
    </Frame>
  );
}

// ── 13. Command Robot ─────────────────────────────────────────────────────────
function CommandRobot({ game, onDone }) {
  const { lang, state } = useApp();
  const size    = game.size ?? 4;
  const startPos = game.start ?? [0, 0];
  const endPos   = game.end   ?? [size - 1, size - 1];
  const maxCmds  = game.maxCommands ?? 8;

  const [commands, setCommands]   = useState([]);
  const [robotPos, setRobotPos]   = useState([...startPos]);
  const [running,  setRunning]    = useState(false);
  const [win,      setWin]        = useState(false);
  const [fail,     setFail]       = useState(false);

  const addCmd = (dir) => {
    if (commands.length >= maxCmds || running || win) return;
    chime('tap', state.muted);
    setCommands((c) => [...c, dir]);
  };

  const resetBoard = () => { setCommands([]); setRobotPos([...startPos]); setFail(false); };

  const runProgram = () => {
    if (running || win || commands.length === 0) return;
    setRunning(true); setFail(false);
    let pos  = [...startPos];
    let step = 0;

    const executeStep = () => {
      if (step >= commands.length) {
        setRunning(false);
        if (pos[0] === endPos[0] && pos[1] === endPos[1]) {
          setWin(true); chime('win', state.muted); onDone({ stars: 1 });
        } else {
          setFail(true);
          setTimeout(() => { setFail(false); setCommands([]); setRobotPos([...startPos]); }, 900);
        }
        return;
      }
      const [dr, dc] = CMD_DIRS[commands[step]].delta;
      const newPos   = [pos[0] + dr, pos[1] + dc];
      if (newPos[0] < 0 || newPos[0] >= size || newPos[1] < 0 || newPos[1] >= size) {
        setRunning(false); setFail(true);
        setTimeout(() => { setFail(false); setCommands([]); setRobotPos([...startPos]); }, 900);
        return;
      }
      pos = newPos; step++;
      setRobotPos([...pos]);
      chime('tap', state.muted);
      setTimeout(executeStep, 350);
    };

    executeStep();
  };

  return (
    <Frame world="compute">
      <p className="center" style={{ fontWeight: 700, marginTop: 0 }}>
        {lang === 'ur' ? 'روبوٹ کو ⭐ تک پہنچاؤ!' : 'Program the robot to reach the star! ⭐'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${size}, 1fr)`, gap: 4, margin: '10px auto', maxWidth: 220 }}>
        {Array.from({ length: size * size }, (_, i) => {
          const row     = Math.floor(i / size);
          const col     = i % size;
          const isRobot = row === robotPos[0] && col === robotPos[1];
          const isGoal  = row === endPos[0]   && col === endPos[1];
          return (
            <div key={i} style={{
              aspectRatio: '1', borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem',
              background: isRobot ? (fail ? 'rgba(255,80,80,0.5)' : 'var(--grad-gold)')
                : isGoal  ? 'var(--grad-lime)'
                : 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              transition: 'background 0.25s',
            }}>
              {isRobot ? '🤖' : (isGoal && !win) ? '⭐' : (win && isGoal) ? '🎉' : ''}
            </div>
          );
        })}
      </div>

      <div style={{
        minHeight: 36, background: 'rgba(0,0,0,0.2)', borderRadius: 10,
        padding: '6px 10px', display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center', marginBottom: 8,
      }}>
        {commands.length === 0
          ? <span style={{ opacity: 0.4, fontSize: '0.85rem' }}>{lang === 'ur' ? 'کمانڈ ڈالیں...' : 'Add commands...'}</span>
          : commands.map((c, i) => <span key={i} style={{ fontSize: '1.3rem' }}>{CMD_DIRS[c].icon}</span>)}
      </div>

      {!win && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <button style={ARROW_BTN} onClick={() => addCmd('up')}    disabled={running}>⬆️</button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={ARROW_BTN} onClick={() => addCmd('left')}  disabled={running}>⬅️</button>
              <div style={{ width: 46 }} />
              <button style={ARROW_BTN} onClick={() => addCmd('right')} disabled={running}>➡️</button>
            </div>
            <button style={ARROW_BTN} onClick={() => addCmd('down')}  disabled={running}>⬇️</button>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button className="btn" style={{ flex: 1, fontSize: '0.9rem', opacity: commands.length === 0 ? 0.4 : 1 }}
              onClick={resetBoard} disabled={running || commands.length === 0}>
              ↺ {lang === 'ur' ? 'صاف' : 'Clear'}
            </button>
            <button className="btn teal" style={{ flex: 2, opacity: commands.length === 0 ? 0.4 : 1 }}
              onClick={runProgram} disabled={running || commands.length === 0}>
              {running ? (lang === 'ur' ? 'چل رہا ہے...' : 'Running...') : (lang === 'ur' ? '🚀 چلاؤ!' : '🚀 Run!')}
            </button>
          </div>
        </>
      )}

      {fail && <p className="center" style={{ color: 'var(--coral-1)', fontWeight: 700, marginTop: 8 }}>{lang === 'ur' ? 'دوبارہ کوشش کریں!' : 'Try again!'}</p>}
      {win  && <p className="center" style={{ fontWeight: 700, fontSize: '1.2rem', marginTop: 8 }}>{lang === 'ur' ? 'شاباش! 🤖 روبوٹ پہنچ گیا!' : 'Amazing! 🤖 Robot reached the goal!'}</p>}
      <p className="center muted" style={{ fontSize: '0.75rem', marginTop: 4 }}>
        {lang === 'ur' ? `زیادہ سے زیادہ ${maxCmds} کمانڈ` : `Max ${maxCmds} commands`}
      </p>
    </Frame>
  );
}

// ── 14. AI or Human ───────────────────────────────────────────────────────────
function AiOrHuman({ game, onDone }) {
  const { lang, state } = useApp();
  const [current, setCurrent] = useState(0);
  const [wrong, setWrong]     = useState(false);
  const [done, setDone]       = useState(false);
  const item = game.items[current];

  const tap = (isAI) => {
    if (done || wrong) return;
    if (isAI === item.isAI) {
      chime('correct', state.muted);
      const next = current + 1;
      if (next >= game.items.length) { setDone(true); chime('win', state.muted); onDone({ stars: 1 }); }
      else setCurrent(next);
    } else {
      setWrong(true); chime('tap', state.muted);
      setTimeout(() => setWrong(false), 700);
    }
  };

  return (
    <Frame world="ai">
      <p className="center" style={{ fontWeight: 700, marginTop: 0 }}>
        {lang === 'ur' ? 'یہ کام AI کرتی ہے یا انسان؟' : 'Does AI do this, or a Human?'}
      </p>
      <div style={{ textAlign: 'center', marginBottom: 8, opacity: 0.6, fontSize: '0.88rem' }}>
        {current + 1} / {game.items.length}
      </div>
      {!done ? (
        <>
          <div style={{
            background: wrong ? 'rgba(255,80,80,0.25)' : 'rgba(255,255,255,0.12)',
            borderRadius: 16, padding: '20px 16px', textAlign: 'center',
            transition: 'background 0.3s', marginBottom: 16,
          }}>
            <div style={{ fontSize: '3.2rem' }}>{item.icon}</div>
            <p style={{ fontWeight: 700, fontSize: '1.1rem', margin: '10px 0 0' }}>
              {lang === 'ur' ? <span className="urdu">{item.ur}</span> : item.en}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn teal" style={{ flex: 1, fontSize: '1.05rem' }} disabled={wrong} onClick={() => tap(true)}>🤖 AI</button>
            <button className="btn coral" style={{ flex: 1, fontSize: '1.05rem' }} disabled={wrong} onClick={() => tap(false)}>🧑 {lang === 'ur' ? 'انسان' : 'Human'}</button>
          </div>
        </>
      ) : (
        <p className="center" style={{ fontWeight: 700, fontSize: '1.2rem', marginTop: 16 }}>
          {lang === 'ur' ? 'شاباش! 🧠 AI ماہر!' : 'Well done! 🧠 AI expert!'}
        </p>
      )}
    </Frame>
  );
}

// ── 15. Good Bad AI ───────────────────────────────────────────────────────────
function GoodBadAI({ game, onDone }) {
  const { lang, state } = useApp();
  const [current, setCurrent]       = useState(0);
  const [wrong, setWrong]           = useState(false);
  const [showReason, setShowReason] = useState(false);
  const [done, setDone]             = useState(false);
  const item = game.items[current];

  const tap = (isGood) => {
    if (done || wrong || showReason) return;
    if (isGood === item.isGood) { chime('correct', state.muted); setShowReason(true); }
    else { setWrong(true); chime('tap', state.muted); setTimeout(() => setWrong(false), 700); }
  };

  const goNext = () => {
    setShowReason(false);
    const next = current + 1;
    if (next >= game.items.length) { setDone(true); chime('win', state.muted); onDone({ stars: 1, beads: 1 }); }
    else setCurrent(next);
  };

  return (
    <Frame world="ai">
      <p className="center" style={{ fontWeight: 700, marginTop: 0 }}>
        {lang === 'ur' ? 'یہ AI کا اچھا استعمال ہے؟' : 'Is this a GOOD use of AI?'}
      </p>
      <div style={{ textAlign: 'center', marginBottom: 8, opacity: 0.6, fontSize: '0.88rem' }}>
        {current + 1} / {game.items.length}
      </div>
      {!done ? (
        <>
          <div style={{
            background: wrong ? 'rgba(255,80,80,0.25)'
              : showReason ? (item.isGood ? 'rgba(100,220,100,0.15)' : 'rgba(255,100,100,0.15)')
              : 'rgba(255,255,255,0.12)',
            borderRadius: 16, padding: '16px', textAlign: 'center',
            transition: 'background 0.3s', marginBottom: 12,
          }}>
            <div style={{ fontSize: '3rem' }}>{item.icon}</div>
            <p style={{ fontWeight: 700, fontSize: '1.05rem', margin: '8px 0 0' }}>
              {lang === 'ur' ? <span className="urdu">{item.ur}</span> : item.en}
            </p>
            {showReason && (
              <p style={{ fontSize: '0.9rem', margin: '8px 0 0', fontStyle: 'italic', opacity: 0.9 }}>
                💡 {lang === 'ur' ? <span className="urdu">{item.reason.ur}</span> : item.reason.en}
              </p>
            )}
          </div>
          {!showReason ? (
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn lime"  style={{ flex: 1 }} disabled={wrong} onClick={() => tap(true)}>✅ {lang === 'ur' ? 'اچھا' : 'Good'}</button>
              <button className="btn coral" style={{ flex: 1 }} disabled={wrong} onClick={() => tap(false)}>⚠️ {lang === 'ur' ? 'نقصاندہ' : 'Harmful'}</button>
            </div>
          ) : (
            <button className="btn block mt" onClick={goNext}>{lang === 'ur' ? 'آگے ›' : 'Next ›'}</button>
          )}
        </>
      ) : (
        <p className="center" style={{ fontWeight: 700, fontSize: '1.2rem', marginTop: 16 }}>
          {lang === 'ur' ? 'شاباش! ⚖️ ذمہ دار ٹیک ماہر!' : 'Well done! ⚖️ Responsible tech user!'}
        </p>
      )}
    </Frame>
  );
}

// ── 16. Make Chart ────────────────────────────────────────────────────────────
function MakeChart({ game, onDone }) {
  const { lang, state } = useApp();
  const [answered, setAnswered] = useState(null);
  const maxVal = Math.max(...game.bars.map((b) => b.val));

  return (
    <Frame world="data">
      <p className="center" style={{ fontWeight: 700, marginTop: 0 }}>
        {lang === 'ur' ? <span className="urdu">{game.title.ur}</span> : game.title.en}
      </p>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 12, height: 110, marginBottom: 4 }}>
        {game.bars.map((bar, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--gold-1)' }}>{bar.val}</span>
            <div style={{
              width: 44, height: `${Math.round((bar.val / maxVal) * 90)}px`,
              background: bar.color || 'var(--grad-teal)',
              borderRadius: '6px 6px 0 0',
              boxShadow: `0 0 10px ${(bar.color || '#4ff0d4') + '66'}`,
              transition: 'height 0.5s',
            }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 14 }}>
        {game.bars.map((bar, i) => (
          <div key={i} style={{ width: 44, textAlign: 'center', fontSize: '0.7rem', opacity: 0.85 }}>
            {lang === 'ur' ? bar.label.ur : bar.label.en}
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '10px 14px', marginBottom: 12, textAlign: 'center' }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: '1.05rem' }}>
          {lang === 'ur' ? <span className="urdu">{game.question.ur}</span> : game.question.en}
        </p>
      </div>
      <div className="col">
        {game.bars.map((bar, i) => {
          const isPicked   = answered === i;
          const isCorrect  = i === game.answerKey;
          const showResult = answered !== null;
          return (
            <button key={i}
              className={`btn ${!showResult ? '' : isCorrect ? 'lime' : isPicked ? 'coral' : ''}`}
              style={{ opacity: showResult && !isCorrect && !isPicked ? 0.45 : 1 }}
              disabled={answered !== null}
              onClick={() => {
                setAnswered(i);
                if (isCorrect) { chime('win', state.muted); onDone({ stars: 1 }); }
                else chime('tap', state.muted);
              }}>
              {lang === 'ur' ? bar.label.ur : bar.label.en}
              {showResult && isCorrect && ' ✅'}
              {isPicked && !isCorrect && ' ❌'}
            </button>
          );
        })}
      </div>
      {answered !== null && (
        <p className="center mt" style={{ fontWeight: 700 }}>
          {answered === game.answerKey
            ? (lang === 'ur' ? 'شاباش! 📊 ڈیٹا جاسوس!' : 'Correct! 📊 Data detective!')
            : (lang === 'ur' ? 'دوبارہ کوشش کریں!' : 'Try again!')}
        </p>
      )}
    </Frame>
  );
}

// ── 17. Build Brain ───────────────────────────────────────────────────────────
function BuildBrain({ game, onDone }) {
  const { lang, state } = useApp();
  const [activated, setActivated] = useState([]);
  const [hiddenLit, setHiddenLit] = useState([]);
  const [phase, setPhase]         = useState('input');
  const [done, setDone]           = useState(false);

  const tapInput = (i) => {
    if (phase !== 'input' || activated.includes(i)) return;
    const next = [...activated, i];
    setActivated(next);
    chime('tap', state.muted);
    if (next.length === game.inputs.length) {
      setPhase('hidden');
      setTimeout(() => setHiddenLit([0]), 400);
      setTimeout(() => setHiddenLit([0, 1]), 750);
      setTimeout(() => {
        setPhase('output');
        chime('win', state.muted);
        setTimeout(() => { setDone(true); onDone({ stars: 2, beads: 2 }); }, 700);
      }, 1300);
    }
  };

  return (
    <Frame world="neuro">
      <p className="center" style={{ fontWeight: 700, marginTop: 0 }}>
        {lang === 'ur' ? 'انپٹ نوڈز کو ٹیپ کریں — دماغ کو چالو کریں!' : 'Tap each input node to send signals through the brain!'}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', margin: '16px 0', gap: 4 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {game.inputs.map((inp, i) => (
            <button key={i} onClick={() => tapInput(i)} style={{
              width: 68, height: 68, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0,
              background: activated.includes(i) ? 'var(--grad-gold)' : 'rgba(255,255,255,0.1)',
              boxShadow: activated.includes(i) ? '0 0 18px rgba(255,215,80,0.7)' : 'none',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 2, transition: 'all 0.4s', fontFamily: 'inherit',
            }}>
              <span style={{ fontSize: '1.6rem' }}>{inp.icon}</span>
              <span style={{ fontSize: '0.48rem', color: 'var(--ink)', fontWeight: 600, textAlign: 'center', lineHeight: 1.1, maxWidth: 60 }}>
                {lang === 'ur' ? inp.ur : inp.en}
              </span>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <span style={{ fontSize: '1.2rem', opacity: phase !== 'input' ? 1 : 0.2, transition: 'opacity 0.4s' }}>→</span>
          <span style={{ fontSize: '0.52rem', opacity: 0.5, textAlign: 'center' }}>{lang === 'ur' ? 'ہڈن' : 'HIDDEN'}</span>
          <span style={{ fontSize: '1.2rem', opacity: phase === 'output' ? 1 : 0.2, transition: 'opacity 0.4s' }}>→</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[0, 1].map((i) => (
            <div key={i} style={{
              width: 52, height: 52, borderRadius: '50%',
              background: hiddenLit.includes(i) ? 'var(--grad-teal)' : 'rgba(255,255,255,0.08)',
              border: '2px solid rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem',
              boxShadow: hiddenLit.includes(i) ? '0 0 16px rgba(79,240,212,0.8)' : 'none',
              transition: 'all 0.4s',
            }}>🧠</div>
          ))}
        </div>

        <div style={{
          width: 68, height: 68, borderRadius: '50%',
          background: phase === 'output' ? 'var(--grad-lime)' : 'rgba(255,255,255,0.08)',
          border: '2px solid rgba(255,255,255,0.2)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 2, transition: 'all 0.5s',
          boxShadow: phase === 'output' ? '0 0 20px rgba(182,243,107,0.7)' : 'none',
        }}>
          {phase === 'output' ? (
            <>
              <span style={{ fontSize: '1.6rem' }}>{game.output.icon}</span>
              <span style={{ fontSize: '0.48rem', color: 'var(--ink)', fontWeight: 600, textAlign: 'center', lineHeight: 1.1, maxWidth: 60 }}>
                {lang === 'ur' ? game.output.ur : game.output.en}
              </span>
            </>
          ) : <span style={{ fontSize: '1.6rem', opacity: 0.4 }}>?</span>}
        </div>
      </div>

      {phase === 'input' && (
        <p className="center muted" style={{ fontSize: '0.82rem', marginTop: 0 }}>
          {lang === 'ur'
            ? `${game.inputs.length - activated.length} انپٹ باقی ہیں`
            : `${game.inputs.length - activated.length} inputs remaining`}
        </p>
      )}
      {done && (
        <p className="center" style={{ fontWeight: 700, color: 'var(--gold-1)' }}>
          {lang === 'ur' ? '🧠 AI دماغ نے سوچا اور جواب دیا!' : '🧠 AI brain processed and answered!'}
        </p>
      )}
    </Frame>
  );
}

// ── 18. Train Network ─────────────────────────────────────────────────────────
function TrainNetwork({ game, onDone }) {
  const { lang, state } = useApp();
  const [exIdx, setExIdx]       = useState(0);
  const [answered, setAnswered] = useState(null);
  const [done, setDone]         = useState(false);

  const ex     = game.examples[exIdx];
  const isLast = exIdx === game.examples.length - 1;
  const aiKnows = exIdx >= game.examples.length - 1;

  const pick = (opt) => {
    if (answered !== null) return;
    setAnswered(opt);
    chime(opt.correct ? 'correct' : 'tap', state.muted);
  };

  const goNext = () => {
    if (isLast) { setDone(true); chime('win', state.muted); onDone({ stars: 1, beads: 1 }); }
    else { setExIdx((i) => i + 1); setAnswered(null); }
  };

  return (
    <Frame world="neuro">
      <p className="center" style={{ fontWeight: 700, marginTop: 0 }}>
        {lang === 'ur' ? 'AI کو مثالیں دے کر سکھاؤ!' : 'Teach the AI by showing it examples!'}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', opacity: 0.7, marginBottom: 10 }}>
        <span>🎓 {lang === 'ur' ? 'مثال' : 'Example'} {exIdx + 1}/{game.examples.length}</span>
        <span>{aiKnows
          ? (lang === 'ur' ? 'AI نے سیکھ لیا! ✅' : 'AI learned! ✅')
          : (lang === 'ur' ? 'AI سیکھ رہی ہے...' : 'AI is learning...')}</span>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: '18px', textAlign: 'center', marginBottom: 14 }}>
        {aiKnows ? (
          <p style={{ margin: '0 0 8px', fontSize: '0.9rem', color: 'var(--gold-1)', fontWeight: 700 }}>
            🤖 "{lang === 'ur' ? ex.label.ur : ex.label.en}" ✅
          </p>
        ) : (
          <p style={{ margin: '0 0 8px', fontSize: '0.9rem', opacity: 0.7 }}>
            🤖 {lang === 'ur' ? 'کچھ نہیں معلوم...' : 'Unsure...'}
          </p>
        )}
        <div style={{ fontSize: '4rem', margin: '6px 0' }}>{ex.icon}</div>
        <p style={{ margin: '6px 0 0', fontWeight: 600, fontSize: '0.95rem', opacity: 0.85 }}>
          {lang === 'ur' ? 'یہ کیا ہے؟' : 'What is this?'}
        </p>
      </div>

      {!done && (
        <>
          <div className="col" style={{ gap: 8 }}>
            {ex.options.map((opt, i) => (
              <button key={i}
                className={`btn ${answered === null ? '' : opt.correct ? 'lime' : answered === opt ? 'coral' : ''}`}
                style={{ opacity: answered && !opt.correct && answered !== opt ? 0.4 : 1 }}
                disabled={answered !== null}
                onClick={() => pick(opt)}>
                {lang === 'ur' ? opt.ur : opt.en}
                {answered && opt.correct && ' ✅'}
                {answered === opt && !opt.correct && ' ❌'}
              </button>
            ))}
          </div>
          {answered && (
            <button className="btn teal block mt" onClick={goNext}>
              {isLast ? '🎉 Finish!' : (lang === 'ur' ? 'اگلی مثال →' : 'Next →')}
            </button>
          )}
        </>
      )}
      {done && (
        <p className="center" style={{ fontWeight: 700, color: 'var(--gold-1)', fontSize: '1.1rem', marginTop: 8 }}>
          {lang === 'ur' ? '🎓 AI نے سیکھ لیا! تم بہترین استاد ہو!' : '🎓 AI learned! You were a great teacher!'}
        </p>
      )}
    </Frame>
  );
}

// ── 19. Layers Game ───────────────────────────────────────────────────────────
function LayersGame({ game, onDone }) {
  const { lang, state } = useApp();
  const [current, setCurrent] = useState(0);
  const [wrong, setWrong]     = useState(false);
  const [done, setDone]       = useState(false);

  const item = game.items[current];

  const LAYERS = [
    { key: 'input',  icon: '⬇️', en: 'INPUT',  ur: 'انپٹ',    hint: { en: 'Goes IN',   ur: 'اندر جاتا ہے' }, color: 'var(--grad-gold)' },
    { key: 'hidden', icon: '🧠', en: 'HIDDEN', ur: 'ہڈن',     hint: { en: 'AI Thinks', ur: 'AI سوچتی ہے' }, color: 'var(--grad-teal)' },
    { key: 'output', icon: '⬆️', en: 'OUTPUT', ur: 'آؤٹ پٹ',  hint: { en: 'Comes OUT', ur: 'باہر آتا ہے' }, color: 'var(--grad-lime)' },
  ];

  const tap = (layer) => {
    if (done || wrong) return;
    if (layer === item.layer) {
      chime('correct', state.muted);
      const next = current + 1;
      if (next >= game.items.length) { setDone(true); chime('win', state.muted); onDone({ stars: 1 }); }
      else setCurrent(next);
    } else {
      setWrong(true); chime('tap', state.muted);
      setTimeout(() => setWrong(false), 700);
    }
  };

  return (
    <Frame world="neuro">
      <p className="center" style={{ fontWeight: 700, marginTop: 0 }}>
        {lang === 'ur' ? 'یہ کس پرت میں جاتا ہے؟' : 'Which neural network layer is this?'}
      </p>
      <div className="center muted" style={{ fontSize: '0.8rem', marginBottom: 14 }}>{current + 1} / {game.items.length}</div>

      <div style={{
        background: wrong ? 'rgba(255,80,80,0.18)' : 'rgba(255,255,255,0.1)',
        borderRadius: 16, padding: '20px 16px', textAlign: 'center', marginBottom: 16, transition: 'background 0.3s',
      }}>
        <div style={{ fontSize: '2.8rem', marginBottom: 8 }}>{item.icon}</div>
        <p style={{ margin: 0, fontWeight: 700, fontSize: '1.05rem' }}>
          {lang === 'ur' ? <span className="urdu">{item.ur}</span> : item.en}
        </p>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {LAYERS.map((l) => (
          <button key={l.key} onClick={() => tap(l.key)} disabled={done} style={{
            flex: 1, padding: '14px 8px', borderRadius: 18, border: 'none',
            background: l.color, color: 'var(--ink)', cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, fontWeight: 700, fontSize: '0.82rem',
          }}>
            <span style={{ fontSize: '1.5rem' }}>{l.icon}</span>
            <span>{lang === 'ur' ? l.ur : l.en}</span>
            <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>{lang === 'ur' ? l.hint.ur : l.hint.en}</span>
          </button>
        ))}
      </div>

      {done && (
        <p className="center" style={{ fontWeight: 700, color: 'var(--gold-1)', fontSize: '1.1rem', marginTop: 12 }}>
          {lang === 'ur' ? '🧠 تم نیورل نیٹ ورک کے ماہر ہو!' : '🧠 You understand neural networks!'}
        </p>
      )}
    </Frame>
  );
}

// ── 20. Is This A …? (Classification) ────────────────────────────────────────
function IsThisACat({ game, onDone }) {
  const { lang, state } = useApp();
  const [current, setCurrent] = useState(0);
  const [wrong, setWrong]     = useState(false);
  const [done, setDone]       = useState(false);

  const item = game.items[current];

  const tap = (answer) => {
    if (done || wrong) return;
    if (answer === item.isMatch) {
      chime('correct', state.muted);
      const next = current + 1;
      if (next >= game.items.length) { setDone(true); chime('win', state.muted); onDone({ stars: 1 }); }
      else setCurrent(next);
    } else {
      setWrong(true); chime('tap', state.muted);
      setTimeout(() => setWrong(false), 700);
    }
  };

  return (
    <Frame world="neuro">
      <p className="center" style={{ fontWeight: 700, marginTop: 0 }}>
        {lang === 'ur' ? 'کیا یہ ' : 'Is this '}
        <span style={{ color: 'var(--gold-1)' }}>{lang === 'ur' ? game.category.ur : game.category.en}</span>
        {lang === 'ur' ? ' ہے؟' : '?'}
      </p>
      <div className="center muted" style={{ fontSize: '0.8rem', marginBottom: 14 }}>{current + 1} / {game.items.length}</div>

      <div style={{
        background: wrong ? 'rgba(255,80,80,0.22)' : 'rgba(255,255,255,0.1)',
        borderRadius: 16, padding: '28px 16px', textAlign: 'center', marginBottom: 16, transition: 'background 0.3s',
      }}>
        <div style={{ fontSize: '4.5rem' }}>{item.icon}</div>
        <p style={{ margin: '10px 0 0', fontWeight: 700, fontSize: '1.2rem' }}>
          {lang === 'ur' ? <span className="urdu">{item.ur}</span> : item.en}
        </p>
      </div>

      {!done ? (
        <div style={{ display: 'flex', gap: 14 }}>
          <button className="btn lime" style={{ flex: 1, fontSize: '1.15rem' }} disabled={wrong} onClick={() => tap(true)}>
            ✅ {lang === 'ur' ? 'ہاں!' : 'Yes!'}
          </button>
          <button className="btn coral" style={{ flex: 1, fontSize: '1.15rem' }} disabled={wrong} onClick={() => tap(false)}>
            ❌ {lang === 'ur' ? 'نہیں!' : 'No!'}
          </button>
        </div>
      ) : (
        <p className="center" style={{ fontWeight: 700, color: 'var(--gold-1)', fontSize: '1.1rem', marginTop: 8 }}>
          {lang === 'ur' ? '🤖 تم نے سب پہچانے! یہی AI کرتی ہے!' : '🤖 You classified them all! This is what AI does!'}
        </p>
      )}
    </Frame>
  );
}

// ── 21. Learning Race ─────────────────────────────────────────────────────────
function LearningRace({ game, onDone }) {
  const { lang, state } = useApp();
  const [idx, setIdx]           = useState(0);
  const [answered, setAnswered] = useState(null);
  const [score, setScore]       = useState(0);
  const [done, setDone]         = useState(false);

  const q      = game.questions[idx];
  const isLast = idx >= game.questions.length - 1;

  const answer = (opt) => {
    if (answered) return;
    setAnswered(opt);
    if (opt.correct) { setScore((s) => s + 1); chime('correct', state.muted); }
    else chime('tap', state.muted);
  };

  const next = () => {
    if (isLast) { setDone(true); chime('win', state.muted); onDone({ stars: score >= game.questions.length ? 2 : 1 }); }
    else { setIdx((i) => i + 1); setAnswered(null); }
  };

  return (
    <Frame world="neuro">
      <p className="center" style={{ fontWeight: 700, marginTop: 0 }}>
        🏁 {lang === 'ur' ? 'AI ریس! صحیح جواب سے آگے بڑھو!' : 'AI Race! Answer correctly to advance!'}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, margin: '10px 0 16px' }}>
        {game.questions.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 10, borderRadius: 99,
            background: i < idx ? 'var(--grad-lime)' : i === idx ? 'var(--grad-gold)' : 'rgba(255,255,255,0.12)',
            transition: 'background 0.3s',
          }} />
        ))}
        <span style={{ fontSize: '1.2rem' }}>🏁</span>
      </div>

      {!done ? (
        <>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: '14px', marginBottom: 12 }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '1.05rem', textAlign: 'center' }}>
              {lang === 'ur' ? <span className="urdu">{q.question.ur}</span> : q.question.en}
            </p>
          </div>
          <div className="col" style={{ gap: 8 }}>
            {q.options.map((opt, i) => (
              <button key={i}
                className={`btn ${answered === null ? '' : opt.correct ? 'lime' : answered === opt ? 'coral' : ''}`}
                style={{ opacity: answered && !opt.correct && answered !== opt ? 0.4 : 1 }}
                disabled={answered !== null}
                onClick={() => answer(opt)}>
                {lang === 'ur' ? opt.ur : opt.en}
                {answered && opt.correct && ' ✅'}
                {answered === opt && !opt.correct && ' ❌'}
              </button>
            ))}
          </div>
          {answered && (
            <button className="btn teal block mt" onClick={next}>
              {isLast ? '🏆 Finish!' : (lang === 'ur' ? 'اگلا →' : 'Next →')}
            </button>
          )}
        </>
      ) : (
        <div className="center" style={{ marginTop: 8 }}>
          <div style={{ fontSize: '2.5rem' }}>🏆</div>
          <p style={{ fontWeight: 800, fontSize: '1.2rem', margin: '8px 0 4px' }}>
            {lang === 'ur' ? 'ریس مکمل!' : 'Race complete!'}
          </p>
          <p className="muted">{score}/{game.questions.length} {lang === 'ur' ? 'صحیح' : 'correct'}</p>
        </div>
      )}
    </Frame>
  );
}

// ── 22. Design AI ─────────────────────────────────────────────────────────────
function DesignAI({ game, onDone }) {
  const { lang, state } = useApp();
  const [step, setStep]       = useState(0);
  const [choices, setChoices] = useState([]);
  const [done, setDone]       = useState(false);

  const currentStep = game.steps[step];
  const isLast      = step === game.steps.length - 1;

  const pick = (opt) => {
    chime('tap', state.muted);
    const next = [...choices, opt];
    setChoices(next);
    if (isLast) { setTimeout(() => { setDone(true); chime('win', state.muted); onDone({ stars: 2, beads: 2 }); }, 300); }
    else setStep((s) => s + 1);
  };

  return (
    <Frame world="neuro">
      {!done ? (
        <>
          <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
            {game.steps.map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 6, borderRadius: 99,
                background: i < step ? 'var(--grad-lime)' : i === step ? 'var(--grad-gold)' : 'rgba(255,255,255,0.12)',
                transition: 'background 0.3s',
              }} />
            ))}
          </div>
          <p style={{ fontWeight: 700, fontSize: '1.1rem', margin: '0 0 14px', textAlign: 'center' }}>
            {lang === 'ur' ? <span className="urdu">{currentStep.prompt.ur}</span> : currentStep.prompt.en}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {currentStep.options.map((opt, i) => (
              <button key={i} onClick={() => pick(opt)} style={{
                padding: '14px 10px', borderRadius: 18, border: '2px solid rgba(255,255,255,0.18)',
                background: 'rgba(255,255,255,0.1)', color: 'var(--ink)', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                fontFamily: 'inherit', fontSize: '0.9rem', fontWeight: 600,
              }}>
                <span style={{ fontSize: '2.2rem' }}>{opt.icon}</span>
                <span>{lang === 'ur' ? opt.ur : opt.en}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--gold-1)', margin: '0 0 16px' }}>
            🤖 {lang === 'ur' ? 'آپ کا AI ہیلپر تیار ہے!' : 'Your AI Helper is ready!'}
          </p>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: '18px 14px' }}>
            {choices.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '8px 0', justifyContent: 'center' }}>
                <span style={{ fontSize: '2rem' }}>{c.icon}</span>
                <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{lang === 'ur' ? c.ur : c.en}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: 14, fontStyle: 'italic', color: 'var(--ink)' }}>
            {lang === 'ur'
              ? 'اللہ نے آپ کو تخلیقی دماغ دیا — اسے بھلائی کے لیے استعمال کریں!'
              : 'Allah gave you a creative mind — use it to help others!'}
          </p>
        </div>
      )}
    </Frame>
  );
}

// ── Registry ──────────────────────────────────────────────────────────────────
export const GAMES = {
  quranStar:      QuranStar,
  hadithStory:    HadithStory,
  namesMatch:     NamesMatch,
  binary:         BinaryLights,
  quiz:           Quiz,
  fivePillars:    FivePillars,
  robotChef:      RobotChef,
  dataSort:       DataSort,
  patternFinder:  PatternFinder,
  prophetJourney: ProphetJourney,
  mannersSort:    MannersSort,
  inputOutput:    InputOutput,
  commandRobot:   CommandRobot,
  aiOrHuman:      AiOrHuman,
  goodBadAI:      GoodBadAI,
  makeChart:      MakeChart,
  buildBrain:     BuildBrain,
  trainNetwork:   TrainNetwork,
  layersGame:     LayersGame,
  isThisACat:     IsThisACat,
  learningRace:   LearningRace,
  designAI:       DesignAI,
};

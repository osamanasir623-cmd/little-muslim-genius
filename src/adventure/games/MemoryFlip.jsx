import { useState, useCallback, useMemo } from 'react';

const CARD_SETS = [
  [
    { id: 'a', icon: '🕋', label: 'Kaabah'  },
    { id: 'b', icon: '🌙', label: 'Moon'    },
    { id: 'c', icon: '📖', label: 'Quran'   },
    { id: 'd', icon: '🤲', label: 'Dua'     },
    { id: 'e', icon: '🌟', label: 'Star'    },
    { id: 'f', icon: '🕌', label: 'Mosque'  },
    { id: 'g', icon: '📿', label: 'Beads'   },
    { id: 'h', icon: '🌴', label: 'Palm'    },
  ],
  [
    { id: 'a', icon: '🧠', label: 'CPU'     },
    { id: 'b', icon: '⌨️', label: 'Keys'   },
    { id: 'c', icon: '🖥️', label: 'Screen' },
    { id: 'd', icon: '🖱️', label: 'Mouse'  },
    { id: 'e', icon: '💾', label: 'Memory'  },
    { id: 'f', icon: '🔊', label: 'Speaker' },
    { id: 'g', icon: '📶', label: 'WiFi'    },
    { id: 'h', icon: '🔋', label: 'Battery' },
  ],
];

const LEVEL_PAIRS = { 1: 4, 2: 6, 3: 8 };

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MemoryFlip({ onWin, level = 1, setIndex = 0 }) {
  const pairs = LEVEL_PAIRS[level] || LEVEL_PAIRS[1];
  const base  = CARD_SETS[setIndex % CARD_SETS.length].slice(0, pairs);

  const cards = useMemo(() => {
    const doubled = [...base, ...base].map((c, i) => ({ ...c, uid: i }));
    return shuffle(doubled);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [locked,  setLocked]  = useState(false);
  const [moves,   setMoves]   = useState(0);
  const [won,     setWon]     = useState(false);

  const flip = useCallback((uid) => {
    if (locked || won) return;
    if (matched.includes(uid) || flipped.includes(uid)) return;
    if (flipped.length === 2) return;

    const next = [...flipped, uid];
    setFlipped(next);

    if (next.length === 2) {
      setMoves(m => m + 1);
      setLocked(true);
      const [a, b] = next.map(u => cards.find(c => c.uid === u));
      if (a.id === b.id) {
        const nm = [...matched, a.uid, b.uid];
        setMatched(nm);
        setFlipped([]);
        setLocked(false);
        if (nm.length === cards.length) {
          setWon(true);
          setTimeout(() => onWin(), 800);
        }
      } else {
        setTimeout(() => { setFlipped([]); setLocked(false); }, 900);
      }
    }
  }, [flipped, matched, locked, won, cards, onWin]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        width: '100%', maxWidth: 340,
        background: 'linear-gradient(135deg,#7c3aed,#4f46e5)',
        borderRadius: 16, padding: '10px 16px',
        boxShadow: '0 4px 16px rgba(124,58,237,0.4)',
      }}>
        <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 700 }}>
          🃏 Match {pairs} pairs!
        </span>
        <span style={{ color: '#fde68a', fontWeight: 800, fontSize: '0.9rem' }}>
          Moves: {moves}
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 8, maxWidth: 340, width: '100%',
      }}>
        {cards.map(card => {
          const isFaceUp  = flipped.includes(card.uid) || matched.includes(card.uid);
          const isMatched = matched.includes(card.uid);
          return (
            <button
              key={card.uid}
              onClick={() => flip(card.uid)}
              style={{
                aspectRatio: '1',
                borderRadius: 14,
                border: 'none',
                background: isMatched
                  ? 'linear-gradient(135deg,#22c55e,#16a34a)'
                  : isFaceUp
                  ? 'linear-gradient(135deg,#facc15,#f97316)'
                  : 'linear-gradient(135deg,#7c3aed,#4f46e5)',
                cursor: isFaceUp ? 'default' : 'pointer',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 2, fontFamily: 'inherit',
                transform: isFaceUp ? 'scale(1.06)' : 'scale(1)',
                transition: 'all 0.22s cubic-bezier(0.34,1.56,0.64,1)',
                boxShadow: isMatched
                  ? '0 4px 16px rgba(34,197,94,0.55)'
                  : isFaceUp
                  ? '0 4px 16px rgba(250,204,21,0.55)'
                  : '0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              {isFaceUp ? (
                <>
                  <span style={{ fontSize: pairs <= 4 ? '1.8rem' : '1.4rem', lineHeight: 1 }}>{card.icon}</span>
                  <span style={{
                    fontSize: '0.5rem', color: '#fff', fontWeight: 800,
                    textAlign: 'center', textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                  }}>
                    {card.label}
                  </span>
                </>
              ) : (
                <span style={{ fontSize: pairs <= 4 ? '1.7rem' : '1.3rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}>🌙</span>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ width: '100%', maxWidth: 340 }}>
        <div style={{
          height: 10, background: 'rgba(255,255,255,0.15)',
          borderRadius: 99, overflow: 'hidden',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
        }}>
          <div style={{
            height: '100%',
            width: `${(matched.length / cards.length) * 100}%`,
            background: 'linear-gradient(90deg,#22c55e,#86efac)',
            borderRadius: 99, transition: 'width 0.4s',
            boxShadow: '0 0 10px rgba(34,197,94,0.6)',
          }} />
        </div>
        <p style={{ color: '#d1fae5', fontSize: '0.8rem', textAlign: 'center', marginTop: 6, fontWeight: 600 }}>
          {matched.length / 2} / {cards.length / 2} pairs found ✅
        </p>
      </div>

      {won && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem' }}>🃏🎉🃏</div>
          <p style={{ color: '#facc15', fontWeight: 800, fontSize: '1.1rem', margin: 4 }}>
            Memory Master! Great job! 🌟
          </p>
        </div>
      )}
    </div>
  );
}

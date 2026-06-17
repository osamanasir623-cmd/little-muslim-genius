import { useEffect, useRef } from 'react';

const SLOT_COLORS = ['#f97316', '#a855f7', '#3b82f6', '#10b981', '#f59e0b'];

export default function PuzzleBoard({ puzzle, collectedPieces, onAllCollected, world }) {
  const total     = puzzle.pieces.length;
  const collected = collectedPieces.length;
  const prevRef   = useRef(collected);

  const gold    = world?.gold    ?? '#fbbf24';
  const accent  = world?.accent  ?? '#6ee7b7';
  const cardBg  = world?.cardBg  ?? '#1e293b';
  const altBg   = world?.altBg   ?? '#0f172a';

  useEffect(() => {
    if (collected >= total && prevRef.current < total) onAllCollected();
    prevRef.current = collected;
  }, [collected, total, onAllCollected]);

  return (
    <div style={{
      background: altBg,
      borderRadius: 24,
      padding: '18px 14px 16px',
      border: `2.5px solid ${accent}66`,
      boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)`,
    }}>
      {/* Label */}
      <p style={{
        textAlign: 'center', color: gold,
        fontWeight: 900, fontSize: '0.7rem', letterSpacing: 2,
        margin: '0 0 4px', textTransform: 'uppercase',
      }}>
        🧩 Today's Puzzle
      </p>

      {/* Title */}
      <p style={{
        textAlign: 'center', color: '#fff',
        fontWeight: 900, fontSize: '1.08rem', margin: '0 0 14px',
        lineHeight: 1.3, textShadow: '0 2px 8px rgba(0,0,0,0.6)',
      }}>
        {puzzle.title.en}
      </p>

      {/* Piece slots */}
      <div style={{
        display: 'flex', flexWrap: 'wrap',
        gap: 10, justifyContent: 'center', marginBottom: 14,
      }}>
        {puzzle.pieces.map((piece, i) => {
          const done  = collectedPieces.includes(i);
          const color = SLOT_COLORS[i % SLOT_COLORS.length];
          return (
            <div key={i} style={{
              width: 64, height: 74, borderRadius: 18,
              background: done ? color : cardBg,
              border: done
                ? `3px solid ${color}`
                : `2.5px dashed ${accent}55`,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 4,
              transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
              transform: done ? 'scale(1.1)' : 'scale(1)',
              boxShadow: done
                ? `0 0 24px ${color}88, inset 0 1px 0 rgba(255,255,255,0.3)`
                : `0 2px 8px rgba(0,0,0,0.4)`,
            }}>
              {done ? (
                <>
                  <span style={{ fontSize: '1.85rem', lineHeight: 1, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
                    {piece.icon}
                  </span>
                  <span style={{
                    fontSize: '0.48rem', color: '#fff', fontWeight: 900,
                    textAlign: 'center', padding: '0 4px', lineHeight: 1.2,
                    textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                  }}>
                    {piece.en}
                  </span>
                </>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', lineHeight: 1, opacity: 0.3, filter: 'grayscale(1)' }}>
                    ❓
                  </div>
                  <div style={{
                    fontSize: '0.46rem', color: accent, opacity: 0.5,
                    fontWeight: 800, marginTop: 3,
                  }}>
                    Piece {i + 1}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div style={{
        height: 10, background: 'rgba(0,0,0,0.4)',
        borderRadius: 99, overflow: 'hidden',
        border: `1px solid rgba(255,255,255,0.08)`,
      }}>
        <div style={{
          height: '100%',
          width: `${(collected / total) * 100}%`,
          background: `linear-gradient(90deg, ${gold}, ${accent})`,
          borderRadius: 99,
          transition: 'width 0.6s ease',
          boxShadow: `0 0 14px ${gold}99`,
        }} />
      </div>
      <p style={{
        color: accent, fontSize: '0.73rem', opacity: 0.85,
        textAlign: 'center', marginTop: 7, fontWeight: 700, margin: '7px 0 0',
      }}>
        {collected} / {total} pieces collected
      </p>
    </div>
  );
}

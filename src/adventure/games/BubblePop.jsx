import { useRef, useEffect, useState, useCallback } from 'react';

const W = 340, H = 420;

const BUBBLE_SETS = [
  { label: '⭐ GOOD', color: '#facc15', textColor: '#1a0a00', correct: true  },
  { label: '🌙 GOOD', color: '#a78bfa', textColor: '#fff',    correct: true  },
  { label: '✨ GOOD', color: '#34d399', textColor: '#fff',    correct: true  },
  { label: '🔥 BAD',  color: '#f97316', textColor: '#fff',    correct: false },
  { label: '💀 BAD',  color: '#6b7280', textColor: '#fff',    correct: false },
  { label: '❌ BAD',  color: '#ef4444', textColor: '#fff',    correct: false },
];

const LEVEL_CFG = {
  1: { need: 8,  maxWrong: 4, speed: 0.7, spawnInterval: 85 },
  2: { need: 12, maxWrong: 3, speed: 0.9, spawnInterval: 70 },
  3: { need: 18, maxWrong: 2, speed: 1.4, spawnInterval: 50 },
};

export default function BubblePop({ onWin, level = 1 }) {
  const cfg = LEVEL_CFG[level] || LEVEL_CFG[1];
  const canvasRef = useRef(null);
  const S = useRef({
    bubbles: [], popped: 0, wrong: 0,
    spawnT: 0, spawnInterval: cfg.spawnInterval, speed: cfg.speed,
    done: false,
    cfg,
  });
  const [popped, setPopped] = useState(0);
  const [wrong,  setWrong]  = useState(0);
  const [won,    setWon]    = useState(false);
  const [failed, setFailed] = useState(false);

  const spawnBubble = (s) => {
    const tmpl = BUBBLE_SETS[Math.floor(Math.random() * BUBBLE_SETS.length)];
    s.bubbles.push({
      x: 38 + Math.random() * (W - 76),
      y: H + 38,
      r: 30 + Math.random() * 12,
      ...tmpl,
      uid: Math.random(),
      wobble: Math.random() * Math.PI * 2,
      hit: false, hitAnim: 0,
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let   raf;
    const s = S.current;
    const c = s.cfg;

    const draw = () => {
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#0ea5e9');
      bg.addColorStop(0.5, '#0284c7');
      bg.addColorStop(1, '#075985');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 2;
      for (let y = 40; y < H; y += 45) {
        ctx.beginPath();
        for (let x = 0; x <= W; x += 20) {
          const wy = y + Math.sin((x * 0.04) + (Date.now() * 0.001)) * 5;
          x === 0 ? ctx.moveTo(x, wy) : ctx.lineTo(x, wy);
        }
        ctx.stroke();
      }

      s.bubbles.forEach(b => {
        if (b.hit && b.hitAnim <= 0) return;
        ctx.save();
        const alpha = b.hit ? b.hitAnim / 10 : 1;
        ctx.globalAlpha = alpha;
        const scale = b.hit ? 1 + (10 - b.hitAnim) * 0.1 : 1;
        ctx.translate(b.x, b.y); ctx.scale(scale, scale);

        ctx.fillStyle = b.color;
        ctx.beginPath(); ctx.arc(0, 0, b.r, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(0, 0, b.r, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.55)';
        ctx.beginPath(); ctx.ellipse(-b.r * 0.3, -b.r * 0.3, b.r * 0.28, b.r * 0.18, -0.6, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = b.textColor;
        ctx.font = `bold ${Math.max(11, b.r * 0.55)}px sans-serif`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(b.label, 0, 0);
        ctx.restore();
      });

      ctx.fillStyle = '#16a34a';
      ctx.beginPath(); ctx.roundRect(10, 10, 130, 42, 21); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 17px sans-serif';
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillText(`✅ ${s.popped} / ${c.need}`, 18, 31);

      ctx.fillStyle = '#dc2626';
      ctx.beginPath(); ctx.roundRect(W - 140, 10, 130, 42, 21); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.textAlign = 'right';
      ctx.fillText(`❌ ${s.wrong} / ${c.maxWrong}`, W - 18, 31);

      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.beginPath(); ctx.roundRect(12, H - 44, W - 24, 34, 17); ctx.fill();
      ctx.fillStyle = '#0c4a6e'; ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('Pop ⭐ GOOD bubbles — avoid 🔥 BAD ones!', W / 2, H - 27);
    };

    const update = () => {
      if (s.done) return;
      s.spawnT++;
      if (s.spawnT >= s.spawnInterval) {
        spawnBubble(s); s.spawnT = 0;
        s.speed = Math.min(3.0, s.speed + 0.04);
        s.spawnInterval = Math.max(35, s.spawnInterval - 1.5);
      }
      s.bubbles = s.bubbles.filter(b => {
        if (b.hit) { b.hitAnim--; return b.hitAnim > 0; }
        b.y -= b.speed || s.speed;
        b.wobble += 0.04;
        b.x += Math.sin(b.wobble) * 0.6;
        return b.y + b.r > -10;
      });
    };

    const loop = () => { update(); draw(); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [onWin]);

  const handleTap = useCallback((e) => {
    const s = S.current;
    if (s.done) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scX  = W / rect.width, scY = H / rect.height;
    const src  = (e.changedTouches && e.changedTouches[0]) || (e.touches && e.touches[0]) || e;
    const tx   = (src.clientX - rect.left) * scX;
    const ty   = (src.clientY - rect.top)  * scY;

    for (const b of [...s.bubbles].reverse()) {
      if (b.hit) continue;
      if (Math.hypot(b.x - tx, b.y - ty) < b.r + 14) {
        b.hit = true; b.hitAnim = 10;
        if (b.correct) {
          s.popped++;
          setPopped(s.popped);
          if (s.popped >= s.cfg.need) { s.done = true; setWon(true); setTimeout(() => onWin(), 700); }
        } else {
          s.wrong++;
          setWrong(s.wrong);
          if (s.wrong >= s.cfg.maxWrong) { s.done = true; setFailed(true); }
        }
        break;
      }
    }
  }, [onWin]);

  const retry = () => {
    const s = S.current;
    s.bubbles = []; s.popped = 0; s.wrong = 0;
    s.spawnT = 0; s.spawnInterval = s.cfg.spawnInterval; s.speed = s.cfg.speed; s.done = false;
    setPopped(0); setWrong(0); setFailed(false); setWon(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <canvas
        ref={canvasRef} width={W} height={H}
        style={{ borderRadius: 20, boxShadow: '0 8px 40px rgba(14,165,233,0.5)', maxWidth: '100%', cursor: 'crosshair', touchAction: 'none' }}
        onClick={handleTap}
        onTouchStart={(e) => { e.preventDefault(); handleTap(e); }}
      />
      {won && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem' }}>🫧🎉🫧</div>
          <p style={{ color: '#facc15', fontWeight: 800, fontSize: '1.1rem', margin: 4 }}>
            Bubble Champion! Great job! 🌟
          </p>
        </div>
      )}
      {failed && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#f87171', fontWeight: 700, margin: '0 0 8px' }}>Too many wrong pops! Try again 💪</p>
          <button onClick={retry} style={{
            padding: '12px 28px', fontSize: '1rem', fontWeight: 800,
            background: 'linear-gradient(135deg,#ef4444,#f97316)',
            border: 'none', borderRadius: 60, color: '#fff', cursor: 'pointer', fontFamily: 'inherit',
          }}>↩ Retry</button>
        </div>
      )}
    </div>
  );
}

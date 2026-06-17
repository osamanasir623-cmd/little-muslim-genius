import { useRef, useEffect, useState, useCallback } from 'react';

const W = 340, H = 420;
const STARS = [
  { emoji: '⭐', glow: '#ffe066' },
  { emoji: '🌟', glow: '#ffe066' },
  { emoji: '💫', glow: '#c4b5fd' },
  { emoji: '✨', glow: '#a5f3fc' },
];

const LEVEL_CFG = {
  1: { need: 8,  maxMiss: 4, speed: 1.0, spawnInterval: 100 },
  2: { need: 12, maxMiss: 3, speed: 1.6, spawnInterval: 90  },
  3: { need: 18, maxMiss: 2, speed: 2.4, spawnInterval: 65  },
};

export default function StarBlast({ onWin, level = 1 }) {
  const cfg = LEVEL_CFG[level] || LEVEL_CFG[1];
  const canvasRef = useRef(null);
  const S = useRef({
    stars: [], caught: 0, missed: 0,
    spawnT: 0, spawnInterval: cfg.spawnInterval, speed: cfg.speed,
    done: false,
    cfg,
  });
  const [caught, setCaught] = useState(0);
  const [missed, setMissed] = useState(0);
  const [won,    setWon]    = useState(false);
  const [failed, setFailed] = useState(false);

  const spawn = (s) => {
    const tmpl = STARS[Math.floor(Math.random() * STARS.length)];
    s.stars.push({
      x: 36 + Math.random() * (W - 72),
      y: -36,
      r: 24 + Math.random() * 12,
      speed: s.speed + Math.random() * 0.8,
      ...tmpl,
      hit: false,
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
      bg.addColorStop(0, '#1e40af');
      bg.addColorStop(0.5, '#6d28d9');
      bg.addColorStop(1, '#4c1d95');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      for (let i = 0; i < 50; i++) {
        const bx = (i * 73 + 17) % W;
        const by = (i * 53 + 11) % H;
        const br = (i % 3 === 0) ? 2 : 1.2;
        ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.fill();
      }

      s.stars.forEach(st => {
        if (st.hit) return;
        ctx.save();
        const grad = ctx.createRadialGradient(st.x, st.y, 0, st.x, st.y, st.r + 18);
        grad.addColorStop(0, st.glow + 'cc');
        grad.addColorStop(0.5, st.glow + '55');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(st.x, st.y, st.r + 18, 0, Math.PI * 2); ctx.fill();
        ctx.shadowColor = st.glow; ctx.shadowBlur = 20;
        ctx.font = `${st.r * 2.2}px serif`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';
        ctx.fillText(st.emoji, st.x, st.y);
        ctx.restore();
      });

      const dg = ctx.createLinearGradient(0, H - 32, 0, H);
      dg.addColorStop(0, 'rgba(239,68,68,0)');
      dg.addColorStop(1, 'rgba(239,68,68,0.7)');
      ctx.fillStyle = dg; ctx.fillRect(0, H - 32, W, 32);
      ctx.fillStyle = '#ef4444'; ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('⚡ DON\'T LET THEM FALL! ⚡', W / 2, H - 14);

      ctx.fillStyle = '#16a34a';
      ctx.beginPath(); ctx.roundRect(10, 10, 122, 40, 20); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 17px sans-serif';
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillText(`⭐ ${s.caught} / ${c.need}`, 20, 30);

      ctx.fillStyle = '#dc2626';
      ctx.beginPath(); ctx.roundRect(W - 132, 10, 122, 40, 20); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.textAlign = 'right';
      ctx.fillText(`💔 ${s.missed} / ${c.maxMiss}`, W - 20, 30);

      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.beginPath(); ctx.roundRect(10, 56, W - 20, 10, 5); ctx.fill();
      ctx.fillStyle = '#facc15';
      ctx.beginPath(); ctx.roundRect(10, 56, (W - 20) * (s.caught / c.need), 10, 5); ctx.fill();
    };

    const update = () => {
      if (s.done) return;
      s.spawnT++;
      if (s.spawnT >= s.spawnInterval) {
        spawn(s); s.spawnT = 0;
        s.speed = Math.min(5.0, s.speed + 0.06);
        s.spawnInterval = Math.max(38, s.spawnInterval - 2);
      }
      s.stars = s.stars.filter(st => {
        if (st.hit) return false;
        st.y += st.speed;
        if (st.y > H - 20) {
          s.missed++;
          setMissed(s.missed);
          if (s.missed >= c.maxMiss) { s.done = true; setFailed(true); }
          return false;
        }
        return true;
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

    for (const st of s.stars) {
      if (st.hit) continue;
      if (Math.hypot(st.x - tx, st.y - ty) < st.r + 28) {
        st.hit = true;
        s.caught++;
        setCaught(s.caught);
        if (s.caught >= s.cfg.need) {
          s.done = true; setWon(true);
          setTimeout(() => onWin(), 700);
        }
        break;
      }
    }
  }, [onWin]);

  const retry = () => {
    const s = S.current;
    s.stars = []; s.caught = 0; s.missed = 0;
    s.spawnT = 0; s.spawnInterval = s.cfg.spawnInterval; s.speed = s.cfg.speed; s.done = false;
    setCaught(0); setMissed(0); setFailed(false); setWon(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <canvas
        ref={canvasRef} width={W} height={H}
        style={{ borderRadius: 20, boxShadow: '0 8px 40px rgba(109,40,217,0.6)', maxWidth: '100%', cursor: 'crosshair', touchAction: 'none' }}
        onClick={handleTap}
        onTouchStart={(e) => { e.preventDefault(); handleTap(e); }}
      />
      {won && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem' }}>🌟🎉🌟</div>
          <p style={{ color: '#facc15', fontWeight: 800, fontSize: '1.1rem', margin: 4 }}>
            Star Champion! Great job! 🌟
          </p>
        </div>
      )}
      {failed && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#f87171', fontWeight: 700, margin: '0 0 8px' }}>Too many fell! Try again 💪</p>
          <button onClick={retry} style={{
            padding: '12px 28px', fontSize: '1rem', fontWeight: 800,
            background: 'linear-gradient(135deg,#ef4444,#f97316)',
            border: 'none', borderRadius: 60, color: '#fff', cursor: 'pointer', fontFamily: 'inherit',
          }}>↩ Retry</button>
        </div>
      )}
      {!won && !failed && (
        <p style={{ color: '#e2e8f0', fontSize: '0.85rem', textAlign: 'center', margin: 0, fontWeight: 600 }}>
          👆 TAP the stars before they fall! Catch {cfg.need} to win!
        </p>
      )}
    </div>
  );
}
